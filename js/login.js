const email = document.getElementById("email");
const contraseña = document.getElementById("contraseña");
const button = document.getElementById("button")

button.addEventListener("click", function () {
    validacion();
});

function myFunction() {
    localStorage.setItem("email", email.value);
    location.href = "principal.html";
}

function validacion() {
    if (email.value !== "" && contraseña.value !== "") {
        myFunction();
    } else {
        if (email.value == "") {
            document.getElementById("error_mail").innerHTML = "x Se requiere una dirección de correo x";
        } else {
            document.getElementById("error_mail").innerHTML = "";
        }
        if (contraseña.value == "") {
            document.getElementById("error_contraseña").innerHTML = "x Se requiere una contraseña x";
        } else {
            document.getElementById("error_contraseña").innerHTML = ""
        }
    }


}

