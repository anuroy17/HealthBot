const mongoose = require("mongoose");

const DB = "mongodb+srv://deiva_0304:deivanai@cluster0.qbw5fuo.mongodb.net/healthbot?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("Database Connected")).catch((errr)=>{
    console.log(errr);
})