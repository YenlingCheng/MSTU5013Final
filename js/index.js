const db = firebase.firestore();
const itemsRef = db.collection('itemNeeds');
const usersRef = db.collection('users');
const imgsRef = db.collection('itemImgs');

Vue.component('item', {
  props: ['item', 'srcs', 'user'],
  data() {
    return {
      medicalName: '',
      medicalLocation: '',
      medicalId: ''
    }
  },
  // update img src after database is updated
  template: `<div class="col-md-4 col-sm-6 col-xs-6 columnCtn">
  <div class="column">
    <div class="imgCtn">
      <a :href="getHref">
        <img :src="getSrc" alt="">   
      </a>
    </div>
    <div class="textCtn">
      <div class="columnInfo col-md-7">
        <div class="colResource">{{item.displayName}}</div>
        <div class="hospital"><a :href="getHref">{{medicalName}}
        </a><br>{{medicalLocation}}</div>
        <div></div>
      </div>
      <div class="columnDonate col-md-5">
        <div class="raise">Raised <br>{{item.progress*100}}%</div>
        <a :href="donateHref"><button>Donate</button></a>
      </div>
    </div>
  </div>
</div>`,
computed: {
  getSrc() {
    for(img of this.srcs) {
      if (img.item == this.item.item) {
        return img.src
      }
    }
  },
  // routing
  getHref() {
      return `./column_detail.html?id=${this.medicalId}`
  },
  donateHref() {
    if (this.user) {
      return `./user_form.html?id=${this.medicalId}`
    } else {
      return `./signin.html`
    }
  }
},
methods: {
  // fetch medical center names and locations through emails
  getMedicalInfo(email) {
    usersRef.where('email', '==', email).get().then(querySnap => {
      let data = querySnap.docs.map(doc => doc.data())[0]
      this.medicalName = data.name;
      this.medicalLocation = data.address.state + ', ' + data.address.country;
      this.medicalId = data.id
    }
    )
  }
},
mounted() {
  // fetch medical center infos after loading components
  this.getMedicalInfo(this.item.medicalCenter);
}
});

let app = new Vue({
  el: '.Container',
  data: {
    itemList: [],
    searchInput: '',
    alphabets: 'abcdefghijklmnopqrstuvwxyz',
    imgSrcs: [],
    user: null,
    isMed: null
  },
  computed: {
    donateHref() {
      if (this.isMed) {
        return `./index.html`
      } else if (!this.isMed && this.user){
        return `./index.html`
      } else {
        return `./signin.html`
      }
    },
    proposeHref() {
      if (this.isMed) {
        return `./medical_form.html`
      } else if (!this.isMed && this.user){
        return `./index.html`
      } else {
        return `./signin.html`
      }
    }
  },
  methods: {
    // default order
    getDefault() {
      itemsRef.orderBy('item').get().then(querySnap => {
        this.itemList = querySnap.docs.map(doc => doc.data());
        })
      },
      // search engine
      // 暫時決定先搜名稱（非display name）
      searchItem() {
        let str = this.getRange(this.searchInput.toLowerCase());
        console.log(str);
        itemsRef.where('item', '>=', this.searchInput.toLowerCase())
        .where('item', '<', str)
        .get()
        .then(querySnap => {
          this.itemList = querySnap.docs.map(doc => {console.log(doc.data()); return doc.data()})
        })
      },
      // get new string with the last letter changed to the next alphabet
      getRange(str) {
        let newStr = [str.substring(0, str.length-1)];
        let idx = this.alphabets.indexOf(str[str.length-1]);
        if (idx == 25) {
          newStr.push(this.alphabets[0])
        } else {
          newStr.push(this.alphabets[idx+1])
        };
        return newStr.join('')
      },
      // dropdown filters
      filter(x) {
        if (x == 'needed') {
          itemsRef.orderBy(x, 'desc').get().then(querySnap => {
            this.itemList = querySnap.docs.map(doc => doc.data())
          })
        } else if (x == 'progress') {
          itemsRef.orderBy(x).get().then(querySnap => {
            this.itemList = querySnap.docs.map(doc => doc.data())
          })
        }
      },
      // get img sources
      getImgSrcs() {
        imgsRef.get().then(querySnap => {
          this.imgSrcs = querySnap.docs.map(doc => doc.data())
        })
      }
  },
  // default home page
  mounted() {
    this.getDefault();
    this.getImgSrcs();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        usersRef.doc(user.uid).get().then(doc=>{
          console.log(doc.data().isMed)
          this.isMed = doc.data().isMed;
        })
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
      // alert("You are not signed in");
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



