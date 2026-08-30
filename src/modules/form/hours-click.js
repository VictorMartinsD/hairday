export function hoursClick() {
  const hours = document.querySelectorAll(".hour-available");

  hours.forEach((available) => {
    available.addEventListener("click", (selected) => {
      const clickedHour = selected.currentTarget;

      if (!clickedHour || !clickedHour.classList.contains("hour-available")) {
        return;
      }

      hours.forEach((hour) => {
        hour.classList.remove("hour-selected");
      });

      clickedHour.classList.add("hour-selected");
    });
  });
}
