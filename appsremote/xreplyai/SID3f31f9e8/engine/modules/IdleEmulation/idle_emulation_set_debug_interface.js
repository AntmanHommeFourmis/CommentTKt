<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({
		id: "enable",
		description: tr("Enable debug"),
		default_selector: "string",
		disable_int: true,
		value_string: "true",
		variants: [
			{value: "true", description: tr("Enable debug")},
			{value: "false", description: tr("Disable debug")}
		],
		help: {
			description: tr("Enable idle emulation module debug."),
			examples: [
				{code: "true", description: tr("Enable debug")},
				{code: "false", description: tr("Disable debug")}
			]
		}
	}) %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Enable or disable idle emulation debugging.</div>
	<div class="tr tooltip-paragraph-fold">If debug is enabled, then during idle emulation, detailed information about the status of its execution will be displayed in the log.</div>
	<div class="tr tooltip-paragraph-last-fold">Also, if debug is enabled, then in BAS recording mode, during idle emulation, in the browser will be displayed the found elements and the search radius.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
