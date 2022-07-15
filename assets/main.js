const batteryLevel = document.querySelector(".battery");
const batteryP = document.querySelector(".battery h3");
const batteryTime = document.querySelector(".block p");
const battery_def = document.querySelector(".battery_def");

window.onload = () => {
  navigator.getBattery().then(function (battery) {
    const lev = battery.level * 100;
    function updateAllBatteryInfo() {
      updateChargingInfo();
      updateLevelInfo();
    }
    updateAllBatteryInfo();

    function updateChargingInfo() {
      if (battery.charging === true) {
        batteryLevel.classList.add("charging");
        battery_def.style.backgroundColor = "darkgreen";
      } else {
        batteryLevel.classList.remove("charging");
        if (parseInt(battery.dischargingTime)) {
          let hr = parseInt(battery.dischargingTime / 3600);
          let min = parseInt(battery.dischargingTime / 60 - hr * 60);
          batteryTime.innerHTML = `${hr} h ${min} min`;
        }
        if (lev < 20) {
          batteryLevel.style.backgroundColor = "rgb(255, 67, 67)";
          battery_def.style.backgroundColor = "rgb(255, 67, 67)";
        }
      }
    }

    function updateLevelInfo() {
      const status = lev + "%";
      batteryLevel.style.width = status;
      console.log(status);
      batteryP.innerHTML = parseInt(status) + "%";
    }

    battery.addEventListener("chargingchange", () => {
      updateAllBatteryInfo();
    });

    battery.addEventListener("levelchange", () => {
      updateAllBatteryInfo();
    });
  });
};
