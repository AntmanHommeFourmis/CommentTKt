<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({
		id: "uid",
		description: tr("Message id"),
		default_selector: "string",
		value_string: "",
		help: {
			description: tr("The id of the message which content need to be retrieved."),
			examples: [
				{code: 134},
				{code: 370},
				{code: 458}
			]
		}
	}) %>
	<%= _.template($('#block_start').html())({id:"Parsing", name: tr("Parsing"), description: tr("Using the parameters from this block, you can select which parts of the message will be fetched and in which variables will be saved.")}) %>
		
		<%= _.template($('#checkbox').html())({id: "getFrom", title: tr("Get sender of message"), help: {title: tr("Get sender of message"), description: tr("If enabled, then the sender of the message will be retrieved from the server and stored in the variable below."), examples: [{code: tr("Activated"), description: tr("Get message sender from server and save")}, {code: tr("Deactivated"), description: tr("Don't get message sender from server")}]}}) %>
		<%= _.template($('#variable_constructor').html())({
			id: "saveFrom",
			visible_if_checked: "getFrom",
			description: tr("Sender of message"),
			default_variable: "MAIL_SENDER",
			help: {
				description: tr("Variable in which, after successful execution of the action, the sender of the retrieved message will be written."),
				examples: [
					{code: "admin@site.com"},
					{code: "no-reply@example.com"},
					{code: "Test &lt;info@test.com&gt;"}
				]
			}
		}) %>

		<%= _.template($('#line').html())() %>

		<%= _.template($('#checkbox').html())({id: "getTo", title: tr("Get recipient of message"), help: {title: tr("Get recipient of message"), description: tr("If enabled, then the recipient of the message will be retrieved from the server and stored in the variable below."), examples: [{code: tr("Activated"), description: tr("Get message recipient from server and save")}, {code: tr("Deactivated"), description: tr("Don't get message recipient from server")}]}}) %>
		<%= _.template($('#variable_constructor').html())({
			id: "saveTo",
			visible_if_checked: "getTo",
			description: tr("Recipient of message"),
			default_variable: "MAIL_RECIPIENT",
			help: {
				description: tr("Variable in which, after successful execution of the action, the recipient of the retrieved message will be written."),
				examples: [
					{code: "you@site.com"},
					{code: "name@example.com"},
					{code: "User &lt;user@test.com&gt;"}
				]
			}
		}) %>

		<%= _.template($('#line').html())() %>

		<%= _.template($('#checkbox').html())({id: "getSubject", title: tr("Get message subject"), help: {title: tr("Get message subject"), description: tr("If enabled, then the subject of the message will be retrieved from the server and stored in the variable below."), examples: [{code: tr("Activated"), description: tr("Get message subject from server and save")}, {code: tr("Deactivated"), description: tr("Don't get message subject from server")}]}}) %>
		<%= _.template($('#variable_constructor').html())({
			id: "saveSubject",
			visible_if_checked: "getSubject",
			description: tr("Message subject"),
			default_variable: "MAIL_SUBJECT",
			help: {
				description: tr("Variable in which, after successful execution of the action, the subject of the retrieved message will be written."),
				examples: [
					{code: tr("Marketing")},
					{code: tr("Business proposal")},
					{code: tr("Email confirmation")}
				]
			}
		}) %>

		<%= _.template($('#line').html())() %>

		<%= _.template($('#checkbox').html())({id: "getTextHtml", title: tr("Get body of message") + " (text/html)", checked: true, help: {title: tr("Get body of message") + " (text/html)", description: tr("If enabled, then the body of the message in html format (text/html) will be retrieved from the server and stored in the variable below.") + " " + tr("text/html is the MIME type of data represented in html format, html is the markup language for web pages.") + " " + tr("If the message does not contain a body with this type, then an empty string will be stored."), examples: [{code: tr("Activated"), description: tr("Get message body (text/html) from server and save")}, {code: tr("Deactivated"), description: tr("Don't get message body (text/html) from server")}]}}) %>

		<span data-visible-if-checked="getTextHtml">
			<%= _.template($('#variable_constructor').html())({
				id: "saveTextHtml",
				description: tr("Body of message") + " (text/html)",
				default_variable: "MAIL_TEXT_HTML",
				help: {
					description: tr("Variable in which, after successful execution of the action, the body of the retrieved message in html format (text/html) will be written.") + " " + tr("text/html is the MIME type of data represented in html format, html is the markup language for web pages.") + " " + tr("If the message does not contain a body with this type, then an empty string will be stored."),
					examples: [
						{code: "<p style=\"margin-bottom:6px\">&lt;HTML&gt;&lt;BODY&gt;&lt;div&gt;" + tr("Use code 9779 to confirm") + "&lt;/div&gt;&lt;/BODY&gt;&lt;/HTML&gt;</p>"},
						{code: tr("Empty string"), description: tr("The message does not contain a body in html format")}
					]
				}
			}) %>

			<%= _.template($('#checkbox').html())({id: "getLinksTextHtml", title: tr("Parse links from body of message") + " (text/html)", help: {title: tr("Parse links from body of message") + " (text/html)", description: tr("If enabled, then all links will be extracted from the retrieved message body (text/html) and stored in the variable below.") + " " + tr("The resulting list can be processed using actions from the \"List\" module."), examples: [{code: tr("Activated"), description: tr("Extract links from message body") + " (text/html)"}, {code: tr("Deactivated"), description: tr("Don't extract links from message body") + " (text/html)"}]}}) %>

			<%= _.template($('#variable_constructor').html())({
				id: "saveLinksTextHtml",
				visible_if_checked: "getLinksTextHtml",
				description: tr("Links from body of message") + " (text/html)",
				default_variable: "MAIL_TEXT_HTML_LINKS_LIST",
				help: {
					description: tr("Variable in which, after successful execution of the action, the list of links from the body of the message (text/html) will be written.") + " " + tr("The resulting list can be processed using actions from the \"List\" module."),
					examples: [
						{code: "[\"https://marketplace.biz/section_3/product_213234.php\"]"},
						{code: "[\"http://test.com\", \"example.org\"]"},
						{code: "[\"http://www.ad.by\", \"www.feedback.io\", \"https://support.co/new/ticket.php\"]"}
					]
				}
			}) %>
		</span>


		<%= _.template($('#line').html())() %>

		<%= _.template($('#checkbox').html())({id: "getTextPlain", checked:true, title: tr("Get body of message") + " (text/plain)", help: {title: tr("Get body of message") + " (text/plain)", description: tr("If enabled, then the body of the message in text format (text/plain) will be retrieved from the server and stored in the variable below.") + " " + tr("text/plain is a MIME type that is the base type for text files.") + " " + tr("If the message does not contain a body with this type, then an empty string will be stored."), examples: [{code: tr("Activated"), description: tr("Get message body (text/plain) from server and save")}, {code: tr("Deactivated"), description: tr("Don't get message body (text/plain) from server")}]}}) %>

		<span data-visible-if-checked="getTextPlain">
			<%= _.template($('#variable_constructor').html())({
				id: "saveTextPlain",
				description: tr("Body of message") + " (text/plain)",
				default_variable: "MAIL_TEXT_PLAIN",
				help: {
					description: tr("Variable in which, after successful execution of the action, the body of the retrieved message in text format (text/plain) will be written.") + " " + tr("text/plain is a MIME type that is the base type for text files.") + " " + tr("If the message does not contain a body with this type, then an empty string will be stored."),
					examples: [
						{code: "<p style=\"margin-bottom:6px\">" + tr("Use code 9779 to confirm") + "</p>"},
						{code: tr("Empty string"), description: tr("The message does not contain a body in text format")}
					]
				}
			}) %>

			<%= _.template($('#checkbox').html())({id: "getLinksTextPlain", title: tr("Parse links from body of message") + " (text/plain)", help: {title: tr("Parse links from body of message") + " (text/plain)", description: tr("If enabled, then all links will be extracted from the retrieved message body (text/plain) and stored in the variable below.") + " " + tr("The resulting list can be processed using actions from the \"List\" module."), examples: [{code: tr("Activated"), description: tr("Extract links from message body") + " (text/plain)"}, {code: tr("Deactivated"), description: tr("Don't extract links from message body") + " (text/plain)"}]}}) %>

			<%= _.template($('#variable_constructor').html())({
				id: "saveLinksTextPlain",
				visible_if_checked: "getLinksTextPlain",
				description: tr("Links from body of message") + " (text/plain)",
				default_variable: "MAIL_TEXT_PLAIN_LINKS_LIST",
				help: {
					description: tr("Variable in which, after successful execution of the action, the list of links from the body of the message (text/plain) will be written.") + " " + tr("The resulting list can be processed using actions from the \"List\" module."),
					examples: [
						{code: "[\"https://marketplace.biz/section_3/product_213234.php\"]"},
						{code: "[\"http://test.com\", \"example.org\"]"},
						{code: "[\"http://www.ad.by\", \"www.feedback.io\", \"https://support.co/new/ticket.php\"]"}
					]
				}
			}) %>


		</span>

		<%= _.template($('#line').html())() %>

		<%= _.template($('#checkbox').html())({id: "getTextRaw", title: tr("Get body of message") + " (raw)", help: {title: tr("Get body of message") + " (raw)", description: tr("If enabled, then the body of the message in raw form (raw) will be retrieved from the server and stored in the variable below.") + " " + tr("raw - this means that the body of the message will be retrieved in its raw form, without any processing."), examples: [{code: tr("Activated"), description: tr("Get message body (raw) from server and save")}, {code: tr("Deactivated"), description: tr("Don't get message body (raw) from server")}]}}) %>

		<span data-visible-if-checked="getTextRaw">
			<%= _.template($('#variable_constructor').html())({
				id: "saveTextRaw",
				description: tr("Body of message") + " (raw)",
				default_variable: "MAIL_TEXT_RAW",
				help: {
					description: tr("Variable in which, after successful execution of the action, the body of the retrieved message in raw form (raw) will be written.") + " " + tr("raw - this means that the body of the message will be retrieved in its raw form, without any processing."),
					examples: [
						{code: "----ALT--d449E7c1653598173380270778C1f6B21643480035<br/>Content-Type: text/plain; charset=utf-8<br/>Content-Transfer-Encoding: base64<p style=\"margin-top:6px;margin-bottom:6px\">ClVzZSBjb2RlIDk3NzkgdG8gY29uZmlybQrCoArCoA==</p><p style=\"margin-bottom:6px\">----ALT--d449E7c1653598173380270778C1f6B21643480035</p>"},
						{code: tr("Empty string"), description: tr("The message does not contain a body")}
					]
				}
			}) %>
			<%= _.template($('#checkbox').html())({id: "getLinksTextRaw", title: tr("Parse links from body of message") + " (raw)", help: {title: tr("Parse links from body of message") + " (raw)", description: tr("If enabled, then all links will be extracted from the retrieved message body (raw) and stored in the variable below.") + " " + tr("The resulting list can be processed using actions from the \"List\" module."), examples: [{code: tr("Activated"), description: tr("Extract links from message body") + " (raw)"}, {code: tr("Deactivated"), description: tr("Don't extract links from message body") + " (raw)"}]}}) %>

			<%= _.template($('#variable_constructor').html())({
				id: "saveLinksTextRaw",
				visible_if_checked: "getLinksTextRaw",
				description: tr("Links from body of message") + " (raw)",
				default_variable: "MAIL_TEXT_RAW_LINKS_LIST",
				help: {
					description: tr("Variable in which, after successful execution of the action, the list of links from the body of the message (raw) will be written.") + " " + tr("The resulting list can be processed using actions from the \"List\" module."),
					examples: [
						{code: "[\"https://marketplace.biz/section_3/product_213234.php\"]"},
						{code: "[\"http://test.com\", \"example.org\"]"},
						{code: "[\"http://www.ad.by\", \"www.feedback.io\", \"https://support.co/new/ticket.php\"]"}
					]
				}
			}) %>
		</span>

		<%= _.template($('#line').html())() %>

		<%= _.template($('#checkbox').html())({id: "getSize", title: tr("Get message size"), help: {title: tr("Get message size"), description: tr("If enabled, then the size of the message will be retrieved from the server and stored in the variable below.") + " " + tr("The size of the message will be retrieved in octets, one octet is equal to 8 bits."), examples: [{code: tr("Activated"), description: tr("Get message size from server and save")}, {code: tr("Deactivated"), description: tr("Don't get message size from server")}]}}) %>
		<%= _.template($('#variable_constructor').html())({
			id: "saveSize",
			visible_if_checked: "getSize",
			description: tr("Message size"),
			default_variable: "MAIL_SIZE",
			help: {
				description: tr("Variable in which, after successful execution of the action, the size of the retrieved message will be written.") + " " + tr("The size of the message will be retrieved in octets, one octet is equal to 8 bits."),
				examples: [
					{code: 175},
					{code: 2345},
					{code: 11546}
				]
			}
		}) %>


		<%= _.template($('#line').html())() %>

		<%= _.template($('#checkbox').html())({id: "getFlags", title: tr("Get flags of message"), help: {title: tr("Get flags of message"), description: tr("If enabled, then the list of message flags will be retrieved from the server and stored in the variable below.") + " " + tr("The resulting list can be processed using actions from the \"List\" module."), examples: [{code: tr("Activated"), description: tr("Get message flags from server and save")}, {code: tr("Deactivated"), description: tr("Don't get message flags from server")}]}}) %>
		<%= _.template($('#variable_constructor').html())({
			id: "saveFlags",
			visible_if_checked: "getFlags",
			description: tr("Flags of message"),
			default_variable: "MAIL_FLAGS_LIST",
			help: {
				description: tr("Variable in which, after successful execution of the action, the list of flags of the retrieved message will be written.") + " " + tr("The resulting list can be processed using actions from the \"List\" module."),
				examples: [
					{code: "[\"\\Seen\"]"},
					{code: "[\"\\Seen\", \"\\Flagged\"]"},
					{code: "[\"\\Seen\", \"\\Answered\", \"\\Deleted\"]"}
				]
			}
		}) %>

		<%= _.template($('#line').html())() %>

		<%= _.template($('#checkbox').html())({id: "getDate", title: tr("Get receiving date"), help: {title: tr("Get receiving date"), description: tr("If enabled, then the date of the message will be retrieved from the server and stored in the variable below.") + " " + tr("The resulting date can be processed using actions from the \"Date and time\" module."), examples: [{code: tr("Activated"), description: tr("Get message date from server and save")}, {code: tr("Deactivated"), description: tr("Don't get message date from server")}]}}) %>
		<%= _.template($('#variable_constructor').html())({
			id: "saveDate",
			visible_if_checked: "getDate",
			description: tr("Receiving date"),
			default_variable: "MAIL_DATE",
			help: {
				description: tr("Variable in which, after successful execution of the action, the date of the retrieved message will be written.") + " " + tr("The resulting date can be processed using actions from the \"Date and time\" module."),
				examples: [
					{code: new Date('May 13 2021')},
					{code: new Date('Jan 20 2022 16:57:26')},
					{code: new Date()}
				]
			}
		}) %>

		<%= _.template($('#line').html())() %>
		<%= _.template($('#checkbox').html())({id: "getAttachNames", title: tr("Get list of attached file names"), help: {title: tr("Get list of attached file names"), description: tr("If enabled, then the list of filenames attached to the message will be retrieved from the server and stored in the variable below.") + " " + tr("The resulting list can be processed using actions from the \"List\" module."), examples: [{code: tr("Activated"), description: tr("Get list of file attachment names of the message from server and save")}, {code: tr("Deactivated"), description: tr("Don't get list of file attachment names of the message from server")}]}}) %>
		<%= _.template($('#variable_constructor').html())({
			id: "saveAttachnames",
			visible_if_checked: "getAttachNames",
			description: tr("Attachment names"),
			default_variable: "MAIL_ATTACHMENT_NAMES_LIST",
			help: {
				description: tr("Variable in which, after successful execution of the action, the list of filenames attached to the retrieved message will be written.") + " " + tr("The resulting list can be processed using actions from the \"List\" module."),
				examples: [
					{code: "[\"photo.png\"]"},
					{code: "[\"document.pdf\", \"text.txt\"]"},
					{code: "[\"index.html\", \"script.js\", \"icon.ico\"]"}
				]
			}
		}) %>

		<%= _.template($('#line').html())() %>

		<%= _.template($('#checkbox').html())({id: "getAttachments", title: tr("Save attached files"), help: {title: tr("Save attached files"), description: tr("If enabled, then the attachments of the message will be retrieved from the server and saved to the computer as files with a random name, a list of objects with information about attachments will be written to the variable specified below the mask.") + " " + tr("The resulting list can be processed using actions from the \"JSON\" module.") + " " + tr("You can choose which attachments will be saved by specifying the filename mask in the parameter below."), examples: [{code: tr("Activated"), description: tr("Get message attachments from server and save")}, {code: tr("Deactivated"), description: tr("Don't get message attachments from server")}]}}) %>

		<%= _.template($('#input_constructor').html())({
			id: "attachmentsMask",
			visible_if_checked: "getAttachments",
			description: tr("File name mask"),
			default_selector: "string",
			disable_int: true,
			value_string: "*",
			help: {
				description: tr("The file name mask by which attachments will be filtered. Only files whose names match the mask will be retrieved and saved. In the mask, the character <code>*</code> is perceived as a sequence of any characters, and the character <code>?</code> treated as one any character. If the mask begins with the character <code>!</code>, then all attachments whose names do not match this mask will be retrieved and saved.") + " " + tr("You can specify several masks by separating them with the character <code>;</code>, the filtering results of all specified masks will be combined."),
				examples: [
					{code: tr("*.js"), description: tr("All JavaScript files")},
					{code: tr("*.txt"), description: tr("All text files")},
					{code: tr("!*.txt"), description: tr("All files except text")},
					{code: tr("*.js;*.txt"), description: tr("All JavaScript and all text files")},
					{code: tr("*"), description: tr("All files")}
				]
			}
		}) %>
		<%= _.template($('#variable_constructor').html())({
			id: "saveAttachments",
			visible_if_checked: "getAttachments",
			description: tr("Attachments"),
			default_variable: "MAIL_ATTACHMENTS_LIST",
			help: {
				description: tr("Variable in which, after successful execution of the action, the list of objects containing information about the saved attachments of the message will be written.") + " " + tr("The resulting list can be processed using actions from the \"JSON\" module.") + " " + tr("The \"name\" property of the object will contain the original file name, the \"path\" property will contain the path to the saved file, and the \"type\" property will contain the mime type of the file. Having obtained the path to the file and its original name from the object, you can rename it using the \"Move file/folder\" action from the \"Filesystem\" module."),
				examples: [
					{code: "[{<br/>name: \"photo.png\",<br/>path: \"1VVDZIew0K.file\",<br/>type: \"image/png\"<br/>}, {<br/>name: \"document.pdf\",<br/>path: \"D0rThm7KHp.file\",<br/>type: \"application/pdf\"<br/>}, {<br/>name: \"text.txt\",<br/>path: \"uBhN59Tokt.file\",<br/>type: \"text/plain\"<br/>}]"}
				]
			}
		}) %>
		

		<%= _.template($('#line').html())() %>

		<%= _.template($('#checkbox').html())({id: "getRawHeader", title: tr("Get technical headers of message"), help: {title: tr("Get technical headers of message"), description: tr("If enabled, then all the headers of message will be retrieved from the server and stored in the variable below as an object.") + " " + tr("The resulting object can be processed using actions from the \"JSON\" module."), examples: [{code: tr("Activated"), description: tr("Get message technical headers from server and save")}, {code: tr("Deactivated"), description: tr("Don't get message technical headers from server")}]}}) %>
		<%= _.template($('#variable_constructor').html())({
			id: "saveRawHeader",
			visible_if_checked: "getRawHeader",
			description: tr("Technical headers of message"),
			default_variable: "MAIL_RAW_HEADERS",
			help: {
				description: tr("Variable in which, after successful execution of the action, an object with all the headers of the retrieved message will be written.") + " " + tr("The resulting object can be processed using actions from the \"JSON\" module.") + " " + tr("The headers are stored as an object where the key is the header name and the value is the header value, the header value can be a string or a list of strings."),
				examples: [
					{code: "{<br/>content-type: \"multipart/alternative\",<br/>date: \"Thu, 18 Jun 2020 11:26:19 +0000 (UTC)\",<br/>delivered-to: \"you@site.com\",<br/>mime-version: \"1.0\",<br/>message-id: \"5eeb4f5be870.6c531352947a@example.com\",<br/>x-info: \"info\"<br/>...<br/>}"}
				]
			}
		}) %>
	<%= _.template($('#block_end').html())() %>
	<%= _.template($('#block_start').html())({id:"Additional", name: tr("Additional settings"), description: ""}) %>
		<%= _.template($('#checkbox').html())({id: "delAfter", title: tr("Delete message after receiving"), help: {title: tr("Delete message after receiving"), description: tr("Optional parameter.") + " " + tr("If activated, after successfully receiving the message will be deleted from the mailbox. When this parameter is enabled, the \"Set flags after receiving\" parameter is ignored."), examples: [{code: tr("Activated"), description: tr("Delete message after receiving")}, {code: tr("Deactivated"), description: tr("Don't delete message after receiving")}]}}) %>

		<%= _.template($('#checkbox').html())({id: "setFlagsAfter", title: tr("Set flags after receiving"), help: {title: tr("Set flags after receiving"), description: tr("Optional parameter.") + " " + tr("If activated, after successfully receiving the message, one or more of the specified flags will be set for it. This parameter is ignored if the \"Delete message after receiving\" parameter is enabled."), examples: [{code: tr("Activated"), description: tr("Set message flags after receiving")}, {code: tr("Deactivated"), description: tr("Don't set message flags after receiving")}]}}) %>

			<%= _.template($('#input_constructor').html())({
				id: "setFlags",
				visible_if_checked: "setFlagsAfter",
				description: tr("Flags"),
				default_selector: "string",
				variants: [
					{value: "\\Seen", description: tr("Message has been read")},
					{value: "\\Answered", description: tr("Message has been answered")},
					{value: "\\Flagged", description: tr("Message is \"flagged\" for urgent/special attention")},
					{value: "\\Deleted", description: tr("Message is marked for removal")},
					{value: "\\Draft", description: tr("Message has not completed composition (marked as a draft)")}
				],
				disable_int: true,
				value_string: "",
				help: {
					description: tr("List or one flag which needs to set for the message.") + " " + tr("As a list, you can use a string consisting of flags, separated by commas.") + " " + tr("The possible flags may differ depending on the server implementation.") + "<br/><strong>\\Seen</strong> - " + tr("Message has been read") + "<br/><strong>\\Answered</strong> - " + tr("Message has been answered") + "<br/><strong>\\Flagged</strong> - " + tr("Message is \"flagged\" for urgent/special attention") + "<br/><strong>\\Deleted</strong> - " + tr("Message is marked for removal") + "<br/><strong>\\Draft</strong> - " + tr("Message has not completed composition (marked as a draft)"),
					examples: [
						{code: "\\Seen,\\Flagged"},
						{code: "\\Seen, \\Flagged"},
						{code: "[\"\\Seen\", \"\\Flagged\"]"}
					]
				}
			}) %>


		<%= _.template($('#input_constructor').html())({
			id: "box",
			description: tr("Folder name"),
			default_selector: "string",
			variants: [
				{value: "INBOX", description: tr("Default folder incoming messages")}
			],
			disable_int: true,
			value_string: "",
			help: {
				description: tr("Optional parameter.") + " " + tr("The name of the folder in which this action will be performed, if not specified, the folder specified in the \"Configure receiving mail\" action will be used.") + " " + tr("You can get a list of mailbox folders using the \"Get list of folders\" action."),
				examples: [
					{code: "INBOX", description: tr("Default folder incoming messages")},
					{code: "Spam", description: tr("Spam folder, on some mails")},
					{code: "Trash", description: tr("Trash folder, on some mails")},
					{code: tr("Empty string"), description: tr("Use the folder specified in the \"Configure receiving mail\" action")}
				]
			}
		}) %>
	<%= _.template($('#block_end').html())() %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Get the content of the message with the specified id.</div>
	<div class="tr tooltip-paragraph-fold">In order to execute this action correctly you need to run "Configure receiving mail" action first.</div>
	<div class="tr tooltip-paragraph-fold">This action will get the message by id and save its parts to the specified variables.</div>
	<div class="tr tooltip-paragraph-fold">Using the parameters from the "Parsing" block, you can choose which parts of the message will be retrieved and saved, and which ones will be skipped, thereby saving traffic and time by getting only what you need.</div>
	<div class="tr tooltip-paragraph-fold">To perform this action, you need to get the id of the message, you can do this using the actions "Find id of the last message", "Find id of one message by criteria".</div>
	<div class="tr tooltip-paragraph-fold">This action can delete the message or set flags for it, after successful receipt, for this you need to use the corresponding parameters in the additional settings.</div>
	<div class="tr tooltip-paragraph-fold">In the additional settings, you can specify the name of the folder in which this action will be performed, otherwise the folder specified in the "Configure receiving mail" action will be used.</div>
	<div class="tr tooltip-paragraph-last-fold">If an error occurred while execute action, the thread will stop with fail message. If you want to continue thread, use "Ignore errors" action.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", use_timeout:true, visible:true}) %>
