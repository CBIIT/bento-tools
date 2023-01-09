# OverlayWindow

You can use this component to show a disclaimer to the user in the beginning of their session.

## Usage

This component accepts two properties:

- `body` - Body markup
- `header` - Header markup

Here's an example of how a Bento-based project can use this component:

```react
// OverlayWindow
import { OverlayWindow } from 'bento-components';

<>
  <CssBaseline />
  <HashRouter>
    <>
      <Notifications />
      <InActivityDialog />
      <Header />
      <OverlayWindow body="Your body text" header="Your header text" />
      <NavBar />
      ...
    </>
  </HashRouter>
  ...
</>
```

The `body` and `header` are markup, so you don't have to stick to mere text, like in the example above.
