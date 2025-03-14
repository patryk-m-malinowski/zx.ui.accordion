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
   * @param {boolean} tabs Should tabs be displayed for this accordion.
   */
  construct(minimap, tabs) {
    super();

    this._setLayout(new qx.ui.layout.Canvas());

    this._add(this.getChildControl("root"), { top: 0, left: 0, right: 0, bottom: 0 });

    if (minimap) {
      this.setMinimap(minimap);
    }
    if (tabs) {
      this.setTabs(tabs);
    }
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

    tabs: {
      check: "Boolean",
      nullable: false,
      event: "changeTabs",
      apply: "_applyTabs",
      themeable: true,
      init: false
    },

    /**
     * Whether to highlight the name of the currently active tab in the tabs list.
     *
     * Only effective when the `tabs` property is set to `true`.
     *
     * The tab which are highlighted are any tabs which match the following criteria:
     * - The tab is opened
     * - The tab's content is visible on screen
     * - The tab is the first tab from the top of the accordion which meets the above criteria
     */
    highlightActiveTab: {
      check: "Boolean",
      nullable: false,
      event: "changeHighlightActiveTab",
      apply: "_applyHighlightActiveTab",
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
     * Apply for the tabs property.
     */
    _applyTabs(value) {
      this.getChildControl("scrollTabs").setVisibility(value ? "visible" : "excluded");
      this.__updateActiveTabListener();
    },

    __highlightActiveTabListener: null,
    _applyHighlightActiveTab() {
      this.__updateActiveTabListener();
    },

    __updateActiveTabListener() {
      let doHighlight = this.getHighlightActiveTab();
      let doShowTabs = this.getTabs();
      let scrollbar = this.getChildControl("scroll").getChildControl("scrollbar-y");
      let tabs = this.getChildControl("tabs");

      if (this.__highlightActiveTabListener) {
        scrollbar.removeListenerById(this.__highlightActiveTabListener);
        tabs.setActivePanel(null);
      }

      if (!doShowTabs || !doHighlight) {
        return;
      }

      this.__highlightActiveTabListener = scrollbar.addListener(
        "scroll",
        this.__updateActiveTab,
        this
      );
      this.__updateActiveTab();
    },

    __updateActiveTab() {
      let tabs = this.getChildControl("tabs");
      let tabsLoc = tabs.getContentLocation();
      if (!tabsLoc) {
        return;
      }
      let tabsHeight = tabsLoc.bottom - tabsLoc.top;
      let thisLoc = this.getContentLocation();
      const pad = value => {
        let str = "      " + value.toString();
        return str.substring(str.length - 6);
      };
      let scrollY = this.getChildControl("scroll").getScrollY();
      // prettier-ignore
      console.log(`tabsHeight=${tabsHeight}, thisLoc.top=${thisLoc.top}, scrollY=${scrollY}, panels=${this.getChildren()
          .map(c => pad(c.getBounds().top))
          .join("")}`
      );
      for (let panel of this.getChildren()) {
        let top = panel.getBounds().top;
        if (top + tabsHeight >= scrollY) {
          tabs.setActivePanel(panel);
          break;
        }
      }
    },

    /**
     * @override
     */
    _createChildControlImpl(id) {
      let control;
      switch (id) {
        case "root":
          control = new qx.ui.container.Composite(new qx.ui.layout.VBox());
          control.add(this.getChildControl("scrollTabs"));
          control.add(this.getChildControl("scroll"), { flex: 1 });
          break;
        case "panelgroup":
          control = new zx.ui.accordion.AccordionPanelGroup();
          break;
        case "minimap":
          control = new zx.ui.accordion.minimap.Minicordion(this.getChildControl("panelgroup"));
          this._add(control, { right: 50, top: 50 });

          // bind scale factor
          this.bind("adjustedScaleFactor", control, "scaleFactor");

          // handle clicks on the minimap
          control.addListener("panelTap", e => this.scrollTo(e.getData()));

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

          // height sync
          let scrollHeight;
          const heightApply = e => {
            setTimeout(() => {
              if (!scrollHeight)
                scrollHeight = this.getChildControl("scroll").getBounds()?.height / 4;
              const scalefactor = this.getScaleFactor();
              const minimapHeight = control.getChildControl("content").getBounds()?.height ?? 1;
              const adjusted = (this.getAdjustedScaleFactor() * scrollHeight) / minimapHeight;
              this.setAdjustedScaleFactor(Math.min(scalefactor, adjusted));
              control
                .getChildControl("floatybit")
                .setHeight(Math.trunc(scrollHeight * 4 * this.getAdjustedScaleFactor()));
            }, 100);
          };
          this.getChildControl("panelgroup").addListener("resize", heightApply);
          control.addListener("panelTap", heightApply);
          break;

        case "scrollTabs":
          control = new qx.ui.container.Scroll(this.getChildControl("tabs"));
          break;

        case "tabs":
          control = new zx.ui.accordion.Tabs(this);
          control.addListener("changeActivePanel", e => {
            let panel = e.getData();
            if (panel) {
              panel.set({ panelOpen: true });
              this.scrollTo(panel);
            }
          });
          control.addListener("expandAllNone", e => {
            let panes = this.getChildren();
            let allOpen = panes.every(pane => pane.getPanelOpen());
            panes.forEach(pane => pane.setPanelOpen(!allOpen));
          });
          break;

        case "scroll":
          control = new qx.ui.container.Scroll(this.getChildControl("panelgroup"));
          break;
      }

      return control ?? super._createChildControlImpl(id);
    },

    scrollTo(widget) {
      const top = this.getChildControl("scroll").getItemTop(widget);
      this.getChildControl("scroll").scrollToY(top);
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
