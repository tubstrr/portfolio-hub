# The Theme Folder

The hope for this folder is for our team to be able to develop a micro component
library, where we're able to use these across all our projects.

The criteria for a Theme Component is:

1. Is a component we basically recreate on every site
2. Solves for the functionality of that component
3. Is completely de-styled
4. Can be used and styled in the "Project" folder easily

## There are a few exemptions in this folder currently:

These components don't fit with the "Project" clone style, but are specific
reusable components. The idea for most of these is that they serve as a
'replacement' for native DOM elements, and are structured in a way that allows
us to enforce some basic optimization, and reduce a lot of the boiler plate
logic around these components.

**Please note:**\
If you need to modify these components for your project, make a clone of them in
the `/components/project` folder so that we can keep the `/components/theme`
folder the same across our projects. This folder will grow and expand over time,
but we should put a good amount of thought into what makes it into the `Theme`
folder.

- ThemeCheat
- ThemeContent
- ThemeHtml
- ThemeImage
- ThemeLink
- ThemeProtected
- ThemeStream
- ThemeVideo
