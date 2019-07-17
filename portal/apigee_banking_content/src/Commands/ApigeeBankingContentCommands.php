<?php
namespace Drupal\apigee_banking_content\Commands;

use Drush\Commands\DrushCommands;
use Drupal\Core\Entity;

class ApigeeBankingContentCommands extends DrushCommands
{
    /**
     * Echos back hello with the argument provided.
     *
     * @command apigee_banking_content
     * @usage apigee_banking_content
     *   Publishes Banking Content
     */
  public function bankingContent() {
    drupal_set_message("Attempting to delete existing API Docs");

    $result = \Drupal::entityQuery('apidoc')
        ->execute();
    entity_delete_multiple('apidoc', $result);
    //$blah = \Drupal::entityTypeManager()->getStorage('apidoc')->load(7);
    //print_r($blah);
    $new = \Drupal::entityTypeManager()->getStorage('apidoc')->create([
      'name' => 'Petstore',
      'description' => ['value' => '<p>Petstore</p>', 'format' => 'basic_html'],
      'spec_file_source' => 'url',
      'file_link'=>['uri'=> 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml']
      
    ]);
    $new->save();

    //drupal_set_message("Deleted existing API Docs");
  }

}


