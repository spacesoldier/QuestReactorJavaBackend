// ///////////////////////////////////////////////////
///////         Monitor Statusbar           ///////// 
/////////////////////////////////////////////////////

/* 
* Author: V.A. Soldatov, SBT
*/

var StatusBar = function(){
	
	var viewport = null;
	
	function constructorFn(){
		
	}
	
	constructorFn.setViewport = function(data){
		if (typeof data.viewport != 'undefined'){
			viewport = data.viewport;
		}
	}
	
	constructorFn.clear = function(){
		if (viewport != null){
			document.getElementById(viewport).innerHTML = '';
		}
	}
	
	constructorFn.setStatus = function(data){
		if (viewport == null){
			viewport = UIController.getStatusViewport();
		}
		var currStatus = '';
		
		if (typeof data.status != 'undefined'){
			currStatus = data.status;
		} else if (typeof data != 'undefined'){
			currStatus = data;
		}
		
		viewport.innerHTML = currStatus;
	}
	
	constructorFn.appendStatus = function(data){
		if (viewport == null){
			viewport = UIController.getStatusViewport();
		}
		var currStatus = '';
		if (typeof data.status != 'undefined'){
			currStatus = data.status;
		} else if (typeof data != 'undefined'){
			currStatus = data;
		}
		viewport.innerHTML = viewport.innerHTML.concat('&nbsp;,&nbsp;'+currStatus);
	}
	
	return constructorFn;
}();