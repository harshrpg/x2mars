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
        
    test("Footer banner", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footer');
      expect(navElement).toBeTruthy();
    })

    test("Footer Discord button", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footerDiscord');
      expect(navElement).toBeTruthy();
    })

    test("Footer Forums button", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footerForums');
      expect(navElement).toBeTruthy();
    })

    test("Footer Reddit button", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footerReddit');
      expect(navElement).toBeTruthy();
    })

    test("Footer Telegram button", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footerTelegram');
      expect(navElement).toBeTruthy();
    })
    
    test("Footer Branding button", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footerBranding');
      expect(navElement).toBeTruthy();
    })

    test("Footer Wallet button", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footerWallet');
      expect(navElement).toBeTruthy();
    })

    test("Footer Contact button", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footerContact');
      expect(navElement).toBeTruthy();
    })

    test("Footer Paper button", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footerPaper');
      expect(navElement).toBeTruthy();
    })

    test("Footer Facebook button", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footerFacebook');
      expect(navElement).toBeTruthy();
    })

    test("Footer Instagram button", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footerInstagram');
      expect(navElement).toBeTruthy();
    })

    test("Footer Twitter button", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footerTwitter');
      expect(navElement).toBeTruthy();
    })

    test("Footer Youtube button", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footerYouTube');
      expect(navElement).toBeTruthy();
    })

    test("Footer Linkedin button", () => {
        const {getByTestId} = render(<Footer/>);
        const navElement = getByTestId('footerLinkedIn');
      expect(navElement).toBeTruthy();
    })

    })