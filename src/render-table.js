const _ = require('underscore');
const HTML = require('..').HTML;

module.exports = function(data,options){
	return HTML(renderTableStart(data,options)+
		renderHeader(data,options)+
		'<tbody>' +
		data.rows.map((row)=>renderRow(row,data.columns, options)).join('') +
		'</tbody>' +
		renderTableEnd(data,options)
							);
};

function renderTableStart(data, options){
	return `<div style="overflow:scroll">` +
		renderStyle() +
		'<table>' +
		(data.title? `<caption>${_.escape(data.title)}</caption>` : '');
}
function renderTableEnd(data, options){
	return '</div></table>';
}
function renderHeader(data,options){
	return `<thead class="theader"><tr>` +
		data.columns.map((column)=>`<th class="header-field">${_.escape(column.headerName)}</th>`).join('') +
		`</tr></thead>`;
}

function renderRow(row,columns, options){
	return `<tr class="table-row">`+
		columns.map((column)=>`<td class="table-cell">${typeof row[column.field] === 'object'?'':_.escape(row[column.field])}</td>`).join('')	+
		`</tr>`;
}

function renderStyle(){
	return `
<style scoped>
strong {
	font-weight: bold;
}

em {
	font-style: italic;
}

table {
	background: #f5f5f5;
	border-collapse: separate;
	box-shadow: inset 0 1px 0 #fff;
	font-size: 12px;
	line-height: 24px;
	margin: 30px auto;
	text-align: left;
	width: 800px;
}

th {
	background:  linear-gradient(#777, #444);
	border-left: 1px solid #555;
	border-right: 1px solid #777;
	border-top: 1px solid #555;
	border-bottom: 1px solid #333;
	box-shadow: inset 0 1px 0 #999;
	color: #fff;
  font-weight: bold;
	padding: 10px 15px;
	position: relative;
	text-shadow: 0 1px 0 #000;
}
th.header-field{
	text-align: left;
}
th:after {
	background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,.08));
	content: '';
	display: block;
	height: 25%;
	left: 0;
	margin: 1px 0 0 0;
	position: absolute;
	top: 25%;
	width: 100%;
}

th:first-child {
	border-left: 1px solid #777;
	box-shadow: inset 1px 1px 0 #999;
}

th:last-child {
	box-shadow: inset -1px 1px 0 #999;
}

td.table-cell {
	border-right: 1px solid #fff;
	border-left: 1px solid #e8e8e8;
	border-top: 1px solid #fff;
	border-bottom: 1px solid #e8e8e8;
	padding: 10px 15px;
	position: relative;
	transition: all 300ms;
	text-align:left;
}

td.table-cell:first-child {
	box-shadow: inset 1px 0 0 #fff;
}

td.table-cell:last-child {
	border-right: 1px solid #e8e8e8;
	box-shadow: inset -1px 0 0 #fff;
}


tr:last-of-type td {
	box-shadow: inset 0 -1px 0 #fff;
}

tr:last-of-type td:first-child {
	box-shadow: inset 1px -1px 0 #fff;
}

tr:last-of-type td:last-child {
	box-shadow: inset -1px -1px 0 #fff;
}
th{
	width:8em;
}
</style>`;
}
