<?php

	class mercury extends oxUBase{
		
		public function __construct()
		{
			if(!agmercury::allowMercury()){
				throw new Exception('access not allowed');
			}
		}
		
		public function save(){
									
			$aRequest = json_decode(oxConfig::getParameter('content',true));
						
			if($aRequest){
			
				//print_r($aRequest);
				
				foreach ($aRequest as $sOxid => $oValue) {
					$sType = $oValue->type;
					$oData = $oValue->data;
					
					if($oData){
						$sOxid = $oData->oxid;
						$sClass = $oData->oxcls;
						$sField = $oData->oxfield;
					}
					
					if(!$sType || !$sClass || !$sField) continue;
					
					
					$oObject = oxNew($sClass);
					
					$oValue->value = str_replace("&gt;", ">", $oValue->value);
					$oValue->value = str_replace("&lt;", "<", $oValue->value);
					
					switch($sType){
						case 'snippetable':
						case 'editable':							
							if($oObject->load($sOxid)){
								$oValue->value = $this->_saveSnippets($sOxid,$oValue->snippets,$oValue->value);
								$oObject->assign(array($sField => utf8_decode($oValue->value) ));
								$oObject->save();
								
							}
							break;							
					}
				}
			}
			
			exit();
			
		}
		
		protected function _saveSnippets($sOxid,$oSnippets,$sValue){
			$aSnippets = (array)$oSnippets;
			if(is_array($aSnippets)){
				
				$oDb = oxDb::getDb();
				
				foreach($aSnippets as $sSnipId => $oSnippet){
					$sName = $oSnippet->name;
					$oOxidSnippet = oxNew("oxbase");
					$oOxidSnippet->init('agmercurysnippets');
					
					$sSnippetOxid = $oDb->GetOne('SELECT oxid FROM agmercurysnippets WHERE objectid = ' . $oDb->quote($sOxid) . ' AND id = ' . $oDb->quote($sSnipId));
					$oOxidSnippet->load($sSnippetOxid);
					
					$oOxidSnippet->assign(array(
						'agmercurysnippets__objectid' => $sOxid,
						'agmercurysnippets__id' => $sSnipId,
						'agmercurysnippets__name' => $sName,
						'agmercurysnippets__options' => json_encode($oSnippet->options),
					));
					
					$oOxidSnippet->save();
					
					//Replace in content by smarty function
					$sValue = str_replace('['.$sSnipId.']', '[{agmercury oxid="'.$oOxidSnippet->getId().'"}]', $sValue);
				}
			}
			return $sValue;
		}
		
		public function snippetinfos(){
			$sObjectId = oxConfig::getParameter("oxid");
			$oDb = oxDb::getDb();
			//echo 'SELECT * FROM agmercurysnippets WHERE objectid = ' . $oDb->quote($sObjectId);
			
			$oList = oxNew("oxlist");
			$oList->init("agmercurysnippet");
			$oList->selectString('SELECT * FROM agmercurysnippets WHERE objectid = ' . $oDb->quote($sObjectId));
			
			$oResult = new stdClass();
			
			foreach($oList as $oSnippet){
				$sSnipId = $oSnippet->agmercurysnippets__id->value;
				$oResult->$sSnipId = new stdClass();
				
				$oResult->$sSnipId->name = $oSnippet->agmercurysnippets__name->value;
				$oResult->$sSnipId->options = json_decode($oSnippet->agmercurysnippets__options->rawValue);
			}			
			
			echo json_encode($oResult);
			exit();
		}
		
		public function snippetoptions(){
			$sSnippetName = oxConfig::getParameter('name');
			$this->_aViewData['options'] = oxConfig::getParameter("options",true);
			$this->_sThisTemplate = "mercury/snippets/$sSnippetName/options.tpl";
		}
		
		public function snippetpreview(){
			$sSnippetName = oxConfig::getParameter('name');
			$this->_aViewData['options'] = oxConfig::getParameter("options",true);
			$this->_sThisTemplate = "mercury/snippets/$sSnippetName/preview.tpl";
		}
		
		public function upload(){
			$aImage = $_FILES['image'];
			$sNewName = time()*rand();
			switch($aImage['type']['image']){
				case 'image/jpeg':
					$sNewName .= ".jpeg";
					break;
				case 'image/png':
					$sNewName .= ".png";
					break;
				case 'image/gif':
					$sNewName .= ".gif";
					break;
				default:
					die();
			}
			
			$sTargetPath = getShopBasePath()."out/pictures/mercury/".$sNewName;
			
			move_uploaded_file($aImage['tmp_name']['image'], $sTargetPath);
			
			$oRes = new stdClass();
			$oRes->image = new stdClass();
			$oRes->image->url = 'out/pictures/mercury/'.$sNewName;
			echo json_encode($oRes);
			exit();
		}
		
	}

?>