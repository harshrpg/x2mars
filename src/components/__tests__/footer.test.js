import React from "react"
import renderer from "react-test-renderer"
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react"
import Footer from "../footer"

describe("Footer test", () =>{

    it('Footer renders without crashing',() =>{
        const div = document.createElement('div');
        ReactDOM.render(<Footer />,div);
        ReactDOM.unmountComponentAtNode(div);
     })
        

    })