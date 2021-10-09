(function() {
  'use strict';

if($("#piechart-3d").length>0) {
  
  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(drawChart);


  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['One',     25],
      ['Two',      15],
      ['Three',  16],
      ['Four', 17],
      ['Five',    12],
      ['Six',    9]
    ]);

    var options = {
      title: '',
      is3D: true,
      fontSize: 10,
      forceIFrame: true,
      legend: {position: 'right', textStyle: { color: '#777', fontSize: 12}},
      pieSliceText:'none',
      backgroundColor: 'none',
      slices: {0: {color: 'ff9f2d'}, 1: {color: 'fee400'}, 2: {color: '99af31'}, 3: {color: '2063ad'}, 4: {color: 'da615d'}, 5: {color: 'cd3333'}}
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart-3d'));
    chart.draw(data, options);
  }

}

})(); 