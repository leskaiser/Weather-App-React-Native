const nowHours = () => {
  const nowDate = new Date();
  return `${(nowDate.getHours()).toString().padStart(2, "0")}:${(nowDate.getMinutes()).toString().padStart(2, "0")}`;
};

const DAYS = Object.freeze(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]);

const formatDate = date => `${date.getDate().toString().padStart(2, "0")} / ${(date.getMonth() + 1).toString().padStart(2, "0")}`;

export {nowHours, DAYS, formatDate};