/* global Chart tableau */

// Set up polar area chart
// Bring in tableau dashboard data
// Set up filter action

tableau.extensions.initializeAsync().then(() => {
  console.log("Initialized!!")
  getData();
})


async function getData() {
  const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets
  const worksheet = worksheets.find(ws => ws.name === "Categories")
  const dataTable = await worksheet.getSummaryDataAsync();
  let allValues = [{
    label: "Furniture",
    value: 875
  }
  ]
  
  
  
  let values = [];
  let labels = [];
  
  for (let row of dataTable.data){
    values.push(row[1].value)
    labels.push(row[0].value)
  }
  
  drawChart({values,labels});
}

function drawChart({values,labels}){
  let ctx = document.getElementById("chart").getContext("2d");

  let colors = ["#264653", "#2A9D8F", "#85B773", "#FDD119", "#F4A261", "#E75B42"];

  let data = {
    datasets: [{
      data: values,
      backgroundColor: colors
    }],
    labels: labels
  };

  let options = {
    onClick: filter,
    maintainAspectRatio: false
  };

  let polarChart = new Chart(ctx, {
      data: data,
      type: 'polarArea',
      options: options
  });
}


function filter(event, item){
  const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets
  const worksheet = worksheets.find(ws => ws.name === "Sub-Categories")
  
  if (item[0]) {
    let index = item[0]["_index"];
    let label = item[0]["_chart"].data.labels[index];
    worksheet.applyFilterAsync("Category", [label], "replace")
  } else {
    worksheet.clearFilterAsync("Category")
  }
}