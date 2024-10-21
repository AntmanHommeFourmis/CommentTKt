<div class="container-fluid"></div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Disable idle emulation previously enabled by "Enable automatic idle emulation" action.</div>
	<div class="tr tooltip-paragraph-fold">All actions which will be executed after this one won't use idle emulation. The only exception is if idle emulation is set inside specific action settings or if "Enable automatic idle emulation" will be called again.</div>
	<div class="tr tooltip-paragraph-last-fold">This action will also reset all other emulation settings previously set using the "<a href="#!/IdleEmulationSetGeneralSettings">Enable automatic idle emulation</a>" action.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
