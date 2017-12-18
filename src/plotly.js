const HTML = require('./html');
const Collection = require('./collection');
const CDN_SOURCE = 'https://cdn.plot.ly/plotly-latest.min.js';

module.exports = function(data,layout){
	for(let i=0;i<data.length;++i){
		if(typeof data[i].x === 'string'){
			assignArray(this,data[i].x,data[i],'x');
		}
		if(typeof data[i].y === 'string'){
			assignArray(this,data[i].y,data[i],'y');
		}
	}

	return HTML(render(data,layout));
};

function assignArray(data,field,obj,targetField){
	if(field === 'this'){
		obj[targetField] = data;
	}else{
		obj[targetField] = Collection(data).column(field).data();
	}
}
//TODO need to escape HTML
function render(data,layout){
	const timestamp = new Date().getTime();
	return `
	<div class="plotly-plot">
		<div id="notebook-plot-${timestamp}"></div>
		<script>
		function plot(){
			Plotly.plot('notebook-plot-${timestamp}',${JSON.stringify(data)}, ${JSON.stringify(layout)});
		}if(window.Plotly){plot();}else if(!window.require){
			var head = document.head || document.getElementsByTagName(\'head\')[0];
			var s = document.createElement(\'script\');
			s.src = '${CDN_SOURCE}';
			s.type = 'text/javascript';
			s.async = false;
			s.onreadystatechange = s.onload = plot;
			head.appendChild(s);
		}else{
			require(['${CDN_SOURCE}'], function(Plotly){
				window.Plotly = Plotly;
				plot();
			});
		}
		</script>
		</div>
	`;
}
