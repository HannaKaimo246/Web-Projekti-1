function sendEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "hanna.kaimo2019@gmail.com",
    Password:"Joulu1990!",
    To: "hanna.kaimo@yahoo.com",
    From: "hanna.kaimo2019@gmail.com",
    Subject: "Sending Email using javascript",
    Body: "Well that was easy!!"
  })
  .then(function (message) {
    alert("mail sent successfully")
  });
  console.log("Sended!")
}