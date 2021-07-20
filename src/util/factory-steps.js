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
      options: [
        "Protocol Basic Info",
        "Token Supply Info",
        "Exchange Selection",
      ],
      optionData: [
        {
          type: "custom",
        },
        {
          type: "custom",
        },
        {
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
      options: [
        "Anti Whale Protection",
        "Fee Theft Protection",
        "Automatic Liquidation",
        "Automatic Fee Burn",
        "Static Rewards",
        "Automatic Charity Fee",
      ],
      optionData: [
        {
            type: "custom",
            price: {
              eth: 0.2,
              bnb: 2,
            },
            input: "max transaction amount",
            img: "antiwhale.png"
        },
        {
            type: "custom",
            price: {
              eth: 0.2,
              bnb: 2,
            },
            img: "antiwhale.png"
        },
        {
            type: "custom",
            price: {
              eth: 0.2,
              bnb: 2,
            },
            input: "liquidity fee per transaction",
            img: "automaticLiquidation.png"
        },
        {
            type: "custom",
            price: {
              eth: 0.2,
              bnb: 2,
            },
            input: "burn fee per transaction",
            img: "automaticBurn.png"
        },
        {
            type: "custom",
            price: {
              eth: 0.2,
              bnb: 2,
            },
            input: "static rewards per transaction",
            img: "rewards.png"
        },
        {
            type: "custom",
            price: {
              eth: 0.2,
              bnb: 2,
            },
            input: "charity fee per transaction",
            img: "automaticCharity.png"
        }
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
                    bnb: 50.0
                },
                input: ["Website url, Email address, Whitepaper link"]
            }
        ]
    },
    Step5: {
        title: "Pay and Deploy",
        options: ["Deploy Card"],
        optionData: [
            {
                type: "custom"
            }
        ]
    }
}
