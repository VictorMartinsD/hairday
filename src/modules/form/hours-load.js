import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";

export function hoursLoad({ date }) {
  openingHours.map((hour) => {
    const [scheduleHour] = hour.split(":");

    const isHourPast = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs());

    return {
      hour,
      available: isHourPast,
    };
  });
}
