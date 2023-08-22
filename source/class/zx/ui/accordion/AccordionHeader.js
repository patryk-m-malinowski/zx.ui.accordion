/* ************************************************************************

   Copyright: 2023 ZenesisUK

   License: MIT license

   Authors: Will Johnson (WillsterJohnson)

************************************************************************ */

/**
 * The header segment for an {@link zx.ui.accordion.AccordionPanel}
 */
qx.Class.define("zx.ui.accordion.AccordionHeader", {
  extend: qx.ui.container.Composite,

  /**
   * @param {string} [label] The label to display in the header.
   */
  construct(label) {
    super(new qx.ui.layout.Canvas());

    this.setLabel(label ?? "");

    this._add(this.getChildControl("label"), { left: 0, top: 0, bottom: 0 });
    this._add(this.getChildControl("icon"), { right: 0, top: 0, bottom: 0 });
  },

  properties: {
    /**
     * The label to display in the header.
     */
    label: {
      check: "String",
      nullable: false,
      event: "changeLabel",
      apply: "_applyLabel"
    },

    /**
     * The icon to display in the header.
     */
    icon: {
      check: "String",
      nullable: false,
      event: "changeIcon",
      apply: "_applyIcon",
      init: ""
    }
  },

  members: {
    /**
     * Apply for the label property.
     */
    _applyLabel(value) {
      this.getChildControl("label").setValue(value);
    },

    /**
     * Apply for the icon property.
     */
    _applyIcon(value) {
      this.getChildControl("icon").setSource(value);
    },

    /**
     * @override
     */
    _createChildControlImpl(id) {
      let control;
      switch (id) {
        case "label":
          control = new qx.ui.basic.Label(this.getLabel());
          return control;
        case "icon":
          control = new qx.ui.basic.Image(this.getIcon());
          return control;
      }

      return super._createChildControlImpl(id);
    }
  }
});
