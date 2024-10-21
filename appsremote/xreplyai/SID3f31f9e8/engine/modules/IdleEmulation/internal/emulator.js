(function(idle){
	const util = idle.util;
	const info = idle.info;

	idle._emulator = function(options){
		const self = this;
		
		if(options instanceof idle._emulator){
			return options;
		};
		
		if(!(this instanceof idle._emulator)){
			return new idle._emulator(options);
		};
		
		if(options.actions.length == 0){
			util.fail('No action selected to perform');
		};
		
		this.isFirst = true;
		this.disableScroll = false;
		this.actions = options.actions;
		this.isGeneral = options.isGeneral;
		
		this.emulationStart = Date.now();
		this.emulationTime = typeof options.time == "object" ? util.randomRange(options.time) : options.time;
		this.emulationEnd = self.emulationStart + (self.emulationTime * 1000);
		
		this._sleep = idle.getSetting('sleep', options.sleep);
		this._delay = idle.getSetting('delay', options.delay);
		this._onOneEll = idle.getSetting('onOneEll', options.onOneEll);
		this._microMove = idle.getSetting('microMove', options.microMove);
		this._filters = idle.getSetting('filters', options.filters);
		this._miss = idle.getSetting('miss', options.miss);
		this._hoverMode = idle.getSetting('hoverMode', options.hoverMode);
		this._overlapByPoints = idle.getSetting('overlapByPoints', options.overlapByPoints);
		this._reverseScroll = idle.getSetting('reverseScroll', options.reverseScroll);
		
		
		this.target = {
			has: false,
			value: null,
			delay: null,
			scroll: null,
			compare: null,
			checked: false
		};
		
		this.repeat = {
			skip: false,
			max: 0,
			ells: []
		};
		
		this.mouse = {
			x: 0,
			y: 0,
			speed: idle.getSetting('mouseSpeed', options.mouseSpeed)
		};
		
		this._scroll = {
			x: 0,
			y: 0,
			direction: null,
			speed: idle.getSetting('scrollSpeed', options.scrollSpeed)
		};
		
		this.width = 0;
		this.height = 0;
		this.diagonal = 0;
		
		this.setTime = function(params){
			self.isFirst = true;
			self.emulationStart = Date.now();
			self.emulationTime = typeof params == "object" ? util.randomRange(params) : params;
			self.emulationEnd = self.emulationStart + (self.emulationTime * 1000);
		};
		
		this.setSleep = function(params){
			self._sleep = idle.getSetting('sleep', params);
		};
		
		this.setDelay = function(params){
			self._delay = idle.getSetting('delay', params);
		};
		
		this.setOnOneEll = function(params){
			self._onOneEll = idle.getSetting('onOneEll', params);
		};
		
		this.setMouseSpeed = function(params){
			self.mouse.speed = idle.getSetting('mouseSpeed', params);
		};
		
		this.setScrollSpeed = function(params){
			self._scroll.speed = idle.getSetting('scrollSpeed', params);
		};
		
		this.setMicroMove = function(params){
			self._microMove = idle.getSetting('microMove', params);
		};
		
		this.setFilters = function(params){
			self._filters = idle.getSetting('filters', params);
		};
		
		this.setMiss = function(params){
			self._miss = idle.getSetting('miss', params);
		};
		
		this.setHoverMode = function(params){
			self._hoverMode = idle.getSetting('hoverMode', params);
		};
		
		this.setOverlapByPoints = function(params){
			self._overlapByPoints = idle.getSetting('overlapByPoints', params);
		};
		
		this.setReverseScroll = function(params){
			self._reverseScroll = idle.getSetting('reverseScroll', params);
		};
		
		this.setTarget = function(params){
			self.target.has = !_is_nilb(params.value);
			self.target.value = idle._target(params.value);
			self.target.delay = _avoid_nilb(params.delay, null);
			self.target.scroll = _avoid_nilb(params.scroll, null);
			self.target.compare = _avoid_nilb(params.compare, null);
		};
		
		this.clearRepeat = function(){
			self.repeat.ells.length = 0;
		};
		
		this.setMaxRepeatSkip = function(max){
			self.repeat.skip = (max != 0);
			self.repeat.max = max;
			if(!self.repeat.skip){
				self.clearRepeat();
			}else if(0 < max && max < self.repeat.ells.length){
				self.repeat.ells.splice(max);
			};
		};
		
		if('target' in options){
			self.setTarget(options.target);
		};
		if('maxRepeatSkip' in options){
			self.setMaxRepeatSkip(options.maxRepeatSkip);
		};
		
		this.getTimeLeft = function(){
			return self.emulationEnd - Date.now();
		};
		
		this.reviewRepeat = function(){
			self.repeat.ells.map(function(list){
				return list.filter(function(ell){
					if(ell.isFixed){
						return true;
					};
					var ellEnd = ell.y + ell.height;
					var scrollEnd = self.height + self._scroll.y;
					var inViewport = (self._scroll.y <= ell.y && ell.y < scrollEnd) || (self._scroll.y < ellEnd && ellEnd <= scrollEnd);
					if(!inViewport){
						util.log('Remove from repeats an element: %j', ell);
					};
					return inViewport;
				});
			});
		};
		
		this.addRepeat = function(ells){
			if(self.repeat.skip){
				if(0 < self.repeat.max && self.repeat.max <= self.repeat.ells.length){
					self.repeat.ells.splice(0, self.repeat.ells.length - (self.repeat.max - 1));
				};
				self.repeat.ells.push(ells);
			};
		};
		
		this.getRepeat = function(){
			return self.repeat.skip ? Array.prototype.concat.apply([], self.repeat.ells) : [];
		};
		
		this.delay = function(){
			var delay = _function_argument("delay");
			
			_if(delay.chance > 0 && delay.chance >= rand(1, 100), function(){
				var ms = util.randomRange(delay);
				
				util.log('Delay %i ms', ms);
				
				_call_function(util.sleep, {ms: ms})!
			})!
		};
		
		this.getScreenSettings = function(){
			_call_function(util.getScreenSettings, null)!
			var screen = _result_function();
			
			self.mouse.x = screen.cursor.x;
			self.mouse.y = screen.cursor.y;
			self._scroll.x = screen.scroll.x;
			self._scroll.y = screen.scroll.y;
			self.width = screen.width;
			self.height = screen.height;
			self.diagonal = util.hypot(screen.width, screen.height);
		};
		
		this.moveOnCoords = function(){
			var args = _function_arguments() || {};
			var coords = args.coords;
			
			util.log('Perform movement along %i coordinates: %j', coords.length, coords);
			
			var previous = self.mouse;
			coords.forEach(function(coord){
				coord.speed = util.randomRange(_avoid_nilb(args.speed, self.mouse.speed));
				
				if(args.scalableSpeed){
					var percent = util.getDistance(previous, coord) / (self.diagonal / 100);
					if(percent > 2){
						coord.speed += Math.round(coord.speed * (percent / 100));
					};
				};
				
				if(coords.length > 1 && !coord.hasOwnProperty('delay') && self._delay.chance > 0 && self._delay.chance >= rand(1, 100)){
					coord.delay = util.randomRange(self._delay);
				};
				
				previous = coord;
			});
			
			_multi_move(coords, args.gravity, args.deviation)!
		};
		
		this.returnCursorToScreen = function(){
			_call_function(self.getScreenSettings, null)!
			
			if(self.mouse.x >= 0 && self.mouse.x <= self.width && self.mouse.y >= 0 && self.mouse.y <= self.height){
				_function_return();
				return;
			};
			
			util.log('Returning the cursor to the screen');
			
			var args = idle.getSetting("goingBeyond", self.actions.filter(function(action){return action.name == 'goingBeyond'})[0]);
			
			_call_function(self.moveOnCoords, {coords: [{x: (rand(1, self.width)), y: (rand(1, self.height))}], scalableSpeed: args.scalableSpeed, gravity: args.gravity, deviation: args.deviation})!
			
			_call_function(self.getScreenSettings, null)!
		};
		
		this.getScrollInfo = function(){
			_call_function(self.returnCursorToScreen, null)!
			
			_call_function(util.get, {script: "_BAS_HIDE(BrowserAutomationStudio_ToString)(_BAS_SAFE(Math.max)(_BAS_SAFE($Element.scrollHeight)(_BAS_SAFE($Document.body)(document)), _BAS_SAFE($Element.scrollHeight)(_BAS_SAFE($Document.documentElement)(document))))"})!
			var scrollHeight = parseInt(_result_function());
			
			_function_return({
				scrollable: scrollHeight > self.height,
				up: self._scroll.y > 0,
				down: (self._scroll.y + self.height) < scrollHeight,
				scrollHeight: scrollHeight
			});
		};
		
		this.correctCoord = function(coord){
			return util.correctCoord(coord, self);
		};
		
		this.getRandomCoord = function(ell, hoverMode){
			hoverMode = hoverMode || self._hoverMode;
			return self.correctCoord(util.getRandomCoord(ell, self.mouse, hoverMode == 'tocenter' ? 'center' : (hoverMode == 'randomorcenter' ? util.getRandomItem(['random','center']) : hoverMode)));
		};
		
		this.removeVisualize = function(){
			_if(_is_record() && idle._debug && idle._visualize, function(){
				_call_function(util.execute, {params: {VISUALIZE_ID: info.visualizeId}, script: "let visualizeId = [[VISUALIZE_ID]] ?? 'visualize';" + "\r\n" + 
				"let body = _BAS_SAFE($Document.body)(document);" + "\r\n" + 
				"\r\n" + 
				"for(let i = 0, items = _BAS_SAFE($Node.querySelectorAll)(document, `#${visualizeId}, #${visualizeId}2`); i < _BAS_SAFE($NodeList.length)(items); ++i){" + "\r\n" + 
					"_BAS_SAFE($Node.removeChild)(body, items[i]);" + "\r\n" + 
				"};"})!
			})!
		};
		
		this.displaySearchResults = function(){
			var args = _function_arguments() || {};
			
			_if(_is_record() && idle._debug && idle._visualize, function(){
				_call_function(util.execute, {params: {ITEMS: args.ells, VISUALIZE_ID: info.visualizeId, ACTION: args.action || "elementMove", MAX_DISTANCE: args.maxDistance, CURSOR: self.mouse}, script: "let maxDistance = [[MAX_DISTANCE]] || 0;" + "\r\n" + 
				"let cursor = [[CURSOR]] || {x: 0, y: 0};" + "\r\n" + 
				"let visualizeId = [[VISUALIZE_ID]] ?? 'visualize';" + "\r\n" + 
				"let action = [[ACTION]] ?? 'elementMove';" + "\r\n" + 
				"let items = [[ITEMS]] ?? [];" + "\r\n" + 
				"\r\n" + 
				"let body = _BAS_SAFE($Document.body)(document);" + "\r\n" + 
				"\r\n" + 
				"if(maxDistance > 0){" + "\r\n" + 
					"let diameter = maxDistance * 2;" + "\r\n" + 
					"let tag = _BAS_SAFE($Document.createElement)('div');" + "\r\n" + 
					"_BAS_SAFE($Element.id)(tag, visualizeId + '2');" + "\r\n" + 
					"_BAS_SAFE($Node.setAttribute)(tag, 'style', `outline: 2px dashed ${action == 'shortElementMove' ? 'rgba(255,255,0,.75)' : 'rgba(255,0,255,.75)'};" + "\r\n" + 
						"position: absolute;" + "\r\n" + 
						"left: ${cursor.x + scrollx - maxDistance}px;" + "\r\n" + 
						"top: ${cursor.y + scrolly - maxDistance}px;" + "\r\n" + 
						"width: ${diameter}px;" + "\r\n" + 
						"height: ${diameter}px;" + "\r\n" + 
						"pointer-events: none;" + "\r\n" + 
						"overflow: hidden;" + "\r\n" + 
						"border-radius: 50%;" + "\r\n" + 
						"z-index: 2147483647;`);" + "\r\n" + 
					"\r\n" + 
					"_BAS_SAFE($Node.appendChild)(body, tag);" + "\r\n" + 
				"};" + "\r\n" + 
				"\r\n" + 
				"for(let i = 0; i < items.length; ++i){" + "\r\n" + 
					"let item = items[i];" + "\r\n" + 
					"let tag = _BAS_SAFE($Document.createElement)('div');" + "\r\n" + 
					"_BAS_SAFE($Element.id)(tag, visualizeId);" + "\r\n" + 
					"let style = item.isFixed ? {" + "\r\n" + 
						"outline: '2px dashed rgb(0,0,255,.75)'," + "\r\n" + 
						"position: 'fixed'," + "\r\n" + 
						"left: item.x," + "\r\n" + 
						"top: item.y" + "\r\n" + 
					"} : {" + "\r\n" + 
						"outline: '2px dashed rgba(255,0,0,.75)'," + "\r\n" + 
						"position: 'absolute'," + "\r\n" + 
						"left: item.x + scrollx," + "\r\n" + 
						"top: item.y + scrolly" + "\r\n" + 
					"};" + "\r\n" + 
					"_BAS_SAFE($Node.setAttribute)(tag, 'style', `outline: ${style.outline};" + "\r\n" + 
						"position: ${style.position};" + "\r\n" + 
						"left: ${style.left}px;" + "\r\n" + 
						"top: ${style.top}px;" + "\r\n" + 
						"width: ${item.width}px;" + "\r\n" + 
						"height: ${item.height}px;" + "\r\n" + 
						"pointer-events: none;" + "\r\n" + 
						"overflow: hidden;" + "\r\n" + 
						"box-sizing: border-box;" + "\r\n" + 
						"z-index: 2147483647;`);" + "\r\n" + 
					"\r\n" + 
					"_BAS_SAFE($Node.appendChild)(body, tag);" + "\r\n" + 
				"};"})!
			})!
		};
		
		this.findElements = function(){
			var args = _function_arguments() || {};
			var ignoreElls = args.ignoreElls || self.getRepeat();
			if(self.target.prepare && !self.target.needScroll){
				var item = _copy(self.target.data);
				if(!item.isFixed){
					item.x += self._scroll.x;
					item.y += self._scroll.y;
					item.coord.x += self._scroll.x;
					item.coord.y += self._scroll.y;
				};
				ignoreElls.push(item);
			};
			var maxDistance = _avoid_nilb(args.maxDistance, 0);
			
			var filters = args.filters || self._filters;
			if(!Array.isArray(filters)){
				if(filters && Object.keys(filters).length){
					filters = [filters];
				}else{
					filters = [];
				};
			};
			var underCursor = _avoid_nilb(args.underCursor, false);
			
			_call_function(self.removeVisualize, null)!
			
			_call_function(util.execute, {params: {FILTERS: filters, IGNORE_ELLS: ignoreElls, MAX_DISTANCE: maxDistance, OVERLAP_BY_POINTS: self._overlapByPoints, CURSOR: self.mouse, UNDER_CURSOR: underCursor, RESULT: {}}, script: "let filters = [[FILTERS]] || [];" + "\r\n" + 
			"let ignoreElls = [[IGNORE_ELLS]] || [];" + "\r\n" + 
			"let maxDistance = [[MAX_DISTANCE]] || 0;" + "\r\n" + 
			"let overlapByPoints = [[OVERLAP_BY_POINTS]] ?? 4;" + "\r\n" + 
			"let cursor = [[CURSOR]] || {x: 0, y: 0};" + "\r\n" + 
			"let underCursor = [[UNDER_CURSOR]] ?? false;" + "\r\n" + 
			"let items = [];" + "\r\n" + 
			"let minArea = -1;" + "\r\n" + 
			"\r\n" + 
			"let validateMask = function(text, mask){" + "\r\n" + 
				"let reg = new _BAS_SAFE(RegExp)(_BAS_SAFE($String.replace)(_BAS_SAFE($String.replace)(_BAS_SAFE($String.replace)(mask, /([.])/g, '\\\\\\\\$1'), /\\\\*/g, '.+'), /\\\\?/g, '.'));" + "\r\n" + 
				"return _BAS_SAFE($RegExp.test)(reg, text);" + "\r\n" + 
			"};" + "\r\n" + 
			"\r\n" + 
			"let validateSize = function(value, size){" + "\r\n" + 
				"if(typeof size==='number'){" + "\r\n" + 
					"return value===size;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('min' in size && value < size.min){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('max' in size && value > size.max){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"return true;" + "\r\n" + 
			"};" + "\r\n" + 
			"\r\n" + 
			"let coordIsOnElement = function(x, y, el){" + "\r\n" + 
				"try{" + "\r\n" + 
					"let res = _BAS_SAFE($Node.elementFromPoint)(document, x, y) == el;" + "\r\n" + 
					"return res;" + "\r\n" + 
				"}catch(e){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
			"};" + "\r\n" + 
			"\r\n" + 
			"let isOverlapped = function(el, rect, dots){" + "\r\n" + 
				"let count = 0;" + "\r\n" + 
				"if(coordIsOnElement(rect.left + (rect.width / 2), rect.top + (rect.height / 2), el)){" + "\r\n" + 
					"++count;" + "\r\n" + 
				"};" + "\r\n" + 
				"if(coordIsOnElement(rect.left + 1, rect.top + 1, el)){" + "\r\n" + 
					"++count;" + "\r\n" + 
				"};" + "\r\n" + 
				"if(coordIsOnElement(rect.left + 1, rect.bottom - 1, el)){" + "\r\n" + 
					"++count;" + "\r\n" + 
				"};" + "\r\n" + 
				"if(coordIsOnElement(rect.right - 1, rect.top + 1, el)){" + "\r\n" + 
					"++count;" + "\r\n" + 
				"};" + "\r\n" + 
				"if(coordIsOnElement(rect.right - 1, rect.bottom - 1, el)){" + "\r\n" + 
					"++count;" + "\r\n" + 
				"};" + "\r\n" + 
				"return count < dots;" + "\r\n" + 
			"};" + "\r\n" + 
			"\r\n" + 
			"let parentPosition = function(el){" + "\r\n" + 
				"let parent = _BAS_SAFE($Node.parentNode)(el);" + "\r\n" + 
				"let position = _BAS_SAFE(Window.getComputedStyle)(parent).position;" + "\r\n" + 
				"\r\n" + 
				"if(!_BAS_SAFE($Array.includes)(['relative','absolute','static'], position) || _BAS_SAFE($Node.nodeType)(_BAS_SAFE($Node.parentNode)(parent)) != 1){" + "\r\n" + 
					"return position;" + "\r\n" + 
				"}else{" + "\r\n" + 
					"return parentPosition(parent);" + "\r\n" + 
				"};" + "\r\n" + 
			"};" + "\r\n" + 
			"\r\n" + 
			"let isFixed = function(el, style){" + "\r\n" + 
				"if(style.position == 'fixed'){" + "\r\n" + 
					"return true;" + "\r\n" + 
				"};" + "\r\n" + 
				"\r\n" + 
				"let position = parentPosition(el);" + "\r\n" + 
				"\r\n" + 
				"if(style.position == 'absolute'){" + "\r\n" + 
					"return _BAS_SAFE($Array.includes)(['fixed','static'], position);" + "\r\n" + 
				"}else{" + "\r\n" + 
					"return position == 'fixed';" + "\r\n" + 
				"};" + "\r\n" + 
			"};" + "\r\n" + 
			"\r\n" + 
			"let isOnIgnore = function(el, rect){" + "\r\n" + 
				"for(let i = 0; i < ignoreElls.length; ++i){" + "\r\n" + 
					"let ignore = ignoreElls[i];" + "\r\n" + 
					"let x = rect.left;" + "\r\n" + 
					"let y = rect.top;" + "\r\n" + 
					"if(!ignore.isFixed){" + "\r\n" + 
						"x += scrollx;" + "\r\n" + 
						"y += scrolly;" + "\r\n" + 
					"};" + "\r\n" + 
					"if((ignore.x == x && ignore.y == y && ignore.width == rect.width && ignore.height == rect.height) || (x <= ignore.coord.x && ignore.coord.x <= x + rect.width && y <= ignore.coord.y && ignore.coord.y <= y + rect.height)){" + "\r\n" + 
						"return true;" + "\r\n" + 
					"};" + "\r\n" + 
				"};" + "\r\n" + 
				"return false;" + "\r\n" + 
			"};" + "\r\n" + 
			"\r\n" + 
			"let filterMatch = function(el, rect, style, filter){" + "\r\n" + 
				"if('width' in filter && !validateSize(rect.width, filter.width)){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('height' in filter && !validateSize(rect.height, filter.height)){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('tag' in filter && !_BAS_SAFE($Array.includes)(filter.tag, _BAS_SAFE($String.toLowerCase)(_BAS_SAFE($Node.tagName)(el)))){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('cursor' in filter && !_BAS_SAFE($Array.includes)(filter.cursor, style.cursor)){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('color' in filter && !_BAS_SAFE($Array.includes)([style.color, style.backgroundColor], filter.color)){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('text' in filter || 'textLength' in filter){" + "\r\n" + 
					"let text = _BAS_SAFE($String.replace)(_BAS_SAFE($String.trim)(_BAS_SAFE($Node.textContent)(el)), /\\s{2,}/g, ' ');" + "\r\n" + 
					"if('text' in filter && !validateMask(text, filter.text)){" + "\r\n" + 
						"return false;" + "\r\n" + 
					"};" + "\r\n" + 
					"if('textLength' in filter && !validateSize(text.length, filter.textLength)){" + "\r\n" + 
						"return false;" + "\r\n" + 
					"};" + "\r\n" + 
				"};" + "\r\n" + 
				"if('ownText' in filter || 'ownTextLength' in filter){" + "\r\n" + 
					"let textNode = null;" + "\r\n" + 
					"let ownText = '';" + "\r\n" + 
					"for(let i = 0, nodes = _BAS_SAFE($Node.childNodes)(el); i < _BAS_SAFE($NodeList.length)(nodes); ++i){" + "\r\n" + 
						"let node = nodes[i];" + "\r\n" + 
						"if(_BAS_SAFE($Node.nodeName)(node) == '#text'){" + "\r\n" + 
							"textNode = node;" + "\r\n" + 
							"break;" + "\r\n" + 
						"};" + "\r\n" + 
					"};" + "\r\n" + 
					"if(textNode){" + "\r\n" + 
						"ownText = _BAS_SAFE($String.replace)(_BAS_SAFE($String.trim)(_BAS_SAFE($Node.nodeValue)(textNode)), /\\s{2,}/g, ' ');" + "\r\n" + 
					"};" + "\r\n" + 
					"if('ownText' in filter && !validateMask(ownText, filter.ownText)){" + "\r\n" + 
						"return false;" + "\r\n" + 
					"};" + "\r\n" + 
					"if('ownTextLength' in filter && !validateSize(ownText.length, filter.ownTextLength)){" + "\r\n" + 
						"return false;" + "\r\n" + 
					"};" + "\r\n" + 
				"};" + "\r\n" + 
				"if('href' in filter && !validateMask(_BAS_SAFE($Node.getAttribute)(el, 'href'), filter.href)){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('src' in filter && !validateMask(_BAS_SAFE($Node.getAttribute)(el, 'src'), filter.src)){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('html' in filter && !validateMask(_BAS_SAFE($Node.outerHTML)(el), filter.html)){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('onclick' in filter && (_BAS_SAFE($Node.getAttribute)(el, 'onclick') !== null) !== filter.onclick){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('onchange' in filter && (_BAS_SAFE($Node.getAttribute)(el, 'onchange') !== null) !== filter.onchange){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('classExist' in filter && (_BAS_SAFE($Element.className)(el) !== '') !== filter.classExist){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('className' in filter && !validateMask(_BAS_SAFE($Element.className)(el), filter.className)){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('idExist' in filter && (_BAS_SAFE($Element.id)(el) !== '') !== filter.idExist){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"if('idName' in filter && !validateMask(_BAS_SAFE($Element.id)(el), filter.idName)){" + "\r\n" + 
					"return false;" + "\r\n" + 
				"};" + "\r\n" + 
				"return true;" + "\r\n" + 
			"};" + "\r\n" + 
			"\r\n" + 
			"let filtersMatch = function(el, rect, style, filters){" + "\r\n" + 
				"if(!filters.length){" + "\r\n" + 
					"return true;" + "\r\n" + 
				"};" + "\r\n" + 
				"\r\n" + 
				"for(let i = 0; i < filters.length; ++i){" + "\r\n" + 
					"if(filterMatch(el, rect, style, filters[i])){" + "\r\n" + 
						"return true;" + "\r\n" + 
					"};" + "\r\n" + 
				"};" + "\r\n" + 
				"\r\n" + 
				"return false;" + "\r\n" + 
			"};" + "\r\n" + 
			"\r\n" + 
			"for(let i = 0, ells = _BAS_SAFE($Node.querySelectorAll)(document, '*'); i < _BAS_SAFE($NodeList.length)(ells); ++i){" + "\r\n" + 
				"let el = ells[i];" + "\r\n" + 
				"\r\n" + 
				"if(_BAS_SAFE($Array.includes)(['html', 'head', 'body'], _BAS_SAFE($String.toLowerCase)(_BAS_SAFE($Node.nodeName)(el)))){" + "\r\n" + 
					"continue;" + "\r\n" + 
				"};" + "\r\n" + 
				"\r\n" + 
				"let style = _BAS_SAFE(Window.getComputedStyle)(el);" + "\r\n" + 
				"\r\n" + 
				"if(!el || style.display === 'none' || style.visibility === 'hidden'){" + "\r\n" + 
					"continue;" + "\r\n" + 
				"};" + "\r\n" + 
				"\r\n" + 
				"let rect = _BAS_HIDE(BrowserAutomationStudio_GetInternalBoundingRect)(el);" + "\r\n" + 
				"let area = _BAS_SAFE(Math.ceil)(rect.width * rect.height);" + "\r\n" + 
				"\r\n" + 
				"if(area < 20 || rect.width / rect.height > 15 || rect.height / rect.width > 15){" + "\r\n" + 
					"continue;" + "\r\n" + 
				"};" + "\r\n" + 
				"\r\n" + 
				"if(!underCursor && rect.left <= cursor.x && cursor.x <= rect.right && rect.top <= cursor.y && cursor.y <= rect.bottom){" + "\r\n" + 
					"continue;" + "\r\n" + 
				"};" + "\r\n" + 
				"\r\n" + 
				"if(maxDistance > 0 && _BAS_SAFE(Math.hypot)(cursor.x - (rect.left + (rect.width / 2)), cursor.y - (rect.top + (rect.height / 2))) > maxDistance){" + "\r\n" + 
					"continue;" + "\r\n" + 
				"};" + "\r\n" + 
				"\r\n" + 
				"if(isOverlapped(el, rect, overlapByPoints)){" + "\r\n" + 
					"continue;" + "\r\n" + 
				"};" + "\r\n" + 
				"\r\n" + 
				"if(isOnIgnore(el, rect)){" + "\r\n" + 
					"continue;" + "\r\n" + 
				"};" + "\r\n" + 
				"\r\n" + 
				"if(filtersMatch(el, rect, style, filters)){" + "\r\n" + 
					"_BAS_SAFE($Array.push)(items, {" + "\r\n" + 
						"element: el," + "\r\n" + 
						"x: rect.left," + "\r\n" + 
						"y: rect.top," + "\r\n" + 
						"isFixed: isFixed(el, style)," + "\r\n" + 
						"width: rect.width," + "\r\n" + 
						"height: rect.height," + "\r\n" + 
						"child: 0," + "\r\n" + 
						"area: area" + "\r\n" + 
					"});" + "\r\n" + 
				"};" + "\r\n" + 
			"};" + "\r\n" + 
			"\r\n" + 
			"items = _BAS_SAFE($Array.filter)(items, x => !_BAS_SAFE($Array.some)(items, y => _BAS_SAFE($Node.contains)(x.element, y.element) && !(x == y) && ++x.child && _BAS_SAFE(Math.sqrt)(x.area) / _BAS_SAFE(Math.sqrt)(y.area) < 2) && x.child < 2);" + "\r\n" + 
			"\r\n" + 
			"for(let i = 0; i < items.length; ++i){" + "\r\n" + 
				"let item = items[i];" + "\r\n" + 
				"delete item.element;" + "\r\n" + 
				"delete item.child;" + "\r\n" + 
				"if(minArea < 0 || item.area < minArea){" + "\r\n" + 
					"minArea = item.area;" + "\r\n" + 
				"};" + "\r\n" + 
			"};" + "\r\n" + 
			"\r\n" + 
			"[[RESULT]] = {items: items, minArea: minArea};"})!
			var searchResult = _result_function()["RESULT"];
			
			_call_function(self.displaySearchResults, {ells: searchResult.items, action: args.action, maxDistance: args.maxDistance})!
			
			util.log('Found %i elements', searchResult.items.length);
			
			_function_return(searchResult);
		};
		
		this.displayHoverElement = function(){
			var ell = _function_argument("ell");
			
			_if(_is_record() && idle._debug && idle._visualize, function(){
				_call_function(util.execute, {params: {ELL: ell, VISUALIZE_ID: info.visualizeId}, script: "let ell = [[ELL]];" + "\r\n" + 
				"let visualizeId = [[VISUALIZE_ID]] ?? 'visualize';" + "\r\n" + 
				"let done = false;" + "\r\n" + 
				"\r\n" + 
				"for(let i = 0, items = _BAS_SAFE($Node.querySelectorAll)(document, `#${visualizeId}`); i < _BAS_SAFE($NodeList.length)(items); ++i){" + "\r\n" + 
					"let item = items[i];" + "\r\n" + 
					"let rect = _BAS_HIDE(BrowserAutomationStudio_GetInternalBoundingRect)(item);" + "\r\n" + 
					"if(ell.x == rect.left && ell.y == rect.top && ell.width == rect.width && ell.height == rect.height){" + "\r\n" + 
						"_BAS_SAFE($Node.setAttribute)(item, 'style', _BAS_SAFE($String.replace)(_BAS_SAFE($Node.getAttribute)(item, 'style'), /outline: ([^;]+);/, 'outline: 2px dashed rgb(0,255,0,.75);'));" + "\r\n" + 
						"done = true;" + "\r\n" + 
					"};" + "\r\n" + 
				"};" + "\r\n" + 
				"\r\n" + 
				"if(!done){" + "\r\n" + 
					"let body = _BAS_SAFE($Document.body)(document);" + "\r\n" + 
					"let tag = _BAS_SAFE($Document.createElement)('div');" + "\r\n" + 
					"_BAS_SAFE($Element.id)(tag, visualizeId);" + "\r\n" + 
					"\r\n" + 
					"_BAS_SAFE($Node.setAttribute)(tag, 'style', `outline: 2px dashed rgb(0,255,0,.75);" + "\r\n" + 
						"position: absolute;" + "\r\n" + 
						"left: ${ell.x + scrollx}px;" + "\r\n" + 
						"top: ${ell.y + scrolly}px;" + "\r\n" + 
						"width: ${ell.width}px;" + "\r\n" + 
						"height: ${ell.height}px;" + "\r\n" + 
						"pointer-events: none;" + "\r\n" + 
						"overflow: hidden;" + "\r\n" + 
						"box-sizing: border-box;" + "\r\n" + 
						"z-index: 2147483647;`);" + "\r\n" + 
					"\r\n" + 
					"_BAS_SAFE($Node.appendChild)(body, tag);" + "\r\n" + 
				"};"})!
			})!
		};
		
		this.getRandomMiss = function(ell, current){
			var chance = _avoid_nilb(self._miss.chance, 2);
			var distance = self._miss.distance || {min: 2, max: 10};
			var maxArea = _avoid_nilb(self._miss.maxArea, 0);
			
			if(chance <= 0 || chance < rand(1, 100) || (maxArea > 0 && maxArea < ell.area)){
				return null;
			};
			
			var sides = util.getSides(ell, current);
			
			if(!sides.length){
				return null;
			};
			
			util.log('Add a miss by element: %j', ell);
			
			var target = util.calcCoordFromRandomSide(ell, sides, util.randomRange(distance));
			self.correctCoord(target);
			
			return target;
		};
		
		this.targetMiss = function(){			
			_call_function(self.target.value.getInfo, {extended: true})!
			var ell = _result_function();
			
			var miss = self.getRandomMiss(ell, self.mouse);
			
			if(!miss){
				_function_return(false);
				return;
			};
			
			var args = idle.getSetting("longElementMove", self.actions.filter(function(action){return action.name == 'longElementMove'})[0]);
			
			_call_function(self.moveOnCoords, {coords: [{x: miss.x, y: miss.y}], scalableSpeed: args.scalableSpeed, gravity: args.gravity, deviation: args.deviation})!
			
			_function_return(true);
		};
		
		this.scrollTo = function(){
			var to = _function_argument("to");
			var options = _function_argument("options");
			
			_scrollTo(to, {speed: _avoid_nilb(options.speed, self._scroll.speed), pause: options.pause, move: _assign({speed: util.getAvg(self.mouse.speed)}, options.move)})!
			
			_call_function(self.getScreenSettings, null)!
		};
		
		this.calcScrollTarget = function(distance, direction){
			var to = self._scroll.y + distance * (direction == 'down' ? 1 : -1);
			if(direction == 'down'){
				to += self.height;
			};
			
			if(to < 0){
				to = 0;
			};
			
			return to;
		};
		
		this.doScroll = function(){
			var args = _function_arguments() || {};
			var direction = args.direction; //random, random2, up, down
			
			_call_function(self.getScrollInfo, null)!
			var info = _result_function();
			
			if(!info.scrollable){
				_function_return(null);
				return;
			};
			
			var ways = [];
			if(info.up){
				ways.push('up');
			};
			if(info.down){
				ways.push('down');
			};
			
			var targetDelta = null;
			_if(self.target.has, function(){
				_call_function(self.target.value.getDelta, null)!
				targetDelta = _result_function();
				
				if(targetDelta == null){
					_break();
					return;
				};
				
				_if(targetDelta == 0 && self.target.prepare && self.target.needScroll, function(){
					_call_function(self.startTargetPreparing, null)!
				})!
				
				if(targetDelta == 0){
					_function_return(null);
					return;
				};
				
				if(targetDelta > 0){
					direction = 'down';
				}else{
					direction = 'up';
				};
				
				targetDelta = Math.abs(targetDelta);
			})!
			
			if(targetDelta == null){
				if(_starts_with(direction, 'random')){
					if(!ways.length){
						_function_return(null);
						return;
					}else if(ways.length == 1){
						direction = ways[0];
					}else if(direction == 'random'){
						direction = ways[rand(0, 1)];
					}else{
						var y = rand(0, info.scrollHeight);
						if(y > self._scroll.y){
							direction = 'down';
						}else{
							direction = 'up';
						};
					};
				}else if(ways.indexOf(direction) < 0){
					_function_return(null);
					return;
				};
			};
			
			var distance = util.randomRange(args.distance);
			
			var subDirection = direction;
			if(ways.length == 2 && self._reverseScroll >= rand(1, 100)){
				util.log('Dropped scrolling in reverse direction');
				subDirection = (direction == 'down' ? 'up' : 'down');
			}else if(targetDelta != null && targetDelta < distance){
				distance = targetDelta;
			};
			
			var target = self.calcScrollTarget(distance, subDirection);
			if(target > info.scrollHeight){
				target = info.scrollHeight;
			};
			
			util.log('Executing scroll %s to coordinate: %i', subDirection, target);
			
			_call_function(self.scrollTo, {to: target, options: {pause: args.pause, move: args.move}})!
			
			_function_return(direction);
		};
		
		this.cutNearest = function(list, current){
			var nearest = null;
			var minDistance = -1;
			var index = 0;
			if(!current){
				current = self.mouse;
			};
			
			list.forEach(function(ell, i){
				var coord = util.getCenter(ell);
				var distance = util.getDistance(current, coord);
				if(minDistance < 0 || distance < minDistance){
					nearest = ell;
					minDistance = distance;
					index = i;
				};
			});
			
			list.splice(index, 1);
			return nearest;
		};
		
		this.getTargetInfo = function(){
			_call_function(self.getScreenSettings, null)!
			
			var info = {};
			_if(self.target.has, function(){
				_call_function(self.target.value.getInfo, {extended: true})!
				info = _result_function();
			})!
			
			if(info == null){
				_function_return(null);
				return;
			};
			
			info.has = self.target.has;
			_call_function(util.currentUrl, null)!
			info.url = _result_function();
			info.end = self.emulationEnd;
			if(!info.isFixed){
				info.x += self._scroll.x;
				info.y += self._scroll.y;
			};
			
			_function_return(info);
		};
		
		this.accumulatedEmulation = function(){
			if(info.accumulatedChance == null){
				info.accumulatedChance = self.target.compare.random.start;
			};
			
			if(info.accumulatedChance >= rand(1, 100)){
				var newTime = Math.max(Math.round(self.emulationTime * (util.randomRange(self.target.compare.random.time) / 100)), 1);
				self.setTime(newTime);
				util.log('Dropped random emulation, change the emulation time to %i sec', newTime);
				return true;
			};
			
			return false;
		}
		
		this.compareTargets = function(){
			_call_function(self.getTargetInfo, null)!
			var current = _result_function();
			var previous = info.previousTarget;
			
			if(current == null){
				util.log('Change the emulation time to 0 sec, since the emulation target was not found');
				self.setTime(0);
				_function_return();
				return;
			};
			
			_if(self.target.has && self.target.compare && previous != null && current.url == previous.url && (self.target.compare.time == 0 || _is_record() || self.target.compare.time >= (self.emulationStart - previous.end)), function(){		
				if(_is_record()){
					util.log('In record mode, the time between targets is always considered to be 0');
				};
				
				if(!previous.has){
					util.log('Change the emulation time to 0 sec, since idle emulation was recently performed');
					if(self.accumulatedEmulation()){
						_break();
					};
					self.setTime(0);
					_break();
					return;
				};
			
				var distance = util.calcDistance(previous, current);
				
				for(var i in self.target.compare.rules){
					var rule = self.target.compare.rules[i];
					if(distance <= (0 < rule.distance && rule.distance <= 1 ? (self.diagonal * rule.distance) : rule.distance)){
						var newTime = typeof rule.time == 'number' && 0 < rule.time && rule.time < 1 ? Math.round(self.emulationTime * rule.time) : rule.time;
						util.log('Change the emulation time to %i sec, since the distance between the previous and current target is %i pixels', newTime, distance);
						if(self.accumulatedEmulation()){
							_break();
						};
						self.setTime(newTime);
						break;
					};
				};
			})!
			
			if(self.target.has && self.target.compare){
				if(info.accumulatedChance == null){
					info.accumulatedChance = Math.round(self.target.compare.random.start * self.target.compare.random.multiplier);
				};
				if(self.emulationTime === 0){
					info.accumulatedChance += Math.round(util.randomRange(self.target.compare.random) * self.target.compare.random.multiplier);
					util.log('Chance of random emulation increased to %i\%', info.accumulatedChance);
				}else if(info.accumulatedChance != self.target.compare.random.start){
					info.accumulatedChance = Math.round(self.target.compare.random.start * self.target.compare.random.multiplier);
					util.log('Chance of random emulation reset to %i\%', info.accumulatedChance);
				};
			};
			
			current.end = self.emulationEnd;
			info.previousTarget = current;
		};
		
		this.scrollToTarget = function(){
			var delta = _function_argument("delta");
			var direction = delta < 0 ? 'up' : 'down';
			var deltaAbs = Math.abs(delta);
			var target = self.target.value.getScrollTarget();
			var params = self.target.scroll;
			var targetInCenter = params.targetInCenter; //enable, random, disable
			if(targetInCenter == 'random'){
				targetInCenter = rand(1, 100) <= 95;
			}else{
				targetInCenter = _is_true(targetInCenter);
			};
			var reverseScroll = params.reverseScroll;
			var reverseDirection = (direction == 'down' ? 'up' : 'down');
			
			util.log('Executing scroll to the target: %j', target);
			
			_if(reverseScroll.chance > 0 && deltaAbs >= reverseScroll.minDistance, function(){
				_do(function(){
					if(deltaAbs < reverseScroll.minDistance){
						_break();
					};
					
					var distance = Math.ceil(rand(deltaAbs * 0.2, deltaAbs * 0.5));
					var doReverse = reverseScroll.chance >= rand(1, 100);
					
					while(!doReverse && deltaAbs - distance >= reverseScroll.minDistance){
						distance += Math.ceil(rand(deltaAbs * 0.2, deltaAbs * 0.5));
						if(distance >= deltaAbs){
							break;
						};
						doReverse = reverseScroll.chance >= rand(1, 100);
					};
					
					if(!doReverse){
						_break();
					};
					
					var to = self.calcScrollTarget(distance, direction);
					
					util.log('Executing scroll %s to coordinate: %i', direction, to);
					
					_call_function(self.scrollTo, {to: to, options: {pause: params.pause, move: params.move}})!
				
					util.log('Dropped scrolling in reverse direction');
					
					distance = util.randomRange(reverseScroll.distance);
					
					to = self.calcScrollTarget(distance, reverseDirection);
					
					util.log('Executing scroll %s to coordinate: %i', reverseDirection, to);
					
					_call_function(self.scrollTo, {to: to, options: {speed: Math.round(self._scroll.speed * 0.9), pause: params.pause, move: params.move}})!
					
					_call_function(self.target.value.getDelta, null)!
					delta = _result_function();
					deltaAbs = Math.abs(delta);
					
					_call_function(self.delay, {delay: self._delay})!
				})!
				
			})!
			
			if(targetInCenter){
				if(typeof target == 'string'){
					target = self._scroll.y + self.height * 0.5 + delta;
				};
				if(delta < 0){
					target -= self.height * 0.5 + 1;
				}else{
					target += self.height * 0.5 - 1;
				};
			};
			
			util.log('Executing scroll directly to the target');
			
			_call_function(self.scrollTo, {to: target, options: {pause: params.pause, move: params.move}})!
			
			_if(params.emulation, function(){
				self.setTime(Math.max(parseInt(self.emulationTime * (util.randomRange(params.emulation) / 100)), 2));
				
				self.disableScroll = true;
				
				util.log('Starting idle emulation after scroll to target');
			
				_if(self.target.prepare && self.target.needScroll, function(){
					_call_function(self.startTargetPreparing, null)!
				})!
				
				self._emulate()!
				
				_call_function(self.removeVisualize, null)!
				
				self.disableScroll = false;
				
				var duration = Math.round((Date.now() - self.emulationStart) / 1000);
				
				util.log('Emulation after scroll to target, completed after %i sec', duration);
			})!
		};
		
		this.moveCloseToTarget = function(){
			util.log('Move the cursor closer to the target');
			
			_call_function(self.getScreenSettings, null)!
			
			var ell = self.target.data;
			var sides = util.getSides(ell, self.mouse);
			
			if(!sides.length){
				_function_return();
				return;
			};
			
			var distance = util.randomRange({min: Math.ceil(self.diagonal * 0.05), max: Math.ceil(self.diagonal * 0.2)});
			var target = util.calcCoordFromRandomSide(ell, sides, distance);
			self.correctCoord(target);
			
			var args = idle.getSetting("longElementMove", self.actions.filter(function(action){return action.name == 'longElementMove'})[0]);
			
			_call_function(self.moveOnCoords, {coords: [{x: target.x, y: target.y}], scalableSpeed: args.scalableSpeed, gravity: args.gravity, deviation: args.deviation})!
		};
		
		this.startTargetPreparing = function(){
			_call_function(self.getScreenSettings, null)!
			
			_call_function(self.target.value.getDelta, null)!
			var targetDelta = _result_function();
			
			if(targetDelta == null){
				_function_return();
				return;
			};
			
			self.target.prepare = true;
			self.target.needScroll = targetDelta != 0;
			
			if(self.target.needScroll){
				_function_return();
				return;
			};
			
			util.log('Start preparing before the target');
			
			_call_function(self.target.value.getInfo, {extended: true})!
			self.target.data = _result_function();
			
			self.target.data.coord = self.getRandomCoord(self.target.data);
			
			var mouseMove = false;
			var shortParams = idle.getSetting('shortElementMove', self.actions.filter(function(action){
				if(['longElementMove', 'shortElementMove', 'randomMove', 'moveAlongText'].indexOf(action.name) > -1){
					mouseMove = true;
				};
				return action.name == 'shortElementMove';
			})[0]);
			
			if(!mouseMove){
				_function_return();
				return;
			};
			
			var action = rand(0, 2); // 0 - shortElementMove, 1 - moveCloseToTarget, 2 - Do nothing
			var done = false;
			
			_if(action == 0, function(){
				shortParams.name = 'shortElementMove';
				_call_function(self.shortElementMove, shortParams)!
				done = _result_function();
			})!
			
			if(shortParams){
				self.target.maxDistance = shortParams.maxDistance
			};
			
			_if(action == 1 || !done, function(){
				_call_function(self.moveCloseToTarget, null)!
			})!
		};
		
		this.prepareTarget = function(){
			if(!self.target.has || (!self._miss && self.target.delay == null && self.target.scroll == null)){
				_function_return();
				return;
			};
			
			_call_function(self.getScreenSettings, null)!
			
			_call_function(self.target.value.getDelta, null)!
			var targetDelta = _result_function();
			
			if(self.target.scroll ? targetDelta == null : targetDelta != 0){
				_function_return();
				return;
			};
			
			_if(self.target.scroll && targetDelta != 0, function(){
				_call_function(self.scrollToTarget, {delta: targetDelta})!
			})!
			
			_if(self._miss, function(){
				_call_function(self.targetMiss, null)!
			})!
			
			_if(self.target.delay != null, function(){
				_call_function(self.delay, {delay: self.target.delay})!
			})!
		};
		
		this.doSleep = function(){
			var ms = _function_argument("ms");
			
			util.log('Sleep %i ms', ms);
			
			_call_function(util.sleep, {ms: ms})!
		};
		
		//actions
		
		this.sleep = function(){
			var sleep = _avoid_nilb(_function_arguments(), self._sleep);
			
			var ms = Math.min(util.randomRange(sleep), self.getTimeLeft());
			
			if(ms <= 0){
				_function_return(false);
				return;
			};
			
			_if(self._microMove.chance > 0 && self._microMove.chance >= rand(1, 100), function(){
				var firstMs = Math.round(rand(ms * 0.2, ms * 0.7));
				ms -= firstMs;
				
				_call_function(self.doSleep, {ms: firstMs})!
				
				util.log('Dropped micromove during sleep: %j', self._microMove);
				
				_call_function(self.microMove, self._microMove)!
			})!
			
			_call_function(self.doSleep, {ms: ms})!
			
			_function_return(true);
		};
		
		this.scroll = function(){
			var args = idle.getSetting("scroll", _function_arguments());
			var direction = args.direction; //random, random2, randomtoend, up, down
			
			_call_function(self.doScroll, {direction: (direction == 'randomtoend' ? self._scroll.direction || 'random' : direction), distance: args.distance, pause: args.pause, move: args.move})!
			var finalDirection = _result_function();
			
			if(direction == 'randomtoend'){
				self._scroll.direction = finalDirection;
			};
			
			if(finalDirection){
				self.reviewRepeat();
			};
			
			_function_return(finalDirection != null);
		};
		
		this.randomMove = function(){
			var args = idle.getSetting("randomMove", _function_arguments());
			var count = util.randomRange(args.count);
			
			_call_function(self.getScreenSettings, null)!
			
			var params = {
				x: {
					min: 1,
					max: self.width - 1
				},
				y: {
					min: 1,
					max: self.height - 1
				}
			};
			
			if(self.target.prepare && !self.target.needScroll && self.target.maxDistance){
				var maxDistance = self.target.maxDistance;
				var target = self.target.data.coord;
				params = {
					x: {
						min: Math.max(Math.round(target.x - maxDistance), params.x.min),
						max: Math.min(Math.round(target.x + maxDistance), params.x.max)
					},
					y: {
						min: Math.max(Math.round(target.y - maxDistance), params.y.min),
						max: Math.min(Math.round(target.y + maxDistance), params.y.max)
					}
				};
			};
			
			var coords = [];
			
			for(var i = 0; i < count; ++i){
				coords.push({
					x: util.randomRange(params.x),
					y: util.randomRange(params.y)
				});
			};
			
			_call_function(self.moveOnCoords, {coords: coords, scalableSpeed: args.scalableSpeed, gravity: args.gravity, deviation: args.deviation})!
			
			_function_return(true);
		};
		
		this.goingBeyond = function(){
			var args = idle.getSetting("goingBeyond", _function_arguments());
			var distance = args.distance;
			
			_call_function(self.getScreenSettings, null)!
			
			var sides = [];
			
			['right', 'down', 'left', 'up'].forEach(function(side){
				util.fillList(sides, side, args[side]);
			});
			
			distance = util.randomRange(distance);
			var side = util.getRandomItem(sides);
			var target = {x: rand(0, self.width), y: rand(0, self.height)};
			
			if(side == 'left'){
				target.x = -distance;
			}else if(side == 'right'){
				target.x = self.width + distance;
			}else if(side == 'top'){
				target.y = -distance;
			}else{
				target.y = self.height + distance;
			};
			
			_call_function(self.moveOnCoords, {coords: [{x: target.x, y: target.y}], scalableSpeed: args.scalableSpeed, gravity: args.gravity, deviation: args.deviation})!
			
			_call_function(self.sleep, null)!
			
			_function_return(true);
		};
		
		this.microMove = function(){
			var args = idle.getSetting("microMove", _function_arguments());
			var count = util.randomRange(args.count);
			
			_call_function(self.returnCursorToScreen, null)!
			
			var coords = [];
			var coord = {x: self.mouse.x, y: self.mouse.y};
			
			for(var i = 0; i < count; ++i){
				coord.x += util.randomRange(args.distance) * util.randomSign();
				coord.y += util.randomRange(args.distance) * util.randomSign();
				
				self.correctCoord(coord);
				
				coords.push({
					x: coord.x,
					y: coord.y
				});
			};
			
			_call_function(self.moveOnCoords, {coords: coords, speed: args.speed, scalableSpeed: args.scalableSpeed, gravity: args.gravity, deviation: args.deviation})!
			
			_function_return(true);
		};
		
		this.removeCursorFromTarget = function(){
			var args = idle.getSetting("removeCursorFromTarget", _function_arguments());
			
			_if(info.previousTarget == null, function(){
				_call_function(self.randomMove, self.actions.filter(function(action){return action.name == 'randomMove'})[0])!
				_function_return(true);
			})!
			
			_call_function(self.returnCursorToScreen, null)!
			
			var ell = _copy(info.previousTarget);
			ell.x -= self._scroll.x;
			ell.y -= self._scroll.y;
			self.correctCoord(ell);
			
			var distance = Math.round((util.randomRange(args.distance) / 100) * self.diagonal);
			
			var width = Math.round(ell.width * 0.6);
			var coord = {x: rand(ell.x, ell.x + width), y: rand(ell.y, ell.y + ell.height)};
			var minDistance = util.getDistance(self.mouse, coord);
			
			for(var i = 0; i < 3; ++i){
				var tempWidth  = Math.round(ell.width * 0.6);
				var tempCoord = {x: rand(ell.x, ell.x + tempWidth), y: rand(ell.y, ell.y + ell.height)};
				var curDistance = util.getDistance(self.mouse, tempCoord);
				if(curDistance < minDistance){
					width = tempWidth;
					coord = tempCoord;
				};
			};
			
			minDistance = null;
			var minCoord = null;
			var sides = {};
			var list = [
				{x: ell.x - distance, y: coord.y, side: 'left'},
				{x: ell.x + tempWidth + distance, y: coord.y, side: 'right'},
				{x: coord.x, y: ell.y - distance, side: 'top'},
				{x: coord.x, y: ell.y + ell.height + distance, side: 'bottom'}
			].map(self.correctCoord).filter(function(data){
				if(ell.x <= data.x && data.x <= ell.x + tempWidth && ell.y <= data.y && data.y <= ell.y + ell.height){
					return false;
				}else{
					var curDistance = util.getDistance(self.mouse, data);
					if(minDistance == null || curDistance < minDistance){
						minDistance = curDistance;
						minCoord = data;
					};
				};
				sides[data.side] = data;
			});
			
			coord = sides.bottom || sides.top || minCoord;
			
			_if(coord == null, function(){
				_call_function(self.randomMove, self.actions.filter(function(action){return action.name == 'randomMove'})[0])!
				_function_return(true);
			})!
			
			_call_function(self.moveOnCoords, {coords: [{x: coord.x, y: coord.y}], scalableSpeed: args.scalableSpeed, gravity: args.gravity, deviation: args.deviation})!
			
			_function_return(true);
		};
		
		this.returnCursorToTarget = function(){
			var args = idle.getSetting("returnCursorToTarget", _function_arguments());
			
			if(info.previousTarget == null){
				_function_return(false);
				return;
			};
			
			_call_function(self.returnCursorToScreen, null)!
			
			var ell = _copy(info.previousTarget);
			ell.x -= self._scroll.x;
			ell.y -= self._scroll.y;
			self.correctCoord(ell);
			
			var coord = self.getRandomCoord(ell, ['random', 'nearest']);
			
			_call_function(self.moveOnCoords, {coords: [{x: coord.x, y: coord.y}], scalableSpeed: args.scalableSpeed, gravity: args.gravity, deviation: args.deviation})!
			
			_function_return(true);
		};
		
		this.removeAndReturnCursorToTarget = function(){
			var args = idle.getSetting("removeAndReturnCursorToTarget", _function_arguments());
			
			_call_function(self.removeCursorFromTarget, args)!
			if(_result_function() == false){
				_function_return(false);
				return;
			};
			
			_call_function(self.doSleep, {ms: util.randomRange(args.delay)})!
			
			_call_function(self.returnCursorToTarget, args)!
			if(_result_function() == false){
				_function_return(false);
				return;
			};
			
			_function_return(true);
		};
		
		this.returnAndRemoveCursorFromTarget = function(){
			var args = idle.getSetting("returnAndRemoveCursorFromTarget", _function_arguments());
			
			_call_function(self.returnCursorToTarget, args)!
			if(_result_function() == false){
				_function_return(false);
				return;
			};
			
			_call_function(self.doSleep, {ms: util.randomRange(args.delay)})!
			
			_call_function(self.removeCursorFromTarget, args)!
			if(_result_function() == false){
				_function_return(false);
				return;
			};
			
			_function_return(true);
		};
		
		this.scrollAndReturnToTarget = function(){
			var args = idle.getSetting("scrollAndReturnToTarget", _function_arguments());
			var targetInCenter = args.targetInCenter; //enable, random, disable
			if(targetInCenter == 'random'){
				targetInCenter = rand(1, 100) <= 95;
			}else{
				targetInCenter = _is_true(targetInCenter);
			};
			
			_call_function(self.scroll, args)!
			if(_result_function() == false){
				_function_return(false);
				return;
			};
			
			var ell = _copy(info.previousTarget);
			var target = ell.y + ell.height * 0.5;
			var delta = (self._scroll.y <= target) && (target <= self.height + self._scroll.y) ? 0 : Math.floor(target - (self._scroll.y + self.height * 0.5));
			
			if(delta == 0 && !targetInCenter){
				_function_return(true);
				return;
			};
			
			_call_function(self.doSleep, {ms: util.randomRange(args.delay)})!
			
			if(targetInCenter){
				var up = target - self.height * 0.5 + 1;
				var down = target + self.height * 0.5 - 1;
				if(delta == 0){
					if(self._scroll.y > up){
						target = up;
					}else if(self._scroll.y + self.height < down){
						target = down;
					}else{
						_function_return(true);
						return;
					}
				}else{
					target = delta < 0 ? up : down;
				};
			};
			
			util.log('Executing scroll directly to the target');
			
			_call_function(self.scrollTo, {to: target, options: {pause: args.pause, move: args.move}})!
			
			_function_return(true);
		};
		
		this.moveAlongText = function(){
			var args = _function_arguments();
			var action = args.name || "elementMove";
			args = idle.getSetting("moveAlongText", _function_arguments());
			var maxDistance = 0;
			if(self.target.prepare && !self.target.needScroll && self.target.maxDistance){
				maxDistance = self.target.maxDistance;
			};
			
			_call_function(self.returnCursorToScreen, null)!
			
			_call_function(self.findElements, {maxDistance: maxDistance, filters: {ownTextLength: {min: args.minLength}}, action: action, underCursor: true})!
			var ells = _result_function().items;
			
			var moveElls = [];
			self.addRepeat(moveElls);
			
			if(!ells.length){
				_function_return(false);
				return;
			};
			
			var coords = [];
			var item = util.getRandomItem(ells);
			
			var coord = self.correctCoord({
				x: item.x + Math.round(rand(item.width * 0.04, item.width * 0.2)),
				y: item.y + Math.round(rand(item.height * 0.1, item.height * 0.7))
			});
			coords.push(coord);
			if(50 >= rand(1, 100) && util.hypot(item.width, item.height) >= self.diagonal * 0.25){
				coords.push(self.correctCoord({
					x: item.x + Math.round(rand(item.width * 0.4, item.width * 0.65)),
					y: coord.y + rand(1, 7) * util.randomSign()
				}));
			};
			coords.push(self.correctCoord({
				x: item.x + Math.round(rand(item.width * 0.8, item.width * 0.95)),
				y: coord.y + rand(1, 7) * util.randomSign()
			}));
			
			_call_function(self.displayHoverElement, {ell: item})!
			
			if(self.repeat.skip){
				item.coord = {
					x: coord.x,
					y: coord.y
				};
				if(!item.isFixed){
					item.x += self._scroll.x;
					item.y += self._scroll.y;
					item.coord.x += self._scroll.x;
					item.coord.y += self._scroll.y;
				};
				moveElls.push(item);
			};
			
			_call_function(self.moveOnCoords, {coords: coords, speed: args.speed, scalableSpeed: args.scalableSpeed, gravity: args.gravity, deviation: args.deviation})!
			_function_return(true);
		};
		
		this.elementMove = function(){
			var args = _function_arguments();
			var action = args.name || "elementMove";
			args = idle.getSetting(action, args);
			
			var mode = args.mode; //random, randomnearest, nearest
			var count = util.randomRange(args.count);
			var maxDistance = args.maxDistance;
			if(self.target.prepare && !self.target.needScroll && self.target.maxDistance){
				maxDistance = self.target.maxDistance;
			};
			
			_call_function(self.returnCursorToScreen, null)!
			
			if(typeof maxDistance == "string"){
				maxDistance = Number(maxDistance.trim().replace(/%/g, ''));
			};
			
			if(maxDistance > 0){
				if(maxDistance > 1){
					maxDistance /= 100;
				};
				
				maxDistance = self.diagonal * maxDistance;
			};
			
			_call_function(self.findElements, {maxDistance: maxDistance, action: action, underCursor: action == 'shortElementMove'})!
			var searchResult = _result_function();
			var ells = searchResult.items;
			var minArea = searchResult.minArea;
			
			var moveElls = [];
			self.addRepeat(moveElls);
			
			_if(!ells.length, function(){
				_call_function(self.sleep, null)!
				_function_return(false);
			})!
			
			var counter = 0;
			var coords = [];
			var previous = self.mouse;
			var isRandom = _starts_with(mode, 'random');
			var list = [];
			
			if(isRandom){
				ells.forEach(function(ell){
					var chance = Math.ceil(ell.area / minArea);
					if(chance >= 100){
						chance = 3;
					}else if(chance >= 50){
						chance = 2;
					}else{
						chance = 1;
					};
					util.fillList(list, ell, chance);
				});
			}else{
				list.push(null);
			};
			
			_do(function(i){
				if(counter >= count || list.length <= 0 || ells.length <= 0){
					_break();
				};
				
				var item = (isRandom && (mode == 'random' || i == 0)) ? util.getRandomItem(list) : self.cutNearest(ells, previous);
				
				if(self._miss){
					var miss = self.getRandomMiss(item, previous);
					if(miss){
						coords.push(miss);
						previous = miss;
					};
				};
				
				_call_function(self.displayHoverElement, {ell: item})!
				
				var coord;
				
				if(self._onOneEll.chance > 0 && self._onOneEll.chance >= rand(1, 100) && util.hypot(item.width, item.height) >= (self.diagonal * self._onOneEll.minSize)){
					
					var amount = util.randomRange(self._onOneEll.count);
					
					util.log('Perform %i movements inside the element: %j', amount, item);
					
					if(self._onOneEll.sort){
						var temp = [];
						
						for(var i = 0; i < amount; i++){
							temp.push(self.getRandomCoord(item, 'random'));
						};
						
						while(temp.length > 1){
							var nearest = self.cutNearest(temp, previous);
							nearest.delay = 0;
							coords.push(nearest);
							previous = nearest;
						};
						
						coord = temp.pop();
					}else{
						for(var i = 0; i < amount; i++){
							coord = self.getRandomCoord(item, 'random');
							if(i < amount - 1){
								coord.delay = 0;
								coords.push(coord);
								previous = coord;
							};
						};
					};
				}else{
					coord = self.getRandomCoord(item);
				};
				
				if(self.repeat.skip){
					item.coord = {
						x: coord.x,
						y: coord.y
					};
					if(!item.isFixed){
						item.x += self._scroll.x;
						item.y += self._scroll.y;
						item.coord.x += self._scroll.x;
						item.coord.y += self._scroll.y;
					};
					moveElls.push(item);
				};
				
				coords.push(coord);
				previous = coord;
				counter++;
				
				if(isRandom && (mode == 'random' || i == 0)){
					if(mode == 'randomnearest'){
						ells = ells.filter(function(ell){return ell !== item;});
					};
					list = list.filter(function(ell){return ell !== item;});
				};
			})!
			
			_call_function(self.moveOnCoords, {coords: coords, scalableSpeed: args.scalableSpeed, gravity: args.gravity, deviation: args.deviation})!
			
			_function_return(true);
		};
		
		this.longElementMove = self.elementMove;
		
		this.shortElementMove = self.elementMove;
		
		this.doRandomAction = function(){
			var skip = [];
			if(self.isFirst || self.disableScroll || (self.target.prepare && !self.target.needScroll)){
				skip.push('scroll');
			};
			if(self.target.prepare && !self.target.needScroll && self.target.maxDistance){
				skip.push('goingBeyond');
			};
			var action = util.getRandomAction(self.actions, skip);
			
			util.log('Executing %j action with params: %j', action.name, action);
			
			_call_function(self[action.name], action)!
			var done = _result_function();
			if(done){
				self.isFirst = false;
			};
			
			_function_return(done ? action.name : null);
		};
		
		this.doOneAction = function(){			
			if(rand(0, 1) == 1){
				_function_return('nothing');
				return;
			};
			
			self.setTime(1);
			var action = null;
			_do(function(){
				if(action != null || self.getTimeLeft() < 0){
					_break();
				};
				
				_call_function(self.doRandomAction, null)!
				action = _result_function();
			})!;
			
			_function_return(action);
		};
		
		this._emulate = function(callback){
			_do(function(){
				var timeLeft = self.getTimeLeft();
				if(timeLeft < 0){
					_break();
				};
				
				_if(self.target.has && !self.target.checked && (timeLeft <= 3000 || timeLeft <= self.emulationTime * 300), function(){
					self.target.checked = true;
					
					_call_function(self.startTargetPreparing, null)!
				})!
				
				_call_function(self.doRandomAction, null)!
			}, callback);
		};
		
		this.emulate = function(callback){
			_call_function(function(){
				_call_function(self.compareTargets, null)!
				
				_if(self.emulationTime > 0, function(){
					util.log('Starting idle emulation');
					
					self._emulate()!
					
					_call_function(self.removeVisualize, null)!
					
					var duration = Math.round((Date.now() - self.emulationStart) / 1000);
					
					util.log('Emulation completed after %i sec', duration);
				})!
				
				_call_function(self.prepareTarget, null)!
				
				if(info.previousTarget != null){
					info.previousTarget.end = Date.now();
				};
			}, null, callback);
		};
	};
	
})(_Idle);