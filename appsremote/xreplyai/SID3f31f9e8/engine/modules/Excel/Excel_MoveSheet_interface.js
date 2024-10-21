<div class="container-fluid">
<%= _.template($('#input_constructor').html())({id:"FilePath", description: tr("File path"), default_selector: "string", disable_int:true, value_string: "", help: {description:tr("The path to the excel file."),examples:[{code:"{{excel_file}}"},{code:"C:/test.xlsx"},{code:"C:/Program Files/test1.xlsx"},{code:"C:/Program Files/test2.xlsx"}]} }) %>
<%= _.template($('#input_constructor').html())({id:"SheetIndexOrName", description: tr("Sheet index or name"), default_selector: "int", value_number: 0, min_number:0, max_number:999999, help: {description: tr("Index or sheet name in excel file."),examples:[{code:0, description: tr("First sheet index")}, {code:1, description: tr("Second sheet index")}, {code:tr("Sheet1"), description: tr("First sheet name")}, {code:tr("Sheet2"), description: tr("Second sheet name")}]} }) %>
<%= _.template($('#input_constructor').html())({id:"NewSheetIndex", description: tr("New sheet index") + ". " + tr("Can be blank"), default_selector: "int", value_number: "", min_number:0, max_number:999999, help: {description: tr("The index where the sheet should be moved, or the name of the sheet before which it should be placed."),examples:[{code:tr("Numbеr"), description: tr("The sheet will have the specified index")}, {code:0, description: tr("First sheet index")}, {code:1, description: tr("Second sheet index")}, {code:tr("String"), description: tr("The sheet will be placed in before the specified sheet")}, {code:tr("Empty string"), description: tr("The sheet will be moved to the end of the book")}]} }) %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Move specified sheet in excel file.</div>
	<div class="tr tooltip-paragraph-fold">If the "New sheet index" parameter is empty, the sheet will be moved to the end of the book.</div>
	<div class="tr tooltip-paragraph-fold">In the "New sheet index" parameter, you can specify the name of an existing sheet, then the specified sheet will be placed before it.</div>
	<div class="tr tooltip-paragraph-fold">When specifying a sheet name in the "New sheet index" parameter, the field type must be <code>string</code>.</div>
	<div class="tr tooltip-paragraph-fold">If a resource is specified in the "File path" parameter, resource location will be used.</div>
	<div class="tr tooltip-paragraph-last-fold">If an error occurred while execute action, the thread will stop with fail message. If you want to continue thread, use "Ignore errors" action.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd",use_timeout: true,use_waiter: true,waiter_enabled: true,waiter_title: "Wait until the file will be written, it may take additional time. In case if this option is checked, error will be thrown if file could not be saved.",visible:true}) %>
