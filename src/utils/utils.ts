import { Items, Item } from "types/GoogleSheet";

const cleanRow = (row: Items) => {
  function replaceNull(item: Item) {
    if (item == null) {
      return { v: "" };
    }
    return item;
  }
  const data = row
    .map((item) => replaceNull(item))
    .map((item) => item.v!.toString());
  return data;
};

const Utils = { cleanRow };

export default Utils;
