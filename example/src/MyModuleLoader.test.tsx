import React from 'react'
import ReactDOM from 'react-dom'
import MyModuleLoader from './MyModuleLoader'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MyModuleLoader />, div)
  ReactDOM.unmountComponentAtNode(div)
})
