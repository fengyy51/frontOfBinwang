
$(document).ready(function(){
	var urlWinDetail="/luck/win-detail";
	var urlWinHandleUse='/luck/win-handle-use';
    // 获取用户openid
    var id;
    var openId=getCookie("openId",openId);
    console.log(openId);
    // 解析url参数 存入cookie
    if ((id_yuanshi = getQueryString("id")) != null){        
        id = getQueryString("id"); //活动所属id
    }    
    // console.log(openId);
    // console.log(id);
    function alertNew(content,title){
		$('#alert .weui_dialog_title').html(title);
		$('#alert .weui_dialog_bd').html(content);
		var $alert=$('#alert');
	    $alert.show();
	    $alert.find('.weui_btn_dialog').on('click', function () {
	        $alert.hide();
	    });
	}
	ajaxContact();
	$('#click_queding').on("click",function(){
		var code=$('#Dialog input').val();
		console.log(code);
		if(code!=''&&code==52158){
			var inputflag=false;
			if(inputflag==false){
				inputflag=true;
				$.ajax({
					url:urlServer+urlWinHandleUse,
					type:"post",
					data:{
						"id":id
					},
					success:function(data){
						var code=data.code;
						if(code==200){
							var result=data.data.result;
							inputflag=false;
							if(result==true){
								$('#isUse').html('已使用');
								$('#isUse').css("color","#04be02");
								// alert("兑奖成功");
								$('.js_dialog').fadeOut(200);
								// $('#dialogs').on('click', '.weui-dialog__btn', function(){
	       // 		 					$(this).parents('.js_dialog').fadeOut(200);
	    			// 			}); 							
								$('#click_ShopIn').attr("disabled",true);
							}
						}
					},
					error:function(error){
						inputflag=false;
						console.log(error);
						alertNew("核销奖券出错");	
						// sleep(300);
						$('#dialogs').on('click', '.weui-dialog__btn', function(){
	       		 			$(this).parents('.js_dialog').fadeOut(200);
	    				}); 
					}
			});
			}
			
		}else if(code!=''&&code!=52158||code==''){
			alertNew("兑奖码输入有误");
		}
	}) 
	$('#click_quxiao').on("click",function(){
		$(this).parents('.js_dialog').fadeOut(200);
	})
 
	$('#click_ShopIn').on("click",function(){
		$('#Dialog').fadeIn(200);
	});

	function ajaxContact() {
	    $.ajax({
	        url: urlServer + urlWinDetail,
	        // url:"../json/prizelist.json",
	        type: "GET",
	        dataType: "json",
	        data: {
	            "id":id
	        },
	        success: function(data) {
	            var code = data.code;
	            if (code == 200) {
	                makeItem(data);
	            }
	        },
	        error: function(error) {
	            alertNew('获取奖券列表出错');
	            console.log(error);
	        }
	    });
	}

    function makeItem(data) {
        var strHtml = '';
        var prize=["一等奖","二等奖","三等奖","幸运奖"];
        var ifUse=["未使用","已使用"];
        var strHtml = '<div class="item " style="cursor:pointer"><div class="content">'+
        '<div class="yanZhengMaContent"><div class="yanZhengMa ">'+
        '<div class="name"><span id="name">'+data.data.name+'</span></div>'+
        '<span id="tex">奖品代码：</span><span id="yanZhengMa">'+data.data.code+'</span></div></div>'+
        '<div class="type proof-margin"><span class="black">奖项类别: </span>'+prize[data.data.type-1]+'</div>'+
        '<div class="info proof-margin"><span class="black">奖项说明: </span>'+data.data.info+'</div>' + 
        '<div class="duiTime proof-margin"><span class="black">兑奖时间: </span><span id="duiTime">'+data.data.duijiangTime+'</span></div>'+
        '<div class="duiAddress proof-margin"><span class="black">兑奖地点：</span>'+data.data.duijiangLoc+'</div>'+
        '<div class="isUse proof-margin"><span class="black">有效性：</span><span id="isUse">'+ifUse[data.data.isUse]+'</span></div>'+
        '<div class="idContent proof-margin"><span class="id" >' + data.data.prizeId + '</span></div></div></div>';
        console.log(strHtml);
        $("#prize .body").html(strHtml);
        if(data.data.isUse==1){
        	$('#click_ShopIn').attr("disabled",true);
        }


    }
})
      
// function ajaxContact(){
// 	$.ajax({
// 		// url:urlServer+urlProof,	
// 		url:"../json/prize.json",	
// 		type:"GET",
// 		dataType: 'json',  
// 		// data:{
// 		// 	"openId":openId,
// 		// 	"actId":id
// 		// },
// 		success:function(data){
// 		console.log(data);			
// 			var code=data.code;
// 			// console.log(code);
// 			if(code==200){
// 				var name=data.data.name;
// 				var info=data.data.info;
// 				var address=data.data.address;			
// 				var credCode=data.data.credCode;
// 				var hasUse=data.data.hasUse;
// 				makeName(name);
// 				makeInfo(info);
// 				makeAddress(address);
// 				makeYanZhengMa(credCode);
// 				makeHasUse(hasUse);
// 			}			
// 		},
// 		error:function(error){
// 			console.log(error);
// 			alert("获取凭证信息出错");
// 		}
// 	});
// }
// function makeName(name){
// 	$("span#name").html(name);
// }
// function makeInfo(info){
// 	$('span#info').html(info);
// }
// function makeAddress(address){
// 	$("span#address").html(address);
// }
// function makeYanZhengMa(yanZhengMa){
// 	$("span#yanZhengMa").html(yanZhengMa);
// }
// function makeHasUse(hasUse){
// 	if(hasUse==0){
// 		$("span#hasUse").html("未使用");
// 	}
// 	else if(hasUse==1){
// 		$("span#hasUse").html("已使用");
// 	}
// }

// })