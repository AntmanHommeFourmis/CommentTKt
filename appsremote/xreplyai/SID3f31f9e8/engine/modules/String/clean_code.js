<%= variable %> = _clean(<%= string %>, "<% if(tabs){ %>\\t\\v<% }%>"<% if(characters_to_delete!=='""'){ %> + <%= characters_to_delete %><% }%>, "<% if(breaks){ %>\\r\\n\\f<% }%>"<% if(characters_to_space!=='""'){ %> + <%= characters_to_space %><% }%>, <%= spaces %>);
