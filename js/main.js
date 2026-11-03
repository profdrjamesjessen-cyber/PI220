
document.addEventListener("DOMContentLoaded", function () {

    /* ================================================
       PI220 — CORPORATE TACTICAL REVISION 003
       SYSTEM INITIALISATION
       ================================================ */

    const terminal = document.getElementById("systemTerminal");
    const handle = document.getElementById("terminalResizeHandle");
    const output = document.getElementById("terminalOutput");
    const form = document.getElementById("terminalForm");
    const commandInput = document.getElementById("terminalCommand");

    const startButton = document.getElementById("startButton");
    const startMenu = document.getElementById("startMenu");

    const clockElement = document.getElementById("systemClock");
    const dateElement = document.getElementById("systemDate");

    const soundToggle = document.getElementById("soundToggle");
    const soundIcon = document.getElementById("soundIcon");

    const languageToggle = document.getElementById("languageToggle");

    const defaultHeight = 190;
    const minimumHeight = 100;

    let currentHeight = defaultHeight;
    let resizing = false;
    let startY = 0;
    let startHeight = 0;


    /* ================================================
       TERMINAL HEIGHT AND RESIZING
       ================================================ */

    function setTerminalHeight(height) {

        const maximum = Math.max(
            minimumHeight,
            Math.floor(window.innerHeight * 0.55)
        );

        currentHeight = Math.max(
            minimumHeight,
            Math.min(height, maximum)
        );

        terminal.style.setProperty(
            "--terminal-height",
            currentHeight + "px"
        );

        handle.setAttribute(
            "aria-valuenow",
            String(currentHeight)
        );
    }


    function stopResizing() {
        resizing = false;
    }


    handle.addEventListener("pointerdown", function (event) {

        resizing = true;

        startY = event.clientY;
        startHeight = currentHeight;

        handle.setPointerCapture(event.pointerId);

        event.preventDefault();
    });


    handle.addEventListener("pointermove", function (event) {

        if (!resizing) return;

        const difference = startY - event.clientY;

        setTerminalHeight(startHeight + difference);
    });


    handle.addEventListener("pointerup", stopResizing);
    handle.addEventListener("pointercancel", stopResizing);


    handle.addEventListener("dblclick", function () {
        setTerminalHeight(defaultHeight);
    });


    handle.addEventListener("keydown", function (event) {

        if (event.key === "ArrowUp") {
            setTerminalHeight(currentHeight + 20);
            event.preventDefault();
        }

        if (event.key === "ArrowDown") {
            setTerminalHeight(currentHeight - 20);
            event.preventDefault();
        }

        if (event.key === "Home") {
            setTerminalHeight(defaultHeight);
            event.preventDefault();
        }
    });


    window.addEventListener("resize", function () {
        setTerminalHeight(currentHeight);
    });


    /* ================================================
       TERMINAL LOGGING
       ================================================ */

    function log(message) {

        const line = document.createElement("div");

        line.textContent = message;

        output.appendChild(line);

        output.scrollTop = output.scrollHeight;
    }


    /* ================================================
       TERMINAL COMMANDS
       ================================================ */

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const command = commandInput.value
            .trim()
            .toLowerCase();

        if (!command) return;

        log(command.startsWith("/") ? command : "/" + command);

        commandInput.value = "";

        switch (command) {

            case "/help":
            case "help":

                log("[HELP] AVAILABLE COMMANDS:");
                log("/help - Display available commands");
                log("/clear - Clear terminal history");
                log("/about - Display system information");
                log("/media - Open MEDIA EXPLORER");
                log("/projects - Open PROJECTS");
                log("/corporation - Open CORPORATION");
                log("/system - Open SYSTEM");

                break;


            case "/clear":
            case "clear":

                output.innerHTML = "";

                log("[SYS] TERMINAL CLEARED");

                break;


            case "/about":
            case "about":

                log("[SYS] PI220 CORPORATE TACTICAL — BUILD 003");
                log("[SYS] OPERATIVE ENVIRONMENT");
                log("[SYS] BROWSER-BASED SYSTEM INTERFACE");

                break;


            case "/media":
            case "media":
                if (window.PI220WindowManager) window.PI220WindowManager.open("media");
                break;

            case "/projects":
            case "projects":
                if (window.PI220WindowManager) window.PI220WindowManager.open("projects");
                break;

            case "/corporation":
            case "corporation":
                if (window.PI220WindowManager) window.PI220WindowManager.open("corporation");
                break;

            case "/system":
            case "system":
                if (window.PI220WindowManager) window.PI220WindowManager.open("system");
                break;


            default:

                log("[ERROR] UNKNOWN COMMAND. TYPE /HELP");

        }

    });


    /* ================================================
       START MENU
       ================================================ */

    startButton.addEventListener("click", function (event) {

        event.stopPropagation();

        startMenu.classList.toggle("hidden");
    });


    document.addEventListener("click", function (event) {

        if (
            !startMenu.contains(event.target) &&
            !startButton.contains(event.target)
        ) {
            startMenu.classList.add("hidden");
        }

    });


    startMenu.querySelectorAll("button").forEach(function (button) {

        button.addEventListener("click", function () {

            const command = button.dataset.command;

            startMenu.classList.add("hidden");

            const applicationCommands = {
                "/media": "media",
                "/projects": "projects",
                "/corporation": "corporation",
                "/help": "help",
                "/system": "system"
            };

            if (applicationCommands[command] && window.PI220WindowManager) {
                window.PI220WindowManager.open(applicationCommands[command]);
                return;
            }

            commandInput.value = command;

            if (typeof form.requestSubmit === "function") {
                form.requestSubmit();
            } else {
                form.dispatchEvent(
                    new Event("submit", {
                        bubbles: true,
                        cancelable: true
                    })
                );
            }

        });

    });


    /* ================================================
       LIVE SYSTEM CLOCK
       ================================================ */

    function updateSystemClock() {

        const now = new Date();

        clockElement.textContent = now.toLocaleTimeString(
            undefined,
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }
        );

        dateElement.textContent = now.toLocaleDateString(
            undefined,
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

    }


    updateSystemClock();

    setInterval(updateSystemClock, 1000);


    /* ================================================
       LANGUAGE SELECTOR
       ================================================ */

    const languages = ["EN", "ES", "DE", "FR"];

    let currentLanguage = 0;


    languageToggle.addEventListener("click", function () {

        currentLanguage = (currentLanguage + 1) % languages.length;

        const language = languages[currentLanguage];

        languageToggle.textContent = language;

        document.documentElement.lang = language.toLowerCase();

        languageToggle.setAttribute(
            "aria-label",
            "Current language: " + language
        );

        languageToggle.title = "Current language: " + language;

        log("[SYS] LANGUAGE SELECTED: " + language);

    });


    /* ================================================
       GLOBAL PI220 AUDIO CONTROL
       ================================================ */

    let systemMuted = false;


    function applyAudioState() {

        const mediaElements = document.querySelectorAll(
            "audio, video"
        );

        mediaElements.forEach(function (media) {
            media.muted = systemMuted;
        });


        soundIcon.classList.toggle(
            "is-muted",
            systemMuted
        );


        soundToggle.setAttribute(
            "aria-pressed",
            systemMuted ? "true" : "false"
        );


        soundToggle.setAttribute(
            "aria-label",
            systemMuted ? "Unmute sound" : "Mute sound"
        );


        soundToggle.title = systemMuted
            ? "Unmute sound"
            : "Mute sound";

    }


    soundToggle.addEventListener("click", function () {

        systemMuted = !systemMuted;

        applyAudioState();

        log(
            systemMuted
                ? "[SYS] AUDIO MUTED"
                : "[SYS] AUDIO RESTORED"
        );

    });


    /* Apply current state to media added in the future */

    const audioObserver = new MutationObserver(function () {
        applyAudioState();
    });


    audioObserver.observe(document.body, {
        childList: true,
        subtree: true
    });


    /* Public audio interface for future PI220 modules */

    window.PI220Audio = {

        get muted() {
            return systemMuted;
        },

        mute: function () {
            systemMuted = true;
            applyAudioState();
        },

        unmute: function () {
            systemMuted = false;
            applyAudioState();
        },

        toggle: function () {
            systemMuted = !systemMuted;
            applyAudioState();
        }

    };


    /* ================================================
       SYSTEM STARTUP
       ================================================ */

    setTerminalHeight(defaultHeight);

    applyAudioState();

    log("[SYS] PI220 OPERATIVE INTERFACE INITIALIZED");
    log("[SYS] CORPORATE TACTICAL VISUAL FOUNDATION READY");
    log("[SYS] LANGUAGE CONTROL READY");
    log("[SYS] AUDIO CONTROL READY");
    log("[SYS] COMMAND CONSOLE READY");


    /* ================================================
       PI220 REVISION 007 — WELCOME & DEVICE INTELLIGENCE
       EDIT THE WELCOME LINES BELOW TO PERSONALISE PI220.
       Diagnostics are read locally and printed only in
       this browser session. No data is transmitted.
       ================================================ */

    const PI220_WELCOME_LINES = [
        "[SYS] WELCOME TO PARALLEL INDUSTRIES 220",
        "[SYS] BY PROF. DSC JESSE JESSEN & PROF. DR. SENTIENT",
        "[SYS] INDEPENDENT RESEARCH / TECHNOLOGY / CREATIVE DEVELOPMENT",
        "[SYS] PLEASE FEEL FREE TO CONTACT US.",
        "[SYS] PI220 OPERATIVE ENVIRONMENT READY"
    ];

    function getPI220BrowserName() {
        const ua = navigator.userAgent || "";
        if (ua.indexOf("Edg/") !== -1) return "MICROSOFT EDGE";
        if (ua.indexOf("Chrome/") !== -1) return "GOOGLE CHROME";
        if (ua.indexOf("Firefox/") !== -1) return "MOZILLA FIREFOX";
        if (ua.indexOf("Safari/") !== -1) return "APPLE SAFARI";
        return "UNIDENTIFIED / BROWSER UA";
    }

    function getPI220Platform() {
        const ua = navigator.userAgent || "";
        if (/Windows NT 10\.0/i.test(ua)) return "WINDOWS 10/11 (BROWSER REPORT)";
        if (/Windows NT 6\.1/i.test(ua)) return "WINDOWS 7 (BROWSER REPORT)";
        if (/Windows NT 6\.2/i.test(ua)) return "WINDOWS 8 (BROWSER REPORT)";
        if (/Windows NT 6\.3/i.test(ua)) return "WINDOWS 8.1 (BROWSER REPORT)";
        if (/Mac OS X/i.test(ua)) return "MAC OS (BROWSER REPORT)";
        if (/Android/i.test(ua)) return "ANDROID (BROWSER REPORT)";
        if (/iPhone|iPad|iPod/i.test(ua)) return "IOS (BROWSER REPORT)";
        if (/Linux/i.test(ua)) return "LINUX (BROWSER REPORT)";
        return navigator.platform || "NOT REPORTED";
    }

    function printPI220DeviceIntelligence() {
        const screenWidth = window.screen && window.screen.width ? window.screen.width : "N/A";
        const screenHeight = window.screen && window.screen.height ? window.screen.height : "N/A";
        const viewportWidth = document.documentElement.clientWidth || window.innerWidth || "N/A";
        const viewportHeight = document.documentElement.clientHeight || window.innerHeight || "N/A";
        const language = navigator.language || "NOT REPORTED";
        const cores = navigator.hardwareConcurrency || "NOT EXPOSED";
        const memory = navigator.deviceMemory ? navigator.deviceMemory + " GB (APPROXIMATE)" : "NOT EXPOSED";
        let timezone = "NOT REPORTED";

        try {
            timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || timezone;
        } catch (error) {}

        log("[SYS] DEVICE INTELLIGENCE / LOCAL SESSION");
        log("[SYS] PLATFORM: " + getPI220Platform());
        log("[SYS] BROWSER: " + getPI220BrowserName());
        log("[SYS] USER AGENT VERSION: " + (navigator.userAgent.match(/(?:Chrome|Firefox|Edg|Version)\/([0-9.]+)/) || [null, "NOT REPORTED"])[1]);
        log("[SYS] DISPLAY: " + screenWidth + " x " + screenHeight);
        log("[SYS] VIEWPORT: " + viewportWidth + " x " + viewportHeight);
        log("[SYS] LANGUAGE: " + language);
        log("[SYS] TIME ZONE: " + timezone);
        log("[SYS] LOGICAL CPU CORES: " + cores);
        log("[SYS] DEVICE MEMORY: " + memory);
        log("[SYS] NETWORK STATUS: " + (navigator.onLine ? "ONLINE" : "OFFLINE"));
        log("[SYS] PRIVACY: LOCAL BROWSER READOUT / NOT TRANSMITTED");
    }

    function printPI220Welcome() {
        PI220_WELCOME_LINES.forEach(function (line) {
            log(line);

            

            
        });
    }

    /* ================================================
       PI220 REVISION 006 — QUANTUM CONNECTION BOOT
       Short staged connection, then workspace handoff.
       ================================================ */

    function beginPI220Connection() {
        const boot = document.getElementById("pi220Boot");
        const shell = document.getElementById("pi220SystemShell");
        const phase = document.getElementById("pi220BootPhase");
        const detail = document.getElementById("pi220BootDetail");
        const progress = document.getElementById("pi220BootProgress");
        const skip = document.getElementById("pi220BootSkip");

        if (!boot || !shell) {
            revealPI220Workspace();
            return;
        }

        let completed = false;
        let phaseTimer = null;
        let handoffTimer = null;

        const phases = [
            {
                title: "ESTABLISHING QUANTUM LINK",
                detail: "SECURE CHANNEL / INITIALISING",
                progress: "34%"
            },
            {
                title: "VERIFYING OPERATIVE ENVIRONMENT",
                detail: "INTERFACE / MODULES / SESSION",
                progress: "72%"
            },
            {
                title: "SYNCHRONISING WORKSPACE",
                detail: "PI220 ENVIRONMENT / READY",
                progress: "100%"
            }
        ];

        function revealPI220Workspace() {
            if (completed) return;
            completed = true;
            if (phaseTimer) window.clearInterval(phaseTimer);
            if (handoffTimer) window.clearTimeout(handoffTimer);

            progress.style.width = "100%";
            phase.textContent = "CONNECTION ESTABLISHED";
            detail.textContent = "WELCOME TO PI220";

            shell.classList.add("pi220-system-ready");
            boot.classList.add("is-leaving");

            window.setTimeout(function () {
                if (boot.parentNode) boot.parentNode.removeChild(boot);

                log("[SYS] QUANTUM CONNECTION ESTABLISHED");
                printPI220DeviceIntelligence();

                if (window.PI220WindowManager) {
                    window.PI220WindowManager.open("media");
                    log("[SYS] MEDIA EXPLORER AUTOMATICALLY ACTIVATED");
                } else {
                    log("[SYS] CONNECTION ESTABLISHED — WINDOW MANAGER UNAVAILABLE");
                }

                // FINAL BOOT MESSAGE: welcome lines are printed last.
                printPI220Welcome();
            }, 560);
        }

        let currentPhase = 0;

        function advancePhase() {
            if (completed) return;
            const item = phases[currentPhase];
            phase.textContent = item.title;
            detail.textContent = item.detail;
            progress.style.width = item.progress;
            currentPhase += 1;

            if (currentPhase >= phases.length) {
                phaseTimer = null;
                handoffTimer = window.setTimeout(revealPI220Workspace, 420);
            }
        }

        skip.addEventListener("click", revealPI220Workspace);

        if (window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            revealPI220Workspace();
            return;
        }

        advancePhase();
        phaseTimer = window.setInterval(advancePhase, 780);
    }

    beginPI220Connection();

});
