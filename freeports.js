const UDP = require('dgram');
const MESSAGE = new Buffer('FREEPORT');

const usage = () => {
    console.log("Usage: freeports <ip address>  # scan with <ip address> server");
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
    client.on('message', (msg, rinfo) => {
        if (msg.toString('utf8') !== 'PORTFREE') { return; }
        console.log('Free Port: ' + rinfo.port);
    })
    let port = 1;
    console.log('Scanning...');
    setInterval(() => {
        if (!(port % 50)) {
            console.log("Port " + port);
        }
        client.send(MESSAGE, 0, MESSAGE.length, port++, host, (err, bytes) => {
          if (err) { console.log(err); }
        });
    }, 1000);
};
main(process.argv);
