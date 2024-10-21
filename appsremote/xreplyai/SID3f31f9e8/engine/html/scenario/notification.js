window.App.notification = (() => {
  return {
    show(title) {
      this.toggle(true, title);
    },

    hide(title) {
      this.toggle(false, title);
    },

    toggle(visible, title = null) {
      if (typeof title === 'string') {
        $('#notification').html(title);
      }
      $('#notification').toggle(visible);
      $('body').toggleClass('notification-shown', visible);
    },
  };
})();
