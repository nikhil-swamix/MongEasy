import mongoose from "mongoose";
import {
    schema
} from "./index.js";


let testschema = schema([

    "name|String|!|*|#|(3,16)",
    "price|Number|*",
    "madeIn=India|ref:CountryNames",
    "dateOfPurchase|Date",
    "color|String|*|['red', 'green', 'blue']",
])

let countries = schema([
    "name|String|!|*|#|(1,99)",
])

console.log(testschema);


// -------------------------------------
// insert into CountryNames (name) values ('India');
// connect mongoose and insert sample data using testschema

mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function main() {
    let CountryNames = mongoose.model("Country", countries);

    let india = new CountryNames({ name: "Amrecia", });
    let r1 = await india.save();
    console.log(r1);

    let Test = mongoose.model("Computer", testschema);

    let test = new Test({
        name: "HP Omen 15",
        price: 1000,
        madeIn: r1._id,
        dateOfPurchase: new Date(),
        color: "red",
    });
    let r2 = await test.save();
    console.log(r2);
}

main();
