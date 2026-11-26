

/* PI220 MEDIA EXPLORER — SINGLE IMAGE CAROUSEL
   Image library restored from the original PI220 carousel source.
   Add or remove direct ImgBB image URLs in PI220_CAROUSEL_IMAGES below.
*/
(function () {
    "use strict";

    window.PI220_CAROUSEL_IMAGES = [


      
        'https://i.ibb.co/W40gVBjh/WORLD-WAR-III-DESTROY-AND-ANNIHILATE-SPAIN.png',
        'https://raw.githubusercontent.com/profdrjamesjessen-cyber/PI220/0bca43412ef807a8e4283db359ef23f49b0d40ef/media/MASTER%20CERTIFICATE.png',
        'https://raw.githubusercontent.com/profdrjamesjessen-cyber/PI220/5b998a7327d6ebf0d56f4680a008d2bc42652c25/media/I%20CAN%20HEAR%20YOUR%20HEARTBEAT.png',
        'https://raw.githubusercontent.com/profdrjamesjessen-cyber/PI220/9bb9a6ea2c1c941990e30f1207846d374b7c1248/media/HI%20FIVE%20READY.png',
        'https://i.ibb.co/sJCTRJLd/PROF-DSC-JESSE-JESSEN.png', 
        'https://raw.githubusercontent.com/profdrjamesjessen-cyber/PI220/adc338df5cdb9b709cc4070d1dd856155a8bcade/media/YEAH.png',
        'https://i.ibb.co/N6Q15qx0/DAILY-VALUATION.png',
        'https://raw.githubusercontent.com/profdrjamesjessen-cyber/PI220/0f49942faeee92479280094011d9d6ad52626061/media/PROF%20DSC%20JESSE%20JESSEN%20AND%20PROF%20DR%20SENTIENT.png',
        'https://i.ibb.co/pvbFBdBD/INEWS.png',
        'https://raw.githubusercontent.com/profdrjamesjessen-cyber/PI220/761c6812e6fb677f26aa0bd24609d461c8df439f/media/THE%20FUTURE.png',
        'https://raw.githubusercontent.com/profdrjamesjessen-cyber/PI220/898c66e159c2a6a5d3d6a0a349fa7e44e1f7b6b8/media/PROF%20DSC%20JESSE%20JESSEN.png',
        'https://raw.githubusercontent.com/profdrjamesjessen-cyber/PI220/1f0f328b8d3e680508163c42912e69e898cbf0f6/media/PROF%20DSC%20AND%20PROF%20DR%2033.png',

    ];

    var ROTATION_INTERVAL = 10000;
    var instances = [];

    function mount(container) {
        if (!container || container.getAttribute("data-carousel-ready") === "true") return;
        container.setAttribute("data-carousel-ready", "true");

        var images = window.PI220_CAROUSEL_IMAGES || [];
        var index = 0;
        var timer = null;
        var playing = true;
        var hovered = false;

        container.innerHTML =
            '<div class="pi220-carousel">' +
                '<div class="pi220-carousel-stage">' +
                    '<div class="pi220-carousel-empty">' +
                        '<span class="pi220-carousel-kicker">PARALLEL INDUSTRIES 220 / MEDIA</span>' +
                        '<strong>MEDIA EXPLORER</strong>' +
                        '<span>IMAGE LIBRARY READY</span>' +
                        '<small>Loading the PI220 visual archive...</small>' +
                    '</div>' +
                    '<img class="pi220-carousel-image" alt="Parallel Industries 220 visual" draggable="false">' +
                    '<div class="pi220-carousel-shade"></div>' +
                    '<div class="pi220-carousel-counter"></div>' +
                    '<button class="pi220-carousel-arrow previous" type="button" aria-label="Previous image" title="Previous image">‹</button>' +
                    '<button class="pi220-carousel-arrow next" type="button" aria-label="Next image" title="Next image">›</button>' +
                '</div>' +
                '<div class="pi220-carousel-toolbar">' +
                    '<div class="pi220-carousel-caption"><span class="pi220-carousel-live"></span><span class="pi220-carousel-status">CONNECTING TO IMAGE LIBRARY</span></div>' +
                    '<div class="pi220-carousel-actions">' +
                        '<button class="pi220-carousel-play" type="button">Ⅱ PAUSE</button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        var stage = container.querySelector(".pi220-carousel-stage");
        var image = container.querySelector(".pi220-carousel-image");
        var empty = container.querySelector(".pi220-carousel-empty");
        var emptyTitle = empty.querySelector("strong");
        var emptyMessage = empty.querySelector("small");
        var counter = container.querySelector(".pi220-carousel-counter");
        var status = container.querySelector(".pi220-carousel-status");
        var playButton = container.querySelector(".pi220-carousel-play");

        function stopTimer() {
            if (timer !== null) {
                window.clearInterval(timer);
                timer = null;
            }
        }

        function startTimer() {
            stopTimer();
            if (playing && !hovered && images.length > 1) {
                timer = window.setInterval(function () {
                    show(index + 1);
                }, ROTATION_INTERVAL);
            }
        }

        function show(nextIndex) {
            if (!images.length) return;

            index = (nextIndex + images.length) % images.length;
            image.classList.remove("is-visible");

            image.onload = function () {
                empty.style.display = "none";
                image.classList.add("is-visible");
                status.textContent = "PI220 IMAGE LIBRARY / ACTIVE";
            };

            image.onerror = function () {
                image.classList.remove("is-visible");
                empty.style.display = "flex";
                emptyTitle.textContent = "IMAGE UNAVAILABLE";
                emptyMessage.textContent = "This archive link could not be loaded. Use NEXT to continue.";
                status.textContent = "IMAGE LOAD ERROR";
            };

            image.src = images[index];
            counter.textContent =
                String(index + 1).padStart(2, "0") + " / " +
                String(images.length).padStart(2, "0");

            startTimer();
        }

        if (!images.length) {
            image.style.display = "none";
            counter.style.display = "none";
            stage.querySelectorAll(".pi220-carousel-arrow").forEach(function (button) {
                button.disabled = true;
            });
            playButton.disabled = true;
            return;
        }

        stage.querySelector(".previous").addEventListener("click", function () {
            show(index - 1);
        });

        stage.querySelector(".next").addEventListener("click", function () {
            show(index + 1);
        });

        playButton.addEventListener("click", function () {
            playing = !playing;
            playButton.textContent = playing ? "Ⅱ PAUSE" : "▶ PLAY";
            startTimer();
        });

        container.addEventListener("mouseenter", function () {
            hovered = true;
            stopTimer();
        });

        container.addEventListener("mouseleave", function () {
            hovered = false;
            startTimer();
        });

        show(0);
        instances.push({
            stop: stopTimer,
            start: startTimer
        });
    }

    window.PI220Carousel = {
        mount: mount,
        rotationInterval: ROTATION_INTERVAL
    };
})();
