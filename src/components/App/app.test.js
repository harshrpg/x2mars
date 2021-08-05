import React from "react"
import { render } from "@testing-library/react"
import App from './app';

test('First test', () => {
  expect(true).toBe(true);
});

// You have to write data-testid
const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>
test("Displays the correct title", () => {
  const { getByTestId } = render(<Title />)
  // Assertion
  expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!")
  // --> Test will pass
})
