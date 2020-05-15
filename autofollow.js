
function random_between(interval,interval2)
{
    var rand=Math.floor(Math.random()*(interval2-interval+1)+interval)
    console.log(rand)
    return rand;
}

function clicknrun(btn){
btn.click()
countercheck()
setTimeout(function(){return follow_users()}, random_between(interval,interval2));
}

function doesinclude(str){
  try{
  if(igdontfollowlist!='')
    return igdontfollowlist.includes(str);
  else 
    return false;
  }catch(e){
    return false;        
        }
}
	
function follow_users(){
	
var links=document.getElementsByTagName("a");
    var button_links=[]
	console.log(links.length)
    for (i = 0; i < links.length; i++) {

        if(links[i].hasAttribute("title")&& links[i].parentElement.tagName=='DIV')// && links[i].classList.length==0)
			{
			links[i].scrollIntoView();	
			var checkbutton=links[i].parentElement.parentElement.parentElement.parentElement.querySelector('button')
			try{
			
			var screenname = checkbutton.parentElement.parentElement.querySelector('a').getAttribute('href').slice(1,-1);

			//console.log(links[i].parentElement.parentElement.parentElement.parentElement)
			console.log(screenname)
			}catch(e){console.log('error')}
			
				//&& !(doesinclude(screenname))
		try{ 
			if((window.getComputedStyle(checkbutton).backgroundColor !='rgba(0, 0, 0, 0)')&& !(doesinclude(screenname)))
				return clicknrun(checkbutton);
			else
				{
					links[i].removeAttribute("title");
					return setTimeout(function(){return follow_users()}, 300);
				}
		}catch(e){
					links[i].removeAttribute("title");
					return setTimeout(function(){return follow_users()}, 300);
		}
			}
      
    }  	
	}
function addcountwidget(){  
     var p_ele2=createElement('<div align="center" style="z-index:2000;position: fixed;    top: 10em;    right: 1em;border-radius: 15px 30px;    background: #c92844;    padding: 20px;     width: 90px;    height: 95px;" class="rcorners2"><table><tr><td align="center">Follows</td></tr><tr><td align="center"><span style="font-size: 35px;font-weight: bold;"id="igcnt">0</span></td></tr></table></div>')
    document.getElementsByTagName("body")[0].appendChild(p_ele2)

}
function createElement( str ) {
    var frag = document.createDocumentFragment();

    var elem = document.createElement('div');
    elem.innerHTML = str;

    while (elem.childNodes[0]) {
        frag.appendChild(elem.childNodes[0]);
    }
    return frag;
}



function countercheck()
{
    document.getElementById("igcnt").textContent=igfollowcount;
	//console.log('freebielimit<igfollowcount && ig_lottery_registered')
	//console.log(String(freebielimit)+' '+ String(igfollowcount)+' '+String(!ig_lottery_registered));
    if(freebielimit<igfollowcount && !ig_lottery_registered)
    {
        if(firstalert)
        {	
            //firstalert=false
            alert("Limit for the free version reached\n\n"+freebietext);
			//var optionsUrl = chrome.extension.getURL("options.html");
			//window.open(optionsUrl, '_blank');
			if(firstredirect)
			{
				window.open('https://chrome.google.com/webstore/detail/auto-follower-for-instagr/ibhpainpkojknmkhhhedikdkclinobdo', '_blank');
				firstredirect=false
			}
			//setTimeout(function(){continueactionvar=false}, 10000);
            location.reload();
        }
    }	

    if(igfollowlimit>igfollowcount)
        igfollowcount=igfollowcount+1;
    else
    {
        if(firstalert)
        {
            //firstalert=false
            alert("Limit for this action has reached")
			//setTimeout(function(){continueactionvar=false}, 10000);
            location.reload();
        }
    }
    

}



var firstredirect=true
var freebielimit=10
var freebietext=''
var ig_lottery_registered
var firstalert=true
var iglikescount=0
var igfollowcount=0
var igunfollowcount=0
var twitteradddata=''
var iglikeslimit
var igfollowlimit
var igunfollowlimit
var igdontfollowlist
function getusersettings(){
chrome.storage.local.get({igdontfollowlist:'',twitteradddata:''}, function(items){
igdontfollowlist=items.igdontfollowlist.toLowerCase();
twitteradddata=items.twitteradddata;
getadddatanew(twitteradddata);

});  	
  chrome.storage.sync.get({
    iglikeslimit:1000,
    igfollowlimit: 1000,
    igunfollowlimit :1000,
    igdontfollowlist:'',
	ig_lottery_registered:false
  }, function(items) {
	ig_lottery_registered=items.ig_lottery_registered;
    iglikeslimit=parseInt(items.iglikeslimit);
    igfollowlimit=parseInt(items.igfollowlimit);
    igunfollowlimit=parseInt(items.igunfollowlimit);
	
    ////igdontfollowlist=items.igdontfollowlist.toLowerCase();
	
  });
} 

getusersettings()
 setTimeout(function(){
     addcountwidget();
     //addadwidget();
     follow_users();
     ////continueaction();
	 }, 1000);
//free version
function addadwidget(txt,img,lnk){ 
try{
    console.log('running addadwidget'); 
     var p_ele2=createElement('<div align="center" style="z-index:2000;position: fixed;    bottom: 1em;    right: 1em;border-radius: 15px 30px;    background: #c92844;    padding: 20px;     width: 250px;    height: 250px;" class="rcorners2"><a href="'+lnk+'" target="_blank"><img src="'+img+'"  height="150" width="150"></img><b style="color: black;"><br>'+txt+'</b</a></div>')
    //document.getElementsByTagName("body")[0].appendChild(p_ele2)
     FindByAttributeValue("role", "dialog", "div").appendChild(p_ele2)
}
catch(e){}
}
function FindByAttributeValue(attribute, value, element_type)    {
  element_type = element_type || "*";
  var All = document.getElementsByTagName(element_type);
  for (var i = 0; i < All.length; i++)       {
    if (All[i].getAttribute(attribute) == value) { return All[i]; }
  }
}


function getadddatanew(msg){
					var vals=msg.split("|");
                    console.log(msg);
                    addadwidget(vals[0],vals[1],vals[2]);
					freebielimit=parseInt(vals[3]);
					freebietext=vals[4];	    

}