<div class="container-fluid filewrite">
	<%= _.template($('#input_constructor').html())({id:"Folder", description:tr("Search In Folder"), default_selector: "string", disable_int:true}) %>
    <%= _.template($('#input_constructor').html())({id:"Mask", description:tr("Filename Mask"), default_selector: "string", disable_int:true, value_string:"*"}) %>
    <%= _.template($('#input_constructor').html())({id:"FileContains", description:tr("File Data Must Contain. Can Be Blank"), default_selector: "string", disable_int:true}) %>
	<%= _.template($('#checkbox').html())({id: "Check", title: tr("Include Folders"), checked: true}) %>
	<%= _.template($('#checkbox').html())({id: "Check2", title: tr("Include Files"), checked: true}) %>
	<%= _.template($('#checkbox').html())({id: "Check3", title: tr("Search In Subfolders"), checked: true}) %>

    <%= _.template($('#variable_constructor').html())({id:"Save", description:tr("Variable To Save Result"), default_variable: "FILE_SEARCH_RESULT"}) %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Find all files in the specified folder that satisfy certain conditions.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>