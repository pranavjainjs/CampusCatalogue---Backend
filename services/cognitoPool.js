import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import jwktopem from "jwk-to-pem";
import nodefetch from "node-fetch";
import env from "dotenv";
global.fetch = nodefetch;
env.config();
const poolData = {
  UserPoolId: process.env.USER_POOL_ID, // Your user pool id here
  ClientId: process.env.CLIENT_ID, // Your client id here
};
const userPool = new CognitoUserPool(poolData);

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
