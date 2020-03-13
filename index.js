const express = require('express');
const app = express();
const Paydoo = require('./paydoo');
const Fractal = require('./fractal');
const path = require('path');
const Fraud = require('./fraudSeon');
// This is project which basically POC of the paydoo and their implementation in to the system !!

app.use(express.urlencoded());
app.get('/info', (req,res) => {
    console.log('First time setup process', );
    console.log(req);
    res.send(`<h4> Payment has been sucessfully done <h4> <p> Transaction Id : ${ req.query.id}</p>`);
});


app.get('/paymentProcess', async (req, res) => {
    let paymentDetail = await Paydoo.paydoo.checkout();
    paymentDetail = JSON.parse(paymentDetail);
    console.log(paymentDetail.redirect);
    let htmlTempPayment = `
    <form action=${paymentDetail.redirect.url} class="paymentWidgets">
    `;
    for (let i in paymentDetail.redirect.parameters){
        htmlTempPayment += `
        <input type="text" name='${paymentDetail.redirect.parameters[i].name}'; value='${paymentDetail.redirect.parameters[i].value}'>
        `; 
    }
    htmlTempPayment += `
    <input type='submit' value="submit">
    </form>`
    res.send(htmlTempPayment);
});


app.get('/transactionDetail', async (req, res) => {
    const {id} = req.query;
    console.log('I am listening');
    const transactionDetail = await Paydoo.paydoo.TransactionDetail(id);
    res.send(transactionDetail);
})


app.get('/paymentAttempt', async (req,res) => {

   return res.redirect("https://test.ppipe.net/connectors/demo/giropayfiducia/simulator/giropayfiducia.ftl?jsessionid=014468885B0169B187024FE1C7193A3B.uat01-vm-con01&redirectData=merchantId%3D8995001%26merchantTxId%3D8ac7a4a1705c6d2b01705c85d0761c37%26txId%3D0000847439%26operatorSignature%3DsimulatorSignature%26operatorId%3D002");
});

app.get('/fraudPrevention', async (req,res) => {
    const { email, phone, ip } = req.query;
    let emailDetail = null,  phoneDetail = null, ipDetail = null;
    if (email) 
        emailDetail = JSON.parse(await Fraud.fraud.getEmailDetail(email));
    if (phone)
        phoneDetail = JSON.parse(await Fraud.fraud.getPhoneDetail(phone));
    if (ip)
        ipDetail = JSON.parse(await Fraud.fraud.getIpDetail(ip));

    return res.send({emailDetail, phoneDetail, ipDetail}); 
});




/**
 *  ------------------------------------------- FRACTAL POC -------------------------------
 */

 // Authentiction!!
 app.get('/fractalAuth',
 async (req, res) => {
    const fractalAuth = Fractal.fractal.fractalAuthorization();
    console.log(fractalAuth);
    return res.redirect(fractalAuth);
 });


 
 app.all('/fractal-callback',
 async (req,res ) => {
     console.log('--- fractal call back ---', req);
     console.log('------ fractal infromation of the new identified -------------', req.query.code);
     const code = req.query.code;
     await Fractal.fractal.accessToken(code);
 });

 app.get('/fractalToken',
 async (req,res) => {
     const code = req.query.code;
     await Fractal.fractal.fractalUser(code);
 });

 app.get('/clientToken',
 async (req,res) => {
    let clientData = await Fractal.fractal.createClientStatusToken();
    clientData = JSON.parse(clientData);
    await Fractal.fractal.usersVerificationStatus(clientData['access_token']);
 });

 app.get('/refreshToken',
 async (req, res) => {
     await Fractal.fractal.refreshToken(req.query.code);
 }
 )


 // ------------ SECURE TRADING API's working ----------------

 app.get('/securePaymentPage',
    async (req,res) => {
        const abs = path.join(__dirname + '/secure.html');
        return res.sendFile(abs);
    }
 );

 app.get('/authenteq',
    async (req, res) => {
        const button = `<a href='https://identity.authenteq.com/authorize?response_type=code&client_id=com.xcoins.staging&redirect_uri=localhost:5000/callbackAuthenteq&scope=kyc&state=abc123ppfm&back_url=https://localdev.xcoins.com/signup/verifyid'> Authenteq </a>`;
        return res.send(button);
    }
 );

 app.get('/callbackAuthenteq', async (req, res) => {
     console.log('information of the data', req.body);
 })

 app.post('/securePaymentCheck',
 async (req,res) => {
     console.log('Request body ' ,req.body);
     res.send(req.body);
 }
 )


app.listen(5000 , () => { console.log('server listeing on the 5000 port')});