<form style="width:600px;" name="options">
  <div class="mercury-display-pane-container">
    <div class="mercury-display-pane">
      <fieldset class="inputs">
        <ol>
          <li class="string input optional stringish" id="options_title_input">
            <label class="label" for="options_title">Titel</label>
            <input id="options_title" name="options[title]" type="text" value="[{$options.title}]"/>
          </li>
        </ol>
      </fieldset>

      <fieldset class="inputs">
        <legend><span>Options</span></legend>
        <ol>
          <li class="string input stringish" id="options_content">
            <label class="label" for="options_content">Inhalt</label>
            <input id="options_content" name="options[content]" type="text" value="[{$options.content}]"/>
          </li>
        </ol>
      </fieldset>
    </div>
  </div>

  <div class="mercury-display-controls">
    <fieldset class="buttons">
      <ol>
        <li class="commit button"><input class="submit" name="commit" type="submit" value="Insert Snippet"/></li>
      </ol>
    </fieldset>
  </div>
</form>