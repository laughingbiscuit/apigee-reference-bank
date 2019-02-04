<?php
namespace Drupal\spec_publish\Commands;

use Drush\Commands\DrushCommands;
use Drupal\node\Entity\Node;
/**
 * A Drush commandfile.
 *
 * In addition to this file, you need a drush.services.yml
 * in root of your module, and a composer.json file that provides the name
 * of the services file to use.
 */
class SpecPublishCommands extends DrushCommands
{
    /**
     * Echos back hello with the argument provided.
     *
     * @command spec_publish
     * @usage spec_publish

     *   Publishes Specs and landing [age
     */
    public function publish()
    {
        $this->prepareSpecDir();

        //iterate specs
        $spec_dir = sprintf('%s/private/assets/*', \Drupal::root());
        $contents = array();
        foreach (glob($spec_dir) as $file) {
            $spec = null;
            $node = null;

            $title = $this->getSpecTitle($file);
            $link = $this->createAPISpecNode($file, $title);
            array_push($contents, $link);
        }
        $this->createLandingPage($contents);

        return array(
            '#markup' => 'Import complete.'
        );
    }

    /************* Helper Functions ***************/

    /**
     * Prepare Spec Directory
     */
    public function prepareSpecDir()
    {
        $destination = 'public://spec_publish-specs';
        file_prepare_directory($destination, FILE_CREATE_DIRECTORY);
    }
    
    /**
     * Create API Specification Node
     */
    public function createAPISpecNode($file, $title)
    {
        $node = Node::create([
            'type' => 'api_specification',
            'revision' => 0,
            'status' => true,
            'promote' => 0,
            'created' => time(),
            'langcode' => 'en',
            'title' => $title,
        ]);
        if (is_readable($file)) {
            $data = file_get_contents($file);
            $filename = basename($file);
            $destination = 'public://spec_publish-specs';
            $spec = file_save_data(
                $data,
                $destination . '/' . $filename,
                FILE_EXISTS_REPLACE
            );
        }
        if ($spec) {
            $node->get('field_specification')->appendItem($spec);
        }
        $node->save();
        $path = '/specs/' . str_replace(' ', '', $title);
        $this->setNodeAlias($node, $path);
        $link = '<a href="' . $path . '">' . $title . '</a>';
        return $link;
    }

    /**
     * Get API Specification Title
     */
    public function getSpecTitle($path)
    {
        $filename = basename($path);
        $info = pathinfo($filename);
        $name = basename($filename,'.'.$info['extension']);

        return $this->fromCamelCase($name);
    }

    public function fromCamelCase($camelCaseString) {
        $re = '/(?<=[a-z])(?=[A-Z])/x';
        $a = preg_split($re, $camelCaseString);
        return join($a, " " );
    }

    /**
     * Set Node Alias
     */
    public function setNodeAlias($node, $path)
    {
        $source = '/node/' . $node->get('nid')->value;
        \Drupal::service('path.alias_storage')->save($source, $path, 'en');
    }

    /**
     * Create Landing Page
     */
    public function createLandingPage($contents)
    {
        $node = Node::create([
            'type' => 'page',
            'uid' => 1,
            'revision' => 0,
            'status' => true,
            'promote' => 0,
            'created' => time(),
            'langcode' => 'en',
            'title' => 'Apigee Reference Bank',
        ]);

        $body = '<p>Welcome to the Apigee Reference Bank. This is your minimal portal. Please see <a href="https://github.com/laughingbiscuit/apigee-reference-bank">here</a> to learn how to install and customize the solution.</p><br><strong>Contents:</strong><br>';

        $arrlength = count($contents);
        for($x = 0; $x < $arrlength; $x++) {
            $body = $body . $contents[$x] . '<br>';
        }

        $node->set('body', [
            'value' => $body,
            'format' => 'basic_html'
        ]);
        $node->save();
        $this->setNodeAlias($node, '/home');
    }
}


