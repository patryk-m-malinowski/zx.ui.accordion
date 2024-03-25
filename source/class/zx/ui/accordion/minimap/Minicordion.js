/* ************************************************************************

   Copyright: 2023 ZenesisUK

   License: MIT license

   Authors: Will Johnson (WillsterJohnson)

************************************************************************ */

/**
 * A minimap for large {@link zx.ui.accordion.Accordion}s.
 */
qx.Class.define("zx.ui.accordion.minimap.Minicordion", {
  extend: qx.ui.core.Widget,

  /**
   * @param {zx.ui.accordion.AccordionPanelGroup} accordion The accordion to mirror
   */
  construct(accordion) {
    super();
    this._setLayout(new qx.ui.layout.Canvas());
    this.getChildControl("content");
    this.getChildControl("floatybit");

    this.__panels = new Map();
    this.__listeners = new Map();

    accordion.addListener("panelAdd", this._onPanelAdd, this);
    accordion.addListener("panelRemove", this._onPanelRemove, this);
    accordion.getChildren().forEach(panel => this._addPanel(panel));
  },

  properties: {
    /**
     * The percentage by which to scale the height of the minimap.
     *
     * Interpreted as `1` = 100%, `0.5` = 50%, &c.
     *
     * ! In normal use, this is automatically updated by the accordion system.
     * ! Manual changes will be overwritten, and may not have the desired effect.
     */
    scaleFactor: {
      check: "Number",
      nullable: false,
      event: "changeScalefactor",
      apply: "_applyScaleFactor",
      init: 0.186
    }
  },

  events: {
    /**
     * Fired when a panel is tapped.
     */
    panelTap: "qx.event.type.Data"
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
     * Apply for the scaleFactor property.
     */
    _applyScaleFactor(value) {
      if (value) this.__panels.forEach(panel => panel.setScaleFactor(value));
    },

    /**
     * Adds a panel to the minimap when it is added to the accordion.
     */
    _onPanelAdd(e) {
      this._addPanel(e.getData());
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
    _addPanel(panel) {
      const panelHash = panel.toHashCode();
      if (this.__panels.has(panelHash)) this._removePanel(this.__panels.get(panelHash));
      const minicordionPanel = new zx.ui.accordion.minimap.MinicordionPanel(panel);
      minicordionPanel.setScaleFactor(this.getScaleFactor());
      this.getChildControl("content")._add(minicordionPanel);
      this.__listeners.set(
        panelHash,
        minicordionPanel.addListener("tap", () => this.fireDataEvent("panelTap", panel))
      );
      this.__panels.set(panelHash, minicordionPanel);
    },

    /**
     * Removes a panel from the minimap.
     *
     * @param {zx.ui.accordion.AccordionPanel} panel The panel to remove
     */
    _removePanel(panel) {
      const panelHash = panel.toHashCode();
      if (this.__panels.has(panelHash)) {
        this.getChildControl("content")._remove(this.__panels.get(panelHash));
        this.__panels.get(panelHash).removeListener(this.__listeners.get(panelHash));
        this.__panels.get(panelHash).dispose();
        this.__panels.delete(panelHash);
        this.__listeners.delete(panelHash);
      }
    },

    /**
     * @override
     */
    _createChildControlImpl(id) {
      let control;
      switch (id) {
        case "content":
          control = new qx.ui.container.Composite(new qx.ui.layout.VBox());
          this._add(control, { left: 0, right: 0, top: 0, bottom: 0 });
          break;
        case "floatybit":
          control = new zx.ui.accordion.minimap.FloatyBit();
          this._add(control, { left: 0, right: 0, top: 0 });
          this.addListener("roll", control.onWheelRoll, control);
          break;
      }

      return control ?? super._createChildControlImpl(id);
    }
  }
});
