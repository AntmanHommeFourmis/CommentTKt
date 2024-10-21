try {
    <%= variable %> = JPath.changeFormat(<%= data %>, "json");
} catch (e) {
    fail(e);
}