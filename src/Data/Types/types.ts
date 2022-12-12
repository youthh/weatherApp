export type Coordinates = {
  lat: number;
  lon: number;
};

export type Location = {
  lat: number;
  lon: number;
  city: string;
  country: string;
  timezone: number;
};

export type SearchCityFields = {
  name: string;
  lat: number;
  lon: number;
  state?: string;
  country: string;
};

export type MarkerProps = {
  lon: number;
  lat: number;
};
