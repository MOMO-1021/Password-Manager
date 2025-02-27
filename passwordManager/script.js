// Logic to mask password:
const maskPassword = function(password){
    let str = '';
    for(let i=0;i<password.length;i++){
        str += '*';
    }
    return str;
}
// Logic to copy :
const copyText = function(txt){
    navigator.clipboard.writeText(txt).then(
        () => {
          /* clipboard successfully set */
          document.getElementById("alert").style.display = "inline"
          setTimeout(() => {
            document.getElementById("alert").style.display = "none"
          }, 1000);

        },
        () => {
          /* clipboard write failed */
          alert("Clipboard copying failed")
        },
      );
}
// Logic to delete credentials:
const deleteCredential = (website)=>{
    let data = localStorage.getItem("credentials");
    let arr = JSON.parse(data);
    const arrUpdate = arr.filter((e)=>{
        return e.website != website;
    })
    localStorage.setItem("credentials",JSON.stringify(arrUpdate));
    alert(`Successfully deleted ${website}'s credentials`);
    showPasswords();
} 
// Logic to fill the Password Table:
const showPasswords = ()=> {
let tb = document.querySelector('table');
const data = localStorage.getItem("credentials");
let str = '';
if(data === null || JSON.parse(data).length === 0){
    tb.innerHTML = "No credentials data found!";
}else{
    const arrData = JSON.parse(data);
    tb.innerHTML = `
        <tr class="heading">
          <td>Website</td>
          <td>Username</td>
          <td>Password</td>
          <td>Delete</td>
        </tr>
    `; // This will reset the tb.innerHTML making sure that the same datas don't repeat!
    for(let i=0;i<arrData.length;i++){ 
        // let element = arrData[i];
        // Make sure to use "str = ` and not str += `" to make sure that the str also gets
        // reseted just as intended like the case for tb.innerHTML
        str = `  
        <tr>
              <td>${arrData[i].website} <img class="copyImage" src="copy.svg" onClick="copyText('${arrData[i].website}')"/></td>
              <td>${arrData[i].username} <img class="copyImage" src="copy.svg" onClick="copyText('${arrData[i].username}')"/></td>
              <td>${maskPassword(arrData[i].password)} <img class="copyImage" src="copy.svg" onClick="copyText('${arrData[i].password}')"/></td>
              <td><button class="btnSm" onClick = "deleteCredential('${arrData[i].website}')">Delete</button></td>
        </tr> `
        // An overlay is a semi-transparent element that we can place over elements 
        // (often images) for artistic flair and/or to enhance readability.
        tb.innerHTML += str;
        // A string Variable in JavaScript can also store HTML markup Elements!
    }
    website.value = "";   // For this, the JavaScript Engine will check for input tags
    // having id as "website" and if so, it will change the website's value to empty string!
    username.value = "";
    password.value = "";
}
}
showPasswords();
document.querySelector('.submit').addEventListener('click', (e)=> {
    e.preventDefault(); // This prevents the form to be submitted when it is clicked.
    // This is useful when you are not yet finished making it but still testing it.
    console.log('Button Clicked!');
    console.log(username.value,password.value);  // JavaScript allows you to print the 
    // input values by using their id, and so, we don't need to use 'document.querySelector()'
    // and we don't need to assign class to the input elements.

    // local storage(web storage feature) in JavaScript allows web applications to 
    // store data as key-value pairs in a web browser, persisting even after the browser 
    // is closed and reopened. 
    
    let credentials = localStorage.getItem("credentials");
    console.log(credentials);
    if(credentials === null){
        const json = [];
        json.push({website: website.value,username: username.value,password: password.value});
        alert("Password is Saved!");
        localStorage.setItem("credentials",JSON.stringify(json));
        // Note that the json array is stored in JSON array format.
    }else{
        // const json = localStorage.getItem("credentials");   This will return credentials 
        // value in JSON format which you don't want because you want to be able to use push.
        const json = JSON.parse(localStorage.getItem("credentials"));
        // Getting the JSON array format and parsing it to the normal JavaScript array format.
        json.push({website: website.value,username: username.value,password: password.value});
        alert("Password is Saved!");
        localStorage.setItem("credentials",JSON.stringify(json));
    }
    showPasswords();
})
// Logic for overlay text "copy":
const overlay = document.querySelector('.overlay');
const images = document.querySelectorAll('.copyImage').forEach((image) =>{
    image.addEventListener('mouseenter', ()=>{
        overlay.style.opacity = "1";
    })
    image.addEventListener('mouseleave', ()=>{
        overlay.style.opacity = "0";
    })
});
