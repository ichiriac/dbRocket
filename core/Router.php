<?php
namespace rocket\core;

class Router extends Engine {
    /**
     * Routes :
     * - admin / action
     * - table / action / id 
     */
    public function find($uri) {
        $uri = trim(array_unshift(explode('?', $uri, 2)), '/');
        if (empty($uri)) $uri = 'admin/index';
        $parts = explode('/', $uri, 3);
        if ($parts[0] === 'admin') {
            return array(
                'rocket\\controllers\\admin',
                $parts[1]
            );
        }
    }
}