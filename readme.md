![1696442311361](image/readme/1696442311361.png)

<!-- test comment -->

Mongeasy aims to simplify the process of creating and managing schemas/models in your MEAN/MERN/M(WHATEVER) project using a straightforward syntax for defining the schema structure. It employs a flag-based declaration and modification language known as CSS (Carnage Schema Syntax). dont worry its only 6 symbols, and you already know 3 of them.


### why use it?
- easy to use, zero entry barrier hence mongeasy
- unlike mongoose no need to import schema, model, then export it to use in other files, just declare and forget. mongeasy handles all that for you.
- 66% shorter code! 3 lines of code in mongeasy = 9 lines of code in mongoose, which eliminates the need to keep a seperate folder `models`. makes code more readable, clean and easy to maintain.
- reverse compatibility, if your crazy use case is not supported by mongeasy, you can still use mongoose syntax, as mongeasy is superset of mongoose.



hello im Nikhil Swami, Freelance SWE, my aim is to become TechnoBro. check out my website swamix.com. available for hire. i have been using mongoose for 3 years, and i love it. but i always felt that mongoose syntax is too verbose, and i have to write same code again and again. so i created mongeasy, which is 66% shorter than mongoose.

# Install
```bash
npm i mongeasy
pnpm i mongeasy
yarn i mongeasy
bun i mongeasy 
#NOTE: bun is 10x faster than npm & 2x faster than pnpm, give it a try
```

# Example:

```javascript
import {models} from mongeasy;
let Models = models({
	Computer : [
		"name|String|!|*|#|(3,16)", // ! = unique, * = required, # = index, (3,16) = minlength,maxlength
		"price|Number|+U|+R|+I", // same as above, +U = unique, +R = required, +I = index
		"madeIn=India|String|ref:CountryNames", // ref:CountryNames = reference to another model
		"dateOfPurchase|Date|*" // Date = Date , * = required
		"color|String|['red','blue','green']" // ['red','blue','green'] = enum
		"inStock|Boolean|!|#", // ! = unique, # = index
		"storageTemperature|Number|(-10,60)", // (0,) = min no upper limit
		"globalStockQty|Number|(0,)", // (0,) = min, no upper limit // (,100) = no lower limit
		]
	})
```

# Output

will give you a reference to model "Computer", ie a schema.tree output as follows.

```javascript
tree: {
    name: { type: [Function], required: true, index: true, unique: true },
    price: { type: [Function], required: true },
    madeIn: { type: [Function], default: 'India' },
    dateOfPurchase: { type: [Function] },
    color: { type: [Function], required: true, enum: [Array] },
    _id: { auto: true, type: 'ObjectId' }
}
```

```json
{
  "_id": {
    "$oid": "651cc942ce8673d0245358b7"
  },
  "name": "HP Omen 15",
  "price": 1000,
  "madeIn": "651cc941ce8673d0245358b3",
  "dateOfPurchase": {
    "$date": "2023-10-04T02:09:06.071Z"
  },
  "color": "red",
  "__v": 0
}
```

### **Format:** `<Name>` | `<Type>` | *`<Modifiers>`

**Name:**

* the name of field, 😀🥱😴 - emojis also supported

**Type :**

all supported, as we directly pass to Core Library

* [ Array, Boolean, BigInt, Buffer, Date, Decimal, Decimal128, DocumentArray, Map, Mixed, Number, ObjectId, String, Subdocument, UUID, Oid, Object, Bool, ObjectID ]

**Modifiers:**

The syntax consists of the following elements:
Note: "/" means "either option"

* +U / ! = unique
* +R / * = required
* +I / # = index
* (0, 999) = min,max
* ['adam', 'eve'] = enum

## Here's a breakdown of how its used:

* **`Name`** : This part represents the name of the field you want to define in your schema. It's a required element.
* **`Type`** : This part specifies the type of the field, and it's also a required element. You can use any of the supported types provided by Mongoose.
* **`Modifiers`** : These are optional and allow you to add extra attributes or flags to the field. For example, you can use `!` for unique fields, `*` for required fields, and `#` for indexed fields.

This CSS-based declaration paradigm aims to provide a simplified way of defining Mongoose schemas, making it easier to work with MongoDB data models.
