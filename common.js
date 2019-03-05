

(function(w){
	String.prototype.Trim = function()  //扩展string前后去空格方法
		{  
		return this.replace(/(^\s*)|(\s*$)/g, "");  
		} 
	if(/msie|applewebkit.+safari/i.test(w.navigator.userAgent)){ //扩展safari浏览器 sort方法
        var _sort = Array.prototype.sort;
        Array.prototype.sort = function(fn){
            if(!!fn && typeof fn === 'function'){
                if(this.length < 2) return this;
                var i = 0, j = i + 1, l = this.length, tmp, r = false, t = 0;
                for(; i < l; i++){
                    for(j = i + 1; j < l; j++){
                        t = fn.call(this, this[i], this[j]);
                        r = (typeof t === 'number' ? t : !!t ? 1 : 0) > 0 ? true : false;
                        if(r){
                            tmp = this[i];
                            this[i] = this[j];
                            this[j] = tmp;
                        }
                    }
                }
                return this;
            } else {
                return _sort.call(this);
            }
        };
    }
	var tsMethod={};
	tsMethod.getHost = function(){//根据环境获取后台访问域名
		if(window.location.href.indexOf("localhost")>-1 || window.location.href.indexOf("127.0.0.1")>-1  ||  window.location.href.indexOf("192.168")>-1){
			return "http://api-dev.shouboke.tv"
//			return  "http://api.shouboke.tv"
		}
		//webtest.shouboke
//		http://www.shouboke.tv/testGkb/index.html#/consulationDetail?articleId=AU  http://www.shouboke.tv/gaokaobaobao/index.html#/consulationDetail?articleId=AU
		if(window.location.href.indexOf("shouboke.tv/gaokaobao")>-1){
			return "http://api.shouboke.tv"
		}
		if(window.location.href.indexOf("shouboke.tv/testGkb")>-1){
			return "http://api-dev.shouboke.tv"
		}
		if(window.location.href.indexOf("shouboke.tv")>-1){
			return  "http://api.shouboke.tv"
		}
		return  "http://api.shouboke.tv"
	}
	//http://shouboke-gaokaobao.oss-cn-beijing.aliyuncs.com/index.html
	tsMethod.getAppid = function(){//获取公众号appid
		if(window.location.href.indexOf("shouboke.tv/gaokaobao")>-1){
//			return "wx18e63e75d50cb458"//手播课
			return "wxe826ac7e43a1f976"
//			return "wx3a10e3596024a544"
		}
		if(window.location.href.indexOf("shouboke.tv/testGkb")>-1){
//			return "wx18e63e75d50cb458"
			return "wx3a10e3596024a544"
		}
//		if(window.location.href.indexOf("gk.shouboke.tv")>-1){
//			return "wx2bdf9454bae8767f"
//		}
		return "wxe826ac7e43a1f976"
	}
	tsMethod.webHost = function(){//获取主页
		if(window.location.href.indexOf("localhost")>-1 || window.location.href.indexOf("127.0.0.1")>-1  ||  window.location.href.indexOf("192.168")>-1){
//			return "http://dev2-718544363.cn-north-1.elb.amazonaws.com.cn"
			return  ""
		}
		if(window.location.href.indexOf("shouboke.tv/gaokaobao")>-1){
			return "http://www.shouboke.tv/gaokaobao/index.html"
		}
		if(window.location.href.indexOf("shouboke.tv/testGkb")>-1){
			return "http://www.shouboke.tv/testGkb/index.html"
		}
	}
	tsMethod.setCookie =function(c_name, value, expiredays){
 　　　　var exdate=new Date();
　　　　exdate.setDate(exdate.getDate() + expiredays);
　　　　document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
 　　}
	 tsMethod.getCookie = function(name){
	 var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	  
	 if(arr=document.cookie.match(reg))
	  
	  return (arr[2]);
	 else
	  return null;
	}
	tsMethod.delCookie = function(name){
		 var exp = new Date();
		 exp.setTime(exp.getTime() - 1);
		 var cval=tsMethod.getCookie(name);
		 if(cval!=null)
		  document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		}
	tsMethod.parseQueryString = function (url) { 
        var reg_url = /^[^\?]+\?([\w\W]+)$/,
            reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g,
            arr_url = reg_url.exec(url),
            ret = {};
        if (arr_url && arr_url[1]) {
            var str_para = arr_url[1], result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2];
            }
        }
        return ret;
    }
	tsMethod.isPoneAvailable = function(str) {  
          var myreg=/^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/;  
          if (!myreg.test(str)) {  
              return false;  
          } else {  
              return true;  
          }  
      }
	tsMethod.is_weixn_qq = function(){
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return "weixin";
			} else if (ua.match(/QQ/i) == "qq") {
			return "QQ";
			    }
			return false;
	}
	tsMethod.randomString = function(len) {
                var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                var maxPos = chars.length;
                var pwd = '';
                for (var i= 0; i < len; i++) {
                    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            }
	tsMethod.timeFormat = function(t,format){ 
			var _this = new Date(t);
			var o = { 
			"M+" : _this.getMonth()+1, //month 
			"d+" : _this.getDate(), //day 
			"h+" : _this.getHours(), //hour 
			"m+" : _this.getMinutes(), //minute 
			"s+" : _this.getSeconds(), //second 
			"q+" : Math.floor((_this.getMonth()+3)/3), //quarter 
			"S" : _this.getMilliseconds() //millisecond 
			} 
			
			if(/(y+)/.test(format)) { 
			format = format.replace(RegExp.$1, (_this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
			} 
			
			for(var k in o) { 
			if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
			} 
			} 
			return format; 
	} 
	tsMethod.changeTime = function(time,b){
		var data= new Date(time.replace(/-/g, "/"))
 		var year = data.getFullYear();
		var month = data.getMonth() + 1;
		if(month<10){month="0"+month;}
		var day = data.getDate();
		if(day<10){day="0"+day;}
		var hour=data.getHours();
        if(hour<10){hour="0"+hour;}
        var minute=data.getMinutes();
        if(minute<10){ minute="0"+minute;}
        if(b==1){//显示到月日时分
        	time=month+"月"+day+"日 "+hour+":"+minute
        }
        if(b==2){//显示年月日时分
        time=year+'年'+month+"月"+day+"日"+hour+":"+minute
        }
        if(b==3){//显示年月日
        	time=year+'年'+month+"月"+day+"日"
        }
		return time;
	}
	tsMethod.IsPC = function() {
	    var userAgentInfo = window.navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	                "SymbianOS", "Windows Phone",
	                "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	}
	tsMethod.isIOS = function() {
        var isIphone = window.navigator.userAgent.toLowerCase().indexOf("iphone")>-1;
        var isIpad = window.navigator.userAgent.toLowerCase().indexOf("ipad")>-1;
        return isIphone || isIpad;
    }
w.tsMethod = tsMethod;
})(window)
