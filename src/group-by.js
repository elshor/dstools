module.exports = function(groupField){
	let groups = {};
	for(let i in this){
		let key = this[i][groupField];
		if(!groups[key]){
			groups[key] = {key:key,data:[]};
		}
		groups[key].data.push(this[i]);
	}
	return Object.values(groups);
};
