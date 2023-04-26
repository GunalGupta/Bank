function sendprofile(){
    window.location.href = 'profile.html';
}

function editemail() {
    let email = prompt("Please enter your name");
    document.getElementById("email").innerHTML = email;
}

function confirmemail() {
    let confirmEdit = confirm("Are you sure you want to edit your email");
    if (confirmEdit) {
        editemail();
    }
}
document.querySelector('#edit2').addEventListener('click', confirmemail);

function editAddress() {
    let address = prompt("Please enter your new address");
    document.getElementById("address").innerHTML = address;
}

function confirmEditAddress() {
    let confirmEdit = confirm("Are you sure you want to edit the address?");
    if (confirmEdit) {
        editAddress();
    }
}
document.querySelector('#edit3').addEventListener('click', confirmEditAddress);

function editjob() {
    let job = prompt("Please enter your new designation");
    document.getElementById("job").innerHTML = job;
}

function confirmjob() {
    let confirmEdit = confirm("Are you sure you want to edit the your job details?");
    if (confirmEdit) {
        editjob();
    }
}
document.querySelector('#edit4').addEventListener('click', confirmjob);
