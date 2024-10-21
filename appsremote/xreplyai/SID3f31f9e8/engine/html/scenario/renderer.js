$.fn.updateVirtualDOM = function() {
    let All = $(this)
    let Length = All.length
    for(let i = 0;i < Length;i++)
    {
        let Element = All.get(i)
        _Renderer.UpdateSingleVirtualDOMNode(Element)
    }
};

function Renderer()
{
    //Templates

    this.GenerateIsScriptExecutingContainer = function()
    {
        /*
            
            <img draggable="false" src="icons/play.png" class="action-button <%= (isscriptexecuting || execute_next_id == 1) ? "actionbuttongray" : "" %>" id="play"   data-toggle="tooltip" data-placement="bottom" title="<%= tr("Play. Run rest of the script starting from current action.") %>" />
            <img draggable="false" src="icons/next.png" class="action-button <%= (isscriptexecuting || execute_next_id == 1) ? "actionbuttongray2" : "" %>" id="stepnext"  data-toggle="tooltip" data-placement="bottom" title="<%= tr("Run next action. Only single action will be executed.") %>" />
            <img draggable="false" src="icons/pause.png" class="action-button <%= (isscriptexecuting) ? "" : ((isscriptexecuting || execute_next_id == 1) ? "actionbuttongray" : "actionbuttongray2") %>" id="pause" />
    
        */
        /*return _m("div", {class: "text-center toolbox halfscreenorall", style:"float:left"}, [
            _m("span", {id: "isscriptexecutingcontainer"},*/ return [
                _m("img", {
                    draggable: false, 
                    src:"icons/play.png", 
                    class:`action-button ${(_GobalModel.get("isscriptexecuting") || _GobalModel.get("execute_next_id") == 1) ? "actionbuttongray" : ""}`, 
                    "id":"play", 
                    "data-toggle":"tooltip", 
                    "data-placement":"bottom", 
                    "title": tr("Play. Run rest of the script starting from current action.")
                }),
                _m("img", {
                    draggable: false, 
                    src:"icons/next.png", 
                    class:`action-button ${(_GobalModel.get("isscriptexecuting") || _GobalModel.get("execute_next_id") == 1) ? "actionbuttongray2" : ""}`, 
                    "id":"stepnext", 
                    "data-toggle":"tooltip", 
                    "data-placement":"bottom", 
                    "title": tr("Run next action. Only single action will be executed.")
                }),
                _m("img", {
                    draggable: false, 
                    src:"icons/pause.png", 
                    class:`action-button ${_GobalModel.get("isscriptexecuting") ? "" : ((_GobalModel.get("isscriptexecuting") || _GobalModel.get("execute_next_id") == 1) ? "actionbuttongray" : "actionbuttongray2")}`, 
                    "id":"pause",
                })
            ]/*),
            _m("img", {
                draggable: false, 
                src:"icons/stop.png", 
                class:`action-button`, 
                "id":"stop", 
                "data-toggle":"tooltip", 
                "data-placement":"bottom", 
                "title": tr("Stop script and exit 'Record' mode.")
            }),
            _m("img", {
                draggable: false, 
                src:"icons/restart.png", 
                class:`action-button`, 
                "id":"restart", 
                "data-toggle":"tooltip", 
                "data-placement":"bottom", 
                "title": tr("Restart script. Script will be stopped and then started again in 'Record' mode.")
            })
        ])*/
    }

    this.GenerateScriptStatisticContainer = function()
    {
        /*
        <div class="centeredonlyifsmall" id="runproperties" <%= ((global["successnumber"] == 1 && global["failnumber"] == 1) || (global["successnumber"] >= 100000 && global["failnumber"] >= 100000)) ? "style='margin-top:10px;margin-bottom:10px;'" : "" %> >
            <div class="nowrap" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Number of threads. This option affects only 'Run' mode, but not 'Record' mode. To start script in multithreaded mode, change this setting, stop record and click 'Run'.") %>">
                <span class="<%= global["threadnumber"] > 1 ? "text-success" : "text-danger"  %>" >&#x25CF;</span>
                <span class="small"><%= tr("Thread Number") %></span>: <strong><a href="#" id="thread-number-edit" style=""><%= global["threadnumber"] %></a></strong>
            </div>

            <div class="nowrap" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Run type determines how many time script will run. This setting doesn't affect 'Record mode', if you want to repeat script execution, you need to stop 'Record mode' and start script in 'Run mode'. Start editing this value to discover available types.") %>">
                <span style="white-space: nowrap;">
                <span class="<%= (global["successnumber"] == 1 && global["failnumber"] == 1) ? "text-danger" : "text-success"  %>" >&#x25CF;</span>
                <span class="small"><%= tr("Run Type") %></span>: 
                <strong >
                    <a href="#" id="runmode-edit" style="">
                    <% if(global["successnumber"] == 1 && global["failnumber"] == 1){ %>
                        <span><%= tr("One time") %></span>
                    <% }else if(global["successnumber"] >= 100000 && global["failnumber"] >= 100000){ %>
                        <span><%= tr("Repeat") %></span>
                    <% }else{ %>
                        <span><%= tr("Custom") %></span>
                    <% } %>
                    </a> 
                </strong>
                </span>
            </div>

            <% if(!((global["successnumber"] == 1 && global["failnumber"] == 1) || (global["successnumber"] >= 100000 && global["failnumber"] >= 100000))){ %>
                <div class="nowrap">
                
                <span style="white-space: nowrap;">
                    <span style="color:gray">&#x25CF;</span>


                    <span class="small" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Each script launch has a successful or failure result, for example, successful run could be when account was registered and failure may be because not working proxy. With this type you can limit successful and fail execution number. For example, by setting success number to 100 and fail number to 10, you are telling engine to stop execution after 100 successful account registration or after 10 failures during registration.") %>"><%= tr("Run Number") %></span>: 
                    
                    <a href="#" id="success-number-edit" style="text-decoration-color: green;">
                    <strong class="text-success"
                        <%= global["successnumber"].toString().length > 15 ? (('data-toggle="tooltip" data-placement="bottom" title="') + quoteattr(global["successnumber"]) + ('"')) : '' %> 
                    >
                        <%= global["successnumber"].toString().length > 15 ? (global["successnumber"].toString().substr(0,15) + " ... ") : global["successnumber"] %>
                    </strong>
                    </a> 
                    
                    <span style="margin-left:3px;margin-right:3px;">&#x0338; </span>

                    <a href="#" id="fail-number-edit" style="text-decoration-color: red;">
                    <strong class="text-danger"  
                        <%= global["failnumber"].toString().length > 15 ? (('data-toggle="tooltip" data-placement="bottom" title="') + quoteattr(global["failnumber"]) + ('"')) : '' %> 
                    >
                        <%= global["failnumber"].toString().length > 15 ? (global["failnumber"].toString().substr(0,15) + " ... ") : global["failnumber"] %>
                    </strong>
                    </a> 
                </span>
                </div>
            <% } %>

        </div>

      */
        let Items = [
            _m("div", {
                class: "nowrap",
                "data-toggle": "tooltip",
                "data-placement": "bottom",
                "title": tr("Number of threads. This option affects only 'Run' mode, but not 'Record' mode. To start script in multithreaded mode, change this setting, stop record and click 'Run'.")
            }, [
                _m("span", {
                    class: _GobalModel.get("threadnumber") > 1 ? "text-success" : "text-danger"
                }, ("\u25CF ")),
                _m("span", {
                    class: "small"
                }, tr("Thread Number")),
                ": ",
                _m("strong", {}, 
                    _m("a", {href: "#", id:"thread-number-edit", style: ""}, _GobalModel.get("threadnumber"))
                )
            ]),
            _m("div", {
                class: "nowrap",
                "data-toggle": "tooltip",
                "data-placement": "bottom",
                "title": tr("Run type determines how many time script will run. This setting doesn't affect 'Record mode', if you want to repeat script execution, you need to stop 'Record mode' and start script in 'Run mode'. Start editing this value to discover available types.")
            },[
                _m("span", {style: "white-space: nowrap;"},[
                    _m("span", {
                        class: (_GobalModel.get("successnumber") == 1 && _GobalModel.get("failnumber") == 1) ? "text-danger" : "text-success"
                    }, "\u25CF "),
                    _m("span", {class: "small"}, tr("Run Type")),
                    ": ",
                    _m("strong", {}, [
                        _m("a", {href: "#", id:"runmode-edit", style: ""}, 
                            (function()
                            {
                                if(_GobalModel.get("successnumber") == 1 && _GobalModel.get("failnumber") == 1)
                                {
                                    return _m("span", {}, tr("One time"))
                                }else if(_GobalModel.get("successnumber") >= 100000 && _GobalModel.get("failnumber") >= 100000)
                                {
                                    return _m("span", {}, tr("Repeat"))
                                }else
                                {
                                    return _m("span", {}, tr("Custom"))
                                }
                            })()
                        )
                    ])
                ])
            ]),
        ]

        if(!((_GobalModel.get("successnumber") == 1 && _GobalModel.get("failnumber") == 1) || (_GobalModel.get("successnumber") >= 100000 && _GobalModel.get("failnumber") >= 100000)))
        {
            Items.push(_m("div", {class: "nowrap"}, _m("span", {style: "white-space: nowrap;"}, [
                _m("span", {style: "color:gray"}, "\u25CF "),
                _m("span", {
                    class: "small",
                    "data-toggle": "tooltip",
                    "data-placement": "bottom",
                    title: tr("Each script launch has a successful or failure result, for example, successful run could be when account was registered and failure may be because not working proxy. With this type you can limit successful and fail execution number. For example, by setting success number to 100 and fail number to 10, you are telling engine to stop execution after 100 successful account registration or after 10 failures during registration.")
                }, tr("Run Number")),
                ": ",
                _m("a", 
                    {href: "#", id:"success-number-edit", style:"text-decoration-color: green;"}, 
                    _GobalModel.get("successnumber").toString().length > 15 ? 
                        _m("strong", {
                            class: "text-success", 
                            "data-toggle": "tooltip", 
                            "data-placement": "bottom",
                            title: _GobalModel.get("successnumber").toString()
                        }, _GobalModel.get("successnumber").toString().substr(0,15) + " ... ") :
                        _m("strong", {
                            class: "text-success"
                        }, _GobalModel.get("successnumber").toString())
                ),
                _m("span", {style: "margin-left:3px;margin-right:3px;"}, "\u0338 "),
                _m("a", 
                    {href: "#", id:"fail-number-edit", style:"text-decoration-color: red;"},
                        _GobalModel.get("failnumber").toString().length > 15 ? 
                        _m("strong", {
                            class: "text-danger",
                            "data-toggle": "tooltip", 
                            "data-placement": "bottom",
                            title: _GobalModel.get("failnumber").toString()
                        }, _GobalModel.get("failnumber").toString().substr(0,15) + " ... ") :
                        _m("strong", {
                            class: "text-danger"
                        }, _GobalModel.get("failnumber").toString())
                )
            ])))
        }
     
        return [
            _m("div", {
                class: "centeredonlyifsmall", 
                id: "runproperties",
                style: ((_GobalModel.get("successnumber") == 1 && _GobalModel.get("failnumber") == 1) || (_GobalModel.get("successnumber") >= 100000 && _GobalModel.get("failnumber") >= 100000) ? "margin-top:10px;margin-bottom:10px;": "")
            },Items)
        ]
    }

    this.GenerateSelectionTemplateContainer = function()
    {
        /*

                <% _TotalSelected = TotalSelected(); %>
                <div style="float:left;text-align:center;white-space: nowrap" class="halfscreenorall">
                    <img draggable="false" src="icons/undo.png" class="action-button2 <%= (_UndoManager.CanUndo()) ? "" : "disabled" %>" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Undo (Ctrl-Z)") %>" id="action-undo" />
                    <img draggable="false" src="icons/redo.png" class="action-button2 <%= (_UndoManager.CanRedo()) ? "" : "disabled" %>" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Redo (Ctrl-Y)") %>" id="action-redo" />

                    <img draggable="false" src="icons/copy.png" class="action-button2 <%= (_TotalSelected > 0) ? "" : "disabled" %>" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Copy (Ctrl-C)") %>" id="action-copy" />
                    <img draggable="false" src="icons/cut.png" class="action-button2 <%= (_TotalSelected > 0) ? "" : "disabled" %>" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Cut (Ctrl-X)") %>" id="action-cut" />
                    <img draggable="false" src="icons/paste.png" class="action-button2" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Paste (Ctrl-V)") %>" id="action-paste" />
                    <img draggable="false" src="icons/checkall.png" class="action-button2" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Check All") %>" id="action-checkall" />
                    <img draggable="false" src="icons/uncheckall.png" class="action-button2 <%= (_TotalSelected > 0) ? "" : "disabled" %>"  data-toggle="tooltip" data-placement="bottom" title="<%= tr("Clear Selection") %>" id="action-uncheckall" />      
                </div>
                <div style="float:left" class="halfscreenorall">
                    <div class="centeredonlyifsmall">
                        <span class="small"><%= tr("Selected") %></span>: <strong><%= TotalSelected() %></strong>
                    </div>
                </div>

        */

        let _TotalSelected = TotalSelected();
        return [
                _m("div", {style:"float:left;text-align:center;white-space: nowrap", class:"halfscreenorall"}, [
                    _m("img", {
                        draggable: false, 
                        src:"icons/undo.png", 
                        class:`action-button2 ${(_UndoManager.CanUndo()) ? "" : "disabled"}`, 
                        "data-toggle":"tooltip", 
                        "data-placement":"bottom", 
                        "title":tr("Undo (Ctrl-Z)"), 
                        "id": "action-undo"
                    }),
                    _m("img", {
                        draggable: false, 
                        src:"icons/redo.png", 
                        class:`action-button2 ${(_UndoManager.CanRedo()) ? "" : "disabled"}`, 
                        "data-toggle":"tooltip", 
                        "data-placement":"bottom", 
                        "title":tr("Redo (Ctrl-Y)"), 
                        "id": "action-redo"
                    }),
                    _m("img", {
                        draggable: false, 
                        src:"icons/copy.png", 
                        class:`action-button2 ${(_TotalSelected > 0) ? "" : "disabled"}`, 
                        "data-toggle":"tooltip", 
                        "data-placement":"bottom", 
                        "title":tr("Copy (Ctrl-C)"), 
                        "id": "action-copy"
                    }),
                    _m("img", {
                        draggable: false, 
                        src:"icons/cut.png", 
                        class:`action-button2 ${(_TotalSelected > 0) ? "" : "disabled"}`, 
                        "data-toggle":"tooltip", 
                        "data-placement":"bottom", 
                        "title":tr("Cut (Ctrl-X)"), 
                        "id": "action-cut"
                    }),
                    _m("img", {
                        draggable: false, 
                        src:"icons/paste.png", 
                        class:`action-button2`, 
                        "data-toggle":"tooltip", 
                        "data-placement":"bottom", 
                        "title":tr("Paste (Ctrl-V)"), 
                        "id": "action-paste"
                    }),
                    _m("img", {
                        draggable: false, 
                        src:"icons/checkall.png", 
                        class:`action-button2`, 
                        "data-toggle":"tooltip", 
                        "data-placement":"bottom", 
                        "title":tr("Check All"), 
                        "id": "action-checkall"
                    }),
                    _m("img", {
                        draggable: false, 
                        src:"icons/uncheckall.png", 
                        class:`action-button2 ${(_TotalSelected > 0) ? "" : "disabled"}`, 
                        "data-toggle":"tooltip", 
                        "data-placement":"bottom", 
                        "title":tr("Clear Selection"), 
                        "id": "action-uncheckall"
                    })
                ]),
                _m("div", {style:"float:left", class:"halfscreenorall"},
                    _m("div", {class: "centeredonlyifsmall"}, [
                        _m("span", {class: "small"}, tr("Selected")),
                        ": ",
                        _m("strong", _TotalSelected),
                    ])
                )
            ]
        

    }

    this.GenerateInsertionSpace = function (task_id, is_trailing, is_selected, insertion_data, draganddrop_events)
    {
        return _m("div", {
            "task-id": task_id,
            class: "toolinsertdata",
            "data-insert-id": insertion_data.id,
            "data-insert-index": insertion_data.index,
            "data-insert-parent": insertion_data.parent,
            ondrop: draganddrop_events.DropToolInsertData,
            ondragover: draganddrop_events.DragOverToolInsertData,
            ondragleave: draganddrop_events.DragLeaveToolInsertData,
            title: `${tr("A place where new action can be inserted or moved. Click to make it active.")}\n${tr("You can toggle visibility of insertion places by pressing F12.")}`,
        }, [
            _m("div", { class: `toolinsert${is_trailing ? " toolinsertright" : ""}${is_selected ? " toolselected" : ""}` }, App.settings.insertion.size === "small" ? null : [
                _m("span", { class: "toolinsert-state toolinsert-state-dropzone" }, [
                    _m("img", { src: "icons/uturn.svg" }),
                    _m("span", $t("toolinsert.dropzone")),
                ]),
                _m("span", { class: "toolinsert-state toolinsert-state-active" }, [
                    _m("img", { src: "icons/uturn.svg" }),
                    _m("span", $t("toolinsert.active")),
                ]),
                _m("span", { class: "toolinsert-state toolinsert-state-base" }, [
                    _m("img", { src: "icons/minus.svg" }),
                    _m("span", $t("toolinsert.base")),
                ]),
            ]),
            _m("div", {
                draggable: true,
                class: "toollabelcreate",
                ondragend: draganddrop_events.DragEndTaskContainer,
                ondragstart: draganddrop_events.DragStartToolLabelCreate,
                title: tr("Drag this arrow in order to create new label and move execution point to other place."),
            }, _m("img", { src: `icons/arrow-${App.settings.insertion.size === "small" ? "small" : "large"}.svg` })),
        ]);
    }

    this.GenerateModernMainPanel = function (data, index_start, draganddrop_events)
    {
        let global = _GobalModel.toJSON();
        let not_function_id = parseInt(GetFirstNotFunctionId());
        let items = [_m("div", { id: "paddinfind", key: "paddingdiv" })];

        for (let indexraw = 0; indexraw < data.length; indexraw++) {
            let index = indexraw + index_start - 1;
            if (indexraw === 0) index = 0;
            let task = data[indexraw];
            let id = parseInt(task.get("id"));
            let function_data = GetFunctionData(id);
            let can_display = global.function_name === function_data["name"] && !IsFunctionNode(id);

            if (can_display) {
                let [name, color, is_fold, parentid, is_selected] = [task.get("name"), task.get("color"), task.get("is_fold"), task.get("parentid"), task.get("is_selected")];
                let is_foldable = name !== "Else" && task.get("code").includes("section_insert");
                let dat = task.dat();
                let depth = GetTaskDepth(id);
                if (function_data["id"] !== 0) depth--;
                let title = prepare_title(dat, name, true);
                let items1 = [];

                if (NeedToShowUpperInsert(index)) {
                    items1.push(this.GenerateInsertionSpace(
                        -id,
                        false,
                        global.insert_index == -index && global.insert_parent == parentid || global.insert_index == 0 && (id === not_function_id),
                        { id, index: -1, parent: parentid },
                        draganddrop_events
                    ));
                }

                let items2 = [
                    id === 0 ? null : _m("div", {
                        class: "toolmarker",
                        onmouseup: (e) => e.preventDefault(),
                        onmousedown: (e) => e.preventDefault(),
                    }, _m("div", {
                        class: "executing",
                        title: tr("Click to move execution point here."),
                    }, [
                        _m("img", { src: "icons/tool-inactive.svg" }),
                        _m("img", { src: "icons/tool-active.svg" }),
                    ])),
                    _m("div", { class: "tooltitle" }, [
                        id === 0 ? _m("img", { src: "icons/play.svg", draggable: false }) : null,
                        _m.trust(prepare_group(dat, name, id)),
                        _m("div", { class: "toolblock" }, _m("span", { class: "toolname" }, _m.trust(title))),
                        id === 0 ? null : _m("div", { class: `toolicons ${is_foldable ? "large" : "small"}` }, [
                            name === "Else" ? null : _m("img", {
                                src: "icons/warning.svg",
                                class: "ignoreerrorsthis",
                                title: tr("Click to process error during execution of this action."),
                            }),
                            ...(!is_foldable ? [] : [
                                _m("img", { src: "icons/chevron-down.svg", "task-id": id, class: "folding-folded", style: `display: ${is_fold ? "flex" : "none"}` }),
                                _m("img", { src: "icons/chevron-up.svg", "task-id": id, class: "folding-unfolded", style: `display: ${is_fold ? "none" : "flex"}` }),
                            ]),
                            _m("img", { src: "icons/selected.svg", class: `${is_selected ? "" : "hidden "}selected`, style: `visibility: ${is_selected ? "visible" : "hidden"}` }),
                        ]),
                    ]),
                ];

                if (id !== 0) {
                    let body = prepare_body(dat, name, true);
                    let description = prepare_description(dat, name);

                    if (dat && dat.p && dat.p.ig) {
                        description = `${description ? `${description}<br />` : ""}${tr(
                            "Selector requires confirmation"
                        )}`;
                    }

                    body !== title && items2.push(_m("div", { class: "titlebody" }, _m("span", _m.trust(body))));

                    description.length && items2.push(_m("div", { class: "titledescription" }, _m.trust(description)));
                }

                items1.push(_m("div", {
                    ...prepare_label_data_json(dat, name),
                    class: `tool${task.get("donotexecuteduringrecord") ? " notactive" : ""}${color.length ? ` action-color-${color}` : ""} toolmenu${index === 0 ? "first" : (AllowToExecuteOnce(id) ? "extended" : "")} ${((id === not_function_id && global.execute_next_id === 0 || global.execute_next_id === id) && index !== 0) ? "toolexecutecurrent" : "toolnotexecute"} taskcontainer  ${(task.get("is_selected")) ? "actionselected" : "" }`,
                    title: id !== 0 ? null : prepare_title_tooltip(dat, name),
                    ondragstart: draganddrop_events.DragStartTaskCotainer,
                    ondragend: draganddrop_events.DragEndTaskContainer,
                    ondragleave: draganddrop_events.DragLeaveTool,
                    ondragover: draganddrop_events.DragOverTool,
                    ondrop: draganddrop_events.DropTool,
                    "data-index": index && -1,
                    draggable: id !== 0,
                    "task-id": id,
                }, items2));

                if (NeedToShowLowerInsert(index)) {
                    items1.push(this.GenerateInsertionSpace(
                        id,
                        false,
                        global.insert_index == index && global.insert_parent == parentid,
                        { index: -1, parent: parentid },
                        draganddrop_events
                    ));
                }

                items.push(_m("div", {
                    key: `id-${id}`,
                    class: `tool-margin${prepare_folding(parentid, id, depth) ? "" : " folded"}`,
                    style: prepare_margins(parentid, depth, "compute", true),
                    "parent-id": parentid,
                    "data-margin": depth,
                    "task-id": id,
                }, _m("div", { class: "tool-div" }, items1)));
            }

            if (can_display || IsEmptyFunctionNode(id) && GetFunctionDataOfThisNode(id)["name"] === global.function_name) {
                _.each(GetGroupsEndings(index), ({ level, parentid }, current_index) => {
                    if (function_data["id"] !== 0) level--;
                    if (level < 0) return;

                    items.push(_m("div", {
                        key: `id-${id}-${current_index}`,
                        class: `tool-margin${prepare_folding(parentid, 0, level) ? "" : " folded"}`,
                        style: prepare_margins(parentid, level, "compute", true),
                        "parent-id": parentid,
                        "data-margin": level,
                    }, [
                        _m("div", { class: "tool-div" }, this.GenerateInsertionSpace(
                            id,
                            true,
                            global.insert_index == index && global.insert_parent == parentid,
                            { index: -1, parent: parentid },
                            draganddrop_events
                        )),
                        _m("div", { class: "clearfix" }),
                    ]));

                });
            }
        }

        if (not_function_id === 0 && global.function_name === "Main") {
            items.push(_m("div", { class: "tool-div", key: "endmain" }, this.GenerateInsertionSpace(
                0,
                true,
                global.insert_index == 0 && not_function_id === 0,
                { index: 0, parent: 0 },
                draganddrop_events
            )));
        }

        // Collapse clickable area for the insertion:
        for (let i = items.length - 1; i > 1; i--) {
            const [curr, prev] = [items[i], items[i - 1]];
            if (prev.attrs["data-margin"] > curr.attrs["data-margin"]) {
                prev.attrs.className += " half-bottom";
                curr.attrs.className += " half-top";
            }
        }

        items.push(_m.fragment({ key: "visualizelabels" }, _m.trust(/*html*/`
            <svg id="visualizelabels">
                <defs>
                    <marker id="Arrow0" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,1 L5,2 L0,3" stroke="#bbe2ab" fill="none" />
                    </marker>
                    <marker id="Arrow1" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,1 L5,2 L0,3" stroke="#d9d4a1" fill="none" />
                    </marker>
                    <marker id="Arrow2" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,1 L5,2 L0,3" stroke="#a8d6d4" fill="none" />
                    </marker>
                    <marker id="Arrow3" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,1 L5,2 L0,3" stroke="#a7bed9" fill="none" />
                    </marker>
                    <marker id="Arrow4" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,1 L5,2 L0,3" stroke="#e6bbbb" fill="none" />
                    </marker>
                </defs>
            </svg>
        `)));

        return items;
    }

    this.GenerateClassicMainPanel = function(data, index_start, draganddrop_events)
    {
        let global = _GobalModel.toJSON()

        let Items = [
            _m("div", {id: "paddinfind", key: "paddingdiv"}),

        ]

        for(var indexraw = 0;indexraw<data.length;indexraw++)
        {
            var index = indexraw - 1 + index_start;
            if (indexraw == 0) { index = 0; }
            var task = data[indexraw];
            var CanDisplay = global.function_name == GetFunctionData( parseInt(task.get("id")) )["name"] && !IsFunctionNode(parseInt(task.get("id")))
            if(CanDisplay)
            {
                var len = GetTaskDepth(task.get("id"))
                if(GetFunctionData(task.get("id"))["id"] != 0) len--
                let Items2 = 
                [

                ]
                if(NeedToShowUpperInsert(index))
                {
                    Items2.push(_m("div", {
                        id: "id3-" + task.get("id"),
                        class: "toolinsertdata",
                        ondragleave: draganddrop_events.DragLeaveToolInsertData,
                        ondragover: draganddrop_events.DragOverToolInsertData,
                        ondrop: draganddrop_events.DropToolInsertData,
                        "data-toggle": "tooltip",
                        "data-placement": "auto",
                        title: tr("A place where new action can be inserted or moved. Click to make it active."),
                        "task-id": "-" + task.get("id"),
                        "data-insert-index": "-1",
                        "data-insert-parent": task.get("parentid"),
                        "data-insert-id": task.get("id")
                    },[
                        _m("div", {
                            id: "id4-" + task.get("id"),
                            class: `toolinsert${(global.insert_index == -index && global.insert_parent == task.get("parentid") || global.insert_index == 0 && (parseInt(task.get("id")) == parseInt(GetFirstNotFunctionId())) ) ? " toolselected":"" }`
                        }),
                        _m("div", {
                            id: "id5-" + task.get("id"),
                            noupdate: "",
                            class: "toollabelcreate",
                            ondragstart: draganddrop_events.DragStartToolLabelCreate,
                            ondragend: draganddrop_events.DragEndTaskContainer,
                            draggable: true,
                            "data-toggle": "tooltip",
                            "data-placement": "auto",
                            title: tr("Drag this arrow in order to create new label and move execution point to other place."),
                        }, _m("i", {class: "fa fa-arrow-circle-right"}))
                    ]))
                }
                let Attributes6 = {
                    id: "id6-" + task.get("id"),
                    ...prepare_label_data_json(task.dat(),task.get("name")),
                    class: ` ${(task.get("donotexecuteduringrecord"))? "notactive" : "" } ${(task.get("color").length > 0) ? ("action-color-" + task.get("color")) : "" } tool ${ (index==0)? "toolmenufirst" : (AllowToExecuteOnce(task.get("id")) ? "toolmenuextended" : "toolmenu") } ${ ((parseInt(task.get("id")) == parseInt(GetFirstNotFunctionId()) && global.execute_next_id == 0 || global.execute_next_id == task.get("id") ) && index != 0)? "toolexecutecurrent" : "toolnotexecute" } taskcontainer`,
                    ondragstart: draganddrop_events.DragStartTaskCotainer,
                    ondragend: draganddrop_events.DragEndTaskContainer,
                    ondragleave: draganddrop_events.DragLeaveTool,
                    ondragover: draganddrop_events.DragOverTool,
                    ondrop: draganddrop_events.DropTool,
                    "task-id": task.get("id"),
                    "data-index": index == 0 ? "0" : "-1",
                }
                if(parseInt(task.get("id")) != 0)
                {
                    Attributes6.draggable = true
                }else
                {
                    Attributes6["data-toggle"] = "tooltip"
                    Attributes6["data-placement"] = "top"
                    Attributes6 = {...Attributes6, ...{title: prepare_title_tooltip(task.dat(),task.get("name"))}}
                }
                let Items9 = []
                if(task.get("id")!=0)
                {
                    Items9.push(_m("span", {
                        id: "id10-" + task.get("id"),
                        noupdate: "",
                        class: "executing",
                        "data-toggle": "tooltip",
                        "data-placement": "auto",
                        title: tr("Click to move execution point here.")
                    }, _m("i", {class: "fa fa-arrow-right"})))
                }

                if(task.get("id")!=0 && task.get("name") != "Else")
                {
                    Items9.push(_m("span", {
                        id: "id11-" + task.get("id"),
                        noupdate: "",
                        class: "ignoreerrorsthis",
                        "data-toggle": "tooltip",
                        "data-placement": "auto",
                        title: tr("Click to process error during execution of this action.")
                    }, _m("i", {class: "fa fa-exclamation-triangle"})))
                }
                Items9.push(_m("span", {id: "id12-" + task.get("id")},[
                    _m.trust(prepare_body(task.dat(),task.get("name")))
                ]))
                if(task.get("id")!=0 && task.get("code").indexOf("section_insert") >= 0 && task.get("name") != "Else")
                {
                    Items9.push(_m("span", {
                        id: "id13-" + task.get("id"),
                        class: "folding-unfolded",
                        style: task.get("is_fold") ? "display:none" : "",
                        "task-id": task.get("id")
                    },[
                        " ",
                        _m("i", {
                            id: "id14-" + task.get("id"), 
                            noupdate: "",
                            class: "fa fa-arrow-circle-down"
                        })
                    ]))

                    Items9.push(_m("span", {
                        id: "id15-" + task.get("id"),
                        class: "folding-folded",
                        style: task.get("is_fold") ? "" : "display:none",
                        "task-id": task.get("id")
                    },[
                        " ",
                        _m("i", {
                            id: "id16-" + task.get("id"), 
                            noupdate: "",
                            class: "fa fa-arrow-circle-left"
                        })
                    ]))
                }
                let Items6 = [
                    _m("div", {
                        id: "id7-" + task.get("id"),
                        class: `tooltitle ${ prepare_styles(task.dat(),task.get("name") ) }`
                    },
                    [
                        _m.trust(`${prepare_group(task.dat(),task.get("name"),task.get("id"))} ${ prepare_title(task.dat(),task.get("name"))}`),
                        _m("span", {
                            id: "id71-" + task.get("id"),
                            class: "disablenotice",
                            "task-id": task.get("id")

                        }, (task.get("donotexecuteduringrecord"))? " (" + tr("disabled") + ")" : ""),
                        _m("img", {
                            id: "id8-" + task.get("id"),
                            class: "selected",
                            src: "icons/selected.png",
                            style: (!task.get("is_selected")) ? "visibility:hidden" : ""
                        })
                    ]),
                    _m("div", {
                        id: "id9-" + task.get("id"),
                        class: "titlebody",
                        style: "position:relative"
                    },Items9)

                ]

                var dat = task.dat()
                var description = prepare_description(dat,task.get("name"));

                if(dat && dat.p && dat.p.ig)
                {
                    var ai_notification = tr("Selector requires confirmation")
                    if(description)
                        description += "<br/>" + ai_notification
                    else
                        description = ai_notification
                }

                if(description.length > 0)
                {
                    Items6.push(_m("div", {
                        class: "titledescription", 
                        id:"id17-" + task.get("id")
                    }, _m.trust(description)))
                }

                Items6.push(_m("div", {
                    class: "titleid", 
                    id:"id18-" + task.get("id"),
                    noupdate: "",
                }, _m.trust(`Id: ${ task.get("id") }`)))


                Items2.push(
                    _m("div", Attributes6, Items6)
                )
                
                if(NeedToShowLowerInsert(index))
                {
                    Items2.push(
                        _m("div", {
                            id:"id19-" + task.get("id"),
                            class: "toolinsertdata",
                            ondragleave: draganddrop_events.DragLeaveToolInsertData,
                            ondragover: draganddrop_events.DragOverToolInsertData,
                            ondrop: draganddrop_events.DropToolInsertData,
                            "data-toggle": "tooltip",
                            "data-placement": "auto",
                            title: tr("A place where new action can be inserted or moved. Click to make it active."),
                            "task-id": task.get("id"),
                            "data-insert-index": "-1",
                            "data-insert-parent": task.get("parentid")
                        },[
                            _m("div", {
                                id:"id20-" + task.get("id"),
                                class: `toolinsert${ (global.insert_index == index && global.insert_parent == task.get("parentid")) ? " toolselected":"" }`
                            }),
                            _m("div", {
                                id:"id21-" + task.get("id"),
                                noupdate: "",
                                class: "toollabelcreate",
                                ondragstart: draganddrop_events.DragStartToolLabelCreate,
                                ondragend: draganddrop_events.DragEndTaskContainer,
                                draggable: true,
                                "data-toggle": "tooltip",
                                "data-placement": "auto",
                                title: tr("Drag this arrow in order to create new label and move execution point to other place.")
                            }, _m("i",{
                                id:"id22-" + task.get("id"),
                                noupdate: "",
                                class: "fa fa-arrow-circle-right"
                            }))
                        ])
                    )
                }

                Items.push(_m("div", {
                    id: "id1-" + task.get("id"),
                    key: "id1-" + task.get("id"),
                    class: `tool-margin ${(prepare_folding(task.get("parentid"), parseInt(task.get("id")), len)) ? "" : "folded" }`,
                    style: prepare_margins(task.get("parentid"), len, "compute"),
                    "task-id": task.get("id"),
                    "parent-id": task.get("parentid"),
                    "data-margin": len
                },[
                    _m("div", {
                        id: "id2-" + task.get("id"),
                        class: "tool-div"
                    },
                    Items2)
                ]))
            }

            if(CanDisplay || IsEmptyFunctionNode(parseInt(task.get("id"))) && GetFunctionDataOfThisNode(parseInt(task.get("id")))["name"] == global.function_name )
            {
                _.each(GetGroupsEndings(index), function(ending, current_index) {
                    var endinglevel = ending["level"]
                    if(GetFunctionData(task.get("id"))["id"] != 0) endinglevel--;
                    if(endinglevel>=0)
                    {
                        Items.push(_m("div", {
                            id: "id23-" + task.get("id") + "-" + current_index,
                            key: "id23-" + task.get("id") + "-" + current_index,
                            class: `tool-margin ${ (prepare_folding(ending["parentid"], 0, endinglevel)) ? "" : "folded" }`,
                            style: prepare_margins(ending["parentid"], endinglevel, "compute"),
                            "parent-id": ending["parentid"],
                            "data-margin": endinglevel
                        },[
                            _m("div", {
                                id: "id24-" + task.get("id") + "-" + current_index,
                                class: "tool-div"
                            },[
                                _m("div", {
                                    id: "id25-" + task.get("id") + "-" + current_index,
                                    class: "toolinsertdata",
                                    ondragleave: draganddrop_events.DragLeaveToolInsertData,
                                    ondragover: draganddrop_events.DragOverToolInsertData,
                                    ondrop: draganddrop_events.DropToolInsertData,
                                    "data-toggle": "tooltip",
                                    "data-placement": "auto",
                                    title: tr("A place where new action can be inserted or moved. Click to make it active."),
                                    "task-id": task.get("id"),
                                    "data-insert-index": "-1",
                                    "data-insert-parent":  ending["parentid"]
                                },[
                                    _m("div", {
                                        id: "id26-" + task.get("id") + "-" + current_index,
                                        class: `toolinsert toolinsertright${ (global.insert_index == index && global.insert_parent == ending["parentid"]) ? " toolselected":"" }`
                                    }),
                                    _m("div", {
                                        id: "id27-" + task.get("id") + "-" + current_index,
                                        noupdate: "",
                                        class: "toollabelcreate",
                                        ondragstart: draganddrop_events.DragStartToolLabelCreate,
                                        ondragend: draganddrop_events.DragEndTaskContainer,
                                        draggable: true,
                                        "data-toggle": "tooltip",
                                        "data-placement": "auto",
                                        title: tr("Drag this arrow in order to create new label and move execution point to other place."),
                                    }, _m("i", {class: "fa fa-arrow-circle-right"}))
                                ])
                            ]),
                            _m("div", {
                                id: "id28-" + task.get("id") + "-" + current_index,
                                noupdate: "",
                                class: `clearfix`
                            })
                        ]))
                    }
                });
            }
        }

        if(GetFirstNotFunctionId() == 0 && global["function_name"] == "Main")
        {
            Items.push(_m("div", {
                id: "id29-" + task.get("id"),
                key: "endmain",
                class: "tool-div"
            },[
                _m("div", {
                    id: "id30-" + task.get("id"),
                    class: "toolinsertdata",
                    ondragleave: draganddrop_events.DragLeaveToolInsertData,
                    ondragover: draganddrop_events.DragOverToolInsertData,
                    ondrop: draganddrop_events.DropToolInsertData,
                    "data-toggle": "tooltip",
                    "data-placement": "auto",
                    title: tr("A place where new action can be inserted or moved. Click to make it active."),
                    "task-id": "0",
                    "data-insert-index": "0",
                    "data-insert-parent": "0"
                },[
                    _m("div", {
                        id: "id31-" + task.get("id"),
                        class: `toolinsert toolinsertright${ (global.insert_index == 0 && GetFirstNotFunctionId() == 0) ? " toolselected":"" }`
                    }),
                    _m("div", {
                        id: "id32-" + task.get("id"),
                        noupdate: "",
                        class: `toollabelcreate`,
                        ondragstart: draganddrop_events.DragStartToolLabelCreate,
                        ondragend: draganddrop_events.DragEndTaskContainer,
                        draggable: true,
                        "data-toggle": "tooltip",
                        "data-placement": "auto",
                        "title": tr("Drag this arrow in order to create new label and move execution point to other place.")
                    },_m("i", {class: "fa fa-arrow-circle-right"}))
                    
                ])
            ]))
        }

        Items.push(
            _m.fragment({key: "visualizelabels"}, _m.trust(`<svg id="visualizelabels" style="z-index:-100">
        <defs>
          <marker id="Arrow0" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
            <path d="M0,1 L5,2 L0,3" stroke="#bbe2ab" fill="none"></path>
          </marker>
          <marker id="Arrow1" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
            <path d="M0,1 L5,2 L0,3" stroke="#d9d4a1" fill="none"></path>
          </marker>
          <marker id="Arrow2" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
            <path d="M0,1 L5,2 L0,3" stroke="#a8d6d4" fill="none"></path>
          </marker>
          <marker id="Arrow3" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
            <path d="M0,1 L5,2 L0,3" stroke="#a7bed9" fill="none"></path>
          </marker>
          <marker id="Arrow4" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
            <path d="M0,1 L5,2 L0,3" stroke="#e6bbbb" fill="none"></path>
          </marker>
        </defs>
      </svg>`)))


        return Items
    }

    this.GenerateMainPanel = function(data, index_start, draganddrop_events)
    {
        return App.settings.theme === "modern"
            ? this.GenerateModernMainPanel(data, index_start, draganddrop_events)
            : this.GenerateClassicMainPanel(data, index_start, draganddrop_events);
    }

    //Keep Virtual DOM up to date
    this.UpdateSingleVirtualDOMNode = function(Element)
    {
        if(Element.nodeType != Node.ELEMENT_NODE)
        {
            return;
        }
        
        let Parents = []

        Parents.push(Element)

        let VirtualDOM = null

        //Save parents list, find root with virtual dom
        let Parent = Element
        while(true)
        {
            Parent = Parent.parentNode
            if(!Parent)
            {
                return
            }
            if(Parent.nodeType != Node.ELEMENT_NODE)
            {
                return
            }
            if(Parent.vnodes)
            {
                VirtualDOM = Parent.vnodes
                
                if(!Array.isArray(VirtualDOM))
                {
                    return
                }

                break
            }

            Parents.push(Parent)
        }

        let VirtualDOMNode = null

        //Search for virtual node which corresponds to Element
        while(Parents.length > 0)
        {
            let ParentCurrent = Parents[Parents.length - 1]
            let IsFound = false
            for(let NodeCandidate of VirtualDOM)
            {
                if(NodeCandidate && NodeCandidate.dom && NodeCandidate.dom === ParentCurrent && Array.isArray(NodeCandidate.children))
                {
                    VirtualDOMNode = NodeCandidate
                    VirtualDOM = NodeCandidate.children
                    Parents.pop()
                    IsFound = true;
                    break
                }
                
            }
            if(!IsFound)
            {
                return
            }
        }

        let ElementAttributes = [...Element.attributes]

        //Send attributes from element to virtual dom
        for(let ElementAttribute of ElementAttributes)
        {
            let NameLow = ElementAttribute.name.toLowerCase()
            if(NameLow.indexOf("on") === 0)
            {
                continue
            }
            if(NameLow === "key")
            {
                continue
            }
            if(NameLow === "class")
            {
                VirtualDOMNode.attrs.className = ElementAttribute.value
                continue
            }
            if(NameLow === "draggable")
            {
                VirtualDOMNode.attrs.draggable = ElementAttribute.value == "true"
                continue
            }           

            VirtualDOMNode.attrs[ElementAttribute.name] = ElementAttribute.value
        }

        //Remove attributes from virtual dom which don't have corresponding values in element
        for(let VirtualDOMAttribute of Object.keys(VirtualDOMNode.attrs))
        {
            if(VirtualDOMAttribute.indexOf("on") === 0)
            {
                continue
            }
            if(VirtualDOMAttribute === "key")
            {
                continue
            }
            if(VirtualDOMAttribute === "class")
            {
                continue
            }
            if(VirtualDOMAttribute === "className")
            {
                if(typeof(ElementAttributes.find(el => el.name == "class")) == "undefined")
                {
                    delete VirtualDOMNode.attrs["className"]
                }
                continue
            }
            
            if(typeof(ElementAttributes.find(el => el.name == VirtualDOMAttribute)) == "undefined")
            {
                delete VirtualDOMNode.attrs[VirtualDOMAttribute]
            }
        }
    }

    this.UpdateListOfVirtualDOMNodes = function(ElementList)
    {
        let self = this
        ElementList.forEach(Element => self.UpdateSingleVirtualDOMNode(Element))
    }


    //Rendering
    this.RenderMain = function(data, index_start, draganddrop_events)
    {
        let Element = document.getElementsByClassName("main")[0]

        let MainPanelCode = this.GenerateMainPanel(data, index_start, draganddrop_events)

        _m.render(Element, MainPanelCode)
    }

    this.RenderIsScriptExecutingContainer = function()
    {
        _m.render(document.getElementById("isscriptexecutingcontainer"), this.GenerateIsScriptExecutingContainer())
        var all = $("#stop,#restart")
        for(var i = 0;i< all.length;i++)
        {
          var el = $(all[i])
          el.attr("title",tr(el.attr("title")))
        }

    }

    this.RenderSelectionTemplateContainer = function()
    {
        _m.render(document.getElementById("selectiontemplatecontainer"), this.GenerateSelectionTemplateContainer())
    }

    this.RenderScriptStatisticContainer = function()
    {
        _m.render(document.getElementById("scriptstatisticcontainer"), this.GenerateScriptStatisticContainer())
    }

    this.RenderBottomPanel = function()
    {
        //_m.render(document.getElementsByClassName("bottompannel")[0], this.GenerateBottomPanel())
        document.getElementById("FunctionName").innerHTML = _GobalModel.get("function_name")
    }

    //Called only once
    this.Init = function()
    {
        document.querySelector(".bottompannel iframe").setAttribute("src",`inspector/frame/index.html?lang=${ _K }`)
        document.getElementById("delayed-load-label").innerHTML = tr('Variables will be loaded on next script pause')
        document.getElementById("FunctionName").setAttribute("title", tr('Current function name. Functions are containers, which holds action list. It helps to group several actions which does same task. For example, there can be function which logins to account, function that checks account balance, etc. It makes your code clear and well organized.'))
    }


    //Testing

    function hexToRgba(hex) {
        if (hex.startsWith('#')) {
            hex = hex.slice(1);
        }
        
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        
        return `rgba(${r}, ${g}, ${b}, 1)`;
    }
    
    function normalizeColor(value) {
        // Convert hex to rgba
        value = value.replace(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g, (match, hex) => {
            return hex.length === 3 ? hexToRgba(hex.split('').map(char => char + char).join('')) : hexToRgba(hex);
        });
    
        // Normalize rgba & rgb
        value = value.replace(/rgba?\(([\d\s,%.]+)\)/g, (match, contents) => {
            let parts = contents.split(',').map(part => part.trim());
            if (parts.length === 3) parts.push('1');  // Convert rgb to rgba
            return `rgba(${parts.join(', ')})`;
        });
        
        return value;
    }
    
    function normalizeCss(cssString) {
        return cssString
            .split(";")
            .map(property => property.trim())
            .filter(property => property)
            .map(property => {
                let [key, value] = property.split(":").map(s => s.trim());
                value = normalizeColor(value);
                return `${key}: ${value}`;
            })
            .sort()
            .join("; ") + ";";
    }

    function normalizeClass(classString) {
        return classString
            .split(' ')
            .map((className) => className.trim())
            .filter((className) => className !== '' && className != "toolhighlight" && className != "tooldrop" && className != "toolinsertdrop")
            .sort()
            .join(' ');
    }

    function CompareHTMLElements(Document1, Document2)
    {
        if(Document1.nodeType != Document2.nodeType)
        {
            return {result: false, message: "nodeType mismatch", node1: Document1, node2: Document2}
        }

        //Only text nodes or element node are available
        if(Document1.nodeType != Node.ELEMENT_NODE && Document2.nodeType != Node.TEXT_NODE)
        {
            return {result: false, message: "Unknown nodeType", node1: Document1, node2: Document2}
        }

        if(Document1.nodeType == Node.ELEMENT_NODE)
        {
            //Compare element node
            if(Document1.tagName.toLowerCase() != Document2.tagName.toLowerCase())
            {
                return {result: false, message: "tagName mismatch", node1: Document1, node2: Document2}
            }

            if(Document1.tagName.toLowerCase() == "svg")
            {
                return {result: true}
            }

            //Compare attributes
            let Attributes1 = [...Document1.attributes]
            let Attributes2 = [...Document2.attributes]

            Attributes1.sort((a, b) => a.name.localeCompare(b.name));
            Attributes2.sort((a, b) => a.name.localeCompare(b.name));

            Attributes1 = Attributes1.filter(a => !((a.name == "style" || a.name == "class") && a.value.trim().length == 0))
            Attributes2 = Attributes2.filter(a => !((a.name == "style" || a.name == "class") && a.value.trim().length == 0))
            
            //Skip inspector
            if(Attributes1.find(a => a.name == "id" && a.value == "inspector"))
            {
                return {result: true}
            }


            if(Attributes1.length != Attributes2.length)
            {
                return {result: false, message: "Attributes length mismatch", node1: Document1, node2: Document2}
            }

            for(let i = 0;i < Attributes1.length;i++)
            {
                let Attribute1 = Attributes1[i]
                let Attribute2 = Attributes2[i]

                if(Attribute1.name != Attribute2.name)
                {
                    return {result: false, message: "Attribute name mismatch", node1: Document1, node2: Document2}
                }

                if(Attribute1.name == "style")
                {
                    let Normalized1 = normalizeCss(Attribute1.value);
                    let Normalized2 = normalizeCss(Attribute2.value);
                    if(Normalized1 != Normalized2)
                    {
                        return {result: false, message: "Styles value mismatch", node1: Document1, node2: Document2}
                    }   
                }else if(Attribute1.name == "class")
                {
                    let Normalized1 = normalizeClass(Attribute1.value);
                    let Normalized2 = normalizeClass(Attribute2.value);


                    if(Normalized1 != Normalized2)
                    {
                        return {result: false, message: "Classes value mismatch", node1: Document1, node2: Document2}
                    }   
                }
                else
                {
                    if(Attribute1.value != Attribute2.value)
                    {
                        return {result: false, message: "Attribute value mismatch", node1: Document1, node2: Document2}
                    }   
                }
            }

            //Compare children
            let Children1 = [...Document1.childNodes]
            let Children2 = [...Document2.childNodes]

            Children1 = Children1.filter(el => !(el.nodeType == Node.TEXT_NODE && el.textContent.trim().length == 0))
            Children2 = Children2.filter(el => !(el.nodeType == Node.TEXT_NODE && el.textContent.trim().length == 0))

            Children1 = Children1.filter(el => !(el.nodeType == Node.ELEMENT_NODE && el.tagName.toLowerCase() == "a" && el.className == "tag"))
            Children2 = Children2.filter(el => !(el.nodeType == Node.ELEMENT_NODE && el.tagName.toLowerCase() == "a" && el.className == "tag"))

            if(Children1.length != Children2.length)
            {
                return {result: false, message: "Children length mismatch", node1: Document1, node2: Document2}
            }

            for(let i = 0;i < Children1.length;i++)
            {
                let Child1 = Children1[i]
                let Child2 = Children2[i]

                let Result = CompareHTMLElements(Child1, Child2);

                if(!Result.result)
                {
                    return Result
                }
            }

        }else
        {
            //Compare text node
            if(Document1.textContent.trim() != Document2.textContent.trim())
            {
                return {result: false, message: "text mismatch", node1: Document1, node2: Document2}
            }
        }

        

        return {result: true}
    }

    this.CompareHTML = function(HTMLString1, HTMLString2)
    {
        let parser = new DOMParser();
        let Document1 = parser.parseFromString(HTMLString1, 'text/html');
        let Document2 = parser.parseFromString(HTMLString2, 'text/html');

        return CompareHTMLElements(Document1.body,Document2.body)
    }   
    
    this.GetTemplateForTesting = function(data,global,index_start)
    {
        let Template = `<div class="threads" >
        <div class="text-center toolbox halfscreenorall" style="float:left">
          <span id="isscriptexecutingcontainer">
            <img draggable="false" src="icons/play.png" class="action-button <%= (global.isscriptexecuting || global.execute_next_id == 1) ? "actionbuttongray" : "" %>" id="play"   data-toggle="tooltip" data-placement="bottom" title="<%= tr("Play. Run rest of the script starting from current action.") %>" />
            <img draggable="false" src="icons/next.png" class="action-button <%= (global.isscriptexecuting || global.execute_next_id == 1) ? "actionbuttongray2" : "" %>" id="stepnext"  data-toggle="tooltip" data-placement="bottom" title="<%= tr("Run next action. Only single action will be executed.") %>" />
            <img draggable="false" src="icons/pause.png" class="action-button <%= (global.isscriptexecuting) ? "" : ((global.isscriptexecuting || global.execute_next_id == 1) ? "actionbuttongray" : "actionbuttongray2") %>" id="pause" />
          </span>
          <img draggable="false" src="icons/stop.png" class="action-button" id="stop" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Stop script and exit 'Record' mode.") %>" />
          <img draggable="false" src="icons/restart.png" class="action-button" id="restart" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Restart script. Script will be stopped and then started again in 'Record' mode.") %>" />
  
        </div>
        <div style="float:left" class="halfscreenorall" id="scriptstatisticcontainer" >
          <div class="centeredonlyifsmall" id="runproperties" <%= ((global["successnumber"] == 1 && global["failnumber"] == 1) || (global["successnumber"] >= 100000 && global["failnumber"] >= 100000)) ? "style='margin-top:10px;margin-bottom:10px;'" : "" %> >
            <div class="nowrap" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Number of threads. This option affects only 'Run' mode, but not 'Record' mode. To start script in multithreaded mode, change this setting, stop record and click 'Run'.") %>">
                <span class="<%= global["threadnumber"] > 1 ? "text-success" : "text-danger"  %>" >&#x25CF;</span>
                <span class="small"><%= tr("Thread Number") %></span>: <strong><a href="#" id="thread-number-edit" style=""><%= global["threadnumber"] %></a></strong>
            </div>
  
            <div class="nowrap" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Run type determines how many time script will run. This setting doesn't affect 'Record mode', if you want to repeat script execution, you need to stop 'Record mode' and start script in 'Run mode'. Start editing this value to discover available types.") %>">
              <span style="white-space: nowrap;">
                <span class="<%= (global["successnumber"] == 1 && global["failnumber"] == 1) ? "text-danger" : "text-success"  %>" >&#x25CF;</span>
                <span class="small"><%= tr("Run Type") %></span>: 
                <strong >
                  <a href="#" id="runmode-edit" style="">
                    <% if(global["successnumber"] == 1 && global["failnumber"] == 1){ %>
                      <span><%= tr("One time") %></span>
                    <% }else if(global["successnumber"] >= 100000 && global["failnumber"] >= 100000){ %>
                      <span><%= tr("Repeat") %></span>
                    <% }else{ %>
                      <span><%= tr("Custom") %></span>
                    <% } %>
                  </a> 
                </strong>
              </span>
            </div>
  
            <% if(!((global["successnumber"] == 1 && global["failnumber"] == 1) || (global["successnumber"] >= 100000 && global["failnumber"] >= 100000))){ %>
              <div class="nowrap">
                
                <span style="white-space: nowrap;">
                  <span style="color:gray">&#x25CF;</span>
  
  
                  <span class="small" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Each script launch has a successful or failure result, for example, successful run could be when account was registered and failure may be because not working proxy. With this type you can limit successful and fail execution number. For example, by setting success number to 100 and fail number to 10, you are telling engine to stop execution after 100 successful account registration or after 10 failures during registration.") %>"><%= tr("Run Number") %></span>: 
                  
                  <a href="#" id="success-number-edit" style="text-decoration-color: green;">
                    <strong class="text-success"
                      <%= global["successnumber"].toString().length > 15 ? (('data-toggle="tooltip" data-placement="bottom" title="') + quoteattr(global["successnumber"]) + ('"')) : '' %> 
                    >
                      <%= global["successnumber"].toString().length > 15 ? (global["successnumber"].toString().substr(0,15) + " ... ") : global["successnumber"] %>
                    </strong>
                  </a> 
                  
                  <span style="margin-left:3px;margin-right:3px;">&#x0338; </span>
  
                  <a href="#" id="fail-number-edit" style="text-decoration-color: red;">
                    <strong class="text-danger"  
                      <%= global["failnumber"].toString().length > 15 ? (('data-toggle="tooltip" data-placement="bottom" title="') + quoteattr(global["failnumber"]) + ('"')) : '' %> 
                    >
                      <%= global["failnumber"].toString().length > 15 ? (global["failnumber"].toString().substr(0,15) + " ... ") : global["failnumber"] %>
                    </strong>
                  </a> 
                </span>
              </div>
            <% } %>
  
          </div>
        </div>
        <div class="maintoolbox">
          <span id="selectiontemplatecontainer">
              <% _TotalSelected = TotalSelected(); %>
                <div style="float:left;text-align:center;white-space: nowrap" class="halfscreenorall">
                    <img draggable="false" src="icons/undo.png" class="action-button2 <%= (_UndoManager.CanUndo()) ? "" : "disabled" %>" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Undo (Ctrl-Z)") %>" id="action-undo" />
                    <img draggable="false" src="icons/redo.png" class="action-button2 <%= (_UndoManager.CanRedo()) ? "" : "disabled" %>" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Redo (Ctrl-Y)") %>" id="action-redo" />

                    <img draggable="false" src="icons/copy.png" class="action-button2 <%= (_TotalSelected > 0) ? "" : "disabled" %>" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Copy (Ctrl-C)") %>" id="action-copy" />
                    <img draggable="false" src="icons/cut.png" class="action-button2 <%= (_TotalSelected > 0) ? "" : "disabled" %>" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Cut (Ctrl-X)") %>" id="action-cut" />
                    <img draggable="false" src="icons/paste.png" class="action-button2" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Paste (Ctrl-V)") %>" id="action-paste" />
                    <img draggable="false" src="icons/checkall.png" class="action-button2" data-toggle="tooltip" data-placement="bottom" title="<%= tr("Check All") %>" id="action-checkall" />
                    <img draggable="false" src="icons/uncheckall.png" class="action-button2 <%= (_TotalSelected > 0) ? "" : "disabled" %>"  data-toggle="tooltip" data-placement="bottom" title="<%= tr("Clear Selection") %>" id="action-uncheckall" />      
                </div>
                <div style="float:left" class="halfscreenorall">
                <div class="centeredonlyifsmall">
                    <span class="small"><%= tr("Selected") %></span>: <strong><%= TotalSelected() %></strong>
                </div>
            </div>
          </span>
        </div>
      </div>
      <div class="main" style="padding-bottom: <%= (_Inspector.$el.is(':visible') ? _Inspector.$el.height() : 0) + 50 %>px;">
        <div id="paddinfind"></div>
        <% for(var indexraw = 0;indexraw<data.length;indexraw++){ %>
          <% var index = indexraw - 1 + index_start;%>
          <% if (indexraw == 0) { index = 0; } %>
          <%var task = data[indexraw]; %>
            <% var CanDisplay = global.function_name == GetFunctionData( parseInt(task.get("id")) )["name"] && !IsFunctionNode(parseInt(task.get("id"))) %>
            <% if(CanDisplay) {%>
  
              <% var len = GetTaskDepth(task.get("id")); %>
              <% if(GetFunctionData(task.get("id"))["id"] != 0) len--; %>
  
              <div id="id1-<%= task.get("id") %>" class="tool-margin <%= (prepare_folding(task.get("parentid"), parseInt(task.get("id")), len)) ? "" : "folded" %>" style="<%= prepare_margins(task.get("parentid"), len, "compute") %>"  task-id=<%= task.get("id") %> parent-id="<%= task.get("parentid") %>" data-margin="<%= len %>" >
                <div id="id2-<%= task.get("id") %>" class="tool-div">
  
                  <% if(NeedToShowUpperInsert(index)){ %>
                    <div id="id3-<%= task.get("id") %>" class="toolinsertdata" data-toggle="tooltip" data-placement="auto" title="<%= tr("A place where new action can be inserted or moved. Click to make it active.") %>" task-id="-<%= task.get("id") %>" data-insert-index="-1" data-insert-parent="<%= task.get("parentid") %>" data-insert-id="<%= task.get("id") %>">
                      <div id="id4-<%= task.get("id") %>" class="toolinsert<%= (global.insert_index == -index && global.insert_parent == task.get("parentid") || global.insert_index == 0 && (parseInt(task.get("id")) == parseInt(GetFirstNotFunctionId())) ) ? " toolselected":"" %>"></div>
                      <div id="id5-<%= task.get("id") %>" noupdate class="toollabelcreate" draggable="true" data-toggle="tooltip" data-placement="auto" title="<%= tr("Drag this arrow in order to create new label and move execution point to other place.") %>"><i class="fa fa-arrow-circle-right"></i></div>
                    </div>
                  <% } %>
                  <div id="id6-<%= task.get("id") %>" <%= prepare_label_data(task.dat(),task.get("name")) %> class=" <%= (task.get("donotexecuteduringrecord"))? "notactive" : "" %> <%= (task.get("color").length > 0) ? ("action-color-" + task.get("color")) : "" %> tool <%= (index==0)? "toolmenufirst" : (AllowToExecuteOnce(task.get("id")) ? "toolmenuextended" : "toolmenu") %> <%= ((parseInt(task.get("id")) == parseInt(GetFirstNotFunctionId()) && global.execute_next_id == 0 || global.execute_next_id == task.get("id") ) && index != 0)? "toolexecutecurrent" : "toolnotexecute" %> taskcontainer" task-id="<%= task.get("id") %>" data-index="<%= index == 0 ? "0" : "-1" %>" <%= (parseInt(task.get("id")) == 0) ? "" : "draggable=\\"true\\"" %> <%= (parseInt(task.get("id")) == 0) ? ("data-toggle=\\"tooltip\\" data-placement=\\"top\\" title=\\"" + prepare_title_tooltip(task.dat(),task.get("name")) + "\\"") : "" %>
  >
  
  
                    <div id="id7-<%= task.get("id") %>" class="tooltitle <%= prepare_styles(task.dat(),task.get("name") ) %>"> <%= prepare_group(task.dat(),task.get("name"),task.get("id")) %> <%= prepare_title(task.dat(),task.get("name")) %> <span id="id71-<%= task.get("id") %>" class="disablenotice" task-id="<%= task.get("id") %>"><%= (task.get("donotexecuteduringrecord"))? " (" + tr("disabled") + ")" : "" %></span>
  
                      <img id="id8-<%= task.get("id") %>" class="selected" src="icons/selected.png" style="<%= (!task.get("is_selected")) ? "visibility:hidden" : "" %>"></img>
                    </div>
  
                    <div id="id9-<%= task.get("id") %>" class="titlebody " style="position:relative">
  
                      <% if(task.get("id")!=0){ %>
                        <span id="id10-<%= task.get("id") %>" noupdate class="executing" data-toggle="tooltip" data-placement="auto" title="<%= tr("Click to move execution point here.") %>"><i class="fa fa-arrow-right"></i></span>
                      <% } %>
  
                      <% if(task.get("id")!=0 && task.get("name") != "Else"){ %>
                        <span id="id11-<%= task.get("id") %>" noupdate class="ignoreerrorsthis" data-toggle="tooltip" data-placement="auto" title="<%= tr("Click to process error during execution of this action.") %>"><i class="fa fa-exclamation-triangle"></i></span>
                      <% } %>
                      
                      <span id="id12-<%= task.get("id") %>">
                        <%= prepare_body(task.dat(),task.get("name")) %>
                      </span>
  
                      <% if(task.get("id")!=0 && task.get("code").indexOf("section_insert") >= 0 && task.get("name") != "Else"){ %>
                        
                        <span id="id13-<%= task.get("id") %>" class="folding-unfolded" <%= task.get("is_fold") ? "style='display:none'" : "" %> task-id="<%= task.get("id") %>" ><i id="id14-<%= task.get("id") %>" noupdate class="fa fa-arrow-circle-down"></i></span>
                      
                        <span id="id15-<%= task.get("id") %>" class="folding-folded" <%= task.get("is_fold") ? "" : "style='display:none'" %> task-id="<%= task.get("id") %>" ><i id="id16-<%= task.get("id") %>" noupdate class="fa fa-arrow-circle-left"></i></span>
                      <% } %>
  
  
                    </div>
  
                    <% var description = prepare_description(task.dat(),task.get("name"));if(description.length > 0){ %>
                      <div class="titledescription" id="id17-<%= task.get("id") %>">
                        <%= description %>
                      </div>  
                    <% } %>
  
                    <div class="titleid" id="id18-<%= task.get("id") %>" noupdate>
                      Id: <%= task.get("id") %>
                    </div>  
                  </div>
  
                  <% if(NeedToShowLowerInsert(index)){ %>
                    <div id="id19-<%= task.get("id") %>" class="toolinsertdata" data-toggle="tooltip" data-placement="auto" title="<%= tr("A place where new action can be inserted or moved. Click to make it active.") %>" task-id="<%= task.get("id") %>" data-insert-index="-1" data-insert-parent="<%= task.get("parentid") %>">
                      <div id="id20-<%= task.get("id") %>" class="toolinsert<%= (global.insert_index == index && global.insert_parent == task.get("parentid")) ? " toolselected":"" %>" ></div>
                      <div id="id21-<%= task.get("id") %>" noupdate class="toollabelcreate" draggable="true" data-toggle="tooltip" data-placement="auto" title="<%= tr("Drag this arrow in order to create new label and move execution point to other place.") %>"><i id="id22-<%= task.get("id") %>" noupdate class="fa fa-arrow-circle-right"></i></div>
  
                    </div>
                  <% } %>
  
                </div>
              </div>
              <% } %>
              <% if(CanDisplay || IsEmptyFunctionNode(parseInt(task.get("id"))) && GetFunctionDataOfThisNode(parseInt(task.get("id")))["name"] == global.function_name ){ %>
                <% _.each(GetGroupsEndings(index), function(ending, current_index) { %>
  
                <% var endinglevel = ending["level"] %>
                <% if(GetFunctionData(task.get("id"))["id"] != 0) endinglevel--; %>
                 <% if(endinglevel>=0){ %>
                   <div id="id23-<%= task.get("id") %>-<%= current_index %>" class="tool-margin <%= (prepare_folding(ending["parentid"], 0, endinglevel)) ? "" : "folded" %>" style="<%= prepare_margins(ending["parentid"], endinglevel, "compute") %>" parent-id="<%= ending["parentid"] %>" data-margin="<%= endinglevel %>">
  
                     <div id="id24-<%= task.get("id") %>-<%= current_index %>" class="tool-div">
                      <div id="id25-<%= task.get("id") %>-<%= current_index %>" class="toolinsertdata" data-toggle="tooltip" data-placement="auto" title="<%= tr("A place where new action can be inserted or moved. Click to make it active.") %>" task-id="<%= task.get("id") %>" data-insert-index="-1" data-insert-parent="<%= ending["parentid"] %>">
                        <div id="id26-<%= task.get("id") %>-<%= current_index %>" class="toolinsert toolinsertright<%= (global.insert_index == index && global.insert_parent == ending["parentid"]) ? " toolselected":"" 
                        %>" ></div>
                        <div id="id27-<%= task.get("id") %>-<%= current_index %>" noupdate class="toollabelcreate" draggable="true" data-toggle="tooltip" data-placement="auto" title="<%= tr("Drag this arrow in order to create new label and move execution point to other place.") %>"><i class="fa fa-arrow-circle-right"></i></div>
  
                      </div>
                     </div>
                     <div id="id28-<%= task.get("id") %>-<%= current_index %>" noupdate class="clearfix"></div>
                   </div>
                 <% } %>
  
                <% }); %>
  
              <% } %>
  
        <% }; %>
        <%if(GetFirstNotFunctionId() == 0 && global["function_name"] == "Main"){%>
          <div id="id29-<%= task.get("id") %>" class="tool-div">
            <div id="id30-<%= task.get("id") %>" class="toolinsertdata" data-toggle="tooltip" data-placement="auto" title="<%= tr("A place where new action can be inserted or moved. Click to make it active.") %>" task-id="0" data-insert-index="0" data-insert-parent="0">
              <div id="id31-<%= task.get("id") %>" class="toolinsert toolinsertright<%= (global.insert_index == 0 && GetFirstNotFunctionId() == 0) ? " toolselected":"" %>"></div>
              <div id="id32-<%= task.get("id") %>" noupdate class="toollabelcreate" draggable="true" data-toggle="tooltip" data-placement="auto" title="<%= tr("Drag this arrow in order to create new label and move execution point to other place.") %>"><i class="fa fa-arrow-circle-right"></i></div>
  
            </div>
          </div>
        <% } %>
        <svg id="visualizelabels" style="z-index:-100">
          <defs>
            <marker id="Arrow0" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
              <path d="M0,1 L5,2 L0,3" stroke="#bbe2ab" fill="none"></path>
            </marker>
            <marker id="Arrow1" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
              <path d="M0,1 L5,2 L0,3" stroke="#d9d4a1" fill="none"></path>
            </marker>
            <marker id="Arrow2" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
              <path d="M0,1 L5,2 L0,3" stroke="#a8d6d4" fill="none"></path>
            </marker>
            <marker id="Arrow3" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
              <path d="M0,1 L5,2 L0,3" stroke="#a7bed9" fill="none"></path>
            </marker>
            <marker id="Arrow4" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
              <path d="M0,1 L5,2 L0,3" stroke="#e6bbbb" fill="none"></path>
            </marker>
          </defs>
        </svg>
      </div>
      <div class="bottompannel">
        <div id="inspector" style="display: none; height: 300px;" noupdate>
          <div class="handle" style="background: #dbdbdb; cursor: ns-resize; height: 6px;"></div>
          <div style="height: calc(100% - 6px); position: relative; display: flex;">
            <iframe src="inspector/frame/index.html?lang=<%= _K %>" style="border: 0; width: 100%; height: 100%;"></iframe>
            <div class="loader" style="display: none;">
              <button type="button" onclick="_Inspector.hide()">
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.87348 12.2583L3.93414 13.3189L8 9.25305L12.0659 13.3189L13.1265 12.2583L9.06066 8.19239L13.1265 4.12652L12.0659 3.06586L8 7.13173L3.93414 3.06586L2.87348 4.12652L6.93934 8.19239L2.87348 12.2583Z" fill="#606060" />
                </svg>
              </button>
              <span><%= tr('Variables will be loaded on next script pause') %></span>
            </div>
          </div>
        </div>
        <div id="functions">
          <a id="FunctionName" title="<%= tr('Current function name. Functions are containers, which holds action list. It helps to group several actions which does same task. For example, there can be function which logins to account, function that checks account balance, etc. It makes your code clear and well organized.') %>">
            <%= global.function_name %>
          </a>
        </div>
      </div>`

      return _.template(Template)({data,global,index_start})
    }
    
}