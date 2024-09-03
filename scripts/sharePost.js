function sharePost(id) {
  var url = new URL(window.location.href);
  url.searchParams.set('job', id);
  var key = url.searchParams.get('job')
  url.pathname = '/jobDetails.html';
  // window.location.href = url.href;
    navigator.clipboard.writeText(url.href);//Copies text to clipboard
    alert("Link copied : "+  url.href);
  }