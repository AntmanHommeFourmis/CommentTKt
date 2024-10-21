<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({id:"MailFrom", description:tr("Mail From. Can be blank."), default_selector: "string", disable_int:true}) %>
	<%= _.template($('#input_constructor').html())({id:"MailTo", description:tr("Mail To"), default_selector: "string", disable_int:true}) %>
	<%= _.template($('#input_constructor').html())({id:"CC", description:tr("CC. Can be blank."), default_selector: "string", disable_int:true}) %>
    <%= _.template($('#input_constructor').html())({id:"Subject", description:tr("Mail Subject. Can be blank."), default_selector: "string", disable_int:true}) %>
    <%= _.template($('#input_constructor').html())({id:"MailBody", description:tr("Mail Body. Can be blank."), default_selector: "string", disable_int:true, disable_editor:true, disable_string:true, use_textarea:true, size: 8, disable_type_chooser:true,textarea_height:80}) %>

	<%= _.template($('#checkbox').html())({id: "Check", title: tr("Send as HTML")}) %>

	<%= _.template($('#input_constructor').html())({id:"Attachments", description:tr("Attachments. Can be blank."), default_selector: "string", disable_int:true}) %>
</div>
<div class="tooltipinternal">
   <div class="tr tooltip-paragraph-first-fold">Send an email message using the SMTP client. It must be configured with "SMTP settings" action preliminarily.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>