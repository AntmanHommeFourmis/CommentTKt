var collectParams = function(names, arr = []){
	for(var name of names){
		var value = GetInputConstructorValue(name, loader)["updated"];
		if(value !== '""'){
			arr.push(`${name}: (${value})`);
		};
	};
	return arr;
};

var generalSettings = collectParams(["time", "accuracy", "intensity"]);

var actions = collectParams(["sleep", "longElementMove", "shortElementMove", "scroll", "randomMove", "microMove", "goingBeyond", "moveAlongText"]);
if(actions.length){
	generalSettings.push(`useActions: {${actions.join(', ')}}`);
};

collectParams(["longMax", "shortMax", "miss", "delay", "targetScroll", "targetDelay", "filters", "hoverMode", "maxRepeatSkip", "overlapByPoints", "reverseScroll", "additionalEmulation"], generalSettings);

if(generalSettings.length == 0){
	Invalid(tr("None of the parameters are specified"));
	return;
};

generalSettings = `{${generalSettings.join(', ')}}`;
try{
	var code = loader.GetAdditionalData() + _.template($("#idle_emulation_set_general_settings_code").html())({
		generalSettings: generalSettings
	});
	code = Normalize(code, 0);
	BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e){}
