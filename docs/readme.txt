    :::      ::::::::   ::::::::  :::::::::   ::::::::   ::::::::   ::::::::  :::::::::: ::::::::::: 
  :+: :+:   :+:    :+: :+:    :+: :+:    :+: :+:    :+: :+:    :+: :+:    :+: :+:            :+:     
 +:+   +:+  +:+        +:+        +:+    +:+ +:+    +:+ +:+        +:+    +:+ +:+            +:+     
+#++:++#++: :#:        :#:        +#++:++#:  +#+    +:+ +#++:++#++ +#+    +:+ :#::+::#       +#+     
+#+     +#+ +#+   +#+# +#+   +#+# +#+    +#+ +#+    +#+        +#+ +#+    +#+ +#+            +#+     
#+#     #+# #+#    #+# #+#    #+# #+#    #+# #+#    #+# #+#    #+# #+#    #+# #+#            #+#     
###     ###  ########   ########  ###    ###  ########   ########   ########  ###            ###     

____________________________________________________________________________________________________
_______________________________________ Oxid Mercury Editor ________________________________________
____________________________________________________________________________________________________
# Shop Systemvoraussetzungen:

	* Oxid E-Sales CE 4.5.1 oder höher (entwickelt für OXID_ESHOP_CE_4.5.4)
    
# Client Systemvoraussetzungen:

	* Firefox 4+ (getestet)
	* Chrome 10+ (in Arbeit)
	* Safari 5+ (ungetestet)
	
# Installation:

	* Kopieren Sie die Dateien aus dem copy_this Verzeichnis per FTP in Ihren Shop
	
	* Übernehmen Sie die Änderungen der Dateien im changed_full Verzeichnis in Ihre Shop Dateien, 
	  sollten Sie keine Änderungen an diesen Dateien vorgenommen haben reicht es diese einfach zu 
	  überspielen (funktioniert nur bei Oxid CE 4.5.4).
	 
	* Erweitern Sie die Datei config.inc.php:
	
	//Standard (so sollte es in Ihrer config stehen
	$this->aUserComponentNames = null;
	
	//Ersetzen durch dieses (oder Erweitern, fragen Sie bitte Ihre zuständige Medien Agentur wenn Sie nicht weiter wissen!)
	$this->aUserComponentNames = array('oxcmp_mercury' => false);
	
	* Führen Sie die SQL Befehle aus der Datei sql/install.sql in Ihrer Shop Datenbank aus
	
	* Sollten Sie nicht das azure theme verwenden achten Sie bitte darauf die Dateien in out/azure/ in Ihren Template Ordner zu übernehmen
	  
	  PASSEN SIE BITTE IN DIESEM FALL AUßERDEM FOLGENDE DATEI AN 
	  
	  out/azure/src/mercury/javascripts/mercury_loader.js
	  
	  und ersetzen Sie in folgender Zeile azure durch Ihren Template Namen:
	  
	  src: 'out/azure/src/mercury/'	  
	  
	
	* Legen Sie Regionen fest die editierbar sind, diese folgen der Mercury Spezifikation - derzeit werden die Regionentypen editable und snippetable unterstützt
	  Ein Beispiel hierzu können Sie dem Ordner changed_full_region_example entnehmen. Durch die Änderungen im changed_full Ordner sind automatisch alle CMS Inhalte
	  mit Mercury editierbar.
	
	* Leeren Sie den tmp Ordner vollständig
	
	* Loggen Sie sich nun mit einem Admin Benutzer im Shop Frontend ein, Mercury erscheint dann automatisch

# Weitere Hinweise

	* Das Plugin ist noch im Alpha Stadium - SUPPORT GIBT ES NUR IM OXID FORUM >> NICHT PER EMAIL <<
	* Achten Sie auf die beschriebenen Anpassungen für andere Templates als azure
	* Mercury und das Plugin unterstehen der MIT Lizenz, Hinweise hierzu in der Datei license.txt
		
# Support und Hilfe

	* Bei Problemen oder Fragen zu diesem Modul melden Sie sich im entsprechenden Foren Beitrag im Oxid E-Sales Forum
	
# Lizenz

The MIT License (MIT)

Copyright (c) 2011 Aggrosoft GbR

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
