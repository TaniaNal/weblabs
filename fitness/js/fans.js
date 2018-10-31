const review_template = (title, text, datetime) => `
    <div class="post-preview">
      <p class="post-subtitle">${text}</p>
      <div class="row">
        <div class="col-auto">
          <p class="post-meta">${datetime}</p>
        </div>
        <div class="col-auto">
          <p class="author"> <a href="#" style="float: right;">Tania</a></p>
        </div>
      </div>
    </div>
    `

function isOnline() {
    return window.navigator.onLine;
}

function load_data() {
  if(isOnline()) {
    items = JSON.parse(localStorage.getItem("reviews"));
    for(var i = 0; i < items.length; i++){
      $('#posts').append(
          review_template(items[i].title, items[i].review, items[i].datetime)
        );
    }
    } 
}

reviews = []

function send() {
  var review =  document.getElementById('review');
  if(review.value.trim() != "") {
    var new_review = {};
    new_review.title = review.value.split("\n",1)[0];
    new_review.review = review.value;
    var date = new Date();
    new_review.datetime = date.getDate() + "."+ (date.getMonth()+1)  + "." + date.getFullYear() + ","  + date.getHours() + ":" + date.getMinutes();
    if(!isOnline()) {
      reviews.push(new_review)
      localStorage.setItem("reviews",JSON.stringify(reviews));
      alert('Message saved locally: "' + new_review.title + '"');
    }
    if(isOnline()) {
      $('#posts').append(
        review_template(new_review.title, new_review.review, new_review.datetime));
        alert('Message sent to server: "' + new_review.title + '"');
    }
  }
  else {
    alert("Review must be filled out");
    return;
  }
  clearUI();
};


function clearUI () {
    document.getElementById('review').value = '';
}

function sendAllToServer() {
  items = JSON.parse(localStorage.getItem("reviews"));
    for(var i = 0; i < items.length; i++){
       alert("Sending to server item " + items[i].title);
    }
    localStorage.removeItem("reviews");
}

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