import React from "react";
// import {GoogleCharts} from 'google-charts';

type Items = Item[];
type Item = { [key: string]: string | number | null };

function Connect() {
  //Home으로 옮겨야함
  const getSheetData = async () => {
    const sheetId = "1L57FP3cSkyWt2aOb6hlCb0dd1qWpm1Q2N25cXxWiFz4";
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;

    const response = await fetch(url);

    const data = await response.text();
    const convert = JSON.parse(data.substring(47).slice(0, -2));

    console.log(convert);

    const question = [];
    const items = convert.table.rows.map(({ c }: { c: Items }) => cleanRow(c));
    console.log(items);
  };
  getSheetData();

  function cleanRow(row: Items) {
    function replaceNull(item: Item) {
      if (item == null) {
        return { v: "" };
      }
      return item;
    }
    const data = row.map((item) => replaceNull(item)).map((item) => item.v);
    return data;
  }

  return <>dd</>;
}

export default Connect;

export async function loader() {
  return "";
}
