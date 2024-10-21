<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({
		id: "time",
		description: tr("Maximum emulation time"),
		default_selector: "string",
		variants: [
			{value: "disable", description: tr("Disable emulation")},
			{value: "short", type: "string", description: tr("Short emulation time")},
			{value: "medium", type: "string", description: tr("Average emulation time")},
			{value: "long", type: "string", description: tr("Long emulation time")},
			{value: "30", type: "int", description: tr("30 sec")},
			{value: "{min: 15, max: 30}", type: "expression", description: tr("From 15 to 30 sec")}
		],
		value_string: "short",
		min_number: 1,
		max_number: 999999,
		help: {
			description: tr("Maximum execution time of emulation before action.") + " " + tr("As a value can be specified as one of the three presets \"short\", \"medium\" or \"long\", or the exact value in seconds.") + " " + tr("And also you can disable emulation by specifying \"disable\".") + " " + tr("The exact emulation time will be determined immediately before the action depending on the emulation state."),
			examples: [
				{code: "short", description: tr("Short emulation time")},
				{code: "medium", description: tr("Average emulation time")},
				{code: "long", description: tr("Long emulation time")},
				{code: "disable", description: tr("Disable emulation")},
				{code: "30", description: tr("30 sec")},
				{code: "{min: 15, max: 30}", description: tr("From 15 to 30 sec")},
				{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
				{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
			]
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "accuracy",
		description: tr("Actions accuracy"),
		default_selector: "string",
		variants: [
			"low",
			"medium",
			"high"
		],
		disable_int: true,
		value_string: "medium",
		help: {
			description: tr("Accuracy of actions is a parameter that determines the degree of detail of the algorithm's actions on the page. With high accuracy, the algorithm works with fewer elements by pointing the cursor precisely from one element to another. At low accuracy, the algorithm works with more elements performing many aimless movements."),
			examples: [
				{code: "low", description: tr("The probability of misses, delays and pointing to random coordinates is increased")},
				{code: "medium", description: tr("The parameters responsible for the accuracy of actions have average values")},
				{code: "high", description: tr("The probability of misses, delays and pointing to random coordinates is reduced")},
				{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
				{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
			]
		}
	}) %>
	<%= _.template($('#input_constructor').html())({
		id: "intensity",
		description: tr("Actions intensity"),
		default_selector: "string",
		variants: [
			"low",
			"medium",
			"high"
		],
		disable_int: true,
		value_string: "medium",
		help: {
			description: tr("Intensity of actions is a parameter controls the level of algorithm activity during emulation. If the intensity is high, the algorithm will interact with the page more frequently and dynamically. At low intensity, on the contrary, the algorithm will behave more restrained and patient."),
			examples: [
				{code: "low", description: tr("The probability of sleeping and the probability of short cursor movements is increased, the cursor speed is reduced")},
				{code: "medium", description: tr("The parameters responsible for the intensity of actions have average values")},
				{code: "high", description: tr("The probability of long cursor movements and page scrolling is increased, while the probability of sleeping is reduced")},
				{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
				{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
			]
		}
	}) %>
	<%= _.template($('#block_start').html())({id:"Additional", name: tr("Actions performed"), description: tr("Using the parameters from this block, you can select what actions will be performed during emulation.")}) %>
		<%= _.template($('#input_constructor').html())({
			id: "sleep",
			description: tr("Sleep"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: [
				{value: "enable", description: tr("Perform")},
				{value: "disable", description: tr("Don't perform")}
			],
			help: {
				description: tr("Sleep random time."),
				examples: [
					{code: "enable", description: tr("Perform")},
					{code: "disable", description: tr("Don't perform")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "longElementMove",
			description: tr("Long move to element"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: [
				{value: "enable", description: tr("Perform")},
				{value: "disable", description: tr("Don't perform")}
			],
			help: {
				description: tr("Movement to a random element, with a large search radius for elements."),
				examples: [
					{code: "enable", description: tr("Perform")},
					{code: "disable", description: tr("Don't perform")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "shortElementMove",
			description: tr("Short move to element"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: [
				{value: "enable", description: tr("Perform")},
				{value: "disable", description: tr("Don't perform")}
			],
			help: {
				description: tr("Movement to a random element, with a small search radius for elements."),
				examples: [
					{code: "enable", description: tr("Perform")},
					{code: "disable", description: tr("Don't perform")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "scroll",
			description: tr("Scroll"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: [
				{value: "enable", description: tr("Perform")},
				{value: "disable", description: tr("Don't perform")}
			],
			help: {
				description: tr("Scroll at random distance."),
				examples: [
					{code: "enable", description: tr("Perform")},
					{code: "disable", description: tr("Don't perform")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "randomMove",
			description: tr("Random movement"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: [
				{value: "enable", description: tr("Perform")},
				{value: "disable", description: tr("Don't perform")}
			],
			help: {
				description: tr("Cursor movement to random coordinates."),
				examples: [
					{code: "enable", description: tr("Perform")},
					{code: "disable", description: tr("Don't perform")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "microMove",
			description: tr("Micro movement"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: [
				{value: "enable", description: tr("Perform")},
				{value: "disable", description: tr("Don't perform")}
			],
			help: {
				description: tr("Small movements of the cursor, simulating raising the mouse."),
				examples: [
					{code: "enable", description: tr("Perform")},
					{code: "disable", description: tr("Don't perform")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "goingBeyond",
			description: tr("Going beyond"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: [
				{value: "enable", description: tr("Perform")},
				{value: "disable", description: tr("Don't perform")}
			],
			help: {
				description: tr("Going beyond the screen and returning back."),
				examples: [
					{code: "enable", description: tr("Perform")},
					{code: "disable", description: tr("Don't perform")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "moveAlongText",
			description: tr("Movement along text"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: [
				{value: "enable", description: tr("Perform")},
				{value: "disable", description: tr("Don't perform")}
			],
			help: {
				description: tr("Slowly moving the cursor over an element with text from left to right to emulate reading."),
				examples: [
					{code: "enable", description: tr("Perform")},
					{code: "disable", description: tr("Don't perform")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
	<%= _.template($('#block_end').html())() %>
	<%= _.template($('#block_start').html())({id:"manualSetting", name: tr("Manual parameter setting"), description: tr("Manual parameter setting"), description: tr("Using the parameters from this block, you can manually configure some emulation parameters. Specified parameters will be taken into account and default settings will be used for unspecified ones.")}) %>
		<%= _.template($('#input_constructor').html())({
			id: "longMax",
			description: tr("Long movements"),
			default_selector: "string",
			variants: [
				"35%",
				"50%",
				"80%"
			],
			value_string: "",
			min_number: 1,
			max_number: 100,
			help: {
				description: tr("The radius of searching for elements during a long movement, measured as a percentage of the screen diagonal."),
				examples: [
					{code: "35%"},
					{code: "50%"},
					{code: "80%"},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "shortMax",
			description: tr("Short movements"),
			default_selector: "string",
			value_string: "",
			variants: [
				"15%",
				"25%",
				"30%"
			],
			min_number: 1,
			max_number: 100,
			help: {
				description: tr("The radius of searching for elements during a short movement, measured as a percentage of the screen diagonal."),
				examples: [
					{code: "15%"},
					{code: "25%"},
					{code: "30%"},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "miss",
			description: tr("Misses on an element"),
			default_selector: "string",
			variants: [
				{value: "disable", description: tr("Disable misses")},
				{value: "low", description: tr("The chance of a miss and its distance is less")},
				{value: "medium", description: tr("The chance of a miss and its distance have average values")},
				{value: "high", description: tr("The chance of a miss and its distance is greater")}
			],
			disable_int: true,
			value_string: "",
			help: {
				description: tr("The mode of performing a miss on an element. The chance of a miss and its distance depend on it."),
				examples: [
					{code: "low", description: tr("The chance of a miss and its distance is less")},
					{code: "medium", description: tr("The chance of a miss and its distance have average values")},
					{code: "high", description: tr("The chance of a miss and its distance is greater")},
					{code: "disable", description: tr("Disable misses")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "delay",
			description: tr("Delay before hover"),
			default_selector: "string",
			variants: [
				{value: "disable", description: tr("Disable delay")},
				{value: "low", description: tr("The chance of delay and its duration is less")},
				{value: "medium", description: tr("The chance of delay and its duration have average values")},
				{value: "high", description: tr("The chance of delay and its duration is greater")}
			],
			disable_int: true,
			value_string: "",
			help: {
				description: tr("The mode of performing a delay before hover. The chance of a delay and its duration depends on it."),
				examples: [
					{code: "low", description: tr("The chance of delay and its duration is less")},
					{code: "medium", description: tr("The chance of delay and its duration have average values")},
					{code: "high", description: tr("The chance of delay and its duration is greater")},
					{code: "disable", description: tr("Disable delay")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "targetScroll",
			description: tr("Scroll to target"),
			default_selector: "string",
			variants: [
				{value: "disable", description: tr("Disable scrolling to target")},
				{value: "low", description: tr("Scrolling is slower, the pauses between several spins of the wheel is longer")},
				{value: "medium", description: tr("The scrolling speed and the duration of pauses between several spins of the wheel have average values")},
				{value: "high", description: tr("Scrolling is faster, the pauses between several spins of the wheel is shorter")}
			],
			disable_int: true,
			value_string: "",
			help: {
				description: tr("The mode of performing a scroll to target. The scrolling settings and whether it will be executed depend on it."),
				examples: [
					{code: "low", description: tr("Scrolling is slower, the pauses between several spins of the wheel is longer")},
					{code: "medium", description: tr("The scrolling speed and the duration of pauses between several spins of the wheel have average values")},
					{code: "high", description: tr("Scrolling is faster, the pauses between several spins of the wheel is shorter")},
					{code: "disable", description: tr("Disable scrolling to target")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		})%>
		<%= _.template($('#input_constructor').html())({
			id: "targetDelay",
			description: tr("Delay before click"),
			default_selector: "string",
			variants: [
				{value: "disable", description: tr("Disable delay")},
				{value: "low", description: tr("The chance of delay and its duration is less")},
				{value: "medium", description: tr("The chance of delay and its duration have average values")},
				{value: "high", description: tr("The chance of delay and its duration is greater")}
			],
			disable_int: true,
			value_string: "",
			help: {
				description: tr("The mode of performing a delay before click. The chance of a delay and its duration depends on it."),
				examples: [
					{code: "low", description: tr("The chance of delay and its duration is less")},
					{code: "medium", description: tr("The chance of delay and its duration have average values")},
					{code: "high", description: tr("The chance of delay and its duration is greater")},
					{code: "disable", description: tr("Disable delay")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		})%>
		<%= _.template($('#input_constructor').html())({
			id: "filters",
			description: tr("Selecting an element to hover"),
			default_selector: "string",
			variants: [
				{value: "all", description: tr("Don't filter elements")},
				{value: "link", description: tr("Links")},
				{value: "input", description: tr("Input fields")},
				{value: "clickable", description: tr("Clickable elements")},
				{value: "header", description: tr("Headings")},
				{value: "text", description: tr("Texts")},
				{value: "image", description: tr("Images")},
				{value: "icon", description: tr("Icons")}
			],
			disable_int: true,
			value_string: "",
			help: {
				description: tr("The mode for selecting elements for hovering, by which elements will be filtered for long and short movements."),
				examples: [
					{code: "link", description: tr("Links")},
					{code: "input", description: tr("Input fields")},
					{code: "clickable", description: tr("Clickable elements")},
					{code: "header", description: tr("Headings")},
					{code: "text", description: tr("Texts")},
					{code: "image", description: tr("Images")},
					{code: "icon", description: tr("Icons")},
					{code: "all", description: tr("Don't filter elements")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "hoverMode",
			description: tr("Hover position"),
			default_selector: "string",
			variants: [
				{value: "random", description: tr("Random position")},
				{value: "tocenter", description: tr("Position close to the center")},
				{value: "randomorcenter", description: tr("Random position or close to the center")}
			],
			disable_int: true,
			value_string: "",
			help: {
				description: tr("The position on the element to which hovering will be performed."),
				examples: [
					{code: "random", description: tr("Random position")},
					{code: "tocenter", description: tr("Position close to the center")},
					{code: "randomorcenter", description: tr("Random position or close to the center")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "maxRepeatSkip",
			description: tr("Re-hovering over an element"),
			default_selector: "int",
			disable_string: true,
			variants: [
				{value: "0", type: "int", description: tr("The element can be re-hovered immediately")},
				{value: "1", type: "int", description: tr("The element can be re-hovered after one iteration of move to element, from the search of which this element will be excluded")},
				{value: "3", type: "int", description: tr("The element can be re-hovered after 3 iterations of move to element, from the search of which this element will be excluded")},
				{value: "-1", type: "int", description: tr("The element can be re-hovered only after it goes out of visibility")}
			],
			value_number: "",
			min_number: -1,
			max_number: 999999,
			help: {
				description: tr("The number of iterations of move to element after which the element can be hovered again. Also, the element can be hovered again if it goes out of visibility while scrolling."),
				examples: [
					{code: "0", description: tr("The element can be re-hovered immediately")},
					{code: "1", description: tr("The element can be re-hovered after one iteration of move to element, from the search of which this element will be excluded")},
					{code: "3", description: tr("The element can be re-hovered after 3 iterations of move to element, from the search of which this element will be excluded")},
					{code: "-1", description: tr("The element can be re-hovered only after it goes out of visibility")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "overlapByPoints",
			description: tr("Overlap by points"),
			default_selector: "int",
			disable_string: true,
			variants: [
				{value: "1", type: "int", description: tr("An element will be considered accessible if at least one of the points on it is not overlapped")},
				{value: "2", type: "int", description: tr("An element will be considered accessible if at least 2 points on it are not overlapped")},
				{value: "3", type: "int", description: tr("An element will be considered accessible if at least 3 points on it are not overlapped")},
				{value: "4", type: "int", description: tr("An element will be considered accessible if at least 4 points on it are not overlapped")},
				{value: "5", type: "int", description: tr("The element will be considered accessible only if all 5 points are not overlapped")}
			],
			value_number: "",
			min_number: 1,
			max_number: 5,
			help: {
				description: tr("The number of points on the element by which it will be determined whether the found element is overlapped, a maximum of 5 points: top right, top left, center, bottom right, bottom left."),
				examples: [
					{code: "1", description: tr("An element will be considered accessible if at least one of the points on it is not overlapped")},
					{code: "2", description: tr("An element will be considered accessible if at least 2 points on it are not overlapped")},
					{code: "3", description: tr("An element will be considered accessible if at least 3 points on it are not overlapped")},
					{code: "4", description: tr("An element will be considered accessible if at least 4 points on it are not overlapped")},
					{code: "5", description: tr("The element will be considered accessible only if all 5 points are not overlapped")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "reverseScroll",
			description: tr("Reverse scroll chance"),
			default_selector: "string",
			variants: [
				{value: "disable", description: tr("Disable reverse scrolling")},
				{value: "low", description: tr("The chance of reverse scrolling is less")},
				{value: "medium", description: tr("The chance of reverse scrolling have average values")},
				{value: "high", description: tr("The chance of reverse scrolling is greater")},
				{value: "5", type: "int", description: tr("The chance of reverse scrolling 5 percent")}
			],
			value_string: "",
			min_number: 0,
			max_number: 100,
			help: {
				description: tr("Chance of a reverse scroll drop. As a value can be specified as one of the four presets \"disable\", \"low\", \"medium\" or \"high\", or an exact number from 0 to 100."),
				examples: [
					{code: "low", description: tr("The chance of reverse scrolling is less")},
					{code: "medium", description: tr("The chance of reverse scrolling have average values")},
					{code: "high", description: tr("The chance of reverse scrolling is greater")},
					{code: "disable", description: tr("Disable reverse scrolling")},
					{code: "5", description: tr("The chance of reverse scrolling 5 percent")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
		<%= _.template($('#input_constructor').html())({
			id: "additionalEmulation",
			description: tr("Additional emulation"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			variants: [
				{value: "enable", description: tr("Perform")},
				{value: "disable", description: tr("Don't perform")}
			],
			help: {
				description: tr("Perform additional emulation during certain actions, such as \"<b>Type Text</b>\", \"<b>Move And Click On Element</b>\" and others.") + " " + tr("Additional emulation is small actions such as sleep, mouse movement, and in rare cases scrolling performed before, during, and/or after the target action. This emulation may also include improvements to emulate the target action, such as text type stuttering, typing speed changes, and improved hover position selection."),
				examples: [
					{code: "enable", description: tr("Perform")},
					{code: "disable", description: tr("Don't perform")},
					{code: tr("Empty string"), description: tr("Use the previously set value(If it exists) or the default value.")},
					{code: tr("*"), description: tr("Reset the previously set value and use the default value.")}
				]
			}
		}) %>
	<%= _.template($('#block_end').html())() %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Enable idle emulation before actions which works with browser elements like clicking or typing text.</div>
	<div class="tr tooltip-paragraph-fold">Idle emulation is a more plausible replacement for the "<a href="#!/sleep">Sleep</a>" action. It emulates viewing the current page as if the user is exploring it or searching for something on it.</div>
	<div class="tr tooltip-paragraph-fold">During emulation, page scrolling, mouse cursor movement, and sleep may occur, but not clicks.</div>
	<div class="tr tooltip-paragraph-fold">This action will not execute idle emulation instantly, instead it will enable emulation before each browser action which has a target, such as "<b>Click On Element</b>", "<b>Type Text</b>" and others. By default it is disabled.</div>
	<div class="tr tooltip-paragraph-fold">A good place to use this action is the script start. Placing this action at the start of the script will enable automatic idle emulation for the whole script.</div>
	<div class="tr tooltip-paragraph-fold">This action will set general settings for emulation, which will be used in all subsequent actions. The only exception is if specific action has its own emulation settings set.</div>
	<div class="tr tooltip-paragraph-fold">If you want to set emulation before specific action, you can edit emulation settings inside the action itself.</div>
	<div class="tr tooltip-paragraph-fold">If you want to start emulation instantly, use <a href="#!/IdleEmulationNew">idle emulation</a> action.</div>
	<div class="tr tooltip-paragraph-fold">Only the specified parameters will be saved to the general settings, and the previously set values or default values will be used for unspecified parameters.</div>
	<div class="tr tooltip-paragraph-fold">This makes it possible to combine settings from several actions. General settings take precedence over default settings, and settings in the action itself take precedence over both general and default settings.</div>
	<div class="tr tooltip-paragraph-fold">You can reset previously set values for individual parameters by specifying asterisk <code>*</code> as their value.</div>
	<div class="tr tooltip-paragraph-last-fold">You can reset all general settings using the "<a href="#!/IdleEmulationResetGeneralSettings">Disable automatic idle emulation</a>" action.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
