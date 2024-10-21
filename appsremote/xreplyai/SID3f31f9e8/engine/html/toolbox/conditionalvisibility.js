

function SetupConditionalVisibility()
{
    let ProcessTrigger = function(ElementRaw)
    {
        let CheckboxElement = $(ElementRaw)
        let TriggerName = CheckboxElement.attr("data-visibility-trigger")
        let IsChecked = CheckboxElement.is(':checked')

        if(IsChecked)
        {
            $(`[data-visible-if-checked="${TriggerName}"]`).show()
            $(`[data-visible-if-unchecked="${TriggerName}"]`).hide()
        }else
        {
            $(`[data-visible-if-checked="${TriggerName}"]`).hide()
            $(`[data-visible-if-unchecked="${TriggerName}"]`).show()
        }
    }
    
    $('input[data-visibility-trigger][type="checkbox"]').change(function() {
        ProcessTrigger(this)
    });

    $('input[data-visibility-trigger][type="radio"]').change(function() {
        let Element = $(this)
        let Name = Element.attr("name")
        $(`input[data-visibility-trigger][type="radio"][name="${Name}"]`).each(function(){
            ProcessTrigger(this)
        })
        
    });

    $('input[data-visibility-trigger]').each(function() {
        ProcessTrigger(this)
    });
}