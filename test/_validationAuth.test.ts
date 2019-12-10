import {describe, it} from "mocha";
import chai from "chai";

const should: Chai.Should = chai.should();

import {
  loginValidation,
  validationEmail,
  passwordValidation,
  validationUserData
} from "../src/resolvers/user/auth/_validationAuth";

describe("#User Data Verification", () => {
  describe("$testing validationUserData", () => {
    it("1. name='Pitter' surname='Parker' email='parker@ukr.net'  result='undefined'", async () => {
      const result = await (<any>validationUserData({
        name: "Pitter",
        surname: "Parker",
        email: "parker@ukr.net"
      }));
      should.equal(result, undefined);
    });
    it("2. name='Pitter' surname='Parker' *email='parker@gmail'  result='error(email)'", async () => {
      const result = String(
        await validationUserData({
          name: "Pitter",
          surname: "Parker",
          email: "parker@gmail"
        })
      );
      should.equal(result.split('"')[1], "email");
    });
    it("3. name='P' surname='Parker' *email='parker@gmail.com'  result='error(name)'", async () => {
      const result = String(
        await validationUserData({
          name: "P",
          surname: "Parker",
          email: "parker@gmail.com"
        })
      );
      should.equal(result.split('"')[1], "name");
    });
  });
  describe("$testing passwordValidation", () => {
    it("1. password='1Fp123sH7' result='undefined'", async () => {
      const result = await passwordValidation({password: "1Fp123sH7"});
      should.equal(result, undefined);
    });
    it("2. password='1234567' result='error(password)'", async () => {
      const result = String(await passwordValidation({password: "1234567"}));
      should.equal(result.split('"')[1], "password");
    });
  });
  describe("$testing validationEmail", () => {
    it("1. email='tartar@gmail.com' result='undefined'", async () => {
      const result = await validationEmail({email: "tartar@gmail.com"});
      should.equal(result, undefined);
    });
    it("2. email='tartar@gmail.com' result='error(email)'", async () => {
      const result = String(await validationEmail({email: "email.com"}));
      should.equal(result.split('"')[1], "email");
    });
  });
  describe("$testing loginValidation", () => {
    it("1. email='tartar@gmail.com' password='1Fp123sH7' result='undefined'", async () => {
      const result = await loginValidation({
        email: "tartar@gmail.com",
        password: "1Fp123sH7"
      });
      should.equal(result, undefined);
    });
  });
});
