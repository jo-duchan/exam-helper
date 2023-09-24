import { Items } from "types/google-sheet";
import { format } from "date-fns";

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

const dateFormat = (date: number) => {
  return format(date, "yy.MM.dd");
};

const Utils = { cleanRow, longPress, convertSheetUrl, random, dateFormat };

export default Utils;
