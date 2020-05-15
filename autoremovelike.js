function get_links(){
    //var links=document.getElementsByTagName("span");
	var links=document.querySelectorAll('article > div:nth-child(3) > section:nth-child(1) span:nth-child(1)');
    var button_links=[]
    for (i = 0; i < links.length; i++) {
        

try{		
		console.log(links[i])
		//if(links[i].className.includes("plqBR")|| links[i].className.includes("coreSpriteHeartOpen")|| links[i].className.includes("glyphsSpriteHeart"))
		if(links[i].firstElementChild.firstElementChild.attributes['fill'].value!='#262626')
		{
			//console.log('inside')
		try{
			//if(links[i].className.includes("filled"))
				button_links.push(links[i].firstElementChild)			
		}
		catch(e){
			
		}
			//button_links.push(links[i].parentElement)
		}
}
catch(e){console.log(e)}
		
        if ( i == links.length-1 || button_links.length==followrate)     
            return button_links;
      

    }    
}


function unlike_posts(){
    try{
    //window.scrollTo(0,document.body.scrollHeight);        
    var buttonlinks=get_links();
    for (i = 0; i < buttonlinks.length; i++) { 
    //var igarticle=findAncestor (buttonlinks[i], 'ARTICLE')
        //console.log(buttonlinks[i])
        clickbutton(buttonlinks[i])

        if (i == buttonlinks.length-1)
              setTimeout(function(){return unlike_posts()}, random_between(interval,interval2));
    }
      if (buttonlinks.length==0)
              setTimeout(function(){window.scrollTo(0,document.body.scrollHeight);return unlike_posts()}, 500);
    }
    catch(e){
        setTimeout(function(){window.scrollTo(0,document.body.scrollHeight);return unlike_posts()}, 500);
        //console.log(e)
    }
    
}

function random_between(interval,interval2)
{
    var rand=Math.floor(Math.random()*(interval2-interval+1)+interval)
    console.log(rand)
    return rand;
}

function clickbutton(button){
    button.scrollIntoView();
    button.click()
}
function deletelist(article_link){
    //setTimeout(function(){return article_link.remove();}, 2000);
    //article_link.innerHTML = '';
}

//*************************************adv
function addadwidget(txt,img,lnk){ 
try{
    console.log('running addadwidget'); 
     var p_ele2=createElement('<div align="center" style="z-index:2000;position: fixed;    bottom: 1em;    right: 1em;border-radius: 15px 30px;    background: #c92844;    padding: 20px;     width: 250px;    height: 250px;" class="rcorners2"><a href="'+lnk+'" target="_blank"><img src="'+img+'"  height="150" width="150"></img><b style="color: black;"><br>'+txt+'</b</a></div>')
    //document.getElementsByTagName("body")[0].appendChild(p_ele2)
     //FindByAttributeValue("role", "dialog", "div").appendChild(p_ele2)
	 document.getElementsByTagName("body")[0].appendChild(p_ele2)
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
//getadddata();
unlike_posts();

function findAncestor (el, tag) {
    while ((el = el.parentElement) && !el.tagName.includes(tag));
    return el;
}


