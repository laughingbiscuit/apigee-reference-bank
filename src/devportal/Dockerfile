FROM drupal:8-apache

# install dependencies
RUN apt-get update
RUN apt-get install -y curl git ranger libpng-dev unzip vim sqlite3
RUN docker-php-ext-install gd

WORKDIR /var/www

# install and setup drupal tools
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN rm composer-setup.php
RUN mv composer.phar /usr/bin/composer

# create project
RUN composer create-project apigee/devportal-kickstart-project:8.x-dev portal --stability dev --no-interaction

WORKDIR /var/www/portal

# install drush
RUN composer require drush/drush
RUN yes | ./vendor/drush/drush/drush init

# install dependencies
RUN composer require drupal/swagger_ui_formatter

RUN sed -i 's/DocumentRoot .*/DocumentRoot \/var\/www\/portal\/web/' /etc/apache2/sites-available/000-default.conf

RUN mkdir -p /var/www/portal/web/sites/default/files
RUN cp /var/www/portal/web/sites/default/default.settings.php /var/www/portal/web/sites/default/settings.php 

ADD ./api_specification ./web/modules/custom/features/api_specification
ADD ./spec_publish ./web/modules/spec_publish
ADD ./specs ./web/private/assets/

WORKDIR /var/www/portal/web

RUN mkdir libraries && curl -sSL https://github.com/swagger-api/swagger-ui/archive/v3.19.4.tar.gz -o swagger.tar.gz && tar -xvzf swagger.tar.gz && rm swagger.tar.gz  && mv swagger-ui-3.19.4 libraries/swagger_ui

WORKDIR /var/www/portal
