// ///////////////////////////////////////////////////
// /////         MQ  Control panel          ////////// 
// ///////////////////////////////////////////////////

/*
 * Requires jQuery, Bootstrap v2.x, spinner.js
 * 
 * Author: V.A. Soldatov, SBT
 */

var Splasher = function(){

	var target = null;
	
	var opts = null;
	
	var spinner = null;
	
	var counter = 0;
	
	function constructorFn(){
		
	}
	
	constructorFn.start = function(viewport){
		if (counter == 0){
			opts = {
					  lines: 12, // The number of lines to draw
					  length: 20, // The length of each line
					  width: 10, // The line thickness
					  radius: 30, // The radius of the inner circle
					  corners: 1, // Corner roundness (0..1)
					  rotate: 0, // The rotation offset
					  direction: 1, // 1: clockwise, -1: counterclockwise
					  color: '#468847', // #rgb or #rrggbb or array of colors
					  speed: 1, // Rounds per second
					  trail: 60, // Afterglow percentage
					  shadow: false, // Whether to render a shadow
					  hwaccel: false, // Whether to use hardware acceleration
					  className: 'spinner', // The CSS class to assign to the spinner
					  zIndex: 2e9, // The z-index (defaults to 2000000000)
					  top: '50%', // Top position relative to parent
					  left: '50%' // Left position relative to parent
				};
				
				if (typeof viewport != "undefined"){
					//target = document.getElementById(viewport);
					target = viewport;
				} else {
					target = UIController.getMainViewport();
				}
				
				counter++;
				spinner = new Spinner(opts).spin(target);			
		} else {
			counter++;
		}
		
	}

	constructorFn.stop = function(){
		if (counter > 0){
			counter--;
		}
		if (counter == 0){
			if (spinner != null){
				spinner.stop();
			}
		}
	}
	

	return constructorFn;

}();
