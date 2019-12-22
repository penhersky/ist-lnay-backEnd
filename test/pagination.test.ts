import {describe, it} from "mocha";
import chai from "chai";

const should: Chai.Should = chai.should();
import pagination from "../src/resolvers/pagination";

describe("#Pagination", () => {
  let arr = Array(23);
  for (let index = 0; index < arr.length; index++) {
    arr[index] = index;
  }
  it("1. Page Split Testing", () => {
    const page = pagination(arr, 2, 10);
    should.equal(page.arr.length, 10);
  });
  it("2. Last page Testing", () => {
    const page = pagination(arr, 3, 10);
    should.equal(page.arr.length, 3);
  });
  it("3. Count count=3", () => {
    const page = pagination(arr, 3, 10);
    should.equal(page.count, 3);
  });
  it("3. Error pagination, return full Array page=4", () => {
    const page = pagination(arr, 4, 10);
    should.equal(page.arr.length, arr.length);
  });
});
