(function () {
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(auth);
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                debugger
                var cred = authResult.user;
                if (cred.uid === "4eWS8sKNmFdMeaY6uGC5uPdsI8V2")
                window.location.assign('adminJobPosting.html');
                else{
                    alert("please enter admin id")
                    window.location.assign('admin.html');
                }
            },
            uiShown: function () {
                document.getElementById('loader').style.display = 'none';
            }
        },
        
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'adminJobPosting.html',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],

        // Terms of service url.
        tosUrl: 'adminJobPosting.html',
    };
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
})()
