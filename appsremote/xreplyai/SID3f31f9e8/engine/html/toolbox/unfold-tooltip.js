function InitUnfoldTooltip() {
	const $firstFold = $('.tooltip-paragraph-first-fold');
	const $lastFold = $('.tooltip-paragraph-last-fold');
	const $fold = $('.tooltip-paragraph-fold');
	const $tooltip = $firstFold.parent();
  
	if ($firstFold.length > 0 && $lastFold.length > 0) {
	  $(`<a href="#" class="tooltip-toggle-btn tooltip-more-btn">${tr('+ More')}</a>`).on('click', function (e) {
		e.preventDefault();
		$('.tooltip-paragraph-first-fold').removeClass('tooltip-paragraph-first-fold').addClass('tooltip-paragraph-first-unfold');
		$('.tooltip-paragraph-last-fold').removeClass('tooltip-paragraph-last-fold').addClass('tooltip-paragraph-last-unfold');
		$('.tooltip-paragraph-fold').removeClass('tooltip-paragraph-fold').addClass('tooltip-paragraph-unfold');
  
		$(this).hide().siblings('.tooltip-less-btn').show();
		$tooltip.toggleClass('tooltip-open');
	  }).appendTo($tooltip).show();
  
	  $(`<a href="#" class="tooltip-toggle-btn tooltip-less-btn">${tr('- Less')}</a>`).on('click', function (e) {
		e.preventDefault();
		$('.tooltip-paragraph-first-unfold').removeClass('tooltip-paragraph-first-unfold').addClass('tooltip-paragraph-first-fold');
		$('.tooltip-paragraph-last-unfold').removeClass('tooltip-paragraph-last-unfold').addClass('tooltip-paragraph-last-fold');
		$('.tooltip-paragraph-unfold').removeClass('tooltip-paragraph-unfold').addClass('tooltip-paragraph-fold');
  
		$(this).hide().siblings('.tooltip-more-btn').show();
		$tooltip.toggleClass('tooltip-open');
	  }).appendTo($tooltip).hide();
	}
  }