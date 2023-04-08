const fs = require('fs');
const ip = require('ip');

const ipAddr = ip.address('public', 'ipv4');
const ipFile = './ip.txt';

fs.writeFileSync(ipFile, ipAddr);

console.log(`Your IP address is ${ipAddr}`);