function UndoManager()
{
	this.MaxDataLength = 15
	this.Data = []
	this.DataIndex = 0
	this.CurrentChanges = []
	this.threadnumber = -1
	this.successnumber = -1
	this.failnumber = -1
	this.function_name = -1
	this.IsUpdating = false

	this.CanUndo = function()
	{
		return this.DataIndex > 0 && this.Data.length > 1
	}

	this.CanRedo = function()
	{
		return this.DataIndex < this.Data.length - 1 && this.Data.length > 1
	}

	this.Enable = function()
	{
		this.IsUpdating = false
	}

	this.Disable = function()
	{
		this.IsUpdating = true
	}

	this.OnAdd = function(Item, Index)
	{
		if(this.IsUpdating)
		{
			return;
		}
		/*let FunctionName = "Unknown"
		try
		{
			FunctionName = GetFunctionData(parseInt(Item.id)).name
		}catch(e)
		{

		}*/
		this.CurrentChanges.push({type: "add", item: Item, index: Index/*, function: FunctionName*/})
	}

	this.OnChange = function(ItemFrom, ItemTo, Index)
	{
		if(this.IsUpdating)
		{
			return;
		}
		if(_.isEqual(ItemFrom, ItemTo))
			return

		/*let FunctionBefore = "Unknown"
		let FunctionAfter = "Unknown"
		try
		{
			FunctionBefore = GetFunctionData(parseInt(ItemFrom.id)).name
		}catch(e)
		{
			
		}
		try
		{
			FunctionAfter = GetFunctionData(parseInt(ItemTo.id)).name
		}catch(e)
		{
			
		}*/

		this.CurrentChanges.push({type: "change", item_from: ItemFrom, item_to: ItemTo, index: Index/*, function_from: FunctionBefore, function_to: FunctionAfter*/})
		
	}

	this.OnRemove = function(Item, Index)
	{
		if(this.IsUpdating)
		{
			return;
		}
		/*let FunctionName = "Unknown"
		try
		{
			FunctionName = GetFunctionData(parseInt(Item.id)).name
		}catch(e)
		{

		}*/
		this.CurrentChanges.push({type: "remove", item: Item, index: Index/*, function: FunctionName*/})
	}

	this.GetAllChangedActions = function()
	{
		let AllActions = []

		for(let i = 0;i < this.CurrentChanges.length;i++)
		{
			let Change = this.CurrentChanges[i]
			if(Change.type == "add")
			{
				AllActions.push(Change.item)
			}
			if(Change.type == "remove")
			{
				AllActions.push(Change.item)
			}
			if(Change.type == "change")
			{
				AllActions.push(Change.item_from)
				AllActions.push(Change.item_to)
			}
		}

		return AllActions
	}

	this.GetIsGotoActionsChanged = function()
	{
		let Actions = this.GetAllChangedActions()
		for(let i = 0;i < Actions.length;i++)
		{
			let Action = Actions[i]
			if(Action.code.indexOf("_set_goto_label(") >= 0 || Action.code.indexOf("_goto(") >= 0)
				return true
		}
		return false
	}

	this.GetIsEmbeddedActionsChanged = function()
	{
		let Actions = this.GetAllChangedActions()
		for(let i = 0;i < Actions.length;i++)
		{
			let Action = Actions[i]
			if(Action.code.indexOf("_embedded(") >= 0)
				return true
		}
		return false
	}

	this.GetChangedFunctions = function()
	{
		let Names = new Set()
		for(let i = 0;i < this.CurrentChanges.length;i++)
		{
			let Change = this.CurrentChanges[i]
			if(Change.type == "add")
			{
				Names.add(Change.function)
			}
			if(Change.type == "remove")
			{
				Names.add(Change.function)
			}
			if(Change.type == "change")
			{
				Names.add(Change.function_from)
				Names.add(Change.function_to)
			}
		}
		return [...Names]
	}

	this.UndoChanges = function(Changes, TaskCollection)
	{
		this.IsUpdating = true;
		for(let i = Changes.length - 1;i>=0;i--)
		{
			let Change = Changes[i]
			if(Change.type == "add")
			{
				TaskCollection.remove(TaskCollection.at(Change.index))
			}
			if(Change.type == "remove")
			{
				TaskCollection.add(Change.item,{at: Change.index})
			}
			if(Change.type == "change")
			{
				TaskCollection.at(Change.index).set(Change.item_from)
			}
		}
		this.IsUpdating = false;
	}

	this.RedoChanges = function(Changes, TaskCollection)
	{
		this.IsUpdating = true;
		for(let i = 0;i < Changes.length;i++)
		{
			let Change = Changes[i]
			if(Change.type == "add")
			{
				TaskCollection.add(Change.item,{at: Change.index})
			}
			if(Change.type == "remove")
			{
				TaskCollection.remove(TaskCollection.at(Change.index))
			}
			if(Change.type == "change")
			{
				TaskCollection.at(Change.index).set(Change.item_to)
			}
		}
		this.IsUpdating = false;
	}

	this.Save = function(threadnumber, successnumber, failnumber, function_name)
	{
		let ReturnItem = {/*functions: this.GetChangedFunctions(),*/ embedded: this.GetIsEmbeddedActionsChanged(), goto: this.GetIsGotoActionsChanged()}


		if(this.DataIndex < this.Data.length && this.DataIndex >= 0 && 
			//Nothing has been changed
			!(this.CurrentChanges.length > 0 || this.threadnumber != threadnumber || this.successnumber != successnumber || this.failnumber != failnumber || this.function_name != function_name)
		)
			return ReturnItem;

		if(this.IsUpdating)
		{
			return ReturnItem;
		}

		this.threadnumber = threadnumber
		this.successnumber = successnumber
		this.failnumber = failnumber
		this.function_name = function_name

		this.Data = this.Data.splice(0,this.DataIndex + 1)
		this.Data.push({threadnumber, successnumber, failnumber, function_name, changes: this.CurrentChanges})

		this.CurrentChanges = []

		if(this.Data.length > this.MaxDataLength)
		{
			this.Data = this.Data.slice(this.Data.length - this.MaxDataLength)
		}

		this.DataIndex = this.Data.length - 1

		if(this.DataIndex < 0)
			this.DataIndex = 0

		//alert("Added data to undo manager " + this.Data.length + ":" + this.DataIndex)
		return ReturnItem;
	}

	this.Undo = function(TaskCollection)
	{
		if(!this.CanUndo())
			return "";

		if(this.Data.length == 0)
			return ""

		let DataItem = this.Data[this.DataIndex]

		this.DataIndex--;

		if(this.DataIndex >= this.Data.length)
			this.DataIndex = this.Data.length - 1

		if(this.DataIndex < 0)
			this.DataIndex = 0

		//alert("Undo " + this.Data.length + ":" + this.DataIndex)

		this.UndoChanges(DataItem.changes, TaskCollection)

		this.CurrentChanges = []

		this.threadnumber = this.Data[this.DataIndex].threadnumber
		this.successnumber = this.Data[this.DataIndex].successnumber
		this.failnumber = this.Data[this.DataIndex].failnumber
		this.function_name = this.Data[this.DataIndex].function_name

		return {threadnumber: this.Data[this.DataIndex].threadnumber, successnumber: this.Data[this.DataIndex].successnumber, failnumber: this.Data[this.DataIndex].failnumber, function_name: this.Data[this.DataIndex].function_name}
	}

	this.Redo = function(TaskCollection)
	{
		if(!this.CanRedo())
			return "";

		if(this.Data.length == 0)
			return ""


		this.DataIndex++;

		if(this.DataIndex >= this.Data.length)
			this.DataIndex = this.Data.length - 1

		if(this.DataIndex < 0)
			this.DataIndex = 0

		let DataItem = this.Data[this.DataIndex]


		//alert("Redo " + this.Data.length + ":" + this.DataIndex)

		this.RedoChanges(DataItem.changes, TaskCollection)

		this.CurrentChanges = []

		this.threadnumber = this.Data[this.DataIndex].threadnumber
		this.successnumber = this.Data[this.DataIndex].successnumber
		this.failnumber = this.Data[this.DataIndex].failnumber
		this.function_name = this.Data[this.DataIndex].function_name

		return {threadnumber: this.Data[this.DataIndex].threadnumber, successnumber: this.Data[this.DataIndex].successnumber, failnumber: this.Data[this.DataIndex].failnumber, function_name: this.Data[this.DataIndex].function_name}

	}
}