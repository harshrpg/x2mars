import React from "react"
import renderer from "react-test-renderer"
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react"
import Telegram from '../telegram'

  
describe("Telegram test", () =>{

    // it('Telegram renders without crashing',() =>{
    //     const div = document.createElement('div');
    //     ReactDOM.render(<Telegram />,div);
    //     ReactDOM.unmountComponentAtNode(div);
    //  })

     test(" Telegram button", () => {
        const {getByTestId} = render(<Telegram/>);
        const navElement = getByTestId('telegramButton');
      expect(navElement).toBeTruthy();
    })
      
})