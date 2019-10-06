window.onload=function(){
	
	
	chrome.storage.sync.get(['fiveerreload'], function(result) 
	{
 

		if(typeof(result.fiveerreload) != "undefined" && result.fiveerreload != null && result.fiveerreload != "" && result.fiveerreload != "0" && parseInt(result.fiveerreload.length)>parseInt(4)) 		
			{
					
				 document.querySelector("#frzalitokenpopbox").querySelector(".registrationpage").classList.add("disnone");
				document.querySelector("#frzalitokenpopbox").querySelector(".tokensuccess").classList.remove("disnone");
			 
				
				
				
			}else{
				 
				document.querySelector("#frzalitokenpopbox").querySelector(".tokensuccess").classList.add("disnone");		
				document.querySelector("#frzalitokenpopbox").querySelector(".registrationpage").classList.remove("disnone");
			}	
				 
		 
	 });	
		
		
		
		

let regitrationbutton= document.getElementById('registrationpagebutton');
regitrationbutton.onclick = tokenvalidation;



let alitokensuccessimagebox= document.getElementById('alitokensuccessimagebox');
alitokensuccessimagebox.onclick = resetteststorage;




}
 
 
 

function tokenvalidation(e) {
	var values=document.getElementById("registrationpageinput").value;
	
	//teststorage(values) /// testing 
	
	
	if(parseInt(values.length)>5){
		
	 //var call_url="https://ealadinexpress.frzf7.com/index.php/Aliexpress/token";
	  var call_url="http://localhost/adminpanel/index.php/aliexpress/token/";
		
		$.ajax({
			  url: call_url,	 
			  type: 'POST',      
			  data: {token: values},
			 dataType: 'json',
			  success: function(data) {	

			  
					if(data==404)
					{
						  document.querySelector("#tokenerrormessagebox").innerHTML="Token is invalid!";
						  setTimeout(function(){ document.querySelector("#tokenerrormessagebox").innerHTML="";}, 5000);
					}else{
						
						var cdata=(eval(data).data);
						var company_api_link=cdata.company_api_link;
						 
						
						chrome.storage.sync.set({'fiveerreload':values,'company_api_link':company_api_link},function(data)
						{
							
							
							
						
							 document.querySelector("#frzalitokenpopbox").querySelector(".registrationpage").classList.add("disnone");
							 document.querySelector("#frzalitokenpopbox").querySelector(".tokensuccess").classList.remove("disnone");
			 
							runChromeLibScript(values,company_api_link);
						})
						
						 
						
					}
			  },
			 error: function(xhr, status, error) {
				console.log(error);
				 
				},
			  complete: function(xhr) {
				    console.log(xhr);
			  }
		});
 
		
		
	}else{
		document.querySelector(".registrationpage").querySelector("h3").classList.add("colred");
		setTimeout(function(){ document.querySelector(".registrationpage").querySelector("h3").classList.remove("colred");}, 3000);
	}
	
}



function runChromeLibScript(tokenval,company_api_link){
	 
	 		 
chrome.tabs.executeScript(null,{
	code:'aliexpresscorelib("'+tokenval+'","'+company_api_link+'");',	
},function(){
chrome.tabs.executeScript(null,{file:"chromelib.js"});


	 
});

 


	
}


 
 
 
 function resetteststorage(){
	 
	chrome.storage.sync.set({'fiveerreload':""},function()
	{
		console.log("cancel");	
		})
	 
 }