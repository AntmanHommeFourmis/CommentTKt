<div class="container-fluid">
	<%= _.template($('#variable_constructor').html())({id:"Variable", description:tr("Variable With List"), default_variable: ""}) %>
    <%= _.template($('#checkbox').html())({id: "Check", title: tr("Remove From List")}) %>
    <%= _.template($('#variable_constructor').html())({id:"VariableResult", description:tr("List Element"), default_variable: "RANDOM_LIST_ELEMENT"}) %>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Get the random item from the specified list.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
