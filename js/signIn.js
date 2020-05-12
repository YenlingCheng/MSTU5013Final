let db = firebase.firestore();
let userRef = db.collection("users");

let app = new Vue({
  el: "#app",
  data: {
    name: "",
    email: "",
    password: "",
    displayName: "",
    isMed: false
  },
  methods: {
    handleSignUp() {
      console.log("sign up");
      var user = firebase.auth().currentUser;
      if (user) {
        alert("please sign out first");
        return;
      }
      var name = this.name;
      var email = this.email;
      var password = this.password;
      if (email.length < 4) {
        alert("Please enter an email address.");
        return;
      }
      if (password.length < 4) {
        alert("Please enter a password.");
        return;
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert("Register successfully");
          var user = firebase.auth().currentUser;
          if (user) {
            var id = user.uid;
            // console.log(id);
            // console.log("username" + name);
            // console.log("before" + user.displayName);
            user
              .updateProfile({
                displayName: name
              })
              .then(() => {
                // console.log("after" + user.displayName);
                this.displayName = user.displayName;
                window.location = "./index.html";
              });
            userRef.doc(user.uid).set({
              isMed: this.isMed,
              id: user.uid,
              name: name,
              email:user.email
            });
          }
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
      this.name = ""
      this.email = ""
      this.password = ""
      this.isMed = false
    },
    logIn() {
      var name = this.name;
      var email = this.email;
      var password = this.password;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          // alert("Log In successfully");
          var user = firebase.auth().currentUser;
          console.log(user);
          console.log("user" + user.displayName);
          if (user) {
            // alert("User signed in");
            this.displayName = user.displayName;
            console.log(this.displayName);
            window.location = "./index.html";
          } else {
            alert("No user is signed in");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
      console.log("end");
    },
    getUser() {
      var user = firebase.auth().currentUser;
      console.log(user);
      console.log("user" + user.displayName);
      if (user) {
        alert("User signed in");
        this.displayName = user.displayName;
        console.log(this.displayName);
        console.log(user.uid);
        // userRef.doc(user.uid).set{
        //   address:"kegnirngir"
        // }
      } else {
        alert("No user is signed in");
      }
    },

    handleSignOut() {
      console.log("sign out");
      var user = firebase.auth().currentUser;
      if (!user) {
        alert("You are not signed in");
        return;
      }
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          console.log("signout previous" + user.displayName + " " + user.uid);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});
