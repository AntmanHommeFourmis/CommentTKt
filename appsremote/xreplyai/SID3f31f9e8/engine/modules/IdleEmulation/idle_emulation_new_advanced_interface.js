<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({
		id: "time",
		description: tr("Emulation time"),
		default_selector: "string",
		variants: [
			{value: "short", type: "string"},
			{value: "medium", type: "string"},
			{value: "long", type: "string"},
			{value: "300", type: "int"},
			{value: "{min: 150, max: 300}", type: "expression"}
		],
		value_string: "long",
		min_number: 1,
		max_number: 999999,
		help: {
			description: tr(""),
			examples: []
		}
	}) %>
	<%= _.template($('#line').html())() %>
		<%= _.template($('#checkbox').html())({
			id: "sleep",
			title: tr("Sleep"),
			checked: true
		}) %>
		<span data-visible-if-checked="sleep" style="display: table-cell; width: 100vw; padding-left: 10px;">
			<%= _.template($('#input_constructor').html())({
				id: "sleepChance",
				description: tr("Sleep chance"),
				default_selector: "int",
				disable_string: true,
				value_number: 32,
				min_number: 1,
				max_number: 100,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "sleepMin",
				description: tr("Minimum sleep time"),
				default_selector: "int",
				disable_string: true,
				value_number: 1000,
				min_number: 100,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "sleepMax",
				description: tr("Maximum sleep time"),
				default_selector: "int",
				disable_string: true,
				value_number: 5000,
				min_number: 100,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
		</span>
	<%= _.template($('#line').html())() %>
		<%= _.template($('#checkbox').html())({
			id: "scroll",
			title: tr("Scroll"),
			checked: true
		}) %>
		<span data-visible-if-checked="scroll" style="display: table-cell; width: 100vw; padding-left: 10px;">
			<%= _.template($('#input_constructor').html())({
				id: "scrollChance",
				description: tr("Scroll chance"),
				default_selector: "int",
				disable_string: true,
				value_number: 24,
				min_number: 1,
				max_number: 100,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "scrollDirection",
				description: tr("Scroll direction"),
				default_selector: "string",
				variants: [
					"random",
					"random2",
					"randomtoend",
					"up",
					"down"
				],
				disable_int: true,
				value_string: "randomtoend",
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "scrollMinDistance",
				description: tr("Minimum scroll distance"),
				default_selector: "int",
				disable_string: true,
				value_number: 400,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "scrollMaxDistance",
				description: tr("Maximum scroll distance"),
				default_selector: "int",
				disable_string: true,
				value_number: 900,
				min_number: 1,
				max_number: 999999,
				help:{
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "scrollMinPause",
				description: tr("Minimum pause"),
				default_selector: "int",
				disable_string: true,
				value_number: 100,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "scrollMaxPause",
				description: tr("Maximum pause"),
				default_selector: "int",
				disable_string: true,
				value_number: 400,
				min_number: 1,
				max_number: 999999,
				help:{
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "scrollMoveChance",
				description: tr("Move chance"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "0.2",
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#checkbox').html())({
				id: "scrollMoveInScrollDirection",
				title: tr("Move in scroll direction"),
				checked: true
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "scrollMoveBeyond",
				description: tr("Screen border"),
				default_selector: "string",
				disable_int: true,
				variants: ["random", "avoid", "goandreturn"],
				value_string: "random",
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "scrollMoveMinDistance",
				description: tr("Move minimum distance"),
				default_selector: "int",
				disable_string: true,
				value_number: 5,
				min_number: 0,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "scrollMoveMaxDistance",
				description: tr("Move maximum distance"),
				default_selector: "int",
				disable_string: true,
				value_number: 35,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "scrollMoveGravity",
				description: tr("Move gravity"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "6",
				help: {
					description: tr("Floating point value which sets force of cursor attraction to strait line between starting and ending points. If you set this value too big, cursor will move by straight line, if you set it too low, cursor will move chaotically on the screen.")
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "scrollMoveDeviation",
				description: tr("Move deviation"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "2.5",
				help: {
					description: tr("Floating point value which sets force of cursor deviation from strait line between starting and ending points. Think of it as a wind, which blows cursor away from the line - the shortest path between two points.")
				}
			}) %>
		</span>
	<%= _.template($('#line').html())() %>
		<%= _.template($('#checkbox').html())({
			id: "longElementMove",
			title: tr("Long move to element"),
			checked: true
		}) %>
		<span data-visible-if-checked="longElementMove" style="display: table-cell; width: 100vw; padding-left: 10px;">
			<%= _.template($('#input_constructor').html())({
				id: "longMoveChance",
				description: tr("Long move chance"),
				default_selector: "int",
				disable_string: true,
				value_number: 14,
				min_number: 1,
				max_number: 100,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "longMoveMode",
				description: tr("Element selection mode"),
				default_selector: "string",
				variants: [
					"random",
					"randomnearest",
					"nearest"
				],
				disable_int: true,
				value_string: "random",
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "longMoveMinCount",
				description: tr("Minimum number of movements"),
				default_selector: "int",
				disable_string: true,
				value_number: 1,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "longMoveMaxCount",
				description: tr("Maximum number of movements"),
				default_selector: "int",
				disable_string: true,
				value_number: 3,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "longMoveMaxDistance",
				description: tr("Maximum moving distance"),
				default_selector: "string",
				value_string: "50%",
				min_number: 1,
				max_number: 100,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#checkbox').html())({
				id: "longMoveScalableSpeed",
				title: tr("Scalable speed"),
				checked: true
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "longMoveGravity",
				description: tr("Move gravity"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "6",
				help: {
					description: tr("Floating point value which sets force of cursor attraction to strait line between starting and ending points. If you set this value too big, cursor will move by straight line, if you set it too low, cursor will move chaotically on the screen.")
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "longMoveDeviation",
				description: tr("Move deviation"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "2.5",
				help: {
					description: tr("Floating point value which sets force of cursor deviation from strait line between starting and ending points. Think of it as a wind, which blows cursor away from the line - the shortest path between two points.")
				}
			}) %>
		</span>
	<%= _.template($('#line').html())() %>
		<%= _.template($('#checkbox').html())({
			id: "shortElementMove",
			title: tr("Short move to element"),
			checked: true
		}) %>
		<span data-visible-if-checked="shortElementMove" style="display: table-cell; width: 100vw; padding-left: 10px;">
			<%= _.template($('#input_constructor').html())({
				id: "shortMoveChance",
				description: tr("Short move chance"),
				default_selector: "int",
				disable_string: true,
				value_number: 14,
				min_number: 1,
				max_number: 100,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "shortMoveMode",
				description: tr("Element selection mode"),
				default_selector: "string",
				variants: [
					"random",
					"randomnearest",
					"nearest"
				],
				disable_int: true,
				value_string: "random",
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "shortMoveMinCount",
				description: tr("Minimum number of movements"),
				default_selector: "int",
				disable_string: true,
				value_number: 1,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "shortMoveMaxCount",
				description: tr("Maximum number of movements"),
				default_selector: "int",
				disable_string: true,
				value_number: 3,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "shortMoveMaxDistance",
				description: tr("Maximum moving distance"),
				default_selector: "string",
				value_string: "25%",
				min_number: 1,
				max_number: 100,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#checkbox').html())({
				id: "shortMoveScalableSpeed",
				title: tr("Scalable speed"),
				checked: true
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "shortMoveGravity",
				description: tr("Move gravity"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "6",
				help: {
					description: tr("Floating point value which sets force of cursor attraction to strait line between starting and ending points. If you set this value too big, cursor will move by straight line, if you set it too low, cursor will move chaotically on the screen.")
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "shortMoveDeviation",
				description: tr("Move deviation"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "2.5",
				help: {
					description: tr("Floating point value which sets force of cursor deviation from strait line between starting and ending points. Think of it as a wind, which blows cursor away from the line - the shortest path between two points.")
				}
			}) %>
		</span>
	<%= _.template($('#line').html())() %>
		<%= _.template($('#checkbox').html())({
			id: "randomMove",
			title: tr("Random movement"),
			checked: true
		}) %>
		<span data-visible-if-checked="randomMove" style="display: table-cell; width: 100vw; padding-left: 10px;">
			<%= _.template($('#input_constructor').html())({
				id: "randomMoveChance",
				description: tr("Random move chance"),
				default_selector: "int",
				disable_string: true,
				value_number: 9,
				min_number: 1,
				max_number: 100,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "randomMoveMinCount",
				description: tr("Minimum number of movements"),
				default_selector: "int",
				disable_string: true,
				value_number: 1,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "randomMoveMaxCount",
				description: tr("Maximum number of movements"),
				default_selector: "int",
				disable_string: true,
				value_number: 3,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#checkbox').html())({
				id: "randomMoveScalableSpeed",
				title: tr("Scalable speed"),
				checked: true
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "randomMoveGravity",
				description: tr("Move gravity"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "6",
				help: {
					description: tr("Floating point value which sets force of cursor attraction to strait line between starting and ending points. If you set this value too big, cursor will move by straight line, if you set it too low, cursor will move chaotically on the screen.")
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "randomMoveDeviation",
				description: tr("Move deviation"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "2.5",
				help: {
					description: tr("Floating point value which sets force of cursor deviation from strait line between starting and ending points. Think of it as a wind, which blows cursor away from the line - the shortest path between two points.")
				}
			}) %>
		</span>
	<%= _.template($('#line').html())() %>
		<%= _.template($('#checkbox').html())({
			id: "microMove",
			title: tr("Micro movement"),
			checked: true
		}) %>
		<span data-visible-if-checked="microMove" style="display: table-cell; width: 100vw; padding-left: 10px;">
			<%= _.template($('#input_constructor').html())({
				id: "microMoveChance",
				description: tr("Micro move chance"),
				default_selector: "int",
				disable_string: true,
				value_number: 3,
				min_number: 1,
				max_number: 100,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "microMoveMinCount",
				description: tr("Minimum number of movements"),
				default_selector: "int",
				disable_string: true,
				value_number: 1,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "microMoveMaxCount",
				description: tr("Maximum number of movements"),
				default_selector: "int",
				disable_string: true,
				value_number: 3,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "microMoveMinDistance",
				description: tr("Minimum moving distance"),
				default_selector: "int",
				disable_string: true,
				value_number: 0,
				min_number: 0,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "microMoveMaxDistance",
				description: tr("Maximum moving distance"),
				default_selector: "int",
				disable_string: true,
				value_number: 8,
				min_number: 1,
				max_number: 999999,
				help:{
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#checkbox').html())({
				id: "microMoveScalableSpeed",
				title: tr("Scalable speed"),
				checked: false
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "microMoveMinSpeed",
				description: tr("Minimum moving speed"),
				default_selector: "int",
				disable_string: true,
				value_number: 80,
				min_number: 1,
				max_number: 1000,
				help: {
					description: tr("Mouse movement speed as floating point value, if you change this, don't forget to change gravity and deviation proportionally.")
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "microMoveMaxSpeed",
				description: tr("Maximum moving speed"),
				default_selector: "int",
				disable_string: true,
				value_number: 100,
				min_number: 1,
				max_number: 1000,
				help: {
					description: tr("Mouse movement speed as floating point value, if you change this, don't forget to change gravity and deviation proportionally.")
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "microMoveGravity",
				description: tr("Move gravity"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "6",
				help: {
					description: tr("Floating point value which sets force of cursor attraction to strait line between starting and ending points. If you set this value too big, cursor will move by straight line, if you set it too low, cursor will move chaotically on the screen.")
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "microMoveDeviation",
				description: tr("Move deviation"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "2.5",
				help: {
					description: tr("Floating point value which sets force of cursor deviation from strait line between starting and ending points. Think of it as a wind, which blows cursor away from the line - the shortest path between two points.")
				}
			}) %>
		</span>
	<%= _.template($('#line').html())() %>
		<%= _.template($('#checkbox').html())({
			id: "goingBeyond",
			title: tr("Going beyond"),
			checked: true
		}) %>
		<span data-visible-if-checked="goingBeyond" style="display: table-cell; width: 100vw; padding-left: 10px;">
			<%= _.template($('#input_constructor').html())({
				id: "goingBeyondChance",
				description: tr("Going beyond chance"),
				default_selector: "int",
				disable_string: true,
				value_number: 1,
				min_number: 1,
				max_number: 100,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "goingBeyondMinDistance",
				description: tr("Minimum moving distance"),
				default_selector: "int",
				disable_string: true,
				value_number: 300,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "goingBeyondMaxDistance",
				description: tr("Maximum moving distance"),
				default_selector: "int",
				disable_string: true,
				value_number: 800,
				min_number: 1,
				max_number: 999999,
				help:{
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "goingBeyondUp",
				description: tr("Up"),
				default_selector: "int",
				disable_string: true,
				value_number: 47,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "goingBeyondRight",
				description: tr("Right"),
				default_selector: "int",
				disable_string: true,
				value_number: 5,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "goingBeyondDown",
				description: tr("Down"),
				default_selector: "int",
				disable_string: true,
				value_number: 47,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "goingBeyondLeft",
				description: tr("Left"),
				default_selector: "int",
				disable_string: true,
				value_number: 1,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#checkbox').html())({
				id: "goingBeyondScalableSpeed",
				title: tr("Scalable speed"),
				checked: true
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "goingBeyondGravity",
				description: tr("Move gravity"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "6",
				help: {
					description: tr("Floating point value which sets force of cursor attraction to strait line between starting and ending points. If you set this value too big, cursor will move by straight line, if you set it too low, cursor will move chaotically on the screen.")
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "goingBeyondDeviation",
				description: tr("Move deviation"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "2.5",
				help: {
					description: tr("Floating point value which sets force of cursor deviation from strait line between starting and ending points. Think of it as a wind, which blows cursor away from the line - the shortest path between two points.")
				}
			}) %>
		</span>
	<%= _.template($('#line').html())() %>
		<%= _.template($('#checkbox').html())({
			id: "moveAlongText",
			title: tr("Movement along text"),
			checked: true
		}) %>
		<span data-visible-if-checked="moveAlongText" style="display: table-cell; width: 100vw; padding-left: 10px;">
			<%= _.template($('#input_constructor').html())({
				id: "moveAlongTextChance",
				description: tr("Movement along text chance"),
				default_selector: "int",
				disable_string: true,
				value_number: 3,
				min_number: 1,
				max_number: 100,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "moveAlongTextMinLength",
				description: tr("Minimum text length"),
				default_selector: "int",
				disable_string: true,
				value_number: 40,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#checkbox').html())({
				id: "moveAlongTextScalableSpeed",
				title: tr("Scalable speed"),
				checked: false
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "moveAlongTextMinSpeed",
				description: tr("Minimum moving speed"),
				default_selector: "int",
				disable_string: true,
				value_number: 90,
				min_number: 1,
				max_number: 1000,
				help: {
					description: tr("Mouse movement speed as floating point value, if you change this, don't forget to change gravity and deviation proportionally.")
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "moveAlongTextMaxSpeed",
				description: tr("Maximum moving speed"),
				default_selector: "int",
				disable_string: true,
				value_number: 100,
				min_number: 1,
				max_number: 1000,
				help: {
					description: tr("Mouse movement speed as floating point value, if you change this, don't forget to change gravity and deviation proportionally.")
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "moveAlongTextGravity",
				description: tr("Move gravity"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "7",
				help: {
					description: tr("Floating point value which sets force of cursor attraction to strait line between starting and ending points. If you set this value too big, cursor will move by straight line, if you set it too low, cursor will move chaotically on the screen.")
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "moveAlongTextDeviation",
				description: tr("Move deviation"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "2",
				help: {
					description: tr("Floating point value which sets force of cursor deviation from strait line between starting and ending points. Think of it as a wind, which blows cursor away from the line - the shortest path between two points.")
				}
			}) %>
		</span>
	<%= _.template($('#line').html())() %>
		<%= _.template($('#checkbox').html())({
			id: "onOneEll",
			title: tr("Movements on one element"),
			checked: true
		}) %>
		<span data-visible-if-checked="onOneEll" style="display: table-cell; width: 100vw; padding-left: 10px;">
			<%= _.template($('#input_constructor').html())({
				id: "onOneEllChance",
				description: tr("Movements on one element chance"),
				default_selector: "int",
				disable_string: true,
				value_number: 40,
				min_number: 1,
				max_number: 100,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "onOneEllMinSize",
				description: tr("Minimum element size"),
				default_selector: "expression",
				disable_int: true,
				disable_string: true,
				value_string: "0.2",
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#checkbox').html())({
				id: "onOneEllSort",
				title: tr("Sequential movements"),
				checked: false
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "onOneEllMinCount",
				description: tr("Minimum number of movements"),
				default_selector: "int",
				disable_string: true,
				value_number: 2,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
			<%= _.template($('#input_constructor').html())({
				id: "onOneEllMaxCount",
				description: tr("Maximum number of movements"),
				default_selector: "int",
				disable_string: true,
				value_number: 3,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			}) %>
		</span>
	<%= _.template($('#line').html())() %>
		<%= _.template($('#checkbox').html())({
			id: "miss",
			title: tr("Misses on an element"),
			checked: true
		}) %>
		<span data-visible-if-checked="miss" style="display: table-cell; width: 100vw; padding-left: 10px;">
			<%= _.template($('#input_constructor').html())({
				id: "missChance",
				description: tr("Miss chance"),
				default_selector: "int",
				disable_string: true,
				value_number: 5,
				min_number: 1,
				max_number: 100,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "missMinDistance",
				description: tr("Minimum miss distance"),
				default_selector: "int",
				disable_string: true,
				value_number: 4,
				min_number: 1,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "missMaxDistance",
				description: tr("Maximum miss distance"),
				default_selector: "int",
				disable_string: true,
				value_number: 10,
				min_number: 1,
				max_number: 999999,
				help:{
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "missMaxArea",
				description: tr("Maximum element area"),
				default_selector: "int",
				disable_string: true,
				value_number: 0,
				min_number: 0,
				max_number: 999999,
				help:{
					description: tr(""),
					examples: []
				}
			})%>
		</span>
	<%= _.template($('#line').html())() %>
		<%= _.template($('#checkbox').html())({
			id: "delay",
			title: tr("Delay before hover"),
			checked: true
		}) %>
		<span data-visible-if-checked="delay" style="display: table-cell; width: 100vw; padding-left: 10px;">
			<%= _.template($('#input_constructor').html())({
				id: "delayChance",
				description: tr("Delay chance"),
				default_selector: "int",
				disable_string: true,
				value_number: 80,
				min_number: 1,
				max_number: 100,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "delayMin",
				description: tr("Minimum delay"),
				default_selector: "int",
				disable_string: true,
				value_number: 100,
				min_number: 10,
				max_number: 999999,
				help: {
					description: tr(""),
					examples: []
				}
			})%>
			<%= _.template($('#input_constructor').html())({
				id: "delayMax",
				description: tr("Maximum delay"),
				default_selector: "int",
				disable_string: true,
				value_number: 500,
				min_number: 10,
				max_number: 999999,
				help:{
					description: tr(""),
					examples: []
				}
			})%>
		</span>
	<%= _.template($('#line').html())() %>
	<%= _.template($('#input_constructor').html())({
		id: "filters",
		description: tr("Selecting an element to hover"),
		default_selector: "string",
		variants: [
			"all",
			"link",
			"input",
			"clickable",
			"header",
			"text",
			"image",
			"icon"
		],
		disable_int: true,
		value_string: "all",
		help: {
			description: tr(""),
			examples: []
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "hoverMode",
		description: tr("Hover position"),
		default_selector: "string",
		variants: [
			"random",
			"tocenter",
			"randomorcenter"
		],
		disable_int: true,
		value_string: "randomorcenter",
		help: {
			description: tr(""),
			examples: []
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "maxRepeatSkip",
		description: tr("Re-hovering over an element"),
		default_selector: "int",
		disable_string: true,
		variants: [
			{value: "-1", type: "int"},
			{value: "1", type: "int"},
			{value: "3", type: "int"}
		],
		value_number: 3,
		min_number: -1,
		max_number: 999999,
		help: {
			description: tr(""),
			examples: []
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "overlapByPoints",
		description: tr("Overlap by points"),
		default_selector: "int",
		disable_string: true,
		variants: [
			{value: "1", type: "int"},
			{value: "2", type: "int"},
			{value: "3", type: "int"},
			{value: "4", type: "int"},
			{value: "5", type: "int"}
		],
		value_number: 2,
		min_number: 1,
		max_number: 5,
		help: {
			description: tr(""),
			examples: []
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "reverseScroll",
		description: tr("Reverse scroll chance"),
		default_selector: "int",
		variants: [
			"disable",
			"low",
			"medium",
			"high"
		],
		value_number: 5,
		help: {
			description: tr(""),
			examples: []
		}
	}) %>
	<%= _.template($('#line').html())() %>
	<%= _.template($('#input_constructor').html())({
		id: "mouseMinSpeed",
		description: tr("Minimum mouse speed"),
		default_selector: "int",
		disable_string: true,
		value_number: 100,
		min_number: 1,
		max_number: 1000,
		help: {
			description: tr("Mouse movement speed as floating point value, if you change this, don't forget to change gravity and deviation proportionally.")
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "mouseMaxSpeed",
		description: tr("Maximum mouse speed"),
		default_selector: "int",
		disable_string: true,
		value_number: 100,
		min_number: 1,
		max_number: 1000,
		help: {
			description: tr("Mouse movement speed as floating point value, if you change this, don't forget to change gravity and deviation proportionally.")
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "scrollSpeed",
		description: tr("Scroll speed"),
		default_selector: "expression",
		disable_int: true,
		disable_string: true,
		value_string: "100",
		help: {
			description: tr(""),
			examples: []
		}
	}) %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Imitate user behavior on webpage.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
