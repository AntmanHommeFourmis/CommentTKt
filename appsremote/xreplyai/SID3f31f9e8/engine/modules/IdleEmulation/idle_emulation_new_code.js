/*Browser*/
_Idle.emulate({time: (<%= time %>), accuracy: (<%= accuracy %>), intensity: (<%= intensity %>)<%if(actions){%>, useActions: {<%= actions %>}<%}%><%if(manualSettings){%>, <%= manualSettings %><%}%>})!
