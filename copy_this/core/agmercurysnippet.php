<?php
class agMercurySnippet extends oxBase
{
    /**
     * Core database table name. $_sCoreTbl could be only original data table name and not view name.
     *
     * @var string
     */
    protected $_sCoreTbl = 'agmercurysnippets';

    /**
     * Current class name
     *
     * @var string
     */
    protected $_sClassName = 'agmercurysnippet';

    public function __construct()
    {
        parent::__construct();
        $this->init( 'agmercurysnippets' );
    }
}