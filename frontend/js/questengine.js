var QuestEngine = function(){
    
    var constructorFn = function(){
        
    };
    
    var mainViewId = null;
    
	constructorFn.checkCookies = function(data){

		var session_str = Cookies.get("curr_session");
		var session = null;
        if (typeof session_str !== 'undefined'){
            if (session_str !== null){
				session = JSON.parse(session_str);
				//alert(session.session_token);
				return session;
			}
			
        }
		
		return null;
	}
	
	constructorFn.parseUrl = function(data){
	
	}
	
	constructorFn.startRedactor = function (input){
		Cookies.set("curr_session",JSON.stringify(input.session));
		MainRedactor.init({
							view: mainViewId,
							session: input.session
						  });
	}
	
	constructorFn.welcomeScreen = function(data){
		if (typeof data !== 'undefined'){
			if (typeof data.view !== 'undefined'){
					view = data.view;
			}
		}
		var welcome_html = "<div class='jumbotron'>"+
								"<div class='container-fluid'>"+
									"<div class='row'>"+
										"<div class='col-md-offset-2 col-md-8'>"+
											"<h1>Давай поиграем!</h1>"+
										"</div>"+
									"</div>"+
									"<div class='row'>"+
										"<div class='col-md-offset-2 col-md-8'>"+
											"<p>Впиши свой email и составь квест. Мы отправим тебе ссылку на него, чтобы не потерялась.</p>"+
										"</div>"+
									"</div>"+
									"<div class='row'>"+
										"<div id='errorfield' class='col-md-offset-2 col-md-8'>"+
											
										"</div>"+
									"</div>"+
									"<div class='row'>"+
										"<div class='col-md-offset-2 col-md-8'>"+
											"<input type='email' class='form-control' id='textinput' type='text' placeholder='Введите Ваш e-mail адрес'>"+
										"</div>"+
									"</div>"+		
									"<div class='row'>"+		
										"<div class='col-md-offset-4 col-md-4' style='padding-top:10px;'>"+
											"<button id='input1' type='button' class='btn btn-primary btn-lg btn-block'>Погнали!</button>"
										"</div>"+
									"</div>"+										
								"</div>"+
							"</div>";
		$("#"+mainViewId).html(welcome_html);
		
		var defaultmail = 'Введите Ваш e-mail адрес';
        $("#textinput").on('click focusin',function(){
            this.value='';
        });
           
        $("#input1").on('click',function(){
            var mail = $("#textinput").val();
            var req = {'new_email':mail};
                if (mail !== defaultmail){
                    
                DataControl.regAuthor({
										request: req,
										callback: QuestEngine.startRedactor
				 					 });
                }
        });
		
	}
	
    constructorFn.init = function(data){
        if (typeof data.view !== 'undefined'){
            mainViewId = data.view;
			
			//TODO: add parsing the URL first
			
			var last_session = constructorFn.checkCookies();
			
			if (last_session == null){
				constructorFn.welcomeScreen();
			} else {
				MainRedactor.init({
									view: data.view,
									session: last_session
								  });
			}
            
        }
    };
    
    return constructorFn;
}();