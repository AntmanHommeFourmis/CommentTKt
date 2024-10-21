<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({id:"Token", description:tr("Bot token"), default_selector: "string", disable_int:true, value_string: ""}) %>
	<%= _.template($('#input_constructor').html())({id:"IdChat", description:tr("Chat id"), default_selector: "string", disable_int:true, value_string: ""}) %>
	<%= _.template($('#input_constructor').html())({id:"Message", description:tr("Message text"), default_selector: "string", disable_int:true, default_variable: ""}) %>

	<%= _.template($('#checkbox').html())({id: "Check", title: tr("Add thread number to the beginning of the message")}) %>
	<%= _.template($('#checkbox').html())({id: "Check1", title: tr("Add time to the beginning of the message [hh:mm:ss]")}) %>

	<%= _.template($('#info').html())({description: `<span class="tr">How to <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://core.telegram.org/bots#3-how-do-i-create-a-bot')">create bot</a> token and <a href="#" onclick="BrowserAutomationStudio_OpenUrl('http://stackoverflow.com/questions/32423837/telegram-bot-how-to-get-a-group-chat-id-ruby-gem-telegram-bot')">get chat id</a></span>`, color: "gray"}) %>

	
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Send message to the specific Telegram chat.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
