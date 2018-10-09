<?php
$base = __DIR__ . '/../app/';

$folders = [
    'utils',
    'model',
    'controller'
];

foreach($folders as $f)
{
    foreach (glob($base . "$f/*.php") as $filename)
    {
        require $filename;
    }
}
