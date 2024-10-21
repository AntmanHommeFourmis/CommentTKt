<div class="container-fluid custom">
      <span data-preserve="true" data-preserve-type="constr" data-preserve-id="Code">
        <div id="Code" data-is-code-editor="true" data-force-string="true" style="height:calc(100vh - 115px);border: none; overflow: hidden; outline: none;border:1px solid #e0e0e0;" />
      </span>
      

      <%= "<s" + "cript>" %>
        window.Code = {Editor: null, InitialValue: ""}

        require(['vs/editor/editor.main'], function() {
          window.Code.Editor = createCodeEditor(document.getElementById('Code'), {
            value: window.Code.InitialValue
          });
        });
      <%= "</" + "script>" %>

      

      <div style="text-align:center;align-items: center; display: flex !important; justify-content: center;">
        <a tabindex="-1" href="#" data-toggle="modal" data-result-target="#Code" class="var" style="margin-right:15px">
          <span style="align-items: center; display: flex !important; justify-content: center;margin-top:5px">
            <svg class="dropdown-icon" width="16" height="16"  viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"  style="margin-right:10px">
              <path d="M7.5 12h1V9.5H11v-1H8.5V6h-1v2.5H5v1h2.5V12z" fill="#337ab7" />
              <path d="M.5 2v12h15V2H.5zm14 11h-13V5h13v8z" fill="#337ab7" />
            </svg>
            <span class="tr">Insert variable</span>
          </span>
        </a>
        <a tabindex="-1" href="#" data-toggle="modal" data-result-target="#Code" class="res">
          <span style="align-items: center; display: flex !important; justify-content: center;margin-top:5px">
            <svg class="dropdown-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:10px">
              <path d="M1.5 1.5v13h13v-13h-13zm12 12h-11v-3h11v3zm0-4h-11v-3h11v3zm-1.5-6a.5.5 0 110 1 .5.5 0 010-1z" fill="#337ab7" />
              <path d="M12 8.5a.5.5 0 100-1 .5.5 0 000 1zM12 12.5a.5.5 0 100-1 .5.5 0 000 1z" fill="#337ab7" />
            </svg>
            <span class="tr">Load from file, user input, database</span>
          </span>
        </a>
      </div>
      <span class="short-description tr">Run javascript code in web interface context.</span>
    </div>



    <%= _.template($('#back').html())({action:"executeandadd", visible:true, modal_code_id:"custom-help-interface-" + (_K || "en")}) %> 