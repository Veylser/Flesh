// ALL SCRIPTS

var stageSpeechAudio;
var altarAudio;
let mainAudio = document.getElementById('background-audio');
let savedMainAudioTime = 0;
const introPage = document.getElementById('intro-page');
const introHero = document.getElementById('intro-hero');
const welcomePage = document.getElementById('welcome-page');
const explorePage = document.getElementById('explore-page');
const exploreBg = document.getElementById('explore-bg');
const locationPage = document.getElementById('location-page');
const blogPage = document.getElementById('blog-page');
const persistentUI = document.getElementById('persistent-ui');
const floatingTrigger = document.getElementById('floating-trigger');
function updateFloatingTriggerVisibility() {
        if ((explorePage.style.display === 'block' || locationPage.style.display === 'block') && window.innerWidth <= 988) {
            floatingTrigger.style.display = 'flex';
        } else {
            floatingTrigger.style.display = 'none';
        }
    }
window.addEventListener('resize', updateFloatingTriggerVisibility);

window.addEventListener('load', () => {
        updateFloatingTriggerVisibility();
        setTimeout(() => { introHero.style.opacity = 1; }, 50);
        setTimeout(() => {
            introPage.style.transition = 'opacity 2s ease';
            introPage.style.opacity = 0;
            setTimeout(() => {
                introPage.style.display = 'none';
                welcomePage.style.display = 'flex';
                welcomePage.style.transition = 'opacity 2s ease';
                setTimeout(() => {
                    welcomePage.style.opacity = 1;
                    welcomePage.style.pointerEvents = 'auto';
                }, 50);
            }, 2000);
        }, 3000);
        setTimeout(() => {
            welcomePage.style.transition = 'opacity 4s ease';
            welcomePage.style.opacity = 0;
            welcomePage.style.pointerEvents = 'none';
            exploreBg.style.transition = 'opacity 4s ease';
            exploreBg.style.opacity = 1;
            setTimeout(() => {
                welcomePage.style.display = 'none';
                explorePage.style.display = 'block';
                persistentUI.style.display = 'block';
                updateFloatingTriggerVisibility();
            }, 4000);
        }, 8000);
    });

function showLocation(locationId) {
        explorePage.style.display = 'none';
        exploreBg.style.display = 'none';
        locationPage.style.display = 'block';
        document.querySelectorAll('.location-content').forEach(el => el.classList.remove('active'));
        document.getElementById(locationId).classList.add('active');
        updateFloatingTriggerVisibility();

        if (stageSpeechAudio && !stageSpeechAudio.paused) {
            stageSpeechAudio.pause();
            stageSpeechAudio.currentTime = 0;
        }
        if (altarAudio) {
            altarAudio.pause();
            altarAudio.currentTime = 0;
            altarAudio = null;
        }
        if (locationId === 'location-shrine') {
            startShrineCinematic();
        }
        if (locationId === 'location-stage') {
            startStageCinematic();
        }
        if (locationId === 'location-the-altar') {
            startAltarCinematic();
        }
        if (locationId === 'location-inquiries') {
            startQuestionnaire();
        }
    }
function switchLocation(locationId) {
        showLocation(locationId);
    }
function goBackToExplore() {
        locationPage.style.display = 'none';
        explorePage.style.display = 'block';
        exploreBg.style.display = 'block';
        updateFloatingTriggerVisibility();

        let floatingTrigger = document.getElementById("floating-trigger");
        floatingTrigger.style.pointerEvents = "auto";
        floatingTrigger.style.opacity = "1";

        if (stageSpeechAudio && !stageSpeechAudio.paused) {
            stageSpeechAudio.pause();
            stageSpeechAudio.currentTime = 0;
        }
        if (altarAudio) {
            altarAudio.pause();
            altarAudio.currentTime = 0;
            altarAudio = null;
        }
        if (mainAudio.paused) {
            mainAudio.play();
            let fadeInDuration = 1000;
            let fadeStep = 1.0 / (fadeInDuration / 50);
            let fadeInterval = setInterval(() => {
                if (mainAudio.volume < 1.0) {
                    mainAudio.volume = Math.min(1.0, mainAudio.volume + fadeStep);
                } else {
                    clearInterval(fadeInterval);
                }
            }, 50);
        }
    }


// BLOG
function showBlogPage() {
        if (stageSpeechAudio && !stageSpeechAudio.paused) {
            stageSpeechAudio.pause();
            stageSpeechAudio.currentTime = 0;
        }
        explorePage.style.display = 'none';
        locationPage.style.display = 'none';
        persistentUI.style.display = 'none';
        floatingTrigger.style.display = 'none';
        blogPage.style.display = 'block';
        blogPage.style.opacity = 0;

        setTimeout(() => {
            blogPage.style.transition = 'opacity 1s ease';
            blogPage.style.opacity = 1;
        }, 50);
    }

// BLOG TO EXP
function goBackFromBlog() {
        blogPage.style.transition = 'opacity 0.5s ease';
        blogPage.style.opacity = 0;
        setTimeout(() => {
            blogPage.style.display = 'none';
            explorePage.style.display = 'block';
            exploreBg.style.display = 'block';
            persistentUI.style.display = 'block';
            updateFloatingTriggerVisibility();
        }, 500);
    }

// AUDIOS
document.addEventListener("DOMContentLoaded", function () {
        let audio = document.getElementById("background-audio");
        let playAudio = () => {
            audio.play().catch(error => { console.log("Autoplay prevented. Waiting for user interaction."); });
            document.removeEventListener("click", playAudio);
        };
        document.addEventListener("click", playAudio);
    });

// BUBBLES EXPLORE
document.addEventListener("DOMContentLoaded", () => {
        const bubbleContainer = document.querySelector(".floating-bubbles");
        function createBubble() {
            const bubble = document.createElement("div");
            bubble.classList.add("bubble");
            const size = Math.random() * 50 + 10;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}vw`;
            const duration = Math.random() * 6 + 4;
            bubble.style.animationDuration = `${duration}s`;
            bubbleContainer.appendChild(bubble);
            setTimeout(() => { bubble.remove(); }, duration * 1000);
        }
        setInterval(createBubble, 500);
    });

function playClickAudio() {
        const clickAudio = document.getElementById('click-audio');
        clickAudio.volume = 1.0;
        clickAudio.currentTime = 0;
        clickAudio.play();
    }

// FLOATING MENU
function toggleFloatingMenu() {
        const floatingMenu = document.getElementById("floating-menu");
        const blurOverlay = document.getElementById("blur-overlay");
        if (floatingMenu.classList.contains("hidden")) {
            floatingMenu.classList.remove("hidden");
            blurOverlay.classList.remove("hidden");
        } else {
            floatingMenu.classList.add("hidden");
            blurOverlay.classList.add("hidden");
        }
    }

// BLOG MODALS
function openBlogModal(num) {
        playClickAudio();
        document.getElementById(`blog-modal-${num}`).classList.add('active');
    }
function closeBlogModal(num) {
        document.getElementById(`blog-modal-${num}`).classList.remove('active');
    }

    // BUBBLES BLOG
document.addEventListener("DOMContentLoaded", function () {
        const blogPage = document.getElementById("blog-page");
        const blogBubbleContainer = document.createElement("div");
        blogBubbleContainer.classList.add("blog-floating-bubbles");
        blogPage.appendChild(blogBubbleContainer);
        function createBlogBubble() {
            const bubble = document.createElement("div");
            bubble.classList.add("bubble");
            let size = Math.random() * 40 + 10;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}vw`;
            bubble.style.top = `-10vh`;
            bubble.style.animationDuration = `${Math.random() * 8 + 4}s`;
            bubble.style.animationDelay = `${Math.random() * 3}s`;
            blogBubbleContainer.appendChild(bubble);
            setTimeout(() => { bubble.remove(); }, 12000);
        }
        for (let i = 0; i < 25; i++) { createBlogBubble(); }
        setInterval(createBlogBubble, 700);
    });

    // BUBBLES SHRINE
document.addEventListener("DOMContentLoaded", function () {
        const shrineBubbles = document.querySelector("#location-shrine .shrine-bubbles");
        if(shrineBubbles) {
            function createShrineBubble() {
                const bubble = document.createElement("div");
                bubble.classList.add("bubble");
                const size = Math.random() * 30 + 10;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                bubble.style.left = `${Math.random() * 100}vw`;
                const duration = Math.random() * 5 + 3;
                bubble.style.animationDuration = `${duration}s`;
                shrineBubbles.appendChild(bubble);
                setTimeout(() => { bubble.remove(); }, duration * 1000);
            }
            setInterval(createShrineBubble, 500);
        }
    });

    // MOUSE
document.addEventListener("DOMContentLoaded", function () {
        const canvas = document.getElementById("mouseCanvas");
        const ctx = canvas.getContext("2d");
        let particles = [];
        function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        document.addEventListener("mousemove", function (e) {
            for (let i = 0; i < 3; i++) {
                particles.push({
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 4 + 2,
                               opacity: 1,
                               speedX: (Math.random() - 0.5) * 1.5,
                               speedY: (Math.random() - 0.5) * 1.5
                });
            }
        });
function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                ctx.beginPath();
                ctx.fillStyle = `rgba(200, 180, 130, ${p.opacity})`;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                p.x += p.speedX;
                p.y += p.speedY;
                p.opacity -= 0.02;
                p.size *= 0.98;
                if (p.opacity <= 0.05) { particles.splice(i, 1); }
            });
            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    });

   // ACCESS
function showAccessPage() {
    if (stageSpeechAudio && !stageSpeechAudio.paused) {
        stageSpeechAudio.pause();
        stageSpeechAudio.currentTime = 0;
    }
    if (localStorage.getItem("accessGranted") === "true") {
        window.open("Babel.pdf", "_blank");
        return; 
    }

    explorePage.style.display = 'none';
    locationPage.style.display = 'none';
    blogPage.style.display = 'none';
    persistentUI.style.display = 'none';
    floatingTrigger.style.display = 'none';

    const accessPage = document.getElementById('access-page');
    accessPage.style.display = 'block';

    document.getElementById('access-stage1').style.opacity = 0;
    document.getElementById('access-stage2').style.opacity = 0;
    document.getElementById('access-stage3').style.opacity = 0;
    document.getElementById('access-stage4').style.opacity = 0;

    setTimeout(() => { document.getElementById('access-stage1').style.opacity = 1; }, 500);
    setTimeout(() => {
        document.getElementById('access-stage1').style.opacity = 0;
        setTimeout(() => { document.getElementById('access-stage2').style.opacity = 1; }, 2000);
    }, 3500);
    setTimeout(() => {
        document.getElementById('access-stage2').style.opacity = 0;
        setTimeout(() => { document.getElementById('access-stage3').style.opacity = 1; }, 2000);
    }, 7500);
}
document.getElementById('submit-agreement').addEventListener('click', function() {
    document.getElementById('access-stage3').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('access-stage4').style.opacity = 1;
        localStorage.setItem("accessGranted", "true");
        window.open("Babel.pdf", "_blank");

        setTimeout(() => {
            document.getElementById('access-page').style.display = 'none';
            explorePage.style.display = 'block';
            exploreBg.style.display = 'block';
            persistentUI.style.display = 'block';
            updateFloatingTriggerVisibility();
        }, 4000);
    }, 2000);
});

function checkAgreement() {
        const c1 = document.getElementById('check1').checked;
        const c2 = document.getElementById('check2').checked;
        const c3 = document.getElementById('check3').checked;
        document.getElementById('submit-agreement').disabled = !(c1 && c2 && c3);
    }
    document.getElementById('check1').addEventListener('change', checkAgreement);
    document.getElementById('check2').addEventListener('change', checkAgreement);
    document.getElementById('check3').addEventListener('change', checkAgreement);
    document.getElementById('submit-agreement').addEventListener('click', function() {
        document.getElementById('access-stage3').style.opacity = 0;
        setTimeout(() => {
            document.getElementById('access-stage4').style.opacity = 1;
            document.cookie = "accessGranted=true; path=/; max-age=31536000";
            window.open("Babel.pdf", "_blank");
        }, 2000);
        setTimeout(() => {
            document.getElementById('access-page').style.display = 'none';
            explorePage.style.display = 'block';
            exploreBg.style.display = 'block';
            persistentUI.style.display = 'block';
            updateFloatingTriggerVisibility();
        }, 4000);
    });

    // SHRINE CINEMATIC
function startShrineCinematic() {
        const cinematic = document.querySelector('#location-shrine .shrine-cinematic');
        const shrineDisplay = document.querySelector('#location-shrine .shrine-display');
        shrineDisplay.style.opacity = 0;
        cinematic.style.opacity = 1;
        cinematic.style.pointerEvents = 'auto';
        let bellAudio = new Audio('assets/water.mp3');
        bellAudio.play();
        setTimeout(() => {
            cinematic.style.opacity = 0;
            cinematic.style.pointerEvents = 'none';
            setTimeout(() => {
                shrineDisplay.style.opacity = 1;
                shrineDisplay.style.pointerEvents = 'auto';
            }, 1000);
        }, 3000);
    }

function triggerOffering(offeringName) {
        const texts = {
            stone: "The shrine fell when the first prayers went unanswered, perhaps it was never whole.",
            parchment: "A record was promised to be always kept, but the fall was never accounted.",
            mirror: "Once, those who worshiped were reflected, but now it is all alone.",
            coin: "A final offering was offered to the gods, but they had already turned away."
        };
        const overlay = document.getElementById('offering-cinematic');
        const video = document.getElementById('offering-audio');
        const textDiv = document.getElementById('offering-text');
        if(overlay.classList.contains('show')) return;
        textDiv.innerText = texts[offeringName] || "";
        overlay.classList.add('show');
        video.currentTime = 0;
        video.play();
        video.onended = function() { overlay.classList.remove('show'); };
        setTimeout(() => { overlay.classList.remove('show'); }, 4000);
    }

    // STAGE CINEMATIC
function startStageCinematic() {
        const overlayText = document.getElementById('stage-cinematic-overlay');
        const tvContainer = document.getElementById('tv-container');
        const tvSubtitle = document.getElementById('tv-subtitle');
        tvContainer.style.opacity = 0;
        tvContainer.classList.add('hidden');
        tvSubtitle.style.opacity = 0;
        tvSubtitle.textContent = "[...]";
        tvContainer.classList.remove('flicker');
        savedMainAudioTime = mainAudio.currentTime;
        let fadeDuration = 1000;
        let initialVolume = mainAudio.volume;
        let fadeStep = initialVolume / (fadeDuration / 50);
        let fadeInterval = setInterval(() => {
            if (mainAudio.volume > fadeStep) {
                mainAudio.volume -= fadeStep;
            } else {
                mainAudio.volume = 0;
                mainAudio.pause();
                clearInterval(fadeInterval);
            }
        }, 50);
        overlayText.style.opacity = 1;
        setTimeout(() => {
            overlayText.style.opacity = 0;
        }, 3000);
        setTimeout(() => {
            tvContainer.classList.remove('hidden');
            tvContainer.style.opacity = 1;
            tvContainer.classList.add('flicker');
            if (!stageSpeechAudio) {
                stageSpeechAudio = new Audio('assets/speech.mp3');
                stageSpeechAudio.loop = false;
            }
            if (stageSpeechAudio.paused) {
                stageSpeechAudio.currentTime = 0;
                stageSpeechAudio.play();
                setTimeout(() => {
                    tvSubtitle.textContent = "[Wilheim speaking...]";
                    tvSubtitle.style.opacity = 1;
                }, 500);
                stageSpeechAudio.onended = function () {
                    tvContainer.classList.remove('flicker');
                    tvSubtitle.textContent = "[...]";
                    tvSubtitle.style.opacity = 1;
                };
            }
        }, 4000);
    }

function replaySpeech() {
        if (stageSpeechAudio && stageSpeechAudio.paused) {
            stageSpeechAudio.currentTime = 0;
            stageSpeechAudio.play();
            const tvContainer = document.getElementById('tv-container');
            const tvSubtitle = document.getElementById('tv-subtitle');
            tvContainer.classList.add('flicker');
            tvSubtitle.textContent = "[Wilheim speaking...]";
            tvSubtitle.style.opacity = 1;
            stageSpeechAudio.onended = function () {
                tvContainer.classList.remove('flicker');
                tvSubtitle.textContent = "[...]";
                tvSubtitle.style.opacity = 1;
            };
        }
    }
    //  ALTAR CINEMATIC
function startAltarCinematic() {
        if (altarAudio && !altarAudio.paused) return;
        altarAudio = new Audio('assets/water.mp3');
        altarAudio.loop = false;
        altarAudio.volume = 0.7;
        altarAudio.play();
    }

    let questions = [
"When did you exist?",
"Are you alive?",
"Will you die soon?"
    ];
    let currentQuestion = 0;
    let answered = false;
    let inquiriesLink = document.querySelector("li[onclick*='location-inquiries']");

    function stopSpeechAudio() {
        if (stageSpeechAudio && !stageSpeechAudio.paused) {
            stageSpeechAudio.pause();
            stageSpeechAudio.currentTime = 0;
        }
    }

    function lockSidebar() {
        document.querySelectorAll("#persistent-ui .right-nav ul li").forEach(li => {
            if (!li.innerText.includes("Inquiries")) {
                li.style.pointerEvents = "none";
                li.style.opacity = "0.5";
            }
        });
    }

    function unlockSidebar() {
        document.querySelectorAll("#persistent-ui .right-nav ul li").forEach(li => {
            if (!li.getAttribute("onclick").includes("location-inquiries")) {
                li.style.pointerEvents = "auto";
                li.style.opacity = "1";
            } else {
                disableInquiries();
            }
        });
    }

    function disableInquiries() {
        let inquiriesLink = document.querySelector("li[onclick*='location-inquiries']");
        if (inquiriesLink) {
            inquiriesLink.style.pointerEvents = "none";
            inquiriesLink.style.opacity = "0.5";
        }
    }

    window.onload = function() {
        if (localStorage.getItem("block65Disabled") === "true") {
            disableInquiries();
        }
    };

    document.addEventListener("visibilitychange", function() {
        if (!answered && document.hidden) {
            document.getElementById("warning-text").classList.remove("hidden");
            document.getElementById("warning-text").classList.add("fade");
        }
    });

    function startQuestionnaire() {
        stopSpeechAudio();
        lockSidebar();
        document.querySelector(".questionnaire-container").style.opacity = "1";

        let floatingTrigger = document.getElementById("floating-trigger");
        floatingTrigger.style.pointerEvents = "none";
        floatingTrigger.style.opacity = "0.5";

        let floatingInquiries = document.getElementById("floating-inquiries");
        floatingInquiries.style.pointerEvents = "none";
        floatingInquiries.style.opacity = "0.5";

        let questionText = document.getElementById("question-text");
        questionText.textContent = questions[currentQuestion];
        questionText.style.opacity = "1";
        questionText.classList.add("fade");

        setTimeout(() => {
            if (currentQuestion === 0) {
                let inputField = document.getElementById("question-input");
                inputField.style.display = "block";
                inputField.focus();
                inputField.addEventListener("keypress", function(event) {
                    if (event.key === "Enter") {
                        answerQuestion(inputField.value);
                    }
                });
            } else {
                let buttons = document.getElementById("question-buttons");
                buttons.style.display = "flex";
                buttons.style.opacity = "1";
            }
        }, 500);
    }



    function answerQuestion(answer) {
        let questionText = document.getElementById("question-text");
        let inputField = document.getElementById("question-input");
        let buttons = document.getElementById("question-buttons");
        questionText.style.opacity = "0";
        inputField.style.display = "none";
        buttons.style.display = "none";
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                startQuestionnaire();
            } else {
                finishQuestionnaire();
            }
        }, 100);
    }

    function finishQuestionnaire() {
        answered = true;
        let questionText = document.getElementById("question-text");
        questionText.textContent = "You may leave now.";
        questionText.style.opacity = "1";
        localStorage.setItem("block65Disabled", "true");
        disableInquiries();
        setTimeout(() => {
            goBackToExplore();
            setTimeout(unlockSidebar, 500);
        }, 3000);
    }
// CONTEXT MENU 
const contextMenu = document.getElementById("context-menu");
document.addEventListener("contextmenu", function(event) {
    event.preventDefault(); 
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let posX = event.clientX;
    let posY = event.clientY;
    const menuWidth = 100; 
    const menuHeight = 50; 

    if (posX + menuWidth > windowWidth) posX -= menuWidth;
    if (posY + menuHeight > windowHeight) posY -= menuHeight;
    contextMenu.style.top = `${posY}px`;
    contextMenu.style.left = `${posX}px`;
    contextMenu.classList.add("show");
});

document.addEventListener("click", function() {
    contextMenu.classList.remove("show");
});

// TORCHLIGHT
const torchOverlay = document.getElementById('torch-overlay');
    document.addEventListener('mousemove', (e) => {
        torchOverlay.style.setProperty('--mouseX', `${e.clientX}px`);
        torchOverlay.style.setProperty('--mouseY', `${e.clientY}px`);
    });
    document.addEventListener('mouseleave', () => {
        torchOverlay.style.setProperty('--mouseX', `50%`);
        torchOverlay.style.setProperty('--mouseY', `50%`);
    });
