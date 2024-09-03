function learnMore(id) {
    debugger
    // sessionStorage.setItem("key", id);
    // window.location.href = "jobDescription.html"
    var url = new URL(window.location.href);
    url.searchParams.set('job', id);
    var key = url.searchParams.get('job')
    url.pathname = '/adminJobDescription.html';
    window.location.href = url.href;
    // window.open(url.href);
}