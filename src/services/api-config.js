export const apiConfig = {
  baseURL:
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:3333"
      : "https://victormartinsd.github.io/hairday",
  storageKey: "hairday-schedules",
};
