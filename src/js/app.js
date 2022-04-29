// framework7
var $$ = Dom7;
app = new Framework7({
    id: "projectupcycle",
    root: "#app",
    theme: "md",
    routes,
});
// firebase init
const firebaseConfig = {
    apiKey: "AIzaSyAZj7NcR7SDBH5xQ8TuLTDSRif7cEZSLTs",
    authDomain: "projectupcycleau.firebaseapp.com",
    projectId: "projectupcycleau",
    storageBucket: "projectupcycleau.appspot.com",
    messagingSenderId: "1009356463859",
    appId: "1:1009356463859:web:51b9f2e3e23cf396e8e186",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // db instance
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
let loginEvent = false
// All authentication and app state management
// This is executed first
firebase.auth().onAuthStateChanged(function (user) {
    //alert(user.uid);
    // realtime authenctication listener
    // if it is logged in
    if (loginEvent == false) {
        if (user) {
            switch (localStorage.getItem("loggedCat")) {
                case "users":
                    document.getElementById("user").click();
                    getUserData(user)
                    break;
                case "dept":
                    document.getElementById("dept").click();
                    getDeptData(user)
                    break;
            }
        } else {

            document.getElementById("intro").click();
        }
    }
});
function signUsrOut() {
    localStorage.clear();
    firebase
        .auth()
        .signOut()
        .catch(function (error) {
            if (error.code == "auth/network-request-failed") {
                var errorMsg = "Network error! Please check your connection.";
            } else {
                var errorMsg = "Error signing out! Please try again";
            }
            app.toast.create({ text: errorMsg, closeTimeout: 3000 }).open();
        });
}
function getDeptData(user) {
    $$(document).on("page:afterin", '.page[data-name="dept"]', function (e) {
        document.getElementById("userNameA").innerText = localStorage.getItem(
            "loggeduName"
        );
        document.getElementById("userEmailA").innerText = user.email;
    });
}
function getUserData(user) {
    $$(document).on("page:afterin", '.page[data-name="user"]', function (e) {
        document.getElementById("userNameA").innerText = localStorage.getItem(
            "loggeduName"
        );
        document.getElementById("userEmailA").innerText = user.email;
    });
}
function getNext(n) {
    globalThis.swiper = document.querySelector(".swiper-container").swiper;
    if (n > 0) {
        globalThis.swiper = document.querySelector(".swiper-login").swiper;
        swiper.slideTo(n);
    } else {
        swiper.slideNext();
    }
}
function registerU() {

    if (app.input.validateInputs(document.getElementById("register-form"))) {
        loginEvent = true;
        app.dialog.preloader("Registering...");
        var formData = app.form.convertToData("#register-form");
        firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password) //
            .then((userCredentials) => {
                var user = userCredentials.user
                db.collection("members")
                    .doc("users")
                    .collection("accounts")
                    .doc(user.uid)
                    .set({
                        userName: formData.name,
                        userEmail: formData.email,
                    }).then(() => {
                        localStorage.setItem("loggedCat", "user"); // sets user
                        localStorage.setItem("loggeduName", formData.name);
                        localStorage.setItem("loggeduEmail", formData.email);
                        window.location.reload()
                    })
                    .catch((error) => {
                        console.log("Error getting document:", error.code);
                    });
            })
            .catch(function (error) {
                //
                app.dialog.close();
                if (error.code == "auth/network-request-failed") {
                    var errorMsg = "Network error! Please check your connection.";
                } else {
                    var errorMsg = "Invalid Email/Password! Try again.";
                }
                app.toast.create({ text: errorMsg, closeTimeout: 3000 }).open();
            });
    } else {
        app.toast
            .create({
                text: "Fill the required fields with valid details!",
                closeTimeout: 2000,
            })
            .open();
    }
}

function signIn(x) {
    if (app.input.validateInputs(document.getElementById("login-form"))) {
        app.dialog.preloader("Signing In...");
        var formData = app.form.convertToData("#login-form");
        firebase
            .auth()
            .signInWithEmailAndPassword(formData.email, formData.password) //
            .then((userCredentials) => {
                var user = userCredentials.user
                // successful
                var query = db.collection("members")
                    .doc(x)
                    .collection("accounts")
                    .doc(user.uid)
                query
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            var uData = doc.data(); // firestore function returns json data
                            localStorage.setItem("loggedCat", x); // sets user
                            localStorage.setItem("loggeduName", uData.userName);
                            localStorage.setItem("loggeduEmail", uData.userEmail);
                            window.location.reload()
                        } else {
                            app.dialog.close();
                            app.dialog.alert(
                                "User data doesn't exists / missing from the server please contact your administrator!",
                                "Error",
                                signUsrOut
                            );
                        }
                    })
                    .catch((error) => {
                        console.log("Error getting document:", error.code);
                    });

            })
            .catch(function (error) {
                //
                app.dialog.close();
                if (error.code == "auth/network-request-failed") {
                    var errorMsg = "Network error! Please check your connection.";
                } else {
                    var errorMsg = "Invalid Email/Password! Try again.";
                }
                app.toast.create({ text: errorMsg, closeTimeout: 3000 }).open();
            });
    } else {
        app.toast
            .create({
                text: "Fill the required fields with valid details!",
                closeTimeout: 2000,
            })
            .open();
    }
}

