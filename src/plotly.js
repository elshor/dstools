const HTML = require('..').HTML;
const Collection = require('..').Collection;
const CDN_SOURCE = 'https://cdn.plot.ly/plotly-latest.min.js';

module.exports = function(data,layout){
	for(let i=0;i<data.length;++i){
		assignArray(this,data[i].x,data[i],'x');
		assignArray(this,data[i].y,data[i],'y');
	}

	return HTML(render(data,layout));
};

function assignArray(data,field,obj,targetField){
	if(field === 'this'){
		obj[targetField] = data;
	}else if(typeof field === 'function' ||typeof field === 'number' || typeof field === 'string'){
		obj[targetField] = Collection(data).column(field).data();
	}else{
		//field does not specify a field name of function or index - just leave it
		obj[targetField] = field;
	}
}

function render(data,layout){
	const timestamp = new Date().getTime();
	return `
	<div class="plotly-plot">
		<div id="notebook-plot-${timestamp}"></div>
		<script>
		function plot${timestamp}(){
			Plotly.plot('notebook-plot-${timestamp}',${JSON.stringify(data)}, ${JSON.stringify(layout)});
		}if(window.Plotly){plot${timestamp}();}else if(!window.require){
			var head = document.head || document.getElementsByTagName(\'head\')[0];
			var s = document.createElement(\'script\');
			s.src = '${CDN_SOURCE}';
			s.type = 'text/javascript';
			s.async = false;
			s.onreadystatechange = s.onload = plot${timestamp};
			head.appendChild(s);
		}else{
			require(['${CDN_SOURCE}'], function(Plotly){
				window.Plotly = Plotly;
				plot${timestamp}();
			});
		}
		</script>
		</div>
	`;
}
