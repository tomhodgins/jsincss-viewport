export default (selector, option, stylesheet) => {

  let styles = ''
  let count = 0

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

  document.querySelectorAll(selector).forEach(tag => {

    const attr = (selector+option).replace(/\W/g, '')

    if (features[option](tag)) {

      tag.setAttribute(`data-viewport-${attr}`, count)
      styles += stylesheet.replace(/:self|\$this/g, `[data-viewport-${attr}="${count}"]`)
      count++

    } else {

      tag.setAttribute(`data-viewport-${attr}`, '')

    }

  })

  return styles

}