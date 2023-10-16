import { describe, expect, it } from "vitest";
import { test, build } from "../src/options/saturation";

describe("saturation", () => {
  describe("test", () => {
    it("should return true if saturation option is defined", () => {
      expect(test({ saturation: 150 })).toEqual(true);
    });

    it("should return true if sa option is defined", () => {
      expect(test({ sa: 500 })).toEqual(true);
    });

    it("should return false if saturation option is undefined", () => {
      expect(test({})).toEqual(false);
    });
  });

  describe("build", () => {
    it("should throw an error if saturation option is undefined", () => {
      expect(() => build({})).toThrow("saturation option is undefined");
    });

    it("should throw an error if saturation is not a number", () => {
      // @ts-expect-error: Let's ignore an error (check for users with vanilla js).
      expect(() => build({ saturation: "150" })).toThrow(
        "saturation is not correct. Set the value between 0 and any positive number"
      );
    });

    it("should throw an error if saturation is less than 0", () => {
      expect(() => build({ saturation: -1 })).toThrow(
        "saturation is not correct. Set the value between 0 and any positive number"
      );
    });

    it("should return sa:30 if saturation option is 30", () => {
      expect(build({ saturation: 30 })).toEqual("sa:30");
    });
  });
});
