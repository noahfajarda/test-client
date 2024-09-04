import React from 'react'
import Individual from './Individual/Individual';
import Audited from './Audited/Audited';
import Bookkeeping from './Bookkeeping/Bookkeeping';
import Business from './Business/Business';
import EstatePlanning from './EstatePlanning/EstatePlanning';
import Specialty from './Specialty/Specialty';
import TaxPlanning from './TaxPlanning/TaxPlanning';
import TaxResearch from './TaxResearch/TaxResearch';
import WealthManagement from './WealthManagement/WealthManagement';

export default function FilingType({type, ticket}: {type: string}) {
    const filingTypeOptions = [
        {
            type: "individual",
            component: <Individual ticket={ticket} />
        },
        {
            type: "audited",
            component: <Audited ticket={ticket} />
        },
        {
            type: "bookkeeping",
            component: <Bookkeeping ticket={ticket} />
        },
        {
            type: "business",
            component: <Business ticket={ticket} />
        },
        {
            type: "estate_planning",
            component: <EstatePlanning ticket={ticket} />
        },
        {
            type: "specialty",
            component: <Specialty ticket={ticket} />
        },
        {
            type: "tax_planning",
            component: <TaxPlanning ticket={ticket} />
        },
        {
            type: "tax_research",
            component: <TaxResearch ticket={ticket} />
        },
        {
            type: "wealth_management",
            component: <WealthManagement ticket={ticket} />
        },
    ]

    return filingTypeOptions.find(item => item.type == type)?.component;
}
