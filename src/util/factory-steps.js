export const Steps = {
  Step1: {
    title: "Select Token Type",
    cardData: [
      {
        title: "Governance",
        type: "select",
        price: {
          eth: 1.0,
          bnb: 10.0,
        },
        img: "gtoken.png",
        selected: true,
      },
      {
        title: "Fee On Transfer",
        type: "select",
        price: {
          eth: 5.0,
          bnb: 15.0,
        },
        img: "fotoken.png",
        selected: false,
      },
    ],
  },
  Step2: {
    title: "Provide Token Details",
    cardData: [
      {
        title: "Token Details",
        type: "custom",
        id: "step2-1",
      },
      {
        title: "Token Supply",
        type: "custom",
        id: "step2-2",
      },
      {
        title: "Create DEX Pool",
        type: "select",
        price: {
          eth: 0.2,
          bnb: 2,
        },
        img: {
          eth: "uni.png",
          bnb: "cake.png",
        },
      },
    ],
  },
  Step3: {
    title: "Select Token Features",
    cardData: [
      {
        title: "Automatic Liquidation",
        type: "feature-select",
        inputData: {
          name: "Liquidation Fee",
          type: "slider",
          min: 5,
          max: 15,
        },
        img: {
          eth: "al_eth.png",
          bnb: "al_bnb.png",
        }
      },
      {
        title: "RFI Static Rewards",
        type: "feature-select",
        price: {
          eth: 0.2,
          bnb: 2,
        },
        inputData: {
          name: "Reward Fee",
          type: "slider",
          min: 5,
          max: 15,
        },
        img: "rfi.png",
      },
      {
        title: "Anti Whale Protection",
        type: "feature-select",
        price: {
          eth: 0.2,
          bnb: 2,
        },
        inputData: {
          name: "Max Transaction Amount",
          type: "slider",
          min: 5,
          max: 15,
        },
        img: "awp.png",
      },
      {
        title: "Automatic Burn per Transaction",
        type: "feature-select",
        price: {
          eth: 0.2,
          bnb: 2,
        },
        inputData: {
          name: "Burn Fee",
          type: "slider",
          min: 5,
          max: 15,
        },
        img: "ab.png",
      },
      {
        title: "Automatic Charity Donation",
        type: "feature-select",
        price: {
          eth: 0.2,
          bnb: 2,
        },
        inputData: {
          name: "Charity Fee",
          type: "slider",
          min: 5,
          max: 15,
        },
        img: "ac.png",
      },
    ],
  },
  Step4: {
    title: "Provide Launchpad details",
    options: ["Launchpad Card"],
    optionData: [
      {
        type: "custom",
        price: {
          eth: 5.0,
          bnb: 50.0,
        },
        input: ["Website url, Email address, Whitepaper link"],
      },
    ],
  },
  Step5: {
    title: "Pay and Deploy",
    options: ["Deploy Card"],
    optionData: [
      {
        type: "custom",
      },
    ],
  },
}
