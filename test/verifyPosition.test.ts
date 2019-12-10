import {describe, it} from "mocha";
import chai from "chai";

const should: Chai.Should = chai.should();
import position from "../src/resolvers/user/auth/verification/verifyPosition";

describe("#Testing user positions", () => {
  it("1. position = `admin`, minPosition = 'admin' result=true", () =>
    position("admin", "admin").should.be.true);
  it("2. position = `Teacher`, minPosition = 'admin' result=false", () =>
    position("Teacher", "admin").should.be.false);
  it("3. position = `Group leader`, minPosition = 'student' result=true", () =>
    position("Group leader", "student").should.be.true);
  it("4. position = `student`, minPosition = 'Teacher' result=false", () =>
    position("student", "Teacher").should.be.false);
  it("5. position = `spam`, minPosition = 'student' result=false", () =>
    position("spam", "student").should.be.false);
});
