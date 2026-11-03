/* PI220 REVISION 008 — PROJECTS REGISTRY
   Renders the original project records without rewriting their content.
   All database values are inserted as text, never interpreted as HTML.
*/
(function () {
    "use strict";

    function make(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined && text !== null) node.textContent = String(text);
        return node;
    }

    function renderProjects(host) {
        var projects = window.PI220_PROJECTS || [];
        if (!host) return;

        host.textContent = "";

        var shell = make("div", "pi220-projects");
        var heading = make("div", "pi220-projects-heading");
        heading.appendChild(make("div", "pi220-projects-kicker", "PARALLEL INDUSTRIES / SYSTEMS DIVISION"));
        heading.appendChild(make("h2", "", "PROJECTS REGISTRY"));
        heading.appendChild(make("p", "pi220-projects-subtitle", "Unified project database / original records"));
        shell.appendChild(heading);

        var toolbar = make("div", "pi220-projects-toolbar");
        var search = make("input", "pi220-projects-search");
        search.type = "search";
        search.placeholder = "Search projects, serials or specifications...";
        search.setAttribute("aria-label", "Search projects");
        var count = make("div", "pi220-projects-count");
        toolbar.appendChild(search);
        toolbar.appendChild(count);
        shell.appendChild(toolbar);

        var list = make("div", "pi220-project-list");
        shell.appendChild(list);
        host.appendChild(shell);

        function draw() {
            var term = search.value.trim().toLowerCase();
            list.textContent = "";
            var visible = 0;

            projects.forEach(function (project, index) {
                var searchable = Object.keys(project).map(function (key) {
                    return key + " " + String(project[key]);
                }).join(" ").toLowerCase();

                if (term && searchable.indexOf(term) === -1) return;
                visible += 1;

                var card = make("article", "pi220-project-card");
                var details = make("details", "pi220-project-details");
                var summary = make("summary", "pi220-project-summary");
                var titleArea = make("span", "pi220-project-title-area");
                titleArea.appendChild(make("strong", "pi220-project-name", project.name || "UNTITLED PROJECT"));
                titleArea.appendChild(make("span", "pi220-project-serial", project.serial || "SERIAL NOT SPECIFIED"));
                summary.appendChild(titleArea);
                summary.appendChild(make("span", "pi220-project-index", String(index + 1).padStart(2, "0")));
                details.appendChild(summary);

                var body = make("div", "pi220-project-fields");
                Object.keys(project).forEach(function (key) {
                    if (key === "name" || key === "serial") return;
                    var field = make("section", "pi220-project-field");
                    field.appendChild(make("h3", "pi220-project-field-label", key.replace(/_/g, " ").toUpperCase()));
                    field.appendChild(make("p", "pi220-project-field-value", project[key]));
                    body.appendChild(field);
                });
                details.appendChild(body);
                card.appendChild(details);
                list.appendChild(card);
            });

            count.textContent = visible + " / " + projects.length + " PROJECTS";
            if (!visible) {
                list.appendChild(make("div", "pi220-project-empty", "NO MATCHING PROJECTS"));
            }
        }

        search.addEventListener("input", draw);
        draw();
    }

    window.PI220ProjectsRenderer = {
        mount: renderProjects
    };
})();
