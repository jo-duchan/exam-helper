import { Items, Item } from "types/GoogleSheet";

const cleanRow = (row: Items) => {
  function replaceNull(item: Item | null) {
    if (item == null) {
      return { v: "" };
    }
    return item;
  }

  const replaceItems = row.filter((item) => item !== null);
  const replaceItem = replaceItems.filter((item) => item.v !== null);
  const data = replaceItem.map((item) => item.v.toString());
  return data;
};

const Utils = { cleanRow };

export default Utils;
