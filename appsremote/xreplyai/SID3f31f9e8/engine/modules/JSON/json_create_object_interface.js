<div class="container-fluid">
  <%= _.template($('#variable_constructor').html())({
    id: "Save",
    default_variable: "NEW_OBJECT",
    description: tr("Variable to save"),
    help: {
      description: tr("Variable that stores the result of creation (Object).")
    }
  }) %>
  <% for (let i = 1; i <= 3; ++i ) { %>
    <div class="col-xs-12">
      <form class="form-horizontal">
        <div class="form-group">
          <div class="col-xs-12">
            <div style="margin: 5px 2px 5px 1px;background-color: #eee;border-radius: 1px;height: 5px;">&nbsp;</div>
          </div>
        </div>
      </form>
    </div>
    <%= _.template($('#input_constructor').html())({
      id: `Key${i}`,
      description: tr(`Key ${i}. Can be empty`),
      default_selector: "string",
      help: {
        description: tr("The property key of the created object. You can also use variables or leave the field empty."),
        examples: [
          {
            code: "name",
            description: tr("A regular string as a key.")
          },
          {
            code: "{{key}}",
            description: tr("The resource value as a key.")
          },
          {
            code: "[[KEY]]",
            description: tr("The variable value as a key.")
          }
        ]
      }
    }) %>
    <%= _.template($('#input_constructor').html())({
      id: `Value${i}`,
      description: tr(`Value ${i}. Can be empty`),
      default_selector: "string",
      help: {
        description: tr("The property value of the created object. You can also use variables or leave the field empty."),
        examples: [
          {
            code: "100",
            description: tr('A number as a value (<span class="help-popup-code">int</span> type).')
          },
          {
            code: "John",
            description: tr('A string as a value (<span class="help-popup-code">string</span> type).')
          },
          {
            code: "[0, 10]",
            description: tr('An array as a value (<span class="help-popup-code">expression</span> type).')
          }
        ]
      }
    }) %>
  <% } %>
</div>
<div class="tooltipinternal">
  <div class="tr tooltip-paragraph-first-fold">Create a new object with initial values (optional).</div>
  <div class="tr tooltip-paragraph-fold">If you want to add more properties or change existing ones, you can use the <a href="#!/JsonChangeValue">Change value</a> action.</div>
  <div class="tr tooltip-paragraph-fold">If you leave the key empty in one of the fields, the value will not be set, even if you specify it - similar to the action for creating lists.</div>
  <div class="tr tooltip-paragraph-fold">For example, if you specify the string <span style="color:black">offset</span> as the key and the number <span style="color:black">100</span> as the value, then the resulting object will look like this - <span style="color:black">{"offset": 100}</span>.</div>
  <div class="tr tooltip-paragraph-fold">One example of using this action is generating data, for example, for sending HTTP requests. You can also convert the resulting object to a string using the <a href="#!/JsonToString">JSON to string</a> action.</div>
  <div class="tr tooltip-paragraph-fold">You can use any data types for values - lists, strings, numbers, and so on. However, it is recommended to use strings or numbers for keys - in any case, keys will always be converted to a string.</div>
  <div class="tr tooltip-paragraph-last-fold">See full documentation and examples <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://cheshirecaat.github.io/bas-docs/json-path/json-path-en.html'); return false;"><span class="tr">here.</span></a></div>
</div>
<%= _.template($('#back').html())({ action: "executeandadd", visible: true }) %>