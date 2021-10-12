import React from "react"
import renderer from "react-test-renderer"
import { StaticQuery } from "gatsby"
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react"
import Hero from '../hero'

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