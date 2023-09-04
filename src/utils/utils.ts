import { Items, Item } from "types/GoogleSheet";

const cleanRow = (row: Items) => {
  const replaceItems = row.filter((item, index) => item !== null && index < 2);
  const replaceItem = replaceItems.filter((item) => item.v !== null);
  const data = replaceItem.map((item) => item.v.toString());
  return data;
};

const Utils = { cleanRow };

export default Utils;
