<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({id:"Value", description:tr("Data"), default_selector: "string", disable_int:true, help: {description: tr("Depending on mode data parameter is base64 encoded string which needs to be decoded, or ordinary string which needs to be encoded."), examples:[{code:"any text",description:tr("Arbitrary string. Works with encode mode")},{code:"YW55IHN0cmluZw==",description:tr("Base64 string. Works with decode mode")},{code:"[[FILE_CONTENT]]",description:tr("Variable which holds file read result. Works with decode mode")}]}}) %>
	<%= _.template($('#variable_constructor').html())({id:"Save", description:tr("Variable To Save"), default_variable: "BASE64_ENCODING_RESULT", help: {description: tr("Variable name with result. It will be base64 encoded string in encode mode and decode result as string in decode mode.")}}) %>

	<%= _.template($('#combobox').html())({id: "Select", title: tr("Encode or decode"), items: [
			{value: "encode", "name": "encode", selected: true},
			{value: "decode", "name": "decode"}
		]
	}) %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Encodes or decodes base64 string.</div>
	<div class="tr tooltip-paragraph-fold">BAS stores binary data as base64 strings. It could be binary files, pictures, video, etc. Base64 encoding represent binary data in ascii string.</div>
	<div class="tr tooltip-paragraph-fold">Most of the times you don't need to convert base64 data to string, some actions accept base64 data as input parameters, for example: "Write File", "Start working with image". Moreover, if you try to decode binary data encoded as base64 string, result string may be damaged, so it is better to use base64 data without decoding.</div>
	<div class="tr tooltip-paragraph-last-fold">This action can work with in two modes: encode and decode. Modes can be switched with "Encode or decode" parameter. Depending on mode data parameter is base64 encoded string which needs to be decoded, or ordinary string which needs to be encoded.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
