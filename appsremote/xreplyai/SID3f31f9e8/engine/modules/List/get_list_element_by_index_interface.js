<div class="container-fluid">
	<%= _.template($('#variable_constructor').html())({id:"Variable", description:tr("Variable With List"), default_variable: ""}) %>
    <%= _.template($('#input_constructor').html())({id:"Index", description:tr("Index"), default_selector: "int", disable_string:true, value_number:0,min_number:-9999999}) %>
    <%= _.template($('#checkbox').html())({id: "Check", title: tr("Remove From List")}) %>
    <%= _.template($('#variable_constructor').html())({id:"VariableResult", description:tr("List Element"), default_variable: "LIST_ELEMENT"}) %>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Get element of the list at specific index.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
