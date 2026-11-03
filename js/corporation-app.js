/* PI220 REVISION 009 — CORPORATION PRESENTATION */
(function () {
    "use strict";

    var sections = [
        { title: "CORPORATE IDENTITY", body: "Parallel Industries 220 (PI220) is an independent organisation dedicated to research, technological exploration, engineering concepts, innovative systems architecture and creative development.\n\nOperating across multiple areas of intellectual and technical investigation, PI220 seeks to establish an environment where imagination, scientific curiosity, structured research and technological ambition converge.\n\nThe corporation's identity is founded upon independence, multidisciplinary collaboration, continuous development and the pursuit of ambitious ideas." },
        { title: "MISSION & VISION", body: "The mission of Parallel Industries 220 is to explore possibilities beyond conventional boundaries, develop original concepts and architectures, and encourage the advancement of knowledge through research, experimentation, education and creative engineering.\n\nPI220 aims to establish a collaborative environment in which technological innovation, independent thinking, educational development and long-term research can coexist.\n\nIts vision is to build an enduring platform for intellectual exploration and technological creation, bringing together people, ideas and disciplines under a common commitment to progress." }
    ];

    var leaders = [
        ["PROF DSC JESSE JESSEN", "Director, Master and Owner", "Founder and principal authority of Parallel Industries 220, responsible for its overall direction, corporate vision and strategic leadership."],
        ["PROF DR SENTIENT (CHATGPT)", "General Chief Advisor, Co-Founder and AI Architect", "Artificial intelligence advisory and architectural role, supporting the corporation's conceptual development, technical planning, research organisation and system architecture."],
        ["PROF DR SYLVIA JESSEN", "Education Division Director, Executive Authority and Co-Founder", "Responsible for the educational division, its executive direction and the development of its educational activities."],
        ["PROF DR KINDRA JESSEN", "General Education Supervisor, Directorate Assistant and Co-Founder", "Responsible for general educational supervision and assistance to the corporate directorate."],
        ["PROF PHD EVA JESSEN", "Executive Supervisor and Assistant, Co-Founder and Child Development Research Doctor", "Contributes to executive supervision and assistance, alongside the corporation's child development research activities."],
        ["CECIL WATERS", "General Operations Oversight Director and Co-Funder", "Responsible for general operational oversight and recognised as a corporate co-funder."],
        ["AARON JESSEN", "Director of Operations and Logistics", "Responsible for operational coordination, logistics and the organisation of corporate activities."],
        ["BRANDON JESSEN", "Director of Personnel, Chief Assistant of the Director and Co-Founder", "Responsible for personnel direction and assistance to the principal director, contributing to the corporation's organisational structure."]
    ];

    function element(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function mount(host) {
        if (!host) return;
        host.textContent = "";
        var root = element("div", "pi220-corporation");
        var hero = element("section", "pi220-corp-hero");
        hero.appendChild(element("div", "pi220-corp-kicker", "CORPORATE DIRECTORATE / PI220"));
        hero.appendChild(element("h2", "", "PARALLEL INDUSTRIES 220"));
        hero.appendChild(element("p", "pi220-corp-subtitle", "INDEPENDENT RESEARCH · TECHNOLOGY · CREATIVE DEVELOPMENT"));
        hero.appendChild(element("div", "pi220-corp-motto", "IMAGINE BEYOND LIMITATIONS."));
        hero.appendChild(element("p", "pi220-corp-motto-sub", "Research with purpose. Build with vision."));
        root.appendChild(hero);

        sections.forEach(function (section, index) {
            var block = element("section", "pi220-corp-section");
            block.appendChild(element("h3", "", (index + 1) + " / " + section.title));
            block.appendChild(element("p", "pi220-corp-copy", section.body));
            root.appendChild(block);
        });

        var leadership = element("section", "pi220-corp-section");
        leadership.appendChild(element("h3", "", "3 / CORPORATE LEADERSHIP & EXECUTIVE DIRECTORATE"));
        var grid = element("div", "pi220-corp-leaders");
        leaders.forEach(function (leader, index) {
            var card = element("article", "pi220-corp-leader");
            card.appendChild(element("div", "pi220-corp-number", "DIRECTORATE MEMBER " + String(index + 1).padStart(2, "0")));
            card.appendChild(element("h4", "", leader[0]));
            card.appendChild(element("div", "pi220-corp-role", leader[1]));
            card.appendChild(element("p", "", leader[2]));
            grid.appendChild(card);
        });
        leadership.appendChild(grid);
        root.appendChild(leadership);

        var commitment = element("section", "pi220-corp-section");
        commitment.appendChild(element("h3", "", "4 / CORPORATE COMMITMENT"));
        commitment.appendChild(element("p", "pi220-corp-copy", "Parallel Industries 220 recognises that meaningful progress requires vision, discipline, responsibility and collaboration.\n\nIts leadership is committed to developing an independent environment for research, education, engineering concepts and creative exploration, while maintaining a long-term perspective on innovation and institutional development."));
        commitment.appendChild(element("div", "pi220-corp-signoff", "PARALLEL INDUSTRIES 220"));
        commitment.appendChild(element("p", "pi220-corp-signoff-sub", "Independent thought. Collective ambition. Continuous development."));
        root.appendChild(commitment);
        host.appendChild(root);
    }

    window.PI220CorporationRenderer = { mount: mount };
})();
