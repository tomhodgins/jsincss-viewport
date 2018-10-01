function viewport(selector, option, stylesheet) {

  const features = {
    partly: tag => {
      return tag.offsetTop - innerHeight < scrollY
        && tag.offsetTop - innerHeight + tag.offsetHeight < scrollY + tag.offsetHeight
        && scrollY < tag.offsetTop + tag.offsetHeight
    },
    fully: tag => {
      return tag.offsetTop - innerHeight < scrollY
        && tag.offsetTop - innerHeight + tag.offsetHeight < scrollY
        && scrollY < tag.offsetTop
    }
  }

  return Array.from(document.querySelectorAll(selector))

    .reduce((styles, tag, count) => {

      const attr = (selector + option).replace(/\W/g, '')

      if (features[option](tag)) {

        tag.setAttribute(`data-viewport-${attr}`, count)
        styles += stylesheet.replace(
          /:self|\$this|\[--self\]/g,
          `[data-viewport-${attr}="${count}"]`
        )
  
      } else {

        tag.setAttribute(`data-viewport-${attr}`, '')

      }

      return styles

    }, '')

}
