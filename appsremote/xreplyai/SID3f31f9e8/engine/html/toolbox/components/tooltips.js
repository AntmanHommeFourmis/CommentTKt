(function (window, $) {
  function destroyTooltipsOnRoute(route) {
    if (route !== _Router.routes[Backbone.history.getFragment()]) {
      $('[data-toggle="tooltip"]').tooltip('destroy');
      $(window).off('resize', closeTooltipOnResize);
    }
  };

  function destroyPopupsOnRoute(route) {
    if (route !== _Router.routes[Backbone.history.getFragment()]) {
      $('[data-toggle="popup"]').tooltip('destroy');
      $(window).off('resize', closePopupOnResize);
    }
  };

  function closeTooltipOnClick(event) {
    const $el = $(event.target);
    if ($el.closest(`.help-tooltip, .help-open`).length) return;
    hideVisibleTooltips(null, 'tooltip');
  };

  function closePopupOnClick(event) {
    const $el = $(event.target);
    if ($el.closest(`.help-popup`).length/* || $el.closest('.help-open').length*/) return;
    hideVisibleTooltips(null, 'popup');
  };

  function closeTooltipOnResize(event) {
    hideVisibleTooltips(null, 'tooltip');
  };

  function closePopupOnResize(event) {
    hideVisibleTooltips(null, 'popup');
  };

  window.Toolbox.setupTooltips = function () {
    const template = _.template(/*html*/`
      <div class="help-<%= type %> <%= (typeof(additionalType) === 'string') ? 'help-' + type + '-' + additionalType : '' %>" role="tooltip">
        <% if (type === 'tooltip') { %><div class="arrow"></div><% } %>
        <div class="tooltip-inner"></div>
      </div>
    `);

    $('[data-toggle="tooltip"]').tooltip({trigger:'hover', placement: function (tip, element) {
        var forcedPlacement = $(element).attr("data-placement")
        if(typeof(forcedPlacement) == "string" && forcedPlacement.length > 0)
        {
            return forcedPlacement
        }
        var offset = $(element).offset();
        height = $(document).outerHeight();
        width = $(document).outerWidth();
        vert = 0.5 * height - offset.top;
        vertPlacement = vert > 0 ? 'bottom' : 'top';
        horiz = 0.5 * width - offset.left;
        horizPlacement = horiz > 0 ? 'right' : 'left';
        placement = Math.abs(horiz) > Math.abs(vert) ?  horizPlacement : vertPlacement;
        return placement;
    }, template:'<div class="mytooltip" role="tooltip"><div class="mytooltip-arrow tooltip-arrow"></div><div class="mytooltip-inner tooltip-inner"></div></div>',delay: { "show": 500, "hide": 100 }})


    const $popups = $('[data-toggle="popup"]');
    if ($popups.length) {
      $popups.each(function () {
        const $el = $(this), data = $el.data();
        const popupTemplate = template({ type: 'popup', additionalType: data.additionalType  });
        $el.tooltip({
          placement: (_, el) => detectPlacement($el, getVerticalPlacement)($(el)),
          container: data.container || false,
          delay: { show: 500, hide: 200 },
          template: popupTemplate,
          trigger: 'manual',
        });
      });
      _Router.off('route', destroyPopupsOnRoute).on('route', destroyPopupsOnRoute);
      setupAutoPin($popups, 'popup');
    }

  }

  function detectPlacement($element, defaultPlacement) {
    const placement = $element.data('placement');
    if (!placement) return defaultPlacement;
    if (placement === 'horizontal') return getHorizontalPlacement;
    if (placement === 'vertical') return getVerticalPlacement;
    if (placement === 'auto') return getSuitablePlacement;
    return placement;
  }

  function getHorizontalPlacement($element) {
    const left = $element.offset().left - $(window).scrollLeft();
    const right = $(window).outerWidth() - left - $element.outerWidth();
    return right > left ? 'right' : 'left';
  }

  function getVerticalPlacement($element) {
    const top = $element.offset().top - $(window).scrollTop();
    const bottom = $(window).outerHeight() - top - $element.outerHeight();
    return bottom > top ? 'bottom' : 'top';
  }

  function getSuitablePlacement($element) {
    const { left, top } = $element.offset();

    const hOffset = $(document).outerWidth() * 0.5 - left;
    const horizontal = hOffset > 0 ? 'right' : 'left';

    const vOffset = $(document).outerHeight() * 0.5 - top;
    const vertical = vOffset > 0 ? 'bottom' : 'top';

    return Math.abs(hOffset) >= Math.abs(vOffset) ? horizontal : vertical;
  }

  function testIfSomethingIsPinned($elements)
  {
    for(let $el of $elements.toArray())
    {
      if($($el).data('pinned'))
        return true
    }
    return false
  }

  function setupAutoPin($elements, type) {
    $elements.each(function () {
      if (type === 'popup' || $(this).data('pin')) {
        $(this).off().on({
          'hide.bs.tooltip': function () {
            if (type === 'tooltip') return;
            $(this).parent().parent().removeClass('help-open');
          },
          'show.bs.tooltip': function () {
            if (type === 'tooltip') return;
            $(this).parent().parent().addClass('help-open');
          },
          mouseenter: function (event) {
            if(testIfSomethingIsPinned($elements))
            {
              event.preventDefault();
              return
            }
            hideVisibleTooltips(this);
            const $el = $(this); event.preventDefault();
            if (!$el.data('pinned')) $el.tooltip('show');
          },
          mouseleave: function (event) {
            if(testIfSomethingIsPinned($elements))
            {
              event.preventDefault();
              return
            }
            hideVisibleTooltips(this);
            const $el = $(this); event.preventDefault();
            if (!$el.data('pinned')) $el.tooltip('hide');
          },
          mousemove: function (event) {
            if(testIfSomethingIsPinned($elements))
            {
              event.preventDefault();
              return
            }
            const $el = $(this); event.preventDefault();
            const $tip = $el.data('bs.tooltip').tip();
            if ($tip.is(':hidden')) $el.tooltip('show');
          },
          click: function (event) {
            hideVisibleTooltips(this);
            const $el = $(this);
            const $tip = $el.data('bs.tooltip').tip();
            if ($tip.is(':hidden')) $el.tooltip('show');
            event.preventDefault();
            event.stopPropagation();
            const data = $(this).data();
            $(this).data('pinned', !data.pinned);
          }
        });
      }
    });

    const closeHandler = type === 'tooltip' ? closeTooltipOnClick : closePopupOnClick;
    $(document).off('click', `:not([data-toggle="${type}"])`, closeHandler);
    $(document).on('click', `:not([data-toggle="${type}"])`, closeHandler);
  }

  function hideVisibleTooltips(exclude, allowedType) {
    const selector = allowedType ? `[data-toggle="${allowedType}"]` : '[data-toggle="tooltip"], [data-toggle="popup"]';
  
    $(selector).not(exclude).each(function () {
      const tooltipData = $(this).data('bs.tooltip');
      if (tooltipData && window.getComputedStyle(tooltipData.tip()[0]).display === 'block') {
        $(this).tooltip('hide').data('pinned', false);
      }
    });
  }
})(window, jQuery);