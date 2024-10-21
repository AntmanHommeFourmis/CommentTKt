try{
    var code = loader.GetAdditionalData() + _.template($("#idle_emulation_reset_general_settings_code").html())({});
    code = Normalize(code, 0);
    BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e){}