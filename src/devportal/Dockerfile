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
