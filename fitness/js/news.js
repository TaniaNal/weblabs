function isOnline() {
    return window.navigator.onLine;
}

const news = (photo, title, short_descr)=> `
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

 function addElementNews(){
	if(isOnline()){
	items = JSON.parse(localStorage.getItem("news_list"));
    for(var i = 0; i < items.length; i++){
 		$('#news').prepend(
		    news(items[i].img,
		    	items[i].title,
		    	items[i].short_descr)
		  	);
		}
	}
	else {
		alert("You are offline");
	}
}
