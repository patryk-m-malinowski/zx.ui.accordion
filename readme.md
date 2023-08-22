# zx.ui.accordion

Accordion component set for Qooxdoo

## Demo

[The demo application](https://zenesisuk.github.io/zx.ui.accordion.zenesisuk.github.io/) provides an
example of how to use the accordion components.

## Features

- Collapsible panels (collapsed by default)
- Minimap of all panels (tooltips show panel titles)
- Scroll accordion using the minimap
- Jump to a panel using the minimap
- Minimap scaling to remain within the available height (WIP: may have edge cases)

## Usage

Using the accordion is quite simple.

```js
// `main()` of `myapp.Application`

// passing `true` enables the minimap, this can instead be set later with `accordion.setMinimap(<boolean>)`
const accordion = new zx.ui.accordion.Accordion(true);

const panel = new zx.ui.accordion.AccordionPanel(`My Panel Title`);

panel.setLayout(new qx.ui.layout.VBox(0)); // this is the default

panel.add(myContentWidget1);
panel.add(myContentWidget2);
// add content to panel...

accordion.add(panel);

const panel2 = // create more panels...
accordion.add(panel2);

const doc = this.getRoot();
doc.add(accordion);
```

1. Create a `zx.ui.accordion.Accordion`
2. Create a `zx.ui.accordion.AccordionPanel`
3. Set the layout of the panel (optional)
4. Add content to the panel (optional, recommended)
5. Add the panel to the accordion
6. Repeat 2-5 as desired
7. Add the accordion to the document
8. Done

### Lone Panels

Panels are able to function in isolation, without an accordion. This may be
useful for a variety of situations.

```js
// `main()` of `myapp.Application`

const panel = new zx.ui.accordion.AccordionPanel(`My Panel Title`);

panel.add(myContentWidget);

const doc = this.getRoot();
doc.add(panel);
```

### Open & Closed Icons

The open and closed icons used by the accordion panel headers can be set in your
theme's appearances. The `open` state will be `true` if the panel is expanded,
otherwise it will be unset.

```js
// myapp/theme/Appearance.js
    // ...
    "accordion-panel/header/icon": {
      style(states) {
        return {
          source: states.open ? "@MaterialIcons/expand_less/32" : "@MaterialIcons/expand_more/32"
        };
      }
    },
    // ...
```

### Theming

The accordion components have many themable widgets throughout the hierarchy.

The appearance tokens can be viewed in The [`source/class/zx/ui/accordion/theme/MAppearance.js` file](source/class/zx/ui/accordion/theme/MAppearance.js).
These mixins can also be used by your application to effortlessly apply
styles to match your theme.

The currently supported themes are as follows. The `*/Theme.js` files listed
demonstrate including the provided mixins in your application theme.

- Indigo [`source/class/zx/demo/theme/indigo/Theme.js`](source/class/zx/demo/theme/indigo/Theme.js)
- Simple [`source/class/zx/demo/theme/simple/Theme.js`](source/class/zx/demo/theme/simple/Theme.js)
- Tangible [`source/class/zx/demo/theme/tangible/Theme.js`](source/class/zx/demo/theme/tangible/Theme.js)

for example, to include the Tangible appearances and decorations in your app,
you would ensure your theme contains the following:

```js
// myapp/theme/Appearance.js
qx.Theme.define("myapp.theme.Appearance", {
  extend: qx.theme.indigo.Appearance,
  include: [zx.ui.accordion.theme.tangible.MAppearance]
});

// myapp/theme/Color.js
qx.Theme.define("myapp.theme.Color", {
  extend: qx.theme.tangible.ColorLight, // or *.ColorDark - both work
  include: [zx.ui.accordion.theme.tangible.MColor]
});

// myapp/theme/Decoration.js
qx.Theme.define("myapp.theme.Decoration", {
  extend: qx.theme.indigo.Decoration,
  include: [zx.ui.accordion.theme.tangible.MDecoration]
});

// myapp/theme/Font.js
qx.Theme.define("myapp.theme.Font", {
  extend: qx.theme.indigo.Font,
  include: [zx.ui.accordion.theme.MFont]
});

// myapp/theme/Theme.js
qx.Theme.define("myapp.theme.Theme", {
  meta: {
    appearance: myapp.theme.Appearance,
    color: myapp.theme.Color,
    decoration: myapp.theme.Decoration,
    font: myapp.theme.Font,
    icon: myapp.theme.Icon // or qx.theme.icon.Tango, &c.
  }
});
```

Other themes may entirely use the mixins at `zx.ui.accordion.theme.M*` instead
of declaring their own if they are similar enough.
