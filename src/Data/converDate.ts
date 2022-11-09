export const getCurrentTime = (date: string | number): string => {
  let min: number | string = new Date(Number(date) * 1000)
    .getMinutes()
    .toString();
  let hour: number | string = new Date(Number(date) * 1000)
    .getHours()
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
