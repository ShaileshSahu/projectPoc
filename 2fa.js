const speakeasy = require('speakeasy');
const QrCode  = require('qrcode');


/**
 * This is for the creation of the 2FA bar code and their password !! 
 */
/* const secret = speakeasy.generateSecret({
    name: 'dev'
});

console.log('Secret', secret);

QrCode.toDataURL(secret.otpauth_url, function(err, data) { console.log('data', data); });
  */


 // Verification of the qe code !!
const verified = speakeasy.totp.verify(
    {
        secret: '9.0vvIAw!>4iV006*.ugT>IPRZ0^4D}2',
        encoding:'ascii',
        token: '306578'
    }
);
console.log('verified', verified);

