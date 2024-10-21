var time = GetInputConstructorValue("time", loader);
if(time["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Emulation time") + tr("\" is not specified"));
	return;
};
var accuracy = GetInputConstructorValue("accuracy", loader);
if(accuracy["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Actions accuracy") + tr("\" is not specified"));
	return;
};
var intensity = GetInputConstructorValue("intensity", loader);
if(intensity["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Actions intensity") + tr("\" is not specified"));
	return;
};

var sleep = GetInputConstructorValue("sleep", loader);
if(sleep["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Sleep") + tr("\" is not specified"));
	return;
};
var longElementMove = GetInputConstructorValue("longElementMove", loader);
if(longElementMove["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Long move to element") + tr("\" is not specified"));
	return;
};
var shortElementMove = GetInputConstructorValue("shortElementMove", loader);
if(shortElementMove["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Short move to element") + tr("\" is not specified"));
	return;
};
var scroll = GetInputConstructorValue("scroll", loader);
if(scroll["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Scroll") + tr("\" is not specified"));
	return;
};
var randomMove = GetInputConstructorValue("randomMove", loader);
if(randomMove["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Random movement") + tr("\" is not specified"));
	return;
};
var microMove = GetInputConstructorValue("microMove", loader);
if(microMove["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Micro movement") + tr("\" is not specified"));
	return;
};
var goingBeyond = GetInputConstructorValue("goingBeyond", loader);
if(goingBeyond["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Going beyond") + tr("\" is not specified"));
	return;
};
var moveAlongText = GetInputConstructorValue("moveAlongText", loader);
if(moveAlongText["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Movement along text") + tr("\" is not specified"));
	return;
};

var actions = [];
var obj = {sleep: sleep, longElementMove: longElementMove, shortElementMove: shortElementMove, scroll: scroll, randomMove: randomMove, microMove: microMove, goingBeyond: goingBeyond, moveAlongText: moveAlongText};
for(var key in obj){
	var value = obj[key]["updated"];
	if(value !== '"enable"'){
		actions.push(`${key}: (${value})`);
	};
}
actions = actions.join(', ');

var manualSettings = [];
for(var name of ["longMax", "shortMax", "miss", "delay", "filters", "hoverMode", "maxRepeatSkip", "overlapByPoints", "reverseScroll"]){
	var value = GetInputConstructorValue(name, loader)["updated"];
	if(value !== '""'){
		manualSettings.push(`${name}: (${value})`);
	};
};
manualSettings = manualSettings.join(', ');
try{
	var code = loader.GetAdditionalData() + _.template($("#idle_emulation_new_code").html())({
		time: time["updated"],
		accuracy: accuracy["updated"],
		intensity: intensity["updated"],
		actions: actions,
		manualSettings: manualSettings
	});
	code = Normalize(code, 0);
	BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e){}
