<div class="container-fluid">
  <%= _.template($('#input_constructor').html())({id:"File", description:tr("File path"), default_selector: "string", disable_int:true}) %>
  <%= _.template($('#input_constructor').html())({id:"Value", description:tr("Data"), default_selector: "string", disable_int:true}) %>
  <%= _.template($('#checkbox').html())({id: "Check3", title: tr("Add line ending symbol")}) %>
  <%= _.template($('#checkbox').html())({id: "Check", title: tr("Append")}) %>
  <%= _.template($('#checkbox').html())({id: "Check2", title: tr("Data Is In Base64 Format")}) %>

</div>
<div class="tooltipinternal">
  <div class="tr tooltip-paragraph-first-fold">Write text or binary data to file.</div>
  <div class="tr tooltip-paragraph-last-fold">It is better to use <a href="#!/result">Result</a> action to output result.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>