<div class="container-fluid">
    <%= _.template($('#input_constructor').html())({id:"File", description:tr("File path"), default_selector: "string", disable_int:true}) %>
    <%= _.template($('#variable_constructor').html())({id:"Save", description:tr("List To Write To File"), default_variable:""}) %>

    <%= _.template($('#checkbox').html())({id: "Check", title: tr("Append")}) %>
    <%= _.template($('#checkbox').html())({id: "Check2", title: tr("Add line ending symbol")}) %>


</div>
<div class="tooltipinternal">
  <div class="tr tooltip-paragraph-first-fold">Write the content of the specified list to file. Each element of the list will be written as a line in a file.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>