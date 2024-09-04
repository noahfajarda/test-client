import React from 'react'

export default function NextUITabsStyling({session}: {session: Object;}) {
  return (
    <style>
        {`
            ${session?.whiteLabel?.secondaryColor && `
                span[data-slot="cursor"] {
                    background-color: ${session?.whiteLabel?.secondaryColor};
                }
                div[data-slot="tabContent"] {
                    color: ${session?.whiteLabel?.secondaryLuminosity ? "black" : "white"} !important;
                }
                div[data-slot="tabContent"] > div > div, div[data-slot="tabContent"] > div > p {
                    color: black !important;
                }
                button[tabindex="-1"] > div[data-slot="tabContent"] {
                    color: ${session?.whiteLabel?.luminosity ? "white" : "black"} !important;
                }
            `}
        `}
    </style>
  )
}
