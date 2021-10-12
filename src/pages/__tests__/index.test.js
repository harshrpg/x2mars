import React from "react"
import renderer from "react-test-renderer"
import { render, screen } from "@testing-library/react"
import { StaticQuery } from "gatsby"
import IndexPage from '../index';

describe("Index page test", () =>{

// You have to write data-testid
const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>
test("Index test 1", () => {
  const { getByTestId } = render(<Title />)
  // Assertion
  expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!")
  // --> Test will pass
})

})
