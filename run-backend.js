const { spawn } = require('child_process');
const path = require('path');

const backendDir = path.join(__dirname, 'src', 'backend');

const backend = spawn('node', ['start.js'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true
});

backend.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
});
