/* ************************************************************************

   Copyright: 2023 ZenesisUK

   License: MIT license

   Authors: Will Johnson (WillsterJohnson)

************************************************************************ */

qx.Theme.define("zx.ui.accordion.theme.tangible.MDecoration", {
  extend: zx.ui.accordion.theme.MDecoration,

  decorations: {
    /*
      ---------------------------------------------------------------------------
        ACCORDION
      ---------------------------------------------------------------------------
    */

    "accordion-panel-header": {
      include: "box",
      style: {
        width: [0, 0, 1, 0],
        color: "primary"
      }
    }
  }
});
