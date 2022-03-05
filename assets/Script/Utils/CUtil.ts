
import { _decorator, Node, resources, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('CUtil')
export class CUtil {

    public static getQueryVariable(name) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        const result = window.location.search.substring(1).match(reg);
        if (result != null) {
            return decodeURI(result[2]);
        } else {
            return null;
        }
    }


    /**
     * httpPequest
     */
    public static httpPequest(url:string, callback:Function) {
        let xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log("http response:" + response);
                callback(response)
                return
            }
            callback(null)
        };
        xhr.open("GET", url, true);
        xhr.withCredentials = true
        // xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:7456/")
        // xhr.setRequestHeader("Authorization", "true");
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        // xhr.setRequestHeader("Origin","http://localhost:7456")
        // xhr.setRequestHeader("origin","http://localhost:7456")
        
        xhr.send();
    }

    public static httpPostPequest(url:string, callback:Function) {
         // 使用post方式, 发送请求

         let xhr = new XMLHttpRequest();
         xhr.timeout = 5000;
         xhr.open("POST", url, true);
 
         // setRequestHeader方法必须在  open()方法和 send() 方法之间调用。
         // 如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。
         // 若使用的是cocos引擎，在原生平台需要设置此HTTP头部信息
         // xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
 
         xhr.setRequestHeader("Authorization", "true");
         xhr.onerror = function (res) {
             console.log("onerror");
         }
 
         xhr.onreadystatechange = function () {
             if (xhr.readyState === 4 &&
                 (xhr.status >= 200 && xhr.status < 300)) {
                     console.log("success");
                     console.log(xhr.responseText);
             } else {
                 console.log("fail");
             }
         };
 
         // 发送 obj  若发送 JSON str 则头部信息设为：xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
         let data = "jQuery18206190064924153293_1646388734858&owner=0x2f2e99bcbe39D8407552E821e7F4F0F9592Dfcab&contractAddress=0x82016d4ad050ef4784e282b82a746d3e01df23bf&_=1646388740791";
         xhr.send(data);
    }


public static hex2Number(str = '') {
        if (str.indexOf('0x') === 0) {
            str = str.slice(2);
        }
        return parseInt(`0x${str}`, 16);
    }

}