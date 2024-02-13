# Preact Lazy SSR Wouter Demo

Look into [`src/index.jsx`](./src/index.jsx) to take a look at how we set up routing & SSR. You can then run the `build` script to prerender the app.

This is built on `@preact/preset-vite`'s prerendering functionality simply because it was quick for me to set up -- all it does is call the exported `prerender` function, passing in data like the current URL, and expects HTML back. Just a very quick example for how you might set up a real app using these techniques but you absolutely can rip it out and use it in any way you'd like.
