<?php
// DIC configuration
$container = $app->getContainer();

// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    return $logger;
};

//Eloquent connection
$capsule = new \Illuminate\Database\Capsule\Manager;
$capsule->addConnection($container['settings']['db']);
$capsule->setAsGlobal();
$capsule->bootEloquent();
$container['db'] = function ($container) use ($capsule){
   return $capsule;
};

//Redis client
$container['redis'] = function ($c) {
    $redisConf  = $c['settings']['redis'];
    $config = [
        'schema' => $redisConf['schema'],
        'host'   => $redisConf['host'],
        'port'   => $redisConf['port'],
    ];
    return $connection = new Predis\Client($config);
};

//validator utils
$container['validator'] = function ($c) {
    return $connection = new App\Utils\Validator();
};

//Users controller
$container['UsersController'] = function ($c) {
    $redis     = $c->get('redis');
    $logger    = $c->get('logger');
    $validator = $c->get('validator');
    return new \App\Controller\UsersController($redis, $logger, $validator);
};