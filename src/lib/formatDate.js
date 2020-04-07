export default function formatDate(defaultDate) {
  const date = new Date(defaultDate);
  const [year, month, day, hour, minute] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
  const [thisYear, thisMonth, thisDay] = [
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate(),
  ];

  if (year === thisYear && month === thisMonth && day === thisDay) {
    return `${formatter(hour)}:${formatter(minute)}`;
  }

  if (year === thisYear) {
    return `${formatter(month)}-${formatter(day)}`;
  }

  return `${formatter(year)}-${formatter(month)}-${formatter(day)}`;
}

function formatter(target) {
  return target
    .toString()
    .slice(target.length - 2, target.length)
    .padStart(2, 0);
}
