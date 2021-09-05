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

    test("Navbar About button", () => {
        const {getByTestId} = render(<Navbar/>);
        const navElement = getByTestId('navbarAbout');
      expect(navElement).toBeTruthy();
    })

    test("Navbar Blog button", () => {
        const {getByTestId} = render(<Navbar/>);
        const navElement = getByTestId('navbarBlog');
      expect(navElement).toBeTruthy();
    })

    test("Navbar Whitepaper button", () => {
        const {getByTestId} = render(<Navbar/>);
        const navElement = getByTestId('navbarPaper');
      expect(navElement).toBeTruthy();
    })

    test("Navbar BuyX2mars button", () => {
        const {getByTestId} = render(<Navbar/>);
        const navElement = getByTestId('navbarBuy');
      expect(navElement).toBeTruthy();
    })
    
    test("Navbar OpenApp button", () => {
        const {getByTestId} = render(<Navbar/>);
        const navElement = getByTestId('navbarApp');
      expect(navElement).toBeTruthy();
    })

    test("Navbar Telegram button", () => {
        const {getByTestId} = render(<Navbar/>);
        const navElement = getByTestId('navbarTelegram');
      expect(navElement).toBeTruthy();
    })

    test("Navbar Medium button", () => {
        const {getByTestId} = render(<Navbar/>);
        const navElement = getByTestId('navbarMedium');
      expect(navElement).toBeTruthy();
    })

    test("Navbar Twitter button", () => {
        const {getByTestId} = render(<Navbar/>);
        const navElement = getByTestId('navbarTwitter');
      expect(navElement).toBeTruthy();
    })

    test("Navbar Discord button", () => {
        const {getByTestId} = render(<Navbar/>);
        const navElement = getByTestId('navbarDiscord');
      expect(navElement).toBeTruthy();
    })

    test("Navbar Youtube button", () => {
        const {getByTestId} = render(<Navbar/>);
        const navElement = getByTestId('navbarYoutube');
      expect(navElement).toBeTruthy();
    })

    test("Navbar Facebook button", () => {
        const {getByTestId} = render(<Navbar/>);
        const navElement = getByTestId('navbarFacebook');
      expect(navElement).toBeTruthy();
    })

    test("Navbar Logo button", () => {
        const {queryByTestId} = render(<Navbar/>);
        const navElement = queryByTestId('navbarLogo');
      expect(navElement).toBeFalsy();
    })

    })