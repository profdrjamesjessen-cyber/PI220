/* PI220 REVISION 004 — WINDOW MANAGER
   Standalone add-on. Keeps Revision 003 main.js untouched.
*/
document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    var workspace = document.querySelector(".desktop-workspace");
    var taskbarApps = document.querySelector(".taskbar-apps");
    if (!workspace) {
        console.error("[PI220 WM] Desktop workspace not found.");
        return;
    }

    var layer = document.getElementById("windowLayer");
    if (!layer) {
        layer = document.createElement("div");
        layer.id = "windowLayer";
        layer.className = "window-layer";
        layer.setAttribute("aria-label", "Application windows");
        workspace.appendChild(layer);
    }

    var windows = {};
    var z = 10;

    var apps = {
        media: {
            title: "MEDIA EXPLORER", code: "APP-01 / MEDIA",
            content: '<div id="pi220MediaCarousel" class="pi220-media-host"></div>'
        },
        projects: {
            title: "PROJECTS", code: "APP-02 / PROJECTS",
            content: '<div id="pi220ProjectsHost" class="pi220-projects-host"></div>'
        },
        corporation: {
            title: "CORPORATION", code: "CORP-01 / DIRECTORATE",
            content: '<div id="pi220CorporationHost" class="pi220-corporation-host"></div>'
        },
        help: {
            title: "HELP & SUPPORT", code: "SUP-01 / CONTACT",
            content: '<div id="pi220HelpHost" class="pi220-help-host"></div>'
        },
        system: {
            title: "SYSTEM CONTROL", code: "SYS-01 / CONTROL",
            content: '<div class="wm-panel-heading">SYSTEM CONTROL</div><p class="wm-lead">PI220 system environment</p><p>System information, configuration tools and diagnostics will be developed here.</p><div class="wm-status-row"><span class="wm-status-dot"></span> WINDOW MANAGER CONNECTION ACTIVE</div>'
        }
    };

    function focus(win) {
        z += 1;
        win.style.zIndex = z;
        Object.keys(windows).forEach(function (id) {
            windows[id].element.classList.remove("is-active");
        });
        win.classList.add("is-active");
    }

    function removeTaskButton(entry) {
        if (entry.taskButton && entry.taskButton.parentNode) {
            entry.taskButton.parentNode.removeChild(entry.taskButton);
        }
    }

    function closeApp(id) {
        var entry = windows[id];
        if (!entry) return;
        entry.element.parentNode.removeChild(entry.element);
        removeTaskButton(entry);
        delete windows[id];
    }

   
function addTaskButton(id, title) {
    if (!taskbarApps) return null;

    var button = document.createElement("button");
    button.type = "button";
    button.className = "window-taskbar-button";

    // Display only the first letter of the application name
    button.textContent = title.charAt(0).toUpperCase();

    // Preserve the full name as a tooltip
    button.title = title;
    button.setAttribute("aria-label", title);

    button.addEventListener("click", function () {
        var entry = windows[id];
        if (!entry) return;

        entry.element.classList.remove("is-minimized");
        entry.minimized = false;
        button.classList.remove("is-minimized");
        focus(entry.element);
    });

    taskbarApps.appendChild(button);
    return button;
}

    function openApp(id) {
        var app = apps[id];
        if (!app) return;
        if (windows[id]) {
            windows[id].element.classList.remove("is-minimized");
            windows[id].minimized = false;
            if (windows[id].taskButton) windows[id].taskButton.classList.remove("is-minimized");
            focus(windows[id].element);
            return;
        }

        var win = document.createElement("section");
        win.className = "pi-window is-active";
        win.setAttribute("role", "dialog");
        win.setAttribute("aria-label", app.title);
        win.dataset.app = id;
        win.style.width = "min(760px, 88%)";
        win.style.height = "min(520px, 86%)";
        win.style.zIndex = ++z;
        workspace.querySelector("#windowLayer").appendChild(win);
        win.style.left = Math.max(0, (layer.clientWidth - win.offsetWidth) / 2) + "px";
        win.style.top = Math.max(0, (layer.clientHeight - win.offsetHeight) / 2) + "px";

        win.innerHTML =
            '<header class="pi-window-header"><div class="pi-window-heading"><span class="pi-window-mark">PI220</span><span class="pi-window-title"></span><span class="pi-window-code"></span></div><div class="pi-window-controls"><button type="button" class="pi-window-control minimize" aria-label="Minimise" title="Minimise">—</button><button type="button" class="pi-window-control maximize" aria-label="Maximise" title="Maximise">□</button><button type="button" class="pi-window-control close" aria-label="Close" title="Close">×</button></div></header><div class="pi-window-content"></div><div class="pi-window-resize" aria-label="Resize window"></div>';

        win.querySelector(".pi-window-title").textContent = app.title;
        win.querySelector(".pi-window-code").textContent = app.code;
        win.querySelector(".pi-window-content").innerHTML = app.content;

        if (id === "media" && window.PI220Carousel) {
            window.PI220Carousel.mount(win.querySelector("#pi220MediaCarousel"));
        }

        if (id === "projects" && window.PI220ProjectsRenderer) {
            window.PI220ProjectsRenderer.mount(win.querySelector("#pi220ProjectsHost"));
        }
        if (id === "corporation" && window.PI220CorporationRenderer) {
            window.PI220CorporationRenderer.mount(win.querySelector("#pi220CorporationHost"));
        }
        if (id === "help" && window.PI220HelpRenderer) {
            window.PI220HelpRenderer.mount(win.querySelector("#pi220HelpHost"));
        }

        var entry = {
            element: win, taskButton: addTaskButton(id, app.title),
            minimized: false, maximized: false, previous: null
        };
        windows[id] = entry;

        win.addEventListener("pointerdown", function () { focus(win); });

        win.querySelector(".pi-window-header").addEventListener("pointerdown", function (event) {
            if (event.target.closest("button") || entry.maximized || event.button !== 0) return;
            focus(win);
            var sx = event.clientX, sy = event.clientY;
            var sl = win.offsetLeft, st = win.offsetTop;
            function move(e) {
                var maxL = Math.max(0, layer.clientWidth - win.offsetWidth);
                var maxT = Math.max(0, layer.clientHeight - win.offsetHeight);
                win.style.left = Math.max(0, Math.min(maxL, sl + e.clientX - sx)) + "px";
                win.style.top = Math.max(0, Math.min(maxT, st + e.clientY - sy)) + "px";
            }
            function stop() {
                document.removeEventListener("pointermove", move);
                document.removeEventListener("pointerup", stop);
                document.removeEventListener("pointercancel", stop);
            }
            document.addEventListener("pointermove", move);
            document.addEventListener("pointerup", stop);
            document.addEventListener("pointercancel", stop);
            event.preventDefault();
        });

        win.querySelector(".minimize").addEventListener("click", function () {
            win.classList.add("is-minimized");
            entry.minimized = true;
            if (entry.taskButton) entry.taskButton.classList.add("is-minimized");
        });

        var maxButton = win.querySelector(".maximize");
        maxButton.addEventListener("click", function () {
            if (!entry.maximized) {
                entry.previous = {
                    left: win.style.left, top: win.style.top,
                    width: win.style.width, height: win.style.height
                };
                win.classList.add("is-maximized");
                win.style.left = "0px"; win.style.top = "0px";
                win.style.width = "100%"; win.style.height = "100%";
                entry.maximized = true;
                maxButton.textContent = "❐";
                maxButton.title = "Restore";
                maxButton.setAttribute("aria-label", "Restore");
            } else {
                win.classList.remove("is-maximized");
                Object.keys(entry.previous || {}).forEach(function (key) {
                    win.style[key] = entry.previous[key];
                });
                entry.maximized = false;
                maxButton.textContent = "□";
                maxButton.title = "Maximise";
                maxButton.setAttribute("aria-label", "Maximise");
            }
            focus(win);
        });

        win.querySelector(".close").addEventListener("click", function () { closeApp(id); });

        win.querySelector(".pi-window-resize").addEventListener("pointerdown", function (event) {
            if (entry.maximized || event.button !== 0) return;
            focus(win);
            var sx = event.clientX, sy = event.clientY;
            var sw = win.offsetWidth, sh = win.offsetHeight;
            function resize(e) {
                var maxW = layer.clientWidth - win.offsetLeft;
                var maxH = layer.clientHeight - win.offsetTop;
                win.style.width = Math.max(280, Math.min(maxW, sw + e.clientX - sx)) + "px";
                win.style.height = Math.max(190, Math.min(maxH, sh + e.clientY - sy)) + "px";
            }
            function stop() {
                document.removeEventListener("pointermove", resize);
                document.removeEventListener("pointerup", stop);
                document.removeEventListener("pointercancel", stop);
            }
            document.addEventListener("pointermove", resize);
            document.addEventListener("pointerup", stop);
            document.addEventListener("pointercancel", stop);
            event.preventDefault();
        });

        focus(win);
    }

    if (taskbarApps) {
        taskbarApps.querySelectorAll("button").forEach(function (button) {
            var label = (button.getAttribute("aria-label") || button.title || button.textContent || "").toLowerCase();
            if (label.indexOf("media") !== -1) button.addEventListener("click", function () { openApp("media"); });
            else if (label.indexOf("project") !== -1) button.addEventListener("click", function () { openApp("projects"); });
            else if (label.indexOf("corporation") !== -1) button.addEventListener("click", function () { openApp("corporation"); });
            else if (label.indexOf("help") !== -1) button.addEventListener("click", function () { openApp("help"); });
            else if (label.indexOf("system") !== -1) button.addEventListener("click", function () { openApp("system"); });
        });
    }

    window.PI220WindowManager = {
        open: openApp,
        close: closeApp,
        list: function () { return Object.keys(windows); }
    };

    console.log("[PI220 WM] WINDOW MANAGER READY");

    document.dispatchEvent(new CustomEvent("pi220:windowmanagerready"));
});
