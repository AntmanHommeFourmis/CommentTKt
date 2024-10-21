<div class="container-fluid base64">
	<%= _.template($('#input_constructor').html())({id:"string", description:tr("String"), default_selector: "string", disable_int:true, help: {description: tr("Depending on mode data parameter is encoded punycode string which needs to be decoded, or ordinary string which must be encoded."), examples:[{code:"https://сайт.рф/index.html",description:tr("Arbitrary string. Works with encode mode")},{code:"https://xn--80aswg.xn--p1ai/index.html",description:tr("Encoded string. Works with decode mode")}]}}) %>
	<%= _.template($('#variable_constructor').html())({id:"Save", description:tr("Variable to save the result"), default_variable: "PUNYCODE_ENCODING_RESULT", help: {description: tr("Variable name with result. It will be encoded string in encode mode and decode result as string in decode mode.")}}) %>
	
	<%= _.template($('#combobox').html())({id: "Select", title: tr("Encode or decode"), items: [
		{value: "encode", "name": "encode", selected: true},
		{value: "decode", "name": "decode"},
	]
	}) %>
	
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Encodes or decodes string to punycode.</div>
	<div class="tooltip-paragraph-fold"><span class="tr">Punycode is a method of converting sequences of Unicode characters to the ASCII character sequence allowed in domain names. You can learn more about Punycode in <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://en.wikipedia.org/wiki/Punycode');return false">Wiki</a>.</span></div>
	<div class="tr tooltip-paragraph-fold">This action can work with in two modes: encode and decode. Modes can be switched with "Encode or decode" parameter. Depending on mode data parameter is encoded punycode string which needs to be decoded, or ordinary string which needs to be encoded.</div>
	<div class="tr tooltip-paragraph-fold">For example, if the string <code>"кто.рф"</code> is specified and encode mode is activated, the action will return <code>"xn--j1ail.xn--p1ai"</code>. And if the string <code>"https://xn--80aswg.xn--p1ai/index.html"</code> is specified and decode mode is activated, then the action will return <code>"https://сайт.рф/index.html"</code>.</div>
	<div class="tr tooltip-paragraph-last-fold">This action works with both domains and links.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
