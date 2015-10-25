// ///////////////////////////////////////////////////
// ////////          UI Control          ///////////// 
// ///////////////////////////////////////////////////

/* 
 * Author: V.A. Soldatov, SBT
 */
var UIController = function(){
	// the name of the main container is stored here
	mainViewport = null;
	mainNavport = null;
	mainViewName = null;
	mainNavName = null;
	
	statusViewport = null;
	statusViewName = null;
	
	function constructorFn(){
		
	}
	
	constructorFn.setStatusViewport = function(viewport){
		statusViewport = viewport;
		statusViewName = $(viewport).attr("id");
	}
	
	constructorFn.getStatusViewport = function(){
		return statusViewport;
	}
	
	constructorFn.getStatusViewName = function(){
		return statusViewName;
	}
	
	constructorFn.setMainViewport = function(viewport){
		mainViewport = viewport;
		mainViewName = $(viewport).attr("id");
	}
	
	constructorFn.setMainNavport = function(navport){
		mainNavport = navport;
		mainNavName = $(navport).attr("id");
	}

	constructorFn.getMainViewport = function(){
		return mainViewport;
	}
	
	constructorFn.getMainNavport = function(){
		return mainNavport;
	}
	
	constructorFn.setMainViewName = function(viewname){
		var viewport = document.getElementById(viewname);
		mainViewport = viewport;
		mainViewname = viewname;
	}
	
	constructorFn.setMainNavName = function(navname){
		var navport = document.getElementById(navname);
		mainNavport = navport;
		mainNavName = navname;
	}

	constructorFn.getMainViewName = function(){
		return mainViewname;
	}
	
	constructorFn.getMainNavName = function(){
		return mainViewname;
	}


	constructorFn.init = function(data){
		if (typeof data != "undefined"){
			var viewport = document.getElementById(data.viewport);
			var navport = document.getElementById(data.navport);
			mainViewName = data.viewport;
			mainNavName = data.navport;
			if (typeof data.status != 'undefined'){
				var statusview = document.getElementById(data.status);
				statusViewport = statusview;
				statusViewName = $(statusview).attr("id");
			}
			mainViewport = viewport;
			mainNavport = navport;
		}
		
		$(".left-panel").height($(window).height() - 120);
		$(".viewer-panel").height($(window).height() - 120);
		
		$(window).resize(function() {
			$(".left-panel").height($(window).height() - 120);
			$(".viewer-panel").height($(window).height() - 120);
			$("#createServiceFormWell").height($(".viewer-panel").height()-85);
		});
		
	}
	
	constructorFn.restoreHref = function(data){
		if (typeof data.href != 'undefined'){
			window.location.href = data.href;
		}
	}
	
	constructorFn.getRespawnToolkit = function(){
		var to_respawn = {tools: []};
		to_respawn.tools.push({
								call: constructorFn.restoreHref,
								param: {href: window.location.href}
							 });
		return to_respawn;
	}
	
	var temp_store = [];
	 
	constructorFn.saveElement = function(data){
		if (typeof data.key != 'undefined'){
			var to_save = {key: data.key};
			if (typeof data.value != 'undefined'){
				to_save.val = data.value;
			}
			if (typeof data.source != 'undefined'){
				to_save.source = data.source;
			}
			if (typeof data.restore != 'undefined'){
				to_save.restore = data.restore;
			}
			temp_store.push(to_save);
		}
	}
	
	constructorFn.loadElement = function(data){
		if (typeof data.key != 'undefined'){
			var to_load = null;
			var found = false;
			for (var i=0; !found & i<temp_store.length; i++){
				if (temp_store[i].key.valueOf() == data.key.valueOf()){
					to_load = temp_store[i];
					found = true;
				}
			}
			if (typeof to_load.source != 'undefined'){
				$('#'+to_load.source).html(to_load.val);
			} else if (typeof data.dest != 'undefined'){
				$('#'+data.dest).html(to_load.val);
			}
			if (typeof to_load.restore != 'undefined'){
				for (var i=0; i<to_load.restore.tools.length; i++){
					if (typeof to_load.restore.tools[i].param != 'undefined'){
						to_load.restore.tools[i].call(to_load.restore.tools[i].param);
					} else {
						to_load.restore.tools[i].call();
					}
				}
			}
		}
	}
	
	constructorFn.getElement = function(input){
		var result = null;
		if (typeof input.key != 'undefined'){
			var found = false;
			for (var i=0; !found & i<temp_store.length; i++){
				if (temp_store[i].key.valueOf() == input.key.valueOf()){
					found = true;
					result = temp_store[i];
				}
			}
		}
		return result;
	}

	constructorFn.saveElements = function(inputs){
		for (var i = 0; i<inputs.length; i++){
			UIController.saveElement(inputs[i]);
		} 
	}
	
	constructorFn.loadElements = function(inputs){
		for (var i = 0; i<inputs.length; i++){
			constructorFn.loadElement(inputs[i]);
		}
	}
	
	constructorFn.clearTemp = function(){
		temp_store.splice(0, temp_store.length);
	}

	constructorFn.removeElement = function(input){
		if (typeof input.key != 'undefined'){
			var found = false;
			for (var i=0; !found & i<temp_store.length; i++){
				if (input.key.valueOf() == temp_store[i].key.valueOf()){
					found = true;
					temp_store.splice(i, 1);
				}
			}
		}
	}
	
	return constructorFn;
}();