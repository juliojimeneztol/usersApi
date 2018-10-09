#!/bin/bash
# Do some stuffs
puppet apply /etc/puppet/manifests/app.pp
ant -buildfile /var/www/sites/slim/build.xml
ant -buildfile /var/www/sites/angular/build.xml