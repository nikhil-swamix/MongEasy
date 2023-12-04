<img src="https://drive.google.com/uc?id=13IcaxfOi7T2mnfxH01_2BHn-7ZFG7NQO" alt="image">

<!-- test comment -->

## Stable version released!

Mongeasy aims to streamline the management of models and schemas in your projects by utilizing a simple syntax. This is achieved by employing CSS (Carnage Schema Syntax), which is
a flag-based declaration and modification language designed by [Nikhil Swami](https://www.linkedin.com/in/nikhilswamiofficial/) also visit swamix.com . CSS is just a shortcut way of
writing mongoose schemas, which is a superset of mongoose. It is not a new library, it is just a new way of writing mongoose schemas, which is more readable, clean and easy to
maintain. It is not a replacement for mongoose, rather an extension. if you know how `ls -la` works in linux, you know this package half already!

### Why Should I Use It?

-   easy to use, mongeasy!
-   light weight less than 100 kb.
-   lesser boilerplate and redeclarations.
-   66% shorter code!
-   reverse compatibility, fallback to mongoose anytime, without breaking anything.

## Install

```bash
npm i mongeasy
pnpm i mongeasy
yarn i mongeasy
bun i mongeasy
```

## Example

```javascript
import mongoose from 'mongoose';
import { models } from 'mongeasy';

let Models = models({
    Computer: [
        'name           |String |!|*|#|(3,16)', // ! = unique, * = required, # = index, (3,16) = minlength,maxlength
        'price          |Number |+U|+R|+I', // same as above, +U = unique, +R = required, +I = index
        'madeIn         |ObjectId|ref:CountryNames', // ref:CountryNames = reference to another model
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

console.log(Models);

// Connect to database , connection is same
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// add a computer as usual
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
```



### **Format:** `<Name>` | `<Type>` | `<Modifiers>`

**Name:**

-   the name of field - emojis also supported

**Type :**

all supported, as we directly pass to Core Library https://mongoosejs.com/docs/schematypes.html

-   [ Array, Boolean, BigInt, Buffer, Date, Decimal, Decimal128, DocumentArray, Map, Mixed, Number, ObjectId, String, Subdocument, UUID, Oid, Object, Bool, ObjectID ]

**Modifiers:**

The syntax consists of the following elements: Note: "/" means "either option" refer https://mongoosejs.com/docs/schematypes.html#indexes

-   +U / ! = unique
-   +R / \* = required
-   +I / # = index
-   (0, 999) = min,max
-   ['adam', 'eve'] = enum



This CSS-based declaration paradigm aims to provide a simplified way of defining Mongoose schemas, making it easier to work with MongoDB data models.
