// name.includes("<-") && (options.ref = name.match(/<-(.*)/)?.[1] || null) && ( name = name.replace(/<-(.*)/, "") );


/* 	// remove modifiers from name
	name = name.replace(/[\!\*\#]/g, "");
	// remove reference from name
	name = name.replace(/<-(.*)/, "");

	options.default = name.match(/=(.*)/)?.[1] || null;
	name = name.replace(/=(.*)/, "");

	
	if (fields.length == 1) {
		options.type = Schema.Types.Mixed ;
	}

	if (modifiers) {
		if (modifiers.includes("[") && modifiers.includes("]")) {
			// extract [...] array using regex
			
			options.enum = modifiers.match(/\[(.*?)\]/)[1].split(",");
		}
		if (modifiers.includes("<=>")) {
			// set min and max min<=>max parse lhs and rhs integers using regex
			const [min, max] = modifiers.match(/(\d+)<=>(\d+)/).slice(1);
			if (type == Schema.Types.Number) { // if type is number use min and max
				options.min = parseInt(min);
				options.max = parseInt(max);
			}
			if (type == Schema.Types.String) { // if type is string use length instead
				options.minlength = parseInt(min);
				options.maxlength = parseInt(max);
			}
		}
		
	}
	
	
	options.type = type;
	
	results[name] = options;

	return results; */