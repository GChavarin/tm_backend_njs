//
const QRCode = require('qrcode');

const QRCodeGen = async texto => {
    try {
        const QRObj = await QRCode.toString(texto, {type: 'terminal'});
        console.log(QRObj);
    }
    catch(err) {
        console.log(err);
    }
};

QRCodeGen('Mensaje en QR para hoy');