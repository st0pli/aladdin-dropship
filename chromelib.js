var product_info="";
getAndCheckStorageToken();



 $(document).on('click', '#pagination-bottom .product-pagination-wrap', callPagination);


function callPagination()
{


	setTimeout(function(){

		getAndCheckStorageToken();
		
		
		
		}, 10000);
   

}

function getAndCheckStorageToken()
{

	chrome.storage.sync.get(['aliexpressToken'], function(result) 
	{ 
		if( typeof(result.aliexpressToken) != "undefined" && result.aliexpressToken != null && result.aliexpressToken != "" && result.aliexpressToken != "0" && parseInt(result.aliexpressToken.length)>parseInt(4)) 
			{
				
				chrome.storage.sync.get(['company_api_link'], function(view) 
				{
					
					if( typeof(view.company_api_link) != "undefined" && view.company_api_link != null && view.company_api_link != "" && view.company_api_link != "0" && parseInt(view.company_api_link.length)>parseInt(4)) 
					{
					
						aliexpresscorelib(result.aliexpressToken,view.company_api_link);
					
					}
					
				})
		
				 
				
			}
		
	})
}





$(document).on("click","#update_div_button_id",function(){
 
	chrome.storage.sync.get(['aliexpressToken'], function(result) 
	{ 
		if( typeof(result.aliexpressToken) != "undefined" && result.aliexpressToken != null && result.aliexpressToken != "" && result.aliexpressToken != "0" && parseInt(result.aliexpressToken.length)>parseInt(4)) 
			{
				
				chrome.storage.sync.get(['company_api_link'], function(view) 
				{
					
					if( typeof(view.company_api_link) != "undefined" && view.company_api_link != null && view.company_api_link != "" && view.company_api_link != "0" && parseInt(view.company_api_link.length)>parseInt(4)) 
					{
					
						aliexpresscorelib(result.aliexpressToken,view.company_api_link);
					
					}
					
				})
		
				 
				
			}
		
	})
	
	
});





function aliexpresscorelib(token,company_api_link){
 

 
 
//var call_url="https://ealadinexpress.frzf7.com/index.php/Aliexpress/"; 

var call_url="http://localhost/adminpanel/aliexpress/"; 
	
 	
 
 	$.ajax({
			  url: call_url,	 
			  //contentType: 'application/json',
			  type: 'POST',      
			  data: {token: token},
			 dataType: 'json',
			  success: function(data) {
				   // console.log(data);
				  
				    product_info=data.product_info;	
					
					//console.log(data.category);
					aliexpressToolTip(data.category);
				  
				  
			  },
			 error: function(xhr, status, error) {
				console.log(error);
				 
				},
			  complete: function(xhr) {
				   makeDropShipData();
			  }
		});
 
 
  
}	




 
    
function aliexpressToolTip(data)
{
	
	var e_dropship_wrapper=document.querySelector(".dropship_wrapper");
	if(e_dropship_wrapper){
		e_dropship_wrapper.remove();
	}
	
var header_selector=document.querySelector("body");//document.querySelector("#header");

let dropship_wrapper_box=document.createElement("div");	 
let  logo_div=document.createElement("div");
let  category_div=document.createElement("div");	
let  update_div=document.createElement("div");	
let  setting_div=document.createElement("div");	
let  sub_logo_div=document.createElement("div");	
let  sub_set_input_box=document.createElement("input");	
let  sub_set_input_button_box=document.createElement("input");	
let  update_div_button=document.createElement("button");	


dropship_wrapper_box.setAttribute("class", "dropship_wrapper");
logo_div.setAttribute("class", "left_right_div logo_div"); 	
category_div.setAttribute("class", "category_div");
update_div.setAttribute("class", "update_div");

setting_div.setAttribute("class", "left_right_div setting_div");
sub_logo_div.setAttribute("class", "logocss");
logo_div.append(sub_logo_div);  
 

 dropship_wrapper_box.append(logo_div,setting_div,category_div,update_div);  
 
header_selector.prepend(dropship_wrapper_box);
var middile_div=header_selector.querySelector("div.hm-middle");
$(middile_div).css("margin-top","50px");
$(middile_div).css("padding-top","0px");
			
			
			
  var update_div_obj = document.querySelector(".update_div");	
  update_div_button.setAttribute("type", "button"); 
  update_div_button.setAttribute("id", "update_div_button_id"); 
  //update_div_button.setAttribute("onclick", "reloadMethod()");  
  update_div_obj.appendChild(update_div_button);
   var update_div_button_id = document.querySelector("#update_div_button_id");
  update_div_button_id.innerHTML="Reload"
  
  
  
			var category_div_obj = document.querySelector(".category_div");	
			category_div_obj.appendChild(createSelectbox(data,"category_select_id"));



var input_estting_div_obj = document.querySelector(".setting_div");	

sub_set_input_button_box.setAttribute("id", "link_input_box_button_id"); 
sub_set_input_button_box.setAttribute("type", "button"); 
sub_set_input_button_box.setAttribute("value", "Import"); 
 


sub_set_input_box.setAttribute("id", "link_input_box_id"); 
sub_set_input_box.setAttribute("type", "text"); 
input_estting_div_obj.append(sub_set_input_box,sub_set_input_button_box);

 
 

$('#category_select_id').selectstyle({
				width  : 400,
				height : 300,
				theme  : 'light',
				onchange : function(val){}
			});

 

			
 $("#select_style_ul").css("margin-top","0px");
  
  
  
}	
 

function createSelectbox(data,selectbox_id){
	
	
	 
var selectList = document.createElement("select");
selectList.setAttribute("id", selectbox_id);
selectList.setAttribute("data-search", "true");
selectList.setAttribute("placeholder", "Search your category");
 
	
			
Object.keys(data).forEach(function(key) { 

var option = document.createElement("option");
option.setAttribute("value", key);
option.text = data[key];
selectList.appendChild(option);


});

return selectList;	 
	
	
	
} 
 




/*---------------------------- dropship code--------------------------------------------------*/
function getStartupHtmlObject(){
	
	
var li_object_lists="";	
	
let base_obj=document.querySelector('div#page');	 
let main_div= document.querySelector("div.product-container");	


if(base_obj!=null){
	 
	let ex_base_obj= base_obj.querySelector('div.main-wrap');
	if(ex_base_obj!=null)
	{
		let ul_base_obj= ex_base_obj.querySelector('ul#list-items');
		let ul_base_obj_ex= ex_base_obj.querySelector('ul.list-items');
		
		let ul_base_obj_ex_item= ex_base_obj.querySelector('ul#hs-below-list-items');
		
		
		
		if(ul_base_obj!=null){			
			li_object_lists = ul_base_obj.querySelectorAll('li.list-item');
		
		}else if(ul_base_obj_ex!=null){	
		
			li_object_lists = ul_base_obj_ex.querySelectorAll('li.list-item');
		}
		else if(ul_base_obj_ex_item!=null){	
		
			li_object_lists = ul_base_obj_ex_item.querySelectorAll('li.list-item');
		}else{
			 
			let item_div_obj = ex_base_obj.querySelector('div#list-items');			 				
			let ul_ex_obj = item_div_obj.querySelector('ul');
			li_object_lists = ul_ex_obj.querySelectorAll('li.list-item');
		 
	
		}

	}else{
		
		let col_main_base_obj= base_obj.querySelector('div.col-main');		
		let ul_until_list=col_main_base_obj.querySelector("ul.util-clearfix");
		li_object_lists = ul_until_list.querySelectorAll('li.list-item');
		 
	}
	
}
else if(main_div!=null)
{
	

	let ul_list=main_div.querySelector("ul.list-items");
	if (typeof(ul_list) !== 'undefined')
	{
	li_object_lists = ul_list.querySelectorAll('li.list-item');
	}

}

return li_object_lists;

	
}








function makeImportButton(product_link,key){
	  

var ex_p=product_link.split(".html?");
var nex_ex_p=ex_p[0].split("/");
let proeduct_id=nex_ex_p[nex_ex_p.length-1];

var background="#555777";
var button_title="Import";
var update_is=false;
 
if(typeof product_info[proeduct_id] != "undefined") {
	update_is=true;
	background="red";
	button_title="Update";
	 
	
	if(parseInt(product_info[proeduct_id]['discount_left_day'])>parseInt(product_info[proeduct_id]['discount_passing_day'])){
		background="green";
		button_title="Done";
	}
	
 
}



	
 
if(key.outerHTML.indexOf("product_import_frzf7")>0)
{ 
  key.querySelector(".product_import_frzf7").remove();
}
  var button_box = document.createElement("BUTTON");
  button_box.setAttribute("onmouseover", "this.style.background='gray'");
   button_box.setAttribute("onmouseout", "this.style.background=this.getAttribute('bgcolor')");
   button_box.setAttribute("class", "product_import_frzf7");
   button_box.setAttribute("type", "button");  
   button_box.setAttribute("bgcolor", background);
   button_box.setAttribute("update_is", update_is);
   button_box.innerHTML=button_title; 
   button_box.setAttribute("product_link",product_link)	  ;
	key.prepend(button_box);
	
	

	
	
	 Object.assign(key.querySelector(".product_import_frzf7").style,{  
			 "margin":"130px",
			 "cursor":"pointer",
			 "position":"absolute",
			 "z-index":"5",
			 "width":"90px",
			 "height":"90px",
			 "line-height":"80px",
			 "border":"2px solid #f5f5f5",
			 "border-radius":"50%",
			 "color":"#f5f5f5",
			 "text-align":"center",
			 "text-decoration":"none", 
			 "background":background, 
			 "box-shadow":" 0 0 3px gray", 
			 "font-size":"20px",
			 "font-weight":"bold"
			});
 
	
	
	
}



function listedLiButtonAssign(li_list){
	
	
[].forEach.call(li_list, function(key) {
	
var product_link=key.querySelector("a").getAttribute('href');
makeImportButton(product_link,key);	
	
	
});
 
}


function specailDetailspage(base_obj){
	
	var product_link=window.location.href;
	 
	 
	 makeImportButton(product_link,base_obj);
/*	
if(checkProduct(product_link))
{
	makeImportButton(product_link,base_obj);
}
else
{
	product_link=getProductLinkWithAddTitle(product_link);

	
	makeImportButton(product_link,base_obj);
	
}
	
*/	
	
}







$(document).on("click","#link_input_box_button_id",function(){
	
	var link_input_box_id=$("#link_input_box_id").val();
	
	link_input_box_id=link_input_box_id.trim();
	
	if(link_input_box_id.length>0)
	{	
		if(link_input_box_id.length>70)
		{
			if(link_input_box_id.indexOf(".html?")>=0)
			{
				//if(checkProduct(link_input_box_id))
				//{	
					processingData(false,link_input_box_id);
				//}else{
				//	alert("Please use full url like [ ../item/product_title/product_id.html?....] =>white space not allow in product title  ('use higpen/minus sign {-} instead of whtie space')");
			//	}
				
			}else{
				
				alert("Wrong product link ! Please copy the above url.");
			}
		}else{
			alert("Wrong product link ! Please copy the above url.");
		}	
	}else{
			alert("Please insert the product url");
		}	

});




function makeDropShipData()
{
	
	

let li_list=getStartupHtmlObject();

if(li_list=="" || li_list==null)
{
	let base_obj=document.querySelector('div#j-detail-page');	
	let base_obj_2=document.querySelector('div.glodetail-wrap');	
	
	
	
		if(base_obj){
			
			specailDetailspage(base_obj);			
		}
		else if(base_obj_2)
		{
			let base_obj_sub=document.querySelector('div.product-main-wrap');	 
			
			if(base_obj_sub)
			{
				specailDetailspage(base_obj_sub);
				
			}else{
				return false;
			}
			
			
		}else{
			return false;
		}
	
}else{
	
	listedLiButtonAssign(li_list);
	
}




 






/*--------------------- when we click improt button ------------------------------*/
			 let import_button=document.querySelectorAll(".product_import_frzf7"); 
			 
			[].forEach.call(import_button, function(key) {
				
				key.onclick = function (e){  
				
	
				processingData(e);
	
										

			 };
				
			})  
 
 
 
 }
 
 function processingData(e,is_input_link=false){
	 
	 	
		var category_text= $("#select_style_text").text();

		 if(category_text.indexOf("search")>=0 || category_text.indexOf("your")>=0)
		 {
			alert("Please select category ");
			return false 
		 }	 


		category_text=$.trim(category_text);
		category_text = category_text.toLowerCase();
		$("#category_select_id option").filter(function() {  
		return $(this).text().toLowerCase() == category_text;
		}).attr('selected', true);
		var category_id=$("#category_select_id").val();


		if(category_id<1)
		{
		alert("Please select category ");
		return false;
		}		

 

	if(is_input_link)
	{
		var plink=is_input_link;
	}	
	else
	{	
 
		var let_obj=e.target;
																
		var button_text =let_obj.textContent || let_obj.innerText;
		var is_update=let_obj.getAttribute("update_is");

		let_obj.innerHTML="Wait...";
		let_obj.setAttribute("disabled", true);
		var plink=let_obj.getAttribute('product_link');
	} 
	
	

		var g_productId=getProductId(plink);
	 
		var pro_url="https://www.aliexpress.com/item/"+g_productId+".html";
			
			 
		//window.open(pro_url, '_blank');		
			
		chrome.runtime.sendMessage({
		type: 'tabinfo', 
		product_url:pro_url,
		}, function(product_data) {

		if(product_data==null)
		{
		alert(" Please first login the aliexpress site.");

			if(!is_input_link)
			{
				let_obj.removeAttribute("disabled");
				let_obj.innerHTML=button_text;
			}		
			
			return false;
		}


		var js_data=stringToJscodeConvert(product_data[0]);
		var js_objct=eval(js_data)['data'];
		var description_link=js_objct.descriptionModule.descriptionUrl;



if (typeof js_objct.pageModule !== 'undefined'){
	
	var product_link=js_objct.pageModule.oldItemDetailUrl;
}else{ 


		if(plink.indexOf("https")>=0)
		{
			var product_link =getProductLink(plink);
		}else{	
		var product_link =getProductLink("https:"+plink);
		}
}		
		

		var product_id=g_productId;
		var product_min_price=js_objct.priceModule.minAmount.value;
		var product_max_price=js_objct.priceModule.maxAmount.value;

		 
		 
		 setTimeout(function(){ 
		 
		 
		 chrome.runtime.sendMessage({
		type: 'product_details', 
		description_link:description_link,
		}, function(details_data) {

		var product_details_html=getProductDetialsHtml(details_data[0]);
		  
		 
		 //var up_call_url="https://ealadinexpress.frzf7.com/index.php/Aliexpress/aliApi/";
		 
		  var up_call_url="http://localhost/adminpanel/aliexpress/security";
		 
			$.ajax({
				  url:up_call_url,
				//contentType: 'application/json',
				  type: 'POST',
				  tryCount: 0,
				  retryLimit: 3,
				 data: {
						product_id:product_id,
						product_link:product_link, 
						product_min_price:product_min_price,
						product_max_price:product_max_price
					   },
				// dataType: 'json',
				  success: function(data) 
				  {
					  
		var need_update_extention=false;
					
					  let shiping_data=eval(data['shiping']).freight;
					  let discount_data=data['discount_data'];
					  let object_data=js_objct;
					  let product_spece=object_data.specsModule.props;	
					  let product_condition=productCondition(product_spece);  
					  let shiping_info=shipingInformation(shiping_data);					 
					  let dynamic_price_list= getProductDynamicPrice(object_data)
					  let product_price_data=getProductPriceData(object_data.priceModule);
					
			
					
					let product_property_list="";
					let product_color_img_list=""; 
					let product_color_key_name="";
					
					if(object_data.skuModule.hasSkuProperty)
					{
						let data_property=getProductProperties(object_data);
						
						
						if(isEmpty(data_property.property))		
						{
							need_update_extention=product_id;
						} 
		 
						
						product_property_list=data_property.property;
						product_color_img_list=data_property.color_img;
						product_color_key_name=data_property.product_color_key_name;
					}
					





		if(need_update_extention){
		alert("Need to update your extention or skip this product "+need_update_extention);	 
			if(!is_input_link)
			{	
				let_obj.removeAttribute("disabled");
				let_obj.innerHTML=button_text;
			}
			
			return false;
		 }

		
		 
					
					var product_box={
						product_color_key_name:product_color_key_name,
						category_id:category_id,
						is_update:is_update,
						is_discount:object_data.priceModule.discount,
						product_link:product_link,
						title:object_data.titleModule.subject,
						product_id:product_id,
						product_condition:product_condition,
						product_single_img:object_data.pageModule.imagePath,
						rating:object_data.titleModule.feedbackRating.averageStar,
						number_of_vote:object_data.titleModule.feedbackRating.totalValidNum,
						number_of_order:object_data.titleModule.tradeCount, 
						rating_details:object_data.titleModule.feedbackRating,
						company_country:object_data.storeModule.countryCompleteName,
						product_details:object_data.specsModule.props,
						shiping_info:shiping_info,
						available_qty:object_data.quantityModule.totalAvailQuantity,						 
						product_view_img:{
							large_img:object_data.imageModule.imagePathList,
							small_img:object_data.imageModule.summImagePathList
						},
						product_description_html:product_details_html,
						product_property_list:product_property_list,
						product_color_img_list:product_color_img_list,
						dynamic_price:dynamic_price_list,
						discount_info:discount_data,
						product_price_data:product_price_data,
						default_shiping:defaultShipingInfo(object_data.freightItemModule)
						
						
					}
					
					let object={
						"data":product_box
					};
					
					
 				
					
				console.log(product_box);
				
				console.log(object_data);
					
					
							//var store_db_url="https://ealadinexpress.frzf7.com/index.php/Updateapi/";
							var store_db_url="http://localhost/adminpanel/aliexpress/request/";
							$.ajax({ 
									 url:store_db_url,	 
									// contentType: 'application/json',
									 // dataType: 'json',
									 type: 'POST',                                              
									 data: object,
									 success: function(result){
												  
												 
												  
												  if(!is_input_link)
												  {
													   
													  
													  let_obj.setAttribute("bgcolor", "green");											
													  let_obj.style.background = "green";
													  let_obj.innerHTML="Done";
													
													let_obj.removeAttribute("disabled");
												  }else{
													  alert("Successfully imported this product.");
													  $("#link_input_box_id").val("");
												  }
										 },
									 error: function(xhr, status, error) {
										 if(!is_input_link)
										 {
											 
										 let_obj.removeAttribute("disabled");
										 let_obj.innerHTML=button_text;
										 }
										 console.log(error);
										 
										 
										},
									  complete: function(xhr) {
											
											
											
										}
										});
									
			 
						 
			 
					
				  },
				 error: function(xhr, status, error) {
					console.log(error);
					 
					},
				  complete: function(xhr) {
					
				  }
				});


		 
		 
		});  
		 
		 
		 
		 }, 1000);

		 
}); // on time message

								
	 
	 
 }
 
 



function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}


