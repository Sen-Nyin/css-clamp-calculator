# Clampy

Calculate CSS Clamps for optimal element scaling

## What is Clamp?

Clamp is a CSS function that allows you to pass in 3 values:

- The minimum size of the element
- The maximum size of the element
- The rate at which you want the element to scale between those values

This can then be set against various CSS selectors:

```css
.header {
  font-size: clamp(2rem, <scale>, 6rem);
  padding: clamp(0.5rem, <scale>, 1rem);
}
```

## What does this tool do then?

The chances are that you'll be using clamp to add responsiveness to your html elements to reduce the number of media queries needed. You'll therefore want your clamp to scale according to the current viewport.

This tool takes your minimum and maximum view ports that you want the element to scale between. It then uses your data to imagine they're plotted on a linear chart. It then works out the slope of the plotted line and calculates the point at which it intersects the Y axis.

This calculation results in the perfect rate of scaling between your chosen viewports and element sizes so that the visual scaling process is smooth for the user.
