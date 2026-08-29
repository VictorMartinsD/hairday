import { apiConfig } from "./api-config.js";
import dayjs from "dayjs";
import { readLocalSchedules } from "./schedule-storage.js";

export async function scheduleFetchByDay({ date }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const dailySchedules = data.filter((schedule) => dayjs(date).isSame(schedule.when, "day"));

    return dailySchedules;
  } catch (error) {
    console.warn("Usando fallback local para agendamentos.", error);

    const localSchedules = readLocalSchedules();
    const dailySchedules = localSchedules.filter((schedule) => dayjs(date).isSame(schedule.when, "day"));

    return dailySchedules;
  }
}
