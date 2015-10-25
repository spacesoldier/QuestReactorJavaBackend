var ErrorHandler = function(){
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
	
	constructorFn.showError = function(input){
		if (viewport == null){
			viewport = UIController.getErrorViewport();
		}
		var currError = '';
		
		if (typeof input.error != 'undefined'){
			currStatus = input.error;
		} else if (typeof input != 'undefined'){
			currStatus = input;
		}
		
		
		if (viewport != null){
			var error_html = "<div class='alert alert-warning alert-dismissible' role='alert'>"+
							  "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+
							  "<strong>Whoops!</strong> "+currStatus+
							"</div>";
			viewport.innerHTML = error_html;
		} else {
			alert(currStatus);
		}
		
		
	}
	

	
	return constructorFn;

}();