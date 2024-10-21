try {
    <%= variable %> = JPath.changeFormat(<%= data %>, "string");
} catch (e) {
    fail(e);
}