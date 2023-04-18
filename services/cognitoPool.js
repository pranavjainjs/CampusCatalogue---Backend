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
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};
export const verifyOTP = (email, otp) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(otp, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
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
        reject(err);
      },
    });
  });
};
export const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
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
          if (!decodedJwt) {
            reject(new Error("JWT_TOKEN_INVALID"));
          }

          var kid = decodedJwt.header.kid;
          let pem2 = pems[`${kid}`];
          if (pem2 === null) {
            reject(new Error("INVALID_TOKEN"));
          }

          jwt.verify(
            token,
            pem2,
            { algorithms: ["RS256"] },
            function (err, payload) {
              if (err) {
                reject(new Error("JWT_EXPIRED"));
              } else {
                resolve(payload);
              }
            }
          );
        } else {
          reject(new Error("JWT_DOWNLOAD_FAILED"));
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
        reject(err);
      } else {
        let retObj = {
          access_token: session.accessToken.jwtToken,
          id_token: session.idToken.jwtToken,
          refresh_token: session.refreshToken.token,
        };
        resolve(retObj);
      }
    });
  });
};
