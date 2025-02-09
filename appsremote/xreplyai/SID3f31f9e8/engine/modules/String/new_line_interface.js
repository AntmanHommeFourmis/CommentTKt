<div class="container-fluid">
<%= _.template($('#combobox').html())({id: "Select", title: tr(""), items: [
  {value: "CarriageReturn", selected: true, "name": tr("Carriage return and line break (\\r\\n)")},
  {value: "EOL", "name": tr("Only line break (\\n)")}
]
}) %>

<%= _.template($('#variable_constructor').html())({id:"Save", description:tr("Variable to save the result"), default_variable: "LINE_BREAK", help: {description: tr("Variable in which, after successful execution of the action, a string containing a line break will be written."), examples:[{code:"\\r\\n",description:tr("Carriage return and line break")},{code:"\\n",description:tr("Line break")}]} }) %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Create a string containing a line break symbol.</div>
	<div class="tr tooltip-paragraph-fold">This action will return a string containing a line break. You can read more about line breaks in <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://en.wikipedia.org/wiki/Newline');return false">Wiki</a>.</div>
	<div class="tr tooltip-paragraph-fold">If the parameter "Carriage return" is activated, then a carriage return will be added before the line break.</div>
	<div class="tr tooltip-paragraph-last-fold">The result of this action can be used to split the text into multiple lines.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
