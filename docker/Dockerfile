FROM centos:7
MAINTAINER "Julio jimenez" <juliojimeneztol@gmail.com>
ENV container docker
EXPOSE 9200 3306 80 443
RUN yum -y install wget
RUN wget http://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
RUN rpm -ivh epel-release-latest-7.noarch.rpm
RUN yum -y install gcc ruby ruby-devel rubygems 
RUN gem update --system
RUN yum -y groupinstall 'Development Tools'
RUN curl --silent --location https://rpm.nodesource.com/setup_6.x| bash -
RUN yum install -y nodejs
RUN npm install -g typescript
RUN npm install -g @angular/cli@1.7.4
RUN yum -y install redis
RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == systemd-tmpfiles-setup.service ] || rm -f $i; done); \
rm -f /lib/systemd/system/multi-user.target.wants/*;\
rm -f /etc/systemd/system/*.wants/*;\
rm -f /lib/systemd/system/local-fs.target.wants/*; \
rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
rm -f /lib/systemd/system/basic.target.wants/*;\
rm -f /lib/systemd/system/anaconda.target.wants/*;
VOLUME [ "/sys/fs/cgroup" ]
#CMD ["/usr/sbin/init"]
## ******** Instalacion de puppet **********
RUN rpm -ivh http://yum.puppetlabs.com/puppetlabs-release-el-7.noarch.rpm
RUN yum repolist | grep puppet
RUN yes | yum -y install puppet
RUN puppet --version
RUN puppet module install jfryman-nginx
RUN puppet module install stahnma-epel
RUN puppet module install treydock-gpg_key
RUN puppet module install example42-yum
RUN puppet module install willdurand/composer
RUN puppet module install thias-php
RUN puppet module install puppetlabs-apt
RUN puppet module install puppetlabs-stdlib
RUN puppet module install puppetlabs-mysql --version 3.0.0
RUN puppet module install puppetlabs-concat
COPY puppet/services/mysqlservice.pp /etc/puppet/manifests/mysqlservice.pp
COPY puppet/services/nginxservice.pp /etc/puppet/manifests/nginxservice.pp
COPY puppet/services/phpservice.pp /etc/puppet/manifests/phpservice.pp
COPY puppet/tools/composertool.pp /etc/puppet/manifests/composertool.pp
COPY puppet/tools/tools.pp /etc/puppet/manifests/tools.pp
COPY puppet/app.pp /etc/puppet/manifests/app.pp
COPY db/gigigo.sql /etc/puppet/db/gigigo.sql
COPY web/index.html /var/www/sites/angular/web/index.html
COPY web/ini.php /var/www/sites/slim/web/ini.php
ADD setup.sh /setup.sh
RUN chmod +x /setup.sh
CMD ["/usr/sbin/init"]
#RUN /usr/sbin/init
#RUN puppet apply --modulepath=/etc/puppet/modules /etc/puppet/manifests/app.pp
#ADD setup.sh /setup.sh
#RUN chmod 755 /setup.sh
#RUN echo "./setup.sh">> /etc/bashrc