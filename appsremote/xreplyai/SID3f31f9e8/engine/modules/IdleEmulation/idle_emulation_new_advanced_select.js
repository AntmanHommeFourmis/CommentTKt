var time = GetInputConstructorValue("time", loader);
if(time["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Emulation time") + tr("\" is not specified"));
	return;
};

var actions = [];

if($("#sleep").is(':checked')){
	var sleepChance = GetInputConstructorValue("sleepChance", loader);
	if(sleepChance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Sleep chance") + tr("\" is not specified"));
		return;
	};
	var sleepMin = GetInputConstructorValue("sleepMin", loader);
	if(sleepMin["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum sleep time") + tr("\" is not specified"));
		return;
	};
	var sleepMax = GetInputConstructorValue("sleepMax", loader);
	if(sleepMax["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum sleep time") + tr("\" is not specified"));
		return;
	};
	
	actions.push(`{name: 'sleep', chance: (${sleepChance["updated"]}), min: (${sleepMin["updated"]}), max: (${sleepMax["updated"]})}`);
};

if($("#scroll").is(':checked')){
	var scrollChance = GetInputConstructorValue("scrollChance", loader);
	if(scrollChance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Scroll chance") + tr("\" is not specified"));
		return;
	};
	var scrollDirection = GetInputConstructorValue("scrollDirection", loader);
	if(scrollDirection["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Scroll direction") + tr("\" is not specified"));
		return;
	};
	var scrollMinDistance = GetInputConstructorValue("scrollMinDistance", loader);
	if(scrollMinDistance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum scroll distance") + tr("\" is not specified"));
		return;
	};
	var scrollMaxDistance = GetInputConstructorValue("scrollMaxDistance", loader);
	if(scrollMaxDistance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum scroll distance") + tr("\" is not specified"));
		return;
	};
	var scrollMinPause = GetInputConstructorValue("scrollMinPause", loader);
	if(scrollMinPause["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum pause") + tr("\" is not specified"));
		return;
	};
	var scrollMaxPause = GetInputConstructorValue("scrollMaxPause", loader);
	if(scrollMaxPause["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum pause") + tr("\" is not specified"));
		return;
	};
	var longMoveGravity = GetInputConstructorValue("longMoveGravity", loader);
	if(longMoveGravity["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move gravity") + tr("\" is not specified"));
		return;
	};
	var longMoveDeviation = GetInputConstructorValue("longMoveDeviation", loader);
	if(longMoveDeviation["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move deviation") + tr("\" is not specified"));
		return;
	};
	
	var scrollMoveChance = GetInputConstructorValue("scrollMoveChance", loader);
	if(scrollMoveChance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move chance") + tr("\" is not specified"));
		return;
	};
	var scrollMoveInScrollDirection = $("#scrollMoveInScrollDirection").is(':checked');
	var scrollMoveBeyond = GetInputConstructorValue("scrollMoveBeyond", loader);
	if(scrollMoveBeyond["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Screen border") + tr("\" is not specified"));
		return;
	};
	var scrollMoveMinDistance = GetInputConstructorValue("scrollMoveMinDistance", loader);
	if(scrollMoveMinDistance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move minimum distance") + tr("\" is not specified"));
		return;
	};
	var scrollMoveMaxDistance = GetInputConstructorValue("scrollMoveMaxDistance", loader);
	if(scrollMoveMaxDistance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move maximum distance") + tr("\" is not specified"));
		return;
	};
	var scrollMoveMaxDistance = GetInputConstructorValue("scrollMoveMaxDistance", loader);
	if(scrollMoveMaxDistance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move maximum distance") + tr("\" is not specified"));
		return;
	};
	var scrollMoveGravity = GetInputConstructorValue("scrollMoveGravity", loader);
	if(scrollMoveGravity["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move gravity") + tr("\" is not specified"));
		return;
	};
	var scrollMoveDeviation = GetInputConstructorValue("scrollMoveDeviation", loader);
	if(scrollMoveDeviation["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move deviation") + tr("\" is not specified"));
		return;
	};
	
	actions.push(`{name: 'scroll', chance: (${scrollChance["updated"]}), direction: (${scrollDirection["updated"]}), distance: {min: (${scrollMinDistance["updated"]}), max: (${scrollMaxDistance["updated"]})}, pause: {min: (${scrollMinPause["updated"]}), max: (${scrollMaxPause["updated"]})}, move: {chance: (${scrollMoveChance["updated"]}), in_scroll_direction: ${scrollMoveInScrollDirection}, beyond: (${scrollMoveBeyond["updated"]}), min_distance: (${scrollMoveMinDistance["updated"]}), max_distance: (${scrollMoveMaxDistance["updated"]}), gravity: (${scrollMoveGravity["updated"]}), deviation: (${scrollMoveDeviation["updated"]})}}`);
};

if($("#longElementMove").is(':checked')){
	var longMoveChance = GetInputConstructorValue("longMoveChance", loader);
	if(longMoveChance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Long move chance") + tr("\" is not specified"));
		return;
	};
	var longMoveMode = GetInputConstructorValue("longMoveMode", loader);
	if(longMoveMode["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Element selection mode") + tr("\" is not specified"));
		return;
	};
	var longMoveMinCount = GetInputConstructorValue("longMoveMinCount", loader);
	if(longMoveMinCount["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum number of movements") + tr("\" is not specified"));
		return;
	};
	var longMoveMaxCount = GetInputConstructorValue("longMoveMaxCount", loader);
	if(longMoveMaxCount["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum number of movements") + tr("\" is not specified"));
		return;
	};
	var longMoveMaxDistance = GetInputConstructorValue("longMoveMaxDistance", loader);
	if(longMoveMaxDistance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum moving distance") + tr("\" is not specified"));
		return;
	};
	var longMoveScalableSpeed = $("#longMoveScalableSpeed").is(':checked');
	var longMoveGravity = GetInputConstructorValue("longMoveGravity", loader);
	if(longMoveGravity["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move gravity") + tr("\" is not specified"));
		return;
	};
	var longMoveDeviation = GetInputConstructorValue("longMoveDeviation", loader);
	if(longMoveDeviation["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move deviation") + tr("\" is not specified"));
		return;
	};
	
	actions.push(`{name: 'longElementMove', chance: (${longMoveChance["updated"]}), mode: (${longMoveMode["updated"]}), count: {min: (${longMoveMinCount["updated"]}), max: (${longMoveMaxCount["updated"]})}, maxDistance: (${longMoveMaxDistance["updated"]}), scalableSpeed: ${longMoveScalableSpeed}, gravity: (${longMoveGravity["updated"]}), deviation: (${longMoveDeviation["updated"]})}`);
};

if($("#shortElementMove").is(':checked')){
	var shortMoveChance = GetInputConstructorValue("shortMoveChance", loader);
	if(shortMoveChance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Short move chance") + tr("\" is not specified"));
		return;
	};
	var shortMoveMode = GetInputConstructorValue("shortMoveMode", loader);
	if(shortMoveMode["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Element selection mode") + tr("\" is not specified"));
		return;
	};
	var shortMoveMinCount = GetInputConstructorValue("shortMoveMinCount", loader);
	if(shortMoveMinCount["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum number of movements") + tr("\" is not specified"));
		return;
	};
	var shortMoveMaxCount = GetInputConstructorValue("shortMoveMaxCount", loader);
	if(shortMoveMaxCount["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum number of movements") + tr("\" is not specified"));
		return;
	};
	var shortMoveMaxDistance = GetInputConstructorValue("shortMoveMaxDistance", loader);
	if(shortMoveMaxDistance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum moving distance") + tr("\" is not specified"));
		return;
	};
	var shortMoveScalableSpeed = $("#shortMoveScalableSpeed").is(':checked');
	var shortMoveGravity = GetInputConstructorValue("shortMoveGravity", loader);
	if(shortMoveGravity["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move gravity") + tr("\" is not specified"));
		return;
	};
	var shortMoveDeviation = GetInputConstructorValue("shortMoveDeviation", loader);
	if(shortMoveDeviation["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move deviation") + tr("\" is not specified"));
		return;
	};
	
	actions.push(`{name: 'shortElementMove', chance: (${shortMoveChance["updated"]}), mode: (${shortMoveMode["updated"]}), count: {min: (${shortMoveMinCount["updated"]}), max: (${shortMoveMaxCount["updated"]})}, maxDistance: (${shortMoveMaxDistance["updated"]}), scalableSpeed: ${shortMoveScalableSpeed}, gravity: (${shortMoveGravity["updated"]}), deviation: (${shortMoveDeviation["updated"]})}`);
};

if($("#randomMove").is(':checked')){
	var randomMoveChance = GetInputConstructorValue("randomMoveChance", loader);
	if(randomMoveChance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Random move chance") + tr("\" is not specified"));
		return;
	};
	var randomMoveMinCount = GetInputConstructorValue("randomMoveMinCount", loader);
	if(randomMoveMinCount["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum number of movements") + tr("\" is not specified"));
		return;
	};
	var randomMoveMaxCount = GetInputConstructorValue("randomMoveMaxCount", loader);
	if(randomMoveMaxCount["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum number of movements") + tr("\" is not specified"));
		return;
	};
	var randomMoveScalableSpeed = $("#randomMoveScalableSpeed").is(':checked');
	var randomMoveGravity = GetInputConstructorValue("randomMoveGravity", loader);
	if(randomMoveGravity["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move gravity") + tr("\" is not specified"));
		return;
	};
	var randomMoveDeviation = GetInputConstructorValue("randomMoveDeviation", loader);
	if(randomMoveDeviation["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move deviation") + tr("\" is not specified"));
		return;
	};
	
	actions.push(`{name: 'randomMove', chance: (${randomMoveChance["updated"]}), count: {min: (${randomMoveMinCount["updated"]}), max: (${randomMoveMaxCount["updated"]})}, scalableSpeed: ${randomMoveScalableSpeed}, gravity: (${randomMoveGravity["updated"]}), deviation: (${randomMoveDeviation["updated"]})}`);
};

if($("#microMove").is(':checked')){
	var microMoveChance = GetInputConstructorValue("microMoveChance", loader);
	if(microMoveChance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Micro move chance") + tr("\" is not specified"));
		return;
	};
	var microMoveMinCount = GetInputConstructorValue("microMoveMinCount", loader);
	if(microMoveMinCount["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum number of movements") + tr("\" is not specified"));
		return;
	};
	var microMoveMaxCount = GetInputConstructorValue("microMoveMaxCount", loader);
	if(microMoveMaxCount["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum number of movements") + tr("\" is not specified"));
		return;
	};
	var microMoveMinDistance = GetInputConstructorValue("microMoveMinDistance", loader);
	if(microMoveMinDistance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum moving distance") + tr("\" is not specified"));
		return;
	};
	var microMoveMaxDistance = GetInputConstructorValue("microMoveMaxDistance", loader);
	if(microMoveMaxDistance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum moving distance") + tr("\" is not specified"));
		return;
	};
	var microMoveScalableSpeed = $("#microMoveScalableSpeed").is(':checked');
	var microMoveMinSpeed = GetInputConstructorValue("microMoveMinSpeed", loader);
	if(microMoveMinSpeed["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum moving speed") + tr("\" is not specified"));
		return;
	};
	var microMoveMaxSpeed = GetInputConstructorValue("microMoveMaxSpeed", loader);
	if(microMoveMaxSpeed["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum moving speed") + tr("\" is not specified"));
		return;
	};
	var microMoveGravity = GetInputConstructorValue("microMoveGravity", loader);
	if(microMoveGravity["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move gravity") + tr("\" is not specified"));
		return;
	};
	var microMoveDeviation = GetInputConstructorValue("microMoveDeviation", loader);
	if(microMoveDeviation["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move deviation") + tr("\" is not specified"));
		return;
	};
	
	actions.push(`{name: 'microMove', chance: (${microMoveChance["updated"]}), count: {min: (${microMoveMinCount["updated"]}), max: (${microMoveMaxCount["updated"]})}, distance: {min: (${microMoveMinDistance["updated"]}), max: (${microMoveMaxDistance["updated"]})}, scalableSpeed: ${microMoveScalableSpeed}, speed: {min: (${microMoveMinSpeed["updated"]}), max: (${microMoveMaxSpeed["updated"]})}, gravity: (${microMoveGravity["updated"]}), deviation: (${microMoveDeviation["updated"]})}`);
};

if($("#goingBeyond").is(':checked')){
	var goingBeyondChance = GetInputConstructorValue("goingBeyondChance", loader);
	if(goingBeyondChance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Going beyond chance") + tr("\" is not specified"));
		return;
	};
	var goingBeyondMinDistance = GetInputConstructorValue("goingBeyondMinDistance", loader);
	if(goingBeyondMinDistance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum moving distance") + tr("\" is not specified"));
		return;
	};
	var goingBeyondMaxDistance = GetInputConstructorValue("goingBeyondMaxDistance", loader);
	if(goingBeyondMaxDistance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum moving distance") + tr("\" is not specified"));
		return;
	};
	var goingBeyondUp = GetInputConstructorValue("goingBeyondUp", loader);
	if(goingBeyondUp["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Up") + tr("\" is not specified"));
		return;
	};
	var goingBeyondRight = GetInputConstructorValue("goingBeyondRight", loader);
	if(goingBeyondRight["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Right") + tr("\" is not specified"));
		return;
	};
	var goingBeyondDown = GetInputConstructorValue("goingBeyondDown", loader);
	if(goingBeyondDown["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Down") + tr("\" is not specified"));
		return;
	};
	var goingBeyondLeft = GetInputConstructorValue("goingBeyondLeft", loader);
	if(goingBeyondLeft["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Left") + tr("\" is not specified"));
		return;
	};
	var goingBeyondScalableSpeed = $("#goingBeyondScalableSpeed").is(':checked');
	var goingBeyondGravity = GetInputConstructorValue("goingBeyondGravity", loader);
	if(goingBeyondGravity["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move gravity") + tr("\" is not specified"));
		return;
	};
	var goingBeyondDeviation = GetInputConstructorValue("goingBeyondDeviation", loader);
	if(goingBeyondDeviation["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move deviation") + tr("\" is not specified"));
		return;
	};
	
	actions.push(`{name: 'goingBeyond', chance: (${goingBeyondChance["updated"]}), distance: {min: (${goingBeyondMinDistance["updated"]}), max: (${goingBeyondMaxDistance["updated"]})}, up: (${goingBeyondUp["updated"]}), right: (${goingBeyondRight["updated"]}), down: (${goingBeyondDown["updated"]}), left: (${goingBeyondLeft["updated"]}), scalableSpeed: ${goingBeyondScalableSpeed}, gravity: (${goingBeyondGravity["updated"]}), deviation: (${goingBeyondDeviation["updated"]})}`);
};

if($("#moveAlongText").is(':checked')){
	var moveAlongTextChance = GetInputConstructorValue("moveAlongTextChance", loader);
	if(moveAlongTextChance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Movement along text chance") + tr("\" is not specified"));
		return;
	};
	var moveAlongTextMinLength = GetInputConstructorValue("moveAlongTextMinLength", loader);
	if(moveAlongTextMinLength["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum text length") + tr("\" is not specified"));
		return;
	};
	var moveAlongTextScalableSpeed = $("#moveAlongTextScalableSpeed").is(':checked');
	var moveAlongTextMinSpeed = GetInputConstructorValue("moveAlongTextMinSpeed", loader);
	if(moveAlongTextMinSpeed["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum moving speed") + tr("\" is not specified"));
		return;
	};
	var moveAlongTextMaxSpeed = GetInputConstructorValue("moveAlongTextMaxSpeed", loader);
	if(moveAlongTextMaxSpeed["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum moving speed") + tr("\" is not specified"));
		return;
	};
	var moveAlongTextGravity = GetInputConstructorValue("moveAlongTextGravity", loader);
	if(moveAlongTextGravity["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move gravity") + tr("\" is not specified"));
		return;
	};
	var moveAlongTextDeviation = GetInputConstructorValue("moveAlongTextDeviation", loader);
	if(moveAlongTextDeviation["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Move deviation") + tr("\" is not specified"));
		return;
	};
	
	actions.push(`{name: 'moveAlongText', chance: (${moveAlongTextChance["updated"]}), minLength: (${moveAlongTextMinLength["updated"]}), scalableSpeed: ${moveAlongTextScalableSpeed}, speed: {min: (${moveAlongTextMinSpeed["updated"]}), max: (${moveAlongTextMaxSpeed["updated"]})}, gravity: (${moveAlongTextGravity["updated"]}), deviation: (${moveAlongTextDeviation["updated"]})}`);
};

actions = `[${actions.join(', ')}]`;

var onOneEll = $("#onOneEll").is(':checked');
if(onOneEll){
	var onOneEllChance = GetInputConstructorValue("onOneEllChance", loader);
	if(onOneEllChance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Movements on one element chance") + tr("\" is not specified"));
		return;
	};
	var onOneEllMinSize = GetInputConstructorValue("onOneEllMinSize", loader);
	if(onOneEllMinSize["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum element size") + tr("\" is not specified"));
		return;
	};
	var onOneEllSort = $("#onOneEllSort").is(':checked');
	var onOneEllMinCount = GetInputConstructorValue("onOneEllMinCount", loader);
	if(onOneEllMinCount["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum number of movements") + tr("\" is not specified"));
		return;
	};
	var onOneEllMaxCount = GetInputConstructorValue("onOneEllMaxCount", loader);
	if(onOneEllMaxCount["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum number of movements") + tr("\" is not specified"));
		return;
	};
	
	var onOneEllParams = `{chance: (${onOneEllChance["updated"]}), minSize: (${onOneEllMinSize["updated"]}), sort: ${onOneEllSort}, count: {min: (${onOneEllMinCount["updated"]}), max: (${onOneEllMaxCount["updated"]})}}`
};

var miss = $("#miss").is(':checked');
if(miss){
	var missChance = GetInputConstructorValue("missChance", loader);
	if(missChance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Miss chance") + tr("\" is not specified"));
		return;
	};
	var missMinDistance = GetInputConstructorValue("missMinDistance", loader);
	if(missMinDistance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum miss distance") + tr("\" is not specified"));
		return;
	};
	var missMaxDistance = GetInputConstructorValue("missMaxDistance", loader);
	if(missMaxDistance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum miss distance") + tr("\" is not specified"));
		return;
	};
	var missMaxArea = GetInputConstructorValue("missMaxArea", loader);
	if(missMaxArea["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum element area") + tr("\" is not specified"));
		return;
	};
	
	var missParams = `{chance: (${missChance["updated"]}), distance: {min: (${missMinDistance["updated"]}), max: (${missMaxDistance["updated"]})}, maxArea: (${missMaxArea["updated"]})}`
};

var delay = $("#delay").is(':checked');
if(delay){
	var delayChance = GetInputConstructorValue("delayChance", loader);
	if(delayChance["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Delay chance") + tr("\" is not specified"));
		return;
	};
	var delayMin = GetInputConstructorValue("delayMin", loader);
	if(delayMin["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Minimum delay") + tr("\" is not specified"));
		return;
	};
	var delayMax = GetInputConstructorValue("delayMax", loader);
	if(delayMax["original"].length == 0){
		Invalid(tr("The parameter \"") + tr("Maximum delay") + tr("\" is not specified"));
		return;
	};
	
	var delayParams = `{chance: (${delayChance["updated"]}), min: (${delayMin["updated"]}), max: (${delayMax["updated"]})}`
};

var filters = GetInputConstructorValue("filters", loader);
if(filters["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Selecting an element to hover") + tr("\" is not specified"));
	return;
};
var hoverMode = GetInputConstructorValue("hoverMode", loader);
if(hoverMode["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Hover position") + tr("\" is not specified"));
	return;
};
var maxRepeatSkip = GetInputConstructorValue("maxRepeatSkip", loader);
if(maxRepeatSkip["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Max repeat skip") + tr("\" is not specified"));
	return;
};
var overlapByPoints = GetInputConstructorValue("overlapByPoints", loader);
if(overlapByPoints["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Overlap by points") + tr("\" is not specified"));
	return;
};
var scrollSpeed = GetInputConstructorValue("scrollSpeed", loader);
if(scrollSpeed["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Scroll speed") + tr("\" is not specified"));
	return;
};
var reverseScroll = GetInputConstructorValue("reverseScroll", loader);
if(reverseScroll["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Reverse scroll chance") + tr("\" is not specified"));
	return;
};
var mouseMinSpeed = GetInputConstructorValue("mouseMinSpeed", loader);
if(mouseMinSpeed["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Minimum mouse speed") + tr("\" is not specified"));
	return;
};
var mouseMaxSpeed = GetInputConstructorValue("mouseMaxSpeed", loader);
if(mouseMaxSpeed["original"].length == 0){
	Invalid(tr("The parameter \"") + tr("Maximum mouse speed") + tr("\" is not specified"));
	return;
};
var mouseSpeed = `{min: (${mouseMinSpeed["updated"]}), max: (${mouseMaxSpeed["updated"]})}`
try{
	var code = loader.GetAdditionalData() + _.template($("#idle_emulation_new_advanced_code").html())({
		time: time["updated"],
		actions: actions,
		onOneEll: onOneEll,
		onOneEllParams: onOneEllParams,
		miss: miss,
		missParams: missParams,
		delay: delay,
		delayParams: delayParams,
		filters: filters["updated"],
		hoverMode: hoverMode["updated"],
		maxRepeatSkip: maxRepeatSkip["updated"],
		overlapByPoints: overlapByPoints["updated"],
		scrollSpeed: scrollSpeed["updated"],
		reverseScroll: reverseScroll["updated"],
		mouseSpeed: mouseSpeed
	});
	code = Normalize(code, 0);
	BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e){}
