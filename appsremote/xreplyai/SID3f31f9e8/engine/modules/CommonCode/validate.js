_validate = {
	_strTypeName: function(name){
		if(Array.isArray(name)){
			if(name.length > 1){
				arr = name.map(function(t){return _validate._strTypeName(t)});
				return this._strEnum(arr);
			}else{
				name = name[0];
			};
		};
		if(_K=="en"){
			return name;
		};
		switch(name){
			case 'string':
				return 'строкой';
			case 'number':
				return 'числом';
			case 'boolean':
				return 'логическим выражением';
			case 'function':
				return 'функцией';
			case 'object':
				return 'объектом';
			case 'array':
				return 'массивом';
			case 'date':
				return 'датой';
			case 'regexp':
				return 'регулярным выражением';
			default:
				return name;
		};
	},
	_strEnum: function(enums){
		return _tr_format("%s or %s", enums.slice(0, enums.length - 1).join(', '), enums.slice(-1));
	},
	_strMinMax: function(min, max){
		if(!_is_nilb(min)){
			min = _tr_format("no less than %d", min);
		};
		if(!_is_nilb(max)){
			max = _tr_format("no more than %d", max);
		};
		if(min && max){
			return _tr_format("%s and %s", min, max);
		};
		return min || max;
	},
	_escapeName: function(name){
		return name ? (' "' + tr(name) + '"') : '';
	},
	_info: {
		valid: true,
		error: ""
	},
	_clear: function(){
		var info = _validate._info;
		info.valid = true;
		info.error = "";
	},
	_fail: function(err){
		var info = _validate._info;
		info.valid = false;
		info.error = err;
	},
	_generateErrorText: function(type, arg, validator, name, act, isElement){
		var escapedName = this._escapeName(name);
		var firsPart = act + _tr_format((isElement ? "The element of argument%s" : "The argument%s"), escapedName);
		switch(type){
			case 'type':
				return _tr_format("%s must be a %s, not %s", firsPart, this._strTypeName(validator.type), this._strTypeName(_get_type(arg)));
			case 'boolean':
				return _tr_format("%s must %sbe a boolean value (true, false, \"true\", \"false\", 1, 0 and etc.), specified %j", firsPart, (validator.boolean ? "" : tr("not ")), arg);
			case 'empty':
				return _tr_format("%s must be %s, specified %j", firsPart, tr(validator.empty ? "empty" : "not empty"), arg);
			case 'nan':
				return _tr_format("%s must be %s number, specified %s", firsPart, tr(validator.nan ? "invalid" : "valid"), arg);
			case 'date':
				return _tr_format("%s must be%s date, specified %j", firsPart, tr(validator.date ? " invalid" : " valid"), arg);
			case 'length':
				return (act + _tr_format("The length of the %s must be %s, specified %j", _tr_format((isElement ? "element of argument%s" : "argument%s"), escapedName), (typeof validator.length==='number' ? _tr_format("equal %i", validator.length) : this._strMinMax(validator.length.min, validator.length.max)), arg));
			case 'size':
				return _tr_format("%s must be %s, specified %d", firsPart, (typeof validator.size==='number' ? _tr_format("equal %d", validator.size) : this._strMinMax(validator.size.min, validator.size.max)), arg);
			case 'enums':
				return _tr_format("%s must be equal to %s, specified %j", firsPart, this._strEnum(validator.enums.map(function(ell){return JSON.stringify(ell)})), arg);
			case 'match':
				return _tr_format("%s must match regexp %s, specified %j", firsPart, validator.match, arg);
			default:
				return act + tr('Unknown error');
		};
	},
	toStr: function(value){
		return String(value);
	},
	trim: function(value){
		if(Array.isArray(value)){
			return value.map(function(ell){return String(ell).trim()}).filter(function(str){return str.length > 0});
		};
		return value.trim();
	},
	toLower: function(value){
		return value.toLowerCase();
	},
	toUpper: function(value){
		return value.toUpperCase();
	},
	toNum: function(value){
		return Number(value);
	},
	toDate: function(value){
		return (new Date(value));
	},
	toBool: function(value){
		return _is_true(value);
	},
	type: function(value, type){
		var value_type = _get_type(value);
		if(Array.isArray(type)){
			return type.filter(function(t){return value_type===t}).length > 0;
		};
		return value_type===type;
	},
	boolean: function(value, boolean){
		return _is_boolean(value) === _is_true(_avoid_nil(boolean, true));
	},
	empty: function(value, empty){
		return (_get_length(value) === 0) === _is_true(_avoid_nil(empty, true));
	},
	nan: function(value, nan){
		return isNaN(value) === _is_true(_avoid_nil(nan, true));
	},
	date: function(value, date){
		return ((value instanceof Date ? value : new Date(value)).toString() !== 'Invalid Date') === _is_true(date);
	},
	length: function(value, len){
		var value_length = _get_length(value);
		if(typeof len==='number'){
			return value_length===len;
		};
		if(!_is_nilb(len.min) && value_length < len.min){
			return false;
		};
		if(!_is_nilb(len.max) && value_length > len.max){
			return false;
		};
		return true;
	},
	size: function(value, size){
		if(typeof size==='number'){
			return value===size;
		};
		if(!_is_nilb(size.min) && value < size.min){
			return false;
		};
		if(!_is_nilb(size.max) && value > size.max){
			return false;
		};
		return true;
	},
	enums: function(value, enums){
		return enums.indexOf(value) > -1;
	},
	match: function(value, regexp){
		return regexp.test(value);
	},
	value: function(value, validator){
		for(var prop in validator){
			if(['required'].indexOf(prop) > -1){
				continue;
			}else if(['type', 'boolean', 'empty', 'nan', 'date', 'length', 'size', 'enums', 'match'].indexOf(prop) > -1){
				if(!this[prop](value, validator[prop])){
					return false;
				};
			}else if(['toStr', 'trim', 'toLower', 'toUpper', 'toNum', 'toDate', 'toBool'].indexOf(prop) > -1){
				if(validator[prop]){
					value = this[prop](value);
				};
			}else if(prop == 'each'){
				for(var key in value){
					if(!this.value(value[key], validator.each)){
						return false;
					};
				};
			}else if(['elements', 'props'].indexOf(prop) > -1){
				var schema = (prop == 'elements') ? validator.elements : validator.props;
				for(var key in schema){
					if(key in value){
						if(!this.value(value[key], schema[key])){
							return false;
						};
					}else if(schema[key].required){
						return false;
					};
				};
			}else if(prop == 'use'){
				var use = validator.use;
				if(typeof use == 'function'){
					value = use(value);
				}else{
					value = use.func.apply(use.context || null, [value].concat(use.args || []));
				};
			}else if(_get_type(validator[prop]) == 'object'){
				if(prop in value){
					if(!this.value(value[prop], validator[prop])){
						return false;
					};
				}else if(validator[prop].required){
					return false;
				};
			};
		};
		return true;
	},
	argument: function(arg, validator, name, act, isElement){
		if('name' in validator){
			isElement = act;
			act = name;
			name = validator.name;
		};
		name = _avoid_nil(name);
		act = _avoid_nil(act);
		var failFunc = fail;
		if(typeof act=='function'){
			failFunc = act;
			act = '';
		}else if(act){
			act = act + ': ';
		};
		for(var prop in validator){
			if(['name', 'required', 'def'].indexOf(prop) > -1){
				continue;
			}else if(['type', 'boolean', 'empty', 'nan', 'date', 'length', 'size', 'enums', 'match'].indexOf(prop) > -1){
				if(!this[prop](arg, validator[prop])){
					failFunc(this._generateErrorText(prop, arg, validator, name, act, isElement));
					return arg;
				};
			}else if(['toStr', 'trim', 'toLower', 'toUpper', 'toNum', 'toDate', 'toBool'].indexOf(prop) > -1){
				if(validator[prop]){
					arg = this[prop](arg);
				};
			}else if(prop == 'each'){
				this._clear();
				for(var key in arg){
					if('name' in validator.each){
						arg[key] = this.argument(arg[key], validator.each, this._fail);
					}else{
						arg[key] = this.argument(arg[key], validator.each, name, this._fail, true);
					};
					if(!this._info.valid){
						failFunc(act + this._info.error);
						return arg;
					};
				};
			}else if(prop == 'elements'){
				this._clear();
				for(var key in validator.elements){
					var curValidator = validator.elements[key];
					if(key in arg){
						if('name' in curValidator){
							arg[key] = this.argument(arg[key], curValidator, this._fail);
						}else{
							arg[key] = this.argument(arg[key], curValidator, name, this._fail, true);
						};
						if(!this._info.valid){
							failFunc(act + this._info.error);
							return arg;
						};
					}else if(curValidator.required){
						if('name' in curValidator){
							failFunc(act + _tr_format("Argument%s not specified", this._escapeName(curValidator.name)));
						}else{
							failFunc(act + _tr_format("Element of argument%s not specified", this._escapeName(name)));
						};
						return arg;
					}else if('def' in curValidator){
						arg[key] = curValidator.def;
					};
				};
			}else if(prop == 'or'){
				var firstError = null;
				for(var key in validator.or){
					this._clear();
					var curValidator = validator.or[key];
					if(!curValidator.hasOwnProperty('name')){
						curValidator.name = name;
					};
					var temp = this.argument(arg, curValidator, this._fail);
					if(this._info.valid){
						arg = temp;
						break;
					}else if(firstError == null){
						firstError = this._info.error;
					};
				};
				if(!this._info.valid){
					failFunc(act + firstError);
					return arg;
				};
			}else if(prop == 'props'){
				this._clear();
				for(var key in validator.props){
					var curValidator = validator.props[key];
					if(key in arg){
						if(!curValidator.hasOwnProperty('name')){
							curValidator.name = key;
						};
						arg[key] = this.argument(arg[key], curValidator, this._fail);
						if(!this._info.valid){
							failFunc(act + this._info.error);
							return arg;
						};
					}else if(curValidator.required){
						failFunc(act + _tr_format("Argument%s not specified", this._escapeName(curValidator.name || key)));
						return arg;
					}else if('def' in curValidator){
						arg[key] = curValidator.def;
					};
				};
			}else if(prop == 'use'){
				var use = validator.use;
				if(typeof use == 'function'){
					arg = use(arg);
				}else{
					arg = use.func.apply(use.context || null, [arg].concat(use.args || []));
				};
			}else if(_get_type(validator[prop]) == 'object'){
				this._clear();
				var curValidator = validator[prop];
				if(prop in arg){
					if(!curValidator.hasOwnProperty('name')){
						curValidator.name = prop;
					};
					arg[prop] = this.argument(arg[prop], curValidator, this._fail);
					if(!this._info.valid){
						failFunc(act + this._info.error);
						return arg;
					};
				}else if(curValidator.required){
					failFunc(act + _tr_format("Argument%s not specified", this._escapeName(curValidator.name || prop)));
					return arg;
				}else if('def' in curValidator){
					arg[prop] = curValidator.def;
				};
			};
		};
		return arg;
	},
	arguments: function(args, schema, act){
		act = _avoid_nil(act);
		var failFunc = fail;
		if(typeof act=='function'){
			failFunc = act;
			act = '';
		}else if(act){
			act = act + ': ';
		};
		
		this._clear();
		for(var prop in schema){
			var validator = schema[prop];
			if(prop in args){
				if(!validator.hasOwnProperty('name')){
					validator.name = prop;
				};
				args[prop] = this.argument(args[prop], validator, this._fail);
				if(!this._info.valid){
					failFunc(act + this._info.error);
					return false;
				};
			}else if(validator.required){
				failFunc(act + _tr_format("Argument%s not specified", this._escapeName(validator.name || prop)));
				return false;
			}else if('def' in validator){
				args[prop] = validator.def;
			};
		};
		return true;
	}
};

function _validate_argument_type(arg, type, name, act){
	_validate.argument(arg, {type: type}, name, act);
};