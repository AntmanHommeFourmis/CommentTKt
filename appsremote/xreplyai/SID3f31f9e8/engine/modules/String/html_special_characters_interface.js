<div class="container-fluid base64">
	<%= _.template($('#input_constructor').html())({id:"string", description:tr("String"), default_selector: "string", disable_int:true, help: {description: tr("Depending on mode data parameter is encoded string which needs to be decoded, or ordinary string containing special HTML characters that must be encoded."), examples:[{code:"&lt;div&gt;Blah blah blah&lt;/div&gt;",description:tr("Arbitrary string. Works with encode mode")},{code:"&amp;lt;div&amp;gt;Blah blah blah&amp;lt;/div&amp;gt;",description:tr("Encoded string. Works with decode mode")}]}}) %>
	<%= _.template($('#variable_constructor').html())({id:"Save", description:tr("Variable to save the result"), default_variable: "HTML_ENCODING_RESULT", help: {description: tr("Variable name with result. It will be encoded string in encode mode and decode result as string in decode mode.")}}) %>
	<%= _.template($('#combobox').html())({id: "Select", title: tr("Encode or decode"), items: [
		{value: "encode", "name": "encode", selected: true},
		{value: "decode", "name": "decode"}
		]
	}) %>
	
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Encodes or decodes string containing special HTML characters.</div>
	<div class="tr tooltip-paragraph-fold">This action can work with in two modes: encode and decode. Modes can be switched with "Encode or decode" parameter. Depending on mode data parameter is encoded string which needs to be decoded, or ordinary string containing special HTML characters which needs to be encoded.</div>
	<div class="tr tooltip-paragraph-last-fold">For example, if the string <code>"&lt;div&gt;Blah blah blah&lt;/div&gt;"</code> is specified and encode mode is activated, the action will return <code>"&amp;lt;div&amp;gt;Blah blah blah&amp;lt;/div&amp;gt;"</code>. And if the string <code>"&amp;lt;h1&amp;gt;Text title&amp;lt;/h1&amp;gt;"</code> is specified and decode mode is activated, then the action will return <code>"&lt;h1&gt;Text title&lt;/h1&gt;"</code>.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
