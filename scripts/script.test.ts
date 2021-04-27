import fromMS from "./fromMS";
import toMS from "./toMS";

describe("testing various functions", () => {
  test("should get the appropriate milliseconds", () => {
    expect(toMS(1, "millisecond")).toBe(1);
    expect(toMS(1, "second")).toBe(1000);
    expect(toMS(1, "minute")).toBe(60000);
    expect(toMS(1, "hour")).toBe(3600000);
    expect(toMS(1, "day")).toBe(86400000);
  });
  test("should get the appropriate time", () => {
    expect(1).toBe(fromMS(1, "millisecond"));
    expect(1).toBe(fromMS(1000, "second"));
    expect(1).toBe(fromMS(60000, "minute"));
    expect(1).toBe(fromMS(3600000, "hour"));
    expect(1).toBe(fromMS(86400000, "day"));
  });
});
