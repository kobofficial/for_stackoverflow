setdatecount()    
//console.log('hello')
function setdatecount(){
var today = new Date();
var dd = today.getDate(); 
chrome.storage.sync.get('ig_follower_date', function(data) {

if (typeof data.ig_follower_date === 'undefined' || data.ig_follower_date!=dd ) {
             chrome.storage.sync.set({
                        ig_follower_date: dd,
                        ig_lottery_registered:false,
                        unfollowcount:0,
                        followcount:0,
                        likescount:0,
                        retweetscount:0
                }, function() {
                    
                    document.getElementById('registeredtoday').innerText='You are not registered for today';
                    
                }); 
        } else {
            //console.log(data.ig_follower_date)
            }
        });
    
}
function openCity(evt) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(evt.currentTarget.id.slice(0, -1)).style.display = "block";
	//evt.currentTarget.className += " active";
	document.getElementById(evt.currentTarget.id).className += " active";

}

// Get the element with id="defaultOpen" and click on it


  var buttons2 = document.querySelectorAll('.tablinks');
  for (var i = 0; i < buttons2.length; i++) {
	 
    buttons2[i].addEventListener('click', openCity);
	  buttons2[0].click();
  }

function writeconsole(event){
console.log(event.currentTarget.textContent)
}


// Saves options to chrome.storage
function save_options() {
  var igfollowlimit=document.getElementById('igfollowlimit').value;
  var igunfollowlimit=document.getElementById('igunfollowlimit').value;
  var iglikeslimit=document.getElementById('iglikeslimit').value;
  var iglikelotteryurl=document.getElementById('iglikelotteryurl').value;
  var igdontfollowlist=document.getElementById('igdontfollowlist').value;
  var igdontunfollowlist=document.getElementById('igdontunfollowlist').value;
  
  chrome.storage.local.set({igdontfollowlist:igdontfollowlist,igdontunfollowlist:igdontunfollowlist}, function(){});
  chrome.storage.sync.set({
    igfollowlimit:igfollowlimit,
    igunfollowlimit:igunfollowlimit,
    iglikeslimit:iglikeslimit,
    iglikelotteryurl:iglikelotteryurl
   //// igdontfollowlist:igdontfollowlist,
////    igdontunfollowlist:igdontunfollowlist
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    var statusunfollow = document.getElementById('statusunfollow');
    statusunfollow.textContent = 'Options saved.';
    var statuslikes = document.getElementById('statuslikes');
    statuslikes.textContent = 'Options saved.';   
    var statuslikelottery = document.getElementById('statuslikelottery');
    statuslikelottery.textContent = 'Options saved.';       

    setTimeout(function() {
      statusunfollow.textContent = '';
      status.textContent = '';
      statuslikes.textContent = '';
      statuslikelottery.textContent = '';
    }, 750);
  });
}
var properties_obj={}
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value loc = 'red' and useoptions = true.
chrome.storage.local.get({igdontfollowlist:'',igdontunfollowlist:''}, function(items){
	document.getElementById('igdontfollowlist').value = items.igdontfollowlist;
	document.getElementById('igdontunfollowlist').value = items.igdontunfollowlist;
	});  
  chrome.storage.sync.get({
    iglikeslimit:100,
    ig_lottery_registered:false,
    igfollowlimit: 100,
    igunfollowlimit :100,
    iglikelotteryurl:''
    ////igdontfollowlist:'',
    ////igdontunfollowlist:''
  }, function(items) {
    document.getElementById('igfollowlimit').value = items.igfollowlimit;
    document.getElementById('igunfollowlimit').value = items.igunfollowlimit;
    document.getElementById('iglikeslimit').value = items.iglikeslimit;
    document.getElementById('iglikelotteryurl').value = items.iglikelotteryurl;
////    document.getElementById('igdontfollowlist').value = items.igdontfollowlist;
////    document.getElementById('igdontunfollowlist').value = items.igdontunfollowlist;
    
    //console.log('items.ig_lottery_registered:'+items.ig_lottery_registered)
    if(items.ig_lottery_registered)
            document.getElementById('registeredtoday').innerText = 'Congrats!,the limits are removed for today';
     else
            document.getElementById('registeredtoday').innerText = 'Press this button and you will get Pro version(no limits) for today';
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);
document.getElementById('saveunfollow').addEventListener('click',save_options);
document.getElementById('savelikes').addEventListener('click',save_options);
//document.getElementById('likelotterybutton').addEventListener('click',save_options);
document.getElementById('checkrewardbutton').addEventListener('click',lottery_reward);

   

function lottery_reward(){
	getlottery();
}


function createTab (url) {
    return new Promise(resolve => {
        chrome.tabs.create({url}, async tab => {
            chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
                if (info.status === 'complete' && tabId === tab.id) {
                    chrome.extension.sendMessage({ cmd: "likelottery"  });
                    chrome.extension.sendMessage({ cmd: "alert",msg:"The app is pro version for a day as you have liked the previous lottery winner's posts,\n Thank you"  });
                    chrome.tabs.onUpdated.removeListener(listener);
                    chrome.storage.sync.set({ig_lottery_registered:true}, function() {document.getElementById('registeredtoday').innerText='Congrats!,the limits are removed for today';});  
                    //var iglikelotteryurl=document.getElementById('iglikelotteryurl').value;
                    //addlotteryxhr(iglikelotteryurl)
                    resolve(tab);
                }
            });
        });
    });
}


   


function addlotteryxhr(url)
{
    
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        //alert(xhr.responseText);
    }
}
xhr.open('GET', 'https://toolsfor.us/lottery/index.php?action=register&uid='+uniqueuserid+'&url='+encodeURI(url), true);
xhr.send(null);    
    
}

function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}
var uniqueuserid=''
chrome.storage.sync.get('userid', function(items) {
    var userid = items.userid;
    if (userid) {
        useToken(userid);
    } else {
        userid = getRandomToken();
        chrome.storage.sync.set({userid: userid}, function() {
            useToken(userid);
        });
    }
    function useToken(userid) {
        //console.log(userid)
        uniqueuserid=userid;
    }
});

function getlottery(){
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var url=JSON.parse(this.responseText).url
    //console.log(url)
    let tab =  createTab(url);
  }
};
xhttp.open("GET", "https://toolsfor.us/lottery/index.php?action=gettodaylottery", true);
xhttp.send();    
}