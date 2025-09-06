export const renderTime = (): string => {
  const now: Date = new Date();

  let hour: number = now.getHours();
  let min: number | string = now.getMinutes();

  let hourPrefix: "AM" | "PM" = "AM";

  if (hour >= 12) {
    hour -= 12;
    hourPrefix = "PM";
  }
  if (hour === 0) {
    hour = 12;
  }
  if (min < 10) {
    min = "0" + min;
  }

  return `${hour}:${min} ${hourPrefix}`;
};
