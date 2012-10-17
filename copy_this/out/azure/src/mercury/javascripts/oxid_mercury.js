function mercuryBeforeLoad(){
	
	var opts = {
	
		saveURL: 'index.php?cl=mercury&fnc=save',
		config: {
		    // ## Hijacking Links & Forms
		    // Mercury will hijack links and forms that don't have a target set, or the target is set to _self and will set it
		    // to _top.  This is because the target must be set properly for Mercury to not get in the way of some
		    // functionality, like proper page loads on form submissions etc.  Mercury doesn't do this to links or forms that
		    // are within editable regions because it doesn't want to impact the html that's saved.  With that being explained,
		    // you can add classes to links or forms that you don't want this behavior added to.  Let's say you have links that
		    // open a lightbox style window, and you don't want the targets of these to be set to _top.  You can add classes to
		    // this array, and they will be ignored when the hijacking is applied.
		    nonHijackableClasses: [],
		
		
		    // ## Pasting (in Chrome/Safari)
		    //
		    // When copying content using webkit, it embeds all the user defined styles (from the css files) into the html
		    // style attributes directly.  When pasting this content into HTML5 contentEditable elements it leaves these
		    // intact.  This can be a desired feature, or an annoyance, so you can enable it or disable it here.  Keep in mind
		    // this will only change the behavior in webkit, as mozilla doesn't do this.
		    cleanStylesOnPaste: true,
		
		
		    // ## Snippet Options and Preview
		    //
		    // When a user drags a snippet onto the page they'll be prompted to enter options for the given snippet.  The server
		    // is expected to respond with a form.  Once the user submits this form, an Ajax request is sent to the server with
		    // the options provided; this preview request is expected to respond with the rendered markup for the snippet.
		    //
		    // Name will be replaced with the snippet name (eg. example)
		    snippets: {
		      method: 'POST',
		      optionsUrl: 'index.php?cl=mercury&fnc=snippetoptions&name=:name',
		      previewUrl: 'index.php?cl=mercury&fnc=snippetpreview&name=:name'
		      },
		
		
		    // ## Image Uploading
		    //
		    // If you drag images (while pressing shift) from your desktop into regions that support it, it will be uploaded
		    // to the server and inserted into the region.  This configuration allows you to specify if you want to
		    // disable/enable this feature, the accepted mime-types, file size restrictions, and other things related to
		    // uploading.  You can optionally provide a handler function that takes the response from the server and returns an
		    // object: {image: {url: '[your provided url]'}
		    //
		    // **Note:** Image uploading is only supported in some region types.
		    uploading: {
		      enabled: true,
		      allowedMimeTypes: ['image/jpeg', 'image/gif', 'image/png'],
		      maxFileSize: 1235242880,
		      inputName: 'image[image]',
		      url: 'index.php?cl=mercury&fnc=upload',
		      handler: false
		      },
		
		
		    // ## Toolbars
		    //
		    // This is where you can customize the toolbars by adding or removing buttons, or changing them and their
		    // behaviors.  Any top level object put here will create a new toolbar.  Buttons are simply nested inside the
		    // toolbars, along with button groups.
		    //
		    // Some toolbars are custom (the snippetable toolbar for instance), and to denote that use _custom: true.  You can
		    // then build the toolbar yourself with it's own behavior.
		    //
		    // Buttons can be grouped, and a button group is simply a way to wrap buttons for styling -- they can also handle
		    // enabling or disabling all the buttons within it by using a context.  The table button group is a good example
		    // of this.
		    //
		    // It's important to note that each of the button names (keys), in each toolbar object must be unique, regardless
		    // of if it's in a button group, or nested, etc.  This is because styling is applied to them by name, and because
		    // their name is used in the event that's fired when you click on them.
		    //
		    // Button format: `[label, description, {type: action, type: action, etc}]`
		    //
		    // ### The available button types are:
		    //
		    // - toggle:  toggles on or off when clicked, otherwise behaves like a button
		    // - modal:   opens a modal window, expects the action to be one of:
		    //   1. a string url
		    //   2. a function that returns a string url
		    // - panel:   opens a panel dialog, expects the action to be one of:
		    //   1. a string url
		    //   2. a function that returns a string url
		    // - palette: opens a palette window, expects the action to be one of:
		    //   1. a string url
		    //   2. a function that returns a string url
		    // - select:  opens a pulldown style window, expects the action to be one of:
		    //   1. a string url
		    //   2. a function that returns a string url
		    // - context: calls a callback function, expects the action to be:
		    //   1. a function that returns a boolean to highlight the button
		    //   note: if a function isn't provided, the key will be passed to the contextHandler, in which case a default
		    //         context will be used (for more info read the Contexts section below)
		    // - mode:    toggle a given mode in the editor, expects the action to be:
		    //   1. a string, denoting the name of the mode
		    //   note: it's assumed that when a specific mode is turned on, all other modes will be turned off, which happens
		    //         automatically, thus putting the editor into a specific "state"
		    // - regions: allows buttons to be enabled/disabled based on what region type has focus, expects the action to be:
		    //   1. an array of region types (eg. ['editable', 'markupable'])
		    // - preload: allows some dialog views to be loaded when the button is created instead of on first open, expects:
		    //   1. a boolean true / false
		    //   note: this is only used by panels, selects, and palettes
		    //
		    // Separators are any "button" that's not an array, and are expected to be a string.  You can use two different
		    // separator styles: line ('-'), and spacer (' ').
		    toolbars: {
		      primary: {
		        save:                  ['Speichern', 'Save this page'],
		        preview:               ['Vorschau', 'Preview this page', { toggle: true, mode: true }],
		        sep1:                  '-',
		        undoredo:              {
		          undo:                ['Undo', 'Undo your last action'],
		          redo:                ['Redo', 'Redo your last action'],
		          sep:                 ' '
		          },
		        insertLink:            ['Link', 'Insert Link', { modal: 'out/azure/src/mercury/modals/link.html', regions: ['editable', 'markupable'] }],
		        insertMedia:           ['Medien', 'Insert Media (images and videos)', { modal: 'out/azure/src/mercury/modals/media.html', regions: ['editable', 'markupable'] }],
		        insertTable:           ['Tabelle', 'Insert Table', { modal: 'out/azure/src/mercury/modals/table.html', regions: ['editable', 'markupable'] }],
		        insertCharacter:       ['Zeichen', 'Special Characters', { modal: 'out/azure/src/mercury/modals/character.html', regions: ['editable', 'markupable'] }],
		        snippetPanel:          ['Snippet', 'Snippet Panel', { panel: 'out/azure/src/mercury/panels/snippets.html' }],
		        sep2:                  ' ',
		        historyPanel:          ['Historie', 'Page Version History', { panel: 'out/azure/src/mercury/panels/history.html' }],
		        sep3:                  ' ',
		        notesPanel:            ['Notizen', 'Page Notes', { panel: 'out/azure/src/mercury/panels/notes.html' }]
		        },
		
		      editable: {
		        _regions:              ['editable', 'markupable'],
		        predefined:            {
		          style:               ['Style', null, { select: 'out/azure/src/mercury/selects/style.html', preload: true }],
		          sep1:                ' ',
		          formatblock:         ['Block Format', null, { select: 'out/azure/src/mercury/selects/formatblock.html', preload: true }],
		          sep2:                '-'
		          },
		        colors:                {
		          backColor:           ['Background Color', null, { palette: 'out/azure/src/mercury/palettes/backcolor.html', context: true, preload: true, regions: ['editable'] }],
		          sep1:                ' ',
		          foreColor:           ['Text Color', null, { palette: 'out/azure/src/mercury/palettes/forecolor.html', context: true, preload: true, regions: ['editable'] }],
		          sep2:                '-'
		          },
		        decoration:            {
		          bold:                ['Bold', null, { context: true }],
		          italic:              ['Italicize', null, { context: true }],
		          overline:            ['Overline', null, { context: true, regions: ['editable'] }],
		          strikethrough:       ['Strikethrough', null, { context: true, regions: ['editable'] }],
		          underline:           ['Underline', null, { context: true, regions: ['editable'] }],
		          sep:                 '-'
		          },
		        script:                {
		          subscript:           ['Subscript', null, { context: true }],
		          superscript:         ['Superscript', null, { context: true }],
		          sep: '-'
		          },
		        justify:               {
		          justifyLeft:         ['Align Left', null, { context: true, regions: ['editable'] }],
		          justifyCenter:       ['Center', null, { context: true, regions: ['editable'] }],
		          justifyRight:        ['Align Right', null, { context: true, regions: ['editable'] }],
		          justifyFull:         ['Justify Full', null, { context: true, regions: ['editable'] }],
		          sep:                 '-'
		          },
		        list:                  {
		          insertUnorderedList: ['Unordered List', null, { context: true }],
		          insertOrderedList:   ['Numbered List', null, { context: true }],
		          sep:                 '-'
		          },
		        indent:                {
		          outdent:             ['Decrease Indentation', null],
		          indent:              ['Increase Indentation', null],
		          sep:                 '-'
		          },
		        table:                 {
		          _context:            true,
		          insertRowBefore:     ['Insert Table Row', 'Insert a table row before the cursor', { regions: ['editable'] }],
		          insertRowAfter:      ['Insert Table Row', 'Insert a table row after the cursor', { regions: ['editable'] }],
		          deleteRow:           ['Delete Table Row', 'Delete this table row', { regions: ['editable'] }],
		          insertColumnBefore:  ['Insert Table Column', 'Insert a table column before the cursor', { regions: ['editable'] }],
		          insertColumnAfter:   ['Insert Table Column', 'Insert a table column after the cursor', { regions: ['editable'] }],
		          deleteColumn:        ['Delete Table Column', 'Delete this table column', { regions: ['editable'] }],
		          sep1:                ' ',
		          increaseColspan:     ['Increase Cell Columns', 'Increase the cells colspan'],
		          decreaseColspan:     ['Decrease Cell Columns', 'Decrease the cells colspan and add a new cell'],
		          increaseRowspan:     ['Increase Cell Rows', 'Increase the cells rowspan'],
		          decreaseRowspan:     ['Decrease Cell Rows', 'Decrease the cells rowspan and add a new cell'],
		          sep2:                '-'
		          },
		        rules:                 {
		          horizontalRule:      ['Horizontal Rule', 'Insert a horizontal rule'],
		          sep1:                '-'
		          },
		        formatting:            {
		          removeFormatting:    ['Remove Formatting', 'Remove formatting for the selection', { regions: ['editable'] }],
		          sep2:                ' '
		          },
		        editors:               {
		          htmlEditor:          ['Edit HTML', 'Edit the HTML content', { regions: ['editable'] }]
		          }
		        },
		
		      snippetable: {
		        _custom:               true,
		        actions:               {
		          editSnippet:         ['Edit Snippet Settings', null],
		          sep1:                ' ',
		          removeSnippet:       ['Remove Snippet', null]
		          }
		        }
		      },
		
		
		    // ## Behaviors
		    //
		    // Behaviors are used to change the default behaviors of a given region type when a given button is clicked.  For
		    // example, you may prefer to add HR tags using an HR wrapped within a div with a classname (for styling).  You
		    // can add your own complex behaviors here.
		    //
		    // You can see how the behavior matches up directly with the button name.  It's also important to note that the
		    // callback functions are executed within the scope of the given region, so you have access to all it's methods.
		    behaviors: {
		      horizontalRule: function(selection) { selection.replace('<hr/>') },
		      htmlEditor: function() { Mercury.modal('/mercury/modals/htmleditor.html', { title: 'HTML Editor', fullHeight: true, handler: 'htmlEditor' }) }
		      },
		
		    regionDataAttributes: ['oxid','oxcls','oxfield'],
		
		
		    // ## Contexts
		    //
		    // Contexts are used callback functions used for highlighting and disabling/enabling buttons and buttongroups.
		    // When the cursor enters an element within an html region for instance we want to disable or highlight buttons
		    // based on the properties of the given node.  You can see some examples of contexts in:
		    //
		    // Mercury.Toolbar.Button.contexts
		    // and
		    // Mercury.Toolbar.ButtonGroup.contexts
		
		
		    // ## Styles
		    //
		    // Mercury tries to stay as much out of your code as possible, but because regions appear within your document we
		    // need to include a few styles to indicate regions, as well as the different states of them (eg. focused).  These
		    // styles are injected into your document, and as simple as they might be, you may want to change them.  You can do
		    // so here.
		    injectedStyles: '' +
		      '.mercury-region, .mercury-textarea { min-height: 10px; outline: 1px dotted #09F }' +
		      '.mercury-textarea { box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; resize: vertical; }' +
		      '.mercury-region:focus, .mercury-region.focus, .mercury-textarea.focus { outline: none; -webkit-box-shadow: 0 0 10px #09F, 0 0 1px #045; box-shadow: 0 0 10px #09F, 0 0 1px #045 }' +
		      '.mercury-region:after { content: "."; display: block; visibility: hidden; clear: both; height: 0; overflow: hidden; }' +
		      '.mercury-region table, .mercury-region td, .mercury-region th { border: 1px dotted red; }'
		   
		  },
		
		  // ## Silent Mode
		  //
		  // Turning silent mode on will disable asking about unsaved changes before leaving the page.
		  silent: false,
		
		  // ## Debug Mode
		  //
		  // Turning debug mode on will log events and other various things (using console.debug if available).
		  debug: false
	};
	
	jQuery.extend(true, window.Mercury, opts);
	jQuery(window).bind('mercury:ready', function() {
		var regions = window.mercuryInstance.regions;
		var len = regions.length;
		var loadedSnippets = 0;
		
		for(var i=0; i<len; i++){
			var region = regions[i];
			var ox = region.name;
			jQuery.ajax( 'index.php?cl=mercury&fnc=snippetinfos', {
				data : {oxid:ox},
				dataType: 'json',
				success : function(data){
					Mercury.Snippet.load(data);
					loadedSnippets++;
					/*
					jQuery.each(data,function(i,val){
						//find snippet instance
						var inst = Mercury.Snippet.find(i);
						//Find that snippet on the page
						var elem = jQuery('[data-snippet="'+i+'"]');
						console.log("elem for " + '[data-snippet="'+i+'"]');
						console.log(elem);
						console.log("i:");
						console.log(i);
						console.log("inst:");
						console.log(inst);
						console.log("val:");
						console.log(val);
					});
					*/
					
					
					
					if(loadedSnippets == len){
						
						//Mercury.trigger('reinitialize');
						
						reloadSnippetPreviews();					
						//Mercury.trigger('reinitialize');
					}
				}
			});
		}
		
	});			
}

function reloadSnippetPreviews(){

	jQuery.each(mercuryInstance.regions, function(index,value){
		jQuery.each(value.snippets(), function(si,sval){
			var snippet = Mercury.Snippet.find(si);
			var existing = value.element.find("[data-snippet=" + si + "]");
			existing.replaceWith(snippet.getHTML(mercuryInstance.document));
		});
	});
}