_call_function(_InMail.<%if(wait){%>wait<%}else{%>search<%}%>One, {criteria: {<%= [["from", from], ['"!from"', notFrom], ["to", to], ['"!to"', notTo], ["subject", subject], ['"!subject"', notSubject], ["text", text], ['"!text"', notText], ["flags", flags], ['"!flags"', notFlags], ["since", since], ["before", before]].filter(function(el){return el[1] !== '""'}).map(function(el){return el[0] + ':(' + el[1] + ')'}).join(', ') %>}, sorts: {type: (<%= sortType %>), field: (<%= sortField %>)}<%if(wait){%>, minResults: (<%= minResults %>), interval: ((<%= interval %>) * 1000)<%}%><%if(box!=='""'){%>, box: (<%= box %>)<%}%>, timeout: (<%if(wait){%>(<%= timeout %>) * 1000<%}else{%><%= timeout_value() || 60000 %><%}%>)})!
<%= variable %> = _result_function();
