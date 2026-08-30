import { readLocalSchedules, writeLocalSchedules } from "./schedule-storage.js";
import { apiConfig } from "./api-config.js";

export async function scheduleCancel({ id }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    alert("Agendamento cancelado com sucesso!");
    return;
  } catch (error) {
    console.warn("Fallback local ativado para cancelamento de agendamento.", error);

    const localSchedules = readLocalSchedules();
    const nextSchedules = localSchedules.filter((schedule) => schedule.id !== id);

    writeLocalSchedules(nextSchedules);
    alert("Agendamento cancelado com sucesso!");
  }
}
