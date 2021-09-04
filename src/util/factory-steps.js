export const Steps = {
  Step1: {
    title: "Select Token Type",
    cardData: [
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
      },
      {
        title: "Fee On Transfer",
        description:
          "Fee on Transfer are a simple type of ERC-20 tokens allowing you to charge fees while tokens are being transacted across the chain",
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
        description:
          "Token Name and Token Symbol are mandatory to create any contract based tokens",
        type: "custom",
        id: "step2-1",
      },
      {
        title: "Token Supply",
        description:
          "Token Supply is mandatory to create any contract based tokens",
        type: "custom",
        id: "step2-2",
      },
      {
        title: "Create DEX Pool",
        description:
          "DEX Pool allows you to create a pair of your token and the native coin for availing transactions of your coin. It is created for free when you are making a Fee On Transfer token",
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
        description:
          "A certain fee of every transaction is added back to the pool on the DEX pair created in the previous step",
        type: "feature-select",
        price: {
          eth: null,
          bnb: null,
        },
        inputData: [
          {
            idx: 0,
            name: "Liquidation Fee",
            type: "number",
            min: 5,
            max: 15,
          },
        ],
        img: {
          eth: "al_eth.png",
          bnb: "al_bnb.png",
        },
      },
      {
        title: "RFI Static Rewards",
        description:
          "A certain fee of every transaction is shared with all the current holders of your token",
        type: "feature-select",
        price: {
          eth: 0.2,
          bnb: 2,
        },
        inputData: [
          {
            idx: 1,
            name: "Reward Fee",
            type: "number",
            min: 5,
            max: 15,
          },
        ],
        img: "rfi.png",
      },
      {
        title: "Whale Protection",
        description:
          "A limit is imposed on the number of tokens that can be included per transaction",
        type: "feature-select",
        price: {
          eth: 0.2,
          bnb: 2,
        },
        inputData: [
          {
            idx: 2,
            name: "Max Transaction Amount (0.5% of supply)",
            type: "number",
            min: "",
            max: "",
          },
        ],
        img: "awp.png",
      },
      {
        title: "Automatic Burn per Transaction",
        description: "A certain fee of every transaction is burned",
        type: "feature-select",
        price: {
          eth: 0.2,
          bnb: 2,
        },
        inputData: [
          {
            idx: 3,
            name: "Burn Fee",
            type: "number",
            min: 5,
            max: 15,
          },
        ],
        img: "ab.png",
      },
      {
        title: "Automatic Charity Donation",
        description: "A certain fee of every transaction is given to charity",
        type: "feature-select",
        price: {
          eth: 0.2,
          bnb: 2,
        },
        inputData: [
          {
            idx: 4,
            name: "Charity Fee",
            type: "number",
            min: 5,
            max: 15,
          },
        ],
        img: "ac.png",
      },
    ],
  },
  Step4: {
    title: "Provide Launchpad details",
    cardData: [
      {
        title: "Launchpad",
        description:
          "Every member of our community will be notified about your project and will become a member of your community",
        type: "feature-select",
        price: {
          eth: 5.0,
          bnb: 50.0,
        },
        inputData: [
          {
            name: "Website URL",
            type: "text",
            min: "",
            max: "",
          },
          {
            name: "Whitepaper Link",
            type: "text",
            min: "",
            max: "",
          },
          {
            name: "Contact Email",
            type: "text",
            min: "",
            max: "",
          },
        ],
        img: "lp.png",
      },
    ],
  },
  Step5: {
    title: "Purchase Summary",
    cardData: [
      {
        title: "Summary of your selection",
        description: "Summary of your purchase",
        type: "summary",
        displayData: [
          "Type of Token",
          "Name",
          "Symbol",
          "Supply",
          "Create Pair on DEX",
          "Features",
          "Launchpad Access",
        ],
      },
    ],
  },
}
