import React from "react"
import renderer from "react-test-renderer"
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react"
import Navbar from "../navbar"

describe("Navbar test", () =>{

    it('Navbar renders without crashing',() =>{
        const div = document.createElement('div');
        ReactDOM.render(<Navbar />,div);
        ReactDOM.unmountComponentAtNode(div);
     })
        
    test("Navbar banner", () => {
        const {getByTestId} = render(<Navbar/>);
        const navElement = getByTestId('navbar');
      expect(navElement).toBeTruthy();
    })

    test("Navbar Logo button", () => {
        const {queryByTestId} = render(<Navbar/>);
        const navElement = queryByTestId('navbarLogo');
      expect(navElement).toBeFalsy();
    })

    })