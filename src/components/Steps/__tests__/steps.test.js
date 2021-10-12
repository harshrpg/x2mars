import React from "react"
import renderer from "react-test-renderer"
import ReactDOM from "react-dom"
import { render, screen } from "@testing-library/react"
import Steps from "../steps"

describe("Steps test", () => {
  it("Steps renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Steps />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

})


//   describe("Steps", () => {
//     it("renders correctly", () => {
//       const data = {
//         "data": {
//           "backgroundImage123": {
//             "childImageSharp": {
//               "gatsbyImageData": {
//                 "layout": "constrained",
//                 "backgroundColor": "#f8f8f8",
//                 "images": {
//                   "fallback": {
//                     "src": "/static/bd8bd48d53fce3a971fae87dc0f16c4d/cfd3a/Hero2.png",
//                     "srcSet": "/static/bd8bd48d53fce3a971fae87dc0f16c4d/9fc2d/Hero2.png 256w,\n/static/bd8bd48d53fce3a971fae87dc0f16c4d/c3af5/Hero2.png 512w,\n/static/bd8bd48d53fce3a971fae87dc0f16c4d/cfd3a/Hero2.png 1024w,\n/static/bd8bd48d53fce3a971fae87dc0f16c4d/4aa16/Hero2.png 2048w",
//                     "sizes": "(min-width: 1024px) 1024px, 100vw"
//                   },
//                   "sources": [
//                     {
//                       "srcSet": "/static/bd8bd48d53fce3a971fae87dc0f16c4d/a14bd/Hero2.webp 256w,\n/static/bd8bd48d53fce3a971fae87dc0f16c4d/cc999/Hero2.webp 512w,\n/static/bd8bd48d53fce3a971fae87dc0f16c4d/568fc/Hero2.webp 1024w,\n/static/bd8bd48d53fce3a971fae87dc0f16c4d/0bbd3/Hero2.webp 2048w",
//                       "type": "image/webp",
//                       "sizes": "(min-width: 1024px) 1024px, 100vw"
//                     }
//                   ]
//                 },
//                 "width": 1024,
//                 "height": 845
//               }
//             }
//           },
//           "backgroundImage123_mobile": {
//             "childImageSharp": {
//               "gatsbyImageData": {
//                 "layout": "constrained",
//                 "backgroundColor": "#f8f8f8",
//                 "images": {
//                   "fallback": {
//                     "src": "/static/bd8bd48d53fce3a971fae87dc0f16c4d/7e354/Hero2.png",
//                     "srcSet": "/static/bd8bd48d53fce3a971fae87dc0f16c4d/4ed6d/Hero2.png 80w,\n/static/bd8bd48d53fce3a971fae87dc0f16c4d/40dd2/Hero2.png 160w,\n/static/bd8bd48d53fce3a971fae87dc0f16c4d/7e354/Hero2.png 320w,\n/static/bd8bd48d53fce3a971fae87dc0f16c4d/693b5/Hero2.png 640w",
//                     "sizes": "(min-width: 320px) 320px, 100vw"
//                   },
//                   "sources": [
//                     {
//                       "srcSet": "/static/bd8bd48d53fce3a971fae87dc0f16c4d/1deab/Hero2.webp 80w,\n/static/bd8bd48d53fce3a971fae87dc0f16c4d/c6aca/Hero2.webp 160w,\n/static/bd8bd48d53fce3a971fae87dc0f16c4d/0a0af/Hero2.webp 320w,\n/static/bd8bd48d53fce3a971fae87dc0f16c4d/8ae69/Hero2.webp 640w",
//                       "type": "image/webp",
//                       "sizes": "(min-width: 320px) 320px, 100vw"
//                     }
//                   ]
//                 },
//                 "width": 320,
//                 "height": 320
//               }
//             }
//           }
//         },
//         "extensions": {}
//       }
//       const tree = renderer.create(<Hero data={data} />).toJSON()
//       expect(tree).toMatchSnapshot()
//     })
//   })

