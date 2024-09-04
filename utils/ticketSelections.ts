const getTaxYearOptions = (filingName) => {
    const noTaxYear = ['706', '709', 'taxResearch'];
    const availableTaxYears = [];
    if(!noTaxYear.includes(filingName)){
        const ascendingYear = ['Tax Planning', 'Wealth Management']
        
        const now = new Date();
        const currentTaxYear = parseInt(now.toLocaleDateString("en-US", {
            timeZone: "America/Los_Angeles",
            year:"numeric"
        })) - 1
        const numOfYearsAvailable = 4;
        
        
        if(ascendingYear.includes(filingName)){
            for(let i=currentTaxYear+1; i<=currentTaxYear+numOfYearsAvailable; i++){
                availableTaxYears.push({
                    optionLabel:i,
                    optionValue:i,
                });
            }
        } else{
            for(let i=currentTaxYear; i>=currentTaxYear-numOfYearsAvailable; i--){
                availableTaxYears.push({
                    optionLabel:i,
                    optionValue:i,
                });
            }
        }
        
        const fiscalYear = ['audited'].includes(filingName) ? [
            {
                optionLabel:'Fiscal Year',
                optionValue:'fiscal-year',
                optionOpensInput:{
                    optionOpenedLabel:'Enter end of month',
                    optionOpenedName:'fiscalYearDate',
                    optionOpenedType:'text',
                    optionOpenedRequired:true,
                }
            }
        ] : []

        const taxYearOptions = [
            {
                label:'What year are you filing for?',
                name:'year',
                id:'year',
                type:'select',
                required: true,
                inputContainerClasses: 'radio-input-container',
                labelClasses: 'bold mb-5',
                containerClasses: 'flex-col',
                options:[
                    {
                        optionLabel:'Select a tax year',
                        optionDisabled:true,
                        optionSelected:true
                    },
                    ...availableTaxYears,
                    ...fiscalYear
                ],
            }
        ];

        return taxYearOptions;
        
    }
}

const estatePlanningDueDateOption = [
    {
        label:'Due date (PST)',
        name:'estatePlanningDate',
        id:'estatePlanningDate',
        type:'date',
        required:true,
        allInputClass: 'due-date-7days',
        staticDate:true,
        labelClasses: 'bold mb-5',
        containerClasses: 'flex-col',
        inputContainerClasses: 'radio-input-container',
    }
];

export const getTicketSelections = (filingName) => {
    const taxYearOptions = getTaxYearOptions(filingName)
    let genArr = [];
    let specArr = [];
    switch (filingName) {
        // INDIVIDUAL 1040 INPUTS START
        case '1040':
            // INDIVIDUAL 1040 COLUMN 1
            genArr = [
                {
                    label: 'What is your filing status?',
                    name: 'filingStatus',
                    id: 'filingStatus',
                    type: 'select',
                    required: true,
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'Single',
                            optionValue: 'Single'
                        },
                        {
                            optionLabel: 'Married, Filing Jointly (MFJ)',
                            optionValue: 'Married, Filing Jointly (MFJ)',
                            optionOpensInput: {
                                optionOpenedLabel: 'Spouse email',
                                optionOpenedName: 'otherClientEmail',
                                optionOpenedId: 'otherClientEmail',
                                optionOpenedType: 'email',
                                optionOpenedRequired: true
                            }
                        },
                        {
                            optionLabel: 'Married, Filing Separately (MFS)',
                            optionValue: 'Married, Filing Separately (MFS)'
                        },
                        {
                            optionLabel: 'Domestic Partner',
                            optionValue: 'Domestic Partner'
                        },
                        {
                            optionLabel: 'Head of Household (HOH)',
                            optionValue: 'Head of Household (HOH)'
                        },
                        {
                            optionLabel: 'Widow/Widower',
                            optionValue: 'Widow/Widower'
                        },
                    ]
                },
                ...taxYearOptions,
                {
                    label: "Do you have separate child's return?",
                    name: 'hasSeparateChild',
                    id: 'hasSeparateChild',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'separateChild',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'separateChild',
                        extraInputType: 'number',
                        extraInputMin: 1
                    }
                },
                {
                    label: "Do you have W-2 forms?",
                    name: 'hasW2sChecked',
                    id: 'hasW2sChecked',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'hasW2s',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'hasW2s',
                        extraInputType: 'number',
                        extraInputMin: 1
                    }
                },
                {
                    label: "Do you own a home?",
                    name: 'ownHome',
                    id: 'ownHome',
                    type: 'checkbox',
                },
                {
                    label: 'Do you have any interest or dividends?',
                    name: 'interestsDividends',
                    id: 'interestsDividends',
                    type: 'checkbox',
                },
                {
                    label: 'Have you sold any stocks?',
                    name: 'sellStock',
                    id: 'sellStock',
                    type: 'checkbox',
                },
                {
                    label: 'Do you own any rental properties?',
                    name: 'hasRentalProperties',
                    id: 'hasRentalProperties',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'rentalProperties',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'rentalProperties',
                        extraInputType: 'number',
                        extraInputMin: 1
                    },
                },
                {
                    label: 'Do you own any businesses?',
                    name: 'hasBusinesses',
                    id: 'hasBusinesses',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'ownBusiness',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'ownBusiness',
                        extraInputType: 'number',
                        extraInputMin: 1
                    },
                },
                {
                    label: 'Have you bought or sold a home?',
                    name: 'buySellHomeChecked',
                    id: 'buySellHomeChecked',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'buySellHome',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'buySellHome',
                        extraInputType: 'number',
                        extraInputMin: 1
                    },
                },
                {
                    label: 'Have you bought or sold a rental property?',
                    name: 'buySellRentalChecked',
                    id: 'buySellRentalChecked',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'buySellRental',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'buySellRental',
                        extraInputType: 'number',
                        extraInputMin: 1
                    },
                },
                {
                    label: 'Do you have any Schedule K-1 forms?',
                    name: 'hasScheduleK1',
                    id: 'hasScheduleK1',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'scheduleK1',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'scheduleK1',
                        extraInputType: 'number',
                        extraInputMin: 1
                    },
                },
                {
                    label: 'Have you received any statements for retirement income or Social Security?',
                    name: 'hasRetirementSocialSecurity',
                    id: 'hasRetirementSocialSecurity',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'retirementSocialSecurity',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'retirementSocialSecurity',
                        extraInputType: 'number',
                        extraInputMin: 1
                    },
                },
                {
                    label: 'Have you worked abroad?',
                    name: 'workAbroad',
                    id: 'workAbroad',
                    type: 'checkbox',
                },
                {
                    label: 'Do you need to file returns for two or more states?',
                    name: 'stateReturns',
                    id: 'stateReturns',
                    type: 'checkbox',
                },
                {
                    label: 'Do you have student loans?',
                    name: 'student',
                    id: 'student',
                    type: 'checkbox',
                },
            ];

            // INDIVIDUAL 1040 COLUMN 2
            specArr = [
                {
                    label: 'Cancellation of Debt',
                    name: 'cancellationOfDebt',
                    id: 'cancellationOfDebt',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Cannabis',
                    name: 'cannabis',
                    id: 'cannabis',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Capital Gains and Losses',
                    name: 'capitalGainsLosses',
                    id: 'capitalGainsLosses',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Depreciation',
                    name: 'depreciation',
                    id: 'depreciation',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Divorce',
                    name: 'divorce',
                    id: 'divorce',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'ESOP/Stock Option',
                    name: 'ESOPStockOptions',
                    id: 'ESOPStockOptions',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'EXPAT Tax Returns',
                    name: 'EXPATTaxReturns',
                    id: 'EXPATTaxReturns',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Section 743/Step Up Basis',
                    name: 'section473StepUpBasis',
                    id: 'section473StepUpBasis',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'U.S. Persons with respect to certain foreign corp (Form 5471)',
                    name: 'USpersons',
                    id: 'USpersons',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'IRC 1031 Exchanges',
                    name: 'IRC1031Exchanges',
                    id: 'IRC1031Exchanges',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Ministries/Priests',
                    name: 'ministriesPriests',
                    id: 'ministriesPriests',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Net Operating Losses',
                    name: 'netOperatingLosses',
                    id: 'netOperatingLosses',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Non Fungible Tokens (NFT)',
                    name: 'NFT',
                    id: 'NFT',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Passive Activity Losses',
                    name: 'passiveActivityLosses',
                    id: 'passiveActivityLosses',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Pensions/IRA Defined Benefit',
                    name: 'pensionsIRADefinedBenefit',
                    id: 'pensionsIRADefinedBenefit',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'NOL Carryback (FORM 1045)',
                    name: 'nolCarryback',
                    id: 'nolCarryback',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'FBAR Form 114',
                    name: 'fbar',
                    id: 'fbar',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
            ];
            break;
        // INDIVIDUAL 1040 INPUTS END

        // BUSINESS INPUTS START
        case '1065':
            // BUSINESS COLUMN 1
            genArr = [
                ...taxYearOptions,
                {
                    label:'What is the name of your business?',
                    name:'filingFor',
                    id:'filingFor',
                    type:'text',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    required:true
                },
                // PUT BACK LATER
                // {
                //     name:'differentFilingForName',
                //     id:'differentFilingForName',
                //     type:'hidden',
                //     value:'yes'
                // },
                {
                    label: 'What is your gross income?',
                    name: 'grossIncome',
                    id: 'grossIncome',
                    type: 'select',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'under $500,000',
                            optionValue: 'Less Than $500,000'
                        },
                        {
                            optionLabel: 'between $500,000 and $2,000,000',
                            optionValue: '$500,000 to $2,000,000'
                        },
                        {
                            optionLabel: 'between $2,000,000 and $10,000,000',
                            optionValue: '$2,000,000 to $10,000,000'
                        },
                        {
                            optionLabel: 'over $10,000,000',
                            optionValue: 'Over $10,000,000'
                        },
                    ],
                    required: true
                },
                {
                    label: "Do you have any Schedule K-1 forms?",
                    name: 'hasBusinessScheduleK1',
                    id: 'hasBusinessScheduleK1',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'k1s',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'k1s',
                        extraInputType: 'number',
                        extraInputMin: filingName === '1065' ? 2 : 1,
                    },
                    required:true,
                    exclude: ['1120'],
                },
                {
                    label: "Do you own any rental properties?",
                    name: 'hasRentalProperties',
                    id: 'hasRentalProperties',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'rentalProperties',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'rentalProperties',
                        extraInputType: 'number',
                        extraInputMin: 1
                    }
                },
                {
                    label: "Have you bought or sold any rental properties?",
                    name: 'buySellRentalChecked',
                    id: 'buySellRentalChecked',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'buySellRental',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'buySellRental',
                        extraInputType: 'number',
                        extraInputMin: 1
                    }
                },
                {
                    label: "Is this the first year you are filing for tax return?",
                    name: 'firstYear',
                    id: 'firstYear',
                    type: 'checkbox',
                },
                {
                    label: "Books not a tax basis",
                    name: 'taxBasis',
                    id: 'taxBasis',
                    type: 'checkbox',
                },
                {
                    label: "Books Not Reconciled or Needs AJE's",
                    name: 'notReconciled',
                    id: 'notReconciled',
                    type: 'checkbox',
                },
                {
                    label: "Have you sold or purchased any assets?",
                    name: 'assets',
                    id: 'assets',
                    type: 'checkbox',
                },
                {
                    label: "Do you have any assets that require a depreciation deduction?",
                    name: 'assetsDeprec',
                    id: 'assetsDeprec',
                    type: 'checkbox',
                }
            ]

            // BUSINESS COLUMN 2
            specArr = [
                {
                    label: 'Sale of Business Assets',
                    name: 'saleOfBusinessAssetsChecked',
                    id: 'saleOfBusinessAssetsChecked',
                    type: 'checkbox',
                    containerClasses: 'flex-col',
                    opensInput: {
                        extraInputName: 'saleOfBusinessAssets',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'saleOfBusinessAssets',
                        extraInputType: 'number',
                        extraInputMin: 1,
                        extraInputPlaceholder: 'How many?',
                    },
                    requirePlatPrep: true,
                },
                {
                    label: 'Cancellation Of Debt',
                    name: 'cancellationOfDebt',
                    id: 'cancellationOfDebt',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Cannabis',
                    name: 'cannabis',
                    id: 'cannabis',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Publicly Traded Partnerships',
                    name: 'publiclyTradedPartnerships',
                    id: 'publiclyTradedPartnerships',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Section 743/Step Up Basis',
                    name: 'section473StepUpBasis',
                    id: 'section473StepUpBasis',
                    type: 'checkbox',
                    exclude: ['1120S', '1120'],
                    requirePlatPrep: true,
                },
                {
                    label: 'FBAR Form 114',
                    name: 'fbar',
                    id: 'fbar',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
            ];
            break;
        case '1120S':
            // BUSINESS COLUMN 1
            genArr = [
                ...taxYearOptions,
                {
                    label:'What is the name of your business?',
                    name:'filingFor',
                    id:'filingFor',
                    type:'text',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    required:true
                },
                // PUT BACK LATER
                // {
                //     name:'differentFilingForName',
                //     id:'differentFilingForName',
                //     type:'hidden',
                //     value:'yes'
                // },
                {
                    label: 'What is your gross income?',
                    name: 'grossIncome',
                    id: 'grossIncome',
                    type: 'select',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'under $500,000',
                            optionValue: 'Less Than $500,000'
                        },
                        {
                            optionLabel: 'between $500,000 and $2,000,000',
                            optionValue: '$500,000 to $2,000,000'
                        },
                        {
                            optionLabel: 'between $2,000,000 and $10,000,000',
                            optionValue: '$2,000,000 to $10,000,000'
                        },
                        {
                            optionLabel: 'over $10,000,000',
                            optionValue: 'Over $10,000,000'
                        },
                    ],
                    required: true
                },
                {
                    label: "Do you have any Schedule K-1 forms?",
                    name: 'hasBusinessScheduleK1',
                    id: 'hasBusinessScheduleK1',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'k1s',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'k1s',
                        extraInputType: 'number',
                        extraInputMin: filingName === '1065' ? 2 : 1,
                    },
                    required:true,
                    exclude: ['1120'],
                },
                {
                    label: "Do you own any rental properties?",
                    name: 'hasRentalProperties',
                    id: 'hasRentalProperties',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'rentalProperties',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'rentalProperties',
                        extraInputType: 'number',
                        extraInputMin: 1
                    }
                },
                {
                    label: "Have you bought or sold any rental properties?",
                    name: 'buySellRentalChecked',
                    id: 'buySellRentalChecked',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'buySellRental',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'buySellRental',
                        extraInputType: 'number',
                        extraInputMin: 1
                    }
                },
                {
                    label: "Is this the first year you are filing for tax return?",
                    name: 'firstYear',
                    id: 'firstYear',
                    type: 'checkbox',
                },
                {
                    label: "Books not a tax basis",
                    name: 'taxBasis',
                    id: 'taxBasis',
                    type: 'checkbox',
                },
                {
                    label: "Books Not Reconciled or Needs AJE's",
                    name: 'notReconciled',
                    id: 'notReconciled',
                    type: 'checkbox',
                },
                {
                    label: "Have you sold or purchased any assets?",
                    name: 'assets',
                    id: 'assets',
                    type: 'checkbox',
                },
                {
                    label: "Do you have any assets that require a depreciation deduction?",
                    name: 'assetsDeprec',
                    id: 'assetsDeprec',
                    type: 'checkbox',
                }
            ]

            // BUSINESS COLUMN 2
            specArr = [
                {
                    label: 'Sale of Business Assets',
                    name: 'saleOfBusinessAssetsChecked',
                    id: 'saleOfBusinessAssetsChecked',
                    type: 'checkbox',
                    containerClasses: 'flex-col',
                    opensInput: {
                        extraInputName: 'saleOfBusinessAssets',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'saleOfBusinessAssets',
                        extraInputType: 'number',
                        extraInputMin: 1,
                        extraInputPlaceholder: 'How many?',
                    },
                    requirePlatPrep: true,
                },
                {
                    label: 'Cancellation Of Debt',
                    name: 'cancellationOfDebt',
                    id: 'cancellationOfDebt',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Cannabis',
                    name: 'cannabis',
                    id: 'cannabis',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Publicly Traded Partnerships',
                    name: 'publiclyTradedPartnerships',
                    id: 'publiclyTradedPartnerships',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                // {
                //     label: 'Section 743/Step Up Basis',
                //     name: 'section473StepUpBasis',
                //     id: 'section473StepUpBasis',
                //     type: 'checkbox',
                //     exclude: ['1120S', '1120'],
                //     requirePlatPrep: true,
                // },
                {
                    label: 'Built-in Gains Tax',
                    name: 'builtInGainsTax',
                    id: 'builtInGainsTax',
                    type: 'checkbox',
                    exclude: ['1065', '1120'],
                    requirePlatPrep: true,
                },
                {
                    label: 'FBAR Form 114',
                    name: 'fbar',
                    id: 'fbar',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
            ];
            break;
        case '1120':
            // BUSINESS COLUMN 1
            genArr = [
                ...taxYearOptions,
                {
                    label:'What is the name of your business?',
                    name:'filingFor',
                    id:'filingFor',
                    type:'text',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    required:true
                },
                // PUT BACK LATER
                // {
                //     name:'differentFilingForName',
                //     id:'differentFilingForName',
                //     type:'hidden',
                //     value:'yes'
                // },
                {
                    label: 'What is your gross income?',
                    name: 'grossIncome',
                    id: 'grossIncome',
                    type: 'select',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'under $500,000',
                            optionValue: 'Less Than $500,000'
                        },
                        {
                            optionLabel: 'between $500,000 and $2,000,000',
                            optionValue: '$500,000 to $2,000,000'
                        },
                        {
                            optionLabel: 'between $2,000,000 and $10,000,000',
                            optionValue: '$2,000,000 to $10,000,000'
                        },
                        {
                            optionLabel: 'over $10,000,000',
                            optionValue: 'Over $10,000,000'
                        },
                    ],
                    required: true
                },
                {
                    label: "Do you own any rental properties?",
                    name: 'hasRentalProperties',
                    id: 'hasRentalProperties',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'rentalProperties',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'rentalProperties',
                        extraInputType: 'number',
                        extraInputMin: 1
                    }
                },
                {
                    label: "Have you bought or sold any rental properties?",
                    name: 'buySellRentalChecked',
                    id: 'buySellRentalChecked',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'buySellRental',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'buySellRental',
                        extraInputType: 'number',
                        extraInputMin: 1
                    }
                },
                {
                    label: "Is this the first year you are filing for tax return?",
                    name: 'firstYear',
                    id: 'firstYear',
                    type: 'checkbox',
                },
                {
                    label: "Books not a tax basis",
                    name: 'taxBasis',
                    id: 'taxBasis',
                    type: 'checkbox',
                },
                {
                    label: "Books Not Reconciled or Needs AJE's",
                    name: 'notReconciled',
                    id: 'notReconciled',
                    type: 'checkbox',
                },
                {
                    label: "Have you sold or purchased any assets?",
                    name: 'assets',
                    id: 'assets',
                    type: 'checkbox',
                },
                {
                    label: "Do you have any assets that require a depreciation deduction?",
                       name: 'assetsDeprec',
                    id: 'assetsDeprec',
                    type: 'checkbox',
                }
            ]

            // BUSINESS COLUMN 2
            specArr = [
                {
                    label: 'Sale of Business Assets',
                    name: 'saleOfBusinessAssetsChecked',
                    id: 'saleOfBusinessAssetsChecked',
                    type: 'checkbox',
                    containerClasses: 'flex-col',
                    opensInput: {
                        extraInputName: 'saleOfBusinessAssets',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'saleOfBusinessAssets',
                        extraInputType: 'number',
                        extraInputMin: 1,
                        extraInputPlaceholder: 'How many?',
                    },
                    requirePlatPrep: true,
                },
                {
                    label: 'Cancellation Of Debt',
                    name: 'cancellationOfDebt',
                    id: 'cancellationOfDebt',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Cannabis',
                    name: 'cannabis',
                    id: 'cannabis',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Publicly Traded Partnerships',
                    name: 'publiclyTradedPartnerships',
                    id: 'publiclyTradedPartnerships',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'FBAR Form 114',
                    name: 'fbar',
                    id: 'fbar',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
            ];
            break;
        // BUSINESS INPUTS END

        // SPECIALTY INPUTS (1041, 706, 709, 990) START
        // SPECIALTY 1041 START
        // SPECIALTY 1041 COLUMN 1
        case '1041':
            genArr = [
                ...taxYearOptions,
                {
                    label: 'Trust Distribution',
                    name: 'trustDistributions',
                    id: 'trustDistributions',
                    type: 'select',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    inputContainerClasses: 'radio-input-container',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'Trust/No Distributions',
                            optionValue: 'Trust/No Distributions'
                        },
                        {
                            optionLabel: 'Trust With Distributions',
                            optionValue: 'Trust With Distributions'
                        },
                    ],
                    required: true
                },
                {
                    label: 'Gross Income',
                    name: 'grossIncome',
                    id: 'grossIncome',
                    type: 'select',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    inputContainerClasses: 'radio-input-container',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'Less Than $500,000',
                            optionValue: 'Less Than $500,000'
                        },
                        {
                            optionLabel: '$500,000 to $2,000,000',
                            optionValue: '$500,000 to $2,000,000'
                        },
                        {
                            optionLabel: '$2,000,000 to $10,000,000',
                            optionValue: '$2,000,000 to $10,000,000'
                        },
                    ],
                    required: true
                },
                {
                    label: 'Do you have any beneficiaries?',
                    name: 'numOfBeneficieriesChecked',
                    id: 'numOfBeneficieriesChecked',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'numOfBeneficieries',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'numOfBeneficieries',
                        extraInputType: 'number',
                        extraInputMin: 1
                    }
                },
                {
                    label: "Do you own any rental properties?",
                    name: 'hasRentalProperties',
                    id: 'hasRentalProperties',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'rentalProperties',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'rentalProperties',
                        extraInputType: 'number',
                        extraInputMin: 1
                    }
                },
                {
                    label: "Have you bought or sold any rental properties?",
                    name: 'buySellRentalChecked',
                    id: 'buySellRentalChecked',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'buySellRental',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'buySellRental',
                        extraInputType: 'number',
                        extraInputMin: 1
                    }
                },
                {
                    label: 'Sale of Business Assets',
                    name: 'saleOfBusinessAssetsChecked',
                    id: 'saleOfBusinessAssetsChecked',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'saleOfBusinessAssets',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'saleOfBusinessAssets',
                        extraInputType: 'number',
                        extraInputMin: 1
                    }
                },
                {
                    label: "Is this your first year filing for this tax return?",
                    name: 'firstYear',
                    id: 'firstYear',
                    type: 'checkbox',
                },
                {
                    label: "Books not a tax basis",
                    name: 'taxBasis',
                    id: 'taxBasis',
                    type: 'checkbox',
                },
                {
                    label: "Books Not Reconciled or Needs AJE's",
                    name: 'notReconciled',
                    id: 'notReconciled',
                    type: 'checkbox',
                },
                {
                    label: "Have you sold or purchased assets?",
                    name: 'assets',
                    id: 'assets',
                    type: 'checkbox',
                },
                {
                    label: "Do you have assets that require a depreciation deduction?",
                    name: 'assetsDeprec',
                    id: 'assetsDeprec',
                    type: 'checkbox',
                }
            ];

            // SPECIALTY 1041 COLUMN 2
            specArr = [
                {
                    label: 'Bankruptcy Estate',
                    name: 'bankruptcyEstate',
                    id: 'bankruptcyEstate',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Pooled Income Fund',
                    name: 'pooledIncomeFund',
                    id: 'pooledIncomeFund',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'Non-exempt Charitable Trust',
                    name: 'nonExemptCharitableTrust',
                    id: 'nonExemptCharitableTrust',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'NOL Carryback',
                    name: 'nolCarryback',
                    id: 'nolCarryback',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
                {
                    label: 'FBAR Form 114',
                    name: 'fbar',
                    id: 'fbar',
                    type: 'checkbox',
                    requirePlatPrep: true,
                },
            ];
            break;
        // SPECIALTY 1041 END

        // SPECIALTY 706 START
        case '706':
            // SPECIALTY 706 COLUMN 1
            genArr = [
                {
                    label:'Enter date of death',
                    name:'dateOfDeath',
                    id:'dateOfDeath',
                    type:'date',
                    required:true,
                    staticDate:true,
                    allInputClass: 'past-date-restriction',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    inputContainerClasses: 'radio-input-container',
                },
                {
                    label: 'Stocks & Bonds',
                    name: 'stocksAndBonds',
                    id: 'stocksAndBonds',
                    type: 'checkbox'
                },
                {
                    label: 'Real Estate',
                    name: 'realEstate',
                    id: 'realEstate',
                    type: 'checkbox'
                },
                {
                    label: 'Closely Held Business',
                    name: 'closelyHeldBusiness',
                    id: 'closelyHeldBusiness',
                    type: 'checkbox'
                },
                {
                    label: 'Jointly Owned Property',
                    name: 'jointlyOwnedProperty',
                    id: 'jointlyOwnedProperty',
                    type: 'checkbox'
                },
                {
                    label: 'Life Insurance On Decedent',
                    name: 'lifeInsuranceOnDecedent',
                    id: 'lifeInsuranceOnDecedent',
                    type: 'checkbox'
                },
                {
                    label: 'Mortgages/Debt',
                    name: 'mortgagesAndDebt',
                    id: 'mortgagesAndDebt',
                    type: 'checkbox'
                },
                {
                    label: "Transfers in Decedant's Life (Previously Filed Form 709's)",
                    name: 'transfersInDecedentsLife',
                    id: 'transfersInDecedentsLife',
                    type: 'checkbox'
                },
                {
                    label: 'Bequest To Surviving Spouse',
                    name: 'bequestToSurvivingSpouse',
                    id: 'bequestToSurvivingSpouse',
                    type: 'checkbox'
                },
                {
                    label: 'Have A GST',
                    name: 'haveGST',
                    id: 'haveGST',
                    type: 'checkbox'
                },
                {
                    label: 'Portability',
                    name: 'portability',
                    id: 'portability',
                    type: 'checkbox'
                },
                {
                    label: 'Gross Assets',
                    name: 'grossAssets',
                    id: 'grossAssets',
                    type: 'select',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    inputContainerClasses: 'radio-input-container',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'under $5,600,000',
                            optionValue: 'Less Than $5,600,000'
                        },
                        {
                            optionLabel: 'between $5,600,000 and $10,000,000',
                            optionValue: '$5,600,000 to $10,000,000'
                        },
                        {
                            optionLabel: 'Over $10,000,000',
                            optionValue: 'Over $10,000,000'
                        }
                    ],
                    required: true
                }
            ];

            break;
        // SPECIALTY 706 END

        // SPECIALTY 709 START
        case '709':
            // SPECIALTY 709 COLUMN 1
            genArr = [
                {
                    label:'Date of gift',
                    name:'dateOfGift',
                    id:'dateOfGift',
                    type:'date',
                    required:true,
                    staticDate:true,
                    allInputClass: 'past-date-restriction',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    inputContainerClasses: 'radio-input-container',
                },
                {
                    label: 'Prior Gifts Made',
                    name: 'priorGiftsMade',
                    id: 'priorGiftsMade',
                    type: 'checkbox'
                },
                {
                    label: 'Gift Split w/ Spouse',
                    name: 'giftSplitWithSpouse',
                    id: 'giftSplitWithSpouse',
                    type: 'checkbox'
                },
                {
                    label: 'Gifted Closely Held Business',
                    name: 'giftedCloselyHeldBusiness',
                    id: 'giftedCloselyHeldBusiness',
                    type: 'checkbox'
                },
                {
                    label: 'Have you gifted real estate?',
                    name: 'giftedRealEstate',
                    id: 'giftedRealEstate',
                    type: 'checkbox'
                },
                {
                    label: 'Do you have a GST?',
                    name: 'haveGST',
                    id: 'haveGST',
                    type: 'checkbox'
                },
                {
                    label: 'What is your gross gift amount?',
                    name: 'grossGiftAmount',
                    id: 'grossGiftAmount',
                    type: 'select',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    inputContainerClasses: 'radio-input-container',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'under $500,000',
                            optionValue: 'Less Than $500,000'
                        },
                        {
                            optionLabel: 'between $500,000 and $5,000,000',
                            optionValue: '$500,000 to $5,000,000'
                        },
                        {
                            optionLabel: 'over $5,000,000',
                            optionValue: 'Over $5,000,000'
                        }
                    ],
                    required: true
                },
                {
                    label: 'Do you have any donees?',
                    name: 'numOfDoneesChecked',
                    id: 'numOfDoneesChecked',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'numOfDonees',
                        extraInputLabel:'Enter quantity',
                        extraInputId: 'numOfDonees',
                        extraInputType: 'number',
                        extraInputMin: 1,
                        extraInputRequired: true
                    }
                }
            ]
            break;
        // SPECIALTY 709 END

        // SPECIALTY 990 START
        case '990':
            // SPECIALTY 990 COLUMN 1
            genArr = [
                ...taxYearOptions,
                {
                    label: 'Do you have a private foundation?',
                    name: 'privateFoundation',
                    id: 'privateFoundation',
                    type: 'checkbox'
                },
                {
                    label: 'Do you have a political organization?',
                    name: 'politicalOrganization',
                    id: 'politicalOrganization',
                    type: 'checkbox'
                },
                {
                    label: 'Do you have a private charity?',
                    name: 'privateCharity',
                    id: 'privateCharity',
                    type: 'checkbox'
                },
                {
                    label: 'Do you have churches?',
                    name: 'churches',
                    id: 'churches',
                    type: 'checkbox'
                },
                {
                    label: 'What is your gross receipts amount?',
                    name: 'grossReceipts',
                    id: 'grossReceipts',
                    type: 'select',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    inputContainerClasses: 'radio-input-container',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'under $500,000',
                            optionValue: 'Less Than $500,000'
                        },
                        {
                            optionLabel: 'between $500,000 and $2,000,000',
                            optionValue: '$500,000 to $2,000,000'
                        },
                        {
                            optionLabel: 'over $2,000,000',
                            optionValue: 'Over $2,000,000'
                        }
                    ],
                    required: true
                },
                {
                    label: "Is this your first year  filing for this tax return?",
                    name: 'firstYear',
                    id: 'firstYear',
                    type: 'checkbox',
                },
                {
                    label: "Books not a tax basis",
                    name: 'taxBasis',
                    id: 'taxBasis',
                    type: 'checkbox',
                },
                {
                    label: "Books Not Reconciled or Needs AJE's",
                    name: 'notReconciled',
                    id: 'notReconciled',
                    type: 'checkbox',
                },
                {
                    label: "Have you sold or purchased assets?",
                    name: 'assets',
                    id: 'assets',
                    type: 'checkbox',
                },
                {
                    label: "Do you have assets that require a depreciation deduction?",
                    name: 'assetsDeprec',
                    id: 'assetsDeprec',
                    type: 'checkbox',
                }
            ]
            break;
        // SPECIALTY 990 END
        // SPECIALTY INPUTS END

        // E-COMMERCE INPUTS START
        // TAX RESEARCH START
        case 'Tax Research':
            // TAX RESEARCH COLUMN 1
            genArr = [
                {
                    label: 'Google Search',
                    name: 'taxAuthority',
                    id: 'google',
                    value: 'Google Search',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'googleEstimate',
                        extraInputId: 'googleEstimate',
                        extraInputRequired: true,
                        extraInputType: 'number',
                        extraInputMin: 0.1
                    },
                    required: true
                },
                {
                    label: 'Internal Revenue Code',
                    name: 'taxAuthority',
                    id: 'internalRevenueCode',
                    value: 'Internal Revenue Code',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'internalRevenueCodeEstimate',
                        extraInputId: 'internalRevenueCodeEstimate',
                        extraInputRequired: true,
                        extraInputType: 'number',
                        extraInputMin: 0.1
                    },
                    required: true
                },
                {
                    label: 'Treasury Regulations',
                    name: 'taxAuthority',
                    id: 'treasuryRegulations',
                    value: 'Treasury Regulations',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'treasuryRegulationsEstimate',
                        extraInputId: 'treasuryRegulationsEstimate',
                        extraInputRequired: true,
                        extraInputType: 'number',
                        extraInputMin: 0.1
                    },
                    required: true
                },
                {
                    label: 'Case Law',
                    name: 'taxAuthority',
                    id: 'caseLaw',
                    value: 'Case Law',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'caseLawEstimate',
                        extraInputId: 'caseLawEstimate',
                        extraInputRequired: true,
                        extraInputType: 'number',
                        extraInputMin: 0.1
                    },
                    required: true
                },
                {
                    label: 'Revenue Ruling',
                    name: 'taxAuthority',
                    id: 'revenueRuling',
                    value: 'Revenue Ruling',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'revenueRulingEstimate',
                        extraInputId: 'revenueRulingEstimate',
                        extraInputRequired: true,
                        extraInputType: 'number',
                        extraInputMin: 0.1
                    },
                    required: true
                },
                {
                    label: 'Revenue Procedure',
                    name: 'taxAuthority',
                    id: 'revenueProcedure',
                    value: 'Revenue Procedure',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'revenueProcedureEstimate',
                        extraInputId: 'revenueProcedureEstimate',
                        extraInputRequired: true,
                        extraInputType: 'number',
                        extraInputMin: 0.1
                    },
                    required: true
                },
                {
                    label: 'Notices',
                    name: 'taxAuthority',
                    id: 'notices',
                    value: 'Notices',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'noticesEstimate',
                        extraInputId: 'noticesEstimate',
                        extraInputRequired: true,
                        extraInputType: 'number',
                        extraInputMin: 0.1
                    },
                    required: true
                },
                {
                    label: 'Internal Revenue Bulletin',
                    name: 'taxAuthority',
                    id: 'internalRevenueBulletin',
                    value: 'Internal Revenue Bulletin',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'internalRevenueBulletinEstimate',
                        extraInputId: 'internalRevenueBulletinEstimate',
                        extraInputRequired: true,
                        extraInputType: 'number',
                        extraInputMin: 0.1
                    },
                    required: true
                },
                {
                    label: 'Tax Articles Or Publications',
                    name: 'taxAuthority',
                    id: 'taxArticlesOrPublications',
                    value: 'Tax Articles Or Publications',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'taxArticlesOrPublicationsEstimate',
                        extraInputId: 'taxArticlesOrPublicationsEstimate',
                        extraInputRequired: true,
                        extraInputType: 'number',
                        extraInputMin: 0.1
                    },
                    required: true
                },
                {
                    label: 'Announcements',
                    name: 'taxAuthority',
                    id: 'announcements',
                    value: 'Announcements',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'announcementsEstimate',
                        extraInputId: 'announcementsEstimate',
                        extraInputRequired: true,
                        extraInputType: 'number',
                        extraInputMin: 0.1
                    },
                    required: true
                },
                {
                    label: 'Tax Opinion',
                    name: 'taxAuthority',
                    id: 'taxOpinion',
                    value: 'Tax Opinion',
                    type: 'checkbox',
                    opensInput: {
                        extraInputName: 'taxOpinionEstimate',
                        extraInputId: 'taxOpinionEstimate',
                        extraInputRequired: true,
                        extraInputType: 'number',
                        extraInputMin: 1,
                        extraInputLabel:'EST HOURS',
                        extraInputStep:0.1
                    },
                    required: true
                }
            ];

            // TAX RESEARCH COLUMN 2
            specArr = [
                {
                    label: 'Summary of Facts',
                    name: 'summaryOfFacts',
                    id: 'summaryOfFacts',
                    type: 'textarea',
                    cols: '50',
                    rows: '10',
                    required: true,
                    excludeFromSelectionsList:true
                },
                {
                    label: 'Tax Issue/Question',
                    name: 'taxIssue',
                    id: 'taxIssue',
                    type: 'textarea',
                    cols: '50',
                    rows: '10',
                    required: true,
                    excludeFromSelectionsList:true
                }
            ];
            break;
        // TAX RESEARCH END

        // TAX PLANNING START
        case 'Tax Planning':
            // TAX PLANNING COLUMN 1
            genArr = [
                ...taxYearOptions,
                {
                    label:'Taxpayer DOB',
                    name:'taxPayerDOB',
                    id:'taxPayerDOB',
                    type:'date',
                    required:true,
                    filingName,
                    allInputClass:'past-date-restriction',
                    noQuest:true,
                    inputAltName: 'dateOfBirth',
                    staticDate:true
                },
                {
                    label:'Taxpayer Occupation',
                    name:'taxPayerOccupation',
                    id:'taxPayerOccupation',
                    type:'text',
                    required:true,
                    filingName,
                    noQuest:true
                },
                {
                    label:'Number of Dependents',
                    name:'numberOfDependents',
                    id:'numberOfDependents',
                    type:'number',
                    required:true,
                    filingName,
                    noQuest:true,
                    min:0
                },
                {
                    label: 'Filing Status',
                    name: 'filingStatus',
                    id: 'filingStatus',
                    type: 'select',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'Single',
                            optionValue: 'Single'
                        },
                        {
                            optionLabel: 'Married, Filing Jointly (MFJ)',
                            optionValue: 'Married, Filing Jointly (MFJ)',
                            optionOpensInput: [
                                {
                                    optionOpenedLabel: 'Spouse DOB',
                                    optionOpenedName: 'spouseDOB',
                                    optionOpenedId: 'spouseDOB',
                                    optionOpenedType: 'date',
                                    optionOpenedRequired: true,
                                    allInputClass:'past-date-restriction',
                                },
                                {
                                    optionOpenedLabel: 'Spouse Occupation',
                                    optionOpenedName: 'spouseOccupation',
                                    optionOpenedId: 'spouseOccupation',
                                    optionOpenedType: 'text',
                                    optionOpenedRequired: true,
                                    allInputClass:'past-date-restriction',
                                },
                            ]
                        },
                        {
                            optionLabel: 'Married, Filing Separately (MFS)',
                            optionValue: 'Married, Filing Separately (MFS)'
                        },
                        {
                            optionLabel: 'Head of Household (HOH)',
                            optionValue: 'Head of Household (HOH)'
                        },
                        {
                            optionLabel: 'Widow/Widower',
                            optionValue: 'Widow/Widower'
                        },
                    ],
                    required: true
                },
                {
                    label:'Accredited Investor',
                    name:'accreditedInvestor',
                    id:'accreditedInvestor',
                    type:'checkbox',
                    additionalInfoPopup:{
                        linkText:'More info',
                        linkId:'accreditedInvestorInfo',
                        content:`
                            <p>To qualify as an accredited investor, an individual or entity must meet certain income, net worth, or professional criteria set by the U.S. Securities and Exchange Commission (SEC). The primary criteria are as follows:</p>
                            <ol>
                                <h2>Individuals</h2>

                                <li><p>Income Criteria:</p>
                                    <ul>
                                        <li><strong>Individual Income: </strong> An individual must have an annual income of at least $200,000 (or $300,000 together with a spouse or spousal equivalient) in each of the last two years and expect to maintain the same level of income in the current year.</li>
                                        <li>Definition of Income
                                            <ul style="list-style-type:none">
                                                <li><strong>1.1. Inclusions:</strong></li>
                                                <li>1.2. The income considered  includes all earned income, such as salaries, wages, bonuses, commissions, and other forms of compensation.</li>
                                                <li>1.3. It also includes any income from investments, rental income, and other sources of passive income.</li>
                                                <li><strong>1.4. Exclusions:</strong></li>
                                                <li>1.5. The calculation typically excludes unrealized gains, inheritances, gifts, or one-time windfalls that do not represent ongoing income.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><p>Net Worth Criteria:</p>
                                    <ul>
                                        <li><strong>Individual Net Worth: </strong>An individual must have a net worth of over $1 million, either alone or together with a spouse or spousal equivalent, excluding the value of the primary residence.</li>
                                    </ul>
                                </li>
                                <li>
                                    <p>Professional Criteria:</p>
                                    <ul>
                                        <li><strong>Professional Certifications: </strong> An individual holding certai professional certifications, designations, or credentials, such as a Series 7, Series 65, or a Series 82 license, may qualify.</li>
                                        <li><strong>Knowledgeable Employees: </strong> Employees of a private fund who are considered "knowledgeable employees" can qualify.</li>
                                    </ul>
                                </li>

                                <h2>Entities</h2>
                                <li><p>Entity Net Worth:</p>
                                    <ul>
                                        <li><strong>Entities: </strong>A business entity must have assets exceeding $5 million.</li>
                                        <li><strong>Entities Owned by Accredited Investors: </strong>An entity in which all of the equity owners are accredited investors.</li>
                                    </ul>
                                </li>
                                <li><p>Types of Entities:</p>
                                    <ul>
                                        <li><strong>Certain Trusts: </strong>A trust with assets in excess of $5 million, not formed specifically to acquire the securities offered, and whose purchase is directed by a sophisticated person.</li>
                                        <li><strong>Certain Entities: </strong>Banks, insurance companries, registered investment companies, business development companies, or small businesss investment companies.</li>
                                        <li><strong>Certain Employee Benefit Plans: </strong>Employee benefit plans with assets over $5 million or where the plan's investment decisions are made by a plan fiduciary who is a bank, insurance company, or registered investment advisor.</li>
                                    </ul>
                                </li>

                            </ol>
                        `
                    }
                },
                {
                    label: 'Find ALL Potential Tax Savings - Individual',
                    name: 'findAllTaxSavingsIndividual',
                    id: 'findAllTaxSavingsIndividual',
                    type: 'checkbox'
                },
                {
                    label: 'Find ALL Potential Tax Savings - Business',
                    name: 'findAllTaxSavingsBusiness',
                    id: 'findAllTaxSavingsBusiness',
                    type: 'checkbox'
                },
                {
                    label: 'Tax Plan For My Existing Company',
                    name: 'taxPlanForMyExistingCompany',
                    id: 'taxPlanForMyExistingCompany',
                    type: 'checkbox'
                },
                {
                    label: "I'm Buying or Selling a Principal Residence",
                    name: 'buyOrSellPrincipalResidence',
                    id: 'buyOrSellPrincipalResidence',
                    type: 'checkbox'
                },
                {
                    label: "I'm Buying or Selling a Rental Property",
                    name: 'buyOrSellRentalProperty',
                    id: 'buyOrSellRentalProperty',
                    type: 'checkbox'
                },
                {
                    label: 'I want to Acquire a New Business',
                    name: 'newBusiness',
                    id: 'newBusiness',
                    type: 'checkbox'
                },
                {
                    label: 'I Sold My Business or Closely Held Stock',
                    name: 'soldBusinessOrCloselyHeldStock',
                    id: 'soldBusinessOrCloselyHeldStock',
                    type: 'checkbox'
                },
                {
                    label: 'I Want to Do a Tax Free Exchange',
                    name: 'taxFreeExchange',
                    id: 'taxFreeExchange',
                    type: 'checkbox'
                },
                {
                    label: "I Need Help With IRA's, Roths, Pensions and Defined Benefit Plans",
                    name: 'needHelpWithIRA',
                    id: 'needHelpWithIRA',
                    type: 'checkbox'
                },
                {
                    label: "I Need Help With ESOP's (Employee Stock Options) and RSU's (Restricted Stock Units)",
                    name: 'needHelpWithESOP',
                    id: 'needHelpWithESOP',
                    type: 'checkbox'
                },
                {
                    label: 'Forensic Accounting',
                    name: 'forensicAccounting',
                    id: 'forensicAccounting',
                    type: 'checkbox'
                },
                {
                    label: 'Internet Sales/International Tax',
                    name: 'internetSales',
                    id: 'internetSales',
                    type: 'checkbox'
                },
                // {
                //     label: 'Estate Tax',
                //     name: 'estateTax',
                //     id: 'estateTax',
                //     type: 'checkbox'
                // },
                // {
                //     label: 'Exempt Organization',
                //     name: 'exemptOrganization',
                //     id: 'exemptOrganization',
                //     type: 'checkbox'
                // },
                {
                    label: 'Social Security Benefits',
                    name: 'socialSecurityBenefits',
                    id: 'socialSecurityBenefits',
                    type: 'checkbox'
                },
                {
                    label: 'Special Projects',
                    name: 'specialProjects',
                    id: 'specialProjects',
                    type: 'checkbox'
                },
                {
                    label: 'Other Tax Planning',
                    name: 'otherAssistance',
                    id: 'otherAssistance',
                    type: 'checkbox'
                },
            ];

            // TAX PLANNING COLUMN 2
            specArr = [
                // {
                //     label: 'Notes to tax planner',
                //     name: 'reviewerNotes',
                //     id: 'reviewerNotes',
                //     type: 'textarea',
                //     cols: '50',
                //     rows: '10',
                //     noQuest: true,
                //     placeholder: 'Please provide as many facts as possible and as much detail as possible so your tax planner can give you the most accurate answer'
                // }
            ];
            break;
        // TAX PLANNING END

        // WEALTH MANAGEMENT START
        case 'Wealth Management':
            // WEALTH MANAGEMENT COLUMN 1
            genArr = [
                ...taxYearOptions,
                {
                    label:'Due date',
                    name:'finishBy',
                    id:'finishBy',
                    type:'date',
                    required:true,
                    filingName,
                    allInputClass:'due-date-3days',
                },
                {
                    label: 'What are you looking for in a financial advisor?',
                    name: 'reasonForFinancialAdvisor',
                    id: 'reasonForFinancialAdvisor',
                    type: 'multi-checkbox',
                    options: [
                        {
                            optionLabel: 'Create a Diversified Investment Portfolio',
                            optionValue: 'Create a Diversified Investment Portfolio'
                        },
                        {
                            optionLabel: 'Save Money on my Taxes',
                            optionValue: 'Save Money'
                        },
                        {
                            optionLabel: 'Manage my Investments so I Don\'t Have To',
                            optionValue: 'Manage Investments'
                        },
                        {
                            optionLabel: 'Beat the Performance of the Market',
                            optionValue: 'performance'
                        }
                    ],
                },
                {
                    label: 'Which financial plan are you interested in?',
                    name: 'consultation',
                    id: 'consultation',
                    type: 'select',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'One-hour Consultation',
                            optionValue: 'One-hour Consultation'
                        },
                        {
                            optionLabel: 'Comprehensive Plan',
                            optionValue: 'Comprehensive Plan'
                        }
                    ],
                    required: true
                },
                {
                    label: 'Total value of your cash and liquid investments?',
                    name: 'cashAndLiquidInvestments',
                    id: 'cashAndLiquidInvestments',
                    type: 'select',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'Less than $100,000',
                            optionValue: 'Less than $100,000'
                        },
                        {
                            optionLabel: '$100,000 to $500,000',
                            optionValue: 'From $100,000 to $500,000'
                        },
                        {
                            optionLabel: '$500,000 to $1M',
                            optionValue: 'From $500,000 to $1M'
                        },
                        {
                            optionLabel: 'More than $1M',
                            optionValue: 'More than $1M'
                        }
                    ],
                    required: true
                },
                {
                    label: 'Annual pre-tax earnings?',
                    name: 'annualPreTaxEarnings',
                    id: 'annualPreTaxEarnings',
                    type: 'select',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'Less than $50,000',
                            optionValue: 'Less than $50,000'
                        },
                        {
                            optionLabel: '$50,000 to $100,000',
                            optionValue: '50k to 100k'
                        },
                        {
                            optionLabel: '$100,000 to $200,000',
                            optionValue: '100k to 200k'
                        },
                        {
                            optionLabel: 'More than $200,000',
                            optionValue: 'More than 200k'
                        }
                    ],
                    required: true
                },
                {
                    label: 'What is your current age?',
                    name: 'currentAge',
                    id: 'currentAge',
                    type: 'select',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'Under 30',
                            optionValue: 'Under 30'
                        },
                        {
                            optionLabel: '31 to 41',
                            optionValue: '31 to 41'
                        },
                        {
                            optionLabel: '41 to 55',
                            optionValue: '41 to 55'
                        },
                        {
                            optionLabel: '55 to 70',
                            optionValue: '55 to 70'
                        },
                        {
                            optionLabel: 'Over 70',
                            optionValue: 'Over 70'
                        }
                    ],
                    required: true
                },
                {
                    label: 'Primary reason for saving?',
                    name: 'primaryReasonForSaving',
                    id: 'primaryReasonForSaving',
                    type: 'select',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'General Savings',
                            optionValue: 'General Savings'
                        },
                        {
                            optionLabel: 'College Savings',
                            optionValue: 'College Savings'
                        },
                        {
                            optionLabel: 'Buying A Home',
                            optionValue: 'Buying A Home'
                        },
                        {
                            optionLabel: 'Retirement',
                            optionValue: 'Retirement'
                        },
                        {
                            optionLabel: 'Other',
                            optionValue: 'Other'
                        }
                    ],
                    required: true
                },
                {
                    label: 'Which if the following best describes your household?',
                    name: 'householdDescription',
                    id: 'householdDescription',
                    type: 'select',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'Single, No Dependents',
                            optionValue: 'Single, No Dependents'
                        },
                        {
                            optionLabel: 'Single, at Least 1 Dependent',
                            optionValue: 'Single, at Least 1 Dependent'
                        },
                        {
                            optionLabel: 'Dual Income, No Dependents',
                            optionValue: 'Dual Income, No Dependents'
                        },
                        {
                            optionLabel: 'Retired or Financially Independent',
                            optionValue: 'Retired or Financially Independent'
                        },
                        {
                            optionLabel: 'Other',
                            optionValue: 'Other'
                        }
                    ],
                    required: true
                },
                {
                    label: 'When deciding to invest your money, which do you care about more?',
                    name: 'investingMoneyInterest',
                    id: 'investingMoneyInterest',
                    type: 'select',
                    options: [
                        {
                            optionLabel: 'Please Select',
                            optionDisabled: true,
                            optionSelected: true
                        },
                        {
                            optionLabel: 'Maximizing Gains',
                            optionValue: 'Maximize Gains'
                        },
                        {
                            optionLabel: 'Minimizing Losses',
                            optionValue: 'Minimize Losses'
                        },
                        {
                            optionLabel: 'Both Equally',
                            optionValue: 'Both Equally'
                        }
                    ],
                    required: true
                },
                {
                    label: "The global market is often volatile. If your entire investment portfolio lost 10% of its value in a month during a market decline, what would you do?",
                    name: "marketCrashQuestion",
                    id: "marketCrashQuestion",
                    type: "select",
                    options: [
                        {
                            optionLabel: "Please Select",
                            optionDisabled: true,
                            optionSelected: true,
                        },
                        {
                            optionLabel: "Sell All of my Investments",
                            optionValue: "Sell All of my Investments",
                        },
                        {
                            optionLabel: "Sell Some of my Investments",
                            optionValue: "Sell Some of my Investments",
                        },
                        {
                            optionLabel: "Buy More Investments",
                            optionValue: "Buy More Investments",
                        },
                    ],
                    required: true,
                },
            ];

            // WEALTH MANAGEMENT COLUMN 2
            // specArr = [
               
            // ];
            break;
        // WEALTH MANAGEMENT END

        // AUDITED START
        case 'Audited':
            // AUDITED COLUMN 1
            genArr = [
                {
                    label: 'Compilation (No assurance)',
                    name: 'compilation',
                    id: 'compilation',
                    type: 'checkbox'
                },
                {
                    label: 'Review (Limited level of assurance)',
                    name: 'review',
                    id: 'review',
                    type: 'checkbox'
                },
                {
                    label: 'Audit (Highest level of assurance, usually required by large banks)',
                    name: 'audit',
                    id: 'audit',
                    type: 'checkbox'
                },
                {
                    label: "Was your book previously audited or reviewed?",
                    name: "previouslyAudited",
                    id: "previouslyAudited",
                    type: "select",
                    options: [
                        {
                            optionLabel: "Please Select",
                            optionDisabled: true,
                            optionSelected: true,
                        },
                        {
                            optionLabel: "Yes",
                            optionValue: "Yes",
                            optionOpensInput: {
                                optionOpenedLabel: 'Enter Year(s)',
                                optionOpenedName: 'previouslyAuditedYears',
                                optionOpenedId: 'previouslyAuditedYears',
                                optionOpenedType: 'text',
                                optionOpenedRequired: true
                            }
                        },
                        {
                            optionLabel: "No",
                            optionValue: "No",
                        },
                    ],
                    required: true,
                },
                {
                    label: "What is the quality of your financial records?",
                    name: "qualityOfFinancialRecords",
                    id: "qualityOfFinancialRecords",
                    type: "select",
                    options: [
                        {
                            optionLabel: "Please Select",
                            optionDisabled: true,
                            optionSelected: true,
                        },
                        {
                            optionLabel: "Shoebox of Receipts",
                            optionValue: "Shoebox of Receipts",
                        },
                        {
                            optionLabel: "Tracked in Spreadsheets",
                            optionValue: "Tracked in Spreadsheets",
                        },
                        {
                            optionLabel: "Full Accounting Records in Filed System",
                            optionValue: "Full Accounting Records in Filed System",
                        },
                        {
                            optionLabel: "Full Accounting Records plus Monthly/Quarterly Formal Reports",
                            optionValue: "Full Accounting Records plus Monthly/Quarterly Formal Reports",
                        },
                        {
                            optionLabel: "Books prepared by CPA",
                            optionValue: "Books prepared by CPA",
                        },
                    ],
                    required: true,
                },
                {
                    label: "What is your capital structure?",
                    name: "capitolStructure",
                    id: "capitolStructure",
                    type: "select",
                    options: [
                        {
                            optionLabel: "Please Select",
                            optionDisabled: true,
                            optionSelected: true,
                        },
                        {
                            optionLabel: "Single Owner (Sole Proprietor, LLC, S-Corp)",
                            optionValue: "Single Owner (Sole Proprietor, LLC, S-Corp)",
                        },
                        {
                            optionLabel: "Multi-Owner LLC/S-Corp",
                            optionValue: "Multi-Owner LLC/S-Corp",
                        },
                        {
                            optionLabel: "C-Corporation",
                            optionValue: "C-Corporation",
                        },
                        {
                            optionLabel: "Complex Corporation (multiple share classes)",
                            optionValue: "Complex Corporation (multiple share classes)",
                        },
                        {
                            optionLabel: "Parent-Subsidiary",
                            optionValue: "Parent-Subsidiary",
                        },
                        {
                            optionLabel: "Exempt Organization",
                            optionValue: "Exempt Organization",
                        },
                    ],
                    required: true,
                },
                {
                    label: "Do you have any of the following asset accounts?",
                    name: "assetAccounts",
                    id: "assetAccounts",
                    type: "multi-checkbox",
                    options: [
                        {
                            optionLabel: "Cash",
                            optionValue: "Cash",
                        },
                        {
                            optionLabel: "Accounts Receivable",
                            optionValue: "Accounts Receivable",
                        },
                        {
                            optionLabel: "Loans to others or owners",
                            optionValue: "Loans to others or owners",
                        },
                        {
                            optionLabel: "Inventory",
                            optionValue: "Inventory",
                        },
                        {
                            optionLabel: "Cost basis assets",
                            optionValue: "Cost basis assets",
                        },
                        {
                            optionLabel: "Real estate/buildings",
                            optionValue: "Real estate/buildings",
                        },
                        {
                            optionLabel: "Goodwill/Patents/Other Intangibles",
                            optionValue: "Goodwill/Patents/Other Intangibles",
                        },
                        {
                            optionLabel: "Investments in Entities with a Controlling or Majority Interest",
                            optionValue: "Investments in Entities with a Controlling or Majority Interest",
                        },
                    ],
                    required: true,
                },
                {
                    label: "Do you have any of the following liability accounts?",
                    name: "liabilityAccounts",
                    id: "liabilityAccounts",
                    type: "multi-checkbox",
                    options: [
                        {
                            optionLabel: "Accounts Payable",
                            optionValue: "Accounts Payable",
                        },
                        {
                            optionLabel: "Loans Payable",
                            optionValue: "Loans Payable",
                        },
                        {
                            optionLabel: "Deferred revenues",
                            optionValue: "Deferred revenues",
                        },
                    ],
                    required: true,
                },
            ];

            // AUDITED COLUMN 2
            specArr = [
                {
                    label: "Have you made any contributions or distributions to the business?",
                    name: "contributionsOrDistributions",
                    id: "contributionsOrDistributions",
                    type: "multi-checkbox",
                    options: [
                        {
                            optionLabel: "Current year dividends or distributions",
                            optionValue: "Current year dividends or distributions",
                        },
                        {
                            optionLabel: "Current year capitol contributions",
                            optionValue: "Current year capitol contributions",
                        },
                        {
                            optionLabel: "Not Applicable",
                            optionValue: "Not Applicable",
                            optionDisabled: true,
                            optionSelected: true,
                        },
                    ],
                    required: true,
                },
                {
                    label: "What is the business annual revenue?",
                    name: "annualRevenue",
                    id: "annualRevenue",
                    type: "select",
                    options: [
                        {
                            optionLabel: "Please Select",
                            optionDisabled: true,
                            optionSelected: true,
                        },
                        {
                            optionLabel: "Less than $100,000",
                            optionValue: "Less than 100k",
                        },
                        {
                            optionLabel: "$100,000 to $2M",
                            optionValue: "100k to 2mil",
                        },
                        {
                            optionLabel: "$2M to $5M",
                            optionValue: "2mil to 5mil",
                        },
                        {
                            optionLabel: "$5M to $10M",
                            optionValue: "5mil to 10mil",
                        },
                        {
                            optionLabel: "More than $10M",
                            optionValue: "More than 10mil",
                        },
                    ],
                    required: true,
                },
                {
                    label: "What is your total number of monthly revenue transactions?",
                    name: "revenueTransactions",
                    id: "revenueTransactions",
                    type: "select",
                    options: [
                        {
                            optionLabel: "Please Select",
                            optionDisabled: true,
                            optionSelected: true,
                        },
                        {
                            optionLabel: "Less than 10",
                            optionValue: "Less than 10",
                        },
                        {
                            optionLabel: "10 to 50",
                            optionValue: "10 to 50",
                        },
                        {
                            optionLabel: "More than 50",
                            optionValue: "More than 50",
                        },
                    ],
                    required: true,
                },
                {
                    label: "How are your revenue payments made?",
                    name: "revenuePayments",
                    id: "revenuePayments",
                    type: "multi-checkbox",
                    options: [
                        {
                            optionLabel: "Credit Card (on-site)",
                            optionValue: "Credit Card on-site",
                        },
                        {
                            optionLabel: "Checks/Cash (on-site)",
                            optionValue: "Checks/Cash on-site",
                        },
                        {
                            optionLabel: "Checks/Cash (off-site)",
                            optionValue: "Checks/Cash off-site",
                        },
                        {
                            optionLabel: "Government/Grants",
                            optionValue: "Gov Grants",
                        },
                    ],
                    required: true,
                },
                {
                    label: "What is the total number of your monthly expense transactions?",
                    name: "expenseTransactions",
                    id: "expenseTransactions",
                    type: "select",
                    options: [
                        {
                            optionLabel: "Please Select",
                            optionDisabled: true,
                            optionSelected: true,
                        },
                        {
                            optionLabel: "10 to 50",
                            optionValue: "10 to 50",
                        },
                        {
                            optionLabel: "More than 50",
                            optionValue: "More than 50",
                        },
                    ],
                    required: true,
                },
                {
                    label: "Select the due date of financial report",
                    name: "financialReportDueDate",
                    id: "financialReportDueDate",
                    type: "select",
                    options: [
                        {
                            optionLabel: "Please Select",
                            optionDisabled: true,
                            optionSelected: true,
                        },
                        {
                            optionLabel: "Within 90 days",
                            optionValue: "Within 90 days",
                        },
                        {
                            optionLabel: "Within 60 days",
                            optionValue: "Within 60 days",
                        },
                        {
                            optionLabel: "Within 30 days",
                            optionValue: "Within 30 days",
                        }
                    ],
                    required: true,
                },
                {
                    label: 'Notes to Auditor',
                    name: 'reviewerNotes',
                    id: 'reviewerNotes',
                    type: 'textarea',
                    cols: '50',
                    rows: '10',
                    noQuest: true
                }
            ];
            break;
        // AUDITED END

        // ESTATE PLANNING START
        case 'Estate Planning':
            genArr = [
                ...estatePlanningDueDateOption,
                {
                    label: 'Review my existing wills and/or trusts',
                    name: 'reviewWillsOrTrusts',
                    id: 'reviewWillsOrTrusts',
                    type: 'checkbox'
                },
                {
                    label: 'Consider me for a trust and/or will',
                    name: 'considerForTrustOrWill',
                    id: 'considerForTrustOrWill',
                    type: 'checkbox'
                },
                {
                    label: "Consider a child's or grandchild's irrevocable education trust",
                    name: 'childEducationTrust',
                    id: 'childEducationTrust',
                    type: 'checkbox'
                },
                {
                    label: 'Consider a charitable reminder interest trust for my gifts',
                    name: 'charitableTrustForGifts',
                    id: 'charitableTrustForGifts',
                    type: 'checkbox'
                },
                {
                    label: 'Consider using a private foundation for my gifts',
                    name: 'privateFoundationForGifts',
                    id: 'privateFoundationForGifts',
                    type: 'checkbox'
                },
                {
                    label: 'Prepare a property power of attorney',
                    name: 'preparePropertyPowerOfAttorney',
                    id: 'preparePropertyPowerOfAttorney',
                    type: 'checkbox'
                },
                {
                    label: 'Prepare a financial power of attorney',
                    name: 'prepareFinancialPowerOfAttorney',
                    id: 'prepareFinancialPowerOfAttorney',
                    type: 'checkbox'
                },
                {
                    label: 'Prepare a healthcare power of attorney',
                    name: 'prepareHealthcarePowerOfAttorney',
                    id: 'prepareHealthcarePowerOfAttorney',
                    type: 'checkbox'
                },
                {
                    label: 'Prepare my statement of desires for a designated person',
                    name: 'prepareStatementOfDesires',
                    id: 'prepareStatementOfDesires',
                    type: 'checkbox'
                },
                {
                    label: 'Prepare a guardian appointment for my pet',
                    name: 'guardianAppointmentForPet',
                    id: 'guardianAppointmentForPet',
                    type: 'checkbox'
                },
            ];

            break;
        case 'Estate Planning RET':
            genArr = [
                ...estatePlanningDueDateOption,
                {
                    label: 'Review my assets for estate tax implications',
                    name: 'reviewAssetsForTaxImplications',
                    id: 'reviewAssetsForTaxImplications',
                    type: 'checkbox'
                },
                {
                    label: 'Review my existing wills and/or trusts',
                    name: 'reviewWillsOrTrustsRET',
                    id: 'reviewWillsOrTrustsRET',
                    type: 'checkbox'
                },
                {
                    label: 'Consider a QTIP Trust',
                    name: 'QTIPTrust',
                    id: 'QTIPTrust',
                    type: 'checkbox'
                },
                {
                    label: 'Consider using life insurance to pay estate taxes and business debt',
                    name: 'usingLifeInsurance',
                    id: 'usingLifeInsurance',
                    type: 'checkbox'
                },
                {
                    label: 'Consider a Fractional Interest Trust',
                    name: 'fractionalInterestTrust',
                    id: 'fractionalInterestTrust',
                    type: 'checkbox'
                },
            ];

            break;

        case 'Estate Planning PPA':
            genArr = [
                ...estatePlanningDueDateOption,
                {
                    label: 'Review of Traditional IRA, Retirement Accounts',
                    name: 'reviewTraditionalIRA',
                    id: 'reviewTraditionalIRA',
                    type: 'checkbox'
                },
                {
                    label: 'Review of Qualified Retirement Plans (SEP, Defined Benefit Plans, Etc.)',
                    name: 'reviewQualifiedRetirementPlans',
                    id: 'reviewQualifiedRetirementPlans',
                    type: 'checkbox'
                },
                {
                    label: 'Review of Annuities and Life Insurance',
                    name: 'reviewAnnuitiesAndLifeInsurance',
                    id: 'reviewAnnuitiesAndLifeInsurance',
                    type: 'checkbox'
                },
                {
                    label: 'Consider Filing a Homestead',
                    name: 'filingHomestead',
                    id: 'filingHomestead',
                    type: 'checkbox'
                },
                {
                    label: 'Consider Placing Assets with Spouse',
                    name: 'assetsWithSpouse',
                    id: 'assetsWithSpouse',
                    type: 'checkbox'
                },
                {
                    label: 'Consider a Tenants by Entirety',
                    name: 'tenantsByEntirety',
                    id: 'tenantsByEntirety',
                    type: 'checkbox'
                },
                {
                    label: 'Creation of an Asset Protection Trust',
                    name: 'assetProtectionTrust',
                    id: 'assetProtectionTrust',
                    type: 'checkbox'
                },
                {
                    label: 'Creation of a Family Limited Partnership',
                    name: 'assetFamilyLimitedPartnership',
                    id: 'assetFamilyLimitedPartnership',
                    type: 'checkbox'
                },
                {
                    label: 'Creation of a Land Trust (Privacy of Ownership)',
                    name: 'landTrust',
                    id: 'landTrust',
                    type: 'checkbox'
                },
                {
                    label: 'Consider Equity Stripping from my Assets & a QPRT Trust for my Home',
                    name: 'equityStrippingAndQPRT',
                    id: 'equityStrippingAndQPRT',
                    type: 'select',
                    labelClasses: 'bold mb-5',
                    containerClasses: 'flex-col',
                    inputContainerClasses: 'radio-input-container',
                    options: [
                        {
                            optionLabel: "Please Select",
                            optionDisabled: true,
                            optionSelected: true,
                        },
                        {
                            optionLabel: "Equity Stripping From my Assets",
                            optionValue: "Equity Stripping From my Assets",
                        },
                        {
                            optionLabel: "QPRT Trust for my Home",
                            optionValue: "QPRT",
                        },
                        {
                            optionLabel: "Both",
                            optionValue: "Both",
                        },
                    ],
                    required: true
                },
            ];

            break;

        case 'Estate Planning PBA':
            genArr = [
                ...estatePlanningDueDateOption,
                {
                    label: 'Choose the Right Business Entity',
                    name: 'chooseTheRightBusinessEntity',
                    id: 'chooseTheRightBusinessEntity',
                    type: 'checkbox'
                },
                {
                    label: 'Review of Business Contracts and Procedures',
                    name: 'reviewBusinessContractsAndProcedures',
                    id: 'reviewBusinessContractsAndProcedures',
                    type: 'checkbox'
                },
                {
                    label: 'Review of Proper Business Insurance',
                    name: 'reviewProperBusinessInsurance',
                    id: 'reviewProperBusinessInsurance',
                    type: 'checkbox'
                },
            ];

            break;
            // ESTATE PLANNING END
            
        // E-COMMERCE INPUTS END
    }
    return { col1: genArr, col2: specArr };
}
