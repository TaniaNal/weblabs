function isOnline() {
    return window.navigator.onLine;
}

var useLocalStorage = false;

class News {
  constructor(title, short_descr, img) {
    this.title =  title;
    this.short_descr = short_descr;
    this.img = img;
  }
}

function newsTemplate(news) {
	var title =  news.title;
    var short_descr = news.short_descr;
    var photo = news.img;

	return `
	<div class="col-md-6 col-lg-4 col-xl-3"> 
        <div class="card">
          <img class="card-img-top img-fluid" src=${photo} alt="Card image">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${short_descr}</p>
          </div>
        </div>
      </div>
	 `
}

 function addElementNews(){
	if(isOnline() && useLocalStorage){
	items = localStorage.getItem("news_list");
	if(items) {
	    for(var i = 0; i < items.length; i++){
	    	var temp = new News(items[i].title, items[i].short_descr,
			    	items[i].img)
	 		$('#news').prepend(
			    newsTemplate(temp)
			  	);
			}
		}
	}
	else if(isOnline() && !useLocalStorage){
		var openDB = indexedDB.open("news_list", 1);
	    openDB.onupgradeneeded = function() {
	        var db = openDB.result;
	        var store = db.createObjectStore("news", {keyPath: "title"});
	        store.createIndex("title", "title", { unique: false });
	        store.createIndex("short_descr", "short_descr", { unique: false });
	        store.createIndex("img", "img", { unique: false });
	    }
	    openDB.onsuccess = function(event) {
	      var db = openDB.result;
	      var tx = db.transaction("news", "readwrite");
	        var store = tx.objectStore("news");
	        store.openCursor().onsuccess = function(event) {
	        var cursor = event.target.result;

	        if (cursor) {
	          var temp = new News(cursor.value.title, cursor.value.short_descr, cursor.value.img);
	          $('#news').prepend(
			    newsTemplate(temp)
			  );
	          cursor.continue();
	        }
	      };
	        tx.oncomplete = function(){
	          db.close();
	        }
	    }
	}
	else {
		alert("You are offline");
	}
}

const onOnline = () => {
  addElementNews();
  console.log('Back online');
}

const onOffline = () => {
  console.log('Gone offline');
}

window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);
