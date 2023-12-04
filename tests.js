import mongoose from 'mongoose';
import { models, schema } from './index.js';

let Models = models({
    Computer: [
        'name           |String |!|*|#|(3,16)', // ! = unique, * = required, # = index, (3,16) = minlength,maxlength
        'price          |Number |+U|+R|+I', // same as above, +U = unique, +R = required, +I = index
        'madeIn=India   |String |', // ref:CountryNames = reference to another model
        'dateOfPurchase |Date   |*', // Date = Date , * = required
        "color          |String |['red','blue','green']", // ['red','blue','green'] = enum
        'inStock        |Boolean|',
        'storageTemp    |Number |(-10,60)', // (0,) = min no upper limit
        'globalStockQty |Number |(0,)', // (0,) = min, no upper limit // (,100) = no lower limit
    ],
    Employee: [
        'name|String|!|*|#|(3,16)',
        'salary|Number|+R',
        'dateOfJoining|Date|*',
        'designation|String|*',
        'gender|String|["male","female"]',
        'isMarried|Boolean|*',
        'address|String|*',
        'phone|String|*',
    ],
});

// console.log(Models);

let testschema = schema(['name|String|!|*|#|(3,16)', 'price|Number|*', 'madeIn=India|ref:CountryNames', 'dateOfPurchase|Date', "color|String|*|['red', 'green', 'blue']"]);

let countries = schema(['name|String|!|*|#|(1,99)']);

console.log(testschema);

// -------------------------------------
// insert into CountryNames (name) values ('India');
// connect mongoose and insert sample data using testschema

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// add a computer direct
let c = new Models.Computer({
    name: 'Macbook Pro 2',
    price: 2000 + Math.random() * 1000,
    madeIn: 'India',
    dateOfPurchase: new Date(),
    color: 'red',
    inStock: true,
    storageTemp: 50,
    globalStockQty: 100,
});

c.save();

// exit
setTimeout(() => {
    mongoose.disconnect();
}, 100);
