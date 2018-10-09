<?php
/**
 * Router
 * @author Julio Jimenez <juliojimeneztol@gmail.com>
 */
use Slim\Http\Request;
use Slim\Http\Response;

$app->add(function(Request $request, Response $response, $next) {
    $response = $next($request, $response);
    return $response->withHeader('Content-Type', 'application/json');
});

//Router
$app->get('/', function (Request $request, Response $response) {
    return $response->withStatus(403)->write('Forbidden.');
});

//Router options cors
$app->options('{routes:.+}', function (Request $request, Response $response) {
    return $response->withStatus(200);
});

//Router API users
$app->get('/users', 'UsersController:all');
$app->get('/users/{id:[0-9]+}', 'UsersController:get');
$app->post('/users', 'UsersController:post');
$app->put('/users/{id:[0-9]+}', 'UsersController:put');
$app->delete('/users/{id:[0-9]+}', 'UsersController:delete');