$(document).ready(function(){

/********************************


iframe preview 


******************************************/
$(".size").find(".column").mouseenter(function(){

 
 var portlet = $(".portlet");
 var li = $("li");
  portlet.mouseover(function(){
    var present = $(this);
  present.addClass("highlight");
    present.click(function(){
	   
	  present.addClass("selected");
	  
	  
	  
	  li.click(function(){
	  
	 
	  present.removeClass("selected");
	  
	  
	  });
	
	});
	
   $(this).dblclick(function(){
   
    $(this).removeClass("selected");
	

    });
	  	
	
  });
  portlet.mouseout(function(){
  
    $(this).removeClass("highlight");
  
  });

  li.mouseover(function(){
     var link = $(this);
	  
    var a = link.children("a").attr("value");
    var id = link.children("a").attr("id");	 
	
     $(".quickView").attr("src", a);
	 
	 /***************************
	 
	  sending info to helpertabs.html
	 
	 *************************/
	 
	  $(".size").find(link).click(function(){
		  
	  window.location.href= "workBench.html?src=" + a +"&id=" + id ;
	  
	  
	  });
       	  
		
		
	
	 
	});

	
	 
	 li.mouseout(function(){
	 
	  $(".quickView").removeAttr("src");
	  
	 
	 });
  });
}); 
 
 


