const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html");
})

mailchimp.setConfig({
     apiKey: "7323223c060ca724f774083a056f90e5-us21",
     server: "us21"
    });

app.post("/",function(req,res){

    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var email = req.body.email;

    console.log(firstname+" "+ lastname+" "+ email);

   const listId = "9693393969";
   const subscribingUser = {
    FirstName: firstname,
    LastName: lastname,
    email: email
    };

    async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
        FNAME: subscribingUser.FirstName,
        LNAME: subscribingUser.LastName
        }
    });
    res.sendFile(__dirname + "/success.html");
  console.log(
    `Successfully added contact as an audience member. The contact's id is ${
      response.id
    }.`
  );
}
// run();
run().catch(e => res.sendFile(__dirname + "/failure.html"));
    
    var data = JSON.stringify(subscribingUser);
    console.log(data);
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("server starts at 3000");
})


// 7323223c060ca724f774083a056f90e5-us21

// 9693393969

