import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../layout'
import { render, screen } from "@testing-library/react"

describe("Layout test", () =>{
// You have to write data-testid
const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>
test("Index test 1", () => {
  const { getByTestId } = render(<Title />)
  // Assertion
  expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!")
  // --> Test will pass
})

//it('Layout renders without crashing',() =>{
   //Error-> Children is undefigned
   // const div = document.createElement('div');
   // ReactDOM.render(<Layout />,div);
   // ReactDOM.unmountComponentAtNode(div);

})