/* ************************************************************************

   Copyright: 2024 ZenesisUK

   License: MIT license

   Authors: Will Johnson (WillsterJohnson)

************************************************************************ */

/**
 * Tabs for large {@link zx.ui.accordion.Accordion}s.
 */
qx.Class.define("zx.ui.accordion.Tabs", {
  extend: qx.ui.container.Composite,

  /**
   * @param {zx.ui.accordion.Accordion} accordion The accordion to provide tabs for
   */
  construct(accordion) {
    super(new qx.ui.layout.HBox());

    this.__panels = new Map();
    this.__listeners = new Map();

    const panelGroup = accordion.getChildControl("panelgroup");
    panelGroup.addListener("panelAdd", this._onPanelAdd, this);
    panelGroup.addListener("panelRemove", this._onPanelRemove, this);
    panelGroup.getChildren().forEach(panel => this._addTab(panel));
  },

  events: {
    /**
     * Fired when a tab is tapped.
     */
    tabTap: "qx.event.type.Data"
  },

  members: {
    /**
     * @type {Map<string, zx.ui.accordion.minimap.MinicordionPanel>}
     */
    __panels: null,
    /**
     * @type {Map<string, unknown>}
     */
    __listeners: null,

    /**
     * Adds a panel to the minimap when it is added to the accordion.
     */
    _onPanelAdd(e) {
      this._addTab(e.getData());
    },

    /**
     * Removes a panel from the minimap when it is removed from the accordion.
     */
    _onPanelRemove(e) {
      this._removePanel(e.getData());
    },

    /**
     * Adds a panel to the minimap.
     *
     * @param {zx.ui.accordion.AccordionPanel} panel The panel to add
     */
    _addTab(panel) {
      const panelHash = panel.toHashCode();
      if (this.__panels.has(panelHash)) {
        this._removePanel(this.__panels.get(panelHash));
      }
      const tab = new qx.ui.form.Button();
      panel.bind("label", tab, "label");
      tab.setAppearance("accordion-tab-button");
      this.add(tab);
      this.__listeners.set(
        panelHash,
        tab.addListener("tap", () => this.fireDataEvent("tabTap", panel))
      );
      this.__panels.set(panelHash, tab);
    },

    /**
     * Removes a panel from the minimap.
     *
     * @param {zx.ui.accordion.AccordionPanel} panel The panel to remove
     */
    _removePanel(panel) {
      const panelHash = panel.toHashCode();
      if (this.__panels.has(panelHash)) {
        this.remove(this.__panels.get(panelHash));
        this.__panels.get(panelHash).removeListener(this.__listeners.get(panelHash));
        this.__panels.get(panelHash).dispose();
        this.__panels.delete(panelHash);
        this.__listeners.delete(panelHash);
      }
    }
  }
});
