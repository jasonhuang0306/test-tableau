/* global Chart tableau */

// Set up polar area chart
// Bring in tableau dashboard data
// Set up filter action


 
  let ctx = document.getElementById("chart").getContext("2d");

  let colors = ["#264653", "#2A9D8F", "#85B773", "#FDD119", "#F4A261", "#E75B42"];

  let data = {
    datasets: [{
      data: [5,10,15],
      backgroundColor: colors
    }],
    labels: ["A","B","C"]
  };

  let options = {
       maintainAspectRatio: false
  };

  let polarChart = new Chart(ctx, {
      data: data,
      type: 'polarArea',
      options: options
  });


