let db = firebase.firestore();
let medCentersRef = db.collection("medicalCenters");
let itemsRef = db.collection("itemNeeds");
let donateRef = db.collection("donations");
let usersRef = db.collection("users");


let app = new Vue({
      el: "#app",
      data: {
        date: [],
        userInfo: [],
        donationsInfo: [],
        item: [],
        quantity: 0,
        totalDonations: 0,
        userName: "",
        userEmail: "",
        id: "",
      },
      computed: {
        // Functions HERE
      },
      methods: {
        readUserInfo() {
          donateRef
            .where("donor", "==", this.userEmail)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log(doc.data());
                this.userInfo.push(doc.data());
              });
            });
        },

        getTotalDonationsForUser() {
          donateRef
            .where("donor", "==", this.userEmail)
            .get()
            .then((snapshot) => {
              this.totalDonations = snapshot.docs.length;
            });
        }
      },
      mounted() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
              this.user = user;
              this.userName = user.displayName;
              this.userEmail = user.email;
              this.readUserInfo();
              this.getTotalDonationsForUser();
              document.getElementById("notLoggedIn").style.display = "none";
            } else {
              // No user is signed in.
              document.getElementById("loggedIn").style.display = "none";
            }
          })

        }
      });

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
})




