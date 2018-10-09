import 'mysqlservice'
import 'nginxservice'
import 'phpservice'
import 'tools'
import 'composertool'

class front {

    require mysqlservice
    require nginxservice
    require phpservice
    require tools
    require composertool

    nginx::resource::vhost { 'www.front.com':
        www_root             => '/var/www/sites/angular/web',
        ssl                  => true,
        listen_port          => 80,
        ssl_cert             => '/var/www/sites/docker/certs/server.crt',
        ssl_key              => '/var/www/sites/docker/certs/server.key',
        index_files          => ['index.html', 'index.htm'],
        use_default_location => true,
        location_cfg_append  => {
            try_files => '$uri $uri/ /index.html'
        }
    }
}

class api {

    require mysqlservice
    require nginxservice
    require phpservice
    require tools
    require composertool

    nginx::resource::vhost { 'www.api.com':
        www_root             => '/var/www/sites/slim/web',
        ssl                  => true,
        ssl_cert             => '/var/www/sites/docker/certs/server.crt',
        ssl_key              => '/var/www/sites/docker/certs/server.key',
        index_files          => ['ini.php'],
        use_default_location => true,
        add_header => {
            "'Access-Control-Allow-Origin'"      => "'http://www.front.com'",
            "'Access-Control-Allow-Credentials'" => "'true'",
            "'Access-Control-Allow-Methods'"     => "'GET, POST, OPTIONS, PUT, DELETE'",
            "'Access-Control-Allow-Headers'"     => "'User-Agent, Content-Type'",
            "'Access-Control-Max-Age'"           => "'60'"
        },
        location_cfg_append  => {
            try_files => '$uri $uri/ /ini.php$is_args$args'
        }
    }

    nginx::resource::location { "api":
        ensure          => present,
        ssl             => true,
        vhost           => 'www.api.com',
        www_root        => '/var/www/sites/slim/web',
        location        => '~ \.php$',
        index_files     => ['ini.php'],
        proxy           => undef,
        fastcgi         => "127.0.0.1:9001",
        fastcgi_script  => undef,
        location_cfg_append => {
            fastcgi_connect_timeout => '5h',
            fastcgi_read_timeout    => '5h',
            fastcgi_send_timeout    => '5h',
            fastcgi_param    => "APPLICATION_ENV 'dev'"
        }
    }   
}

include front
include api