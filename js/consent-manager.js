
/* PI220 — CONSENT MANAGER
   REVISION 001
   Independent visitor consent management.
   GA4 is deliberately NOT loaded by this module.
*/

(function () {
    "use strict";

    var STORAGE_KEY = "pi220Consent";
    var CONSENT_VERSION = 1;

    var memoryConsent = null;
    var overlay = null;
    var statusText = null;
    var isOpen = false;

    function readConsent() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);

            if (!stored) return memoryConsent;

            var parsed = JSON.parse(stored);

            if (
                parsed &&
                parsed.version === CONSENT_VERSION &&
                typeof parsed.analytics === "boolean"
            ) {
                return parsed;
            }
        } catch (error) {
            console.warn("[PI220 CONSENT] Stored consent unavailable.");
        }

        return memoryConsent;
    }

    function saveConsent(analyticsAllowed) {
        var consent = {
            version: CONSENT_VERSION,
            analytics: analyticsAllowed,
            updatedAt: new Date().toISOString()
        };

        memoryConsent = consent;

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
        } catch (error) {
            console.warn("[PI220 CONSENT] Could not persist consent.");
        }

        window.dispatchEvent(
            new CustomEvent("pi220:consentchange", {
                detail: {
                    analytics: analyticsAllowed,
                    updatedAt: consent.updatedAt
                }
            })
        );

        closePanel();

        console.info(
            "[PI220 CONSENT] Visitor choice saved:",
            analyticsAllowed ? "ANALYTICS ACCEPTED" : "OPTIONAL ANALYTICS REJECTED"
        );
    }

    function createElement(tag, className, text) {
        var node = document.createElement(tag);

        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;

        return node;
    }

    function closePanel() {
        if (!overlay) return;

        overlay.hidden = true;
        isOpen = false;
    }

    function openSettings() {
        if (!overlay) {
            console.warn("[PI220 CONSENT] Interface not ready.");
            return;
        }

        var consent = readConsent();

        if (statusText) {
            if (!consent) {
                statusText.textContent =
                    "No optional analytics choice has been recorded.";
            } else {
                statusText.textContent =
                    "Current analytics preference: " +
                    (consent.analytics ? "ACCEPTED" : "REJECTED") +
                    ". You can change this decision below.";
            }
        }

        overlay.hidden = false;
        isOpen = true;

        var rejectButton = overlay.querySelector(
            '[data-consent-action="reject"]'
        );

        if (rejectButton) rejectButton.focus();
    }

    function buildInterface() {
        if (overlay) return;

        overlay = createElement("div", "pi220-consent-overlay");
        overlay.hidden = true;

        var panel = createElement("section", "pi220-consent-panel");
        panel.setAttribute("role", "dialog");
        panel.setAttribute("aria-modal", "true");
        panel.setAttribute("aria-labelledby", "pi220ConsentTitle");
        panel.setAttribute("aria-describedby", "pi220ConsentDescription");

        var header = createElement(
            "div",
            "pi220-consent-kicker",
            "PARALLEL INDUSTRIES 220 / PRIVACY"
        );

        var heading = createElement(
            "h2",
            "pi220-consent-title",
            "YOUR PRIVACY. YOUR CHOICE."
        );
        heading.id = "pi220ConsentTitle";

        var description = createElement(
            "p",
            "pi220-consent-description",
            "PI220 uses browser storage for website preferences. We may introduce optional analytics to understand website usage. You decide whether optional analytics may be activated."
        );
        description.id = "pi220ConsentDescription";

        var explanation = createElement(
            "p",
            "pi220-consent-explanation",
            "Rejecting optional analytics will not prevent you from using the website. No choice is assumed from browsing, inactivity or closing this interface."
        );

        statusText = createElement(
            "p",
            "pi220-consent-status",
            "No optional analytics choice has been recorded."
        );
        statusText.setAttribute("aria-live", "polite");

        var actions = createElement("div", "pi220-consent-actions");

        var rejectButton = createElement(
            "button",
            "pi220-consent-button pi220-consent-reject",
            "REJECT OPTIONAL"
        );
        rejectButton.type = "button";
        rejectButton.setAttribute("data-consent-action", "reject");

        var acceptButton = createElement(
            "button",
            "pi220-consent-button pi220-consent-accept",
            "ACCEPT ANALYTICS"
        );
        acceptButton.type = "button";
        acceptButton.setAttribute("data-consent-action", "accept");

        rejectButton.addEventListener("click", function () {
            saveConsent(false);
        });

        acceptButton.addEventListener("click", function () {
            saveConsent(true);
        });

        actions.appendChild(rejectButton);
        actions.appendChild(acceptButton);

        var footer = createElement(
            "p",
            "pi220-consent-footer",
            "You can change or withdraw your choice later through COOKIE SETTINGS in the Corporation legal section."
        );

        panel.appendChild(header);
        panel.appendChild(heading);
        panel.appendChild(description);
        panel.appendChild(explanation);
        panel.appendChild(statusText);
        panel.appendChild(actions);
        panel.appendChild(footer);

        overlay.appendChild(panel);
        document.body.appendChild(overlay);
    }

    function startAfterBoot() {
        buildInterface();

        var consent = readConsent();

        if (!consent) {
            openSettings();
        }

        console.info("[PI220 CONSENT] CONSENT MANAGER READY");
    }

    function waitForBoot() {
        var boot = document.getElementById("pi220Boot");

        if (!boot) {
            startAfterBoot();
            return;
        }

        var observer = new MutationObserver(function () {
            if (!document.getElementById("pi220Boot")) {
                observer.disconnect();
                startAfterBoot();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function initialize() {
        waitForBoot();
    }

    window.PI220ConsentManager = {
        openSettings: openSettings,

        getConsent: function () {
            return readConsent();
        },

        hasAnalyticsConsent: function () {
            var consent = readConsent();
            return !!(consent && consent.analytics === true);
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize);
    } else {
        initialize();
    }
})();
