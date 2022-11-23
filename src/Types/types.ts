export type Coordinates = {
  lat: number | null;
  lon: number | null;
};

export type Location = {
  lat: number | null;
  lon: number | null;
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

export type DayWeather = {
  currDay: string;
  iconWeather?: string;
  min: number;
  max: number;
};

export interface dayItemProps {
  isLoadingWeather: boolean;
  isWeekDayTab: boolean;
  periodTimeOfday: number | string;
  weatherIcon: string;
  mintemp: number;
  maxTemp: number;
  tab: string;
  timezone?: number;
}

export interface WeekDayItemProps {
  dayOfWeek: string;
  weatherIcon: string;
  mintemp: number;
  maxTemp: number;
}

export interface listItemWeather {
  dt: 1661871600;
  main: {
    temp: 296.76;
    feels_like: 296.98;
    temp_min: number;
    temp_max: number;
    pressure: 1015;
    sea_level: 1015;
    grnd_level: 933;
    humidity: 69;
    temp_kf: -1.11;
  };
  weather: [
    {
      id: 500;
      main: "Rain";
      description: "light rain";
      icon: "10d";
    }
  ];
  clouds: {
    all: 100;
  };
  wind: {
    speed: 0.62;
    deg: 349;
    gust: 1.18;
  };
  visibility: 10000;
  pop: 0.32;
  rain: {
    "3h": 0.26;
  };
  sys: {
    pod: "d";
  };
  dt_txt: "2022-08-30 15:00:00";
}

export interface responseGetWeather {
  city: {
    id: 3163858;
    name: "Zocca";
    coord: {
      lat: 44.34;
      lon: 10.99;
    };
    country: "IT";
    population: 4593;
    timezone: 7200;
    sunrise: 1661834187;
    sunset: 1661882248;
  };
  cod: "200";
  message: 0;
  cnt: 40;
  list: [
    {
      dt: 1661871600;
      main: {
        temp: 296.76;
        feels_like: 296.98;
        temp_min: 296.76;
        temp_max: 297.87;
        pressure: 1015;
        sea_level: 1015;
        grnd_level: 933;
        humidity: 69;
        temp_kf: -1.11;
      };
      weather: [
        {
          id: 500;
          main: "Rain";
          description: "light rain";
          icon: "10d";
        }
      ];
      clouds: {
        all: 100;
      };
      wind: {
        speed: 0.62;
        deg: 349;
        gust: 1.18;
      };
      visibility: 10000;
      pop: 0.32;
      rain: {
        "3h": 0.26;
      };
      sys: {
        pod: "d";
      };
      dt_txt: "2022-08-30 15:00:00";
    }
  ];
}
