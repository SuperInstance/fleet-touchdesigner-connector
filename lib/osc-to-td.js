#!/usr/bin/env node
/**
 * TouchDesigner OSC Bridge
 * Sends fleet agent state data to TouchDesigner via OSC protocol.
 * TouchDesigner reads OSC on port 7000 by default.
 */
const dgram = require('dgram');

function sendState(ternaryVector, host = '127.0.0.1', port = 7000) {
  const client = dgram.createSocket('udp4');
  
  const density = ternaryVector.filter(v => v !== 0).length / ternaryVector.length;
  const balance = (ternaryVector.filter(v => v === 1).length - 
                   ternaryVector.filter(v => v === -1).length) / ternaryVector.length;
  
  const messages = [
    { address: '/fleet/density', args: [{ type: 'f', value: density }] },
    { address: '/fleet/balance', args: [{ type: 'f', value: balance }] },
    { address: '/fleet/entropy', args: [{ type: 'f', value: -(density * Math.log2(density || 0.001)) }] },
  ];
  
  messages.forEach(msg => {
    const buf = Buffer.from(JSON.stringify(msg));
    client.send(buf, 0, buf.length, port, host);
  });
  
  client.close();
  return { density, balance };
}

module.exports = { sendState };

if (require.main === module) {
  const vec = [1, 0, -1, 1, 0, -1, 1, 1];
  const result = sendState(vec);
  console.log(`Sent to TouchDesigner: density=${result.density.toFixed(2)}, balance=${result.balance.toFixed(2)}`);
}
