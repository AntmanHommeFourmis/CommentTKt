var csv_res = _csv_parse(<%= string %>,<%= separators %>,<%= convert_types %>);
VAR_<%= all %> = csv_res;
<% for(var i = 0;i < list.length; i++){ %>
	VAR_<%= list[i] %> = _avoid_nilb(csv_res[<%= i %>], "");
<% } %>
