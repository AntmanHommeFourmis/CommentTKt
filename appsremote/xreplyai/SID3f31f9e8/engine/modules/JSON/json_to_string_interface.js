<div class="container-fluid">
  <%= _.template($('#input_constructor').html())({
    id: "Data",
    description: tr("Target object"),
    default_selector: "string",
    disable_int: true,
    value_string: "",
    help: {
      description: tr("Target object to convert. If a value of the incorrect type is provided, it will be returned unchanged.")
    }
  }) %>
  <%= _.template($('#variable_constructor').html())({
    id: "Save",
    description: tr("Variable to save"),
    default_variable: "JSON_STRING",
    help: {
      description: tr("Variable that stores the conversion result.")
    }
  }) %>
</div>
<div class="tooltipinternal">
  <div class="tr tooltip-paragraph-first-fold">Convert the selected JSON object to a string and return the result to a variable.</div>
  <div class="tr tooltip-paragraph-fold">Use the <a href="#!/JsonFromString">String to JSON</a> action for reverse conversion (from string to object).</div>
  <div class="tr tooltip-paragraph-fold">JSON is a text format for data exchange, serialization (storage) of objects, arrays, numbers, strings, logical values and <span style="color:black">null</span> values. It is based on JavaScript syntax, but still different from it: not every JavaScript code is JSON, and not every JSON is JavaScript code.</div>
  <div class="tr tooltip-paragraph-fold">Use action <a href="#!/JsonCheckFormat">Check if string matches JSON</a> to make sure that string conversion is possible or just use the <span style="color:black">Ignore Errors</span> action to handle possible errors.</div>
  <div class="tr tooltip-paragraph-fold">With this action, you can convert a JavaScript object to a JSON string.</div>
  <div class="tr tooltip-paragraph-fold">For example, changing format of the string <span style="color:black">{"name":"John"}</span> will return object that contains one property - <span style="color:black">name</span> with value <span style="color:black">John</span>.</div>
  <div class="tr tooltip-paragraph-fold">In a similar way, we can do the inverse transformation, i.e. make a JSON format string from the object. For example, we have an object with two parameters. One of them is an array of three numbers, the other is a simple string. Let it be student performance data for the subject. After converting, we can get a JSON string of the form like <span style="color:black">{"name":"John","grades":[5,5,4]}</span>.</div>
  <div class="tr tooltip-paragraph-fold">Remember that this function is required for a simple conversion. You can use other actions with both the object and the string. It is recommended that you use the <span style="color:black">Get value</span> or <span style="color:black">Get all values</span> actions if you want to get specific information about an object or JSON string.</div>
  <div class="tr tooltip-paragraph-last-fold">See full documentation and examples <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://cheshirecaat.github.io/bas-docs/json-path/json-path-en.html'); return false;"><span class="tr">here.</span></a></div>
</div>
<%= _.template($('#back').html())({ action: "executeandadd", visible: true }) %>