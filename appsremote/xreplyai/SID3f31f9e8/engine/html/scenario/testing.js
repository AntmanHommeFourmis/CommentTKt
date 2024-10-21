function Testing()
{
    let SendingOptimizationTesting = false;
    let VariablesParsingOptimizationTesting = false;
    let VirtualDOMTesting = false;
    
    function Log(...Items)
    {
        Items.unshift("-force-log-")
        console.log.apply(console, Items);
    }

    function LogError(...Items)
    {
        Items.unshift("-force-log-")
        console.warn.apply(console, Items);
    }

    Log("Use \"_Testing.StartSendingOptimizationTesting()\" to enable sending optimization testing.")
    Log("Use \"_Testing.StartVariablesParsingOptimizationTesting()\" to enable variables parsing optimization testing.")
    Log("Use \"_Testing.StartVirtualDOMTesting()\" to enable virtual DOM testing.")

    this.LogError = LogError
    this.Log = Log

    this.StartSendingOptimizationTesting = function()
    {
        SendingOptimizationTesting = true;
    }

    this.StartVariablesParsingOptimizationTesting = function()
    {
        VariablesParsingOptimizationTesting = true;
    }

    this.StartVirtualDOMTesting = function()
    {
        VirtualDOMTesting = true;
    }

    this.IsSendingOptimizationTesting = function()
    {
        return SendingOptimizationTesting
    }

    this.IsVariablesParsingOptimizationTesting = function()
    {
        return VariablesParsingOptimizationTesting
    }

    this.IsVirtualDOMTesting = function()
    {
        return VirtualDOMTesting
    }

}