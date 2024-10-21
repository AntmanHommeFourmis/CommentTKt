<div class="container-fluid">
<%= _.template($('#input_constructor').html())({id:"path1", description:tr("Path") + " 1. " + tr("Can be blank"), default_selector: "string", disable_int:true, value_string: "", help: {description: tr("The path to be joined with other paths."),examples:[{code:"C:/Users/Admin/Desktop"},{code:"/foo/bar"},{code:"/baz"},{code:tr("Empty string"), description: tr("The parameters \"Path 2\", \"Path 3\", \"List of paths\" will be used")}]} }) %>
<%= _.template($('#input_constructor').html())({id:"path2", description:tr("Path") + " 2. " + tr("Can be blank"), default_selector: "string", disable_int:true, value_string: "", help: {description: tr("The path to be joined with other paths."),examples:[{code:"C:/Users/Admin/Desktop"},{code:"/foo/bar"},{code:"/baz"},{code:tr("Empty string"), description: tr("The parameters \"Path 1\", \"Path 3\", \"List of paths\" will be used")}]} }) %>
<%= _.template($('#input_constructor').html())({id:"path3", description:tr("Path") + " 3. " + tr("Can be blank"), default_selector: "string", disable_int:true, value_string: "", help: {description: tr("The path to be joined with other paths."),examples:[{code:"C:/Users/Admin/Desktop"},{code:"/foo/bar"},{code:"/baz"},{code:tr("Empty string"), description: tr("The parameters \"Path 1\", \"Path 2\", \"List of paths\" will be used")}]} }) %>
<%= _.template($('#input_constructor').html())({id:"paths_list", description:tr("List of paths") + ". " + tr("Can be blank"), default_selector: "string", disable_int:true, value_string: "", help: {description: tr("List of paths to be joined.") + " " + tr("As a list, you can use a string consisting of paths, separated by commas."),examples:[{code:"C:/Users/Admin/Desktop,/foo/bar,/baz"},{code:"C:/Users/Admin/Desktop, /foo/bar, /baz"},{code:"[\"C:/Users/Admin/Desktop\", \"/foo/bar\", \"/baz\"]"},{code:tr("Empty string"), description: tr("The parameters \"Path 1\", \"Path 2\", \"Path 3\" will be used")}]} }) %>
<%= _.template($('#variable_constructor').html())({id:"Save", description:tr("Variable to save the result"), default_variable: "JOIN_PATHS_RESULT", help: {description: tr("Variable in which, after successful execution of the action, the final path will be written."), examples:[{code:"C:/Users/Admin/Desktop/foo/bar"},{code:"D:/test/Archive/manifest.json"},{code:"/baz/tost/file.txt"}]} }) %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Join multiple paths into one.</div>
	<div class="tr tooltip-paragraph-fold">This action will return a path composed of all the specified paths.</div>
	<div class="tr tooltip-paragraph-fold">For example, if the parameters "Path 1" and "Path 2" are specified, the values of which are respectively <code>"/foo"</code> and <code>"/bar"</code>, then the action will return <code>"/foo/bar"</code>.</div>
	<div class="tr tooltip-paragraph-fold">Paths from separate fields and a list are added to a general list of paths that will be joined.</div>
	<div class="tr tooltip-paragraph-fold">For example, if a path is specified in the "Path 1" field and a list of 4 paths is specified in the "List of paths" field, then 5 paths will be joined.</div>
	<div class="tr tooltip-paragraph-fold">If some of the parameters ("Path 1", "Path 2", "Path 3", "List of paths") are not specified, all parameters will be used except for them.</div>
	<div class="tr tooltip-paragraph-fold">For example, if "List of paths" is not specified, then the list will be formed from the parameters "Path 1" and "Path 2" and "Path 3". If the parameters "Path 1", "Path 2", "Path 3" are empty, then the "List of paths" will be used. If all parameters are specified, then all of them will be used.</div>
	<div class="tr tooltip-paragraph-fold">The order of joining the fields is as follows "Path 1", "Path 2", "Path 3", "List of paths".</div>
	<div class="tr tooltip-paragraph-fold">The list can be created using actions from the "List" module.</div>
	<div class="tr tooltip-paragraph-last-fold">If any of the paths is not a string, the thread will stop with fail message. If you want to continue thread, use "Ignore errors" action.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
