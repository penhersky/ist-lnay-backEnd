import {describe, it} from "mocha";
import chai from "chai";

const should: Chai.Should = chai.should();

import {groupInput} from "../src/resolvers/group/_validationGroup";

describe("#Group input Verification", () => {
  it("name='INF-21', cathedra=23, information='test' result=undefined", async () => {
    const result = await (<any>groupInput({
      name: "INF-21",
      cathedra: 23,
      information: "test"
    }));
    should.equal(result, undefined);
  });
  it("name='INF-21', cathedra=23, information='test' result=error", async () => {
    const result = await (<any>groupInput({
      name: "21",
      cathedra: 23,
      information: "test"
    }));
    should.not.equal(result, undefined);
  });
});
