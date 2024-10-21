<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({id:"Key", description:tr("FingerprintSwitcher key. Can be empty"), default_selector: "string", disable_int:true,
		variants: ["business<br/><span style='color:gray;font-size:small'>" + tr("Use FingerprintBusiness license.") + "</span><br/><span style='color:gray;font-size:small'>" + tr("It can help to embed fingerprints inside compiled script.") + "</span>"],
		help: 
		{
		description: tr("Fingerprints are obtained from the FingerprintSwitcher service. To use this service, you need to purchase a key. This parameter will override any FingerprintSwitcher key set in actions such as 'Get fingerprint' or 'Apply fingerprint'. The key specified in this parameter will take precedence over any key set in other actions. For example, if this parameter contains key1 and a subsequent 'Get fingerprint' action specifies key2, the key from this parameter (key1) will still be used."), examples:
		[
			{
			code:"pGGeNdza2e0gIw48oa",description:tr("Key example, will override any FingerprintSwitcher key set in actions such as 'Get fingerprint' or 'Apply fingerprint'.")
			},
			{
			code:"business",description:tr("Use FingerprintBusiness license. It can help to embed fingerprints inside compiled script. Check following") + " " + `<a href='#' style="color:rgba(157, 153, 108, 1.0)" onclick="BrowserAutomationStudio_OpenUrl('` + tr('https://wiki.bablosoft.com/doku.php?id=fingerprintbusiness') + `');return false">` + tr('link') + `</a>` + " " + tr("for more info.")
			},
			
			{
			code:tr("Empty string"),description:tr("Use a free version. Empty key will be used in any action which requires FingerprintSwitcher key set, such as 'Get fingerprint' or 'Apply fingerprint'.")
			}
		]
		} }) %>

	<%= _.template($('#info').html())({color: "gray", description: `<span class="tr">This action works with</span> 
  	<a href="#"  onclick="BrowserAutomationStudio_OpenUrl('https://fp.bablosoft.com'); return false;">
  		<span class="tr">Fingerprint switcher service</span></a>. 
  	<span class="tr">You can get a key there</span>. `}) %>
  
</div>



<div class="tooltipinternal">
      <div class="tr tooltip-paragraph-first-fold">This action will override any FingerprintSwitcher key for actions such as 'Get fingerprint' or 'Apply fingerprint'.</div>
	  <div class="tr tooltip-paragraph-fold">It may be convenient to call it when the thread starts. In that case key specified here will be used for any action which requires FingerprintSwitcher key.</div>
      <div class="tr tooltip-paragraph-fold">This action doesn't actually checks if key is valid or not. So even if you input incorrect key here, you won't get any error. Key will be checked only after getting or applying fingerprint for the first time.</div>
      <div class="tr tooltip-paragraph-fold">Empty value can be used here, in that case free version of FingerprintSwitcher will be used for this thread.</div>
      <div class="tr tooltip-paragraph-last-fold">You can disable the key override by using the 'Disable overriding key' action. In this case, the original behavior will be restored, and the original key values from actions such as 'Get fingerprint' or 'Apply fingerprint' will be used.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
