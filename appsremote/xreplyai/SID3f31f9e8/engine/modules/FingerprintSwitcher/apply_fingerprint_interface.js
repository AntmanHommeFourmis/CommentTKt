<div class="container-fluid">
  <%= _.template($('#input_constructor').html())({id:"Fingerprint", description:tr("Fingerprint"), default_selector: "string", disable_int:true, help: 
	{
		description: tr("This value must contain fingerprint string. Fingerprint string contains all data necessary to change fingerprint. It can be obtained as result of 'Get fingerprint' action. Note that this value may be reused - if you store it into file or database, and load on next BAS start, it will still work.")
	}}) %>

  <%= _.template($('#input_constructor').html())({id:"Key", description:tr("Service key. Can be empty"), default_selector: "string", disable_int:true,
  	variants: ["business<br/><span style='color:gray;font-size:small'>" + tr("Use FingerprintBusiness license.") + "</span><br/><span style='color:gray;font-size:small'>" + tr("It can help to embed fingerprints inside compiled script.") + "</span>"],
   	help: 
	{
		description: tr("Fingerprints are obtained from the FingerprintSwitcher service. To use this service, you need to purchase a key. The key is verified both when fetching and applying the fingerprint. If the fingerprint was obtained using the free version (without a key), you can leave the key field blank. However, if the fingerprint was obtained with the paid version, you must provide a valid key to apply it. To use the free version, simply leave this field blank."), examples:
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

  <%= _.template($('#block_start').html())({id: "Support", name: tr("How canvas data is being replaced?"), description: `
		<div class="tr">If "Use PerfectCanvas" option is set to true and data for certain image is present inside fingerprint, image will be replaced with data obtained from real device.</div>
    <div class="tr">This is the best option. Try to use PerfectCanvas whenever it is possible.</div>
    <div class="tr">If PerfectCanvas data for specific image is not available, or PerfectCanvas is not available at all, either noise will be added to image, or image obtained from current device will be used. This behavior depends on following settings: "Add noise to canvas data", "Add noise to WebGL data" and "Add noise to audio data".</div>
    <div class="tr">Adding noise could be dangerous  if site checks canvas uniqueness, while using native image can expose your real fingerprint, so it is better to use PerfectCanvas.</div>
	`}) %>
 <%= _.template($('#block_end').html())() %>
 
 <%= _.template($('#input_constructor').html())({id:"PerfectCanvas", description:tr("Use PerfectCanvas"), default_selector: "string", disable_int:true, value_string: "true", variants: ["true", "false"], help: { description: tr("If this settings is set to true, PerfectCanvas replacement will be enabled. Fingerprint must contain PerfectCanvas data in order to make it work. See \"Get fingerprint\" action for explanation.")}}) %>

 <%= _.template($('#input_constructor').html())({id:"CanvasNoise", description:tr("Add noise to canvas data"), default_selector: "string", disable_int:true, value_string: "true", variants: ["true", "false"], help: { description: tr("If this settings is set to true, canvas will be enabled and noise will be added to all data returned from canvas")}}) %>

  <%= _.template($('#input_constructor').html())({id:"WebglNoise", description:tr("Add noise to WebGL data"), default_selector: "string", disable_int:true, value_string: "true", variants: ["true", "false"], help: { description: tr("If this settings is set to true, WebGL will be enabled, noise will be added to WebGL canvas and your hardware properties, like video card vendor and renderer, will be changed")}}) %>

  <%= _.template($('#input_constructor').html())({id:"AudioNoise", description:tr("Add noise to audio data"), default_selector: "string", disable_int:true, value_string: "true", variants: ["true", "false"], help: { description: tr("If this settings is set to true, audio will be enabled, noise will be added to sound and your hardware properties, like sample rate and naumber of channels, will be changed")}}) %>

  <%= _.template($('#input_constructor').html())({id:"SafeBattery", description:tr("Safe Battery"), default_selector: "string", disable_int:true, value_string: "true", variants: ["true", "false"], help: { description: tr("If this settings is set to true battery API will show different values for each thread, this prevents sites for detecting your real identity. In case if device from which fingerprint was obtained doesn't have battery API, 100% charge level will always be returned.")}}) %>
  
  <%= _.template($('#input_constructor').html())({id:"FontData", description:tr("Use font pack"), default_selector: "string", disable_int:true, value_string: "true", variants: ["true", "false"], help: { description: tr("By default browser searches for fonts only in system font folder. This may lead to inconsistencies during fingerprint emulation if target fingerprint has more fonts than local system. Therefore, it is recommended to download font pack with most popular fonts. This setting allows to use font pack if it is installed.")}}) %>

  <%= _.template($('#info').html())({color: "gray", description: `<span class="tr">More info about font pack and download link can be found</span>
    <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://wiki.bablosoft.com/doku.php?id=fontpack'); return false;" class="tr-en">here</a>
    <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://wiki.bablosoft.com/doku.php?id=ru:fontpack'); return false;" class="tr-ru">здесь</a>`}) %>

  <%= _.template($('#input_constructor').html())({id:"SafeRectangles", description:tr("Safe Element Size"), default_selector: "string", disable_int:true, value_string: "false", variants: ["true", "false"], help: { description: tr("If this settings is set to true, results of API which returns element coordinates will be updated to protect against 'client rects' fingerprinting.")}}) %>
  
  <%= _.template($('#input_constructor').html())({id:"EmulateSensor", description:tr("Emulate Sensor API"), default_selector: "string", disable_int:true, value_string: "true", variants: ["true", "false"], help: { description: tr("Chrome browser has Sensor API, which allows to read data from devices like accelerometer, gyroscope or others. Data from that devices is available only on mobile platforms. After checking this setting data for that devices will be generated and replaced automatically. Enable this option in order to emulate mobile fingerprints more precisely.")}}) %>

  <%= _.template($('#input_constructor').html())({id:"EmulateDeviceScaleFactor", description:tr("Emulate device scale factor"), default_selector: "string", disable_int:true, value_string: "true", variants: ["true", "false"], help: { description: tr("Allows to better emulate devices with higher pixel density. With this setting enabled, emulation will be done in the most natural way. It means that browser will render the page in a bigger resolution, just like on real device. The tradeoff is higher system resources usage, because you need to perform more calculations to render a bigger picture. Javascript settings related to pixel density, for example devicePixelRatio, will be replaced correctly regardless if this setting will be enabled or not.")}}) %>

  
</div>



<div class="tooltipinternal">
      <div class="tr tooltip-paragraph-first-fold">Change browser fingerprint, which contains: user agent, screen size, navigator, fonts and many more.</div>
	<div class="tr tooltip-paragraph-fold">'Fingerprint' input parameter must contain fingerprint string. Fingerprint string contains all data necessary to change fingerprint. It can be obtained as result of 'Get fingerprint' action. Note that this value may be reused - if you store it into file or database, and load on next BAS start, it will still work.</div>
      <div class="tr tooltip-paragraph-fold">Using this action is like user agent switcher on steroids. It changes not only user agent, but a lot of browser internals to make BAS actually look like firefox, chrome, safari, on desktop or on mobile.</div>
      <div class="tr tooltip-paragraph-fold">Several additional features may be used to make your browser less detectable. Apply proxy through 'Proxy' action. Change timezone with 'Set timezone and geolocation by ip' action. Use, store and reuse profiles, because starting browser on newly created profiles may be suspicious.</div>
      <div class="tr tooltip-paragraph-fold">Applying fingerprint doesn't require browser restart, so it won't reset your settings.</div>

      <div class="tooltip-paragraph-last-fold"><span class="tr">You can find more information and get test fingerprints on following page</span> <a href="#"  onclick="BrowserAutomationStudio_OpenUrl('https://fp.bablosoft.com'); return false;">
  		FingerprintSwitcher</a>.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
