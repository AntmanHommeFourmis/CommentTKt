<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({id:"Path", description:tr("Profile folder path"), default_selector: "string", disable_int:true, value_string: "", help: {description: tr("String with profile folder. Slash type is not important. If folder doesn't exist, it will be created. If folder already exists, BAS will use it as profile and restore all data from it like cookies, localstorage, etc"), examples:[{code:"c:/path/to/profile"},{code:"c:\\path\\to\\profile"}]} }) %>
	<%= _.template($('#input_constructor').html())({id:"LoadFPFromFolder", description:tr("Always load fingerprint from profile folder"), default_selector: "string", disable_int:true, value_string: "true", variants: ["true","false"], help: {description: tr("In case if profile folder already exists and has fingerprint data, tells BAS to apply fingerpint used latest for that profile.")}}) %>
	<%= _.template($('#input_constructor').html())({id:"Key", description:tr("FingerprintSwitcher key. Can be empty"), default_selector: "string", disable_int:true,
         variants: ["business<br/><span style='color:gray;font-size:small'>" + tr("Use FingerprintBusiness license.") + "</span><br/><span style='color:gray;font-size:small'>" + tr("It can help to embed fingerprints inside compiled script.") + "</span>"],
          help: 
          {
            description: tr("Fingerprints are obtained from the FingerprintSwitcher service. To use this service, you need to purchase a key. Key verification is required when using profile which has fingerprint data. If you don't change profile folder or it doesn't contain fingerprint data, you can leave this field blank. You can also leave this field blank if the fingerprint was obtained using the free version (without a key). However, if the fingerprint was obtained with the paid version, you must provide a valid key to apply it. To use the free version, simply leave this field blank."), examples:
            [
              {
                code:"pGGeNdza2e0gIw48oa",description:tr("Key example, it is required if fingerprint was obtained with paid version.")
              },
              {
                code:"business",description:tr("Use FingerprintBusiness license. It can help to embed fingerprints inside compiled script. Check following") + " " + `<a href='#' style="color:rgba(157, 153, 108, 1.0)" onclick="BrowserAutomationStudio_OpenUrl('` + tr('https://wiki.bablosoft.com/doku.php?id=fingerprintbusiness') + `');return false">` + tr('link') + `</a>` + " " + tr("for more info.")
              },
              
              {
                code:tr("Empty string"),description:tr("Use a free version. Only if fingerprint was obtained with free version.")
              }
            ]
          } }) %>
	<%= _.template($('#info').html())({color: "gray", description: `<span class="tr">This action works with</span> 
  	<a href="#"  onclick="BrowserAutomationStudio_OpenUrl('https://fp.bablosoft.com'); return false;">
  		<span class="tr">Fingerprint switcher service</span></a>. 
  	<span class="tr">You can get a key there</span>. `}) %>
	<%= _.template($('#input_constructor').html())({id:"LoadProxyFromFolder", description:tr("Always load proxy from profile folder"), default_selector: "string", disable_int:true, value_string: "true", variants: ["true","false"], help: {description: tr("In case if profile folder already exists and has proxy data, tells BAS to apply proxy used latest for that profile.")}}) %>
</div>

<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Tells browser to use specified folder as a place to store cookies, cache, localstorage, etc.</div>
	<div class="tr tooltip-paragraph-fold">Current action is deprecated. Instead it is recommended to use <a href="#!/browsersettings">Browser Settings</a> with "Profile folder path" param. With the help of it, you can change all settings that require a browser restart at once.</div>
	<div class="tr tooltip-paragraph-fold">If specified folder doesn't exist it will be created.</div>
	<div class="tr tooltip-paragraph-fold">If specified folder already exists, than browser will load all data from it.</div> 
	<div class="tr tooltip-paragraph-fold">Switching profile requires browser restart, so this action may restart browser in case if it exists. Restarting browser will also reset all browser settings.</div>
	<div class="tr tooltip-paragraph-last-fold">You can implement autologin with this action, first you need to specify some folder and do login with browser, then you may restart and specify same folder again. Browser will load all data from previous session and you don't need to login second time.</div>
</div>

<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>