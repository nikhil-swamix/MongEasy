import { Schema, model, connect } from 'mongoose';
import mongoose from 'mongoose';
/* 
TODO: 
- Generate Schema file from css
- generate css from schema file

REFERENCES:
+U/! = unique
+R/* = required
+I/# = index
(0,999) = min,max
['adam','eve'] = enum

EXAMPLE:

let Models = models({
	Computer : [
		"name|String|!|*|#|(3,16)", // ! = unique, * = required, # = index, (3,16) = minlength,maxlength
		"price|Number|+U|+R|+I", // same as above, +U = unique, +R = required, +I = index
		"madeIn=India|String|ref:CountryNames", // ref:CountryNames = reference to another model
		"dateOfPurchase|Date|*", // Date = Date , * = required
		"color|String|['red','blue','green']", // ['red','blue','green'] = enum
		"inStock|Boolean|!|#", // ! = unique, # = index
		"storageTemperature|Number|(-10,60)", // (0,) = min no upper limit
		"globalStockQty|Number|(0,)", // (0,) = min, no upper limit // (,100) = no lower limit

		]
	})
*/

// sample : username|String|*|!|#|(5,10)|ref:OtherCollection
// sample : username|String|+U|+R|+I|(5,10)|ref:OtherCollection
// enum sample : username|String|+U|+R|+I|(5,10)|['adam','eve']
// nested+default sample css : person.role=admin|String|+U|+R|+I|(5,10)|['adam','eve']

export function parser(css) {
    if (css === '' || css === null || css === undefined) {
        return null;
    }

    // if css is array, parse each element
    if (css.constructor === Array) {
        return css.map((x) => parser(x));
    }

    var fields = css.split('|'), //filter falsy or empty
        Name = fields[0].trim(),
        Type = Schema.Types[fields[1].trim()] || Schema.Types.String,
        Modifiers = fields.slice(2),
        options = {};

    let hasDefault = Name.match(/=/); // scan default in name
    let hasRef = Modifiers.find((x) => x.match(/^ref:/)); // scan ref
    let hasRange = Modifiers.find((x) => x.match(/^\(/)); // scan ranges
    let hasEnum = Modifiers.find((x) => x.match(/^\[/)); // scan enums

    if (Modifiers.includes('*') || Modifiers.includes('+R')) {
        options.required = true;
    }
    if (Modifiers.includes('#') || Modifiers.includes('+I')) {
        options.index = true;
    }
    if (Modifiers.includes('!') || Modifiers.includes('+U')) {
        options.unique = true;
    }

    if (hasDefault) {
        let [name, defaultValue] = Name.split('=');
        Name = name;
        options.default = defaultValue;
    }

    if (hasRef) {
        let ref = hasRef.replace('ref:', '');
        options.ref = ref;
        Type = Schema.Types.ObjectId;
        return {
            [Name]: {
                type: Type,
                ref: ref,
            },
        };
    }

    if (hasRange) {
        let [min, max] = hasRange.replace('(', '').replace(')', '').split(',');
        min = min.includes('.') ? parseFloat(min) : parseInt(min);
        max = max.includes('.') ? parseFloat(max) : parseInt(max);
        if (fields[1] === 'Number') {
            min ? (options.min = min) : null;
            max ? (options.max = max) : null;
        } else {
            min ? (options.minlength = min) : null;
            max ? (options.maxlength = max) : null;
        }
        // console.log('range', min, max);
    }

    if (hasEnum) {
        options.enum = eval(hasEnum);
    }

    return {
        [Name]: {
            type: Type,
            ...options,
        },
    };
}

export function schema(css) {
    let parsed = parser(css);
    let preSchema = {};
    parsed.forEach((x) => {
        preSchema = { ...preSchema, ...x };
    });
    return new Schema(preSchema);
}

export let models = (modeldict) => {
    let _models = {};
    for (let m in modeldict) {
        _models[m] = model(m, schema(modeldict[m]));
    }
    return _models;
};

async function main() {
    await connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // give a simple test for employee schema

    let Models = models({
        Employee: [
            'name|String|!|*|#|(3,)', // ! = unique, * = required, # = index, (3,16) = minlength,maxlength
            'age|Number', // same as above, +U = unique, +R = required, +I = index
            'gender|String|["male","female"]', // ['red','blue','green'] = enum
            'salary|Number|(0,)', // (0,) = min, no upper limit // (,)]})
        ],
    });
    console.log(Models);

    // add one to database

    let employee = new Models.Employee({
        name: 'ashil Does 2',
        age: 25,
        gender: 'male',
        salary: 12,
    });
    // console.log(employee);
    employee.save();
    console.log(await Models.Employee.find({}));
    console.log('ashiled');
}


