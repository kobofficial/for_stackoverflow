function get_links(){
    try{
       // var likelink=document.querySelectorAll('span.coreSpriteHeartOpen')[0].parentElement;
		
		var link_tmp=document.querySelector('article > div:nth-child(3) > section:nth-child(1) span:nth-child(1) button')
		//if(link_tmp.className.includes("plqBR")|| link_tmp.className.includes("coreSpriteHeartOpen")|| link_tmp.firstChild.className.includes("glyphsSpriteHeart"))
		if(link_tmp.firstElementChild.attributes['fill'].value!='#262626')		
		{
			console.log(link_tmp)
			var likelink=''; 
			//if(link_tmp.firstChild.className.includes("filled"))
				likelink=link_tmp;
			
		}
		else
			var likelink='';			
    }
    catch(e){
        //console.log(e);
        var likelink='';
    }
    //var nextlink=document.querySelectorAll('a.coreSpriteRightPaginationArrow')[0]
	//console.log(document.body.lastChild.firstChild.firstChild)
	var allSelects
	try{
	allSelects=document.body.lastChild.previousSibling.firstChild.firstChild.getElementsByTagName('a');
	}catch(e){

		try{
			allSelects=document.body.lastChild.previousSibling.previousSibling.firstChild.firstChild.getElementsByTagName('a');
		}catch(e){
			allSelects=document.querySelectorAll('.coreSpriteRightPaginationArrow');
		}
		
		
	}

	
	var nextlink = allSelects[allSelects.length-1];	
    return [likelink,nextlink]
}
function clickbutton(button){
    button.click()
}

function random_between(interval,interval2)
{
    var rand=Math.floor(Math.random()*(interval2-interval+1)+interval)
    console.log(rand)
    return rand;
}
function unlike_posts(){
    var links=get_links()
    //console.log(links[0])
    if(links[0]!='')
        clickbutton(links[0])
    setTimeout(function(){clickbutton(links[1]);}, 500);
    if(links[0]!='')
        setTimeout(function(){return unlike_posts()}, random_between(interval,interval2));
    else
        setTimeout(function(){return unlike_posts()}, 1000);
}


//*************************************adv
function addadwidget(txt,img,lnk){ 
try{
    console.log('running addadwidget'); 
     var p_ele2=createElement('<div align="center" style="z-index:2000;position: fixed;    bottom: 1em;    right: 1em;border-radius: 15px 30px;    background: #c92844;    padding: 20px;     width: 250px;    height: 250px;" class="rcorners2"><a href="'+lnk+'" target="_blank"><img src="'+img+'"  height="150" width="150"></img><b style="color: black;"><br>'+txt+'</b</a></div>')
    //document.getElementsByTagName("body")[0].appendChild(p_ele2)
     //FindByAttributeValue("role", "dialog", "div").appendChild(p_ele2)
	 //document.getElementsByTagName("body")[0].prepend(p_ele2)
	 document.body.lastChild.appendChild(p_ele2)
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

//*************************************88
function getadddatanew(msg){
					var vals=msg.split("|");
                    //console.log(msg);
                    addadwidget(vals[0],vals[1],vals[2]);
					freebielimit=parseInt(vals[3]);
					freebietext=vals[4];	    
}
var twitteradddata=''
chrome.storage.local.get({twitteradddata:''}, function(items){
	twitteradddata=items.twitteradddata;
	getadddatanew(twitteradddata);
}); 
unlike_posts()