<div class="container-fluid">
    <%= _.template($('#input_constructor').html())({id:"String", description:tr("DateTime or string"), default_selector: "string", disable_int:true}) %>
	<%= _.template($('#variable_constructor').html())({id:"Save", description:tr("Minutes"), default_variable: "MINUTES"}) %>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Get the number of minutes from the specified date.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>