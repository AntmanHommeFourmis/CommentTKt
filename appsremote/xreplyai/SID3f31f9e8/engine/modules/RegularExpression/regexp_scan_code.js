 <%= variable %> = native("regexp", "scan", JSON.stringify({text: <%= string %>,regexp:(<%= regexp %>).toString()}))
if(<%= variable %>.length == 0)
	<%= variable %> = []
else
	<%= variable %> = JSON.parse(<%= variable %>)