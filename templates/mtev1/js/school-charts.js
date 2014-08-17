if(typeof google != 'undefined' && google['load'] ){
	google.load("visualization", "1", {packages:["corechart"]});
	google.setOnLoadCallback(drawCharts);
}

function drawCharts() {
    jQuery('.chart').each(function(index,item){
        drawChart(jQuery(item).attr('name'));
    });
}
function drawChart(materia){
	var raw_data = $.parseJSON($('#line-chart-data-'+materia).html()),
	data = google.visualization.arrayToDataTable(raw_data),
	colors = ["#16A452","#339DD1","#E9068B","#F6911B","#990099","#888888"],	
	options = {
	   chartArea : {width:295,height:94,left:40,top:35}
	   ,legend: {position:'none'}
	   ,colors:colors
	},
	nLine = raw_data[0].length-1,
	template = "<p><span class='circle' style='background:C'></span>N</p>",
	content =$('.legend_chart .wrap_lc').html(""),
	temp;
	for(var i=1;i<=nLine;i++){
		temp = $(template.replace('N',raw_data[0][i]).replace('C',colors[i-1]));
		content.append(temp);
	}

	var chart = new google.visualization.LineChart(document.getElementById('profile-line-chart-'+materia));
	chart.draw(data, options);
}
