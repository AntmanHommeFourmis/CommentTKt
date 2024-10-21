<div class="container-fluid">
  <%= _.template($('#input_constructor').html())({
    id: "Data",
    description: tr("JSON string or object to remove"),
    default_selector: "string",
    disable_int: true,
    value_string: "",
    help: {
      description: tr("JSON string or object to remove value. You can specify a valid JSON string here or an object whose type is not simple. Simple types include numbers, boolean values, null value.")
    }
  }) %>
  <%= _.template($('#input_constructor').html())({
    id: "Path",
    description: tr("JSONPath query to remove value"),
    default_selector: "string",
    disable_int: true,
    value_string: "",
    variants: [
      "dialogs[*].title<br/><span style='color:gray;font-size:small'>" + tr("The titles of all dialogs.") + "</span>",
      "user.age<br/><span style='color:gray;font-size:small'>" + tr("The age of user.") + "</span>",
      "$..cart[2]<br/><span style='color:gray;font-size:small'>" + tr("The third item in cart.") + "</span>",
      "$..cart[-2:]<br/><span style='color:gray;font-size:small'>" + tr("The last two items in the cart.") + "</span>",
      "$..*<br/><span style='color:gray;font-size:small'>" + tr("All possible elements.") + "</span>",
    ],
    help: {
      description: tr("Any JSONPath query that you need."),
      examples: [
        {
          code: "$.dialogs[*].title",
          description: tr("The titles of all dialogs.")
        },
        {
          code: "dialogs[*].title",
          description: tr("The titles of all dialogs.")
        },
        {
          code: "$.user.age",
          description: tr("The age of user.")
        },
        {
          code: "user.age",
          description: tr("The age of user.")
        },
        {
          code: "$..cart[2]",
          description: tr("The third item in cart.")
        },
        {
          code: "$..cart[-2:]",
          description: tr("The last two items in the cart.")
        },
        {
          code: "$..cart[(@.length - 1)]",
          description: tr("The last item in the cart.")
        },
        {
          code: "$..cart[-1:]",
          description: tr("The last item in the cart.")
        },
        {
          code: "$['secret.identity']",
          description: tr("Property with dot in name.")
        },
        {
          code: "$[(\"secret.identity\")]",
          description: tr("Property with dot in name.")
        },
        {
          code: "$..*",
          description: tr("All possible elements.")
        },
      ]
    }
  }) %>
  <%= _.template($('#variable_constructor').html())({
    id: "Save",
    description: tr("Variable to save"),
    default_variable: "MODIFIED_JSON",
    help: {
      description: tr("Variable that stores the result of removing (Modified object or string).")
    }
  }) %>
</div>
<div class="tooltipinternal">
  <div class="tr tooltip-paragraph-first-fold">Execute JSONPath query and remove object value.</div>
  <div class="tr tooltip-paragraph-fold">The type of the returned object will be the same as the original variable. This means that if you specify a string, the string will be returned; if you specify an object, the object will be returned.</div>
  <div class="tr tooltip-paragraph-fold">JSONPath query should not be empty. If you want to change the data format, use the <a href="#!/JsonToString">JSON to string</a> or <a href="#!/JsonFromString">String to JSON</a> action.</div>
  <div class="tr tooltip-paragraph-fold">JSON is a text format for data exchange, serialization (storage) of objects, arrays, numbers, strings, logical values and <span style="color:black">null</span> values. It is based on JavaScript syntax, but still different from it: not every JavaScript code is JSON, and not every JSON is JavaScript code.</div>
  <div class="tr tooltip-paragraph-fold">JSONPath is a powerful tool for working with the JSON data type. It is built on the basis of logic, which is very similar to XPath, but has some limitations, because the data type itself is much simpler than XML.</div>
  <div class="tr tooltip-paragraph-fold">Using this technology, we can quickly get data from JavaScript objects or strings in JSON format. In addition, this greatly simplifies the work, as usually, parsing JSON requires writing code.</div>
  <div class="tr tooltip-paragraph-fold">You can use simple paths, as if you yourself modify or delete a value in the code. For example, we have a line like <span style="color:black">{"name":"John", "data":{"score": 10, "tries": 5}}</span> and want to remove the value of <span style="color:black">data.score</span>. To do this, we indicate as a query a string like <span style="color:black">$.data.score</span> or <span style="color:black">data.score</span>. As a result, we get a string like <span style="color:black">{"name":"John", "data":{"tries": 5}}</span>. This will also work with arrays. For example, if you have an array <span style="color:black">array</span> and want to remove the first element, use a query like <span style="color:black">$.array[0]</span>.</div>
  <div class="tr tooltip-paragraph-fold">This action also supports complex queries - for example, using filters - <span style="color:black">$.data[?(@.price &lt;= 100)]</span>. In addition, you can access properties that contain special characters, such as the period character - <span style="color:black">$.data[("secret.token")]</span> or <span style="color:black">$.data['secret.token']</span>. When using double quotes, always enclose the property name in parentheses.</div>
  <div class="tr tooltip-paragraph-fold">You can use the <a href="#!/JsonChangeValue">Change value</a> action to add new properties to the object - just specify the query that leads to the desired key. For example, if we have an object of the form <span style="color:black">{"name":"John"}</span>, we can add a property <span style="color:black">age</span> with the value <span style="color:black">25</span> using the <span style="color:black">$.age</span> query.</div>
  <div class="tr tooltip-paragraph-last-fold">See full documentation and examples <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://cheshirecaat.github.io/bas-docs/json-path/json-path-en.html'); return false;"><span class="tr">here.</span></a></div>
</div>
<%= _.template($('#back').html())({ action: "executeandadd", visible: true }) %>