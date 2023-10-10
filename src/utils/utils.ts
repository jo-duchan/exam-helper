import { Items } from "types/google-sheet";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const cleanRow = (row: Items) => {
  const replaceItems = row.filter((item, index) => item !== null && index < 2);
  const replaceItem = replaceItems.filter((item) => item.v !== null);
  const data = replaceItem.map((item) => item.v.toString());
  return data;
};

const longPress = {
  timer: 0,
  setup(action: () => void) {
    this.timer = setTimeout(action, 1000, action);
  },
  cancel() {
    clearTimeout(this.timer);
  },
};

const convertSheetUrl = (url: string) => {
  return url.slice(39, 83);
};

const random = (length: number) => {
  return Math.floor(Math.random() * length);
};

const dateFormat = (date: number, day?: string) => {
  if (day === "E") {
    return format(date, "M월 dd일 (E)", { locale: ko });
  }
  return format(date, "yy.MM.dd");
};

const vibration = (time: number) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(time);
  }
};

const isMobile = () => {
  if (/Android|iPhone/i.test(navigator.userAgent)) {
    return true;
  }

  return false;
};

const convertValue = (value: string) => {
  return value.replace(/ /g, "").toLocaleUpperCase();
};

const Utils = {
  cleanRow,
  longPress,
  convertSheetUrl,
  random,
  dateFormat,
  vibration,
  isMobile,
  convertValue,
};

export default Utils;
