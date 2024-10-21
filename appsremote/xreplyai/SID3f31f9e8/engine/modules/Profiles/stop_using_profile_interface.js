<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">By default BAS browser stores all profile data in temporary folder. This action will switch to new temporary profile.</div>
	<div class="tr tooltip-paragraph-fold">Current action is deprecated. Instead it is recommended to use <a href="#!/browsersettings">Browser Settings</a> with "Profile folder path" param set to "temporary" value. With the help of it, you can change all settings that require a browser restart at once.</div>
	<div class="tr tooltip-paragraph-fold">Switching profile requires browser restart, so this action may restart browser in case if it exists. Restarting browser will also reset all browser settings.</div>
	<div class="tr tooltip-paragraph-last-fold">In case if temporary profile is used, new temporary profile will be created.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>