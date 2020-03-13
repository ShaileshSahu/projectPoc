const request = require("request-promise");
const querystring = require("querystring");


/**
 * Fractal is third party used to KYC||AML for the verification of the user and do all the process even the verification part !!
 */

class Fractal {
    constructor() {
        this.fractalCred = {
            frontendServer: "https://next.fractal.id",
            authServer: "https://auth.next.fractal.id",
            resourceServer: "https://resource.next.fractal.id",
            verifierServer: "https://verifier.next.fractal.id",
            client_id: "myD91LSXqEAJEpHrmIhyJYYt30pYJkQNghkdz8tTwm4",
            client_secret: "fgx0Gxsg7jqm1UTxZFt385fOOcTEt7Ek46x-i7rqPgg",
            scope: "uid:read email:read person.full_name:read verification.v1:read",
            redirect_uri: "http://localhost:5000/fractal-callback",
        };  
    }

    fractalAuthorization() {
        return `${this.fractalCred.frontendServer}/authorize?client_id=${this.fractalCred.client_id}&redirect_uri=${this.fractalCred.redirect_uri}&response_type=code&scope=uid:read email:read person.full_name:read verification.v1:read`;
    }

    async accessToken(code) {
        try {
            const payloadResponse = await request({
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                uri: this.fractalCred.authServer + '/oauth/token',
                body: JSON.stringify({
                    client_id: this.fractalCred.client_id,
                    client_secret: this.fractalCred.client_secret,
                    code,
                    grant_type: 'authorization_code',
                    redirect_uri: this.fractalCred.redirect_uri
                })
              });
              console.log('Access Token Response', payloadResponse);
        } catch (error) {
            console.log('error in the db', error);
        }
    }

    async fractalUser(accessToken) {
        try {
            const payloadResponse = await request({
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                method: "GET",
                uri: this.fractalCred.resourceServer + '/users/me',
              });
              console.log('User infromation:  ', payloadResponse);
        } catch (error) {
            console.log('error in the db', error);
        }
    }

    async createClientStatusToken () {
        try {
            const payloadResponse = await request({
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                uri: this.fractalCred.authServer + '/oauth/token',
                body: JSON.stringify({
                    client_id: this.fractalCred.client_id,
                    client_secret: this.fractalCred.client_secret,
                    scope: 'client.stats:read',
                    grant_type: 'client_credentials'  
                })
              });
              console.log('Access Token Verifier token', payloadResponse);
              return payloadResponse;
        } catch (error) {
            console.log('error in the db', error);
        }
    }

    async usersVerificationStatus(accessToken) {
        try {
            const payloadResponse = await request({
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                method: "GET",
                uri: this.fractalCred.verifierServer + '/api/stats/user-verifications'
              });
              console.log('User infromation:  ', payloadResponse);
        } catch (error) {
            console.log('error in the db', error);
        }

    }
    
    async refreshToken(accessToken) {
        try {
            const payloadResponse = await request({
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                uri: this.fractalCred.authServer + '/oauth/token',
                body: JSON.stringify({
                    client_id: this.fractalCred.client_id,
                    client_secret: this.fractalCred.client_secret,
                    refresh_token: accessToken,
                    grant_type: 'refresh_token'  
                })
              });
              console.log('Access Token Verifier token', payloadResponse);
              return payloadResponse;
        } catch (error) {
            console.log('error in the accesstoken', error);
        }
    }



}

const fractalObj = new Fractal();
exports.fractal = fractalObj;