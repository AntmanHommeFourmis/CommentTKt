var Key = GetInputConstructorValue("Key", loader);


try{
  var code = loader.GetAdditionalData() + _.template($("#override_key_code").html())(
  	{
  		key: Key["updated"],
  	})

  code = Normalize(code,0)
  BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e)
{}