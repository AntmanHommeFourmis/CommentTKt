(function(idle){
	const util = idle.util;
	const config = idle.config;
	
	idle.getSetting = function(name, value){
		if(!config.hasOwnProperty(name)){
			util.fail('Missing settings named %j', name);
		};
		
		if(_is_nilb(value)){
			return _copy(config[name].def || config[name].medium);
		};
		
		if(typeof value != 'string'){
			return _copy(value);
		};
		
		if(!config[name].hasOwnProperty(value)){
			util.fail('For setting %j is missing value %j', name, value);
		};
		
		return _copy(config[name][value]);
	};
	
	idle.getChance = function(name, value){
		if(!config.chance.hasOwnProperty(name)){
			util.fail('Missing chance parameters named %j', name);
		};
		
		if(!config.chance[name].hasOwnProperty(value)){
			util.fail('For chance %j is missing value %j', name, value);
		};
		
		return _copy(config.chance[name][value]);
	};
	
	idle.prepareOptions = function(params){
		util.validateArgs(params, {
			useGeneral: {def: false, toBool: true},
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
			additionalEmulation: {def: true, toBool: true},
			targetDelay: {or: [{type: 'string', trim: true, toLower: true, enums: ['disable','low','medium','high']}, {type: 'object'}], name: 'Delay before click'},
			targetScroll: {or: [{type: 'string', trim: true, toLower: true, enums: ['disable','low','medium','high']}, {type: 'object'}], name: 'Scroll to target'},
			targetCompare: {or: [{type: 'string', trim: true, toLower: true, enums: ['disable','low','medium','high']}, {type: 'object'}], name: 'Scroll to target'}
		});
		
		const general = params.useGeneral ? idle._general : {};
		var timeOrig = _avoid_nilb(params.time, general.time);
		var time = idle.getSetting('target' in params ? 'targetTime' : 'time', timeOrig);
		if(time <= 0){
			return null;
		};
		var actions = [];
		var disabledActions = ['removeCursorFromTarget', 'returnCursorToTarget', 'removeAndReturnCursorToTarget', 'returnAndRemoveCursorFromTarget', 'scrollAndReturnToTarget'];
		var accuracy = idle.getSetting('accuracy', general.accuracy);
		
		if('actions' in params || 'actions' in general){
			actions = params.actions || general.actions;
			disabledActions = ['sleep', 'scroll', 'longElementMove', 'shortElementMove', 'randomMove', 'microMove', 'goingBeyond', 'moveAlongText', 'removeCursorFromTarget', 'returnCursorToTarget', 'removeAndReturnCursorToTarget', 'returnAndRemoveCursorFromTarget', 'scrollAndReturnToTarget'];
			actions.forEach(function(action){
				var i = disabledActions.indexOf(action.name);
				if(i > -1){
					disabledActions.splice(i, 1);
				};
			});
		}else{
		
			if('useActions' in params || 'useActions' in general){
				var useActions = _assign(general.useActions || {}, params.useActions || {});
				for(var name in useActions){
					var i = disabledActions.indexOf(name);
					if(i > -1){
						if(_is_true(useActions[name])){
							disabledActions.splice(i, 1);
						};
					}else if(!_is_true(useActions[name])){
						disabledActions.push(name);
					};
				};
			};
			
			accuracy = idle.getSetting('accuracy', params.accuracy || general.accuracy);
			var chance = idle.getChance(params.intensity || general.intensity || "medium", params.accuracy || general.accuracy || "medium");
			
			for(var name in chance){
				if(disabledActions.indexOf(name) > -1){
					continue;
				};
					
				var action = idle.getSetting(name, params[name] || general[name] || accuracy[name]);
				action.name = name;
				action.chance = chance[name];
				
				if(name == 'longElementMove' && ('longMax' in params || 'longMax' in general)){
					action.maxDistance = _avoid_nilb(params.longMax, general.longMax);
				};
				if(name == 'shortElementMove' && ('shortMax' in params || 'shortMax' in general)){
					action.maxDistance = _avoid_nilb(params.shortMax, general.shortMax);
				};
				
				actions.push(action);
			};
		};
		
		if(actions.length == 0){
			util.fail('No action selected to perform');
		};
		
		var options = {
			actions: actions,
			time: time,
			isGeneral: params.useGeneral,
			sleep: disabledActions.indexOf('sleep') > -1 ? 0 : actions.filter(function(action){return action.name == 'sleep'})[0],
			delay: idle.getSetting('delay', params.delay || general.delay || accuracy.delay),
			onOneEll: idle.getSetting('onOneEll', params.onOneEll || general.onOneEll || accuracy.onOneEll),
			mouseSpeed: idle.getSetting('mouseSpeed', params.mouseSpeed || params.intensity || general.intensity),
			scrollSpeed: idle.getSetting('scrollSpeed', params.scrollSpeed || params.intensity || general.intensity),
			microMove: disabledActions.indexOf('microMove') > -1 ? {chance: 0} : actions.filter(function(action){return action.name == 'microMove'})[0],
			filters: idle.getSetting('filters', params.filters || general.filters),
			miss: idle.getSetting('miss', params.miss || general.miss || accuracy.miss),
			maxRepeatSkip: idle.getSetting('maxRepeatSkip', _avoid_nilb(params.maxRepeatSkip, general.maxRepeatSkip)),
			hoverMode: idle.getSetting('hoverMode', params.hoverMode || general.hoverMode),
			overlapByPoints: idle.getSetting('overlapByPoints', _avoid_nilb(params.overlapByPoints, general.overlapByPoints)),
			reverseScroll: idle.getSetting('reverseScroll', _avoid_nilb(params.reverseScroll, _avoid_nilb(general.reverseScroll, accuracy.reverseScroll)))
		};
		
		if('target' in params){
			var compare = idle.getSetting('targetCompare', params.targetCompare || general.targetCompare || accuracy.targetCompare);
			if(compare && compare.random && ['short','medium','long'].indexOf(timeOrig) > -1){
				compare.random.multiplier = idle.getSetting('multiplier', timeOrig);
			};
			options.target = {
				value: params.target,
				delay: idle.getSetting('delay', params.targetDelay || general.targetDelay || accuracy.delay),
				scroll: idle.getSetting('targetScroll', params.targetScroll || general.targetScroll || accuracy.scroll),
				compare: compare
			};
		};
		
		return options;
	};
	
	idle.prepareActionOptions = function(name){
		const general = idle._general;
		var accuracy = idle.getSetting('accuracy', general.accuracy);
		var chance = idle.getChance(name, accuracy[name]);
		var useActions = {};
		['sleep', 'scroll', 'longElementMove', 'shortElementMove', 'randomMove', 'microMove', 'goingBeyond', 'moveAlongText', 'removeCursorFromTarget', 'returnCursorToTarget', 'removeAndReturnCursorToTarget', 'returnAndRemoveCursorFromTarget', 'scrollAndReturnToTarget'].forEach(function(action){
			useActions[action] = action in chance;
		});
		
		var options = idle.prepareOptions({useGeneral: true, time: 1, useActions: useActions});
		
		options.actions.forEach(function(action, i){
			if(action.name == 'sleep'){
				action = options.actions[i] = idle.getSetting('pause');
				action.name = 'sleep';
			};
			action.chance = chance[action.name];
		});
		
		return options;
	};
	
	idle.prepareActionParams = function(name){
		const general = idle._general;
		var accuracy = idle.getSetting('accuracy', general.accuracy);
		
		return idle.getSetting(name, accuracy[name]);
	};
	
	config.time = {
		disable: 0,
		def: {
			min: 50,
			max: 70
		},
		short: {
			min: 8,
			max: 13
		},
		medium: {
			min: 25,
			max: 35
		},
		long: {
			min: 50,
			max: 70
		}
	};
	
	config.accuracy = {
		low: {
			sleep: "medium",
			delay: "high",
			miss: "high",
			longElementMove: "high",
			shortElementMove: "high",
			onOneEll: "high",
			scroll: "high",
			reverseScroll: "medium",
			randomMove: "high",
			microMove: "high",
			goingBeyond: "high",
			moveAlongText: "high",
			targetCompare: "high",
			pauseBeforeEllClick: "low",
			pauseAfterClick: "low",
			pauseAfterClickWithWait: "low",
			pauseBeforeCoordClick: "low",
			typeStutter: "high",
			removeCursorFromTarget: "high",
			returnCursorToTarget: "high",
			removeAndReturnCursorToTarget: "high",
			returnAndRemoveCursorFromTarget: "high",
			scrollAndReturnToTarget: "high"
		},
		medium: {
			sleep: "medium",
			delay: "medium",
			miss: "medium",
			longElementMove: "medium",
			shortElementMove: "medium",
			onOneEll: "medium",
			scroll: "medium",
			reverseScroll: "medium",
			randomMove: "medium",
			microMove: "medium",
			goingBeyond: "medium",
			moveAlongText: "medium",
			targetCompare: "medium",
			pauseBeforeEllClick: "medium",
			pauseAfterClick: "medium",
			pauseAfterClickWithWait: "medium",
			pauseBeforeCoordClick: "medium",
			typeStutter: "medium",
			removeCursorFromTarget: "medium",
			returnCursorToTarget: "medium",
			removeAndReturnCursorToTarget: "medium",
			returnAndRemoveCursorFromTarget: "medium",
			scrollAndReturnToTarget: "medium"
		},
		high: {
			sleep: "high",
			delay: "low",
			miss: "low",
			longElementMove: "low",
			shortElementMove: "low",
			onOneEll: "low",
			scroll: "low",
			reverseScroll: "low",
			randomMove: "low",
			microMove: "low",
			goingBeyond: "low",
			moveAlongText: "low",
			targetCompare: "low",
			pauseBeforeEllClick: "high",
			pauseAfterClick: "high",
			pauseAfterClickWithWait: "high",
			pauseBeforeCoordClick: "high",
			typeStutter: "low",
			removeCursorFromTarget: "low",
			returnCursorToTarget: "low",
			removeAndReturnCursorToTarget: "low",
			returnAndRemoveCursorFromTarget: "low",
			scrollAndReturnToTarget: "low"
		}
	};
	
	config.chance = {
		low: {
			low: {
				sleep: 40,
				longElementMove: 5,
				shortElementMove: 15,
				scroll: 16,
				randomMove: 14,
				microMove: 4,
				goingBeyond: 2,
				moveAlongText: 4,
				removeCursorFromTarget: 0,
				returnCursorToTarget: 0,
				removeAndReturnCursorToTarget: 0,
				returnAndRemoveCursorFromTarget: 0,
				scrollAndReturnToTarget: 0
			},
			medium: {
				sleep: 40,
				longElementMove: 7,
				shortElementMove: 17,
				scroll: 20,
				randomMove: 9,
				microMove: 3,
				goingBeyond: 1,
				moveAlongText: 3,
				removeCursorFromTarget: 0,
				returnCursorToTarget: 0,
				removeAndReturnCursorToTarget: 0,
				returnAndRemoveCursorFromTarget: 0,
				scrollAndReturnToTarget: 0
			},
			high: {
				sleep: 40,
				longElementMove: 7,
				shortElementMove: 17,
				scroll: 22,
				randomMove: 7,
				microMove: 3,
				goingBeyond: 1,
				moveAlongText: 3,
				removeCursorFromTarget: 0,
				returnCursorToTarget: 0,
				removeAndReturnCursorToTarget: 0,
				returnAndRemoveCursorFromTarget: 0,
				scrollAndReturnToTarget: 0
			}
		},
		medium: {
			low: {
				sleep: 32,
				longElementMove: 12,
				shortElementMove: 12,
				scroll: 20,
				randomMove: 14,
				microMove: 4,
				goingBeyond: 2,
				moveAlongText: 4,
				removeCursorFromTarget: 0,
				returnCursorToTarget: 0,
				removeAndReturnCursorToTarget: 0,
				returnAndRemoveCursorFromTarget: 0,
				scrollAndReturnToTarget: 0
			},
			medium: {
				sleep: 32,
				longElementMove: 14,
				shortElementMove: 14,
				scroll: 24,
				randomMove: 9,
				microMove: 3,
				goingBeyond: 1,
				moveAlongText: 3,
				removeCursorFromTarget: 0,
				returnCursorToTarget: 0,
				removeAndReturnCursorToTarget: 0,
				returnAndRemoveCursorFromTarget: 0,
				scrollAndReturnToTarget: 0
			},
			high: {
				sleep: 32,
				longElementMove: 14,
				shortElementMove: 14,
				scroll: 26,
				randomMove: 7,
				microMove: 3,
				goingBeyond: 1,
				moveAlongText: 3,
				removeCursorFromTarget: 0,
				returnCursorToTarget: 0,
				removeAndReturnCursorToTarget: 0,
				returnAndRemoveCursorFromTarget: 0,
				scrollAndReturnToTarget: 0
			}
		},
		high: {
			low: {
				sleep: 24,
				longElementMove: 19,
				shortElementMove: 9,
				scroll: 24,
				randomMove: 14,
				microMove: 4,
				goingBeyond: 2,
				moveAlongText: 4,
				removeCursorFromTarget: 0,
				returnCursorToTarget: 0,
				removeAndReturnCursorToTarget: 0,
				returnAndRemoveCursorFromTarget: 0,
				scrollAndReturnToTarget: 0
			},
			medium: {
				sleep: 24,
				longElementMove: 21,
				shortElementMove: 11,
				scroll: 28,
				randomMove: 9,
				microMove: 3,
				goingBeyond: 1,
				moveAlongText: 3,
				removeCursorFromTarget: 0,
				returnCursorToTarget: 0,
				removeAndReturnCursorToTarget: 0,
				returnAndRemoveCursorFromTarget: 0,
				scrollAndReturnToTarget: 0
			},
			high: {
				sleep: 24,
				longElementMove: 21,
				shortElementMove: 11,
				scroll: 30,
				randomMove: 7,
				microMove: 3,
				goingBeyond: 1,
				moveAlongText: 3,
				removeCursorFromTarget: 0,
				returnCursorToTarget: 0,
				removeAndReturnCursorToTarget: 0,
				returnAndRemoveCursorFromTarget: 0,
				scrollAndReturnToTarget: 0
			}
		},
		pauseBeforeEllClick: {
			low: {
				sleep: 60,
				removeAndReturnCursorToTarget: 40
			},
			medium: {
				sleep: 65,
				removeAndReturnCursorToTarget: 35
			},
			high: {
				sleep: 70,
				removeAndReturnCursorToTarget: 30
			}
		},
		pauseBeforeCoordClick: {
			low: {
				sleep: 1
			},
			medium: {
				sleep: 1
			},
			high: {
				sleep: 1
			}
		},
		pauseAfterClick: {
			low: {
				sleep: 30,
				removeCursorFromTarget: 18,
				removeAndReturnCursorToTarget: 18,
				scrollAndReturnToTarget: 18,
				microMove: 15
			},
			medium: {
				sleep: 40,
				removeCursorFromTarget: 16,
				removeAndReturnCursorToTarget: 16,
				scrollAndReturnToTarget: 16,
				microMove: 10
			},
			high: {
				sleep: 50,
				removeCursorFromTarget: 14,
				removeAndReturnCursorToTarget: 14,
				scrollAndReturnToTarget: 14,
				microMove: 7
			}
		},
		pauseAfterClickWithWait: {
			low: {
				sleep: 30,
				removeCursorFromTarget: 27,
				removeAndReturnCursorToTarget: 27,
				microMove: 15
			},
			medium: {
				sleep: 40,
				removeCursorFromTarget: 25,
				removeAndReturnCursorToTarget: 25,
				microMove: 10
			},
			high: {
				sleep: 50,
				removeCursorFromTarget: 21,
				removeAndReturnCursorToTarget: 21,
				microMove: 7
			}
		},
		typeStutter: {
			low: {
				sleep: 30,
				removeCursorFromTarget: 27,
				returnAndRemoveCursorFromTarget: 27,
				microMove: 15
			},
			medium: {
				sleep: 40,
				removeCursorFromTarget: 25,
				returnAndRemoveCursorFromTarget: 25,
				microMove: 10
			},
			high: {
				sleep: 50,
				removeCursorFromTarget: 21,
				returnAndRemoveCursorFromTarget: 21,
				microMove: 7
			}
		}
	};
	
	config.sleep = {
		disable: 0,
		low: {
			min: 500,
			max: 2500
		},
		medium: {
			min: 1000,
			max: 5000
		},
		high: {
			min: 2000,
			max: 7000
		}
	};
	
	config.delay = {
		disable: {
			chance: 0
		},
		low: {
			chance: 70,
			min: 50,
			max: 300
		},
		medium: {
			chance: 80,
			min: 100,
			max: 500
		},
		high: {
			chance: 90,
			min: 150,
			max: 700
		}
	};
	
	config.pause = {
		low: {
			min: 250,
			max: 450
		},
		medium: {
			min: 350,
			max: 650
		},
		high: {
			min: 550,
			max: 850
		}
	};
	
	config.mouseSpeed = {
		low: {
			min: 80,
			max: 100
		},
		medium: {
			min: 90,
			max: 110
		},
		high: {
			min: 100,
			max: 120
		}
	};
	
	config.scrollSpeed = {
		low: 80,
		medium: 90,
		high: 100
	};
	
	config.miss = {
		disable: {
			chance: 0
		},
		def: null,
		low: {
			chance: 1,
			distance: {
				min: 2,
				max: 8
			},
			maxArea: 0
		},
		medium: {
			chance: 5,
			distance: {
				min: 4,
				max: 10
			},
			maxArea: 0
		},
		high: {
			chance: 10,
			distance: {
				min: 6,
				max: 12
			},
			maxArea: 0
		}
	};
	
	config.filters = {
		def: {},
		all: {},
		link: {
			tag: ['a','button']
		},
		input: {
			tag: ['input','textarea','select']
		},
		clickable: [
			{
				tag: ['a','button','input','textarea','select']
			},
			{
				cursor: ['pointer']
			},
			{
				onclick: true
			},
			{
				onchange: true
			}
		],
		header: {
			tag: ['h1','h2','h3','h4','h5','h6']
		},
		text: [
			{
				tag: ['p','b','li','strong','em','mark','small','del','ins','sub','sup']
			},
			{
				tag: ['i'],
				classExist: false
			}
		],
		image: {
			tag: ['img','image','video']
		},
		icon: {
			tag: ['i'],
			classExist: true
		}
	};
	
	config.scroll = {
		low: {
			direction: 'randomtoend',
			distance: {
				min: 200,
				max: 600
			},
			pause: {
				min: 100,
				max: 500
			},
			move: {
				chance: 0.1,
				in_scroll_direction: true,
				beyond: 'random',
				min_distance: 1,
				max_distance: 25,
				gravity: 5,
				deviation: 3
			}
		},
		medium: {
			direction: 'randomtoend',
			distance: {
				min: 400,
				max: 900
			},
			pause: {
				min: 100,
				max: 400
			},
			move: {
				chance: 0.2,
				in_scroll_direction: true,
				beyond: 'random',
				min_distance: 5,
				max_distance: 35,
				gravity: 6,
				deviation: 2.5
			}
		},
		high: {
			direction: 'randomtoend',
			distance: {
				min: 600,
				max: 1200
			},
			pause: {
				min: 100,
				max: 300
			},
			move: {
				chance: 0.3,
				in_scroll_direction: true,
				beyond: 'random',
				min_distance: 10,
				max_distance: 50,
				gravity: 7,
				deviation: 2
			}
		}
	};
	
	config.randomMove = {
		low: {
			count: {
				min: 1,
				max: 1
			},
			scalableSpeed: true,
			gravity: 5,
			deviation: 3
		},
		medium: {
			count: {
				min: 1,
				max: 2
			},
			scalableSpeed: true,
			gravity: 6,
			deviation: 2.5
		},
		high: {
			count: {
				min: 2,
				max: 3
			},
			scalableSpeed: true,
			gravity: 7,
			deviation: 2
		}
	};
	
	config.microMove = {
		low: {
			count: {
				min: 1,
				max: 3
			},
			distance: {
				min: 0,
				max: 10
			},
			speed: {
				min: 80,
				max: 100
			},
			scalableSpeed: false,
			gravity: 7,
			deviation: 2
		},
		medium: {
			count: {
				min: 2,
				max: 4
			},
			distance: {
				min: 0,
				max: 8
			},
			speed: {
				min: 80,
				max: 100
			},
			scalableSpeed: false,
			gravity: 7,
			deviation: 2
		},
		high: {
			count: {
				min: 3,
				max: 5
			},
			distance: {
				min: 0,
				max: 6
			},
			speed: {
				min: 80,
				max: 100
			},
			scalableSpeed: false,
			gravity: 7,
			deviation: 2
		}
	};
	
	config.elementMove = {
		def: {
			mode: 'random',
			count: {
				min: 1,
				max: 3
			},
			maxDistance: 0,
			scalableSpeed: true,
			gravity: 6,
			deviation: 2.5
		}
	};
	
	config.longElementMove = {
		low: {
			mode: 'random',
			count: {
				min: 1,
				max: 2
			},
			maxDistance: 0.35,
			scalableSpeed: true,
			gravity: 5,
			deviation: 3
		},
		medium: {
			mode: 'random',
			count: {
				min: 1,
				max: 3
			},
			maxDistance: 0.5,
			scalableSpeed: true,
			gravity: 6,
			deviation: 2.5
		},
		high: {
			mode: 'random',
			count: {
				min: 2,
				max: 4
			},
			maxDistance: 0.8,
			scalableSpeed: true,
			gravity: 7,
			deviation: 2
		}
	};
	
	config.shortElementMove = {
		low: {
			mode: 'random',
			count: {
				min: 1,
				max: 2
			},
			maxDistance: 0.20,
			scalableSpeed: true,
			gravity: 5,
			deviation: 3
		},
		medium: {
			mode: 'random',
			count: {
				min: 1,
				max: 3
			},
			maxDistance: 0.25,
			scalableSpeed: true,
			gravity: 6,
			deviation: 2.5
		},
		high: {
			mode: 'random',
			count: {
				min: 2,
				max: 4
			},
			maxDistance: 0.35,
			scalableSpeed: true,
			gravity: 7,
			deviation: 2
		}
	};
	
	config.onOneEll = {
		disable: {
			chance: 0
		},
		low: {
			chance: 30,
			minSize: 0.20,
			sort: true,
			count: {
				min: 2,
				max: 3
			}
		},
		medium: {
			chance: 40,
			minSize: 0.20,
			sort: false,
			count: {
				min: 2,
				max: 3
			}
		},
		high: {
			chance: 50,
			minSize: 0.20,
			sort: false,
			count: {
				min: 2,
				max: 4
			}
		}
	};
	
	config.maxRepeatSkip = {
		def: -1
	};
	
	config.hoverMode = {
		def: 'randomorcenter',
		random: 'random',
		tocenter: 'tocenter',
		randomorcenter: 'randomorcenter', 
		center: 'center',
		top: 'top',
		bottom: 'bottom',
		left: 'left',
		righ: 'right',
		nearest: 'nearest'
	};
	
	config.overlapByPoints = {
		def: 2
	};
	
	config.reverseScroll = {
		disable: 0,
		low: 2,
		medium: 5,
		high: 10
	};
	
	config.targetTime = {
		disable: 0,
		def: {
			min: 1,
			max: 3
		},
		short: {
			min: 1,
			max: 3
		},
		medium: {
			min: 5,
			max: 9
		},
		long: {
			min: 11,
			max: 15
		}
	};
	
	config.targetScroll = {
		disable: null,
		low: {
			targetInCenter: 'random',
			pause: {
				min: 100,
				max: 500
			},
			move: {
				chance: 0.1,
				in_scroll_direction: true,
				beyond: "avoid",
				min_distance: 1,
				max_distance: 25,
				gravity: 5,
				deviation: 3
			},
			reverseScroll: {
				chance: 10,
				minDistance: 1000,
				distance: {
					min: 100,
					max: 500
				}
			},
			emulation: {
				min: 20,
				max: 30
			}
		},
		medium: {
			targetInCenter: 'random',
			pause: {
				min: 100,
				max: 400
			},
			move: {
				chance: 0.2,
				in_scroll_direction: true,
				beyond: "avoid",
				min_distance: 5,
				max_distance: 35,
				gravity: 6,
				deviation: 2.5
			},
			reverseScroll: {
				chance: 15,
				minDistance: 1000,
				distance: {
					min: 300,
					max: 800
				}
			},
			emulation: {
				min: 20,
				max: 30
			}
		},
		high: {
			targetInCenter: 'random',
			pause: {
				min: 100,
				max: 300
			},
			move: {
				chance: 0.3,
				in_scroll_direction: true,
				beyond: "avoid",
				min_distance: 10,
				max_distance: 50,
				gravity: 7,
				deviation: 2
			},
			reverseScroll: {
				chance: 20,
				minDistance: 1000,
				distance: {
					min: 600,
					max: 1200
				}
			},
			emulation: {
				min: 20,
				max: 30
			}
		}
	};
	
	config.targetCompare = {
		disable: null,
		low: {
			time: 60000,
			random: {
				start: 0,
				min: 5,
				max: 10,
				multiplier: 1,
				time: {
					min: 35,
					max: 70
				}
			},
			rules: [
				{distance: 100, time: 0},
				{distance: 0.1, time: 0.1},
				{distance: 0.2, time: 0.15},
				{distance: 0.3, time: 0.2},
				{distance: 0.4, time: 0.3},
				{distance: 0.5, time: 0.4},
				{distance: 0.6, time: 0.5},
				{distance: 0.7, time: 0.6},
				{distance: 0.8, time: 0.7},
				{distance: 0.9, time: 0.8},
				{distance: 1, time: 0.9}
			]
		},
		medium: {
			time: 60000,
			random: {
				start: 5,
				min: 10,
				max: 15,
				multiplier: 1,
				time: {
					min: 35,
					max: 70
				}
			},
			rules: [
				{distance: 0, time: 0},
				{distance: 100, time: 0},
				{distance: 0.1, time: 0.1},
				{distance: 0.2, time: 0.15},
				{distance: 0.3, time: 0.2},
				{distance: 0.4, time: 0.3},
				{distance: 0.5, time: 0.4},
				{distance: 0.6, time: 0.5},
				{distance: 0.7, time: 0.6},
				{distance: 0.8, time: 0.7},
				{distance: 0.9, time: 0.8},
				{distance: 1, time: 0.9}
			]
		},
		high: {
			time: 60000,
			random: {
				start: 5,
				min: 15,
				max: 25,
				multiplier: 1,
				time: {
					min: 35,
					max: 70
				}
			},
			rules: [
				{distance: 100, time: 0},
				{distance: 0.1, time: 0.1},
				{distance: 0.2, time: 0.15},
				{distance: 0.3, time: 0.2},
				{distance: 0.4, time: 0.3},
				{distance: 0.5, time: 0.4},
				{distance: 0.6, time: 0.5},
				{distance: 0.7, time: 0.6},
				{distance: 0.8, time: 0.7},
				{distance: 0.9, time: 0.8},
				{distance: 1, time: 0.9}
			]
		}
	};
	
	config.multiplier = {
		short: 0.5,
		medium: 0.75,
		long: 1
	};
	
	config.goingBeyond = {
		low: {
			up: 47,
			right: 5,
			down: 47,
			left: 1,
			distance: {
				min: 100,
				max: 300
			},
			scalableSpeed: true,
			gravity: 5,
			deviation: 3
		},
		medium: {
			up: 47,
			right: 5,
			down: 47,
			left: 1,
			distance: {
				min: 300,
				max: 600
			},
			scalableSpeed: true,
			gravity: 6,
			deviation: 2.5
		},
		high: {
			up: 47,
			right: 5,
			down: 47,
			left: 1,
			distance: {
				min: 600,
				max: 900
			},
			scalableSpeed: true,
			gravity: 7,
			deviation: 2
		}
	};
	
	config.moveAlongText = {
		low: {
			minLength: 50,
			speed: {
				min: 80,
				max: 90
			},
			scalableSpeed: false,
			gravity: 7,
			deviation: 2
		},
		medium: {
			minLength: 40,
			speed: {
				min: 90,
				max: 100
			},
			scalableSpeed: false,
			gravity: 7,
			deviation: 2
		},
		high: {
			minLength: 35,
			speed: {
				min: 100,
				max: 110
			},
			scalableSpeed: false,
			gravity: 7,
			deviation: 2
		}
	};
	
	config.typeStutter = {
		disable: {
			chance: 0
		},
		low: {
			chance: 10,
			minLength: 2,
			interval: {
				up: {
					min: 5,
					max: 10
				},
				down: {
					min: 5,
					max: 15
				}
			},
			delay: {
				before: {
					min: 300,
					max: 800
				},
				after: {
					min: 200,
					max: 500
				}
			}
		},
		medium: {
			chance: 15,
			minLength: 2,
			interval: {
				up: {
					min: 5,
					max: 10
				},
				down: {
					min: 7,
					max: 25
				}
			},
			delay: {
				before: {
					min: 300,
					max: 800
				},
				after: {
					min: 200,
					max: 500
				}
			}
		},
		high: {
			chance: 20,
			minLength: 2,
			interval: {
				up: {
					min: 5,
					max: 15
				},
				down: {
					min: 10,
					max: 35
				}
			},
			delay: {
				before: {
					min: 300,
					max: 800
				},
				after: {
					min: 200,
					max: 500
				}
			}
		}
	};
	
	config.removeCursorFromTarget = {
		low: {
			distance: {
				min: 1,
				max: 3
			},
			scalableSpeed: true,
			gravity: 5,
			deviation: 3
		},
		medium: {
			distance: {
				min: 1,
				max: 4
			},
			scalableSpeed: true,
			gravity: 6,
			deviation: 2.5
		},
		high: {
			distance: {
				min: 1,
				max: 5
			},
			scalableSpeed: true,
			gravity: 7,
			deviation: 2
		}
	};
	
	config.returnCursorToTarget = {
		low: {
			scalableSpeed: true,
			gravity: 5,
			deviation: 3
		},
		medium: {
			scalableSpeed: true,
			gravity: 6,
			deviation: 2.5
		},
		high: {
			scalableSpeed: true,
			gravity: 7,
			deviation: 2
		}
	};
	
	config.removeAndReturnCursorToTarget = {
		low: {
			distance: {
				min: 1,
				max: 3
			},
			scalableSpeed: true,
			gravity: 5,
			deviation: 3,
			delay: {
				min: 50,
				max: 300
			}
		},
		medium: {
			distance: {
				min: 1,
				max: 4
			},
			scalableSpeed: true,
			gravity: 6,
			deviation: 2.5,
			delay: {
				min: 100,
				max: 500
			}
		},
		high: {
			distance: {
				min: 1,
				max: 5
			},
			scalableSpeed: true,
			gravity: 7,
			deviation: 2,
			delay: {
				min: 150,
				max: 700
			}
		}
	};
	
	config.returnAndRemoveCursorFromTarget = {
		low: {
			distance: {
				min: 1,
				max: 3
			},
			scalableSpeed: true,
			gravity: 5,
			deviation: 3,
			delay: {
				min: 50,
				max: 300
			}
		},
		medium: {
			distance: {
				min: 1,
				max: 4
			},
			scalableSpeed: true,
			gravity: 6,
			deviation: 2.5,
			delay: {
				min: 100,
				max: 500
			}
		},
		high: {
			distance: {
				min: 1,
				max: 5
			},
			scalableSpeed: true,
			gravity: 7,
			deviation: 2,
			delay: {
				min: 150,
				max: 700
			}
		}
	};
	
	config.scrollAndReturnToTarget = {
		low: {
			direction: 'randomtoend',
			targetInCenter: 'enable',
			distance: {
				min: 200,
				max: 600
			},
			pause: {
				min: 100,
				max: 500
			},
			move: {
				chance: 0.1,
				in_scroll_direction: true,
				beyond: 'random',
				min_distance: 1,
				max_distance: 25,
				gravity: 5,
				deviation: 3
			},
			delay: {
				min: 250,
				max: 550
			}
		},
		medium: {
			direction: 'randomtoend',
			targetInCenter: 'enable',
			distance: {
				min: 400,
				max: 900
			},
			pause: {
				min: 100,
				max: 400
			},
			move: {
				chance: 0.2,
				in_scroll_direction: true,
				beyond: 'random',
				min_distance: 5,
				max_distance: 35,
				gravity: 6,
				deviation: 2.5
			},
			delay: {
				min: 400,
				max: 700
			}
		},
		high: {
			direction: 'randomtoend',
			targetInCenter: 'enable',
			distance: {
				min: 600,
				max: 1200
			},
			pause: {
				min: 100,
				max: 300
			},
			move: {
				chance: 0.3,
				in_scroll_direction: true,
				beyond: 'random',
				min_distance: 10,
				max_distance: 50,
				gravity: 7,
				deviation: 2
			},
			delay: {
				min: 500,
				max: 800
			}
		}
	};
	
})(_Idle);