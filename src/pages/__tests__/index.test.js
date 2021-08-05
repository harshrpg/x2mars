import React from "react"
import renderer from "react-test-renderer"
import { render, screen } from "@testing-library/react"
import { StaticQuery } from "gatsby"
import IndexPage from '../index';

beforeEach(() => {
    StaticQuery.mockImplementationOnce(({ render }) =>
      render({
        site: {
          siteMetadata: {
            title: `Default Starter`,
          },
        },
      })
    )
  })

describe("Index", () =>
  it("renders correctly", () => {
      const data = {
        "data": {
          "site": {
            "siteMetadata": {
              "author": "@x2mars-community"
            }
          }
        },
        "extensions": {}
      }

    const tree = renderer.create(<IndexPage data={data} />).toJSON()
    expect(tree).toMatchSnapshot()
  }))



// describe("Index page test", () =>{

//     //we can use test or it
// test('Layout rendered?', () => {
//     const{ getByTestId } = render(<IndexPage />);
//     const layout = getByTestId("appInIndex");
//   expect(layout).toBeTruthy();
// });

// render(<IndexPage />);
//     const layout = screen.getByTestId("appInIndex");
//     expect(layout).toBeInTheDocument();



// // You have to write data-testid
// const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>
// test("Index test 2", () => {
//   const { getByTestId } = render(<Title />)
//   // Assertion
//   expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!")
//   // --> Test will pass
// })

//})
