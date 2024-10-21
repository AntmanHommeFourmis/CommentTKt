(function(idle){
	const util = idle.util;
	
	idle._target = function(value){
		const self = this;
		
		if(value instanceof idle._target){
			return value;
		};
		
		if(!(this instanceof idle._target)){
			return new idle._target(value);
		};
		
		if(value === _image()){
			this.type = 'image';
			this.value = value;
		}else if(typeof value=='object'){
			this.type = 'coordinate';
			this.value = util.validateArg(value, {x: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 0}, required: true, name: 'X coordinate'}, y: {type: ['number', 'string'], toNum: true, nan: false, size: {min: 0}, required: true, name: 'Y coordinate'}});
		}else{
			this.type = 'element';
			this.value = util.validateArg(value, {type: 'string', trim: true}, 'Element selector');
		}
		
		this.getInfo = function(){
			var extended = _avoid_nilb(_function_argument("extended"), false);
			
			_if(self.type == 'element', function(){
				_call_function(util.executeOn, {selector: self.value, params: {DATA: null}, script: "[[DATA]] = (function(){" + "\r\n" + 
					"if(!self){" + "\r\n" + 
						"return null;" + "\r\n" + 
					"};" + "\r\n" + 
					"\r\n" + 
					"let rect = _BAS_HIDE(BrowserAutomationStudio_GetBoundingClientRect)(self);" + "\r\n" + 
					"let style = _BAS_SAFE(Window.getComputedStyle)(self);" + "\r\n" + 
					"if(_BAS_SAFE(Math.round)(rect.height) <= 0 || _BAS_SAFE(Math.round)(rect.width) <= 0 || style.display == 'none' || style.visibility == 'hidden'){" + "\r\n" + 
						"return null;" + "\r\n" + 
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
						"if(style.position == 'fixed' || _BAS_SAFE($Node.nodeType)(_BAS_SAFE($Node.parentNode)(el)) != 1){" + "\r\n" + 
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
					"let item = {" + "\r\n" + 
						"x: rect.left + positionx," + "\r\n" + 
						"y: rect.top + positiony," + "\r\n" + 
						"isFixed: isFixed(self, style)," + "\r\n" + 
						"width: rect.right - rect.left," + "\r\n" + 
						"height: rect.bottom - rect.top" + "\r\n" + 
					"};" + "\r\n" + 
					"item.area = _BAS_SAFE(Math.ceil)(item.width * item.height);" + "\r\n" + 
					"\r\n" + 
					"return item;" + "\r\n" + 
				"})();"})!
				_function_return(_result_function()["DATA"]);
			})!
			
			if(self.type == 'image'){
				var info = self.value.get_info();
				_function_return(info.exist ? {
					x: info.x,
					y: info.y,
					isFixed: false,
					width: info.width,
					height: info.height,
					area: info.width * info.height
				} : null);
			}else if(extended){
				_function_return({
					x: self.value.x - 20,
					y: self.value.y - 20,
					isFixed: false,
					width: 40,
					height: 40,
					area: 40 * 40
				});
			}else{
				_function_return({
					x: self.value.x,
					y: self.value.y
				});
			};
		};
		
		this.getDelta = function(){
			_if(self.type == 'element', function(){
				var selector = self.value.split(">FRAME>")[0];
				_call_function(util.executeOn, {selector: selector, params: {DELTA: null}, script: "[[DELTA]] = (function(){" + "\r\n" + 
					"if(!self){" + "\r\n" + 
						"return null;" + "\r\n" + 
					"};" + "\r\n" + 
					"\r\n" + 
					"let rect = _BAS_HIDE(BrowserAutomationStudio_GetBoundingClientRect)(self);" + "\r\n" + 
					"let style = _BAS_SAFE(Window.getComputedStyle)(self);" + "\r\n" + 
					"if (_BAS_SAFE(Math.round)(rect.height) <= 0 || _BAS_SAFE(Math.round)(rect.width) <= 0 || style.display == 'none' || style.visibility == 'hidden'){" + "\r\n" + 
						"return null;" + "\r\n" + 
					"};" + "\r\n" + 
					"\r\n" + 
					"let top = rect.top;" + "\r\n" + 
					"let bottom = rect.bottom;" + "\r\n" + 
					"let height = _BAS_SAFE(Window.innerHeight);" + "\r\n" + 
					"let centerElement = _BAS_SAFE(Math.floor)((top + bottom) * 0.5);" + "\r\n" + 
					"let centerViewport = _BAS_SAFE(Math.floor)((height) * 0.5);" + "\r\n" + 
					"\r\n" + 
					"if((top < 0 && bottom > height) || (top >= 0 && bottom <= height)){" + "\r\n" + 
						"return 0;" + "\r\n" + 
					"};" + "\r\n" + 
					"\r\n" + 
					"return _BAS_SAFE(Math.floor)(centerElement - centerViewport);" + "\r\n" + 
				"})();"})!
				_function_return(_result_function()["DELTA"]);
			})!
			
			var target = null;
			
			if(self.type == 'image'){
				var info = self.value.get_info();
				if(!info.exist){
					_function_return(null);
					return;
				};
				target = info.y + info.height * 0.5;
			}else{
				target = self.value.y;
			};
			
			_call_function(util.getScreenSettings, null)!
			var screen = _result_function();
			
			if((screen.scroll.y <= target) && (target <= screen.height + screen.scroll.y)){
				_function_return(0);
				return;
			};
			
			_function_return(Math.floor(target - (screen.scroll.y + screen.height * 0.5)));
		};
		
		this.getScrollTarget = function(){
			if(self.type == 'element'){
				return self.value;
			}else if(self.type == 'image'){
				var info = self.value.get_info();
				return info.y + info.height * 0.5;
			}else{
				return self.value.y;
			};
		};
		
		this._clarify = function(){
			var args = _function_arguments();
			
			_if_else(self.type == 'element', function(){
				get_element_selector(self.value, false).clarify(args.x, args.y)!
			}, function(){
				_if(self.type == 'image', function(){
					self.value.clarify(args.x, args.y)!
				})!
			})!
		};
		
		this.clarify = function(){
			var args = _function_arguments() || {};
		
			_call_function(self._clarify, args)!
			_call(_clarify, args.moveSettings || {})!
		};
		
		this.randomPoint = function(){
			_if_else(self.type == 'element', function(){
				var oldSel = typeof _SELECTOR == 'undefined' ? undefined : _SELECTOR;
				_SELECTOR = self.value;
				_call(_random_point, {})!
				_SELECTOR = oldSel;
			}, function(){
				self.value.random_point()!
			})!
			var strCoord = _result();
			
			if(strCoord.length < 1){
				_function_return(null);
			};
			
			var coord = strCoord.split(',').map(Math.round);
			_function_return({
				x: coord[0],
				y: coord[1]
			});
		};
		
		this._move = function(){
			var args = _function_arguments() || {};
			var moveSettings = args.moveSettings || {};
			
			_if_else(self.type == 'coordinate', function(){
				move(self.value.x, self.value.y, moveSettings)!
			}, function(){
				move(moveSettings)!
			})!
		};
		
		this.move = function(){
			var args = _function_arguments() || {};
			
			_if(self.type == 'coordinate', function(){
				_call_function(self._move, args)!
				_function_return({x: self.value.x, y: self.value.y});
			})!
			
			var moveMode = args.moveMode || 'center';
			
			_call_function(self.randomPoint, null)!
			var coord = _result_function();
			
			if(!coord){
				_function_return(null);
				return;
			};
			
			_if(moveMode != 'center', function(){
				_call_function(self.getInfo, null)!
				var info = _result_function();
				
				if(!info){
					_break();
					return;
				};				
				
				_call_function(util.getScreenSettings, null)!
				var screen = _result_function();
				
				coord = util.getRandomCoord(info, screen.cursor, moveMode);
				util.correctCoord(coord, screen);
				coord.x += screen.scroll.x;
				coord.y += screen.scroll.y;
				_set_result(coord.x + "," + coord.y);
			})!
			
			_call_function(self._move, args)!
			
			_call_function(self.clarify, {x: coord.x, y: coord.y, moveSettings: args.moveSettings || {}})!
			
			_function_return(coord);
		};
		
		this.click = function(){
			var args = _function_arguments() || {};
			
			_call_function(self[args.clickType || 'left'], args)!
		};
		
		this.left = function(){
			var args = _function_arguments() || {};
			
			_if_else(args.holdCtrl, function(){
				_type("<CONTROL><MOUSELEFT>", 100)!
			}, function(){
				_if_else(self.type == 'coordinate', function(){
					mouse(self.value.x, self.value.y)!
				}, function(){
					mouse(args.x, args.y)!
				})!
			})!
		};
		
		this.right = function(){
			_type("<MOUSERIGHT>", 100)!
		};
		
		this.double = function(){
			_type("<MOUSEDOUBLE>", 100)!
		};
	};
	
})(_Idle);