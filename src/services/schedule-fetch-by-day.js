import { apiConfig } from "./api-config.js";
import dayjs from "dayjs";

export async function scheduleFetchByDay({ date }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules`);

    const data = await response.json();

    const dailySchedules = data.filter((schedule) => dayjs.js(date).isSame(schedule.when, "day"));

    return dailySchedules;
  } catch (error) {
    console.error(error);
    alert("Não foi possível buscar os agendamentos do dia selecionado.");
  }
}
