import { BRANDS as DEFAULT_BRANDS } from "./constants";

const STORAGE_KEY = "sv_brands";

export const getBrands = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BRANDS));
    return DEFAULT_BRANDS;
  }
  try {
    return JSON.parse(stored) as string[];
  } catch {
    return DEFAULT_BRANDS;
  }
};

export const saveBrands = (brands: string[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(brands));
};

export const addBrand = (name: string): boolean => {
  const trimmed = name.trim();
  if (!trimmed) return false;
  const brands = getBrands();
  if (brands.some((b) => b.toLowerCase() === trimmed.toLowerCase())) {
    return false; // Already exists
  }
  brands.push(trimmed);
  saveBrands(brands);
  return true;
};

export const updateBrand = (oldName: string, newName: string): boolean => {
  const oldTrimmed = oldName.trim();
  const newTrimmed = newName.trim();
  if (!newTrimmed || !oldTrimmed) return false;
  
  const brands = getBrands();
  const index = brands.findIndex((b) => b.toLowerCase() === oldTrimmed.toLowerCase());
  if (index === -1) return false;
  
  // Check duplicate of new name (excluding current one)
  if (
    brands.some(
      (b, idx) => idx !== index && b.toLowerCase() === newTrimmed.toLowerCase()
    )
  ) {
    return false;
  }
  
  brands[index] = newTrimmed;
  saveBrands(brands);
  return true;
};

export const deleteBrand = (name: string): boolean => {
  const trimmed = name.trim();
  const brands = getBrands();
  const filtered = brands.filter((b) => b.toLowerCase() !== trimmed.toLowerCase());
  if (filtered.length === brands.length) return false;
  saveBrands(filtered);
  return true;
};
