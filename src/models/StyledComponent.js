export default (ComponentStyle) => {
  const createStyledComponent = (target, rules, props) => {
    const prevProps = target && typeof target !== 'string'
      ? (typeof target === 'object' ? target.props : (typeof target === 'function' ? target.options.props : {}))
      : {}
    const mergedProps = Object.assign({}, prevProps, props)

    const componentStyle = new ComponentStyle(rules)
    let getGeneratedClassName
    if (rules.filter(r => r instanceof Function).length === 0) {
      const generatedClassName = componentStyle.generateAndInjectStyles({})
      getGeneratedClassName = () => generatedClassName
    } else {
      getGeneratedClassName = props => componentStyle.generateAndInjectStyles(Object.assign({}, props))
    }

    const StyledComponent = {
      functional: true,
      props: mergedProps,
      render: function (createElement, { props, data, children }) {
        const generatedClassName = getGeneratedClassName(props)
        let staticClass
        if (data.staticClass) {
          staticClass = data.staticClass + ' ' + generatedClassName
        } else {
          staticClass = generatedClassName
        }
        return createElement(
          target,
          Object.assign({}, data, { staticClass }),
          children
        )
      }
    }

    return StyledComponent
  }

  return createStyledComponent
}
