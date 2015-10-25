var QuestEngine = function(){
    
    var constructorFn = function(){
        
    };
    
    var mainView = null;
    
    constructorFn.init = function(data){
        if (typeof data.view !== undefined){
            mainView = data.view;
            MainRedactor.init({view: data.view});
        }
    };
    
    return constructorFn;
}();