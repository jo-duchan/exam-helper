export type BannerData = {
  [key: string]: {
    img: string;
    link: string;
  };
};

export type Onboarding = {
  [key: string]: {
    img: string;
    title: string;
  };
};

export type SheetUrl = string;

export type Admin = { banner: BannerData; sheetUrl: SheetUrl };
