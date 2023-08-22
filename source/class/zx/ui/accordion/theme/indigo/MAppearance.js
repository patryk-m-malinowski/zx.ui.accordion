/* ************************************************************************

   Copyright: 2023 ZenesisUK

   License: MIT license

   Authors: Will Johnson (WillsterJohnson)

************************************************************************ */

qx.Theme.define("zx.ui.accordion.theme.indigo.MAppearance", {
  appearances: {
    /*
    ---------------------------------------------------------------------------
      ACCORDIAN
    ---------------------------------------------------------------------------
    */

    /**
     * Applied to the {@link zx.ui.accordion.Accordion}.
     */
    accordion: {
      style(states, styles) {
        console.log("accordion", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        return styles;
      }
    },

    /**
     * Applied to the scroll container used by the accordion.
     */
    "accordion/scroll": {
      include: "scrollarea",
      style(states, styles) {
        console.log("accordion/scroll", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        styles.height = 1000;
        return styles;
      }
    },
    "accordion/scroll/pane": {
      include: "scrollarea/pane",
      style(states, styles) {
        console.log("accordion/scroll/pane", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        return styles;
      }
    },
    "accordion/scroll/scrollbar-x": "scrollbar",
    "accordion/scroll/scrollbar-y": "scrollbar",

    /**
     * Applied to the {@link zx.ui.accordion.AccordionPanelGroup} used by the
     * {@link zx.ui.accordion.Accordion}.
     */
    "accordion/panelgroup": {
      style(states, styles) {
        console.log("accordion/panelgroup", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        styles.padding = [0, 10, 0, 0];
        return styles;
      }
    },

    /**
     * Applied to individual {@link zx.ui.accordion.AccordionPanel}s.
     */
    "accordion-panel": {
      style(states, styles) {
        console.log("accordion-panel", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        styles.backgroundColor = "background";
        return styles;
      }
    },

    /**
     * Applied to the composite container used by the
     * {@link zx.ui.accordion.AccordionPanel}.
     *
     * This is where any components added to the panel will be placed.
     */
    "accordion-panel/content": {
      style(states, styles) {
        console.log("accordion-panel/content", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        return styles;
      }
    },

    /**
     * Applied to the {@link zx.ui.accordion.AccordionHeader}.
     */
    "accordion-panel/header": {
      style(states, styles) {
        console.log("accordion-panel/header", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        styles.decorator = "accordion-panel-header";
        styles.padding = [8, 16];
        return styles;
      }
    },

    "accordion-panel/header/label": {
      style(states, styles) {
        console.log("accordion-panel/header/label", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        styles.font = "headline";
        return styles;
      }
    },

    "accordion-panel/header/icon": {
      style(states, styles) {
        console.log("accordion-panel/header/icon", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        styles.padding = [5, 0, 0, 0];
        return styles;
      }
    },

    /**
     * Applied to the {@link zx.ui.accordion.minimap.Minicordion} used by the
     * {@link zx.ui.accordion.Accordion}.
     */
    "accordion/minimap": {
      style(states, styles) {
        console.log("accordion/minimap", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        styles.backgroundColor = "#0000";
        styles.width = 60;
        styles.padding = [0, 0, 8, 0];
        return styles;
      }
    },

    /**
     * Applied to the composite container used by the
     * {@link zx.ui.accordion.minimap.Minicordion}.
     */
    "accordion/minimap/content": {
      style(states, styles) {
        console.log("accordion/minimap/content", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        styles.decorator = "accordion-minimap";
        styles.backgroundColor = "#0000";
        styles.margin = [0, 5];
        return styles;
      }
    },

    /**
     * Applied to the {@link zx.ui.accordion.minimap.FloatyBit} used by the
     * {@link zx.ui.accordion.minimap.Minicordion}.
     */
    "accordion/minimap/floatybit": {
      style(states, styles) {
        console.log("accordion/minimap/floatybit", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        styles.backgroundColor = "highlight";
        styles.opacity = 0.5;
        return styles;
      }
    },

    /**
     * Applied to individual {@link zx.ui.accordion.minimap.MinicordionPanel}s.
     */
    "accordion-minimap-panel": {
      include: "accordion-panel",
      style(states, styles) {
        console.log("accordion-minimap-panel", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        return styles;
      }
    },

    /**
     * Applied to the tooltip which appears while hovering over a
     * {@link zx.ui.accordion.minimap.MinicordionPanel}.
     */
    "accordion-minimap-panel/tooltip": {
      style(states, styles) {
        console.log("accordion-minimap-panel/tooltip", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        styles.decorator = "accordion-minimap-tooltip";
        styles.backgroundColor = "background";
        styles.padding = [5, 5, 0, 5];
        styles.margin = [5, 5, 5, 5];
        return styles;
      }
    },

    /**
     * Applied to the {@link zx.ui.accordion.minimap.MinicordionHeader} used by
     * the {@link zx.ui.accordion.minimap.Minicordion}.
     */
    "accordion-minimap-panel/header": {
      include: "accordion-panel/header",
      style(states, styles) {
        console.log("accordion-minimap-panel/header", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        styles.padding = [1, 4];
        styles.decorator = "accordion-minimap-panel-header";
        return styles;
      }
    },

    "accordion-minimap-panel/header/label": {
      include: "accordion-panel/header/label",
      style(states, styles) {
        console.log("accordion-minimap-panel/header/label", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        styles.font = "micro";
        return styles;
      }
    },

    /**
     * applied to {@link zx.ui.SkeletonText} instances used in the
     * {@link zx.ui.Accordion.minimap.Minicordion}.
     */
    "accordion-minimap-skeleton-text": {
      style(states, styles) {
        console.log("accordion-minimap-skeleton-text", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        return styles;
      }
    },

    /**
     * applied to lines of {@link zx.ui.SkeletonText} instances used in the
     * {@link zx.ui.Accordion.minimap.Minicordion}.
     */
    "accordion-minimap-skeleton-text-line": {
      style(states, styles) {
        console.log("accordion-minimap-skeleton-text-line", { states, styles });
        styles = qx.lang.Object.clone(styles ?? {}, true);
        styles.backgroundColor = "highlight";
        styles.height = 1;
        styles.margin = [1, 8, 0, 8];
        return styles;
      }
    }
  }
});
