// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var url
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
     url = tabs[0].url;
     console.log(url);
});

function isvalid(currenturl,type)
{

    if (type=='autofollow')
    {
        //return (url.includes("/explore/people/") || url.includes("/followers/") || url.includes("/following/"))
        return (url.includes("/followers/") || url.includes("/suggested/") || url.includes("/following/")|| url.includes("www.instagram.com/p/"))
    }
    else if (type=='autounfollow')
    {
        //return (url.includes("/explore/people/") || url.includes("/followers/") || url.includes("/following/"))
        return (url.includes("/followers/") || url.includes("/suggested/")|| url.includes("/following/")|| url.includes("www.instagram.com/p/"))
    }
    else
        return true
}


function converttomilli(dur,type)
{
    if (type=='sec')
        dur=dur*1000
    else if (type=='min')
        dur=dur*60*1000
    else if (type=='hr')
        dur=dur*60*60*1000
    else if (type=='day')
        dur=dur*24*60*60*1000    
    
    return dur;
    
}


var twitteradddata
function settoolsforusshow(htmldata){
	             chrome.storage.local.set({twitteradddata:htmldata}, function() {});  
}
function getadddata2(){
chrome.storage.local.get({twitteradddata: ""}, function(data) {
	if(typeof data.twitteradddata === 'undefined' || data.twitteradddata=='')
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			   // Typical action to be performed when the document is ready:
			   settoolsforusshow(settoolsforusshow(xhttp.responseText))
			}
		};
		xhttp.open("GET", "https://toolsfor.us/apps/indexnormal.php?appname=InstagramAutoFollower", true);
		xhttp.send();		
	}
	
	});
}


setdatecount()    
getadddata2()
function setdatecount(){
var today = new Date();
var dd = today.getDate(); 
chrome.storage.sync.get('ig_follower_date', function(data) {
if (typeof data.ig_follower_date === 'undefined' || data.ig_follower_date!=dd ) {
             chrome.storage.sync.set({
                    ig_follower_date: dd,
					ig_lottery_registered:false,
                        ig_unfollowcount:0,
                        ig_followcount:0,
                        ig_likescount:0,
                        ig_retweetscount:0,
						twitteradddata:''
                }, function() { getadddata2();});                
        } else {
            console.log(data.ig_follower_date)
            }
        });
    
}

retrievepopup();/////
var reload='location.reload();';
function click(e) {
var duration = document.getElementById("duration").value;
var ele = document.getElementById("type");
var time_type = ele.options[ele.selectedIndex].value;  
var interval='var interval='+converttomilli(duration,time_type)+';';    

var duration2 = document.getElementById("duration2").value;
var ele2 = document.getElementById("type2");
var time_type2 = ele2.options[ele2.selectedIndex].value;  
var interval2='var interval2='+converttomilli(duration2,time_type2)+';';  
var followrate='var followrate='+document.getElementById("clicks").value+';';  

var execode= interval+interval2+followrate;
var igaction=e.target.id;
var igactionfile=igaction;

if (url.includes("instagram.com/p/") && !igaction.includes('follow'))
    igactionfile=igaction+'2';

    if(!isvalid(url,igaction))
    {
        chrome.extension.sendMessage({ cmd: "alert" ,msg:'======================'+"\n"+'Wrong URL to use '+e.target.id+".\n\n"+'It works only on */followers/ , */following/ and  instagram.com/p/* pages.Check for the tutorial in the chrome web store'+"\n\n"+'Please message me if you need it to work on this page as well.'+"\n"+'======================' });
        return
    }
    if(igaction!='stop')
    {
        savepopup();
   /*      chrome.tabs.executeScript(null,
        {file: 'toast.js'}); */
        
          chrome.tabs.executeScript({
          code: execode
        }); 
       chrome.tabs.executeScript(null,
        {file:  igactionfile + '.js'});
    }
    else
    {
         chrome.tabs.executeScript({
          code: reload
        });
         
    }   
  window.close();
}


document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});



function savepopup(){

var ele = document.getElementById("type");
var ele2 = document.getElementById("type2");   
  chrome.storage.sync.set({ 
  popup_min     : document.getElementById("duration").value,
  popup_min_type:ele.options[ele.selectedIndex].value,
  popup_max     :document.getElementById("duration2").value,
  popup_max_type:ele2.options[ele2.selectedIndex].value,
  popup_follow_rate:document.getElementById("clicks").value
  }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });  
    
}
function retrievepopup(){
 chrome.storage.sync.get({
    popup_min: 10,
    popup_min_type: "sec",
    popup_max: 20,
    popup_max_type: "sec",
    popup_follow_rate:1
     }, function(items) {
   document.getElementById("duration").value=items.popup_min;
   document.getElementById("duration2").value=items.popup_max;
   document.getElementById("clicks").value=items.popup_follow_rate;
   popupSelectindex("type",items.popup_min_type) 
   popupSelectindex("type2",items.popup_max_type) 
   
    });
}



function popupSelectindex(id,val) {
    var sel = document.getElementById(id);

    for(var i = 0, j = sel.options.length; i < j; ++i) {
        console.log(sel.options[i].value)
        if(sel.options[i].value === val) {
           sel.selectedIndex = i;
           break;
        }
    }
}
