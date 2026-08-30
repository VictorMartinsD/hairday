import dayjs from "dayjs";
import { hoursClick } from "./hours-click.js";
import { openingHours } from "../../utils/opening-hours.js";

const hours = document.getElementById("hours");

export function hoursLoad({ date, dailySchedules }) {
  hours.innerHTML = "";

  const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"));

  const opening = openingHours.map((hour) => {
    const [hourValue, minuteValue] = hour.split(":");
    const normalizedHour = `${String(hourValue).padStart(2, "0")}:${minuteValue}`;

    const isHourPast = dayjs(date).add(hourValue, "hour").isBefore(dayjs());
    const available = !unavailableHours.includes(normalizedHour) && !isHourPast;

    return {
      hour: normalizedHour,
      available,
    };
  });

  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");

    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");
    li.setAttribute("aria-disabled", String(!available));
    li.setAttribute("tabindex", available ? "0" : "-1");

    li.textContent = hour;

    if (hour === "9:00") {
      hourHeaderAdd("Manhã");
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde");
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite");
    }

    hours.append(li);
  });

  hoursClick();
}

function hourHeaderAdd(title) {
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;

  hours.append(header);
}
