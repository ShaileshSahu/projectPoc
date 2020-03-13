const request = require("request-promise");
const querystring = require("querystring");
const https = require('https');
// POC Pa
class Paydoo {
  constructor() {
    console.log("---- paydoo called ----- ");
  }

  async checkout() {
   console.log("checkout payment paydoo");
    try {
      // Currrently I am using the alipay for the payment everythin as per knowledge is static !!
      var data = querystring.stringify({
        'entityId':'8a8294185e5c61f5015e61d25f250dca',
        'amount':'10.00',
        'currency':'EUR',
        'paymentBrand':'ALIPAY',
        'shopperResultUrl':'http://localhost:5000/info',
        'paymentType':'DB'      
      });
      const payloadResponse = await request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": data.length,
            "Authorization": "Bearer OGE4Mjk0MTg1ZTVjNjFmNTAxNWU2MWQyNWY3ZDBkY2V8ZGZxbnRYTkgzOQ==",
        },
        method: "POST",
        uri: "https://test.oppwa.com/v1/payments",
        body: data
      });
      return payloadResponse; // here is the result
    } catch (error) {
      return { error };
    } 
  }


  async TransactionDetail(id) {
    try {
      console.log('heelo');
      const transactionDetailResponse = await request({
        headers: {
            "Authorization": "Bearer OGE4Mjk0MTg1ZTVjNjFmNTAxNWU2MWQyNWY3ZDBkY2V8ZGZxbnRYTkgzOQ==",
        },
        method: "GET",
        uri: `https://test.oppwa.com/v1/payments/${id}?entityId=8a8294185e5c61f5015e61d25f250dca`
      });
      console.log(transactionDetailResponse);
      return transactionDetailResponse; // here is the result
    } catch (error) {
      console.log('error', error);
      return {error};
    }
  }
  
}


const paydooObject = new Paydoo();
exports.paydoo = paydooObject;
