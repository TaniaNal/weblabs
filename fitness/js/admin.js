window.onload = function(){ 
function isOnline() {
    return window.navigator.onLine;
}

const title =  document.getElementById('title');
const short_descr = document.getElementById('short_descr');
const img = document.getElementById('fileform')

var news_list = []

const onSubmitPress = function(e){
  e.preventDefault();
  title_v = title.value.trim();
  short_descr_v = short_descr.value.trim()
    
  if (title_v != 0 && short_descr_v != 0 ) {
    var news = {}
    news.title = title.value;
    news.short_descr = short_descr.value;
    news.img = img.files[0].name;
    storeMessage(news);
  } 
  else if (title_v == 0 && short_descr_v == 0){
    alert("Fill in all fields!");
    return;
  }
 }

function storeMessage(box) {
    if (isOnline()) {
        storeMessageRemotely(box);
    } else {
        storeMessageLocaly(box);
    }
}

function storeMessageLocaly(box) {
    news_list.push(box);
    localStorage.setItem("news_list",JSON.stringify(news_list));
    alert('Message saved locally: "' + box.title + '"');
    clearUI();
}

function storeMessageRemotely(box) {
    alert('Message sent to server: "' + box.title + '"');
    clearUI();
    return false;
}

function sendAllToServer() {
  items = JSON.parse(localStorage.getItem("news_list"));
    for(var i = 0; i < items.length; i++){
       alert("Sending to server item " + items[i].title);
    }
    localStorage.removeItem("news_list");
}

function clearUI () {
    title.value = '';
    short_descr.value = '';
    long_descr.value = '';
    img.value = '';
    return false;
}

function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
  }
}

$("#fileform").change(function() {
  readURL(this);
});

 (function () {
    if (window.applicationCache) {
        window.addEventListener('online', function (e) {
          alert('Back online');
        }, true);

        window.addEventListener('offline', function (e) {
          alert('Gone offline');
        }, true);
    }
})();

const addButton = document.getElementById('submit-btn');
addButton.onclick = onSubmitPress;
}
