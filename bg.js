/* Check whether new version is installed */
chrome.runtime.onInstalled.addListener(function(details) {
    /* other 'reason's include 'update' */
    if (details.reason == "install") {
        /* If first install, set uninstall URL */
        var uninstallGoogleFormLink = 'http://bit.ly/2piqoIe';//'https://goo.gl/g54jMN';
        /* If Chrome version supports it... */
        if (chrome.runtime.setUninstallURL) {
            chrome.runtime.setUninstallURL(uninstallGoogleFormLink);
        }
		 chrome.windows.create({url: "https://toolsfor.us/tutorials/index.html?app_name=InstagramAutoFollower",incognito: true},function(w) {});
        //alert("Thanks for installing me.\n Please see the tutorial videos in the Product detail page first.")

    }
});


chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.cmd == "alert") alert(request.msg);
        if(request.cmd == "likelottery") likelottery();
		if(request.cmd == "tutorial") chrome.windows.create({url: "https://toolsfor.us/tutorials/index.html?app_name=InstagramAutoFollower",incognito: true},function(w) {});
    }
);

function likelottery(){
    //var execode="  setTimeout(function(){ document.querySelectorAll('span.coreSpriteHeartOpen')[0].parentElement.click();  }, 10);  "
	var execode=" var link_tmp=document.querySelector('article > div:nth-child(3) > section:nth-child(1) span:nth-child(1)'); \n"+
		"if( (link_tmp.firstChild.className.includes('ptsdu'))|| (link_tmp.firstChild.className.includes('coreSpriteHeartOpen')) && link_tmp.firstChild.firstChild.className.includes('outline')) \n"+
		"{ \n"+
		"	var likelink=link_tmp.firstChild; \n"+
		"} \n"+
		"likelink.click(); \n";
      chrome.tabs.executeScript({
          code: execode
        }); 
}
     

 