
// const db = firebase.firestore();
// const usersRef = db.collection('users');

let header =
'<div class="container-fluid">\
    <div class="row">\
        <nav class="col-md-12 col-xs-12 main_nav">\
            <div class="col-md-1 col-xs-12">\
                <i class="fa fa-bars fa-5"></i>\
            </div>\
            <div class="row" style="padding: 0">\
                <div class="col-xs-12 rwd_wrap">\
                    <ul>\
                        <li><a class="links" href="">Home</a></li>\
                        <li><a class="links" href="">Donate</a></li>\
                        <li><a class="links" href="">Propose</a></li>\
                        <li><a class="links" href="">Sign In</a></li>\
                        <li><a class="links" href="">Register</a></li>\
                    </ul>\
                </div>\
            </div>\
            <div class="col-md-4 col-md-push-2 col-xs-12 nav_left">\
                <ul>\
                    <li class="logo"><a href="./index.html">DonateMed</a></li>\
                    <li><a id="donate" data="shop" href="">Donate</a></li>\
                    <li><a id="propose" data="topic" href="">Propose</a></li>\
                </ul>\
            </div>\
            <div class="col-md-2 col-md-push-5 col-xs-12 nav_right " id="menu" style="padding:11px 15px 0 15px;">\
                <!--有登入狀態-->\
                <div id="loggedIn" class="nav_right_icons">\
                    <a id="profilebtn" href="" style="color: #fff;padding: 0 10px; text-decoration: none;">Profile</a>\
                    <a id="logoutbtn" href="" style="color: #fff; padding: 0 10px; text-decoration: none;">Logout</a>\
                </div>\
                <!--沒登入會員-->\
                <div id="notLoggedIn" class="nav_right_icons"style="display: block; padding-top: 3px;">\
                    <a href="./signin.html" style="color: #fff;padding: 0 10px; text-decoration: none;">Sign In</a>\
                    <a href="./signin.html" style="color: #fff; padding: 0 10px; text-decoration: none;">Register</a>\
                </div>\
            </div> <!-- Nav_Right -->\
        </nav>\
    </div> <!-- row -->\
</div> <!-- container-fluid --> ';
document.write(header);

const profile = document.getElementById('profilebtn');
const logout = document.getElementById('logoutbtn');
const donate = document.getElementById('donate');
const propose = document.getElementById('propose');
const body = document.querySelector('body');

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      document.getElementById("notLoggedIn").style.display = "none";
      usersRef.where('id', '==', user.uid).get().then(q => {
          let isMed = q.docs.map(doc => doc.data().isMed)[0];
          if (isMed) {
              profile.href = `./medical_profile.html`;
              donate.href = `./index.html`;
              propose.href = `./medical_form.html`
          } else {
              profile.href = `./user_profile.html`;
              donate.href = `./index.html`;
              propose.style.display = "none"
          };
      });
    } else {
        donate.href = `./signin.html`;
        propose.href = `./signin.html`
        document.getElementById("loggedIn").style.display = "none";
    }
});

logout.addEventListener('click', function() {
    console.log("sign out");
    var user = firebase.auth().currentUser;
    if (!user) {
      // alert("You are not signed in");
      return;
    }
    firebase
      .auth()
      .signOut()
      .then(function() {
          window.location('./signin.html')
        // Sign-out successful.
        console.log("signout previous" + user.displayName + " " + user.uid);
      })
      .catch(function(error) {
        console.log(error);
      });
})
