import d01 from "../Images/weatherIcons/01d.svg";
import n01 from "../Images/weatherIcons/01n.svg";
import d02 from "../Images/weatherIcons/02d.svg";
import n02 from "../Images/weatherIcons/02n.svg";
import d03 from "../Images/weatherIcons/03d.svg";
import n03 from "../Images/weatherIcons/03n.svg";
import d04 from "../Images/weatherIcons/04d.svg";
import n04 from "../Images/weatherIcons/04n.svg";
import d10 from "../Images/weatherIcons/10d.svg";
import n10 from "../Images/weatherIcons/10n.svg";
import d11 from "../Images/weatherIcons/11d.svg";
import n11 from "../Images/weatherIcons/11n.svg";
import d13 from "../Images/weatherIcons/13d.svg";
import n13 from "../Images/weatherIcons/13n.svg";

export const weatherIcons = [
  { img: d01, id: "01d" },
  { img: n01, id: "01n" },
  { img: d02, id: "02d" },
  { img: n02, id: "02n" },
  { img: d03, id: "03d" },
  { img: n03, id: "03n" },
  { img: d04, id: "04d" },
  { img: n04, id: "04n" },
  { img: d10, id: "10d" },
  { img: n10, id: "10n" },
  { img: d11, id: "11d" },
  { img: n11, id: "11n" },
  { img: d13, id: "13d" },
  { img: n13, id: "13n" },
];

export const getWeatherIcon = (weatherIcon: string) => {
  return weatherIcons.filter((icon) => {
    if (icon.id === weatherIcon) {
      return icon.img;
    }
  });
};
