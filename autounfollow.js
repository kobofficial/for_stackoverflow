
function get_links(){
    var links=document.getElementsByTagName("a");
    var button_links=[]
    for (i = 0; i < links.length; i++) {

        if(links[i].hasAttribute("title"))
            button_links.push(links[i].parentElement.parentElement.parentElement.parentElement.parentElement)
        if ( i == links.length-1 || button_links.length==1)     
       {
           return button_links;
       }
    }    
}

function deletelist(button_link){
	try{
    document.querySelectorAll('div[role="dialog"]')[0].getElementsByTagName("ul")[0].parentElement.scrollBy(0, 100);
    if (button_link.parentElement.tagName=='LI')
    { 
        button_link.parentElement.parentElement.scrollBy(0, 100); 
        button_link.parentElement.remove()
    }
    else
        button_link.remove()
  }catch(e){}	
}
function random_between()
{
    var rand=Math.floor(Math.random()*(interval2-interval+1)+interval)
    console.log(rand)
    return rand;
}

function doesinclude(str){
  try{
  if(igdontunfollowlist!='')
    return igdontunfollowlist.includes(str);
  else 
    return false;
  }catch(e){
    return false;        
        }
}


function unfollow_users(){
 /*    if (!continueactionvar)
    {
        alert("This msg is from Instagram Auto Follower Extension: \n\nStop unfollowing for a while and go slow or Instagram will block you")
        return
    } */	
    //console.log('starting')
    try{
    var buttonlinks=get_links();
    //console.log(buttonlinks)
    for (i = 0; i < buttonlinks.length; i++) { 
            //console.log(buttonlinks[i])
            var button=buttonlinks[i].getElementsByTagName("button")[0];
            var computed_style=getComputedStyle(button).color;
            var screenname=buttonlinks[i].getElementsByTagName("a")[0].getAttribute('href').replace(new RegExp('/', 'g'),'');
            console.log(screenname)
            console.log(doesinclude(screenname))
            if((computed_style=='rgb(38, 38, 38)') && !(doesinclude(screenname)))
            {
                console.log('Button clicked')
                countercheck()
                button.click();
				deletelist(buttonlinks[i]);
				setTimeout(function(){ try{
					var unfollow_button_arr=document.querySelectorAll('div[role="presentation"] button');
					unfollow_button_arr[unfollow_button_arr.length-2].click();
					//document.querySelectorAll('div[role="presentation"] button')[1].click();
				}catch(e){} },1000);
            }
            else
                {
                    deletelist(buttonlinks[i])
                    return  unfollow_users()
                }
            
            
           
            if (i == buttonlinks.length-1)
            {                
                  setTimeout(function(){return unfollow_users()}, random_between());
            }
              //deletelist(buttonlinks[i])
        }
        if(buttonlinks.length==0)
        {
            console.log('No Links')
            setTimeout(function(){unfollow_users()}, random_between());    
        }
    }
    catch(e){
        console.log(e)
        deletelist(buttonlinks[i])
        return  unfollow_users()
    }
    
}

var continueactionvar=true


function continueaction(){
    if(!continueactionvar)
        return
        request = new XMLHttpRequest();
        var xhrpage=random_between(1,10000);
        
        request.open("GET", "https://www.instagram.com/web/friendships/"+xhrpage+"/follow/", true);
        request.send(null);

        request.onreadystatechange = function() {
            if(request.readyState === 4) { // What does this even mean?
                   // console.log(request.responseText);
                   // console.log(!request.responseText.includes('Please wait a few minutes'))
                    continueactionvar=(!request.responseText.includes('Please wait a few minutes'))
                   // console.log("https://www.instagram.com/web/friendships/"+xhrpage+"/follow/")
            }
        }
    setTimeout(function(){continueaction()}, random_between(interval,interval2));            
}

function addcountwidget(){  
     var p_ele2=createElement('<div align="center" style="z-index:2000;position: fixed;    top: 10em;    right: 1em;border-radius: 15px 30px;    background: #c92844;    padding: 20px;     width: 90px;    height: 95px;" class="rcorners2"><table><tr><td align="center">Unfollows</td></tr><tr><td align="center"><span style="font-size: 35px;font-weight: bold;"id="igcnt">0</span></td></tr></table></div>')
    document.getElementsByTagName("body")[0].appendChild(p_ele2)

}


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
function getadddata(){
    console.log('running get adddata');
        // Loading the jQuery code
        request = new XMLHttpRequest();
        request.open("GET", "https://toolsfor.us/apps/indexnormal.php?appname=InstagramAutoFollower", true);
        request.send(null);

        request.onreadystatechange = function() {
            console.log(request.responseText);
            if(request.readyState === 4) { // What does this even mean?
                if(request.status === 200) {
                    var vals=request.responseText.split("|");
                    console.log(request.responseText);
                    addadwidget(vals[0],vals[1],vals[2]);
					freebielimit=parseInt(vals[3]);
					freebietext=vals[4];
                }
            }
        }    
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
//document.getElementById("igcnt").textContent=igfollowcount;


var continueactionvar=true


function continueaction(){
    if(!continueactionvar)
        return
        request = new XMLHttpRequest();
        var xhrpage=random_between(1,10000);
        
        request.open("GET", "https://www.instagram.com/web/friendships/"+xhrpage+"/follow/", true);
        request.send(null);

        request.onreadystatechange = function() {
            if(request.readyState === 4) { // What does this even mean?
                   // console.log(request.responseText);
                   // console.log(!request.responseText.includes('Please wait a few minutes'))
                    continueactionvar=(!request.responseText.includes('Please wait a few minutes'))
                   // console.log("https://www.instagram.com/web/friendships/"+xhrpage+"/follow/")
            }
        }
    setTimeout(function(){continueaction()}, random_between(interval,interval2));            
}

function countercheck()
{
    document.getElementById("igcnt").textContent=igunfollowcount;
    if(freebielimit<igunfollowcount && !ig_lottery_registered)
    {
        if(firstalert)
        {
            //firstalert=false
            alert("Limit for the free version reached\n\n"+freebietext)
			////var optionsUrl = chrome.extension.getURL("options.html");
			////window.open(optionsUrl, '_blank');
			if(firstredirect)
			{
				window.open('https://chrome.google.com/webstore/detail/auto-follower-for-instagr/ibhpainpkojknmkhhhedikdkclinobdo', '_blank');
				firstredirect=false
			}
            location.reload();
        }
    }		


    if(igunfollowlimit>igunfollowcount)
        igunfollowcount=igunfollowcount+1;
    else
    {
        if(firstalert)
        {
            //firstalert=false
            alert("Limit for this action has reached")
            location.reload();
        }
    }
    

}

function getadddatanew(msg){
					var vals=msg.split("|");
                    console.log(msg);
                    addadwidget(vals[0],vals[1],vals[2]);
					freebielimit=parseInt(vals[3]);
					freebietext=vals[4];	    
}


var freebielimit=10
var freebietext=''
var ig_lottery_registered
var firstalert=true
var firstredirect=true
var iglikescount=0
var igfollowcount=0
var igunfollowcount=0
var twitteradddata=''

var iglikeslimit
var igfollowlimit
var igunfollowlimit
var igdontunfollowlist
function getusersettings(){
  chrome.storage.local.get({igdontunfollowlist:'',twitteradddata:''}, function(items){
	  igdontunfollowlist=items.igdontunfollowlist.toLowerCase();
		twitteradddata=items.twitteradddata;
		getadddatanew(twitteradddata);	  
	  });  	
  chrome.storage.sync.get({
    iglikeslimit:1000,
    igfollowlimit: 1000,
    igunfollowlimit :1000,
    igdontunfollowlist:'',
	ig_lottery_registered:false
  }, function(items) {
	ig_lottery_registered=items.ig_lottery_registered;
    iglikeslimit=parseInt(items.iglikeslimit);
    igfollowlimit=parseInt(items.igfollowlimit);
    igunfollowlimit=parseInt(items.igunfollowlimit);
    ////igdontunfollowlist=items.igdontunfollowlist.toLowerCase();
  });
} 

//getadddata();
getusersettings();
 setTimeout(function(){
     addcountwidget();
     unfollow_users();
	 //continueaction();
	 }, 1000);

