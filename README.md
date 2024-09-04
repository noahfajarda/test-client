# README #

Version 3 of the SAM Client app utilizing Node, React, and Next.js.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Project Lead:

- Noah Fajarda

Contributors:

- Momo Roth
- Sina Rafieefar
- Hayk Mnatsakanyan (2Leaf)
- Nelson Li
- Chris Mendes

Design:

- Sharon Xing (2Leaf)
- Eric Marina (2Leaf)

Requirements:

- Node.js LTS v20.10

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Getting Started

Make your way into the base directory, and use the command 'npm i' to install dependency packages

1. Create a file called .env, and assign values to the following variables:

    PORT=3005
    API_URL=http://localhost:3000/
    SESSION_SECRET=(randonstring)
    ENVIRONMENT=LOCAL
    #MESSAGE_DISPLAY=

2. Start the server locally by using the command `npm run dev` -or- `npx next dev -p 3005`

3. Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


## Production Deploy

Be sure to test a full production build locally for any errors before deployment:

1. `npm run build`
2. `npm start`


## Troubleshooting

Error: 

npm WARN read-shrinkwrap This version of npm is compatible with lockfileVersion@1, but package-lock.json was generated for lockfileVersion@2. I'll try to do my best with it!

Solution: Run the following commands in Windows elevated CMD or Powershell (requires Node v8+):

> npm install --global --production npm-windows-upgrade
>
> npm-windows-upgrade
