/* PI220 REVISION 010 — HELP & SUPPORT */
(function () {
    "use strict";

    var contacts = [
        "PI220.391.PROFDSCXYZ.2026@PROTON.ME",
        "PI220.391.PROFDRYXZ.2026@PROTON.ME",
        "CONOCEAPROFDSC@PROTON.ME"
    ];

    function make(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function mount(host) {
        if (!host) return;
        host.textContent = "";

        var root = make("div", "pi220-help");
        var hero = make("section", "pi220-help-hero");
        hero.appendChild(make("div", "pi220-help-kicker", "PI220 / SUPPORT SERVICES"));
        hero.appendChild(make("h2", "", "HELP & SUPPORT"));
        hero.appendChild(make("p", "", "The PI220 Help module and its support functions are currently under development and construction."));
        var status = make("div", "pi220-help-status", "STATUS: UNDER DEVELOPMENT");
        status.setAttribute("role", "status");
        hero.appendChild(status);
        root.appendChild(hero);

        var contact = make("section", "pi220-help-section");
        contact.appendChild(make("h3", "", "CONTACT & ASSISTANCE"));
        contact.appendChild(make("p", "pi220-help-copy", "For references, enquiries, assistance or support, please contact Parallel Industries 220 using the email addresses below."));
        var list = make("div", "pi220-help-contacts");
        contacts.forEach(function (address, index) {
            var row = make("div", "pi220-help-contact");
            row.appendChild(make("span", "pi220-help-contact-index", "CONTACT 0" + (index + 1)));
            var link = make("a", "", address);
            link.href = "mailto:" + address;
            link.setAttribute("aria-label", "Email " + address);
            row.appendChild(link);
            list.appendChild(row);
        });
        contact.appendChild(list);
        root.appendChild(contact);

        var legal = make("section", "pi220-help-section pi220-help-legal");
        legal.appendChild(make("h3", "", "GENERAL LEGAL NOTICE"));
        legal.appendChild(make("p", "pi220-help-copy", "Unless otherwise stated, the PI220 name, identity, original text, designs, graphics, interface elements, project descriptions and other materials presented within this website are claimed as the intellectual property of Parallel Industries 220 and/or their respective authors or rights holders. All rights are reserved to the extent permitted by applicable law."));
        legal.appendChild(make("p", "pi220-help-copy", "Website content is provided for general information, research, educational and illustrative purposes. Project descriptions and concepts are presented as supplied by their authors and should not be interpreted as a guarantee of commercial availability, technical performance, certification, or operational capability."));
        legal.appendChild(make("p", "pi220-help-copy", "Visitors may view the website for personal and informational purposes. No material may be reproduced, republished, distributed, modified or used commercially without prior permission from the relevant rights holder, except where permitted by applicable law."));
        legal.appendChild(make("p", "pi220-help-copy", "To the extent permitted by applicable law, Parallel Industries 220 makes no warranty that the website will always be available, uninterrupted or error-free, and accepts no liability for losses arising from use of the website or reliance on its content. Nothing in this notice excludes or limits liability where such exclusion or limitation is prohibited by law."));
        legal.appendChild(make("p", "pi220-help-copy", "External websites and services remain the responsibility of their respective operators. Links or references do not necessarily imply endorsement or affiliation."));
        legal.appendChild(make("p", "pi220-help-copy", "This notice is a general website statement and does not replace formal terms of use, a privacy or cookie notice, or legal advice. Applicable mandatory laws and the rights of third parties remain unaffected."));
        root.appendChild(legal);

        var footer = make("footer", "pi220-help-footer");
        footer.appendChild(make("strong", "", "PARALLEL INDUSTRIES 220"));
        footer.appendChild(make("span", "", "HELP MODULE / INITIAL RELEASE"));
        root.appendChild(footer);

        host.appendChild(root);
    }

    window.PI220HelpRenderer = { mount: mount };
})();
