/* global Chart tableau */

// Set up polar area chart
// Bring in tableau dashboard data
// Set up filter action

tableau.extensions.initializeAsync().then(() => {
  console.log("Initialized, good job!!")
  getData();
})

async function getData() {
  const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
  const worksheet = worksheets.find(ws => ws.name === "Category");
  const dataTable = await worksheet.getSummaryDataAsync();
  //console.log(dataTable);
  
  let values = [];
  let labels = [];
  
  for (let row of dataTable.data){
    values.push(row[1].value);
    labels.push(row[0].value);
  }
   console.log(labels, values);
   
  drawChart({values, labels});
  
}

function drawChart({values, labels}){
  
  let ctx = document.getElementById("chart").getContext("2d");
  
  let colors = ["#264653", "#2A9D8F", "#85B773", "#FDD119", "#F4A261", "#E75B42"];
  
  //let labels = ["A","B","C","D","E"];
  //let values = [5,10,15,20,25];
  
  let data = {
    datasets: [{
      data: values,
      backgroundColor: colors
    }],
    labels: labels
  };

  let options = {
       maintainAspectRatio: false
  };

  let polarChart = new Chart(ctx, {
      data: data,
      type: 'polarArea',
      options: options
  });

  
}

