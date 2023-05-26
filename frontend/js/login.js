function myFunction() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
}

const login = document.getElementById("signup");
    login.addEventListener("submit",(e)=>{
        e.preventDefault();
        const email = document.getElementById("email").value;
        const pass = document.getElementById("pass").value;

        fetch("http://localhost:4500/user/login",{
            method:"POST",
            body:JSON.stringify({email,pass}),
            headers:{ "Content-Type": "application/json" },
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data);
            if(data){
                if(data.msg=="error"){
                  alert("Please signup first");
                }
                else{
                  localStorage.setItem("login",data.token);
                  localStorage.setItem("name",data.name);
                  localStorage.setItem("userid",data.userID);
                  myFunction();
                  // alert("Login Succesfully");
                  window.location="../html/channel.html";
                }
                // console.log(data.msg);
                
            }
            else{
                alert("wrong credentials");
            }
        })
    })
 