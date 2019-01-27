#!/bin/bash

# site install
docker exec -i some-drupal ./vendor/drush/drush/drush site-install apigee_devportal_kickstart --db-url=sqlite://sites/default/files/.ht.sqlite -n --site-name="Apigee Reference Bank"

# enable api specs
docker exec -i some-drupal ./vendor/drush/drush/drush en -y api_specification 

#TODO set permissions properly
docker exec -i some-drupal chmod -R 777 /var/www/portal/web

