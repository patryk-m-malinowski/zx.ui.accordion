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

    this.__panelTabs = new Map();
    this.__tabListeners = new Map();
    this.__accordion = accordion;

    this.add(this.getQxObject("btnExpandAllNone"));

    const panelGroup = accordion.getChildControl("panelgroup");
    panelGroup.addListener("panelAdd", this._onPanelAdd, this);
    panelGroup.addListener("panelRemove", this._onPanelRemove, this);
    panelGroup.getChildren().forEach(panel => this._addTab(panel));
  },

  events: {
    /** Fired when expand all/none is fired */
    expandAllNone: "qx.event.type.Event"
  },

  properties: {
    /** Whether to include an expand all/none link after the tabs */
    showExpandAllNone: {
      init: true,
      nullable: false,
      check: "Boolean",
      event: "changeShowExpandAllNone",
      apply: "_applyShowExpandAllNone"
    },

    activePanel: {
      nullable: true,
      init: null,
      check: "zx.ui.accordion.AccordionPanel",
      event: "changeActivePanel",
      apply: "_applyActivePanel"
    }
  },

  objects: {
    btnExpandAllNone() {
      let btn = new qx.ui.form.Button(this.tr("Expand All/None")).set({
        appearance: "accordion-tab-button"
      });
      btn.addListener("tap", () => this.fireEvent("expandAllNone"));
      return btn;
    }
  },

  members: {
    /**@type {Map<string, zx.ui.accordion.minimap.MinicordionPanel>}*/
    __panelTabs: null,

    /**@type {Map<string, unknown>}*/
    __tabListeners: null,

    /**@type {zx.ui.accordion.Accordion}*/
    __accordion: null,

    _applyActivePanel(value, oldValue) {
      if (oldValue) {
        let oldActiveTab = this.__panelTabs.get(oldValue.toHashCode());
        if (oldActiveTab) {
          oldActiveTab?.removeState("active");
          oldActiveTab.getChildControl("label").removeState("active");
        }
      }
      if (value) {
        let newActiveTab = this.__panelTabs.get(value.toHashCode());
        newActiveTab?.addState("active");
        newActiveTab.getChildControl("label").addState("active");
      }
    },

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
      this._removeTab(e.getData());
    },

    /**
     * Apply for the `showExpandAllNone` property.
     */
    _applyShowExpandAllNone(value, oldValue) {
      this.getQxObject("btnExpandAllNone").setVisibility(value ? "visible" : "excluded");
    },

    /**
     * Adds a panel to the minimap.
     *
     * @param {zx.ui.accordion.AccordionPanel} panel The panel to add
     */
    _addTab(panel) {
      let panelHash = panel.toHashCode();
      if (this.__panelTabs.has(panelHash)) {
        this._removeTab(this.__panelTabs.get(panelHash));
      }
      let tab = new qx.ui.form.Button();
      panel.bind("label", tab, "label");
      tab.setAppearance("accordion-tab-button");
      this.addAt(tab, this.getChildren().length - 1);
      this.__tabListeners.set(
        panelHash,
        tab.addListener("tap", () => this.setActivePanel(panel))
      );
      this.__panelTabs.set(panelHash, tab);
    },

    /**
     * Removes a panel from the minimap.
     *
     * @param {zx.ui.accordion.AccordionPanel} panel The panel to remove
     */
    _removeTab(panel) {
      let panelHash = panel.toHashCode();
      if (this.__panelTabs.has(panelHash)) {
        let tab = this.__panelTabs.get(panelHash);
        this.__panelTabs.delete(panelHash);
        this.remove(tab);
        tab.removeListenerById(this.__tabListeners.get(panelHash));
        this.__tabListeners.delete(panelHash);
        tab.dispose();
      }
    }
  }
});
