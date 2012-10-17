<?php

	class agmercury extends oxStdClass{
		
		public static function allowMercury(){
			
			$oUser = oxNew("oxuser");
			$oUser->loadActiveUser();
			
			return $oUser && $oUser->oxuser__oxrights->value == 'malladmin';
			
		}
		/*
		public static function parseMercurySmarty($sContent){
			
			('/\[\{\s*agmercury\s*ident="\w*"\s*\}\]/i', $replacement, $subject[, $limit=-1[, &$count]])
			if(preg_match_all('/\[\{\s*agmercury\s*ident="\w*"\s*\}\]/i', $sContent, $matches)){
				
			}
		}
		*/
	}