export const url = process.env.API_URL || "https://api.mysamadmin.com/"

export const features = [
    {
        title: "Tax Return Features",
        description: "Explore our comprehensive Tax Return platform, designed to simplify and streamline your tax filing process.",
        features: [
            `Fill out your tax organizer`,
            `Upload all source documents`,
            `Sign our engagement letter`,
            `Chat/correspond with your CPA`,
            `Pay for your tax return`,
            `Watch your tracker as your return progresses through “staging”, “being prepared”, “reviewed”, and "e-filing"`,
            `Will display important tax carryovers`,
            `Will hold documents such as prior tax returns, trust/estate plans and critical documents`,
            `Remind you of your estimated tax payments`
        ]
    },
    {
        title: "E-commerce store features",
        description: "Shop our new advisory service/e-commerce platform and purchase various services within your portal.",
        features: [
            "Tax research",
            "Tax planning",
            "Wealth management",
            "Audited/Financial statements",
            "Bookkeeping",
            "Estate planning/Asset protection",
            "Home loans",
            "Business loans",
            "Private equity"
        ]
    }
]

export const menuTabs = [
    {
        filingType: 'Individual',
        items:[
            {filingTitle:'Individual', filingName: '1040'},
        ]
    },
    {
        filingType:'Business',
        items:[
            {filingTitle:'LLC', filingName: '1065'},
            {filingTitle:'S Corp', filingName: '1120S'},
            {filingTitle:'C Corp', filingName: '1120'}
        ]
    },
    {
        filingType:'Specialty',
        items:[
            {filingTitle:'Fiduciary', filingName: '1041'},
            {filingTitle:'Estate', filingName: '706'},
            {filingTitle:'Gift', filingName: '709'},
            {filingTitle:'Exempt', filingName: '990'},
        ]
    },
    {
        filingType:'Advisory Service',
        items:[
            {filingTitle:'Tax Planning', filingName: 'Tax Planning'},
            {filingTitle:'Wealth Management', filingName: 'Wealth Management'},
        ]
    },
    {
        filingType:'Estate Planning',
        items:[
            {filingTitle:'Estate Plan', filingName: 'Estate Planning', dropdownInfo: 'The process of arranging and managing an individual\'s assets to ensure they are transferred or managed according to their wishes upon incapacity or death.'},
            {filingTitle:'Reduce Estate Taxes', filingName: 'Estate Planning RET', dropdownInfo: 'This involves strategies to minimize the amount of estate taxes that will be owed at an individual\'s death, often through gifting, trusts, or other tax-efficient methods.' },
            {filingTitle:'Protect Your Personal Assets', filingName: 'Estate Planning PPA', dropdownInfo: 'This focuses on safeguarding an individual\'s personal assets from potential creditors, lawsuits, or other claims, often using legal structures like trusts or limited liability entities.'},
            {filingTitle:'Protect Your Business Assets', filingName: 'Estate Planning PBA', dropdownInfo:'This entails strategies to shield a business owner\'s assets from business-related risks and liabilities, which can include using business structures, contracts, or insurance policies.'},
        ]
    }
  ]

export const usStateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", 
    "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", 
    "VA", "WA", "WV", "WI", "WY"
];