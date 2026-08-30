import { readLocalSchedules, writeLocalSchedules } from "./schedule-storage.js";
import { apiConfig } from "./api-config.js";
import dayjs from "dayjs";

function normalizeScheduleTime(value) {
  return dayjs(value).format("YYYY-MM-DDTHH:00:00");
}

export async function scheduleNew({ id, name, when }) {
  try {
    const localSchedules = readLocalSchedules();
    const sameHourExists = localSchedules.some(
      (schedule) => dayjs(schedule.when).format("YYYY-MM-DDTHH:00:00") === normalizeScheduleTime(when),
    );

    if (sameHourExists) {
      alert("Este horário já foi agendado.");
      return;
    }

    const response = await fetch(`${apiConfig.baseURL}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, when }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    alert("Agendamento realizado com sucesso!");
    return;
  } catch (error) {
    console.warn("Fallback local ativado para criação de agendamento.", error);

    const localSchedules = readLocalSchedules();
    const mergedSchedules = [...localSchedules, { id, name, when }];

    writeLocalSchedules(mergedSchedules);
    alert("Agendamento realizado com sucesso! (modo offline local)");
  }
}
