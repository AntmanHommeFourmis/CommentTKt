_L["Timeout during deleting profile "] = {"ru": "Не удалось удалить профиль "}
_L["Timeout during switching to profile "] = {"ru": "Не удалось переключиться на профиль "}

function BrowserAutomationStudio_ParseBrowserSettings(InputSettings)
{
    var Params = {}

    if(typeof(InputSettings.CommandLine) == "object" && Array.isArray(InputSettings.CommandLine))
    {
      InputSettings.CommandLine = InputSettings.CommandLine.join("\n")
    }

    if(typeof(InputSettings.Extensions) == "object" && Array.isArray(InputSettings.Extensions))
    {
      InputSettings.Extensions = InputSettings.Extensions.join("\n")
    }

    if(typeof(InputSettings.WebrtcIps) == "object" && Array.isArray(InputSettings.WebrtcIps))
    {
      InputSettings.WebrtcIps = InputSettings.WebrtcIps.join("\n")
    }

    InputSettings.WebrtcIps = InputSettings.WebrtcIps.split(/\r?\n/).filter(function(x){return x && x.length > 0}).map(function(x){return x.replace(/\s/g, '')}).join(";")

    if(InputSettings.BrowserVersion.length > 0)
    {
      var id = _find_browser_version_id(InputSettings.BrowserVersion.toString())
      Params["BrowserVersionId"] = id.toString()
    }

    if(InputSettings.Widevine.length > 0)
      Params["UseWidevine"] = InputSettings.Widevine == "enable"

    if(InputSettings.SafeBrowsing.length > 0)
      Params["UseSafeBrowsing"] = InputSettings.SafeBrowsing == "enable"

    if(InputSettings.Components.length > 0)
      Params["UseComponents"] = InputSettings.Components == "enable"

    if(InputSettings.Webrtc.length > 0)
      Params["Webrtc"] = InputSettings.Webrtc

    if(InputSettings.Canvas.length > 0)
      Params["Canvas"] = InputSettings.Canvas

    if(InputSettings.CanvasNoise.length > 0)
      Params["CanvasNoise"] = InputSettings.CanvasNoise

    if(InputSettings.Audio.length > 0)
      Params["Audio"] = InputSettings.Audio

    if(InputSettings.AudioNoise.length > 0)
      Params["AudioNoise"] = InputSettings.AudioNoise

    if(InputSettings.QUIC.length > 0)
      Params["QUIC"] = InputSettings.QUIC

    if(InputSettings.MaxFPS > 0)
      Params["MaxFPS"] = InputSettings.MaxFPS

    if(InputSettings.Webgl.length > 0)
      Params["Webgl"] = InputSettings.Webgl

    if(InputSettings.WebglNoise.length > 0)
      Params["WebglNoise"] = InputSettings.WebglNoise

    if(InputSettings.WebglVendor.length > 0)
      Params["Webgl.unmaskedVendor"] = InputSettings.WebglVendor

    if(InputSettings.WebglRenderer.length > 0)
      Params["Webgl.unmaskedRenderer"] = InputSettings.WebglRenderer

    if(InputSettings.Extensions.length > 0)
      Params["Extensions"] = InputSettings.Extensions
    if(InputSettings.Extensions == "Clear")
      Params["Extensions"] = ""

    if(InputSettings.CommandLine.length > 0)
      Params["CommandLine"] = InputSettings.CommandLine
    if(InputSettings.CommandLine == "Clear")
      Params["CommandLine"] = ""


    if(InputSettings.WebrtcIps.length > 0)
      Params["WebrtcIps"] = InputSettings.WebrtcIps
    if(InputSettings.WebrtcIps == "Clear")
      Params["WebrtcIps"] = ""

    return Params
}

function BrowserAutomationStudio_ChangeProfile()
{
    _UseProfileArguments = _arguments()[0];

    _if(_UseProfileArguments.profile == "<Incognito>" || _UseProfileArguments.profile == "temporary", function(){
        var Params = _UseProfileArguments.settings;
        Params["ProfilePath"] = "<Incognito>"
        _settings(Params)!
        _break(2)
    })!

    _do(function(){
        if(_UseProfileArguments.profile == _get_profile())
            _break();
            
        if(_iterator() > 30)
            fail(tr("Timeout during switching to profile ") + _UseProfileArguments.profile);
        
        native("filesystem", "removefile", _UseProfileArguments.profile + "/lockfile");

        if(!JSON.parse(native("filesystem", "fileinfo", _UseProfileArguments.profile + "/lockfile"))["exists"])
            _break();

        sleep(1000)!
    })!


    _if(_UseProfileArguments.load_proxy == "true", function(){
        var is_error = false;
        try
        {
            _ARG = JSON.parse(native("filesystem", "readfile", JSON.stringify({value: _UseProfileArguments.profile + "/proxy.txt",base64:false,from:0,to:0})))
            _ARG = proxy_pack(_ARG)
        }catch(e)
        {
            is_error = true
        }
        _if(!is_error, function(){
            _set_proxy_for_next_profile(_ARG)!
        })!
    })!

    var Params = _UseProfileArguments.settings;
    Params["ProfilePath"] = _UseProfileArguments.profile
    Params["LoadFingerprintFromProfileFolder"] = (_UseProfileArguments.load_fp)
    _settings(Params)!

    _if(_UseProfileArguments.load_proxy == "true", function(){
        var is_error = false;
        try
        {
            _ARG = JSON.parse(native("filesystem", "readfile", JSON.stringify({value: _UseProfileArguments.profile + "/proxy.txt",base64:false,from:0,to:0})))
            _ARG["Port"] = parseInt(_ARG["Port"])
            if(typeof(_ARG["DetectExternalIp"]) == "undefined")
            {
              _ARG["DetectExternalIp"] = true
            }
            if(typeof(_ARG["ChangeGeolocation"]) == "undefined")
            {
              _ARG["ChangeGeolocation"] = false
            }
            if(typeof(_ARG["ChangeWebrtcIp"]) == "undefined")
            {
              _ARG["ChangeWebrtcIp"] = true
            }
            if(typeof(_ARG["ChangeTimezone"]) == "undefined")
            {
              _ARG["ChangeTimezone"] = true
            }
            if(typeof(_ARG["ChangeBrowserLanguage"]) == "undefined")
            {
              _ARG["ChangeBrowserLanguage"] = true
            }
            if(typeof(_ARG["ip_info_method"]) == "undefined")
            {
              _ARG["ip_info_method"] = "database"
            }
            if(typeof(_ARG["ip_api_key"]) == "undefined")
            {
              _ARG["ip_api_key"] = ""
            }
            if(typeof(_ARG["ServiceURL"]) == "undefined")
            {
              _ARG["ServiceURL"] = ""
            }
            if(typeof(_ARG["IpExtractionMethod"]) == "undefined")
            {
              _ARG["IpExtractionMethod"] = "raw"
            }
            if(typeof(_ARG["IpExtractionParam"]) == "undefined")
            {
              _ARG["IpExtractionParam"] = ""
            }
        }catch(e)
        {
            is_error = true
        }
        _if(!is_error, function(){
            set_proxy(_ARG["server"], _ARG["Port"], _ARG["IsHttp"], _ARG["name"], _ARG["password"])!
            sleep(1000)!
            set_proxy_extended(_ARG["DetectExternalIp"], _ARG["ChangeGeolocation"], _ARG["ChangeWebrtcIp"], _ARG["ChangeTimezone"], _ARG["ChangeBrowserLanguage"], _ARG["ip_info_method"], _ARG["ip_api_key"], null, _ARG["ServiceURL"], _ARG["IpExtractionMethod"], _ARG["IpExtractionParam"])!
            sleep(1000)!
        })!
    })!

    _if(_UseProfileArguments.load_fp == "true", function(){

        FINGERPRINT_JSON = native("filesystem", "readfile", JSON.stringify({value: _UseProfileArguments.profile + "/fingerprint.json",base64:false,from:0,to:0}))
        _if(FINGERPRINT_JSON.length > 0, function(){
            FINGERPRINT_JSON = JSON.parse(FINGERPRINT_JSON)
            _call(BrowserAutomationStudio_ApplyFingerprint,[FINGERPRINT_JSON["fingerprint"],FINGERPRINT_JSON["canvas"],FINGERPRINT_JSON["webgl"],FINGERPRINT_JSON["audio"],FINGERPRINT_JSON["battery"],FINGERPRINT_JSON["rectangles"],FINGERPRINT_JSON["perfectcanvas"],FINGERPRINT_JSON["sensor"],FINGERPRINT_JSON["font_data"],FINGERPRINT_JSON["device_scale"], _UseProfileArguments.key || ""])!
            sleep(1000)!
        })!

        FINGERPRINT_JSON = native("filesystem", "readfile", JSON.stringify({value: _UseProfileArguments.profile + "/performance.json",base64:false,from:0,to:0}))
        _if(FINGERPRINT_JSON.length > 0, function(){
            FINGERPRINT_JSON = JSON.parse(FINGERPRINT_JSON)
            _call(BrowserAutomationStudio_PerformanceFingerprint,FINGERPRINT_JSON)!
        })!
    })!

}