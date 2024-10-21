_Idle = (function(idle){
	const util = idle.util;
	
	idle.setDebug = function(enable){
		idle._debug = _is_true(enable);
	};
	
	idle.setVisualize = function(enable){
		idle._visualize = _is_true(enable);
	};
	
	idle.setGeneralSettings = function(params){
		util.setAction('setGeneralSettings');
		const general = idle._general;
		for(var key in params){
			var value = params[key];
			
			if(value == '*'){
				delete general[key];
				continue;
			};
			
			if(_is_nilb(value)){
				continue;
			};
			
			if(key == 'useActions'){
				if(!general.hasOwnProperty('useActions')){
					general.useActions = {};
				};
				for(var name in value){
					var action = value[name];
			
					if(action == '*'){
						delete general.useActions[name];
						continue;
					};
					
					if(_is_nilb(action)){
						continue;
					};
					
					general.useActions[name] = action;
				};
				if(Object.keys(general.useActions).length == 0){
					delete general.useActions;
				};
				continue;
			};
			
			general[key] = value;
		};
		util.validateArgs(general, {
			time: {or: [{type: 'string', trim: true, toLower: true, enums: ['disable','short','medium','long']}, {type: 'object', min: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 0}, name: 'Min emulation time'}, max: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 1}, name: 'Max emulation time'}}, {type: ['number', 'string'], toNum: true, nan: false, size: {min: 0}}], name: 'Emulation time'},
			accuracy: {type: 'string', trim: true, toLower: true, enums: ['low','medium','high'], name: 'Actions accuracy'},
			intensity: {type: 'string', trim: true, toLower: true, enums: ['low','medium','high'], name: 'Actions intensity'},
			useActions: {type: 'object', each: {toBool: true}, name: 'Actions performed'},
			actions: {type: 'array', each: {type: 'object', name: 'Action settings'}, name: 'Action list'},
			longMax: {type: ['string', 'number'], name: 'Long movements'},
			shortMax:  {type: ['string', 'number'], name: 'Short movements'},
			miss: {or: [{type: 'string', trim: true, toLower: true, enums: ['disable','low','medium','high']}, {type: 'object'}], name: 'Misses on an element'},
			delay: {or: [{type: 'string', trim: true, toLower: true, enums: ['disable','low','medium','high']}, {type: 'object'}], name: 'Delay before hover'},
			filters: {or: [{type: 'string', trim: true, toLower: true, enums: ['all', 'link', 'input', 'clickable', 'header', 'text', 'image', 'icon']}, {type: ['object', 'array']}], name: 'Delay before hover'},
			hoverMode: {type: 'string', trim: true, toLower: true, enums: ['random', 'tocenter', 'randomorcenter', 'center', 'top', 'bottom', 'left', 'right', 'nearest'], name: 'Hover position'},
			maxRepeatSkip: {type: ['number', 'string'], toNum: true, nan: false, size: {min: -1}, name: 'Re-hovering over an element'},
			overlapByPoints: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 0, max: 5}, name: 'Overlap by points'},
			reverseScroll: {or: [{type: 'string', trim: true, toLower: true, enums: ['disable','low','medium','high']}, {type: ['number', 'string'], toNum: true, nan: false, size: {min: 0, max: 100}}], name: 'Delay before hover'},
			target: {type: ['string', 'object'], name: 'Emulation target'},
			additionalEmulation: {toBool: true},
			targetDelay: {or: [{type: 'string', trim: true, toLower: true, enums: ['disable','low','medium','high']}, {type: 'object'}], name: 'Delay before click'},
			targetScroll: {or: [{type: 'string', trim: true, toLower: true, enums: ['disable','low','medium','high']}, {type: 'object'}], name: 'Scroll to target'},
			targetCompare: {or: [{type: 'string', trim: true, toLower: true, enums: ['disable','low','medium','high']}, {type: 'object'}], name: 'Scroll to target'}
		});
	};
	
	idle.resetGeneralSettings = function(params){
		idle._general = {
			time: 0
		};
	};
	
	idle.additionalEmulationEnabled = function(){
		return idle._general && !_is_false(idle._general.time) && !_is_false(idle._general.additionalEmulation);
	};
	
	idle.emulate = function(params, callback){
		util.setAction('emulate');
		if(typeof params === 'function'){
			callback = params;
			params = {};
		};
		
		_call_function(function(){
			var options = idle.prepareOptions(params);
			if(options == null){
				_function_return();
				return;
			};
			
			var emulator = new idle._emulator(options);
			emulator.emulate()!;
		}, null, callback);
	};
	
	idle.pause = function(name, callback){
		_call_function(function(){			
			var emulator = new idle._emulator(idle.prepareActionOptions(name));
			_call_function(emulator.doOneAction, null)!
			_function_return(_result_function());
		}, null, callback);
	};
	
	idle.type = function(text, options, callback){
		util.setAction('type');
		if(typeof options === 'function'){
			callback = options;
			options = {};
		};
		
		text = util.validateArg(text, {type: ['string', 'number'], toStr: true, length: {min: 1}}, 'Text to type');
		options = util.validateArg(options || {}, {
			type: 'object',
			interval: {def: 100, type: ['number', 'string'], toNum: true, nan: false, size: {min: 0}, name: 'Interval in milliseconds'},
			moveSettings: {
				def: {},
				type: 'object',
				speed: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 1}, name: 'Move speed'},
				gravity: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 1}, name: 'Move gravity'},
				deviation: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 1}, name: 'Move deviation'},
				name: 'Move settings'
			},
			additionalEmulation: {toBool: true}
		}, 'Type settings');
		
		var additionalEmulation = options.hasOwnProperty('additionalEmulation') ? options.additionalEmulation : idle.additionalEmulationEnabled();
		
		if(!additionalEmulation){
			_type(text, options.interval, callback);
			return;
		};
		
		var timeout = get_general_timeout_next();
		var maxTime = 0;
		if(timeout > -1){
			maxTime = Date.now() + timeout;
			general_timeout_next(-1);
		};
		var parts = util.parseText(text);
		var stutter = idle.prepareActionParams('typeStutter');
		var emulator = new idle._emulator(idle.prepareActionOptions('typeStutter'));
		var currentInterval = options.interval;
		
		_call_function(function(){
			_do(function(){
				if(parts.length < stutter.minLength){
					_break();
				};
				
				var length = Math.max(parseInt(rand(parts.length * 0.1, parts.length * 0.4)), stutter.minLength);
				var doStutter = stutter.chance >= rand(1, 100);
				
				while(!doStutter && (parts.length - length) >= stutter.minLength){
					length += Math.max(parseInt(rand(parts.length * 0.1, parts.length * 0.4)), stutter.minLength);
					if(length >= parts.length){
						break;
					};
					doStutter = stutter.chance >= rand(1, 100);
				};
				
				if(!doStutter){
					_break();
				};
				
				if(maxTime > 0){
					general_timeout_next(Math.max(maxTime - Date.now(), 1));
				};
				
				currentInterval = util.calcTypeInterval(options.interval, currentInterval, stutter.interval);
				
				util.log('Change the text typing interval, now it is %i', currentInterval);
				
				_type(parts.splice(0, length).join(''), currentInterval)!
				
				util.log('Perform emulation during typing text');
			
				_call_function(emulator.doSleep, {ms: util.randomRange(stutter.delay.before)})!
				_call_function(emulator.doOneAction, null)!
				var action = _result_function();
				_if(['sleep','nothing'].indexOf(action) < 0, function(){
					_call_function(emulator.doSleep, {ms: util.randomRange(stutter.delay.after)})!
				})!
			
				util.log('Emulation during typing text completed');
			})!
			
			if(maxTime > 0){
				general_timeout_next(Math.max(maxTime - Date.now(), 1));
			};
			
			currentInterval = util.calcTypeInterval(options.interval, currentInterval, stutter.interval);
			
			util.log('Change the text typing interval, now it is %i', currentInterval);
			
			_type(parts.join(''), options.interval)!
		}, null, callback);
	};
	
	idle.typeOn = function(target, text, options, callback){
		util.setAction('typeOn');
		if(typeof options === 'function'){
			callback = options;
			options = {};
		};
		var timeout = get_general_timeout_next();
		if(timeout > -1){
			general_timeout_next(-1);
		};
		target = idle._target(target);
		
		text = util.validateArg(text, {type: ['string', 'number'], toStr: true, length: {min: 1}}, 'Text to type');
		options = util.validateArg(options || {}, {
			type: 'object',
			interval: {def: 100, type: ['number', 'string'], toNum: true, nan: false, size: {min: 0}, name: 'Interval in milliseconds'},
			moveMode: {
				def: 'center',
				or: [
					{type: 'string', trim: true, toLower: true, enums: ['center','top','bottom','left','right','random','nearest']},
					{type: 'array', each: {type: 'string', trim: true, toLower: true, enums: ['center','top','bottom','left','right','random','nearest']}}
				],
				name: 'Move mode'
			},
			moveSettings: {
				def: {},
				type: 'object',
				speed: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 1}, name: 'Move speed'},
				gravity: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 1}, name: 'Move gravity'},
				deviation: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 1}, name: 'Move deviation'},
				name: 'Move settings'
			},
			additionalEmulation: {toBool: true}
		}, 'Type settings');
		
		var additionalEmulation = options.hasOwnProperty('additionalEmulation') ? options.additionalEmulation : idle.additionalEmulationEnabled();
		if(additionalEmulation && options.moveMode == 'center'){
			options.moveMode = ['center', 'random'];
		};
		
		_call_function(function(){
			_call_function(target.move, options)!
			var coord = _result_function();
			
			if(!coord){
				_function_return();
				return;
			};
			
			_if(additionalEmulation, function(){
				util.log('Perform idle emulation before click');
				
				idle.pause('pauseBeforeEllClick')!
				var action = _result_function();
				
				util.log('Emulation before click completed');
				
				_if(['removeAndReturnCursorToTarget'].indexOf(action) > -1, function(){
					_call_function(util.getScreenSettings, null)!
					var screen = _result_function();
					
					coord.x = screen.cursor.x + screen.scroll.x;
					coord.y = screen.cursor.y + screen.scroll.y;
				})!
			})!
			
			_call_function(target.click, _assign(coord, options))!
			
			_if(additionalEmulation, function(){
				util.log('Perform idle emulation before typing text');
				
				idle.pause('pauseAfterClick')!
				
				util.log('Emulation before typing text completed');
			})!
			
			if(timeout > -1){
				general_timeout_next(timeout);
			};
			
			idle.type(text, options)!
			
		}, null, callback);
	};
	
	idle.moveAndClickOn = function(target, options, callback){
		util.setAction('moveAndClickOn');
		if(typeof options === 'function'){
			callback = options;
			options = {};
		};
		target = idle._target(target);
		options = util.validateArg(options || {}, {
			type: 'object',
			holdCtrl: {def: false, toBool: true},
			clickType: {def: 'left', type: 'string', trim: true, toLower: true, enums: ['left','right','double'], name: 'Mouse click type'},
			wait: {def: false, toBool: true},
			moveMode: {
				def: 'center',
				or: [
					{type: 'string', trim: true, toLower: true, enums: ['center','top','bottom','left','right','random','nearest']},
					{type: 'array', each: {type: 'string', trim: true, toLower: true, enums: ['center','top','bottom','left','right','random','nearest']}}
				],
				name: 'Move mode'
			},
			moveSettings: {
				def: {},
				type: 'object',
				speed: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 1}, name: 'Move speed'},
				gravity: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 1}, name: 'Move gravity'},
				deviation: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 1}, name: 'Move deviation'},
				name: 'Move settings'
			},
			additionalEmulation: {toBool: true}
		}, 'Settings');
		
		var additionalEmulation = options.hasOwnProperty('additionalEmulation') ? options.additionalEmulation : idle.additionalEmulationEnabled();
		if(additionalEmulation && options.moveMode == 'center'){
			options.moveMode = ['center', 'random'];
		};
		
		_call_function(function(){
			_call_function(target.move, options)!
			var coord = _result_function();
			
			if(!coord){
				_function_return();
				return;
			};
			
			_if(additionalEmulation, function(){
				util.log('Perform idle emulation before click');
				
				idle.pause(target.type == 'coordinate' ? 'pauseBeforeCoordClick' : 'pauseBeforeEllClick')!
				var action = _result_function();
				
				util.log('Emulation before click completed');
				
				_if(['removeAndReturnCursorToTarget'].indexOf(action) > -1, function(){	
					_call_function(util.getScreenSettings, null)!
					var screen = _result_function();
					
					coord.x = screen.cursor.x + screen.scroll.x;
					coord.y = screen.cursor.y + screen.scroll.y;
				})!
			})!
			
			_call_function(target.click, _assign(coord, options))!
			
			_if(additionalEmulation, function(){
				util.log('Perform idle emulation after click');
				
				idle.pause(options.wait ? 'pauseAfterClickWithWait' : 'pauseAfterClick')!
				
				util.log('Emulation after click completed');
			})!
			
		}, null, callback);
	};
	
	return idle;
})({
	_debug: false,
	_visualize: true,
	_general: {
		time: 0
	},
	info: {
		lastAction: '_Idle',
		visualizeId: rand(1, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") + rand(rand(5, 11)),
		previousTarget: null,
		accumulatedChanc: null
	},
	util: {},
	config: {}
});