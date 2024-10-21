<div class="container-fluid">
<%= _.template($('#input_constructor').html())({id:"path", description: tr("Path"), default_selector: "string", disable_int:true, value_string: "", help: {description: tr("The path that need to parse."),examples:[{code:"/foo/bar/baz/asdf/quux.html"},{code:"D:/test/archive/engine.js"},{code:"C:/foo.php"},{code:"/foo/bar/baz/asdf/quux"}]} }) %>
<%= _.template($('#variable_constructor').html())({id:"root", description:tr("Root"), default_variable: "PATH_ROOT", help: {description: tr("This variable will contain the root of the specified path."), examples:[{code:"/",description:tr("Path") + ": <code style=\"font-size:85%\">/foo/bar/baz/asdf/quux.html</code>"},{code:"D:/",description:tr("Path") + ": <code style=\"font-size:85%\">D:/test/archive/engine.js</code>"},{code:"C:/",description:tr("Path") + ": <code style=\"font-size:85%\">C:/foo.php</code>"},{code:"/",description:tr("Path") + ": <code style=\"font-size:85%\">/foo/bar/baz/asdf/quux</code>"}]} }) %>
<%= _.template($('#variable_constructor').html())({id:"dir", description:tr("Directory"), default_variable: "PATH_DIRECTORY", help: {description: tr("This variable will contain the directory of the specified path."), examples:[{code:"/foo/bar/baz/asdf",description:tr("Path") + ": <code style=\"font-size:85%\">/foo/bar/baz/asdf/quux.html</code>"},{code:"D:/test/archive",description:tr("Path") + ": <code style=\"font-size:85%\">D:/test/archive/engine.js</code>"},{code:"C:/",description:tr("Path") + ": <code style=\"font-size:85%\">C:/foo.php</code>"},{code:"/foo/bar/baz/asdf",description:tr("Path") + ": <code style=\"font-size:85%\">/foo/bar/baz/asdf/quux</code>"}]} }) %>
<%= _.template($('#variable_constructor').html())({id:"base", description:tr("Last part"), default_variable: "PATH_BASE_NAME", help: {description: tr("This variable will contain the last part of the specified path."), examples:[{code:"quux.html",description:tr("Path") + ": <code style=\"font-size:85%\">/foo/bar/baz/asdf/quux.html</code>"},{code:"engine.js",description:tr("Path") + ": <code style=\"font-size:85%\">D:/test/archive/engine.js</code>"},{code:"foo.php",description:tr("Path") + ": <code style=\"font-size:85%\">C:/foo.php</code>"},{code:"quux",description:tr("Path") + ": <code style=\"font-size:85%\">/foo/bar/baz/asdf/quux</code>"}]} }) %>
<%= _.template($('#variable_constructor').html())({id:"ext", description:tr("File extension"), default_variable: "PATH_FILE_EXTENSION", help: {description: tr("This variable will contain the file extension of the specified path. If the path does not contain the file extension, then the variable will contain an empty string."), examples:[{code:".html",description:tr("Path") + ": <code style=\"font-size:85%\">/foo/bar/baz/asdf/quux.html</code>"},{code:".js",description:tr("Path") + ": <code style=\"font-size:85%\">D:/test/archive/engine.js</code>"},{code:".php",description:tr("Path") + ": <code style=\"font-size:85%\">C:/foo.php</code>"},{code:tr("Empty string"),description:tr("Path") + ": <code style=\"font-size:85%\">/foo/bar/baz/asdf/quux</code>"}]} }) %>
<%= _.template($('#variable_constructor').html())({id:"name", description:tr("File name"), default_variable: "PATH_FILE_NAME", help: {description: tr("This variable will contain the name of the file or directory of the specified path, filename will be saved without extension."), examples:[{code:"quux",description:tr("Path") + ": <code style=\"font-size:85%\">/foo/bar/baz/asdf/quux.html</code>"},{code:"engine",description:tr("Path") + ": <code style=\"font-size:85%\">D:/test/archive/engine.js</code>"},{code:"foo",description:tr("Path") + ": <code style=\"font-size:85%\">C:/foo.php</code>"},{code:"quux",description:tr("Path") + ": <code style=\"font-size:85%\">/foo/bar/baz/asdf/quux</code>"}]} }) %>
<%= _.template($('#variable_constructor').html())({id:"items", description:tr("List of path items"), default_variable: "PATH_ITEMS_LIST", help: {description: tr("This variable will contain a list of all items of the specified path. The resulting list can be processed using actions from the \"List\" module."), examples:[{code:"[\"foo\",\"bar\",\"baz\",\"asdf\",\"quux.html\"]",description:tr("Path") + ": <code style=\"font-size:85%\">/foo/bar/baz/asdf/quux.html</code>"},{code:"[\"D:\",\"test\",\"archive\",\"engine.js\"]",description:tr("Path") + ": <code style=\"font-size:85%\">D:/test/archive/engine.js</code>"},{code:"[\"C:\",\"foo.php\"]",description:tr("Path") + ": <code style=\"font-size:85%\">C:/foo.php</code>"},{code:"[\"foo\",\"bar\",\"baz\",\"asdf\",\"quux\"]",description:tr("Path") + ": <code style=\"font-size:85%\">/foo/bar/baz/asdf/quux</code>"}]} }) %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Parse the path into items.</div>
	<div class="tr tooltip-paragraph-fold">This action will save each item of the path to its own variable. You can learn more about paths in <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://en.wikipedia.org/wiki/Path_(computing)');return false">Wiki</a>.</div>
	<div class="tr tooltip-paragraph-last-fold">If the "Path" parameter is not a string, the thread will stop with fail message. If you want to continue thread, use "Ignore errors" action.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
