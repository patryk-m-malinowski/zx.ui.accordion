# zx.ui.accordion

Accordion component set for Qooxdoo

## Usage

[The demo application](source/class/zx/demo/Application.js) provides an example
of how to use the accordion components.

Using the accordion is quite simple.

```js
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
