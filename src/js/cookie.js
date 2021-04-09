function Tool(){};
Tool.prototype = {
	constructor : Tool,
	cookie(key,value,json){
		json = json || {};
		let cookie_str = encodeURIComponent(key) + '=' + encodeURIComponent(value);
		if(!isNaN(json.expires)){
			let date = new Date();
			date.setDate(date.getDate() + json.expires);
			cookie_str += ';expires=' + date;
		}
		if(json.path){
			cookie_str += ';path=' + json.path;
		}
		if(json.domain){
			cookie_str += ';domain=' + json.domain;
		}
		if(json.secure){
			cookie_str += ';secure';
		}
		document.cookie = cookie_str;
	},
	getCookie(key){
		let arr = document.cookie.split('; ');
		for(let i = 0,len = arr.length;i < len;i ++){
			let list = arr[i].split('=');
			if(encodeURIComponent(key) === list[0]){
				return decodeURIComponent(list[1]);
			}
		}
	},
	removeCookie(key,json){
		json = json || {};
		if(json.path){
			document.cookie = encodeURIComponent(key) + '=;path=' + json.path + ';expires=' + new Date(0);
		}else{
			document.cookie = encodeURIComponent(key) + '=;expires=' + new Date(0);
		}
	},
	convertStrToObj(str){
		if(!str){
			return {};
		}
		return JSON.parse(str);
	}
}

