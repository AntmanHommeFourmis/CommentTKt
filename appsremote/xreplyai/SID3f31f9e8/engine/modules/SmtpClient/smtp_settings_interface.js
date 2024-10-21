<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({id:"Host", description:tr("SMTP Server Host"), default_selector: "string", disable_int:true}) %>
	<%= _.template($('#input_constructor').html())({id:"Port", description:tr("Port"), default_selector: "int", disable_string:true, value_number: 465, variants: ["465","587","25"]}) %>
	<%= _.template($('#input_constructor').html())({id:"Username", description:tr("Username. Can be blank"), default_selector: "string", disable_int:true}) %>
	<%= _.template($('#input_constructor').html())({id:"Password", description:tr("Password. Can be blank"), default_selector: "string", disable_int:true}) %>
  
  <%= _.template($('#combobox').html())({id: "Select", title: tr("Encryption"), items: [
    {value: "ssl", "name": "ssl", selected: true},
    {value: "tls", "name": "tls"},
    {value: "starttls", "name": "starttls"},
    {value: "none", "name": "none"},
  ]
  }) %>
	
</div>
<div class="tooltipinternal">
   <div class="tr tooltip-paragraph-first-fold">Configure SMTP server access required to send email.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>