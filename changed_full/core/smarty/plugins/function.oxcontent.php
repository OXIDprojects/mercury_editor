<?php
/**
 *    This file is part of OXID eShop Community Edition.
 *
 *    OXID eShop Community Edition is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    OXID eShop Community Edition is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with OXID eShop Community Edition.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @link      http://www.oxid-esales.com
 * @package   smarty_plugins
 * @copyright (C) OXID eSales AG 2003-2011
 * @version OXID eShop CE
 * @version   SVN: $Id: function.oxcontent.php 33129 2011-02-10 10:28:57Z arvydas.vapsva $
 */

/**
 * Smarty plugin
 * -------------------------------------------------------------
 * File: insert.oxid_content.php
 * Type: string, html
 * Name: oxid_content
 * Purpose: Output content snippet
 * add [{ insert name="oxid_content" ident="..." }] where you want to display content
 * -------------------------------------------------------------
 *
 * @param array  $params  params
 * @param Smarty &$smarty clever simulation of a method
 *
 * @return string
 */
function smarty_function_oxcontent( $params, &$smarty )
{
    $myConfig = oxConfig::getInstance();
    $sText = $myConfig->getActiveShop()->oxshops__oxproductive->value ? null : "<b>content not found ! check ident(".$params['ident'].") !</b>";
    $smarty->oxidcache = new oxField($sText, oxField::T_RAW);

    $sIdent = isset( $params['ident'] )?$params['ident']:null;
    $sOxid  = isset( $params['oxid'] )?$params['oxid']:null;

    if ( $sIdent || $sOxid ) {
        $oContent = oxNew( "oxcontent" );
        if ( $sOxid ) {
            $blLoaded = $oContent->load( $sOxid );
        } else {
            $blLoaded = $oContent->loadbyIdent( $sIdent );
        }

        if ( !agmercury::allowMercury() && $blLoaded && $oContent->oxcontents__oxactive->value ) {
            // set value
            $sField = "oxcontent";
            if ( $params['field'] ) {
                $sField = $params['field'];
            }
            // set value
            $sProp = 'oxcontents__'.$sField;
            $smarty->oxidcache = clone $oContent->$sProp;
            $smarty->compile_check  = true;
            $sCacheId = oxLang::getInstance()->getBaseLanguage().(int) $myConfig->getShopCurrency();
            $sText = $smarty->fetch( "ox:".(string)$sIdent.(string)$sOxid.$sField.$sCacheId);
            $smarty->compile_check  = $myConfig->getConfigParam( 'blCheckTemplates' );
        }
    }
	
	//Sorround so inline editing is possible
	if($blLoaded && agmercury::allowMercury()){
		$sType = isset( $params['type'] )?$params['type']:'editable';
		$sText = '<div id="'.$oContent->getId().'" class="mercury-region" data-type="'.$sType.'" data-oxid="'.$oContent->getId().'" data-oxcls="oxcontent" data-oxfield="oxcontent">'.$oContent->oxcontents__oxcontent->value.'</div>';
	}
    // if we write '[{oxcontent ident="oxfirststart" assign="fs_text"}]' the content wont be outputed.
    // instead of this the content will be assignet to variable.
    if( isset( $params['assign']) && $params['assign'])
        $smarty->assign($params['assign'], $sText);
    else
        return $sText;

}