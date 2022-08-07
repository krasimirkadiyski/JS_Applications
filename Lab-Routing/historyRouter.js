export function createHRouter(views, main) {
    window.addEventListener('popstate', onChange);
    document.body.addEventListener('click', event => {
        if (event.target.tagName == 'A') {
            event.preventDefault();
            window.history.pushState(null, '', event.target.href);
            onChange();
        }
    });
    return onChange;

    function onChange() {
        const name = window.location.pathname;
        const view = views[name];

        if (typeof view == 'function') {
            main.innerHTML = view();
        }
    }
}