_STR_WHITESPACE = '\\x20\\u00a0\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u2028\\u2029\\u3000\\uFEFF\\xA0';
_STR_SPECCHARS = '\\f\\n\\r\\t\\v';

function _get_type(value){
	var value_type = typeof value;
	return value===null ? 'null' : (value_type==='object' || value_type==='function' ? (Array.isArray(value) ? 'array' : (value instanceof Date ? 'date' : (value instanceof RegExp ? 'regexp' : value_type))) : value_type);
};
function _get_length(value){
	switch(Object.prototype.toString.call(value)){
		case '[object Number]':
			return value;
		case '[object Object]':
			return Object.keys(value).length;
		default:
			return value.length || 0;
	};
};
function _is_true(value){
	switch(typeof value){
		case 'string':
			return ['true', 't', 'yes', 'y', 'on', 'enable', 'да', '1'].indexOf(value.trim().toLowerCase()) > -1;
		case 'number':
			return value === 1;
		case 'boolean':
			return value;
		default:
			return false;
	};
};
function _is_false(value){
	switch(typeof value){
		case 'string':
			return ['false', 'f', 'no', 'n', 'off', 'disable', 'нет', '0'].indexOf(value.trim().toLowerCase()) > -1;
		case 'number':
			return value === 0;
		case 'boolean':
			return value === false;
		default:
			return false;
	};
};
function _is_boolean(value){
	return _is_true(value) || _is_false(value);
};
function _is_nil(data){
	return typeof data==="undefined" || data===null;
};
function _is_nilb(data){
	return _is_nil(data) || data==="";
};
function _avoid_nil(data, def){
	return _is_nil(data) ? _avoid_nil(def, "") : data;
};
function _avoid_nilb(data, def){
	return _is_nilb(data) ? _avoid_nil(def, "") : data;
};
function _is_string(data){
	return typeof data==="string";
};
function _is_not_empty_string(data){
	return _is_string(data) && data.length > 0;
};
function _is_json_string(str){
	if(_is_not_empty_string(str) && ((_starts_with(str, "[") && _ends_with(str, "]")) || (_starts_with(str, "{") && _ends_with(str, "}")))){
		try{
			JSON.parse(str);
		}catch(e){
			return false;
		};
		return true;
	};
	return false;
};
function _escape_regexp(str){
	_validate_argument_type(str, 'string', 'String', '_escape_regexp');
	return (str && /[\\^$.*+?()[\]{}|]/.test(str)) ? str.replace(new RegExp('([\\][^' + _STR_WHITESPACE + _STR_SPECCHARS + ']|[().^$*+?[\\]{}|])', 'g'), '\\$&') : (str || '');
};
function _to_arr(data){
	_validate_argument_type(data, ['string','array'], 'Data', '_to_arr');
	return (data==="" || typeof data=="object") ? data : (_is_json_string(data) ? JSON.parse(data) : data.split(/,\s|,/));
};
function _uniq_arr(arr){
	_validate_argument_type(arr, 'array', 'Array', '_uniq_arr');
	return arr.filter(function(e,i){return arr.indexOf(e)===i});
};
function _natural_compare(a, b){
	var i = undefined;
	var codeA = undefined;
	var codeB = 1;
	var posA = 0;
	var posB = 0;
	var alphabet = String.alphabet;

	function getCode(str, pos, code){
		if(code){
			for(i = pos; code = getCode(str, i), code < 76 && code > 65;){
				++i;
			};
			return +str.slice(pos - 1, i)
		};
		code = alphabet && alphabet.indexOf(str.charAt(pos));
		return code > -1 ? code + 76 : ((code = str.charCodeAt(pos) || 0), code < 45 || code > 127) ? code
			: code < 46 ? 65               // -
			: code < 48 ? code - 1
			: code < 58 ? code + 18        // 0-9
			: code < 65 ? code - 11
			: code < 91 ? code + 11        // A-Z
			: code < 97 ? code - 37
			: code < 123 ? code + 5        // a-z
			: code - 63
	};

	if((a+="") != (b+="")){
		for(;codeB;){
			codeA = getCode(a, posA++);
			codeB = getCode(b, posB++);

			if(codeA < 76 && codeB < 76 && codeA > 66 && codeB > 66){
				codeA = getCode(a, posA, posA);
				codeB = getCode(b, posB, posA = i);
				posB = i;
			};

			if(codeA != codeB){
				return (codeA < codeB) ? -1 : 1;
			};
		};
	};
	return 0;
};
function _prepare_sort(a){
	return (typeof a==="string" ? (isNaN(a) ? a.toLowerCase() : Number(a)) : a);
};
function _sort_arr(arr, asc, prop){
	_validate_argument_type(arr, 'array', 'Array', '_sort_arr');
	asc = _is_true(_avoid_nilb(asc, true));
	return arr.sort(function(a, b){
		a = _prepare_sort(prop ? a[prop] : a);
		b = _prepare_sort(prop ? b[prop] : b);
		if(typeof a==="number" && typeof b==="number"){
			if(asc ? (a > b) : (a < b)){
				return 1;
			};
			if(asc ? (a < b) : (a > b)){
				return -1;
			};
			return 0;
		}else{
			return _natural_compare(asc ? a : b, asc ? b : a);
		};
	});
};
function _trim_left(str, chars){
	var act = '_trim_left';
	_validate_argument_type(str, 'string', 'String', act);
	chars = _avoid_nilb(chars, _STR_WHITESPACE + _STR_SPECCHARS);
	_validate_argument_type(chars, 'string', 'Trim characters', act);
	return str.replace(new RegExp('^[' + _escape_regexp(chars) + ']+', 'g'), '');
};
function _trim_right(str, chars){
	var act = '_trim_right';
	_validate_argument_type(str, 'string', 'String', act);
	chars = _avoid_nilb(chars, _STR_WHITESPACE + _STR_SPECCHARS);
	_validate_argument_type(chars, 'string', 'Trim characters', act);
	return str.replace(new RegExp('[' + _escape_regexp(chars) + ']+$', 'g'), '');
};
function _trim(str, chars, left, right){
	var act = '_trim';
	_validate_argument_type(str, 'string', 'String', act);
	chars = _avoid_nilb(chars, _STR_WHITESPACE + _STR_SPECCHARS);
	_validate_argument_type(chars, 'string', 'Trim characters', act);
	if(_is_true(_avoid_nilb(left, true))){
		str = _trim_left(str, chars);
	};
	if(_is_true(_avoid_nilb(right, true))){
		str = _trim_right(str, chars);
	};
	return str;
};
function _trim_arr(arr, chars, left, right){
	var act = '_trim_arr';
	_validate_argument_type(arr, 'array', 'Array', act);
	chars = _avoid_nilb(chars, _STR_WHITESPACE + _STR_SPECCHARS);
	_validate_argument_type(chars, 'string', 'Trim characters', act);
	return arr.map(function(e){return _trim(e, chars, left, right)});
};
function _clean(str, chars_to_delete, chars_to_space, multiple_spaces){
	var act = '_clean';
	_validate_argument_type(str, 'string', 'String', act);
	chars_to_space = _avoid_nil(chars_to_space, '\\r\\n\\f');
	_validate_argument_type(chars_to_space, 'string', 'Replace characters with space', act);
	chars_to_delete = _avoid_nil(chars_to_delete, '\\t\\v');
	_validate_argument_type(chars_to_delete, 'string', 'Remove characters', act);
	if(chars_to_space){
		str = str.replace(new RegExp('[' + _escape_regexp(chars_to_space) + ']+', 'g'), ' ');
	};
	if(chars_to_delete){
		str = str.replace(new RegExp('[' + _escape_regexp(chars_to_delete) + ']+', 'g'), '');
	};
	str = _trim(str);
	if(_is_true(_avoid_nilb(multiple_spaces, true))){
		str = str.replace(new RegExp('[' + _STR_WHITESPACE + ']+', 'g'), ' ');
	}else{
		str = str.replace(new RegExp('[' + _STR_WHITESPACE + ']', 'g'), ' ');
	};
	str = str.replace(new RegExp('(?:[' + _STR_WHITESPACE + ']+)?([' + _STR_SPECCHARS + ']+)(?:[' + _STR_WHITESPACE + ']+)?', 'g'), '$1');
	return str;
};
function _clean_arr(arr, chars_to_delete, chars_to_space, multiple_spaces){
	var act = '_clean_arr';
	_validate_argument_type(arr, 'array', 'Array', act);
	chars_to_space = _avoid_nil(chars_to_space, '\\r\\n\\f');
	_validate_argument_type(chars_to_space, 'string', 'Replace characters with space', act);
	chars_to_delete = _avoid_nil(chars_to_delete, '\\t\\v');
	_validate_argument_type(chars_to_delete, 'string', 'Remove characters', act);
	return arr.map(function(e){return _clean(e, chars_to_delete, chars_to_space, multiple_spaces)});
};
function _no_exponents(num){
	_validate_argument_type(num, ['string','number'], 'Number', '_no_exponents');
	var data = String(num).split(/[eE]/);
	if(data.length == 1){return data[0]};

	var z = '';
	var sign = num < 0 ? '-' : '';
	var str = data[0].replace('.', '');
	var mag = Number(data[1]) + 1;

	if(mag < 0){
		z = sign + '0.';
		while (mag++) z += '0';
		return z + str.replace(/^\-/, '');
	};
	mag -= str.length;
	while (mag--) z += '0';
	return str + z;
};
function _starts_with(str, sub, from){
	var act = '_starts_with';
	_validate_argument_type(str, 'string', 'String', act);
	_validate_argument_type(sub, ['string','number'], 'Substring', act);
	if(typeof sub==='number'){
		sub = _no_exponents(sub);
	};
	from = _avoid_nilb(from, 0);
	_validate_argument_type(from, 'number', 'From index', act);
	return str.indexOf(sub) === from;
};
function _ends_with(str, sub, lenght){
	var act = '_ends_with';
	_validate_argument_type(str, 'string', 'String', act);
	_validate_argument_type(sub, ['string','number'], 'Substring', act);
	if(typeof sub==='number'){
		sub = _no_exponents(sub);
	};
	lenght = _avoid_nilb(lenght, str.length);
	_validate_argument_type(lenght, 'number', 'Lenght', act);
	if(lenght > str.length){
		lenght = str.length;
	};
	lenght -= sub.length;
	var last_index = str.indexOf(sub, lenght);
	return last_index !== -1 && last_index === lenght;
};
function _copy(source){
	if(['object','array'].indexOf(_get_type(source)) < 0){
		return source;
	};
	
	var target = Array.isArray(source) ? [] : {};
	
	for(var key in source){
		target[key] = _copy(source[key]);
	};
	
	return target;
};
function _assign(target, source){
	for(var key in source){
		if(!_is_nil(source[key])){
			target[key] = _copy(source[key]);
		};
	};
	return target;
};
_format = (function(){
	function format_number(num){
		if(num === -0 && (num !== 0 || 1 / num === 1 / -0)){
			return '-0';
		};
		return String(num);
	};
	function try_stringify(arg){
		try{
			return JSON.stringify(arg);
		}catch (err){
			return String(arg);
		};
	};
	return (function(){
		var args = Array.prototype.slice.call(arguments);
		const first = args[0];
		var a = 0;
		var str = '';
		var join = '';
		if(typeof first === 'string'){
			if(args.length === 1){
				return first;
			};
			var temp_str;
			var last_pos = 0;
			for(var i = 0; i < first.length - 1; ++i){
				if(first.charCodeAt(i) === 37){ // '%'
					const next_char = first.charCodeAt(++i);
					if(a + 1 !== args.length){
						switch (next_char) {
							case 115: // 's'
								const temp_arg = args[++a];
								const arg_type = Object.prototype.toString.call(temp_arg);
								if(arg_type === '[object Number]'){
									temp_str = format_number(temp_arg);
								}else if(arg_type === '[object Object]'){
									temp_str = try_stringify(temp_arg);
								}else{
									temp_str = String(temp_arg);
								};
								break;
							case 106: // 'j'
								temp_str = try_stringify(args[++a]);
								break;
							case 100: // 'd'
								temp_str = format_number(Number(args[++a]));
								break;
							case 79: // 'O'
								temp_str = try_stringify(args[++a]);
								break;
							case 111: // 'o'
								temp_str = try_stringify(args[++a]);
								break;
							case 105: // 'i'
								temp_str = format_number(parseInt(args[++a]));
								break;
							case 102: // 'f'
								temp_str = format_number(parseFloat(args[++a]));
								break;
							case 99: // 'c'
								a += 1;
								temp_str = '';
								break;
							case 37: // '%'
								str += first.slice(last_pos, i);
								last_pos = i + 1;
								continue;
							default: // Any other character is not a correct placeholder
								continue;
						};
						if(last_pos !== i - 1){
							str += first.slice(last_pos, i - 1);
						};
						str += temp_str;
						last_pos = i + 1;
					}else if(next_char === 37){
						str += first.slice(last_pos, i);
						last_pos = i + 1;
					};
				};
			};
			if(last_pos !== 0){
				a++;
				join = ' ';
				if(last_pos < first.length){
					str += first.slice(last_pos);
				};
			};
		};
		while(a < args.length){
			const value = args[a];
			str += join;
			str += typeof value !== 'string' ? try_stringify(value) : value;
			join = ' ';
			a++;
		};
		return str;
	});
})();
function _tr_format(){
	var args = Array.prototype.slice.call(arguments);
	for(var i in args){
		if(typeof args[i] == 'string'){
			args[i] = tr(args[i]);
		};
	};
	return _format.apply(null, args);
};