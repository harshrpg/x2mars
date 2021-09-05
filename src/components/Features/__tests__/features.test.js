import React from "react"
import renderer from "react-test-renderer"
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react"
import Features from '../features'

  
describe("Features test", () =>{

    // You have to write data-testid
const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>
test("Index test 1", () => {
  const { getByTestId } = render(<Title />)
  // Assertion
  expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!")
  // --> Test will pass
})

    //  test("Features Content", () => {
    //     const {getByTestId} = render(<Features/>);
    //     const navElement = getByTestId('featureContent');
    //   expect(navElement).toBeTruthy();
    // })
      
})