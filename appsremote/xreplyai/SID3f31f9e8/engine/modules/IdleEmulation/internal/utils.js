(function(idle){
	const util = idle.util;
	const info = idle.info;
	
	util.setAction = function(action){		
		if(_is_nilb(action)){
			info.lastAction = '_Idle';
		}else{
			info.lastAction = '_Idle.' + action;
		};
	};
	
	util.trFormat = function(args){
		return _tr_format.apply(null, args);
	};
	
	util.fail = function(){
		fail(info.lastAction + ': ' + util.trFormat(arguments));
	};
	
	util.validateArg = function(arg, validator, name){
		return _validate.argument(arg, validator, name, util.fail);
	};

	util.validateArgs = function(args, schema){
		return _validate.arguments(args, schema, util.fail);
	};
	
	util.log = function(){
		if(idle._debug){			
			_info('[Idle debug] ' + util.trFormat(arguments));
		};
	};
	
	util.sleep = function(){
		var ms = _function_argument("ms");
		
		if(ms <= 0){
			_function_return();
			return;
		};
		
		sleep(ms)!
	};
	
	util.execute = function(){
		var script = _function_argument("script");
		var params = _function_argument("params") || {};
		
		page().script2(script, JSON.stringify(params))!
		var executionResult = JSON.parse(_result());
		
		if(!executionResult.is_success){
			_Idle.util.fail(executionResult.error);
		};
		
		_function_return(JSON.parse(executionResult.variables));
	};
	
	util.executeOn = function(){
		var selector = _function_argument("selector");
		var script = _function_argument("script");
		var params = _function_argument("params") || {};
		
		(
			typeof(selector) == "string" ?
			get_element_selector(selector, false) :
			selector
		).script2(script, JSON.stringify(params))!
		var executionResult = JSON.parse(_result());
		
		if(!executionResult.is_success){
			_Idle.util.fail(executionResult.error);
		};
		
		_function_return(JSON.parse(executionResult.variables));
	};
	
	util.get = function(){
		var script = _function_argument("script");
		
		page().script(script)!
		
		_function_return(_result());
	};
	
	util.getScreenSettings = function(){
		_get_browser_screen_settings()!
		var screen = JSON.parse(_result());
		
		_function_return({
			cursor: {
				x: screen["CursorX"],
				y: screen["CursorY"]
			},
			scroll: {
				x: screen["ScrollX"],
				y: screen["ScrollY"]
			},
			width: screen["Width"],
			height: screen["Height"]
		});
	};
	
	util.getRandomItem = function(items){
		return items[rand(0, items.length - 1)];
	};
	
	util.fillList = function(list, value, count){
		for(var i = 0; i < count; ++i){
			list.push(value);
		};
	};
	
	util.shuffleList = function(list){
		for (var i = list.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = list[i];
			list[i] = list[j];
			list[j] = temp;
		};
	};
	
	util.getRandomAction = function(actions, skip){		
		var list = []
		
		for(var i = 0; i < actions.length; ++i){
			var action = actions[i];
			if(skip && skip.indexOf(action.name) > -1){
				continue;
			};
			util.fillList(list, action, action.chance);
		};
		
		util.shuffleList(list);
		
		return util.getRandomItem(list);
	};
	
	util.cutRandomItem = function(items){
		return items.splice(rand(0, items.length - 1), 1)[0];
	};
	
	util.correctCoord = function(coord, screen){
		if(coord.x > screen.width){
			coord.x = screen.width;
		}else if(coord.x < 0){
			coord.x = 0;
		};
		
		if(coord.y > screen.height){
			coord.y = screen.height;
		}else if(coord.y < 0){
			coord.y = 0;
		};
		
		return coord;
	};
	
	util.getCenterPos = function(a, b){
		var pos = 0;
		for(var i = 0; i < 10; ++i){
			pos += Math.random() * ((b - 2 - a + 1) / 10);
		};
		pos = Math.floor(pos) + a + 1;
		if(pos > b - 1){
			pos = b - 1;
		};
		if (pos < a + 1){
			pos = a + 1;
		};
		return pos;
	};
	
	util.getRandomCoord = function(ell, cursor, mode){
		var coords = [];
		var parts = [ [0.1, 0.3], [0.3, 0.6], [0.6, 0.9] ];
		if(Array.isArray(mode)){
			mode = util.getRandomItem(mode);
		};
		var minPadding = Math.min(Math.round(ell.width * 0.2), Math.round(ell.height * 0.2));
		var quarterWidth = Math.round(ell.width * 0.25);
		var maxWidth = Math.round(ell.width - minPadding);
		var quarterHeight = Math.round(ell.height * 0.25);
		var maxHeight = Math.round(ell.height - minPadding);
		if(['random', 'center'].indexOf(mode) > -1){
			var point1 = {x: ell.x + minPadding, y: ell.y + minPadding};
			var point2 = {x: ell.x + maxWidth, y: ell.y + maxHeight};
			var func = mode == 'random' ? rand : util.getCenterPos;
			for(var i = 0; i < 3; ++i){
				coords.push({
					x: func(point1.x, point2.x),
					y: func(point1.y, point2.y)
				});
			};
		}else if(['top', 'bottom'].indexOf(mode) > -1){
			parts.forEach(function(part){
				var padding = rand(minPadding, quarterHeight);
				coords.push({
					x: ell.x + rand(Math.max(minPadding, Math.round(ell.width * part[0])), Math.min(maxWidth, Math.round(ell.width * part[1]))),
					y: mode == 'top' ? ell.y + padding : ell.y + ell.height - padding
				});
			});
		}else if(['left', 'right'].indexOf(mode) > -1){
			parts.forEach(function(part){
				var padding = rand(minPadding, quarterWidth);
				coords.push({
					x: mode == 'left' ? ell.x + padding : ell.x + ell.width - padding,
					y: ell.y + rand(Math.max(minPadding, Math.round(ell.height * part[0])), Math.min(maxHeight, Math.round(ell.height * part[1])))
				});
			});
		}else if(mode == 'nearest'){
			['top', 'bottom', 'left', 'right', 'random', 'center'].forEach(function(curMode){
				coords.push(util.getRandomCoord(ell, cursor, curMode));
			});
		};
		
		if(['left', 'right'].indexOf(mode) > -1 && rand(0, 1) == 0){
			return coords[1];
		};
		
		var minDistance = null;
		var finalCoord = null;
		coords.forEach(function(coord){
			var distance = util.getDistance(cursor, coord);
			if(minDistance == null || distance < minDistance){
				minDistance = distance;
				finalCoord = coord;
			};
		});
		
		return finalCoord;
	};
	
	util.hypot = function(x, y){
		return Math.sqrt(x * x + y * y)
	};
	
	util.randomRange = function(range){
		if(typeof range=="number"){
			return range;
		};
		if(!range.hasOwnProperty('min') && !range.hasOwnProperty('max')){
			return 0;
		};
		if(range.hasOwnProperty('min') && !range.hasOwnProperty('max')){
			return range.min;
		};
		if(!range.hasOwnProperty('min') && range.hasOwnProperty('max')){
			return range.max;
		};
		return rand(range.min, range.max);
	};
	
	util.getAvg = function(range){
		if(typeof range=="number"){
			return range;
		};
		if(!range.hasOwnProperty('min') && !range.hasOwnProperty('max')){
			return 0;
		};
		if(range.hasOwnProperty('min') && !range.hasOwnProperty('max')){
			return range.min;
		};
		if(!range.hasOwnProperty('min') && range.hasOwnProperty('max')){
			return range.max;
		};
		return (range.min + range.max) / 2;
	};
	
	util.randomSign = function(){
		return (rand(0, 1) == 0 ? 1 : -1);
	};
	
	util.currentUrl = function(){
		url()!
		_function_return(_result());
	};
	
	util.getCenter = function(ell){
		return ('width' in ell && 'height' in ell) ? {x: (ell.x + (ell.width / 2)), y: (ell.y + (ell.height / 2))} : {x: ell.x, y: ell.y};
	};
	
	util.getDistance = function(ellOne, ellTwo){
		return util.hypot(ellOne.x - ellTwo.x, ellOne.y - ellTwo.y);
	};
	
	util.getSides = function(ell, cursor){
		var sides = [];
		
		if(cursor.x < ell.x){
			sides.push('left');
		};
		
		if(cursor.x > ell.x + ell.width){
			sides.push('right');
		};
		
		if(cursor.y < ell.y){
			sides.push('top');
		};
		
		if(cursor.y > ell.y + ell.height){
			sides.push('bottom');
		};
		
		return sides;
	};
	
	util.calcCoordFromRandomSide = function(ell, sides, distance){
		var side = util.getRandomItem(sides);
		var coord = {x: rand(ell.x, ell.x + ell.width), y: rand(ell.y, ell.y + ell.height)};
		
		if(side == 'left'){
			coord.x = ell.x - distance;
		}else if(side == 'right'){
			coord.x = ell.x + ell.width + distance;
		}else if(side == 'top'){
			coord.y = ell.y - distance;
		}else{
			coord.y = ell.y + ell.height + distance;
		};
		
		return coord;
	};
	
	util.getAngles = function(ell){
		var angles = [{x: ell.x, y: ell.y}];
		if('width' in ell && 'height' in ell){
			angles.push({x: ell.x + ell.width, y: ell.y});
			angles.push({x: ell.x, y: ell.y + ell.height});
			angles.push({x: ell.x + ell.width, y: ell.y + ell.height});
		};
		return angles;
	};
	
	util.isRelatedElls = function(one, two){
		for(var i in two){
			var angle = two[i];
			if(one[0].x <= angle.x && angle.x <= one[1].x && one[0].y <= angle.y && angle.y <= one[2].y){
				return true;
			};
		};
		return false;
	};
	
	util.directDistance = function(ell, angles){
		if(angles[0].x <= ell.x && ell.x <= angles[1].x){
			if(ell.y < angles[0].y){
				return angles[0].y - ell.y; //top
			};
			
			if(ell.y > angles[2].y){
				return ell.y - angles[2].y; //bottom
			};
		};
		
		if(angles[0].y <= ell.y && ell.y <= angles[2].y){
			if(ell.x < angles[0].x){
				return angles[0].x - ell.x; //left
			};
			
			if(ell.x > angles[1].x){
				return ell.x - angles[1].x; //right
			};
		};
		
		return null;
	};
	
	util.calcDistance = function(ellOne, ellTwo){
		var one = util.getAngles(ellOne);
		var two = util.getAngles(ellTwo);
		var oneIsEll = one.length == 4;
		var twoIsEll = two.length == 4;
		var minDistance = null;
		
		if((ellOne.x == ellTwo.x && ellOne.y == ellTwo.y) || (oneIsEll && util.isRelatedElls(one, two)) || (twoIsEll && util.isRelatedElls(two, one))){
			return 0;
		};
		
		if(oneIsEll && twoIsEll){
			if((ellOne.x <= ellTwo.x && ellTwo.x <= one[1].x) || (ellTwo.x <= ellOne.x && ellOne.x <= two[1].x)){
				if(ellTwo.y < ellOne.y){
					return ellOne.y - two[2].y; //top
				};
				
				if(ellTwo.y > one[2].y){
					return ellTwo.y - one[2].y; //bottom
				};
			};
			
			if((ellOne.y <= ellTwo.y && ellTwo.y <= one[2].y) || (ellTwo.y <= ellOne.y && ellOne.y <= two[2].y)){
				if(ellTwo.x < ellOne.x){
					return ellOne.x - two[1].x; //left
				};
				
				if(ellTwo.x > one[1].x){
					return ellTwo.x - one[1].x; //right
				};
			};
		}else if(oneIsEll && !twoIsEll){
			minDistance = util.directDistance(ellTwo, one);
		}else if(!oneIsEll && twoIsEll){
			minDistance = util.directDistance(ellOne, two);
		};
		
		if(minDistance != null){
			return minDistance;
		};
		
		one.forEach(function(angleOne){
			two.forEach(function(angleTwo){
				var distance = util.getDistance(angleOne, angleTwo);
				if(minDistance == null || distance < minDistance){
					minDistance = distance;
				};
			});
		});
		
		return minDistance;
	};
	
	util.parseText = function(text){
		var specials = [
			'<CONTROL>', // Ctrl
			'<MENU>', // Alt
			'<SHIFT>', // Shift
			'<BACK>', // Backspace
			'<TAB>', // Tab
			'<RETURN>', // Enter
			'<ESCAPE>', // Escape
			'<PRIOR>', // Page up
			'<NEXT>', // Page down
			'<END>', // End
			'<HOME>', // Home
			'<LEFT>', // Left
			'<UP>', // Up
			'<RIGHT>', // Right
			'<DOWN>', // Down
			'<INSERT>', // Insert
			'<DELETE>', // Delete
			'<MOUSESCROLLUP>', // Mouse wheel up
			'<MOUSESCROLLDOWN>' // Mouse wheel down
		];
		
		var parts = [text];
		
		specials.forEach(function(key){
			for(var i = 0; i < parts.length; ++i){
				var part = parts[i];
				var start = part.indexOf(key);
				if(start > -1){
					var end = start + key.length;
					if(key == '<CONTROL>' && ['a', 'c', 'v'].indexOf((part[end] || '').toLowerCase()) > -1){
						++end;
					};
					var args = [i, 1];
					if(start > 0){
						args.push(part.slice(0, start));
						++i;
					};
					if(end < part.length){
						args.push(part.slice(start, end), part.slice(end));
					}else{
						args.push(part.slice(start));
					};
					Array.prototype.splice.apply(parts, args);
				};
			};
		});
		
		var lastIsSpecial = false;
		
		for(var i = parts.length - 1; i > -1; --i){
			var part = parts[i];
			if(specials.indexOf(part) > -1 || part.indexOf('<CONTROL>') == 0){
				if(lastIsSpecial){
					parts.splice(i, 2, part + parts[i + 1]);
				};
				lastIsSpecial = true;
			}else{
				Array.prototype.splice.apply(parts, [i, 1].concat(part.split('')));
				lastIsSpecial = false;
			};
		};
		
		return parts;
	};
	
	util.calcTypeInterval = function(initial, current, params){
		var maxInterval = initial + Math.ceil(initial * (params.up.max / 100)) || 0;
		var minInterval = initial - Math.ceil(initial * (params.down.max / 100)) || 0;
		var sign = '+';
		if(current >= maxInterval){
			sign = '-';
		}else if(current <= minInterval){
			sign = '+';
		}else{
			sign = rand(0, 1) == 0 ? '+' : '-';
		};
		
		if(sign == '+'){
			current += Math.ceil(initial * (util.randomRange(params.up) / 100));
			current = Math.min(current, maxInterval);
		}else{
			current -= Math.ceil(initial * (util.randomRange(params.down) / 100));
			current = Math.max(current, minInterval);
		};
		
		return current;
	};
	
})(_Idle);