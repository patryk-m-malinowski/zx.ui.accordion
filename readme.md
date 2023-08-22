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

Panels can be given icons to display when the panel is open or closed.

```js
panel.setButtonIconOpen(`...`);
panel.setButtonIconClosed(`...`);
```

Currently to set a default icon for all panels, you will have to extend the
`zx.ui.accordion.AccordionPanel` class. This will be changed to a better and
more effective solution in the near future.

### Theming

The accordion components have many themable widgets throughout the hierarchy.

The appearance tokens can be viewed in The `MAppearance.js` files under the
`source/class/zx/ui/accordion/theme/` folder. These files can also be used by
your application to effortlessly apply appearances to match your theme.

The currently supported themes are as follows. The `Theme.js` files listed
demonstrate including the provided mixins in your application theme.

- Indigo [`source/class/zx/demo/theme/indigo/Theme.js`](source/class/zx/demo/theme/indigo/Theme.js)
- Simple [`source/class/zx/demo/theme/simple/Theme.js`](source/class/zx/demo/theme/simple/Theme.js)
- Tangible [`source/class/zx/demo/theme/tangible/Theme.js`](source/class/zx/demo/theme/tangible/Theme.js)

for example, to include the Indigo appearances and decorations in your
app, you would ensure your theme contains the following:

```js
// theme/Appearance.js
qx.Theme.define("myapp.theme.Appearance", {
  extend: qx.theme.indigo.Appearance,
  include: [zx.ui.accordion.theme.indigo.MAppearance]
});

// theme/Decoration.js
qx.Theme.define("myapp.theme.Decoration", {
  extend: qx.theme.indigo.Decoration,
  include: [zx.ui.accordion.theme.indigo.MDecoration]
});

// theme/Font.js
qx.Theme.define("myapp.theme.Font", {
  extend: qx.theme.indigo.Font,
  include: [zx.ui.accordion.theme.MFont]
});

// theme/Theme.js
qx.Theme.define("myapp.theme.Theme", {
  meta: {
    color: myapp.theme.Color, // or qx.theme.indigo.Color, &c.
    decoration: myapp.theme.Decoration,
    font: myapp.theme.Font,
    icon: myapp.theme.Icon, // or qx.theme.icon.Tango, &c.
    appearance: myapp.theme.Appearance
  }
});
```
