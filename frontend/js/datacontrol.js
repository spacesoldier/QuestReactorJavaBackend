var DataControl = function(){
	
	var systemlist = null;
	
	function constructorFn(){
		
	}
	
	constructorFn.regAuthor = function(input){
		if (typeof input.request != 'undefined'){
			var origRq = input.request;
			Splasher.start();
			 $.ajax({
						url: "http://1-dot-questreactorbackend.appspot.com/reg_author",
						type: 'GET',
						dataType: 'jsonp',  //use jsonp data type in order to perform cross domain ajax
						crossDomain: true,
						data: {data:JSON.stringify(input.request)},
						success: function(data){
									Splasher.stop();
									//alert(data.sessionToken);
									var message = "";
									var possible_solution = null;
									if (data.statusCode != 0){
										if (data.statusCode === -100){
											//message = "Кажется, Вы у нас уже бывали.";
											//possible_solution = "Хотите продолжить?";
											message = "Этот email уже зарегистрирован. Попробуйте другой.";
										} else{
											message = data.errorMessage;
										}
										ErrorHandler.showError({error:message, solution: possible_solution});
									} else {
										var new_session = {};
										new_session.session_token = data.sessionToken;
										new_session.session_id = data.sessionId;
										var output = {};
										output.rq = origRq;
										output.session = new_session;
										if (typeof input.callback != 'undefined') {
											input.callback(output);
										}
									}
								  },
						error: function(jqXHR, textStatus, errorThrown){
								  Splasher.stop();
								  //alert(errorThrown);
								  message = "Кажется, что-то не в порядке с сервером. Попросите админа посмотреть логи.";
							   }
			});
		}
	}
	
	constructorFn.createQuest = function(input){
		if (typeof input.request != 'undefined'){
			var origRq = input.request;
			Splasher.start();
			 $.ajax({
						url: "http://1-dot-questreactorbackend.appspot.com/create_quest",
						type: 'GET',
						dataType: 'jsonp',  //use jsonp data type in order to perform cross domain ajax
						crossDomain: true,
						data: {data:JSON.stringify(input.request)},
						success: function(data){
									Splasher.stop();
									//alert(data.sessionToken);
									var message = "";
									var possible_solution = null;
									if (data.statusCode != 0){
										if (data.statusCode === -200){
											message = "Кажется, что-то пошло не так. Обновите страницу.";
										} else{
											message = data.errorMessage;
										}
										ErrorHandler.showError({error:message, solution: possible_solution});
									} else {
										var new_quest = {};
										new_quest.hash_id = data.questHash;
										var output = {};
										output.rq = origRq;
										output.quest = new_quest;
										if (typeof input.callback != 'undefined') {
											input.callback(output);
										}
									}
								  },
						error: function(jqXHR, textStatus, errorThrown){
								  Splasher.stop();
								  //alert(errorThrown);
								  message = "Кажется, что-то не в порядке с сервером. Попросите админа посмотреть логи.";
							   }
			});
		}
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