let db = firebase.firestore();
let itemNeedsRef = db.collection("itemNeeds");
let usersRef = db.collection("users");
let donationsRef = db.collection("donations");
// getting parameter from url
let {
  search
} = new URL(location.href);
let getParam = search => {
  return search.slice(4)
}
// setting grabbed param to medical id
let medicalId = getParam(search);

// med email
// var email = "contact@cuimc.com";
// var user = firebase.auth().currentUser;
// var userEmail = "sf8377@gmail.com";
// var userEmail = user.email;

// var unsubscribe

// displayNames: 'medical masks', 'goggles', 'ventilators', 'medical gowns', 'medical gloves', 'medical face shields'
// items: 'masks', 'goggles', 'ventilators', 'gowns', 'gloves', 'shields'

let app = new Vue({
  el: "#userForm",
  data: {
    medName: "",
    userInfo: {
      phone: "",
      email: '',
      user: null,
      userEmail: '',
      userName: ''
      // email: ""
      // isMedical: false
    },
    donationItem: {
      surgicalMasks: 0,
      ventilators: 0,
      medicalGloves: 0,
      isolationGowns: 0,
      goggles: 0,
      medicalShield: 0,
      received: 0,
      progress: 0
    }
  },
  methods: {
    submitForm() {

      if (!this.userInfo.phone) {
        alert('Please enter your phone number!');
        return
      };

      usersRef.doc(this.userInfo.user.uid).update({phone: this.userInfo.phone}).then(res => {console.log('phone saved')});

      itemNeedsRef
        .where("medicalCenter", "==", this.userInfo.email)
        .where("item", "==", "masks")
        .get()
        .then((querysnap) => {
          if (!querysnap.empty && this.donationItem.surgicalMasks) {
            let docId = querysnap.docs.map(doc=>doc.id)[0];
            let data = querysnap.docs.map(doc=>doc.data())[0];
            itemNeedsRef.doc(docId).update({
              received: firebase.firestore.FieldValue.increment(this.donationItem.surgicalMasks),
              progress: ((data.received + this.donationItem.surgicalMasks) / data.needed).toFixed(2)})
          }
        });

        itemNeedsRef
        .where("medicalCenter", "==", this.userInfo.email)
        .where("item", "==", "ventilators")
        .get()
        .then((querysnap) => {
          if (!querysnap.empty && this.donationItem.ventilators) {
            let docId = querysnap.docs.map(doc=>doc.id)[0];
            let data = querysnap.docs.map(doc=>doc.data())[0];
            itemNeedsRef.doc(docId).update({
              received: firebase.firestore.FieldValue.increment(this.donationItem.ventilators),
              progress: ((data.received + this.donationItem.ventilators) / data.needed).toFixed(2)})
          }
        });

        itemNeedsRef
        .where("medicalCenter", "==", this.userInfo.email)
        .where("item", "==", "gloves")
        .get()
        .then((querysnap) => {
          if (!querysnap.empty && this.donationItem.medicalGloves) {
            let docId = querysnap.docs.map(doc=>doc.id)[0];
            let data = querysnap.docs.map(doc=>doc.data())[0];
            itemNeedsRef.doc(docId).update({
              received: firebase.firestore.FieldValue.increment(this.donationItem.medicalGloves),
              progress: ((data.received + this.donationItem.medicalGloves) / data.needed).toFixed(2)})
          }
        });

        itemNeedsRef
        .where("medicalCenter", "==", this.userInfo.email)
        .where("item", "==", "gowns")
        .get()
        .then((querysnap) => {
          if (!querysnap.empty && this.donationItem.isolationGowns) {
            let docId = querysnap.docs.map(doc=>doc.id)[0];
            let data = querysnap.docs.map(doc=>doc.data())[0];
            itemNeedsRef.doc(docId).update({
              received: firebase.firestore.FieldValue.increment(this.donationItem.isolationGowns),
              progress: ((data.received + this.donationItem.isolationGowns) / data.needed).toFixed(2)})
          }
        });

        itemNeedsRef
        .where("medicalCenter", "==", this.userInfo.email)
        .where("item", "==", "goggles")
        .get()
        .then((querysnap) => {
          if (!querysnap.empty && this.donationItem.goggles) {
            let docId = querysnap.docs.map(doc=>doc.id)[0];
            let data = querysnap.docs.map(doc=>doc.data())[0];
            itemNeedsRef.doc(docId).update({
              received: firebase.firestore.FieldValue.increment(this.donationItem.goggles),
              progress: ((data.received + this.donationItem.goggles) / data.needed).toFixed(2)})
          }
        });

        itemNeedsRef
        .where("medicalCenter", "==", this.userInfo.email)
        .where("item", "==", "shields")
        .get()
        .then((querysnap) => {
          if (!querysnap.empty && this.donationItem.medicalShield) {
            let docId = querysnap.docs.map(doc=>doc.id)[0];
            let data = querysnap.docs.map(doc=>doc.data())[0];
            itemNeedsRef.doc(docId).update({
              received: firebase.firestore.FieldValue.increment(this.donationItem.medicalShield),
              progress: ((data.received + this.donationItem.medicalShield) / data.needed).toFixed(2)})
          }
        });

      this.donateItem();

    },



    donateItem() {
      // start of saving ONE donation
      if (this.donationItem.ventilators) {
        itemNeedsRef
          .where("medicalCenter", "==", this.userInfo.email)
          .where("item", "==", "ventilators") // change this based on the item
          .get()
          .then((querySnap) => {
            if (!querySnap.empty) {
              donationsRef.add({
                displayName: "ventilators", // refer to line 14
                medicalName: this.medName,
                donatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                donee: this.userInfo.email,
                donor: this.userInfo.userEmail,
                item: "ventilators", // refer to line 15
                quantity: this.donationItem.ventilators, // change this based on the item
                userName: this.userInfo.userName
              });
            }
          });
      }


      if (this.donationItem.medicalGloves) {
        itemNeedsRef
          .where("medicalCenter", "==", this.userInfo.email)
          .where("item", "==", "gloves") // change this based on the item
          .get()
          .then((querySnap) => {
            if (!querySnap.empty) {
              donationsRef.add({
                displayName: "medical gloves", // refer to line 14
                medicalName: this.medName,
                donatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                donee: this.userInfo.email,
                donor: this.userInfo.userEmail,
                item: "gloves", // refer to line 15
                quantity: this.donationItem.medicalGloves, // change this based on the item
                userName: this.userInfo.userName
              });
            }
          });
      }

      if (this.donationItem.isolationGowns) {
        itemNeedsRef
          .where("medicalCenter", "==", this.userInfo.email)
          .where("item", "==", "gowns") // change this based on the item
          .get()
          .then((querySnap) => {
            if (!querySnap.empty) {
              donationsRef.add({
                displayName: "medical gowns", // refer to line 14
                medicalName: this.medName,
                donatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                donee: this.userInfo.email,
                donor: this.userInfo.userEmail,
                item: "gowns", // refer to line 15
                quantity: this.donationItem.isolationGowns, // change this based on the item
                userName: this.userInfo.userName
              });
            }
          });
      }

      if (this.donationItem.goggles) {
        itemNeedsRef
          .where("medicalCenter", "==", this.userInfo.email)
          .where("item", "==", "goggles") // change this based on the item
          .get()
          .then((querySnap) => {
            if (!querySnap.empty) {
              donationsRef.add({
                displayName: "goggles", // refer to line 14
                medicalName: this.medName,
                donatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                donee: this.userInfo.email,
                donor: this.userInfo.userEmail,
                item: "goggles", // refer to line 15
                quantity: this.donationItem.goggles, // change this based on the item
                userName: this.userInfo.userName
              });
            }
          });
      }

      if (this.donationItem.medicalShield) {
        itemNeedsRef
          .where("medicalCenter", "==", this.userInfo.email)
          .where("item", "==", "shields") // change this based on the item
          .get()
          .then((querySnap) => {
            if (!querySnap.empty) {
              donationsRef.add({
                displayName: "medical face shields", // refer to line 14
                medicalName: this.medName,
                donatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                donee: this.userInfo.email,
                donor: this.userInfo.userEmail,
                item: "shields", // refer to line 15
                quantity: this.donationItem.medicalShield, // change this based on the item
                userName: this.userInfo.userName
              });
            }
          });
      };
      setTimeout(function() {
        window.location = "./confirmation_user.html"
      }, 6000)
      // window.location = "./confirmation_user.html"
      // end of saving ONE donation
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userInfo.user = user;
        this.userInfo.userEmail = user.email;
        this.userInfo.userName = user.displayName;
        document.getElementById("notLoggedIn").style.display = "none";
        usersRef
          .where("id", "==", medicalId)
          .get()
          .then((querySnap) => {
            this.medName = querySnap.docs.map((doc) => doc.data().name)[0];
            this.userInfo.email = querySnap.docs.map((doc) => doc.data().email)[0]
          });
      } else {
        document.getElementById("loggedIn").style.display = "none";
      }
    })
  }
});
