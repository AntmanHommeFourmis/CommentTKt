function CodeContainer()
{
    let IsDirty = true;
    let Code = ""
    let FunctionsInfo = []
    let GlobalVariablesInfo = []
    let VariablesInfo = []

    /* 
     Get all functions info, including Main
     Result has following format - {name, start, end}
     */
    function extract_functions_info(code)
    {
        let Results = []

        let RegexpFunction = new RegExp("section_start\\((\\\"[^\\\"]+\\\")\\s*\\,\\s*\\d+\\)\\!\\s*function","gm")
        let Matches;
        //Capture all functions, except end for latest, end position
        while (Matches = RegexpFunction.exec(code))
        {
            if(Results.length > 0)
            {
                Results[Results.length - 1].end = Matches.index - 4
            }

            let Name = ""

            try
            {
                Name = JSON.parse(JSON.parse(Matches[1])).n
            }catch(e)
            {
                //Support old format
                Name = JSON.parse(Matches[1])
            }

            Results.push({name_raw: Matches[1],name: Name, start: Matches.index - 3, end: -1});

        }

        //Find index of main function starting point
        let MainFunctionIndex = -1
        let FirstNotFunctionId = GetFirstNotFunctionId()
        if(FirstNotFunctionId == 0)
        {
            //No actions in main, searching for end of script
            MainFunctionIndex = code.lastIndexOf("})!") - 2
        }else
        {
            //Search for action with specified id
            let RegexpFirstNonFunctionAction = new RegExp("section_start\\((\\\"[^\\\"]*\\\")\\s*\\,\\s*" + FirstNotFunctionId + "\\)\\!","gm")
            if(Results.length > 0)
            {
                RegexpFirstNonFunctionAction.lastIndex = Results[Results.length - 1].start
            }
            MainFunctionIndex = RegexpFirstNonFunctionAction.exec(code).index - 5
        }

        //Save latest function end position
        if(Results.length > 0)
        {
            Results[Results.length - 1].end = MainFunctionIndex - 1
        }

        //Remove on start function call
        for(let i = 0;i < Results.length;i++)
        {
            let Result = Results[i]
            if(Result.name == "OnApplicationStart" || i == Results.length - 1)
            {
                let Index = code.substring(Result.start,Result.end + 1).lastIndexOf("_call(_on_start, null)!")
                if(Index >= 0)
                {
                    Result.end = Index - 1 + Result.start - 3
                    break;
                }
            }
        }

        //Add info about main function
        Results.push({name: "Main", start: MainFunctionIndex, end: code.lastIndexOf("})!") - 1})

        return Results

    }

    function extract_functions(code)
    {
        var res = []

        var regexp = new RegExp("section_start\\((\\\"[^\\\"]+\\\")\\s*\\,\\s*\\d+\\)\\!\\s*function","gm")
        var matches;
        while (matches = regexp.exec(code))
        {
            res.push(matches[1]);
        }

        res = res.filter(function(item, pos) {
            return res.indexOf(item) == pos && item.indexOf("OnApplicationStart") < 0;
        })

        res = res.map(function(el){return {name: el.toString()}})

        return JSON.stringify(res)

    }

    function extract_variables(code)
    {
        var res = new Set()
        var regexp = new RegExp("VAR_([A-Z0-9_]+)","g")
        var matches;
        while (matches = regexp.exec(code))
        {
            res.add(matches[1]);
        }

        res = [...res]; 

        res = res.map(function(el){return {name: el.toString()}})

        return JSON.stringify(res)
    }

    function extract_global_variables(code)
    {
        var res = []
        var regexp = new RegExp("PSet\\(\\s*\\\"basglobal\\\"\\s*\\,\\s*\\\"([^\\\"]+)\\\"","g")
        var matches;
        while (matches = regexp.exec(code))
        {
            res.push(JSON.parse("\"" + matches[1] + "\""));
        }

        res = res.filter(function(item, pos) {
            return res.indexOf(item) == pos;
        })

        res = res.map(function(el){return {name: el.toString()}})

        return JSON.stringify(res)
    }


    this.SetCode = function(_Code)
    {
        Code = _Code
        IsDirty = true
    }

    this.SetIsDirty = function()
    {
        IsDirty = true
    }

    this.GetIsDirty = function()
    {
        return IsDirty
    }

    this.GetCode = function()
    {
        return Code;
    }

    this.Parse = function()
    {
        FunctionsInfo = extract_functions_info(Code)
        VariablesInfo = extract_variables(Code)
        GlobalVariablesInfo = extract_global_variables(Code)
        IsDirty = false
    }

    this.ParseGlobalVariablesFromCode = function(_Code)
    {
        return extract_global_variables(_Code)
    }

    this.GetFunctionsInfo = function()
    {
        return FunctionsInfo
    }

    this.GetVariablesInfo = function()
    {
        return VariablesInfo
    }

    this.GetGlobalVariablesInfo = function()
    {
        return GlobalVariablesInfo
    }

    /* Same as extract_functions */
    this.GetFunctionsInfoForSending = function()
    {
        let FunctionsInfoForSending = FunctionsInfo
                .filter(f => f.name != "Main" && f.name != "OnApplicationStart")
                .map(f => {return {name: f.name_raw}})

        FunctionsInfoForSending = JSON.stringify(FunctionsInfoForSending)

        return FunctionsInfoForSending
    }

    /* Used for testing */
    this.GetPointersToRawFunctions = function()
    {
        return {extract_functions_info, extract_functions, extract_variables, extract_global_variables}
    }
}
