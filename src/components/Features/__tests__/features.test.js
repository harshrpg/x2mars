import React from "react"
import renderer from "react-test-renderer"
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react"
import Features from '../features'

  
describe("Features test", () =>{

    it('Features renders without crashing',() =>{
        const div = document.createElement('div');
        ReactDOM.render(<Features />,div);
        ReactDOM.unmountComponentAtNode(div);
     })

    //  test("Features Content", () => {
    //     const {getByTestId} = render(<Features/>);
    //     const navElement = getByTestId('featureContent');
    //   expect(navElement).toBeTruthy();
    // })
      
})