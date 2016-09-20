
import React from 'react'
import { shallow, mount } from 'enzyme'
import { Input } from '..'
import { isDOMComponent } from 'react-addons-test-utils'

let wrapper
let inner

test('renders', () => {
  wrapper = shallow(<Input name='t' label='t' />)
  inner = wrapper.first().shallow()
})

test('is a div', () => {
  expect(inner.is('div')).toBe(true)
})

test('has a className', () => {
  expect(inner.props().className).toBe('Input')
})

test('accepts custom className props', () => {
  wrapper = shallow(<Input name='t' label='t' className='foo' />)
  inner = wrapper.first().shallow()
  expect(inner.props().className).toBe('Input foo')
})

test('accepts custom styles', () => {
  wrapper = shallow(<Input name='t' label='t' style={{ color: 'tomato' }} />)
  inner = wrapper.first().shallow()
  expect(inner.props().style.color).toBe('tomato')
})

test('context styles override default styles', () => {
  wrapper = shallow(<Input name='t' label='t' />, {
    context: {
      rebass: {
        Input: {
          marginLeft: 0
        }
      }
    }
  })
  inner = wrapper.first().shallow()
  expect(inner.props().style.marginLeft).toBe(0)
})

test('style props override context styles', () => {
  wrapper = shallow(
    <Input
      name='t'
      label='t'
      color='blue'
      style={{
        color: 'tomato'
      }} />, {
        context: {
          rebass: {
            Input: {
              color: 'magenta'
            }
          }
        }
      })
  inner = wrapper.first().shallow()
  expect(inner.props().style.color).toBe('tomato')
})

test('baseRef returns the input element', () => {
  let input
  wrapper = mount(
    <Input
      name='t'
      label='t'
      baseRef={r => input = r}
    />
  )
  expect(input).toBeDefined()
  expect(isDOMComponent(input)).toBe(true)
})
