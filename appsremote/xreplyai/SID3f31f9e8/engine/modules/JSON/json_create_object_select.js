let Save = this.$el.find("#Save").val().toUpperCase();
let Key1 = GetInputConstructorValue("Key1", loader);
let Key2 = GetInputConstructorValue("Key2", loader);
let Key3 = GetInputConstructorValue("Key3", loader);
let Value1 = GetInputConstructorValue("Value1", loader);
let Value2 = GetInputConstructorValue("Value2", loader);
let Value3 = GetInputConstructorValue("Value3", loader);

if (Save.length === 0) {
    Invalid("Variable is empty");
    return;
}

try {
    let code = loader.GetAdditionalData() + _.template($("#json_create_object_code").html())(
        {
            variable: `VAR_${Save}`,
            value1: Value1["updated"],
            value2: Value2["updated"],
            value3: Value3["updated"],
            key1: Key1["original"].length ? Key1["updated"] : null,
            key2: Key2["original"].length ? Key2["updated"] : null,
            key3: Key3["original"].length ? Key3["updated"] : null,
        });
    code = Normalize(code, 0);
    BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}
catch (e) {
    // pass error
}