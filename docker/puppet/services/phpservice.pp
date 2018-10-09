import 'nginxservice'

class phpservice {
    require yum::repo::remi
    require yum::repo::epel
    require yum::repo::remi_php70
    require nginxservice
    
    package { 'libtidy': ensure  => present }
    package { 'libtidy-devel': ensure  => present }
    package { 'php-tidy': ensure  => present }
    class { php::fpm::daemon:
        log_owner => 'nginx',
        log_group => 'nginx',
        log_dir_mode => '0775'
    }

    php::fpm::conf { 
        'www':
            listen  => '127.0.0.1:9001',
            user    => 'nginx'
    }

    php::module { [ 'pecl-apcu',
        'pear',
        'pdo',
        'mysqlnd',               
        'mbstring',
        'mcrypt',
        'pecl-zip',        
        'xml',
        'php-devel',
        'pecl-redis',
        'soap']:
        notify  => Service['php-fpm']
    }
    php::ini { '/etc/php.ini':
        short_open_tag              => 'On',
        asp_tags                    => 'Off',
        date_timezone               => 'America/Mexico_City',
        error_reporting             => 'E_ALL & ~E_DEPRECATED',
        display_errors              => 'On',
        html_errors                 => 'On',
        notify  => Service['php-fpm']
    }
    file { '/var/log/php-fpm/www-error.log':
        ensure => "file",
        owner  => "nginx",
        group  => "nginx",
        mode   => 777
    }
    file { '/var/log/php-fpm/error.log':
        ensure => "file",
        owner  => "nginx",
        group  => "nginx",
        mode   => 777,
    }
}