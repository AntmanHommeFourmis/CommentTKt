
class BASHelper {
    #cancel = null;

    constructor()
    {
        this.COLORS_MAP = {
            white: '',
            green: '1',
            brown: '2',
            lightblue: '3',
            dakrblue: '4',
            red: '5',
        };
    }

    HexToString(hexStr)
    {
        var hex = hexStr.toString();
        var bytes = [];
        for (var i = 0; i < hex.length; i += 2) {
            bytes.push(parseInt(hex.substr(i, 2), 16));
        }
        var utf8Str = new TextDecoder('utf-8').decode(new Uint8Array(bytes));
        return utf8Str;
    }

    SendMessage(Type, Id, Data)
    {
        BrowserAutomationStudio_SendMessageToHelper(JSON.stringify({type: Type, id: Id, data: Data}))
    }

    async OnMessageFromHelperHex(MessageHex)
    {
        let Message = this.HexToString(MessageHex)
        Message = JSON.parse(Message)
        if(Message.type == "ping")
        {
            this.SendMessage("pong", Message.id, null)
        }else if(Message.type == "add-actions-group")
        {
            let Result = []
            if(await this.WaitForInsertion())
            {
                return; /* true if canceled */
            }
            for(let DataItem of Message.data)
            {
                let ActionIds = await this.BulkAddActionsPart(DataItem.actions, DataItem.color)
                Result.push({
                    "group-id": DataItem["group-id"],
                    "action-ids": ActionIds,
                    "is-success": ActionIds.length > 0
                })
            }
            this.SendMessage("add-actions-group-result", Message.id, Result)
        }else if(Message.type == "remove-actions")
        {
            await this.BulkRemoveActions(Message.data)
        }else if(Message.type == "set-actions-color")
        {
            await this.BulkSetActionsColor(Message.data.actions, Message.data.color)
        }else if(Message.type == "remove-comments")
        {
            await this.BulkRemoveActionsComments(Message.data.actions)
        }else if(Message.type == "cancel-generation")
        {
            if(this.#cancel != null)
            {
                this.#cancel(/* */);
                this.#cancel = null;
            }
        }
        //console.log("-force-log-", Message)
    }

    async BulkAddActionsPart(ListOfActions, Color)
    {

        window.App.overlay.show();

        //Set color if defined, otherwise use white
        if(!Color || typeof(this.COLORS_MAP[Color]) == "undefined")
        {
            Color = "white"
        }

        Color = this.COLORS_MAP[Color]

        ListOfActions.forEach(Action => Action.color = Color)

        try
        {
            let Result = [];
            let Failed = [];

            //Paste actions
            let Ids = _MainView.PasteFinal(
                JSON.stringify(ListOfActions),
                true,
            );

            //Update actions to set its code
            await new Promise(resolve => {
            let AllInsertedTasks = Ids.map(Id => FindTaskById(Id))
                _ActionUpdater.model.once('finish', resolve).set({
                    tasks: App.utils.filterTasks('all', AllInsertedTasks),
                    isStarted: true,
                });
            });

            if(_ActionUpdater.model.isSuccessfulUpdate())
            {
                Result = Ids;
            }else
            {
                Failed = Ids;
            }

            //Remove actions if not success
            if(Failed.length)
            {
                await this.BulkRemoveActions(Failed);
            }

            window.App.overlay.hide();

            return Result;
        }catch(e)
        {
            window.App.overlay.hide();

            return []
        }


    }

    async BulkRemoveActions(ListOfIds = [])
    {
        await BrowserAutomationStudio_LockRender(async () => {
            ListOfIds.forEach(Id => {
                _TaskCollection.every((Task, Index) => {
                    if (parseInt(Task.get('id')) != Id) return true;
                    _MainView.currentTargetId = Index;
                    _MainView.Delete();
                    return false;
                });
            });
        }, false);
    }

    async BulkSetActionsColor(ListOfIds = [], Color)
    {
        //Set color if defined, otherwise use white
        if(!Color || typeof(this.COLORS_MAP[Color]) == "undefined")
        {
            Color = "white"
        }

        Color = this.COLORS_MAP[Color]

        let Tasks = []
        
        ListOfIds.forEach(Id => {
            let NewTask = FindTaskById(Id)
            if(NewTask)
            {
                Tasks.push(NewTask)
            }
        })

        if(Tasks.length == 0)
          return;



        await BrowserAutomationStudio_LockRender(async () => {

            Tasks.forEach(function(Task){
                Task.set("color", Color)
                Task.attributes["code_precomputed"] = null
            })
            
        }, false);

    }

    async BulkRemoveActionsComments(ListOfIds = [])
    {
        let Tasks = []
        
        ListOfIds.forEach(Id => {
            let NewTask = FindTaskById(Id)
            if(NewTask && NewTask.get("name") != "Else")
            {
                Tasks.push(NewTask)
            }
        })

        if(Tasks.length == 0)
          return;

        await BrowserAutomationStudio_LockRender(async () => {

            Tasks.forEach(function(Task){
                Task.set("name", "")
                Task.attributes["code_precomputed"] = null
            })
            
        }, false);

    }

    async WaitForInsertion()
    {
        let canceled = false;
        App.insertion.toggle("clipboard", false);
        if (App.insertion.toggle("helper", true))
        {
            App.notification.show($t("toast.insertion"));
            this.SendMessage("wait-for-insertion", 0, null);

            canceled = await new Promise(resolve => {
                this.#cancel = () => resolve(true);
                $(document).one("keydown", (e) => {
                    if (e.keyCode === 27) resolve(true);
                });
                $(document).one("click", ".main", (e) => {
                    if (!e.target.closest('.tool-div')) resolve(true);
                });
                $(document).one("click", ".toolinsertdata", () => resolve(false));
            })

            App.notification.hide();
        }
        App.insertion.toggle("helper", false);
        return canceled;
    }
}