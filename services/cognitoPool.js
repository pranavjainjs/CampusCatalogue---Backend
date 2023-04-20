import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoRefreshToken,
} from "amazon-cognito-identity-js";

import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import request from "request";
import jwkToPem from "jwk-to-pem";
import nodefetch from "node-fetch";
import env from "dotenv";
import jwt from "jsonwebtoken";
global.fetch = nodefetch;
env.config();
const poolData = {
  UserPoolId: process.env.USER_POOL_ID, // Your user pool id here
  ClientId: process.env.CLIENT_ID, // Your client id here
};
const userPool = new CognitoUserPool(poolData);
const pool_region = process.env.AWS_REGION;

//for creating new user
export const registerUser = (email, password) => {
  return new Promise((resolve, reject) => {
    var attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({ Name: "email", Value: email })
    );
    userPool.signUp(
      email,
      password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};
//for verifying the otp
export const verifyOTP = (email, otp) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(otp, true, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
//for logging in the user.It Will return all the tokens
export const logInUser = (email, password) => {
  return new Promise((resolve, reject) => {
    var authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const userData = {
      Username: email,
      Pool: userPool,
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        resolve(result);
      },
      onFailure: function (err) {
        return reject(err);
      },
    });
  });
};
export const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    // console.log(token);
    // if (token === undefined) {
    //   const error = new Error("TOKEN_MISSING");
    //   error.code = 401;
    //   reject(error);
    //   return;
    // }
    request(
      {
        url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true,
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          let pems = {};
          var keys = body["keys"];
          for (var i = 0; i < keys.length; i++) {
            //Convert each key to PEM
            var key_id = keys[i].kid;
            var modulus = keys[i].n;
            var exponent = keys[i].e;
            var key_type = keys[i].kty;
            var jwk = { kty: key_type, n: modulus, e: exponent };
            var pem = jwkToPem(jwk);
            pems[key_id] = pem;
          }
          //validate the token
          var decodedJwt = jwt.decode(token, { complete: true });
          if (decodedJwt === null) {
            return reject(new Error("JWT_TOKEN_INVALID"));
            //not a jwt token
          }
          // console.log(decodedJwt)
          var kid = decodedJwt.header.kid;
          let pem2 = pems[`${kid}`];
          if (pem2 === null) {
            return reject(new Error("INVALID_TOKEN"));
            //jwt token recived is invalid
          }

          jwt.verify(
            token,
            pem2,
            { algorithms: ["RS256"] },
            function (err, payload) {
              if (err) {
                return reject(new Error("JWT_EXPIRED"));
                //jwt token got expired
              } else {
                resolve(payload);
              }
            }
          );
        } else {
          return reject(new Error("JWT_DOWNLOAD_FAILED"));
          //unable to donwload jwt public json file
        }
      }
    );
  });
};
export const renewToken = async (token) => {
  return new Promise((resolve, reject) => {
    const RefreshToken = new CognitoRefreshToken({ RefreshToken: token });
    const userData = {
      Username: "",
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.refreshSession(RefreshToken, (err, session) => {
      if (err) {
        return reject(err);
      } else {
        let retObj = {
          access_token: session.accessToken.jwtToken,
          id_token: session.idToken.jwtToken,
          refresh_token: session.refreshToken.token,
          //refresh token will remain as it is
        };
        resolve(retObj);
      }
    });
  });
};
