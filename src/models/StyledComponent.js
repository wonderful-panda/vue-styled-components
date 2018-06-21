export default (ComponentStyle) => {
  const createStyledComponent = (target, rules, props) => {
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
      render: function (createElement, { props, data, slots }) {
        const generatedClassName = getGeneratedClassName(props)
        if (data.staticClass) {
          data.staticClass = data.staticClass + ' ' + generatedClassName
        } else {
          data.staticClass = generatedClassName
        }
        const children = []
        const slots_ = slots()
        for (const slotName in slots_) {
          const slot = slots_[slotName]
          if (slotName === 'default') {
            children.push(slot)
          } else {
            children.push(createElement('template', { slot: slotName }, slot))
          }
        }
        return createElement(
          target,
          data,
          children
        )
      }
    }

    return StyledComponent
  }

  return createStyledComponent
}
