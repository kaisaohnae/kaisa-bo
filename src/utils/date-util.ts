import dayjs, {ConfigType, ManipulateType} from "dayjs";
// const timezone = require('dayjs/plugin/timezone');
// const utc = require('dayjs/plugin/utc');

// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.tz.setDefault('Asia/Seoul');

export const DATE_FORMAT_NUMBER = "YYYYMMDDHHmmss";
export const DATE_FORMAT = "YYYY-MM-DD HH:mm";
export const DAY_FORMAT = "YYYY-MM-DD";

const isValid = (date: Date) => {
  return date && dayjs(date).isValid();
};
const format = (date: any, format = DATE_FORMAT) => {
  return date && dayjs(date).isValid() && dayjs(date).format(format);
};
const add = (date: Date, addDate: number, type: ManipulateType, format = DATE_FORMAT) => {
  let value: any;
  if (isValid(date)) {
    value = dayjs(date as ConfigType).add(addDate, type);
    value = value.format(format);
  }
  return value;
};
const getToday = (format = DATE_FORMAT) => {
  return dayjs().format(format);
};
const getDay = (format = DAY_FORMAT) => {
  return dayjs().format(format);
};
/**
 * 해당월의 마지막 일자 반환한다.
 * @param {*} date
 * @returns number
 */
const getMonthLastDay = (date: any) => {
  return date && dayjs(date).isValid() && dayjs(date).daysInMonth();
};

export default {
  format,
  isValid,
  add,
  getToday,
  getDay,
  getMonthLastDay,
  DATE_FORMAT_NUMBER,
  DATE_FORMAT,
  DAY_FORMAT,
};
