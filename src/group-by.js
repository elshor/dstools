module.exports = function(data, groupField){
	let groups = {};
	for(let i in data){
		let key = data[i][groupField];
		if(!groups[key]){
			groups[key] = {key:key,data:[]};
		}
		groups[key].data.push(data[i]);
	}
	return Object.values(groups);
};
