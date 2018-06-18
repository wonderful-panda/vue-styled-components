import Vue from 'vue'

import { resetStyled, expectCSSMatches, mount } from './utils'

let styled

describe('props', () => {
  beforeEach(() => {
    styled = resetStyled()
  })

  it('should execute interpolations and fall back', () => {
    const compProps = { fg: String }
    const Comp = styled('div', compProps)`
      color: ${props => props.fg || 'black'};
    `
    const vm = mount(Comp)
    expectCSSMatches('.a {color: black;}')
  })

  it('should execute interpolations and inject props', () => {
    const compProps = { fg: String }
    const Comp = styled('div', compProps)`
      color: ${props => props.fg || 'black'};
    `
    const vm = mount(Comp, { fg: 'red' })
    expectCSSMatches('.a {color: red;}')
  })
})
