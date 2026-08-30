export const openingHours = [
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

function normalizeHour(hour) {
  const [hourValue, minuteValue = "00"] = String(hour).split(":");
  const parsedHour = Number(hourValue);
  const parsedMinute = Number(minuteValue);

  if (!Number.isInteger(parsedHour) || !Number.isInteger(parsedMinute)) {
    return null;
  }

  const normalizedHour = String(parsedHour).padStart(2, "0");
  const normalizedMinute = String(parsedMinute).padStart(2, "0");

  return `${normalizedHour}:${normalizedMinute}`;
}

function sortOpeningHours(hours) {
  return [...hours].sort((firstHour, secondHour) => {
    const [firstHourValue, firstMinuteValue = "00"] = firstHour.split(":");
    const [secondHourValue, secondMinuteValue = "00"] = secondHour.split(":");

    return (
      Number(firstHourValue) * 60 +
      Number(firstMinuteValue) -
      (Number(secondHourValue) * 60 + Number(secondMinuteValue))
    );
  });
}

export function addOpeningHour(hour) {
  const normalizedHour = normalizeHour(hour);

  if (!normalizedHour || openingHours.includes(normalizedHour)) {
    return false;
  }

  openingHours.push(normalizedHour);
  openingHours.splice(0, openingHours.length, ...sortOpeningHours(openingHours));

  return true;
}

export function removeOpeningHour(hour) {
  const normalizedHour = normalizeHour(hour);

  if (!normalizedHour) {
    return false;
  }

  const index = openingHours.indexOf(normalizedHour);

  if (index === -1) {
    return false;
  }

  openingHours.splice(index, 1);

  return true;
}
