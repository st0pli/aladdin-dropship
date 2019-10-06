
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message && message.type == 'tabinfo') { 
	
	var product_url=message.product_url;


	chrome.tabs.create({url: product_url, selected: false}, function(tab) { 
					
			linkToVewSourceCode(tab.id,function(data) {				
				sendResponse(data);
			});

	});
	return true;  

   }
	
	
	
 if (message && message.type == 'product_details') { 
				
				
		var pro_details=message.description_link;
		
		 chrome.tabs.create({url: pro_details, selected: false}, function(tab) { 
				
				 linkToVewSourceCode(tab.id,function(data) {				
					sendResponse(data);
				});
				
		 });
		return true;  
		  

    }
	
	
	
	
	
});

function linkToVewSourceCode(tabId,callback)
{
	
	/*
chrome.tabs.executeScript( null, {	
	code:"document.documentElement.outerHTML;" },
   function(results){ console.log(results[0]); } );
   */
	
	
	chrome.tabs.executeScript(tabId, { "code": "document.documentElement.outerHTML;" }, function (result)
	{
	chrome.tabs.remove(tabId, function() { callback(result); });

	});	
		
	
}


 
	




 
