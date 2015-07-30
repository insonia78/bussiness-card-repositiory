
/*******************************
Grabbing the db_parameters from the  dataBase_dialog.html 



***********************************/





/****************************************

 database IndexedDb
 
******************************************/
var whichNumber = "";
    var n_tabs ;
    var check = 2; 
	
	
	
	
    var tabCounter = 1;
	var divAccordion = "";
    var hAccordion = "";
    var tabId = "";
	
	
	
	var tabs = ""
	var url = [] ;
	var tabs = "";
	var active_accordion = "";
       
	 var id = "";
	 var check =false; 
	 var files = false,
	  ul = "";  
		
		
		
		
	var atabs = [] ;
    var aAccordion;
    var title ;	
    var description;
	 

/******************

db variables
*******************/
var idbSupported = false;
var db;
var db_name;
var db_table;
var openRequest ;
var e ;
var thisDB ;

 
document.addEventListener("DOMContentLoaded", function(){
	
     $( "#add_db" )
      .button()
      .click(function() { 	  
	 window.location.href= "dataBase_dialog.html";
  });

	 
    if("indexedDB" in window) {
        idbSupported = true;
    }
	if(document.location.href)
	{
	
        var url = document.location.href,
         params = url.split('?')[1].split('&'),
	     data = {},
		 tmp;
	
          
         for (var i = 0, l = params.length; i < l; i++) {
           tmp = params[i].split('=');
           data[tmp[0]] = tmp[1];
           data[tmp[1]] = tmp[2];
          	   
		   db_name = data.db_name; 
		  
		   
		  
		 }  
		 
		
     }	
  
    if(idbSupported && document.location.href) {
	     if(db_name)
		 {			 
		     openRequest = indexedDB.open(db_name);	 
          
		  }
        openRequest.onupgradeneeded = function(e) {
            alert("Upgrading...");
		    thisDB = e.target.result;	
 
        }
       
        openRequest.onsuccess = function(e) {
			
              alert("Success! Connected to IndexedDb ");
			
			db = e.target.result;
			var range = db.objectStoreNames.length;
			for(var i = 0 ; i < db.objectStoreNames.length ; i++)
			{		
                   
			      addAccordiondb(db.objectStoreNames.item(i),i);
				 
				  
			}
				  
			//addData()
			
        }
 
        openRequest.onerror = function(e) {
            alert("Error! Not Connected to IndexedDb ");
            console.dir(e);
        }
 
    }
  



/******************************
tool tip

********************************/

$( document ).tooltip();



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
		  
	  window.location.href= "workBench.html?src=" + a +"&id=" + id + "&db_name=" + db_name + "&db=" + db + "&tabs= " + atabs;
	  
	  
	  });
       	  
		
		
	
	 
	});

	
	 
	 li.mouseout(function(){
	 
	  $(".quickView").removeAttr("src");
	  
	 
	 });
  });
 
  
  
  
  
  
  
	
/**************************

 accordion structure
 

***************************/	



 
 
	 
	
var accordion = $( "#accordion" ).accordion({
      collapsible: true,
	  heightStyle: "content",
     create: function()
	 {
	    
	   for(var i = 1 ; check == false ; i++)
	  {
		var find_which_number = $(".divAccordion"+i).attr("id");
					
		  if(find_which_number)
		  {
			  
			  $(".dinamicTab"+i).addClass( " selected ui-tabs ui-widget ui-widget-content ui-corner-all" )
               .children("ul")
              .addClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" );

	 $("#ul"+i).find("li").addClass("ui-state-default ui-corner-top ");
			  
			  
			   $(".portlet").addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
               .find( ".portlet-header" )
              .addClass( "ui-widget-header ui-corner-all" )
              .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

						
		  }
		  else
		 {
			
				n_tabs = i;
				check = !check;
		 }
	 }
	 check = !check;
					
					
	}
	 
	 
	 
	 
	 
	 	  
	  
});
  
	/*************************************

Adding an Accordion

**************************************/







var dialog = $( "#accordion_dialog" ).dialog({
      autoOpen: false,
      modal: true,
	  width: 500,
	  height:700,
      buttons: {
        Add: function() {
          addAccordion();
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
      }
    });
 
    // addTab form: calls addTab function on submit and closes the dialog
    var form = dialog.find( "form" ).submit(function( event ) {
      addAccordion();
      dialog.dialog( "close" );
      event.preventDefault();
	  
    });


$( "#add_accordion" )
      .button()
      .click(function() { 	  
	 $('#accordion_dialog').dialog( "open" );
  });	 


  
var n_tabs = 1;
//<div class="divAccordion1 ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active" id="ui-id-1" aria-labelledby="divAccordion1" role="tabpanel" aria-hidden="false" style="display: block;">
var version;
var database;
//////////////////////////////////////////////////
/***********************************************


>>>>>>>>>>>>>>>>>>>>>>>>> Adding accortion


*********************************************/
/////////////////////////////////////////////////////////

	
function addAccordion()
{
    
	title = $("#accordion_title").val();
	url[0] = title ;	
    tabCounter = 0;
	           
    	           	      
     description = $("#accordion_content").val();
						 
		   
   
   
  
  
	for(var i = 1 ; check == false ; i++)
	{
		var find_which_number = $(".divAccordion"+i).attr("id");
					
		  if(find_which_number)
		  {			  
						
		  }
		  else
		 {				
				n_tabs = i;
				check = !check;
		 }
					
					
	}
	check = !check;
	
	
	var secondRequest;
	////////////////////////////////////////////////
	/*************************************
	
	
   >>>>>>>>>>>>>>>>>>>>>>>indexedDb part	



	***************************************/
	/////////////////////////////////
	
	
   if(db_name)
   { 
        
        
        database = db;
        version =  parseInt(database.version);
	
		version += 1;
		
        database.close();
		
	    
		
		if(version)
		{
		
           secondRequest = indexedDB.open(db_name,version);
	         
         
		}
		
       secondRequest.onupgradeneeded = function(e) {
       alert("Upgrading...");
       var thisDB = e.target.result;
			
			
			
			
			
			if(!thisDB.objectStoreNames.contains(title)) {
               var objectStore = thisDB.createObjectStore(title, {autoIncrement: true});
			   
				objectStore.createIndex("n_tabs" , "n_tabs" , { unique : true });
				objectStore.createIndex("anewTab", "anewTab" , { unique : true });
				alert("the data has been updated");
            }
			else
			{
				alert("the accordion already exist");
				
			}
 
        }
		
		
		
		
		
		secondRequest.onsuccess = function(e) 
		{
            alert("Success! Connected to IndexedDb ");
            db = e.target.result;
			//addData()
			 var transaction = db.transaction([title],"readwrite");
            var store = transaction.objectStore(title);
			
		   aAccordion = new newAccordion();
	       aAccordion.accordion = title;
           aAccordion.description = description;	
		   
          
	
      divAccordion = String("divAccordion"+ n_tabs);
	  hAccordion = String("hAccordion"+ n_tabs);
	  
	  aAccordion.id = divAccordion;
	  aAccordion.n_tabs = n_tabs;
	  aAccordion.tabs = "tabs" + n_tabs ; 
	  
	   var newDiv = $("<h3 id = '"+ divAccordion +"'class = '"+ hAccordion + " ui-accordion-header ui-state-default ui-accordion-header-active ui-state-active ui-corner-top ui-accordion-icons' title ='"+ description +"'  >'"+ title +"'<span class='close_position ui-icon ui-icon-close' role='presentation'>Remove Accordion</span></h3><div class ='"+divAccordion+" ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active' id='ui-id-"+ n_tabs +"' value = '"+ title +"' aria-labelledby='"+ divAccordion+ "' role='tabpanel' aria-hidden='false' style='display: block;'></div>");
	   
	    
	  //  var newDiv = $("<h3 class = '"+ hAccordion +" ui-accordion-header ui-state-default ui-accordion-header-active ui-state-active ui-corner-top ui-accordion-icons' contenteditable='true' >hello</h3><div class ='"+divAccordion+" ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active'></div>");
	   
	    
		   
		  accordion.append(newDiv);   
		  
	  	
	    divAccordion = String(".divAccordion"+ n_tabs);
	    hAccordion  = String("hAccordion"+ n_tabs);
        
	
  


  /////////////////////////////////////
  /*************************************
  
 >>>>>>>>>>>>>>>>>>>>> Adding the tab holder to the accordion
  
  
  ***************************************/
  
  ///////////////////////////////////////////
		    
    
			   whichNumber  = String("dinamicTab" + hAccordion[(hAccordion.length - 1)]);
			 
              accordion.find(divAccordion).append($("<div id='tabs"+ n_tabs +"'   class =' selected " + whichNumber + "'></div>")
	          .addClass( " ui-tabs ui-widget ui-widget-content ui-corner-all" )
	          .append($("<ul><li><span class='preview ui-icon ui-icon-unlocked' role='presentation'>Expand</span></li></ul>")
	          .addClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" ))
	          );
			  id = whichNumber;
			  alert('480');
			 accordion.accordion("refresh");
			 
			 
			  accordion.delegate( "span.ui-icon-close", "click", function() {
              var panelId = $( this ).closest( "h3" ).remove().attr( "aria-controls" );
              $( "#" + panelId ).remove();
             accordion.tabs( "refresh" );
            });
 
            accordion.bind( "keyup", function( event ) {
              if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
             var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
             $( "#" + panelId ).remove();
             accordion.tabs( "refresh" );
             }
          });
             
			  
			//  $(".ui-accordion-header-active").mouseover(function(){
		   var request = store.add(aAccordion,version); 
         
	       request.onerror = function(e) {
           alert("Error",e.target.error.name);
        //some type of error handler
          }
 
         request.onsuccess = function(e) {
         alert("table created");
         }
         	

        
		 	
     }
 
        secondRequest.onerror = function(e) {
            alert("Error! Not Connected to IndexedDb ");
            console.dir(e);
        }
 
   
   
   // creating the object that will store the tabs and other things lol 
   
       
  }
		

 }//end of function accordition
 
 
 //////////////////////////////////////////////////
 
 /*****************************
 
 adding Accordiondb
 
 
 ******************************/
 
 /////////////////////////////////////////////////
 
 
 
function addAccordiondb(title,key) 
{
	
     key += 2 ;	
	
	
	var transaction = db.transaction([title],"readonly");
	var store = transaction.objectStore(title);
	var anewTab ;
	var tabs ;
	
	var index = store.index("n_tabs");
	
	
	  var request = index.openCursor(key);
      request.onsuccess = function(event) {
       alert("559" + title);
	   var cursor = event.target.result;
     
	 if(cursor) 
	 {
		
		 
			  		
		n_tabs = cursor.value.n_tabs;
	    description = cursor.value.description;
		anewTab = cursor.value.anewTab;
	    tabs = cursor.value.tabs ;
	var accordion = addAccordionToScreen(n_tabs, title , description,tabs);
		addTabdb(anewTab,divAccordion,accordion,tabs); 
		
		
	  }
	  else
	  {
		  alert("no data");
		  
		  
		  
	  }
	 
	  
	}      	      
//////////////////////////////////////////////////////////////////////
/************************************************

>>>>>>>>>>>>>>>>>>>>> Adding accordion to the screen


*****************************************************/

/////////////////////////////////////////////////////////

	 
		   
   
   
  
  
	 function addAccordionToScreen(n_tabs, title , description)
	 {
  
 
   
   
      divAccordion = String("divAccordion" + n_tabs);
	   hAccordion = String("hAccordion" + n_tabs);
	  
	   var newDiv = $("<h3 id = '"+ divAccordion +"'class = '"+ title + " " + hAccordion + " ui-accordion-header ui-state-default ui-accordion-header-active ui-state-active ui-corner-top ui-accordion-icons' title ='"+ description +"'  >'"+ title +"'<span class='close_position ui-icon ui-icon-close' role='presentation'>Remove Accordion</span></h3><div class ='"+divAccordion+" ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active' id='ui-id-"+ n_tabs +"' value = '"+ title +"' aria-labelledby='"+ divAccordion+ "' role='tabpanel' aria-hidden='false' style='display: block;'></div>");
	   
	    
	  //  var newDiv = $("<h3 class = '"+ hAccordion +" ui-accordion-header ui-state-default ui-accordion-header-active ui-state-active ui-corner-top ui-accordion-icons' contenteditable='true' >hello</h3><div class ='"+divAccordion+" ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active'></div>");
	   
	    
		   
		  accordion.append(newDiv);   
		  
	  	
	    divAccordion = String(".divAccordion"+ n_tabs);
	    hAccordion  = String("hAccordion"+ n_tabs);
        
	
  



		    
    
			   whichNumber  = String("dinamicTab" + hAccordion[(hAccordion.length - 1)]);
			 
              accordion.find(divAccordion).append($("<div id='"+ tabs +"'   class =' "+ title + "  selected " + whichNumber + " '></div>")
	          .addClass( " ui-tabs ui-widget ui-widget-content ui-corner-all" )
	          .append($("<ul><li><span class='preview ui-icon ui-icon-unlocked' role='presentation'>Expand</span></li></ul>")
	          .addClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" ))
	          );
			  id = whichNumber;
			 accordion.accordion("refresh");
			 
			 
			  accordion.delegate( "span.ui-icon-close", "click", function() {
              var panelId = $( this ).closest( "h3" ).remove().attr( "aria-controls" );
              $( "#" + panelId ).remove();
             accordion.tabs( "refresh" );
            });
 
            accordion.bind( "keyup", function( event ) {
              if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
             var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
             $( "#" + panelId ).remove();
             accordion.tabs( "refresh" );
             }
          });
             
			  return accordion;			 
			 
			
	    } ///// end of accordiondb
		
 /**************************
 
			  
			  
			  
			  
			  
************************/
		//////////////////////////////////////////////////////////////////////
/***********************************************************

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding addTabdb


*****************************************************************/

//////////////////////////////////////////////////////////////////////////
		
		
		
		
		function addTabdb(anewTab,divAccordion,accordion,tabs1) {
	
	    
	 
    
	
	
		alert("707 " + anewTab.length);
       
	      
		
	for(var i = 0; i < anewTab.length ; i++)
	{
	
	  
	
	     var tabCounter = anewTab[i].i;
    
	     alert("718 " + tabCounter);
		 
		 var tabTitle = anewTab[i].name,
             tabContent = anewTab[i].description,
             tabTemplate = "<li title = '#{title}'  value = '#{value}'><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
      
		id = anewTab[i].id;
		alert(id + " 724 " + tabTitle );
		
		
		alert(tabCounter + " 704 " + tabs);
        
		
		
        
        
		

		tabs = $("#"+ tabs1 ).tabs();
		
      var label = tabTitle || "Tab " + tabCounter,
        id = "tabs-" + tabCounter,
        li = $( tabTemplate.replace( /#\{title\}/g, tabContent ).replace(/#\{value\}/g, label).replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        
		tabContentHtml = tabContent || "Tab " + tabCounter + " content.";
 
       
       tabs.find( ".ui-tabs-nav" ).append(li);
	   

	 var a1 = '<div id = "'+ String(id) + '" class = "size ui-tabs-panel ui-widget-content ui-corner-bottom  ui-sortable"><div id="column'+ tabCounter +'" class = "column ui-sortable-handle ui-sortable"</div></div>' ;
	    
      tabs.append(a1);
      
	   
	  
	  
	 
	 
      
    
  //accordion.accordion("refresh");
    // addTab button: just opens the dialog
    
	  
	  tabs.delegate( "li.ui-state-active", "click", function() {
      tabId = $( this ).closest( "li" ).attr( "aria-controls" );
     
      
    });
    
    // close icon: removing the tab on click
    tabs.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
 
    tabs.bind( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
      }
    });
	tabs.tabs( "refresh" );
	 accordion.find(tabs).append(tabs);
	
   
	
  ///////////////////////////////////
  /*********************************
  
   Stop!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  ********************************/
  
  
  ////////////////////////////////
     addPortletDb(tabs,accordion,anewTab[i]) ;  



  } // end of for


	 
  
} // end of function

///////////////////////////////////////////////////////////////
/*********************************************************


 >>>>>>>>>>>>>>>>>>>>>>> addPortletDb



********************************************************/



/////////////////////////////////////////////////////////////

function addPortletDb(tabs,accordion, anewTab)
   {	
	     
          var html_portlet_template = '<div class="portlet"  ><div class="portlet-header" title = "#{title}" value = "#{label}" >"#{label}"<span class="close_position ui-icon ui-icon-close" role="presentation">Remove Portlet</span></div><div class="portlet-content">"#{ul}"</div></div>';
          
		  var tabTitle = anewTab.name;
          var tabContent = anewTab.description ;
		
	     if(tabTitle == "")
		 {
			  tabTitle += 1 ; 
			 
			 
		 }
	 if(window.files == false)
    {	 
       ul = '<ul id="sortable" class="document"></ul>';
    
	}
	alert("ul"+ ul);
	window.files = false;
	var html_portlet_dialog  =   html_portlet_template.replace( /#\{title\}/g,  tabContent ).replace( /#\{label\}/g, tabTitle ).replace(/#\{ul\}/g,ul );
        
      
	 
	   tabs.find(String("#column"+ tabId[tabId.length - 1 ])).append(html_portlet_dialog);
       // accordion.find(tabId2).children(String("#column"+tabId[tabId.length - 1])).append("text");//.append(html_portlet_dialog);
        $(".portlet").addClass( ''+ tabTitle +' ui-widget ui-widget-content ui-helper-clearfix ui-corner-all' )
         .find( ".portlet-header" )
         .addClass( "ui-widget-header ui-corner-all" )
         .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
	     
        
		
	  $( ".portlet-toggle" ).click(function() {
      var icon = $( this );
      icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
      icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();	   
	  
	  });
	 
	  
     
	  
     $( "ul.document" ).sortable({
      connectWith: ".document",
      dropOnEmpty: true
    }).disableSelection();
	tabs.tabs( "refresh" );
	
	  $(".portlet").delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( ".portlet" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
 
    $(".portlet").bind( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
      }
    });
	tabs.tabs( "refresh" );
	 accordion.find(tabs).append(tabs);
	//  $('#accordion').accordion("refresh");
	
 } 

	
	
	request.onerror = function(e) {
            alert("Error! Not Connected to IndexedDb ");
            console.dir(e);
        }// end of request

 }//end of function overloaded accordition	
 
	
	
	
	
	
	 
	 
	 
	
	 
	
   		 
  
  
 
    // modal dialog init: custom buttons and a "close" callback resetting the form inside
    var dialog = $( "#dialog" ).dialog({
      autoOpen: false,
      modal: true,
	  width: 500,
	  height:700,
      buttons: {
        Add: function() {
          addTab();
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
      }
    });
 
    // addTab form: calls addTab function on submit and closes the dialog
    var form = dialog.find( "form" ).submit(function( event ) {
      addTab();
      dialog.dialog( "close" );
      event.preventDefault();
    });
	
	
	 $( "#add_tab" )
      .button()
      .click(function() {
        dialog.dialog( "open" );
      });
	  
	  
/////////////////////////////////////////////////////////////////
	  
 /*********************************
 
 
>>>>>>>>>>>>>>>>>>>> Adding a tab
 
 
 
 ****************************************/
 
 ////////////////////////////////////////////////////////////////
 
 
    // actual addTab function: adds new tab using the input from the form above
    function addTab() {
		active_accordion = $("."+ "ui-accordion-content-active");
      	
		 var tabTitle = $( "#tab_title" ),
             tabContent = $( "#tab_content" ),
             tabTemplate = "<li title = '#{title}'  value = '#{value}'><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
      
		id = active_accordion.find(".selected").attr("id");
		
        
		
		
      alert("860" + id ); 
		
		

		tabs = $("#" + id ).tabs();
		
      var label = tabTitle.val() || "Tab " + tabCounter,
        id = "tabs-" + tabCounter,
        li = $( tabTemplate.replace( /#\{title\}/g, tabContent.val() ).replace(/#\{value\}/g, label).replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        
		tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";
        
///////////////////////////////////////////////////////////////////////////		  
		  /*************************************************
          
		  
>>>>>>>>>>>>>>>>>>>>>>>>>> Adding  the tab properties to the accordion
		  
		  
		  
         ************************************************/ 
///////////////////////////////////////////////////////////////       	
         
         addingTableToTheAccordionObject(label,id,tabCounter,tabContent.val());
		
		
		
//////////////////////////////////////////////////////////////////////////////////////////	
        
	   
	   tabs.find( ".ui-tabs-nav" ).append(li);
	   

	 var a1 = '<div id = "'+ String(id) + '" class = "size ui-tabs-panel ui-widget-content ui-corner-bottom  ui-sortable"><div id="column'+ tabCounter +'" class = "column ui-sortable-handle ui-sortable"</div></div>' ;
	    
      tabs.append(a1);
      ++tabCounter; 
	  
	  tabs.delegate( "li.ui-state-active", "click", function() 
	  {
         tabId = $( this ).closest( "li" ).attr( "aria-controls" );
     
      
      });
    
    // close icon: removing the tab on click
    tabs.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
 
    tabs.bind( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
      }
    });
	tabs.tabs( "refresh" );
	 accordion.find(tabs).append(tabs);
	 alert("921" + accordion.val());
	 
}
//////////////////////////////////////////////////////////////////

/***************************************



>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding the tab to the accordion


**********************************************/


//////////////////////////////////////////////////////

function addingTableToTheAccordionObject(label,id,tabCounter,description)
{
	var result ;
	var database = db;
    var version =  parseInt(database.version);
	
	var transaction = db.transaction([title],"readwrite");
	var store = transaction.objectStore(title);

    
	
		
		
        
	var request = store.get(Number(version));
	request.onsuccess = function(e) {
		
    result = e.target.result;
	
    
		result.anewTab[tabCounter] = new setTabs();
        result.anewTab[tabCounter].name = label ;
        result.anewTab[tabCounter].id = id;
        result.anewTab[tabCounter].i = tabCounter;
		result.anewTab[tabCounter].description = description ;
        		
	    var request = store.put(result,version);
	 
	request.onerror = function(e) {
           alert("Error",e.target.error.name);
        //some type of error handler
          }
 
         request.onsuccess = function(e) {
         alert("table created");
         }
	
	
	
	
	}
	
}




	
 
//////////////////////////////////////////////////////////////////	
    
	/*****************************
	
	adding a portlet
	
	******************************/
	
  	
 //////////////////////////////////////////////////////// 
  
 var tabTitle = "",
     tabContent = "";
 
   
   var portlet_dialog = $("#portlet_dialog").dialog({
		autoOpen: false,
		modal: true,
		width: 500,
	    height:700,
		 buttons: {
        Add: function() {
          addPortlet();
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
      }
    });
	
	
	var form = portlet_dialog.find( "form" ).submit(function( event ) {
      addPortlet();
      dialog.dialog( "close" );
      event.preventDefault();
    });	  
    
	
	
	
	function addPortlet()
   {	
	     
          var html_portlet_template = '<div class="portlet"  ><div class="portlet-header" title = "#{title}" value = "#{label}" >"#{label}"<span class="close_position ui-icon ui-icon-close" role="presentation">Remove Portlet</span></div><div class="portlet-content">"#{ul}"</div></div>';
          tabTitle = $( "#tab_title_portlet" ).val(),
         tabContent = $( "#tab_description_portlet" ).val();
		
	     if(tabTitle == "")
		 {
			  tabTitle += 1 ; 
			 
			 
		 }
	 if(window.files == false)
    {	 
       ul = '<ul id="sortable" class="document"></ul>';
    
	}
	alert("ul"+ ul);
	window.files = false;
	var html_portlet_dialog  =   html_portlet_template.replace( /#\{title\}/g,  tabContent ).replace( /#\{label\}/g, tabTitle ).replace(/#\{ul\}/g,ul );
        
      
	 
	   tabs.find(String("#column"+ tabId[tabId.length - 1 ])).append(html_portlet_dialog);
       // accordion.find(tabId2).children(String("#column"+tabId[tabId.length - 1])).append("text");//.append(html_portlet_dialog);
        $(".portlet").addClass( ''+ tabTitle +' ui-widget ui-widget-content ui-helper-clearfix ui-corner-all' )
         .find( ".portlet-header" )
         .addClass( "ui-widget-header ui-corner-all" )
         .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
	     
////////////////////////////////////////////////
		 /******************************
		 
		 >>>>>>>>>>>>>>>>>>>>>>>>>>.........
		  
		  *******************************/
		  addingPortletToTheAccordionObject(tabTitle,description)
		  
//////////////////////////////////////////////////        
		
	  $( ".portlet-toggle" ).click(function() {
      var icon = $( this );
      icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
      icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();	   
	  
	  });
	 
	  
     
	  
     $( "ul.document" ).sortable({
      connectWith: ".document",
      dropOnEmpty: true
    }).disableSelection();
	tabs.tabs( "refresh" );
	
	  $(".portlet").delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( ".portlet" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
 
    $(".portlet").bind( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
      }
    });
	tabs.tabs( "refresh" );
	 accordion.find(tabs).append(tabs);
	//  $('#accordion').accordion("refresh");
	
 } 
 
  $("#add_portlet")
	  .button()
	   .click(function(){
			     
		     $("#portlet_dialog").dialog("open");		   
		
	   });	
/////////////////////////////////////////////////////////////////////////////////////
  /***********************************************
  
  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>addingPortletToTheAccordionObject
  
	
***********************************************/

//////////////////////////////////////////////////////////////////

function addingPortletToTheAccordionObject(tabTitle,description)
{
	var active_accordion = $("."+ "ui-accordion-content-active");
	var id = active_accordion.find(".selected").attr("id");
	
	var result ;
	var database = db;
    var version =  parseInt(database.version);
	
	var transaction = db.transaction([title],"readwrite");
	var store = transaction.objectStore(title);

    
	
		
		
        
	var request = store.get(Number(version));
	request.onsuccess = function(e) {
		
    result = e.target.result;
	
    
		
        
        result.anewTab[tabCounter].portlet[tabCounter].name = tabTitle;		
	    result.anewTab[tabCounter].portlet[tabCounter].description = description ;
		var request = store.put(result,version);
	 
	request.onerror = function(e) {
           alert("Error",e.target.error.name);
        //some type of error handler
          }
 
         request.onsuccess = function(e) {
         alert("table created");
         }
	
	
	
	
	}
	
}
	
	/***********************
	
	 add Field
	
	************************/
$( "#add_field")
      .button()
      .click(function() {
        $('#field_dialog').dialog( "open" );
      });
	var field_dialog = $("#field_dialog").dialog({
		autoOpen: false,
		modal: true,
		width: 500,
	    height:700,
		 buttons: {
        Add: function() {
		  var liTemplate = $('<li id = "l2"  class="ui-state-default">Create a New Issue Skeleton</li>');
          addField(liTemplate);
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
      }
    });
	
	var form = field_dialog.find( "form" ).submit(function( event ) {
      addField();
      dialog.dialog( "close" );
      event.preventDefault();
    });	 
	
    function addField(li)
	{
		var fileInput = document.getElementById("myfileinput");

// files is a FileList object (simliar to NodeList)
        var files = fileInput.files;
         
        for (var i = 0; i < files.length; i++) {
        alert("Filename " + files[i].name);
        }
		
	     
	    $(".selected").find("#sortable").append(li.append($("<a></a>").attr("value",path)));
	    $(".selected").removeClass("selected");
	
	}	
	
	
	
	
	
	
	
  /******************************
  
    capturing the files for the li elements 
  
  
  
  ************************************/
  /*
   function readfiles(files) {
/*********************************
write in location of the system 


        var name = "";
        url[1] = accordion.find("."+ "ui-accordion-content-active").attr("value");
        alert("1072"+ url[1]);	
        url[2] =   accordion.find("."+ "ui-accordion-content-active").find("." + 'ui-tabs-active').attr("value");
        alert("1074"+url[2]);
       // url[3] = tabTitle;  
        alert("1076" + url[3]);	 
	    var urlpath = url[0]+"\\"+url[1]+"\\"+url[2]+"\\"+url[3];
	     alert(urlpath);
	    var file = "";
        for (var i = 0; i < files.length; i++) {
  alert('1081');
  var fileInput = document.getElementById("myfileinput");

// files is a FileList object (simliar to NodeList)
        var files = fileInput.files;
         alert(fileInput);   
        for (var z = 0; i < files.length; z++) {
        alert("Filename " + files[z].name);
		}
     
    var name = files[i].name;
    
	   
	
    var blob = new Blob([files[i]],{type: 'application/octet-binary'});
	path = URL.createObjectURL(blob); //reader.readAsDataURL(files[i]);
	$(".quickView").attr("src",path);
	var a = document.createElement("a");
    var file = new Blob([file[i]], {type: 'application/octet-binary'});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
	 
  
   
   
  }
  
}	
*/
var name ="";
function readfiles(files) {
        var fill_ul ="";
        url[1] = accordion.find("."+ "ui-accordion-content-active").attr("value");
        alert("1072"+ url[1]);	
        url[2] =   accordion.find("."+ "ui-accordion-content-active").find("." + 'ui-tabs-active').attr("value");
        alert("1074"+url[2]);
        url[3] = $( "#tab_title_portlet" ).val();  
        alert("1076" + url[3]);	 
	    var urlpath = url[0]+"\\"+url[1]+"\\"+url[2]+"\\"+url[3];
	     alert(urlpath);
  for (var i = 0; i < files.length; i++) {
  
    
    name = files[0].name;
	fill_ul = fill_ul + '<li  id ="'+ i +'"    value = "' + name + '"class="ui-state-default"><a value = "'+ name +'">'+ name +'</a></li>';
    
    
    var blob = new Blob([files[0]],{type: 'multipart/form-data'});
	var path = URL.createObjectURL(blob); //reader.readAsDataURL(files[i]);
	//document.getElementById('image').src = url;
  }
  ul = '<ul id="sortable" class="document">'+ fill_ul +'</ul>';
  window.files = true;
  alert(ul + "files" + files);
}	
var holder = document.getElementById('holder');
holder.ondragover = function () { this.className = 'hover'; return false; };
holder.ondragend = function () { this.className = ''; return false; };
holder.ondrop = function (e) {
  this.className = '';
  e.preventDefault();
  readfiles(e.dataTransfer.files);
} 

  

function addField(li)
	{
	      
	    $(".selected").find("#sortable").append("<li class='ui-state-default' value ='"+ path +"'>thomas</li>");
	    $(".selected").removeClass("selected");
	
	}
	
	/*
	function save_content_to_file(content, filename){
    var dlg = false;
    with(document){
     ir=createElement('iframe');
     ir.id='ifr';
     ir.location='about.blank';
     ir.style.display='none';
     body.appendChild(ir);
      with(getElementById('ifr').contentWindow.document){
           open("text/plain", "replace");
           charset = "utf-8";
           write(content);
           close();
           document.charset = "utf-8";
           dlg = execCommand('SaveAs', false, filename);
       }
       body.removeChild(ir);
     }
    return dlg;
}
*/	

    
    
    
    
		 
		 
		$(this).accordion("refresh"); 
		 
		 
       // }//end of create function
	  //}); //end of accordion for static   

             
			  
			//  $(".ui-accordion-header-active").mouseover(function(){
		
		

	 
		 
   		 /**************************
		   adding a tab
		   
		   
		 
	 
      var tabTitle = $( "#tab_title" ),
      tabContent = $( "#tab_content" ),
      tabTemplate = "<li title = '#{title}' ><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
      
	  
    
    var tabs = $( "."+ id );
 
 
 
     
 
    // modal dialog init: custom buttons and a "close" callback resetting the form inside
    var dialog = $( "#dialog" ).dialog({
      autoOpen: false,
      modal: true,
      buttons: {
        Add: function() {
          addTab();
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
      }
    });
 
    // addTab form: calls addTab function on submit and closes the dialog
    var form = dialog.find( "form" ).submit(function( event ) {
      addTab();
      dialog.dialog( "close" );
      event.preventDefault();
    });
 
    // actual addTab function: adds new tab using the input from the form above
    function addTab() {
      var label = tabTitle.val() || "Tab " + tabCounter,
        id = "tabs-" + tabCounter,
        li = $( tabTemplate.replace( /#\{title\}/g, tabContent.val() ).replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";
 
      tabs.find( ".ui-tabs-nav" ).append("475" );
	  var a1 = '<div id="document_link" ><div id = "'+ String(id) + '" class = "size .size ui-tabs-panel ui-widget-content ui-corner-bottom .column ui-sortable"><div id="column'+ tabCounter +'" class = "column ui-sortable-handle ui-sortable"</div></div></div>' ;
	  
      tabs.append( $(a1).insertAfter(tabs.find(".ui-tabs-nav")));
      ++tabCounter;
	  tabs.tabs( "refresh" );
      
    }
 
    // addTab button: just opens the dialog
    $( "#add_tab" )
      .button()
      .click(function() {
        dialog.dialog( "open" );
      });
	  tabs.delegate( "li.ui-state-active", "click", function() {
      tabId = $( this ).closest( "li" ).attr( "aria-controls" );
      url[2] = String("/"+ tabId);
      
    });
    
    // close icon: removing the tab on click
    tabs.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
 
    tabs.bind( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
      }
    });
 
	
    
	/*****************************
	
	adding a portlet
	

	
  	
  
  
  var tabTitle = $( "#tab_title_portlet" ),
   tabContent = $( "#tab_description_portlet" );
   
   var portlet_dialog = $("#portlet_dialog").dialog({
		autoOpen: false,
		modal: true,
		 buttons: {
        Add: function() {
          addPortlet();
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
      }
    });
	
	
	var form = portlet_dialog.find( "form" ).submit(function( event ) {
      addPortlet();
      dialog.dialog( "close" );
      event.preventDefault();
    });	  
    
	
	
	
	function addPortlet()
	{	
	     
          var html_portlet_template = '<div class="portlet" ><div class="portlet-header" title = "#{title}" >"#{label}"</div><div class="portlet-content">"#{ul}"</div></div>';
  
		
	  
     var ul = '<ul id="sortable" class="document"><li id = "' + name + '"class="ui-state-default"><a value = "'+ name +'">'+ name +'</a></li></ul>';
     alert(ul + "205"+name);    
	var html_portlet_dialog  =   html_portlet_template.replace( /#\{title\}/g, tabTitle.val()).replace( /#\{label\}/g, tabContent.val() ).replace(/#\{ul\}/g,ul );
        url[3] =String("/" + tabTitle.val()); 
      
	 
	   tabs.find(String("#column"+ tabId[tabId.length - 1 ])).append(html_portlet_dialog);
       // accordion.find(tabId2).children(String("#column"+tabId[tabId.length - 1])).append("text");//.append(html_portlet_dialog);
        $(".portlet").addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
         .find( ".portlet-header" )
         .addClass( "ui-widget-header ui-corner-all" )
         .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
	      
		  
	  $( ".portlet-toggle" ).click(function() {
      var icon = $( this );
      icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
      icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
      });

	  
     $( "ul.document" ).sortable({
      connectWith: ".document",
      dropOnEmpty: true
    }).disableSelection();
	tabs.tabs( "refresh" );
	//  $('#accordion').accordion("refresh");
 } 
 
  $("#add_portlet")
	  .button()
	   .click(function(){
			     
		     $("#portlet_dialog").dialog("open");		   
		
	   });	
  
	
	
	/***********************
	
	 add Field
	
	
$( "#add_field")
      .button()
      .click(function() {
        $('#field_dialog').dialog( "open" );
      });
	var field_dialog = $("#field_dialog").dialog({
		autoOpen: false,
		modal: true,
		 buttons: {
        Add: function() {
		  var liTemplate = $('<li id = "l2"  class="ui-state-default"><Create a New Issue Skeleton</li>');
          addField(liTemplate);
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
      }
    });
	var form = field_dialog.find( "form" ).submit(function( event ) {
      addField();
      dialog.dialog( "close" );
      event.preventDefault();
    });	 
    function addField(li)
	{
		var fileInput = document.getElementById("myfileinput");

// files is a FileList object (simliar to NodeList)
        var files = fileInput.files;
         alert(fileInput);   
        for (var i = 0; i < files.length; i++) {
        alert("Filename " + files[i].name);
        }
		
	     alert("250"+ path); 
	    $(".selected").find("#sortable").append(li.append($("<a></a>").attr("value",path)));
	    $(".selected").removeClass("selected");
	
	}	
	
	
	
	
	
	
	
  /******************************
  
    capturing the files for the li elements 
  
  
  
 
  var path = "";
  
		function readfiles(files) {
  for (var i = 0; i < files.length; i++) {
  
    
     alert(files[i].name);
     name = files[i].name; 
    var blob = new Blob([files[0]],{type: 'multipart/form-data'});
	path = URL.createObjectURL(blob); //reader.readAsDataURL(files[i]);
	//document.getElementById('image').src = path;
  }
}	
var holder = document.getElementById('holder');
holder.ondragover = function () { this.className = 'hover'; return false; };
holder.ondragend = function () { this.className = ''; return false; };
holder.ondrop = function (e) {
  this.className = '';
  e.preventDefault();
  readfiles(e.dataTransfer.files);
} 
function addField(li)
	{
	     alert("259"+ path); 
	    $(".selected").find("#sortable").append("<li class='ui-state-default' value ='"+ path +"'>thomas</li>");
	    $(".selected").removeClass("selected");
	
	}
			// $('#accordion').accordion("refresh");  
		


  //  }//end of function accordition
  ************************/
	
},false); // end of document