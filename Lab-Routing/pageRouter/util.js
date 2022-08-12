export function formHandler(form, callback) {
    form.addEventListener('submit', onSubmit);
    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);
        callback(Object.fromEntries([...formData.entries()]));
    }
}