document.getElementById("darkToggle").addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("logo").addEventListener("click", () => {
  const logo = document.getElementById("logo");
  logo.classList.add("spin");
  setTimeout(() => logo.classList.remove("spin"), 1000);
});

document.getElementById("waterForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const values = {
    Drinking: parseFloat(document.getElementById("drinking").value) || 0,
    Shower: (parseFloat(document.getElementById("shower").value) || 0) * 9,
    Toilet: (parseFloat(document.getElementById("toilet").value) || 0) * 6,
    Cooking: parseFloat(document.getElementById("cooking").value) || 0,
    Washing: (parseFloat(document.getElementById("washing").value) || 0) * 60,
    Other: parseFloat(document.getElementById("extra").value) || 0
  };

  const total = Object.values(values).reduce((a, b) => a + b, 0);
  document.getElementById("totalUsage").textContent = total.toFixed(1) + " litres";
  document.getElementById("result").classList.remove("hidden");

  const maxUse = Object.entries(values).sort((a, b) => b[1] - a[1])[0][0];

  const tips = {
    Shower: "Take shorter showers and turn off the tap while soaping.",
    Toilet: "Use dual-flush or low-water toilets.",
    Cooking: "Don't run water while prepping vegetables.",
    Washing: "Use washing machines only with full loads.",
    Drinking: "Drink only what you need. Avoid waste.",
    Other: "Fix leaks and turn off taps when not needed."
  };

  const tipList = document.getElementById("tipList");
  tipList.innerHTML = "";

  Object.entries(tips).forEach(([key, tip]) => {
    const li = document.createElement("li");
    li.textContent = tip;
    if (key === maxUse) li.classList.add("highlight");
    tipList.appendChild(li);
  });

  // Chart
  const ctx = document.getElementById("chart").getContext("2d");
  if (window.usageChart) window.usageChart.destroy();
  window.usageChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(values),
      datasets: [{
        label: 'Water Usage (litres)',
        data: Object.values(values),
        backgroundColor: '#29b6f6'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
});
