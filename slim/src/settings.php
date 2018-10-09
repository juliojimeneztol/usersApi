<?php
return [
    'settings' => [
        'displayErrorDetails' => false, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../web/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => isset($_ENV['docker']) ? 'php://stdout' : '/var/log/php-fpm/www-error.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
        //Database connection
        'db' => [
            'driver'    => 'mysql',
            'host'      => 'localhost',
            'database'  => 'gigigo',
            'username'  => 'gigigo',
            'password'  => 'password',
            'port'      => '3306',
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
        ],
        //Cache data
        'redis' => [
            'schema' => 'mesaRegalos',
            'host'   => '127.0.0.1',
            'port'   => 6379
        ],
    ],
];
