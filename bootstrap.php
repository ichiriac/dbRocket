<?php
/**
 * rocketDb - put a rocket on your backoffice
 * The simplest way to generate a lightweight standalone CRUD app 
 * @author I. CHIRIAC
 * @license MIT
 */

// autoload using rocket namespace
spl_autoload_register(function($class) {
    if (substr($class,0,7) === 'rocket\\' ) {
        require_once __DIR__ . strtr(substr($class, 6), '\\', '/') . '.php';
        return true;
    }
    return false;
});

/**
 * Main application class
 */
class rocket {
    private $services = array();
    private $config = array();
    /**
     * Routes :
     * - admin / action
     * - table / action / id 
     */
    public function route($uri) {
        if (empty($uri)) $uri = 'admin/index';
        $parts = explode('/', trim($uri, '/'), 3)
        if ($parts[0] === 'admin') {
            return array(
                'rocket\\controllers\\admin',
                $parts[1]
            );
        }
    }
    /**
     * Gets an service instance
     * @see config/services.php
     */
    final public function service($name) {
        if (!isset($this->services[$name])) {
            $service = $this->config('services', $name);
            $this->services[$name] = new $service['class'](
                $this,
                empty($service['options']) ? 
                    array() : $service['options']
            );
        }
        return $this->services[$name];
    }
    /**
     * Reads a configuration entry
     */
    final public function config($section, $key) {
        if (!isset($this->config[$section])) {
            $this->config[$section] = json_decode(
                file_get_contents(
                    __DIR__ . '/config/' . $section . '.json'
                ), true
            );
        }
        return $this->config[$section][$key];
    }
    /**
     * Gets a model handler
     */
    final public function model($table) {
    
    }
    /**
     * Gets the session manager
     */
    final public function session() {
        return $this->service('session');
    }
    final public function db() {
        return $this->service('db');
    }
    final public function view() {
        return $this->service('view');
    }
    final public function router() {
        return $this->service('router');
    }
    final public function respond($data) {
        echo $data;
    }
    /**
     * Launch the rocket :
     * <code>
     * $rocket = new rocket();
     * $rocket->respond(
     *      $rocket->launch($_SERVER['REQUEST_URI'], $_REQUEST)
     * );
     * </code>
     */
    public function launch($uri, $request) {
        $target = $this->router()->find($uri);
        if (!empty($target)) {
            $controller = new $target[0]($this);
            return $controller->$target[1]($request);
        } else {
            echo '404';
        }
    }
}