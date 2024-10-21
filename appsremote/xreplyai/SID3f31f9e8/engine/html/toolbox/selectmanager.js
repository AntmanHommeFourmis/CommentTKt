function SelectInitialize()
{
    $(".combobox").each(function(){
        let Config = {}
        if($(this).attr("data-use-search") == "true")
        {
            Config = {
                select: this,
                settings: {
                    showSearch: true,
                    searchPlaceholder: tr("Search"),
                    showOptionTooltips: true
                }
            }
            
        }else
        {
            Config = {
                select: this,
                settings: {
                    showSearch: false,
                    showOptionTooltips: true
                }
            }
        }

        new SlimSelect(Config)

    })
}

function SelectChange(Id, Data)
{
    if($("#" + Id).hasClass("combobox"))
    {
      $("#" + Id)[0].slim.setSelected(Data)
    }
}

function SelectCloseAll()
{
    /*debugger;
    $(".combobox").each(function(){
        this.slim.close()
    })*/
    $(".ss-content").remove()
}

