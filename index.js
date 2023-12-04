import { Schema } from "mongoose";

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

TYPES SUPPORTED 
here are the types supported
*/




// sample : username|String|*|!|#|(5,10)|ref:OtherCollection
// sample : username|String|+U|+R|+I|(5,10)|ref:OtherCollection
// enum sample : username|String|+U|+R|+I|(5,10)|['adam','eve']
// nested+default sample css : person.role=admin|String|+U|+R|+I|(5,10)|['adam','eve']


export function parser(css) {
	if (css === "" || css === null || css === undefined) {
		return null;
	}

	// if css is array, parse each element
	if (css.constructor === Array) {
		return css.map(x => parser(x));
	}

	var
		fields = css.split("|"), //filter falsy or empty
		Name = fields[0],
		Type = Schema.Types[fields[1]] || Schema.Types.String,
		Modifiers = fields.slice(2),
		options = {};

	let hasDefault = Name.match(/=/); // scan default in name
	let hasRef = Modifiers.find(x => x.match(/^ref:/)); // scan ref
	let hasRange = Modifiers.find(x => x.match(/^\(/)); // scan ranges
	let hasEnum = Modifiers.find(x => x.match(/^\[/)); // scan enums

	if (Modifiers.includes("*") || Modifiers.includes("+R")) {
		options.required = true;
	}
	if (Modifiers.includes("#") || Modifiers.includes("+I")) {
		options.index = true;
	}
	if (Modifiers.includes("!") || Modifiers.includes("+U")) {
		options.unique = true;
	}


	if (hasDefault) {
		let [name, defaultValue] = Name.split("=");
		Name = name;
		options.default = defaultValue;
	}

	if (hasRef) {
		let ref = hasRef.replace("ref:", "");
		options.ref = ref;
		Type = Schema.Types.ObjectId;
		return {
			[Name]: {
				type: Type,
				ref : ref
			},
		};
	}
	
	if (hasRange) {
		let [min, max] = hasRange
			.replace("(", "")
			.replace(")", "")
			.split(",");
		min = min.includes(".") ? parseFloat(min) : parseInt(min);
		max = max.includes(".") ? parseFloat(max) : parseInt(max);
	}

	if (hasEnum) {
		options.enum = eval (hasEnum);
	}

	return {
		[Name]: {
			type: Type,
			...options,
		},
	};
}

export function schema(css) {
	let parsed = parser(css), preSchema = {};
	parsed.forEach((x) => { preSchema = { ...preSchema, ...x }; });
	return new Schema(preSchema);
}

export default (structure) => {
	return mongoose.model(structure.name, schema(structure.css));
};

// const productSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     index: true, // Create an index on the "name" field
//   },
//   price: Number,
// });
// console.log(productSchema);