import React from "react"
import renderer from "react-test-renderer"
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react"
import Card from '../card';

describe("Step1 card test", () =>{
    it("renders with error tag", () => {
        const {getByTestId} = render(<Card network={undefined} cardData={
            {
              title: "Governance",
              description:
                "Governance is a simple ERC-20 token governing purposes of your project",
              type: "select",
              price: {
                eth: 1.0,
                bnb: 10.0,
              },
              img: "gtoken.png",
              selected: true,
            }
          } error={"Connect Wallet"}></Card>)
        const step1 = getByTestId('step-1')
        //expect(step1).toBeTruthy();
        expect(getByTestId('step-1')).toHaveTextContent("Connect Wallet");
    })
  })