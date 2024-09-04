// require('dotenv').config(); // require dotenv
// const cli = require('next/dist/cli/next-dev');

// cli.nextStart(['-p', process.env.PORT || 3005]);


// code to change port

const { spawn } = require('child_process');
require('dotenv').config();

// ISSUE: can't recognize .env variables
const customPort = process.env.PORT || 3005;
const projectDir = process.cwd();

const command = 'npx';
const args = ['next', 'start', '-p', customPort.toString()];

const nextDevProcess = spawn(command, args, { cwd: projectDir, stdio: 'inherit', shell:true });

nextDevProcess.on('error', (error) => {
  console.error('Error starting Next.js development server:', error);
  process.exit(1);
});

// Handle process exit
nextDevProcess.on('exit', (code) => {
  console.log(`Next.js development server exited with code ${code}`);
});
