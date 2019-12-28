import {describe, it} from "mocha";
import chai from "chai";
import _ from "lodash";

const should: Chai.Should = chai.should();
import {updateArr} from "../src/lib/_updateDataFromInput";

describe("# Update data from input", () => {
  it("1. Update arr [1, 2, 3, 4], [3, 4, 5]", () => {
    const result = updateArr([1, 2, 3, 4], [3, 4, 5]);
    _.isEqual(result?.saveArr, [5]).should.be.true;
    _.isEqual(result?.deleteArr, [1, 2]).should.be.true;
  });
  it("1. Update arr equal array result undefined", () => {
    const result = updateArr([1, 2, {a: "f"}, "dd"], [1, 2, {a: "f"}, "dd"]);
    should.equal(result, undefined);
  });
});
