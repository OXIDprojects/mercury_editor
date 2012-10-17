<?php
class oxcmp_mercury extends oxView
{
    /**
     * Marking object as component
     * @var bool
     */
    protected $_blIsComponent = true;
    
    public function allowMercury(){
    	return agmercury::allowMercury();
    }

    /**
     *  Set viewdata, call parent::render
     *
     * @return null
     */
    public function render()
    {
        parent::render();
        return $this;
    }
}
