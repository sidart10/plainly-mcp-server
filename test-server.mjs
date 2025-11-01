import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Start the server
const server = spawn('node', [join(__dirname, 'dist/index.js')], {
  env: {
    ...process.env,
    PLAINLY_API_KEY: process.env.PLAINLY_API_KEY || 'x6d4qcL3NvfWtcRCpsSjCNNVOQJiaoib'
  },
  stdio: ['pipe', 'pipe', 'pipe']
});

let buffer = '';
let messageCount = 0;

// Handle server output
server.stdout.on('data', (data) => {
  buffer += data.toString();

  // Try to parse complete JSON-RPC messages
  const lines = buffer.split('\n');
  buffer = lines.pop() || ''; // Keep incomplete line in buffer

  for (const line of lines) {
    if (line.trim()) {
      try {
        const response = JSON.parse(line);
        console.log(`\n✅ Response ${++messageCount}:`, JSON.stringify(response, null, 2));
      } catch (e) {
        console.log('Raw output:', line);
      }
    }
  }
});

server.stderr.on('data', (data) => {
  console.log('Server stderr:', data.toString());
});

// Send test requests
function sendRequest(request) {
  console.log(`\n📤 Sending: ${request.method}`);
  server.stdin.write(JSON.stringify(request) + '\n');
}

// Wait a bit for server to start
setTimeout(() => {
  console.log('\n🧪 Testing Plainly MCP Server...\n');

  // 1. Initialize
  sendRequest({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'test-client', version: '1.0.0' }
    }
  });

  // 2. List tools
  setTimeout(() => {
    sendRequest({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list',
      params: {}
    });
  }, 500);

  // 3. List resources
  setTimeout(() => {
    sendRequest({
      jsonrpc: '2.0',
      id: 3,
      method: 'resources/list',
      params: {}
    });
  }, 1000);

  // 4. List prompts
  setTimeout(() => {
    sendRequest({
      jsonrpc: '2.0',
      id: 4,
      method: 'prompts/list',
      params: {}
    });
  }, 1500);

  // 5. Test a tool (list projects)
  setTimeout(() => {
    sendRequest({
      jsonrpc: '2.0',
      id: 5,
      method: 'tools/call',
      params: {
        name: 'list_projects',
        arguments: {}
      }
    });
  }, 2000);

  // 6. Test a resource
  setTimeout(() => {
    sendRequest({
      jsonrpc: '2.0',
      id: 6,
      method: 'resources/read',
      params: {
        uri: 'plainly://projects'
      }
    });
  }, 2500);

  // Stop after all tests
  setTimeout(() => {
    console.log('\n\n✅ All tests completed!');
    server.kill();
    process.exit(0);
  }, 4000);

}, 1000);

// Handle errors
server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`\nServer exited with code ${code}`);
});
