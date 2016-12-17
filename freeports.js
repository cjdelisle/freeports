const UDP = require('dgram');
const MESSAGE = new Buffer('FREEPORT');

const usage = () => {
    console.log("Usage: freeports <ip address>      # scan using <ip address> freeports server");
    console.log("In order to run your own freeports server, see freeports-srv");
}

const main = (argv) => {
    if (argv.length !== 3) {
        usage();
        return;
    }
    const host = argv.pop();
    if (!/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test(host)) {
        console.log("argument must be an ipv4 address such as  1.2.3.4");
        return;
    }
    const client = UDP.createSocket('udp4');
    let port = 1;
    console.log('Scanning...');
    setInterval(() => {
        if (!(port % 50)) {
            console.log("Port " + port);
        }
        client.send(message, 0, message.length, port++, host, (err, bytes) => {
          if (err) { console.log(err); }
        });
        client.on('message', (msg, rinfo) => {
            console.log(msg);
            console.log(rinfo);
        })
    }, 50);
};
