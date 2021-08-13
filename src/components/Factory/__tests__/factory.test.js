import React from "react"
import renderer from "react-test-renderer"
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react"
import Factory from '../factory'

  
describe("Features test", () =>{

    it('Factory renders without crashing',() =>{
        const div = document.createElement('div');
        ReactDOM.render(<Factory />,div);
        ReactDOM.unmountComponentAtNode(div);
     })

    //  test("Features Content", () => {
    //     const {getByTestId} = render(<Features/>);
    //     const navElement = getByTestId('featureContent');
    //   expect(navElement).toBeTruthy();
    // })
      
})