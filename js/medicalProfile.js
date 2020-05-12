let db = firebase.firestore();
let medCentersRef = db.collection("medicalCenters");
let itemsRef = db.collection("itemNeeds");
let donateRef = db.collection("donations");
let usersRef = db.collection("users");

// var user = firebase.auth().currentUser;
// 其他authentication的碼寫在mounted

// var email = "contact@cuimc.com";
// var name ='Columbia University Irving Medical Center'
// let userEmail = user. email;
// let userName = user.displayName;
// var id;

Vue.component("item", {
  props: ["itemName"],
  template: `
<div class="container">
<div class="tablearea">
</div>
</div>

`,
  methods: {},
  computed: {}
});

let app = new Vue({
  el: "#app",
  data: {
    medCenter: {},
    centerInfo: [],
    maskInfo: [],
    gloveInfo: [],
    gownInfo: [],
    ventilatorInfo:[],
    goggleInfo:[],
    shieldInfo:[],
    itemNeedsInfo: [],
    total: 0,
    user: null
  },
  computed: {
    stillNeed() {
      var total = 0;
      for (var i = 0; i < this.maskInfo.length; i++) {
        total = total + this.maskInfo[i].received;
      }
      // console.log(total);
      return total;
    }
  },
  methods: {
    readUsers() {
      usersRef
        .where("email", "==", this.user.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.centerInfo.push(doc.data());
          });
        });
    },
    readMaskInfo() {
      donateRef
        .where("donee", "==", this.user.email)
        .where("item", "==", "masks")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.maskInfo.push(doc.data());
            // console.log(doc.data());
          });
        });
    },
    readGloveInfo() {
      donateRef
        .where("donee", "==", this.user.email)
        .where("item", "==", "gloves")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.gloveInfo.push(doc.data());
          });
        });
    },
    readVentilatorInfo(){
        donateRef
        .where("donee", "==", this.user.email)
        .where("item", "==", "ventilators")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.ventilatorInfo.push(doc.data());
            // console.log(doc.data());
          });
        });
    },
    readGoggleInfo(){
        donateRef
        .where("donee", "==", this.user.email)
        .where("item", "==", "goggles")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.goggleInfo.push(doc.data());
            // console.log(doc.data());
          });
        });
    },
    readShieldInfo(){
         donateRef
        .where("donee", "==", this.user.email)
        .where("item", "==", "shields")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.shieldInfo.push(doc.data());
            // console.log(doc.data());
          });
        });
    }
    ,
    readGownInfo(){
       donateRef
      .where("donee", "==", this.user.email)
      .where("item", "==", "gowns")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data(), 'hahaha');
          this.gownInfo.push(doc.data());
          // console.log(doc.data());
        });
      });
  },
    readItemNeeds() {
      itemsRef
        .where("medicalCenter", "==", this.user.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.itemNeedsInfo.push(doc.data());
            // console.log(doc.data());
          });
        });
    },
    readOneMedCenter() {
      medCentersRef
        .doc(this.user.uid)
        .get()
        .then((docSnap) => {
          this.medCenter = docSnap.data();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTotalDonationsForHospital() {
      donateRef
        .where("donee", "==", this.user.email)
        .get()
        .then((snapshot) => {
          this.total = snapshot.docs.length;
        });
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        console.log('success', user.email)
        this.readOneMedCenter();
        this.readUsers();
        this.readMaskInfo();
        this.readItemNeeds();
        this.readGloveInfo();
        this.readVentilatorInfo();
        this.readGoggleInfo();
        this.readGownInfo();
        this.getTotalDonationsForHospital();
        document.getElementById("notLoggedIn").style.display = "none";
      } else {
        document.getElementById("loggedIn").style.display = "none";
      }
  })

}});

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




