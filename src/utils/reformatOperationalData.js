const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const reformatOperationalData = (data) => {
  const newData = data.map((item) => {
    const newObject = {
      weekday: item.weekday,
      open: item.startingTime,
      day: weekdays[parseInt(item.weekday) - 1],
      close: item.closingTime,
      status: item.status,
    };
    return newObject;
  });
  return newData;
};

export default reformatOperationalData;