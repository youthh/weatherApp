export const getCurrentTime = (date: string | number, timezone = 0): string => {
  const utc_seconds =
    parseInt(String(date), 10) + parseInt(String(timezone), 10);
  const utc_milliseconds = utc_seconds * 1000;

  let min: number | string = new Date(utc_milliseconds)
    .getUTCMinutes()
    .toString();

  let hour: number | string = new Date(utc_milliseconds)
    .getUTCHours()
    .toString();

  if (+min < 10) {
    min += "0";
    min = min.split("").reverse().join("");
  }

  if (+hour < 10) {
    hour += "0";
    hour = hour.split("").reverse().join("");
  }

  return `${hour}:${min}`;
};
