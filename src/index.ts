import citiesJson from "../data/cities.json";
import provincesJson from "../data/provinces.json";

export interface Province {
  id: number;
  name: string;
  slug: string;
}

export interface City {
  id: number;
  name: string;
  slug: string;
  province_id: number;
}

const cities: readonly City[] = citiesJson;
const provinces: readonly Province[] = provincesJson;

// Return all cities
export function getAllCities(): readonly City[] {
  return cities;
}

// Return all provinces
export function getAllProvinces(): readonly Province[] {
  return provinces;
}

// Return all the cities of a specific province based on province's name
export function getCitiesByProvinceName(name: string): City[] {
  const province = provinces.find((p) => p.name === name);
  if (!province) return [];
  return cities.filter((city) => city.province_id === province.id);
}

// Return all the cities of a specific province based on province's ID
export function getCitiesByProvinceId(id: number): City[] {
  return cities.filter((city) => city.province_id === id);
}

// Return all the cities of a specific province based on province's slug
export function getCitiesByProvinceSlug(slug: string): City[] {
  const province = provinces.find((p) => p.slug === slug);
  if (!province) return [];
  return cities.filter((city) => city.province_id === province.id);
}

// Find city information by name
export function getCityByName(name: string): City[] {
  return cities.filter((city) => city.name === name);
}

// Find city information by ID
export function getCityById(id: number): City[] {
  return cities.filter((city) => city.id === id);
}

// Find city information by slug
export function getCityBySlug(slug: string): City[] {
  return cities.filter((city) => city.slug === slug);
}