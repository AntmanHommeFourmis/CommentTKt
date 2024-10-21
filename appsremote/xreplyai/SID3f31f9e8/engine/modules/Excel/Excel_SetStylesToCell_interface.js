<div class="container-fluid">
<%= _.template($('#input_constructor').html())({id:"FilePath", description: tr("File path"), default_selector: "string", disable_int:true, value_string: "", help: {description:tr("The path to the excel file."),examples:[{code:"{{excel_file}}"},{code:"C:/test.xlsx"},{code:"C:/Program Files/test1.xlsx"},{code:"C:/Program Files/test2.xlsx"}]} }) %>
<%= _.template($('#input_constructor').html())({id:"SheetIndexOrName", description: tr("Sheet index or name"), default_selector: "int", value_number: 0, min_number:0, max_number:999999, help: {description: tr("Index or sheet name in excel file."),examples:[{code:0, description: tr("First sheet index")}, {code:1, description: tr("Second sheet index")}, {code:tr("Sheet1"), description: tr("First sheet name")}, {code:tr("Sheet2"), description: tr("Second sheet name")}]} }) %>
<%= _.template($('#input_constructor').html())({id:"CellAddress", description: tr("Cell address"), variants:["A1<br/><span style='color:gray;font-size:small'>" + tr("First column, first row") + "</span>","B2<br/><span style='color:gray;font-size:small'>" + tr("Second column, second row") + "</span>","0*0<br/><span style='color:gray;font-size:small'>" + tr("Analog") + " A1. " + tr("First column, first row") + "</span>","1*1<br/><span style='color:gray;font-size:small'>" + tr("Analog") + " B2. " + tr("Second column, second row") + "</span>","[[COLUMN]]*[[ROW]]<br/><span style='color:gray;font-size:small'>" + tr("Column index from variable [[COLUMN]], row index from variable [[ROW]]") + "</span>"], default_selector: "string", disable_int:true, value_string: "A1", help: {description: tr("Cell address in the excel file sheet.") + " " + tr("You can specify a standard address with a column letter and row number, or the column index and row index separated by *. The column/row index is not equal to their number, because the index starts from 0, and the number starts from 1."),examples:[{code:"A1", description: tr("First column, first row")}, {code:"B2", description: tr("Second column, second row")}, {code:tr("0*0"), description: tr("Analog") + " A1. " + tr("First column, first row")}, {code:tr("1*1"), description: tr("Analog") + " B2. " + tr("Second column, second row")}, {code:tr("[[COLUMN]]*[[ROW]]"), description: tr("Column index from variable [[COLUMN]], row index from variable [[ROW]]")}]} }) %>
<%= _.template($('#input_constructor').html())({id:"Styles", description: tr("Styles"), default_selector: "string", disable_int:true, value_string: "", help: {description: tr("JSON string containing style names and values."),examples:[{code:"{\"bold\":true, \"italic\":true}"}]} }) %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Set styles values ​​for cell from specified excel file.</div>
	<div class="tr tooltip-paragraph-fold">This action accepts styles as a JSON string, where key is the style name and value is the style value. Example: <code>{"bold":true, "italic":true}</code></div>
	<div class="tr tooltip-paragraph-fold">Styles in this format can be obtained using the "Get cell styles" action, or you can create them yourself.</div>
	<div class="tooltip-paragraph-fold"><span class="tr">For details on the supported styles, see</span> <a href="#" class="tr" onclick="BrowserAutomationStudio_OpenUrl('https://www.npmjs.com/package/xlsx-populate#style-reference');return false">Style Reference</a>.</div>
	<div class="tr tooltip-paragraph-fold">If a resource is specified in the "File path" parameter, resource location will be used.</div>
	<div class="tr tooltip-paragraph-last-fold">If an error occurred while execute action, the thread will stop with fail message. If you want to continue thread, use "Ignore errors" action.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd",use_timeout: true,use_waiter: true,waiter_enabled: true,waiter_title: "Wait until the file will be written, it may take additional time. In case if this option is checked, error will be thrown if file could not be saved.",visible:true}) %>