import { Play } from "types/user-data";

export interface BannerData {
  [key: string]: {
    img: string;
    link: string;
  };
}

export interface Onboarding {
  [key: string]: {
    img: string;
    title: string;
  };
}

export interface GuestData {
  playList: Play[];
  sheetUrl: string;
}
export type SheetUrl = string;

export interface Admin {
  banner: BannerData;
  guest: GuestData;
  onboarding: Onboarding;
}
