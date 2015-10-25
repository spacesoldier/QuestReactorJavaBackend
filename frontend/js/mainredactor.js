var MainRedactor = function(){
    constructorFn = function(){
        
    }
    
    var view = null;
	var curr_session = null;
	
	constructorFn.showQuestLink = function(input){
		var cur_href = window.location.href; // TOO BAD DECISION !!!!!
		
		var response_html = "<div class='col-md-12'>"+
								"<div class='form-group'>"+
									"<label for='inputQuestLink' style='padding-top:15px;'>Ссылка на квест. Сохрани, чтобы передать другу:</label>"+
									"<input type='text' class='form-control' id='inputQuestLink' placeholder='http://businessrush.ru/quest/XXXXXXX'>"+
								"</div>"+
							"</div>";
		$("#quest_params_section").html(response_html);
		$("#inputQuestLink").val(cur_href+"/quest/"+input.quest.hash_id);
	}
	
    constructorFn.newQuestForm = function(input){
		var createform_html = "<div class='container-fluid'>"+
									"<div class='row' id='quest_params_section'>"+
										"<div class='col-md-12'>"+
											"<div class='form-group'>"+
												"<label for='inputQuestName' style='padding-top:15px;'>Имя квеста</label>"+
												"<input type='text' class='form-control' id='inputQuestName' placeholder='Угадайка №1'>"+
												"<label for='inputQuestSuccessText' style='padding-top:15px;'>Сообщение в случае правильного решения:</label>"+
												"<input type='text' class='form-control' id='inputQuestSuccessText' placeholder='Поздравляю, друг!'>"+
												"<label for='inputQuestFailText' style='padding-top:15px;'>Сообщение в случае неверного решения:</label>"+
												"<input type='text' class='form-control' id='inputQuestFailText' placeholder='Попробуй ещё раз!'>"+
												"<label for='inputExpireDays' style='padding-top:15px;'>Срок жизни квеста, дней:</label>"+
												"<input type='text' class='form-control' id='inputExpireDays' placeholder='7'>"+
												
													//"<div class='embed-responsive embed-responsive-16by9'>"+
													//	"<iframe width='560' height='315' src='https://www.youtube.com/embed/J4LI_EqnJq8' frameborder='0' allowfullscreen></iframe>"+
													//"</div>"+
											"</div>"+
										"</div>"+
									"</div>"+
									"<div class='row' id='error_message_section'>"+
										"<div id='errorfield' class='col-md-offset-2 col-md-8'>"+
											
										"</div>"+
									"</div>"+
									"<div class='row'  id='action_button_section'>"+
										"<div class='col-md-12'>"+
											"<button id='create_quest_btn' type='button' class='btn btn-primary btn-lg btn-block'>Создать квест</button>"
										"</div>"+
									"</div>"+	
								"</div>";
		$("#"+input.view).html(createform_html);
		
		$("#create_quest_btn").on('click',function(){
            var req = {};
			req.quest_name = $("#inputQuestName").val();
			req.new_success_text = $("#inputQuestSuccessText").val();
			req.new_fail_text = $("#inputQuestFailText").val();
			req.days_to_expire = $("#inputExpireDays").val();
            req.session_token = curr_session.session_token;
                    
            DataControl.createQuest({
										request: req,
										callback: MainRedactor.showQuestLink
				 					 });
        });
	}
    constructorFn.init = function(input){
        var redactor_html = "<div class='row'>"+
								"<div class='col-md-3'>"+
									"<div class='container-fluid'>"+
										"<div class='row'>"+
											"<div id='slideList' class='well col-md-12'>"+
												
											"</div>"+
										"</div>"+
									"</div>"+
								"</div>"+
								"<div class='col-md-9'>"+
									"<div class='container-fluid'>"+
										"<div class='row'>"+
											"<div id='mainRedactor' class='well col-md-12'>"+
												
											"</div>"+
										"</div>"+
									"</div>"+
								"</div>"+
							"</div>";
		
		$("#"+input.view).html(redactor_html);
		
		var height = $(window).height();

        $("#slideList").height(height - 145);
        $("#mainRedactor").height(height - 145);
		
		curr_session = input.session;
		
		MainRedactor.newQuestForm({
									view: "mainRedactor",
									session: input.session
									});
		
    }
    
    return constructorFn;
}();