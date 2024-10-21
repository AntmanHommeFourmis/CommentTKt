var enable = GetInputConstructorValue("enable",loader);
if(enable["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Enable debug") + tr("\" is not specified"));
	return;
};
try{
    var code = loader.GetAdditionalData() + _.template($("#idle_emulation_set_debug_code").html())({
        "enable": enable["updated"]
    });
    code = Normalize(code, 0);
    BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e){}