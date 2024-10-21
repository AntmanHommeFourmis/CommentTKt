_SMS.SmsRegApi.prototype.getRawCountry = function(country){
	var countries = {
		"Any": "all",
		"RU": "ru",
		"KZ": "kz",
		"UA": "ua",
		"PL": "pl",
		"GB": "gb",
		"EE": "ee",
		"DE": "de",
		"LT": "lt",
		"SE": "se",
		"NL": "nl",
		"LV": "lv",
		"AT": "at",
		"CZ": "cz",
		"FR": "fr",
		"MD": "md",
		"PT": "pt",
		"GR": "gr",
		"SI": "si",
		"CN": "cn"
	};
	return countries.hasOwnProperty(country) ? countries[country] : countries["Any"];
};