function clickEvent(first, last) {
    if (first.value.length) {
        document.getElementById(last).focus();
    }
}

function myFunction() {
    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}
let remail = localStorage.getItem("email");
console.log(remail);
function otpfun(){
    let v1=document.getElementById("ist").value;
    let v2=document.getElementById("sec").value;
    let v3=document.getElementById("third").value;
    let v4=document.getElementById("fourth").value;
    let otp = `${v1}${v2}${v3}${v4}`;
    const email = remail;
    // console.log(value);
    fetch("http://localhost:4500/user/verify",{
            method:"POST",
            body:JSON.stringify({email,otp}),
            headers:{ "Content-Type": "application/json" },
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data);
            console.log(data.otp==otp);
            if(data.otp==otp){
                myFunction()
                window.location="./login.html";
            }
            else{
                alert("wrong credentials");
            }
        })
}