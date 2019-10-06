function getProductLinkWithAddTitle(product_link){

var new_product_url="";
	
	let base_obj=document.querySelector('div.product-title');	
	if(base_obj)
	{
		
		var string_data=document.querySelector('div.product-title').innerHTML;
		
		
		
		var replace_1 = '"';var rexex_1 = new RegExp(replace_1, 'g');string_data = string_data.replace(rexex_1, '');
		var replace_2 = "'";var rexex_2 = new RegExp(replace_2, 'g');string_data = string_data.replace(rexex_2, '');
		 string_data=string_data.trim();
		string_data=string_data.replace(/ /g,"-");

		
	 
		
		new_product_url=makeProductLinkOriginal(string_data,product_link)
		
		
	}
	
	
return new_product_url;	
}



function makeProductLinkOriginal(text_data,product_link)
{
	  
	   product_link= product_link.replace("item/", 'item/'+text_data+"/"); 
	 
	 
 return product_link;
	
}


function checkProduct(product_link)
{
 
	var data=product_link.split(".html?");
	 var sub_data=data[0].split("item/");
	  
	  var letters = /^[A-Za-z]+$/;
	  
	//  console.log(sub_data[1].match(letters)+">>>>>>>>>>>>>");
	  
   if(sub_data[1].match(letters))
     {
      return true;
     }
     else
     {
     return false;
     }
	
}


function defaultShipingInfo(data)
{
var standardFreightAmount=data.freightAmount.value;
		 
		 if (typeof value !== "undefined") {
			standardFreightAmount= data.standardFreightAmount.value;
		 }
		 
	
	let xdata={ 
		company:data.serviceName,
		time:data.time,
		active_amount:data.freightAmount.value,
		amount:standardFreightAmount,
	};
	
	return xdata;
	 	
}


function stringToJscodeConvert(data){
	
	var res = data.split('<script type="text/javascript">');


var js_data="";
res.forEach(function(item){

if(item.indexOf("actionModule") != -1)
{
     var res_data = item.split('<script>');
	 res_data.forEach(function(key){
		 if(key.indexOf("actionModule") != -1)
		 { var ex_res_data = key.split('</script>');
					  
			js_data=ex_res_data[0]; 
		 }
		 
	 });
	
}
	  
  
});  


return js_data;

	
}

function getProductDetialsHtml(details_data){
 

details_data=details_data.split("<body>");
details_data=details_data[1].split("<script>");
return details_data[0];
}



function getProductId(plink){
	
	var data= plink.split(".html?");
	var sub_data= data[0].split("/");
	var new_ids=sub_data[sub_data.length-1];
	
	 
	 if(new_ids.indexOf(".html") != -1){
		 var sub_data= new_ids.split(".html");
		 new_ids=sub_data[0];
	 }
	
	return new_ids;
}




function productCondition(product_spece){
	
	let product_condition="";
		Object.keys(product_spece).forEach(function (item) {		
			if(product_spece[item].attrName=="Item Condition"){
				product_condition=product_spece[item].attrValue;
			 
			}
			
		});
		
		
return product_condition;		
	
}


function shipingInformation(shiping_data)
{
	
	var shiping_info={}; 
					Object.keys(shiping_data).forEach(function (item) {		
						shiping_info[shiping_data[item].company] = {
							"time":shiping_data[item].time,
							"amount":shiping_data[item].price,
							"company":shiping_data[item].company
						}
						
					});
					
return shiping_info;					
	
}

function getProductLink(plink){
	
	
	  var product_link=plink.split("?");
	  
	  return product_link[0];
}


function getProductPriceData(data){
 

let discount=(typeof data.discount === 'undefined')?0:data.discount;
let min_price=data.minAmount.value;
let max_price=data.maxAmount.value;
let sale_min_price=data.minAmount.value;
let sale_max_price=data.maxAmount.value;
 
 
		
	if(typeof data.minActivityAmount != "undefined"){
		
		 sale_min_price=data.minActivityAmount.value;

	}	
		

	if(typeof data.maxActivityAmount != "undefined"){
		
		 sale_max_price=data.maxActivityAmount.value;
	}	

	
	

	
var price_data={
	discount:discount,
	min_price:min_price,
	max_price:max_price,
	sale_min_price:sale_min_price,
	sale_max_price:sale_max_price,
	
}
	
return price_data;

	
}




function getProductDynamicPrice(object_data){
	
	var price_list=object_data.skuModule.skuPriceList;
	 
	
	var dynamic_price={};
	var i=0
	Object.keys(price_list).forEach(function (key) {
		
		var active_price="";
		if (typeof price_list[key].skuVal.skuActivityAmount === 'undefined') {
		  active_price=price_list[key].skuVal.skuAmount.value;
		}else{
			active_price=price_list[key].skuVal.skuActivityAmount.value;
		}
		
		
		let sub={
			matched_ids:price_list[key].skuPropIds,
			active_price:active_price,
			price:price_list[key].skuVal.skuAmount.value,
		}
			 
			var match_ids = sub.matched_ids.replace(",", "_");

			if(match_ids=="" || match_ids.length<2){
				match_ids="none";
			}
			
		dynamic_price[match_ids]=sub;
	})
	 
	 
	 return dynamic_price;
}


/*----------------------------- product data property like size,color,brand, length---etc-------------------------*/



function getProductProperties(object_data){
	
	
		var property=object_data.skuModule.productSKUPropertyList;
								
								var product_color_key_name="";
								var product_color_img={}
								var dynamic_property={};
							     
								
								
								Object.keys(property).forEach(function (key) {		
								let property_objct=property[key];
								
								var property_name=property_objct.skuPropertyName;
								var property_data=property_objct.skuPropertyValues;
								
									 
									let bundle={};
									let color={};
									let length={}; 
								    let sizex={};
									let material={};
									let bearing_qty={};
									let use_mode={};
									let density={};
									let part_design={};
									let bang_type={};
									let long_hair_proportion={};
									let life_span={};
									let bulk_buy={};
									let stylex={};
									let packagex={};
									let pinx={};
									let insert_type={};
									let connector_type={};
									let specification={};
									let voltage={}; 
									var shiping={};
									var diameter={};
									
									
									if(property_name=="Ships From")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
										let string_str = property_data[index].propertyValueDisplayName	;
											 if((string_str.indexOf("China")>=0) || (string_str.indexOf("china")>=0))
											 {	
													let sub={
														property_id:property_data[index].propertyValueId,
														property:property_data[index].propertyValueDisplayName,
													};
													 
													 
													 shiping[i++]=sub;
											 }
										 
										})
										
										
										
										property_name=property_name.replace(" ", "_");
										 dynamic_property[property_name]=shiping;
										
									}
									
									
									if(property_name=="Bundle")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 bundle[i++]=sub;
										 
										})
										
										 dynamic_property[property_name]=bundle;
										
									}

									 
									if(property_name=="Bearing Quantity")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 bearing_qty[i++]=sub;
										 
										})
										
										
										property_name=property_name.replace(" ", "_");
										 dynamic_property[property_name]=bearing_qty;
										
									} 
									 
									 if(property_name=="Use Mode")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 use_mode[i++]=sub;
										 
										})
										
										property_name=property_name.replace(" ", "_");
										 dynamic_property[property_name]=use_mode;
										
									} 
									
									 if(property_name=="Bulk Buy")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 bulk_buy[i++]=sub;
										 
										})
										
										property_name=property_name.replace(" ", "_");
										 dynamic_property[property_name]=bulk_buy;
										
									} 
									
									 if(property_name=="Life Span")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 life_span[i++]=sub;
										 
										})
										
										property_name=property_name.replace(" ", "_");
										 dynamic_property[property_name]=life_span;
										
									} 
									
									 if(property_name=="Longest Hair Proportion")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 long_hair_proportion[i++]=sub;
										 
										})
										
										property_name=property_name.replace(" ", "_");
										 dynamic_property[property_name]=long_hair_proportion;
										
									} 
									
									
									 if(property_name=="Bang Type")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 bang_type[i++]=sub;
										 
										})
										
										property_name=property_name.replace(" ", "_");
										 dynamic_property[property_name]=bang_type;
										
									} 
									
									
									
									
									 if(property_name=="Part Design")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 part_design[i++]=sub;
										 
										})
										
										property_name=property_name.replace(" ", "_");
										 dynamic_property[property_name]=part_design;
										
									} 
									
									
									 if(property_name=="Diameter")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 diameter[i++]=sub;
										 
										})
										
										 dynamic_property[property_name]=diameter;
										
									} 
									
									
									
									
									
									 if(property_name=="Density")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 density[i++]=sub;
										 
										})
										
										 dynamic_property[property_name]=density;
										
									} 
									  if(property_name=="Specification")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 specification[i++]=sub;
										 
										})
										
										 dynamic_property[property_name]=specification;
										
									} 
									 
									   
									 if(property_name=="Voltage")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 voltage[i++]=sub;
										 
										})
										
										 dynamic_property[property_name]=voltage;
										
									} 
									 
									if(property_name=="Connector Type")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 connector_type[i++]=sub;
										 
										})
										
										property_name=property_name.replace(" ", "_");
										 dynamic_property[property_name]=connector_type;
										
									} 
									  
									  if(property_name=="Insert Type")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 insert_type[i++]=sub;
										 
										})
										
										property_name=property_name.replace(" ", "_");
										 dynamic_property[property_name]=insert_type;
										
									} 
									 
									 
									  if(property_name=="Pins")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 pinx[i++]=sub;
										 
										})
										
										 dynamic_property[property_name]=pinx;
										
									} 
									 
									 
									 if(property_name=="Package")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 packagex[i++]=sub;
										 
										})
										
										 dynamic_property[property_name]=packagex;
										
									} 
									 
									  if(property_name=="Style")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 stylex[i++]=sub;
										 
										})
										
										
										 dynamic_property[property_name]=stylex;
										
									} 
									 
									 
									
									if(property_name=="Size" || property_name=="Shoe Size" || property_name=="Band Width" || property_name=="Length" || property_name=="Stretched Length")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 sizex[i++]=sub;
										 
										})
										
										property_name=property_name.replace(" ", "_");
										 dynamic_property[property_name]=sizex;
										
									}
									
									 
									
									if(property_name=="Material")
									{	 
										var i=0;
										Object.keys(property_data).forEach(function (index) {
											 
											let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
											};
											 
											 
											 material[i++]=sub;
										 
										})
										
										 dynamic_property['material']=material;
										
									}
									
									
									
									
									
									
									if(property_name=="Color" || property_name=="Band Color" || property_name=="Color Name" || property_name=="Metal Color")
									{
										var i=0;
										 
										Object.keys(property_data).forEach(function (index) {											
											 
											 
											 
											var lg_img="";
											var sm_img="";
											var color_name="";
											 
											 
											if(typeof(property_data[index].skuPropertyImagePath) != "undefined") 
											{
											 
											 var color_index = property_data[index].propertyValueName.replace(" ", "_");

											  color_name=color_index;
											  lg_img=property_data[index].skuPropertyImagePath;
											  sm_img=property_data[index].skuPropertyImageSummPath;
											 
												 product_color_img[color_index]={ 
													lg_img:property_data[index].skuPropertyImagePath ,
													sm_img:property_data[index].skuPropertyImageSummPath ,
												 };
											}
											 
											 
											 
											 let sub={
												property_id:property_data[index].propertyValueId,
												property:property_data[index].propertyValueDisplayName,
												sm_img:sm_img,
												lg_img:lg_img,
												color_name:color_name
											};
											 
											 color[i++]=sub;
										 
										})
										
										property_name=property_name.replace(" ", "_");
										
										 dynamic_property[property_name]=color;
										 
										 product_color_key_name=property_name;
										
									}

									 
								
								})
								
								
							 
 
							 


		
var data_pro={
	property:dynamic_property,
	color_img:product_color_img,
	product_color_key_name:product_color_key_name
	
};

return data_pro;
							
}  
 
 
 
