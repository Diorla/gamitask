import dayjs from "dayjs";
import {
  getPrevDate,
  getDateDifference,
  getDateFromTime,
  getNearestDateAfter,
  getNearestDateBefore,
  getNextDate,
  isAfter,
  isBefore,
  isBetween,
  isTheSameMoment,
} from ".";

describe("time function utilities", () => {
  test("get dateDifference", () => {
    const today = new Date();
    const year = new Date(dayjs(today).add(1, "year").valueOf());
    const month = new Date(dayjs(today).add(2, "month").valueOf());
    const week = new Date(dayjs(today).add(3, "week").valueOf());
    const day = new Date(dayjs(today).add(1, "day").valueOf());
    const hour = new Date(dayjs(today).add(4, "hour").valueOf());
    const minute = new Date(dayjs(today).add(5, "minute").valueOf());
    const second = new Date(dayjs(today).add(6, "second").valueOf());
    const millisecond = new Date(dayjs(today).add(7, "millisecond").valueOf());

    expect(getDateDifference(year, today)).toBe("Next year");
    expect(getDateDifference(month, today)).toBe("In 2 months");
    expect(getDateDifference(week, today)).toBe("In 3 weeks");
    expect(getDateDifference(day, today)).toBe("Tomorrow");
    expect(getDateDifference(hour, today)).toBe("In 4 hours");
    expect(getDateDifference(minute, today)).toBe("In 5 minutes");
    expect(getDateDifference(second, today)).toBe("In 6 seconds");
    expect(getDateDifference(millisecond, today)).toBe("In 7 milliseconds");

    expect(getDateDifference(today, year)).toBe("Last year");
    expect(getDateDifference(today, month)).toBe("2 months ago");
    expect(getDateDifference(today, week)).toBe("3 weeks ago");
    expect(getDateDifference(today, day)).toBe("Yesterday");
    expect(getDateDifference(today, hour)).toBe("4 hours ago");
    expect(getDateDifference(today, minute)).toBe("5 minutes ago");
    expect(getDateDifference(today, second)).toBe("6 seconds ago");
    expect(getDateDifference(today, millisecond)).toBe("7 milliseconds ago");
  });

  test("should return getDateFromTime", () => {
    const sampleTime = "11:22";
    const timeToDate = new Date(getDateFromTime(sampleTime));
    expect(timeToDate.getHours()).toBe(Number(sampleTime.split(":")[0]));
    expect(timeToDate.getMinutes()).toBe(Number(sampleTime.split(":")[1]));
  });

  test("should return getNearestDateAfter", () => {
    const currentDate = new Date("2021-04-18T14:23"); // Sun Apr 18 2021 14:23:00
    const september = getNearestDateAfter(8, "month", currentDate);
    const nextYear = getNearestDateAfter(3, "month", currentDate);
    const nextWeds = getNearestDateAfter(3, "day", currentDate);

    expect(new Date(nextWeds).toDateString().includes("Wed")).toBeTruthy();
    expect(new Date(september).toDateString().includes("Sep")).toBeTruthy();
    expect(new Date(september).getFullYear()).toBe(2021);
    expect(new Date(nextYear).getFullYear()).toBe(2022);
  });

  test("should return getNearestDateBefore", () => {
    const currentDate = new Date("2021-04-18T14:23"); // Sun Apr 18 2021 14:23:00
    const february = getNearestDateBefore(1, "month", currentDate);
    const lastYear = getNearestDateBefore(3, "month", currentDate);
    const lastWeds = getNearestDateBefore(3, "day", currentDate);

    expect(new Date(lastWeds).toDateString().includes("Wed")).toBeTruthy();
    expect(new Date(february).toDateString().includes("Feb")).toBeTruthy();
    expect(new Date(february).getFullYear()).toBe(2021);
    expect(new Date(lastYear).getFullYear()).toBe(2020);
  });

  test("should return next date", () => {
    const currentDate = new Date("2021-04-18T14:23"); // Sun Apr 18 2021 14:23:00
    expect(new Date(getNextDate(3, "hour", currentDate)).getHours()).toBe(17);
    expect(new Date(getNextDate(5, "month", currentDate)).getMonth()).toBe(8);
    expect(new Date(getNextDate(24, "month", currentDate)).getFullYear()).toBe(
      2023
    );
  });

  test("should return prev date", () => {
    const currentDate = new Date("2021-04-18T14:23"); // Sun Apr 18 2021 14:23:00
    expect(new Date(getPrevDate(3, "hour", currentDate)).getHours()).toBe(11);
    expect(new Date(getPrevDate(5, "month", currentDate)).getMonth()).toBe(10);
    expect(new Date(getPrevDate(24, "month", currentDate)).getFullYear()).toBe(
      2019
    );
  });

  test("should check if a date is after", () => {
    const date1 = new Date("2021-04-18T14:23");
    const date2 = new Date("2021-04-18T14:24");
    const date3 = new Date("2021-04-18T15:23");
    const date4 = new Date("2021-04-19T14:23");
    const date5 = new Date("2021-05-18T14:23");
    const date6 = new Date("2022-04-18T14:23");

    expect(isAfter(date2, date1, "minute")).toBeTruthy();
    expect(isAfter(date3, date2, "hour")).toBeTruthy();
    expect(isAfter(date4, date3, "date")).toBeTruthy();
    expect(isAfter(date5, date4, "month")).toBeTruthy();
    expect(isAfter(date6, date5, "year")).toBeTruthy();

    // This is after, but by lesser value
    expect(isAfter(date2, date1, "hour")).toBeFalsy(); // minute will be true
    expect(isAfter(date3, date2, "date")).toBeFalsy();
    expect(isAfter(date4, date3, "month")).toBeFalsy();
    expect(isAfter(date5, date4, "year")).toBeFalsy();
  });

  test("should check if a date is before", () => {
    const date1 = new Date("2021-04-18T14:23");
    const date2 = new Date("2021-04-18T14:24");
    const date3 = new Date("2021-04-18T15:23");
    const date4 = new Date("2021-04-19T14:23");
    const date5 = new Date("2021-05-18T14:23");
    const date6 = new Date("2022-04-18T14:23");

    expect(isAfter(date2, date1, "minute")).toBeTruthy();
    expect(isAfter(date3, date2, "hour")).toBeTruthy();
    expect(isAfter(date4, date3, "date")).toBeTruthy();
    expect(isAfter(date5, date4, "month")).toBeTruthy();
    expect(isAfter(date6, date5, "year")).toBeTruthy();

    expect(isAfter(date2, date1, "hour")).toBeFalsy();
    expect(isAfter(date3, date2, "date")).toBeFalsy();
    expect(isAfter(date4, date3, "month")).toBeFalsy();
    expect(isAfter(date5, date4, "year")).toBeFalsy();
  });

  test("should check if a date is between two other dates", () => {
    const date1 = new Date("2021-04-23T17:53:54.574Z");
    const date2 = new Date("2021-04-23T17:53:54.575Z");
    const date3 = new Date("2021-04-23T17:53:54.576Z");

    expect(isBetween(date3, date2, date1)).toBeTruthy();
    expect(isBetween(date1, date2, date3)).toBeTruthy();
    expect(isBetween(date2, date1, date3)).toBeFalsy();
    expect(isBetween(date3, date2, date3)).toBeFalsy();
  });

  test("should check if it's the same moment", () => {
    const date1 = new Date("2021-04-18T14:23");
    const date2 = new Date("2021-04-18T14:24");
    const date3 = new Date("2021-04-18T15:23");
    const date4 = new Date("2021-04-19T14:23");
    const date5 = new Date("2021-05-18T14:23");
    const date6 = new Date("2022-04-18T14:23");

    expect(isTheSameMoment(date1, date2, "hour")).toBeTruthy();
    expect(isTheSameMoment(date2, date3, "date")).toBeTruthy();
    expect(isTheSameMoment(date3, date4, "month")).toBeTruthy();
    expect(isTheSameMoment(date4, date5, "year")).toBeTruthy();
    expect(isTheSameMoment(date5, date6, "year")).toBeFalsy();
    expect(isTheSameMoment(date6, date1, "hour")).toBeFalsy();
  });
});
