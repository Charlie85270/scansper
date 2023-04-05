import { CLValueBuilder, decodeBase16 } from "casper-js-sdk";
import differenceInMonths from "date-fns/differenceInMonths";
import differenceInWeeks from "date-fns/differenceInWeeks";
import differenceInYears from "date-fns/differenceInYears";
import millisecondsToHours from "date-fns/millisecondsToHours";
import millisecondsToMinutes from "date-fns/millisecondsToMinutes";
import millisecondsToSeconds from "date-fns/millisecondsToSeconds";

export const MOTE_VALUE = 1000000000;

export const KNOW_ADDRESSES = [
  {
    public_key:
      "0203f3f44c9e80e2cedc1a2909631a3adea8866ee32187f74d0912387359b0ff36a2",
    name: "Gate.io",
    img: "/gateio.png",
  },
];

export const formatNumber = (number: number) => {
  // Limit to three significant digits
  return number.toLocaleString("en-US");
};

export const truncateString = (string: string, number: number) => {
  if (number >= string?.length) {
    return string;
  }
  return string?.slice(0, number).concat("...");
};

export const isToday = someDate => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export const DeployColors = {
  transfer: "#118ab2",
  storedContractByHash: "#8E8ab2",
  moduleBytes: "#9Ad166",
  storedVersionedContractByHash: "#E3H348",
};

export const getPerfColor = (percent: number) => {
  if (percent > 99.5) {
    return "#16a34a";
  }
  if (percent > 98) {
    return "#84cc16";
  }
  if (percent > 97) {
    return "#a3e635";
  }
  if (percent > 96) {
    return "#facc15";
  }
  return "#ea580c";
};

/**
 * Get relative date/time format from Intl
 * @param {Object} params
 * @param {date} params.date1 The first date
 * @param {string} params.token The token
 * @param {string} params.locale The locale
 * @param {string} params.style The style of the output
 * @param {string} params.numeric Also affect the style of the output
 * @return {string} Ex: 2 days ago
 */
// @ts-ignore should add compilerOptions.noImplicitThis=false in tsconfig
export const getRelativeDateTime = ({
  date1 = new Date(),
  date2 = new Date(),
  locale = "en",
  token = "$relative-time-long",
}: IRelativeDatetime) => {
  const { style, numeric } = tokens[token];
  const selectedFormat = getFormatFromDifference(date2, date1);
  const timeDifference = getTimeDifference(date2, date1, selectedFormat);
  const rtf1 = new Intl.RelativeTimeFormat(locale, { style, numeric });
  return rtf1.format(Math.round(timeDifference), selectedFormat);
};

const tokens: {
  [key: string]: Intl.RelativeTimeFormatOptions;
} = {
  "$relative-time-long": {
    style: "short",
    numeric: "always",
  },
  "$relative-weekday-long": {
    style: "long",
    numeric: "auto",
  },
};

export type IRelativeDateTimeToken = keyof typeof tokens;

export interface IRelativeDatetime {
  date1: Date;
  date2?: Date;
  locale?: string;
  token?: IRelativeDateTimeToken;
}

/**
 * Get the best format to display difference between 2 dates
 * @param {date} date1 The first date
 * @param {date} date2 The second date
 * @return {format} Ex: year
 */
function getFormatFromDifference(date1: Date, date2: Date) {
  const millisecondes: number = Math.abs(date2.getTime() - date1.getTime());
  const hours = millisecondsToHours(millisecondes);

  const minimumHourInOneYear = 8761;
  const minimumHourInOneMonth = 730;
  const minimumHourInOneWeek = 168;
  const minimumHourInOneDay = 24;

  if (hours > minimumHourInOneYear) {
    return "year";
  }
  if (hours > minimumHourInOneMonth) {
    return "month";
  }
  if (hours > minimumHourInOneWeek) {
    return "week";
  }
  if (hours > minimumHourInOneDay) {
    return "day";
  }
  if (millisecondsToMinutes(millisecondes) >= 60) {
    return "hour";
  }
  if (millisecondsToMinutes(millisecondes) >= 1) {
    return "minute";
  }
  return "second";
}

/**
 * Get time difference between 2 dates in millisecond, seconds, minutes or hours
 * @param {date} date1 The first date
 * @param {date} date2 The second date
 * @param {string} format milliseconds, hours, minutes or seconds
 * @return {number} Ex: 112300000
 */
function getTimeDifference(
  date1: Date,
  date2: Date,
  format?: "second" | "minute" | "hour" | "day" | "week" | "month" | "year"
) {
  let millisecond: number = date2.getTime() - date1.getTime();
  if (format === "second") {
    return millisecondsToSeconds(millisecond);
  }
  if (format === "minute") {
    return millisecondsToMinutes(millisecond);
  }
  if (format === "hour") {
    return millisecondsToHours(millisecond);
  }
  if (format === "day") {
    millisecond = date2.getTime() - date1.getTime();
    return millisecondsToHours(millisecond) / 24;
  }
  if (format === "week") {
    return differenceInWeeks(date2, date1);
  }
  if (format === "month") {
    return differenceInMonths(date2, date1);
  }
  if (format === "year") {
    return differenceInYears(date2, date1);
  }
  return millisecond;
}

export const getAvatarUrl = (
  publicKey: string,
  delegatorsInfos?: {
    publicKey?: string;
    name?: string;
    img?: string;
  }[]
) => {
  const isKnow = KNOW_ADDRESSES.find(add => add.public_key === publicKey);
  let img = `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${
    publicKey ? publicKey.slice(12) : "abby"
  }`;

  if (isKnow) {
    img = isKnow.img;
  }
  if (delegatorsInfos) {
    const isDelegatorKnow = delegatorsInfos.find(
      del => del.publicKey === publicKey
    );
    if (isDelegatorKnow) {
      img = isDelegatorKnow.img || "";
    }
  }
  return img;
};

export const getPublicKeyName = (
  publicKey: string,
  delegatorsInfos?: {
    publicKey?: string;
    name?: string;
    img?: string;
  }[]
) => {
  const isKnow = KNOW_ADDRESSES.find(add => add.public_key === publicKey);
  let name = publicKey;

  if (isKnow) {
    name = isKnow.name;
  }
  if (delegatorsInfos) {
    const isDelegatorKnow = delegatorsInfos.find(
      del => del.publicKey === publicKey
    );
    if (isDelegatorKnow) {
      name = isDelegatorKnow.name || publicKey;
    }
  }
  return name;
};
