(function (window) {
  const SettingsPageView = Backbone.View.extend({
    template: _.template(/*html*/ `
      <div class="scenario-page-header">
        <h1><%= tr('Scenario panel settings') %></h1>
        <h2><%= tr('On this page you can change the settings of the scenario panel interface.') %></h2>
        <h2><%= tr('The project can be restarted when the theme and other options are changed.') %></h2>
      </div>
      <div class="scenario-page-panel">
        <div class="scenario-page-group" data-id="scenarioTheme">
          <label for="scenarioTheme"><%= tr('Theme') %>:</label>
          <select data-style="scenario-page-select" id="scenarioTheme">
            <option class="scenario-page-select-option" value="modern" <%= theme === 'modern' ? 'selected="selected"' : '' %>><%= tr('Modern') %></option>
            <option class="scenario-page-select-option" value="classic" <%= theme === 'classic' ? 'selected="selected"' : '' %>><%= tr('Classic') %></option>
          </select>
        </div>
        <div class="scenario-page-group" data-id="scenarioInsertionSize" style="display: <%= theme === 'modern' ? 'block' : 'none' %>;">
          <label for="scenarioInsertionSize"><%= tr('Insertion places size') %>:</label>
          <select data-style="scenario-page-select" id="scenarioInsertionSize">
            <option class="scenario-page-select-option" value="large" <%= insertion.size === 'large' ? 'selected="selected"' : '' %>><%= tr('Large') %></option>
            <option class="scenario-page-select-option" value="small" <%= insertion.size === 'small' ? 'selected="selected"' : '' %>><%= tr('Small') %></option>
          </select>
          <div class="scenario-page-notify">
            <div class="scenario-page-notify-text"><%= tr('Insertion places are <b>hidden</b> by default for the new theme, you can toggle the visibility using the <b>F12</b> key or the context menu item (RMB).') %></div>
          </div>
        </div>
      </div>
      <div class="scenario-page-footer settings-page-footer">
        <button type="button" class="btn-base btn-accept"><%= tr('OK') %></button>
        <button type="button" class="btn-base btn-cancel"><%= tr('Cancel') %></button>
        <button type="button" class="btn-base btn-action"><%= tr('Default') %></button>
      </div>
    `),

    className: 'scenario-page',

    render() {
      if (!this.$el.is(':empty')) return this;
      const settings = { ...DEFAULT_SETTINGS, ...window.App.settings };
      this.$el.html(this.template(settings)).appendTo('body');
      this.$('#scenarioInsertionSize').selectpicker();
      this.$('#scenarioTheme').selectpicker();
      return this;
    },

    reset() {
      this.$('#scenarioInsertionSize').selectpicker(
        'val',
        /* trigger */
        DEFAULT_SETTINGS.insertion.size
      );
      this.$('#scenarioTheme').selectpicker(
        'val',
        /* trigger */
        DEFAULT_SETTINGS.theme
      );
    },

    save() {
      window.App.trigger('change:settings', {
        insertion: {
          size: this.$('#scenarioInsertionSize').val(),
          visible: App.settings.insertion.visible,
        },
        theme: this.$('#scenarioTheme').val(),
      });
      this.hide();
    },

    show() {
      if (!this.$el.is(':visible')) {
        $('body, html').toggleClass('overflow-hidden');
        this.render().$el.show();
      }
      return this;
    },

    hide() {
      if (!this.$el.is(':hidden')) {
        $('body, html').toggleClass('overflow-hidden');
        this.render().$el.hide();
      }
      return this;
    },

    events: {
      'changed.bs.select #scenarioTheme'({ target }) {
        this.$('[data-id="scenarioInsertionSize"]').toggle(
          this.$(target).selectpicker('val') === 'modern' /* prettier-ignore */
        );
      },

      'click .btn-action': 'reset',

      'click .btn-accept': 'save',

      'click .btn-cancel': 'hide',
    },
  });

  const DEFAULT_SETTINGS = {
    insertion: {
      size: 'small',
    },
    theme: 'modern',
  };

  window.App.SettingsPage = SettingsPageView;
})(window);
