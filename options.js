/* jshint esversion: 6 */

messenger = window.messenger.extension.getBackgroundPage().messenger;

function localize() {
    document.querySelectorAll("[data-l10n-id]").forEach(e => {
        let id = e.attributes["data-l10n-id"].value;
        let msg = messenger.i18n.getMessage(id);
        e.innerHTML = msg;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    localize();

    messenger.storage.local.get("catchAll").then(r => {
        document.querySelector("#catchAll").checked = r.catchAll === "on";
    });

    document.querySelector("#catchAll").addEventListener("change", e => {
        e.preventDefault();
        messenger.storage.local.set({
            catchAll: document.querySelector("#catchAll").checked ? "on" : "off"
        });
    });
});
