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
          const name = document.getElementById("fullName").value;
          const email = document.getElementById("email").value;
          const pass = document.getElementById("pass").value;
          
  
          fetch("http://localhost:4500/user/register",{
              method:"POST",
              body:JSON.stringify({name,email,pass}),
              headers:{ "Content-Type": "application/json" },
          })
          .then((res)=> res.json())
          .then((data)=>{
              if(data){
                  console.log(data);  
                  localStorage.setItem("email",data.email); 
                  myFunction();
                  window.location="./otp.html";
              }
              else{
                  alert("wrong credentials");
              }
              
          })
      })