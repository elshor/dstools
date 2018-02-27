const HTML = require('..').HTML;
const Collection = require('..').Collection;
const CDN_SOURCE = 'https://cdn.plot.ly/plotly-latest.min.js';

/**
 * Generate HTML for display of ${@link https://plot.ly/javascript/ plotly.js}
 * diagrams. When the properties of the data elements are either x or y, and their value is of type string, the function treats them as field names and replaces the field name with the data column, using the column function.
 * @alias plotly
 * @param   {Array}  data   An array of data objects. 
 * @param   {object} layout A layout options object passed to the plotly function
 * @returns {HTML}   HTML wrapper of the generated HTML code
 */
module.exports = function(collection, data,layout){
	for(let i=0;i<data.length;++i){
		assignArray(collection,data[i].x,data[i],'x');
		assignArray(collection,data[i].y,data[i],'y');
		assignArray(collection,data[i].z,data[i],'z');
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
