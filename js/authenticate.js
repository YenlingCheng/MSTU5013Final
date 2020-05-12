var user = firebase.auth().currentUser;
 if (user) {
   var id = user.uid;
   var email = user.email;
 }
 else{
   console.log(error);
   alert("Please Sign Up")
   window.location="./signIn.html";
 }
