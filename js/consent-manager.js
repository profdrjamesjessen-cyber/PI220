
/* PI220 — CONSENT MANAGER
   REVISION 002
   Basic Consent Mode + Google Analytics 4
*/

(function () {
    "use strict";

    var STORAGE_KEY = "pi220Consent";
    var CONSENT_VERSION = 1;

    var GA4_ID = "G-S1S7HJCFWV";

    var memoryConsent = null;
    var overlay = null;
    var statusText = null;
    var gaScriptLoaded = false;

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

    function activateAnalytics() {
        if (gaScriptLoaded) {
            window.gtag("consent", "update", {
                analytics_storage: "granted",
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied"
            });

            window.gtag("event", "page_view");
            return;
        }

        window.dataLayer = window.dataLayer || [];

        window.gtag = window.gtag || function () {
            window.dataLayer.push(arguments);
        };

        // Default: deny all optional Google storage.
        window.gtag("consent", "default", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
        });

        window.gtag("js", new Date());

        // Only analytics is permitted by this PI220 choice.
        window.gtag("consent", "update", {
            analytics_storage: "granted",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
        });

        // Prevent automatic page views before our explicit event.
        window.gtag("config", GA4_ID, {
            send_page_view: false
        });

        var script = document.createElement("script");
        script.async = true;
        script.src =
            "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;

        script.onload = function () {
            console.info("[PI220 GA4] GOOGLE ANALYTICS LOADED");
        };

        script.onerror = function () {
            console.error("[PI220 GA4] Failed to load Google Analytics.");
        };

        gaScriptLoaded = true;
        document.head.appendChild(script);

        window.gtag("event", "page_view");

        console.info("[PI220 GA4] ANALYTICS ACTIVATED BY CONSENT");
    }

    function deactivateAnalytics() {
        if (!gaScriptLoaded || typeof window.gtag !== "function") {
            return;
        }

        window.gtag("consent", "update", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
        });

        console.info("[PI220 GA4] ANALYTICS CONSENT WITHDRAWN");
    }

    function saveConsent(analyticsAllowed) {
        var consent = {
            version: CONSENT_VERSION,
            analytics: analyticsAllowed,
            updatedAt: new Date().toISOString()
        };

        var persisted = false;

        try {
            var serialized = JSON.stringify(consent);

            localStorage.setItem(STORAGE_KEY, serialized);

            persisted =
                localStorage.getItem(STORAGE_KEY) === serialized;
        } catch (error) {
            console.warn("[PI220 CONSENT] Could not persist consent.");
        }

        // Never activate analytics without persistent acceptance.
        if (analyticsAllowed && !persisted) {
            if (statusText) {
                statusText.textContent =
                    "Your choice could not be saved. Please enable browser storage and try again. Analytics remains disabled.";
            }

            console.error(
                "[PI220 CONSENT] Acceptance not saved. Analytics blocked."
            );

            return;
        }

        // A rejection remains effective for this session even if
        // browser storage is unavailable.
        memoryConsent = consent;

        window.dispatchEvent(
            new CustomEvent("pi220:consentchange", {
                detail: {
                    analytics: analyticsAllowed,
                    updatedAt: consent.updatedAt
                }
            })
        );

        if (analyticsAllowed) {
            activateAnalytics();
        } else {
            deactivateAnalytics();
        }

        closePanel();

        console.info(
            "[PI220 CONSENT] Visitor choice:",
            analyticsAllowed ? "ANALYTICS ACCEPTED" : "ANALYTICS REJECTED"
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
        } else if (consent.analytics === true) {
            activateAnalytics();
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
