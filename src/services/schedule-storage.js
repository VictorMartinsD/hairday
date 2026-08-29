import { apiConfig } from "./api-config.js";

export function readLocalSchedules() {
  if (typeof window === "undefined" || !window.localStorage) {
    return [];
  }

  try {
    const savedSchedules = window.localStorage.getItem(apiConfig.storageKey);

    if (!savedSchedules) {
      return [];
    }

    const parsedSchedules = JSON.parse(savedSchedules);

    return Array.isArray(parsedSchedules) ? parsedSchedules : (parsedSchedules.schedules ?? []);
  } catch (error) {
    console.error("Não foi possível lê os agendamentos salvos localmente.", error);
    return [];
  }
}

export function writeLocalSchedules(schedules) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(apiConfig.storageKey, JSON.stringify(schedules));
}
