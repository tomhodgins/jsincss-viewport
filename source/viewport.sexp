mixin('viewport', ['selector', 'option', 'stylesheet'],
  prelude('  const features = {\n\
    partly: tag => {\n\
      return tag.offsetTop - innerHeight < scrollY\n\
        && tag.offsetTop - innerHeight + tag.offsetHeight < scrollY + tag.offsetHeight\n\
        && scrollY < tag.offsetTop + tag.offsetHeight\n\
    },\n\
    fully: tag => {\n\
      return tag.offsetTop - innerHeight < scrollY\n\
        && tag.offsetTop - innerHeight + tag.offsetHeight < scrollY\n\
        && scrollY < tag.offsetTop\n\
    }\n\
  }\n\n',
    returnValue('Array.from(document.querySelectorAll(selector))',
      plainReduce(
        createAttribute(['selector', 'option'],
          ifElseReset('features[option](tag)', 'tag', 'viewport'))))))
