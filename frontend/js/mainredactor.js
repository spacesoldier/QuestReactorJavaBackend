var MainRedactor = function(){
    constructorFn = function(){
        
    }
    
    var view = null;
    
    constructorFn.init = function(data){
        if (typeof data.view !== undefined){
            view = data.view;
        }
        if (view !== null){
            $("#"+view).html("<h1>BINGO</h1>");
        }
        Cookies.set("test","testval");
        if (Cookies.get("test")==="testval"){
            Cookies.remove("test");
            $("#"+view).html("<h1>BINGO! Cookies are enabled.</h1>");
        }
    }
    
    return constructorFn;
}();