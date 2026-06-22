import banner1 from "../assets/banner-sneaker.png";
import banner2 from "../assets/banner-sneaker2.png";

export interface BannerItem {
  id: string;
  image: string;
  link: string;
  alt: string;
}

const STORAGE_KEY = "sv_banners";

const DEFAULT_BANNERS: BannerItem[] = [
  {
    id: "default-1",
    image: banner1,
    link: "/shop",
    alt: "Sneaker Vault Banner 1",
  },
  {
    id: "default-2",
    image: banner2,
    link: "/shop",
    alt: "Sneaker Vault Banner 2",
  },
];

export const getBanners = (): BannerItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BANNERS));
    return DEFAULT_BANNERS;
  }
  try {
    return JSON.parse(stored) as BannerItem[];
  } catch {
    return DEFAULT_BANNERS;
  }
};

export const saveBanners = (banners: BannerItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(banners));
};

export const addBanner = (banner: Omit<BannerItem, "id">): BannerItem => {
  const banners = getBanners();
  const newBanner: BannerItem = {
    ...banner,
    id: `banner-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  banners.push(newBanner);
  saveBanners(banners);
  return newBanner;
};

export const updateBanner = (updatedBanner: BannerItem): boolean => {
  const banners = getBanners();
  const index = banners.findIndex((b) => b.id === updatedBanner.id);
  if (index === -1) return false;
  banners[index] = updatedBanner;
  saveBanners(banners);
  return true;
};

export const deleteBanner = (id: string): boolean => {
  const banners = getBanners();
  const filtered = banners.filter((b) => b.id !== id);
  if (filtered.length === banners.length) return false;
  saveBanners(filtered);
  return true;
};
