<?php
require_once __DIR__ . '/../bootstrap.php';
$rocket = new rocket();
$rocket->respond(
    $rocket->launch(
        $_SERVER['REQUEST_URI'], $_REQUEST
    )
);