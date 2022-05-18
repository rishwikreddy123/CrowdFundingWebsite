const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rishwik:reddy@cluster0.qcp9q.mongodb.net/myFirstDatabase", {

}).then(() =>{
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`no connection`);
});