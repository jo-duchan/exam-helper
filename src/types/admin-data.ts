export type Banner = {
  [key: string]: {
    img: string;
    link: string;
  };
};

export type SheetUrl = string;

export type Admin = { banner: Banner; sheetUrl: SheetUrl };
