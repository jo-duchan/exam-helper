import { Items } from "types/google-sheet";

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

const Utils = { cleanRow, longPress, convertSheetUrl };

export default Utils;
