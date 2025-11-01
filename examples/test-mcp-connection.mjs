import { spawn } from 'child_process';

const serverProcess = spawn('node', ['dist/index.js'], {
  env: { ...process.env, PLAINLY_API_KEY: 'x6d4qcL3NvfWtcRCpsSjCNNVOQJiaoib' },
  stdio: ['pipe', 'pipe', 'pipe']
});

let responseBuffer = '';
let requestId = 1;

serverProcess.stdout.on('data', (data) => {
  responseBuffer += data.toString();
  const lines = responseBuffer.split('\n');
  
  for (let i = 0; i < lines.length - 1; i++) {
    try {
      const response = JSON.parse(lines[i]);
      console.log('✅ Received:', JSON.stringify(response, null, 2));
    } catch (e) {
      // Not JSON, skip
    }
  }
  responseBuffer = lines[lines.length - 1];
});

serverProcess.stderr.on('data', (data) => {
  console.log('Server:', data.toString().trim());
});

function sendRequest(method, params = {}) {
  const request = {
    jsonrpc: '2.0',
    id: requestId++,
    method,
    params
  };
  console.log(`\n📤 Sending: ${method}`);
  serverProcess.stdin.write(JSON.stringify(request) + '\n');
}

setTimeout(() => {
  sendRequest('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'test-client', version: '1.0.0' }
  });
}, 100);

setTimeout(() => {
  sendRequest('tools/list');
}, 500);

setTimeout(() => {
  sendRequest('resources/list');
}, 1000);

setTimeout(() => {
  sendRequest('prompts/list');
}, 1500);

setTimeout(() => {
  sendRequest('tools/call', {
    name: 'list_projects',
    arguments: {}
  });
}, 2000);

setTimeout(() => {
  console.log('\n✅ MCP Server test completed!');
  serverProcess.kill();
  process.exit(0);
}, 3000);
