const request = require("request-promise");
const querystring = require("querystring");

/**
 * @description
 * Basically this is used for the fraud prevention tool via EMAIL, IP and phone
 * using the secret through which application could be worked or system might be working flow of the system !!
 */

 class FraudSeon {
    constructor () {
        this.serviceKey = "3e23c13d-05d7-42ec-bda7-d4f265e06841"

         }

    /**
     * Provide the email detail and their score through we can know the fraud case !!
     * @param {*} email 
     */
    async getEmailDetail(email) {
        try {

            const payloadResponse = await request({
              headers: {
                "X-API-KEY": this.serviceKey
              },
              method: "GET",
              uri: `https://api.seon.io/SeonRestService/email-api/v2.0/${email}?include=history,flags,id`
            });
            return payloadResponse; // here is the result
          } catch (error) {
              console.log(error);
            return { error };
          } 
      
    }

    /**
     * Provide the phone detail and their score through we can know the fraud case !!
     */
    async getPhoneDetail(phone) {
        try {

            const payloadResponse = await request({
              headers: {
                "X-API-KEY": this.serviceKey
              },
              method: "GET",
              uri: `https://api.seon.io/SeonRestService/phone-api/v1.0/${phone}?include=history,flags,id`
            });
            return payloadResponse; // here is the result
          } catch (error) {
              console.log(error);
            return { error };
          } 
    }

    /**
     * Provide the Ip detail and their score !!
     */
    async getIpDetail(ip) {
      try {

        const payloadResponse = await request({
          headers: {
            "X-API-KEY": this.serviceKey
          },
          method: "GET",
          uri: `https://api.seon.io/SeonRestService/ip-api/v1.0/${ip}?include=history,flags,id`
        });
        return payloadResponse; // here is the result
      } catch (error) {
          console.log(error);
        return { error };
      } 
    }


 }

 const fraudObj = new FraudSeon();
exports.fraud = fraudObj;