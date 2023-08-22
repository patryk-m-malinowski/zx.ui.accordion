/* ************************************************************************

   Copyright: 2023 ZenesisUK

   License: MIT license

   Authors: Will Johnson (WillsterJohnson)

************************************************************************ */

qx.Class.define("zx.ui.accordion.Accordion", {
  extend: qx.ui.core.Widget,
  include: [qx.ui.core.MRemoteChildrenHandling],

  /**
   * @param {boolean} minimap Should a minimap be displayed for this accordion.
   *   When left false, the minimap is never created and will not affect the
   *   application.
   */
  construct(minimap) {
    super();

    this._setLayout(new qx.ui.layout.Canvas());

    this._add(this.getChildControl("scroll"), { top: 0, left: 0, right: 0 });

    if (minimap) this.setMinimap(minimap);
  },

  properties: {
    appearance: {
      init: "accordion",
      refine: true
    },

    /**
     * Should a minimap be displayed for this accordion.
     *
     * When left false, the minimap is never created and will not affect the
     * application.
     */
    minimap: {
      check: "Boolean",
      nullable: false,
      event: "changeMinimap",
      apply: "_applyMinimap",
      themeable: true,
      init: false
    },

    /**
     * The percentage by which to scale the height of the minimap.
     *
     * Interpreted as `1` = 100%, `0.5` = 50%, &c.
     *
     * This is used as the seed value for the {@link #adjustedScaleFactor}
     * property. Changing its value may have unexpected results.
     */
    scaleFactor: {
      check: "Number",
      nullable: false,
      event: "changeScalefactor",
      init: 0.186
    },

    /**
     * The percentage by which to scale the height of the minimap.
     *
     * Interpreted as `1` = 100%, `0.5` = 50%, &c.
     *
     * ! In normal use, this is automatically updated by the accordion system.
     * ! Manual changes will be overwritten, and may not have the desired effect.
     */
    adjustedScaleFactor: {
      check: "Number",
      nullable: false,
      event: "changeAdjustedScalefactor",
      init: 0.186
    }
  },

  members: {
    /**
     * Apply for the minimap property.
     */
    _applyMinimap(value) {
      this.getChildControl("minimap").setVisibility(value ? "visible" : "excluded");
    },

    /**
     * @override
     */
    _createChildControlImpl(id) {
      switch (id) {
        case "panelgroup":
          return new zx.ui.accordion.AccordionPanelGroup();
        case "minimap":
          const control = new zx.ui.accordion.minimap.Minicordion(
            this.getChildControl("panelgroup")
          );
          this._add(control, { right: 40, top: 0 });

          // bind scale factor
          this.bind("adjustedScaleFactor", control, "scaleFactor");

          // handle clicks on the minimap
          control.addListener("panelTap", e => {
            // debugger;
            const top = this.getChildControl("scroll").getItemTop(e.getData());
            this.getChildControl("scroll").scrollToY(top);
          });

          // prevent infinite loop
          let busy = false;

          // minimap scroll listener
          control.getChildControl("floatybit").addListener("scrollToFraction", e => {
            busy = true;
            const scrollMax =
              this.getChildControl("panelgroup").getBounds().height -
              this.getChildControl("scroll").getBounds().height;
            this.getChildControl("scroll").scrollToY(Math.trunc(e.getData() * scrollMax));
            busy = false;
          });

          // main scroll listener
          this.getChildControl("scroll")
            .getChildControl("scrollbar-y")
            .addListener("scroll", e => {
              if (busy) return;
              const scrollMax =
                this.getChildControl("panelgroup").getBounds().height -
                this.getChildControl("scroll").getBounds().height;
              const scrollFraction = e.getData() / scrollMax;
              control.getChildControl("floatybit").scrollToFraction(scrollFraction);
            });

          // continuous height sync
          const heightApply = () => {
            control
              .getChildControl("floatybit")
              .setHeight(
                Math.trunc(
                  this.getChildControl("scroll").getBounds().height * this.getAdjustedScaleFactor()
                )
              );
          };

          this.addListener("changeAdjustedScalefactor", heightApply);
          this.getChildControl("panelgroup").addListener("resize", () => {
            const scalefactor = this.getScaleFactor();
            const minimapHeight = control.getChildControl("content").getBounds()?.height ?? 1;
            const scrollHeight = this.getChildControl("scroll").getBounds()?.height ?? 1;
            const adjusted = (this.getAdjustedScaleFactor() * scrollHeight) / minimapHeight;
            this.setAdjustedScaleFactor(Math.min(scalefactor, adjusted * 0.75));
            heightApply();
          });

          return control;
        case "scroll":
          return new qx.ui.container.Scroll(this.getChildControl("panelgroup"));
      }

      return super._createChildControlImpl(id);
    },

    /**
     * Returns the panel group. Necessary implementation for
     * {@link qx.ui.core.MRemoteChildrenHandling}.
     */
    getChildrenContainer() {
      return this.getChildControl("panelgroup");
    }
  }
});
