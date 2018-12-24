function viewport(selector, option, stylesheet) {
  const attr = (selector + option).replace(/\W/g, '')
  const features = {
    partly: tag =>
      tag.offsetTop - innerHeight < scrollY
      && tag.offsetTop - innerHeight + tag.offsetHeight < scrollY + tag.offsetHeight
      && scrollY < tag.offsetTop + tag.offsetHeight,
    fully: tag =>
      tag.offsetTop - innerHeight < scrollY
      && tag.offsetTop - innerHeight + tag.offsetHeight < scrollY
      && scrollY < tag.offsetTop
  }
  const result = Array.from(document.querySelectorAll(selector))
    .reduce((output, tag, count) => {
      if (features[option](tag)) {
        output.add.push({tag: tag, count: count})
        output.styles.push(
          stylesheet.replace(
            /:self|\$this|\[--self\]/g,
            `[data-viewport-${attr}="${count}"]`
          )
        )
      } else {
        output.remove.push(tag)
      }
      return output
    }, {add: [], remove: [], styles: []})
  result.add.forEach(tag => tag.tag.setAttribute(`data-viewport-${attr}`, tag.count))
  result.remove.forEach(tag => tag.setAttribute(`data-viewport-${attr}`, ''))
  return result.styles.join('\n')
}
