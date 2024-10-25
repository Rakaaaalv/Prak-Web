<?php

namespace Controller;

class Controller{
    // Controller attributes
    var $controllerName;
    var $controllerMethod;

    // Method untuk ambil semua attributes
    public function getControllerAttribute(){
        return [
            "ControllerName" => $this->controllerName,
            "ControllerMethod" => $this->controllerMethod,
        ];
    }
}