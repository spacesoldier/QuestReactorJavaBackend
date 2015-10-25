var DataControl = function(){
	
	var systemlist = null;
	
	function constructorFn(){
		
	}
	
	
	constructorFn.manageTable = function(input){
		var response = null;
		var askdata = '';
		if (typeof input.askmessage != 'undefined'){
			askdata = ': '+input.askmessage;
		}
		Splasher.start();
		var origRq = input.request;
		var payload = JSON.stringify(input.request.data);
		if (typeof payload == 'undefined'){
			payload = "";
		}
		
		var server_url="managetable";
		
		if (input.request.rqtype === "delete" | input.request.rqtype === "put"){
			server_url = server_url.concat("?data="+payload);
		}
		
		StatusBar.setStatus('Запрос данных'+askdata);
		$.ajax({
				url: server_url,
				type: input.request.rqtype,
				dataType: 'json',
				data: {data:payload},
				async: true,
				context: this,
				success: function(data){
							response = data;
					 	}
			  }).done(function(){
				if (typeof response.error != 'undefined'){
					if (response.error === "ok"){
						var output = response;
						output.rq = origRq;
						Splasher.stop();
						StatusBar.setStatus('Данные получены'+askdata);
					  	if (typeof input.callback != 'undefined') {
					  		input.callback(output);
					  	}
					}
					else {
						Splasher.stop();
						StatusBar.setStatus('Oops: '+response.error);
						if (response.error === "no values found"){
							var output = response;
							output.rq = origRq;
							StatusBar.setStatus('Данных не найдено'+askdata);
						  	if (typeof input.callback != 'undefined') {
						  		input.callback(output);
						  	}
						}
					}
				}
			  });
	}
	
	constructorFn.getAllTables = function(input){
		
		DataControl.manageTable({
			request: {
						rqtype: "get",
						data: {
								name: "pir"
							  }
					  },
			askmessage: "список ПИР",
			callback: input.callback
		});
		DataControl.manageTable({
			request: {
						rqtype: "get",
						data: {
								name: "system"
							  }
					  },
			askmessage: "справочник систем",
			callback: input.callback
		});
		DataControl.manageTable({
			request: {
						rqtype: "get",
						data: {
								name: "transport"
							  }
					  },
			askmessage: "справочник транспортов",
			callback: input.callback
		});
		DataControl.manageTable({
			request: {
						rqtype: "get",
						data: {
								name: "type"
							  }
					  },
			askmessage: "справочник типов",
			callback: input.callback
		});
		DataControl.manageTable({
			request: {
						rqtype: "get",
						data: {
								name: "type2"
							  }
					  },
			askmessage: "справочник типов2",
			callback: input.callback
		});
		DataControl.manageTable({
			request: {
						rqtype: "get",
						data: {
								name: "typeobject"
							  }
					  },
			askmessage: "справочник типов объектов",
			callback: input.callback
		});
	}
	
	return constructorFn;
}();