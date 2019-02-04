#!/bin/bash

# site install
echo "Installing site..."
RESULT=$(docker exec -it some-drupal ./vendor/drush/drush/drush site-install apigee_devportal_kickstart --db-url=sqlite://sites/default/files/.ht.sqlite -n --site-name="Apigee Reference Bank")
PASS=$(echo $RESULT | grep -oh "password: .*" | sed "s/password: //")

echo $RESULT

# enable api specs
docker exec -i some-drupal ./vendor/drush/drush/drush en -y api_specification spec_publish

#ToDo set permissions properly
echo "Setting permissions..."
docker exec -i some-drupal chmod -R 777 /var/www/portal/web

# publish initial specs
echo "Importing specs..."
docker exec -i some-drupal ./vendor/drush/drush/drush spec_publish

# set front page
docker exec -i some-drupal ./vendor/drush/drush/drush config-set -y system.site page.front "/home"

echo "Portal Configuration Complete"
