_SMS.VakSmsApi.prototype.getRawCountry = function(country){
	var countries = {
		"Any": "",
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
		"PH": "ph",
		"ID": "id",
		"MY": "my",
		"KE": "ke",
		"LA": "la",
		"RO": "ro",
		"MA": "ma",
		"TH": "th",
		"ES": "es",
		"FI": "fi",
		"US": "us",
		"VN": "vn",
		"KG": "kg",
		"MX": "mx",
		"BG": "bg",
		"GE": "ge",
		"DK": "dk",
		"HK": "hk",
		"PK": "pk"
	};
	return countries.hasOwnProperty(country) ? countries[country] : countries["Any"];
};