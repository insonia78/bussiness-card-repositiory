
 /*****************************************************
  
  
    creating an object where to store the tabs portlets and fiels with relative files or url links 
	
  
  
  
  **************************************************/

   
   
   var name ,
       newTab,
	   allTabs = [],
	   index,
       aportlet;
	   
	   
	   var newAccordion = function()
      {
	      this.accordion = "";
		  this.description = "";
		  this.id = "";
		  this.n_tabs ="";
		  this.anewTab = [];
		  this.tabs = "" ;
		  
  }
	   var setTabs = function()
	   {	      
			   this.name ; 
		       this.id ;
			   this.description ;
               this.tabCounter ;
               this.column ;			   
		       this.portlet = new setPortlet();     
		   
	   }
   
  
    var setPortlet = function()
	   {	      
			    
		       this.name ;
			   this.description ;
               			   
		       this.field = [];     
		   
	   }
	var setField = function()
	{
		this.file ;
		this.file_name ;
		this.field_name ;
	}
  
  
   
	   
       
	   
  



