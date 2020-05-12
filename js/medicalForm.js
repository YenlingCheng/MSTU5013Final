let db = firebase.firestore();
// let medCentersRef = db.collection("medicalCenters");
let itemNeedsRef = db.collection("itemNeeds");
let usersRef = db.collection("users");

// var email = "contact@cuimc.com";
// var userEmail = user.email;

// var user = firebase.auth().currentUser;
//
// if (user) {
//   var id = user.uid;
//   var email = user.email;
// } else {
//   // console.log(error);
//   alert("Please Sign Up")
//   window.location = "./signIn.html";
// }


let app = new Vue({
  el: "#medicalForm",
  data: {
    name:"",
    email:"",
    phone:"",
    uid: '',
    address: {
      street: " ",
      city: " ",
      state: " ",
      zipcode: " ",
      country: ''
    },
    itemNeeds: {
      surgicalMasks: 0,
      ventilators: 0,
      medicalGloves: 0,
      isolationGowns: 0,
      goggles: 0,
      medicalShield: 0,
      needed: 0
    }
  },
  methods: {
    submitForm() {
      if (!this.phone || !this.address.street || !this.address.city || !this.address.state || !this.address.zipcode || !this.address.country) {
        alert ('You phone or address cannot be blank!');
        return
      }
      // var medicalID;
      usersRef.doc(this.uid).update({
        phone: this.phone,
        address: {
          street: this.address.street,
          city: this.address.city,
          state: this.address.state,
          zipcode: this.address.zipcode,
          country: this.address.country
        }
      })

      if (this.itemNeeds.surgicalMasks) {
        // console.log('hey');
        itemNeedsRef
        .where("medicalCenter", "==", this.email)
        .where("item", "==", "masks")
        .get()
        .then((querySnap) => {
          if (!querySnap.empty) {
            let docId = querySnap.docs.map(doc=>doc.id)[0];
            itemNeedsRef.doc(docId).update({
              needed: firebase.firestore.FieldValue.increment(this.itemNeeds.surgicalMasks)
            })
          } else {
              itemNeedsRef.add({
              displayName: "medical masks",
              item: "masks",
              medicalCenter: this.email,
              needed: this.itemNeeds.surgicalMasks,
              progress: 0,
              received: 0
              })
            }
        })
      };

      if (this.itemNeeds.ventilators) {
        // console.log('hey');
        itemNeedsRef
        .where("medicalCenter", "==", this.email)
        .where("item", "==", "ventilators")
        .get()
        .then((querySnap) => {
          if (!querySnap.empty) {
            let docId = querySnap.docs.map(doc=>doc.id)[0];
            itemNeedsRef.doc(docId).update({
              needed: firebase.firestore.FieldValue.increment(this.itemNeeds.ventilators)
            })
          } else {
              itemNeedsRef.add({
              displayName: "ventilators",
              item: "ventilators",
              medicalCenter: this.email,
              needed: this.itemNeeds.ventilators,
              progress: 0,
              received: 0
              })
            }
        })
      };

      if (this.itemNeeds.medicalGloves) {
        // console.log('hey');
        itemNeedsRef
        .where("medicalCenter", "==", this.email)
        .where("item", "==", "gloves")
        .get()
        .then((querySnap) => {
          if (!querySnap.empty) {
            let docId = querySnap.docs.map(doc=>doc.id)[0];
            itemNeedsRef.doc(docId).update({
              needed: firebase.firestore.FieldValue.increment(this.itemNeeds.medicalGloves)
            })
          } else {
              itemNeedsRef.add({
              displayName: "medical gloves",
              item: "gloves",
              medicalCenter: this.email,
              needed: this.itemNeeds.medicalGloves,
              progress: 0,
              received: 0
              })
            }
        })
      };

      if (this.itemNeeds.isolationGowns) {
        // console.log('1');
        itemNeedsRef
        .where("medicalCenter", "==", this.email)
        .where("item", "==", "gowns")
        .get()
        .then((querySnap) => {
          // console.log('2', querySnap, querySnap.docs.map(doc=>doc.id)[0]);
          if (!querySnap.empty) {
            let docId = querySnap.docs.map(doc=>doc.id)[0];
            itemNeedsRef.doc(docId).update({
              needed: firebase.firestore.FieldValue.increment(this.itemNeeds.isolationGowns)
            })
          } else {
              itemNeedsRef.add({
              displayName: "medical gowns",
              item: "gowns",
              medicalCenter: this.email,
              needed: this.itemNeeds.isolationGowns,
              progress: 0,
              received: 0
              })
            }
        })
      };

      if (this.itemNeeds.goggles) {
        // console.log('hey');
        itemNeedsRef
        .where("medicalCenter", "==", this.email)
        .where("item", "==", "goggles")
        .get()
        .then((querySnap) => {
          if (!querySnap.empty) {
            let docId = querySnap.docs.map(doc=>doc.id)[0];
            itemNeedsRef.doc(docId).update({
              needed: firebase.firestore.FieldValue.increment(this.itemNeeds.goggles)
            })
          } else {
              itemNeedsRef.add({
              displayName: "goggles",
              item: "goggles",
              medicalCenter: this.email,
              needed: this.itemNeeds.goggles,
              progress: 0,
              received: 0
              })
            }
        })
      };

      if (this.itemNeeds.medicalShield) {
        // console.log('hey');
        itemNeedsRef
        .where("medicalCenter", "==", this.email)
        .where("item", "==", "shields")
        .get()
        .then((querySnap) => {
          if (!querySnap.empty) {
            let docId = querySnap.docs.map(doc=>doc.id)[0];
            itemNeedsRef.doc(docId).update({
              needed: firebase.firestore.FieldValue.increment(this.itemNeeds.medicalShield)
            })
          } else {
              itemNeedsRef.add({
              displayName: "medical face shields",
              item: "shields",
              medicalCenter: this.email,
              needed: this.itemNeeds.medicalShield,
              progress: 0,
              received: 0
              })
            }
        })
      };
      setTimeout(function() {
        window.location = "./confirmation_medical.html"
      }, 6000)
     

  }
},
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user;
          this.name = user.displayName;
          this.email = user.email;
          this.uid = user.uid;
          // this.phone.number = user.phoneNumber;
          document.getElementById("notLoggedIn").style.display = "none";
        } else {
          // No user is signed in.
          document.getElementById("loggedIn").style.display = "none";
        }
      })

    }


})

