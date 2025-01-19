# Svg

This is a simple utility to shift `SVG` usage in our components. Often time's we
will want to have an `SVG` inside our component, and we'll want to animate it.
An example would be an accordion block with a Chevron that points Down, then
when the accordion opens it rotates to point up.

Traditionally, we'd just dump the `SVG` in the accordion header, and then
animate it. The issue is that we'd then need to copy the same `SVG` into every
instance we need it again, and it makes our `<template>` files look like hot
garbage.

Now we can just call `<Svg type="<SVG_NAME>" />` and this component will pull in
the `SVG` directly into the markup as if you'd copied and pasted it there.

## How does this work?

Each of the `.vue` files inside `/theme/svg/svgs` are made globally available
through the `nuxt.config` file, and should only contain a
`<template><SVG></SVG></template>` structure.

We should also manually override any colors set in the `.SVG` to
`"currentColor"`; that way we can change the `SVG` color in `CSS` rather then
having to drill down into each `SVG > path, SVG > rect` and over riding the fill
and stroke colors.

The `<Svg/>` component resolves the `/theme/svg/index.vue` file, which basically
just has a `<component :is="type"/>` in it. Which looks at the globally
available `SVG's` and then renders that into the template.
