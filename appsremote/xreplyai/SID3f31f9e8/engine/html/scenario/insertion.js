window.App.insertion = (() => {
  let timer = 0;

  const state = {
    manual: false,
    helper: false,
    toolbox: false,
    dragging: false,
    clipboard: false,
    httpRecord: false,
    manualControl: false,
  };

  const isScrollAtBottom = () => {
    const totalPageHeight = document.documentElement.scrollHeight;
    const scrollPosition = document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const tolerance = 20;
    return (scrollPosition + viewportHeight + tolerance) >= totalPageHeight;
  }

  let isPreventingScroll = false

  const preventScroll = () => {
    if(!isPreventingScroll)
      return
    window.scrollTo({ top: Number.MAX_SAFE_INTEGER/*, behavior: 'smooth'*/ });
    requestAnimationFrame(preventScroll);
  }

  const startPreventScroll = () => {
    isPreventingScroll = true
    preventScroll()
  }

  const stopPreventScroll = () => {
    isPreventingScroll = false
  }


  const insertion = {
    toggle(reason, visible, animate = true) {
      if (App.settings.theme === 'modern') {
        let isBottom = isScrollAtBottom()
        if (visible == null) visible = !state[reason];
        if (_.has(state, reason)) state[reason] = visible;
        this.trigger('change', ({ state, reason, visible }));
        if (reason !== 'manual' && state['manual']) return false;
        if (visible === document.body.classList.contains('modern-insert')) {
          if (Object.keys(state).every((key) => key === reason || !state[key])) {
            let targets = [];

            if (animate) {
              if(isBottom) {
                startPreventScroll()
              }
              clearTimeout(timer);
              targets = findTargets();
              document.body.classList.add('animate-insert');
              targets.forEach((target) => target.classList.add('animate'));
            }

            if (visible) {
              document.body.classList.remove('modern-insert');
            } else {
              document.body.classList.add('modern-insert');
            }

            if (animate) {
              timer = setTimeout(() => {
                requestAnimationFrame(() => {
                  _VisualizeLabels.Visualize().then(() => {
                    stopPreventScroll()
                    document.body.classList.remove('animate-insert');
                    targets.forEach((target) => target.classList.remove('animate'));
                  });
                });
              }, 400);
            }

            return true;
          }
        }
      }

      return false;
    },
  };

  const findTargets = () => {
    let target = document.elementsFromPoint(20, 0).find((node) => node.classList.contains('tool-margin'));
    if (!target) target = document.querySelector('.tool-margin');
    const elements = [target];

    while ((target = target.nextElementSibling) && target.classList.contains('tool-margin')) {
      const rect = target.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        elements.push(target);
      } else {
        break;
      }
    }

    return elements;
  };

  return _.extend(insertion, Backbone.Events);
})();
