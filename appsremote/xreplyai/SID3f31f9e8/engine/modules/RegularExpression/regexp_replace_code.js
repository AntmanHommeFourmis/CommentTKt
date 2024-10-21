<%= variable %> = native("regexp", "replace", JSON.stringify({text: <%= string %>,regexp:(<%= regexp %>).toString(),replace:<%= replace %>}))
