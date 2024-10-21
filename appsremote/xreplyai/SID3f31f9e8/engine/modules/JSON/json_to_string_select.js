let Save = this.$el.find("#Save").val().toUpperCase();
let Data = GetInputConstructorValue("Data", loader);

if (Data["original"].length === 0) {
    Invalid("Data is empty");
    return;
}

if (Save.length === 0) {
    Invalid("Variable is empty");
    return;
}

try {
    let code = loader.GetAdditionalData() + _.template($("#json_to_string_code").html())({
        variable: `VAR_${Save}`,
        data: Data["updated"],
    });
    code = Normalize(code, 0);
    BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}
catch (e) {
    // pass error
}