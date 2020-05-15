
function get_links(){
    var links=document.getElementsByTagName("a");
    var button_links=[]
    for (i = 0; i < links.length; i++) {

        if(links[i].hasAttribute("title"))
            button_links.push(links[i].parentElement.parentElement.parentElement.parentElement)
        if ( i == links.length-1 || button_links.length==followrate)     
       {
           return button_links;
       }
    }    
}

function deletelist(button_link){
 //   document.querySelectorAll('div[role="dialog"]')[0].getElementsByTagName("ul")[0].parentElement.scrollBy(0, 100);
    if (button_link.parentElement.parentElement.tagName=='LI')
    { 
        //button_link.parentElement.parentElement.scrollBy(0, 100); 
        button_link.parentElement.parentElement.remove()
    }
    else
        button_link.remove()
}

function random_between()
{
    var rand=Math.floor(Math.random()*(interval2-interval+1)+interval)
    console.log(rand)
    return rand;
}

function follow_users(){
    //console.log('starting')
    try{
    var buttonlinks=get_links();
    for (i = 0; i < buttonlinks.length; i++) { 
            //console.log(buttonlinks[i])
            var button=buttonlinks[i].getElementsByTagName("button")[0];
            if(getComputedStyle(button).color=='rgb(255, 255, 255)')
            {
                console.log('Button clicked')
                button.click();
            }
            else
                {
                    deletelist(buttonlinks[i])
                    return  follow_users()
                }
            
            
           
            if (i == buttonlinks.length-1)
            {                
                  setTimeout(function(){return follow_users()}, random_between());
            }
              deletelist(buttonlinks[i])
        }
        if(buttonlinks.length==0)
        {
            console.log('No Links')
            chrome.extension.sendMessage({ cmd: "refreshfollow",interval:interval,interval2:interval2,followrate:followrate});
            //setTimeout(function(){follow_users()}, random_between());    
        }
    }
    catch(e){
        console.log(e)
        deletelist(buttonlinks[i])
        return  follow_users()
    }
    
}


follow_users()

