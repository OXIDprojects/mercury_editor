<?php

function smarty_function_agmercury( $params, &$smarty )
{
    $myConfig = oxConfig::getInstance();    
    
    $sOxid  = isset( $params['oxid'] )?$params['oxid']:null;
	
    if ( $sOxid ) {
        
        $oSnippet = oxNew("agmercurysnippet");
        
        if($oSnippet->load($sOxid)){
        
        	$sSnippetName = $oSnippet->agmercurysnippets__name->value;
        	
        	//Using oxUBase for now
        	$oViewObject = oxNew("oxUBase");
        	
        	// render it
	        $oViewObject->render();
	        $aViewData = $oViewObject->getViewData();
			
			//Format options
			$aOptions = (array)json_decode($oSnippet->agmercurysnippets__options->rawValue);
			$aViewOptions = array();
			foreach($aOptions as $key => $value){
				
				$sNewKey = str_replace('options[', '', $key);
				$sNewKey = str_replace(']', '', $sNewKey);
				$aViewOptions[$sNewKey] = $value;
			}
				
	        $oOutput = oxNew("oxoutput");
	        $aViewData = $oOutput->processViewArray( $aViewData, $oViewObject->getClassName() );			
	        $aViewData['options'] = $aViewOptions;
	        $oViewObject->setViewData( $aViewData );
		        
	        foreach ( array_keys( $aViewData ) as $sViewName ) {
	            $smarty->assign_by_ref( $sViewName, $aViewData[$sViewName] );
	        }
	
	        // passing current view object to smarty
	        $smarty->oxobject = $oViewObject;	
	        $smarty->compile_check  = true;
	        $sOutput = $smarty->fetch( "mercury/snippets/$sSnippetName/preview.tpl", $oViewObject->getViewId() );
			$smarty->compile_check  = $myConfig->getConfigParam( 'blCheckTemplates' );
	        //Output processing - useful for modules as sometimes you may want to process output manually.
	        $sOutput = $oOutput->process( $sOutput, $oViewObject->getClassName() );
	        
	        return $sOutput;
        }
        
        
    }
	
	return "snippet not found $sOxid";
}
