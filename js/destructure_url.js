// getting parameter from url
let {search} = new URL(location.href);
let getParam = search => {return search.slice(4)}
// setting grabbed param to medical id
let selectedMedical = getParam(search); // change variable name to selectedUser if passed in id is user's