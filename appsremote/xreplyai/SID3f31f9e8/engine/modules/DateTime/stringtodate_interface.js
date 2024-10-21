<div class="container-fluid">
    <%= _.template($('#input_constructor').html())({id:"String", description:tr("DateTime string"), default_selector: "string", disable_int:true}) %>
    <%= _.template($('#input_constructor').html())({id:"Format", description:tr("DateTime format"), default_selector: "string", disable_int:true, value_string: "auto", variants: ["auto","yyyy-MM-dd","hh:mm:ss","yyyy-MM-ddThh:mm:ss"]}) %>
	<%= _.template($('#variable_constructor').html())({id:"Save", description:tr("Variable To Save"), default_variable: "PARSED_DATE"}) %>
    <%= _.template($('#info').html())({description: `<a onclick="BrowserAutomationStudio_OpenUrl('http://doc.qt.io/qt-5/qdatetime.html#fromString')" class="tr" style="cursor: pointer;">DateTime formatting</a>`, color: "gray"}) %>

    
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Convert the string to date and time using a specific format.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>