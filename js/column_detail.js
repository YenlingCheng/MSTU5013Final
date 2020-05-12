const db = firebase.firestore();
const itemsRef = db.collection('itemNeeds');
const donationsRef = db.collection('donations');
const usersRef = db.collection('users');

// getting parameter from url
let {search} = new URL(location.href);
let getParam = search => {return search.slice(4)}
// setting grabbed param to medical id
let selectedMedical = getParam(search);

Vue.component('item', {
  props: ['item'],
  template: `<div class="progressCtn">
  <div class="text">
    <div class="col-md-6 itemName" style="padding-left: 0">{{item.displayName}}</div>
    <div class="col-md-6 itemTarget" style="padding-right: 0">Target: {{item.needed}}<br>Progress: {{item.progress*100}}%</div>
  </div>
  <div class="row"></div> 
  <div class="bar">
    <div class="barPercent" :style="{width: item.progress*100 + '%'}"></div>  
  </div>
  </div>`
});

let app = new Vue({
  el: '.detail',
  data: {
    selectedMedical: '',
    itemNeeds: [],
    totalDonors: 0,
    medicalInfo: null,
    user: null
  },
  computed: {
    // donate button's href
    btnHref() {
      if (this.user) {
        return `./user_form.html?id=${selectedMedical}`
      } else {
        return `./signin.html`
      }
    }
  },
  methods: {
    // fetch all medical needs
    getMedicalNeeds() {
      itemsRef.where('medicalCenter', '==', this.selectedMedical).get().then(querySnap => {
        // console.log(querySnap);
        this.itemNeeds = querySnap.docs.map(doc => doc.data());
      })
    },
    getDonationsInfo() {
      donationsRef.where('donee', '==', this.selectedMedical).get().then(querySnap => {
        let donationList = [];
        let allDons = querySnap.docs.map(doc => doc.data());
        for (don of allDons) {
          if (donationList.filter(donation => donation.donor == don.donor).length == 0) {
            donationList.push(don)
          }
        };
        this.totalDonors = donationList.length
      })
    }
  },
  mounted() {
    // fetch medical center info
    usersRef.where('id', '==', selectedMedical).get().then(querySnap => {
      console.log(selectedMedical);
      this.medicalInfo = querySnap.docs.map(doc => doc.data())[0];
      // console.log(this.medicalInfo);
      this.selectedMedical = this.medicalInfo.email;
      this.getMedicalNeeds();
      this.getDonationsInfo();
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user
        }
      })
    });
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



