
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
       PI220 OFFICIAL SOUND EXPERIENCE
       User-initiated playback only; never autoplay.
       ================================================ */

    const soundPanel = document.getElementById("pi220SoundPanel");
    const themeAudio = document.getElementById("pi220ThemeAudio");
    const playPauseButton = document.getElementById("pi220PlayPause");
    const stopAudioButton = document.getElementById("pi220Stop");
    const volumeSlider = document.getElementById("pi220Volume");
    const volumeValue = document.getElementById("pi220VolumeValue");
    const audioStatus = document.getElementById("pi220AudioStatus");
    const trackSelect = document.getElementById("pi220TrackSelect");
    const trackSubtitle = document.getElementById("pi220SoundTrackSubtitle");

    let systemMuted = true;
    let rememberedVolume = 0.35;

    try {
        const storedVolume = localStorage.getItem("pi220SoundVolume");
        if (storedVolume !== null) {
            const parsedVolume = Number(storedVolume);
            if (Number.isFinite(parsedVolume)) {
                rememberedVolume = Math.max(0, Math.min(1, parsedVolume));
            }
        }
    } catch (error) {
        /* Storage may be unavailable; sound controls remain functional. */
    }

    themeAudio.volume = rememberedVolume;
    volumeSlider.value = String(Math.round(rememberedVolume * 100));
    volumeValue.textContent = volumeSlider.value + "%";

    function updateSoundInterface() {
        const playing = !themeAudio.paused && !themeAudio.ended;
        soundIcon.classList.toggle("is-muted", systemMuted || !playing);
        soundToggle.setAttribute("aria-pressed", systemMuted ? "true" : "false");
        soundToggle.setAttribute("aria-label", soundPanel.hidden
            ? "Open sound controls" : "Close sound controls");
        soundToggle.title = "PI220 sound controls";

        playPauseButton.textContent = playing ? "PAUSE THEME" : "PLAY THEME";
        audioStatus.textContent = systemMuted
            ? "SOUND MUTED"
            : (playing ? "THEME PLAYING" : "SOUND OFF · READY");
    }

    function applyAudioState() {
        document.querySelectorAll("audio, video").forEach(function (media) {
            media.muted = systemMuted;
        });
        updateSoundInterface();
    }

    soundToggle.addEventListener("click", function () {
        soundPanel.hidden = !soundPanel.hidden;
        updateSoundInterface();
    });

    trackSelect.addEventListener("change", function () {
        const wasPlaying = !themeAudio.paused;
        themeAudio.pause();
        themeAudio.currentTime = 0;
        systemMuted = true;
        themeAudio.src = trackSelect.value;
        themeAudio.load();
        const isDeveloped = trackSelect.value.indexOf("Developed_Edition") !== -1;
        trackSubtitle.textContent = isDeveloped
            ? "TRACK 02 · DEVELOPED EDITION"
            : "TRACK 01 · OFFICIAL ORIGINAL THEME · EXTENDED EDITION";
        audioStatus.textContent = "TRACK SELECTED · READY TO PLAY";
        log(isDeveloped
            ? "[SYS] PI220 DEVELOPED EDITION SELECTED"
            : "[SYS] PI220 ORIGINAL EXTENDED EDITION SELECTED");
        applyAudioState();
        if (wasPlaying) {
            audioStatus.textContent = "TRACK CHANGED · PRESS PLAY TO CONTINUE";
        }
    });

    playPauseButton.addEventListener("click", function () {
        if (!themeAudio.paused) {
            themeAudio.pause();
            systemMuted = true;
            log("[SYS] PI220 THEME PAUSED");
            applyAudioState();
            return;
        }

        systemMuted = false;
        themeAudio.muted = false;
        const playRequest = themeAudio.play();
        if (playRequest && typeof playRequest.then === "function") {
            playRequest.then(function () {
                log("[SYS] PI220 OFFICIAL THEME PLAYING");
                applyAudioState();
            }).catch(function () {
                systemMuted = true;
                audioStatus.textContent = "PLAYBACK UNAVAILABLE — CHECK AUDIO FILE";
                applyAudioState();
            });
        } else {
            applyAudioState();
        }
    });

    stopAudioButton.addEventListener("click", function () {
        themeAudio.pause();
        themeAudio.currentTime = 0;
        systemMuted = true;
        log("[SYS] PI220 THEME STOPPED");
        applyAudioState();
    });

    volumeSlider.addEventListener("input", function () {
        rememberedVolume = Number(volumeSlider.value) / 100;
        themeAudio.volume = rememberedVolume;
        volumeValue.textContent = volumeSlider.value + "%";
        try {
            localStorage.setItem("pi220SoundVolume", String(rememberedVolume));
        } catch (error) {
            /* Continue without persistence if storage is blocked. */
        }
    });

    themeAudio.addEventListener("play", updateSoundInterface);
    themeAudio.addEventListener("pause", updateSoundInterface);
    themeAudio.addEventListener("ended", function () {

    const isOriginal = trackSelect.value.indexOf("Extended_Edition") !== -1;

    if (isOriginal) {

        // Automatically advance from Track 01 to Track 02.
        const developedTrack = "media/PI220_Beyond_the_Horizon_Developed_Edition_v1.mp3";

        trackSelect.value = developedTrack;
        themeAudio.src = developedTrack;
        themeAudio.load();

        trackSubtitle.textContent = "TRACK 02 · DEVELOPED EDITION";

        // Keep playback enabled for the automatic transition.
        systemMuted = false;
        themeAudio.muted = false;

        log("[SYS] PI220 ORIGINAL EXTENDED EDITION COMPLETED");
        log("[SYS] AUTOMATIC TRANSITION TO DEVELOPED EDITION");

        themeAudio.play().then(function () {
            log("[SYS] PI220 DEVELOPED EDITION PLAYING");
            applyAudioState();
        }).catch(function () {
            systemMuted = true;
            audioStatus.textContent = "PLAYBACK UNAVAILABLE — CHECK AUDIO FILE";
            applyAudioState();
        });

    } else {

        // Track 02 has finished: stop the sequence.
        systemMuted = true;
        log("[SYS] PI220 TWO-TRACK SOUND EXPERIENCE COMPLETED");
        applyAudioState();

    }

});

    /* Existing and future media obey the global mute state. */
    const audioObserver = new MutationObserver(function () {
        applyAudioState();
    });
    audioObserver.observe(document.body, { childList: true, subtree: true });

    /* Public audio interface retained for future PI220 modules. */
    window.PI220Audio = {
        get muted() { return systemMuted; },
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
        },
        playTheme: function () {
            systemMuted = false;
            themeAudio.muted = false;
            return themeAudio.play();
        },
        pauseTheme: function () {
            themeAudio.pause();
            systemMuted = true;
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
