
/* PI220 — LEGAL DOCUMENTS
   REVISION 001
   Independent renderer for Privacy Policy and Cookie Policy.
   Does not modify main.js or the window manager.
*/

(function () {
    "use strict";

    function mountDocument(host, documentClass, content) {
        if (!host) {
            console.error("[PI220 LEGAL] Document host not found.");
            return;
        }

        host.innerHTML = "";

        var article = document.createElement("article");
        article.className = "pi220-legal-document " + documentClass;
        article.innerHTML = content;

        host.appendChild(article);
    }

    function mountPrivacy(host) {
        var content = `
            <header class="pi220-legal-header">
                <div class="pi220-legal-kicker">PARALLEL INDUSTRIES 220 / LEGAL</div>
                <h1>PRIVACY POLICY</h1>
                <p>Personal Data Protection</p>
                <div class="pi220-legal-meta">
                    <span>WEBSITE</span>
                    <a href="https://profdrjamesjessen-cyber.github.io/PI220/" target="_blank" rel="noopener noreferrer">
                        PI220 OFFICIAL WEBSITE
                    </a>
                    <span>LAST UPDATED: 18 NOVEMBER 2026</span>
                </div>
            </header>

            <section class="pi220-legal-section">
                <h2>01 / WHO IS RESPONSIBLE?</h2>
                <p>Parallel Industries 220 (PI220) operates under Prof D.Sc Jesse Jessen.</p>
                <p>For the purposes of personal data processing through this website, the responsible individual and data controller is:</p>
                <p><strong>Prof D.Sc Jesse Jessen</strong><br>
                Operating as Parallel Industries 220 (PI220)<br>
                Email: <a href="mailto:CONOCEAPROFDSC@PROTON.ME">CONOCEAPROFDSC@PROTON.ME</a><br>
                Additional contact: <a href="mailto:PI220.391.PROFDSCXYZ.2026@PROTON.ME">PI220.391.PROFDSCXYZ.2026@PROTON.ME</a><br>
                Postal address: 301 Austin, TX 78701, Estados Unidos - Vía Roma, 1, 07012 Palma, Illes Balears.</p>
                <p>PI220 is identified here as an operating organisation/project under Prof D.Sc Jesse Jessen, not as a separately incorporated legal entity.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>02 / SCOPE OF THIS POLICY</h2>
                <p>This policy explains how PI220 handles personal information when visitors access the official website.</p>
                <p>PI220 aims to collect only information necessary to operate, maintain, protect and improve its website and services.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>03 / INFORMATION PROCESSED</h2>
                <p>Depending on how visitors use the website, the following information may be processed:</p>
                <ul>
                    <li>Technical information automatically transmitted by a browser or hosting infrastructure, such as IP address, browser type, operating system, request time and requested resource.</li>
                    <li>Information voluntarily supplied when a visitor contacts PI220 by email.</li>
                    <li>Website preferences stored locally in the visitor's browser, such as the sound-volume setting.</li>
                    <li>Analytics information, if optional analytics are introduced and the visitor gives valid consent.</li>
                </ul>
                <p>The website's existing local device diagnostics are designed to be read and displayed within the visitor's browser session. They are not intended to transmit those diagnostic results to PI220.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>04 / PURPOSES AND LEGAL BASES</h2>
                <h3>Website operation and security</h3>
                <p>To deliver website resources, maintain availability, troubleshoot technical issues and protect the website against misuse. The applicable legal basis will depend on the processing, including legitimate interests where appropriate.</p>

                <h3>Communications</h3>
                <p>To read and respond to messages voluntarily sent to PI220. The legal basis will generally be taking steps requested by the sender or legitimate interests in responding to correspondence, depending on the circumstances.</p>

                <h3>Optional analytics</h3>
                <p>PI220 intends to introduce Google Analytics 4 (GA4), Measurement ID G-S1S7HJCFWV. This service is not represented as active under this policy's current version. If introduced, analytics will be activated only after the visitor has given valid consent.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>05 / COOKIES AND LOCAL BROWSER STORAGE</h2>
                <p>The website currently uses browser local storage for a sound-volume preference identified in the website code as <code>pi220SoundVolume</code>.</p>
                <p>This is browser storage, not a conventional HTTP cookie. It allows the website to remember the visitor's sound setting on that browser.</p>
                <p>For further details, see the separate PI220 Cookie Policy.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>06 / THIRD-PARTY SERVICES AND HOSTING</h2>
                <p>The PI220 website is published through GitHub Pages. The hosting infrastructure may process technical information necessary to deliver and secure website requests.</p>
                <p>Third-party services may have their own privacy practices and responsibilities. Visitors should consult the relevant provider's privacy documentation where applicable.</p>
                <p>If Google Analytics 4 is activated in the future, Google may process analytics information in accordance with the configuration and applicable Google terms. PI220 will update this policy and its cookie information before enabling that processing.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>07 / INTERNATIONAL TRANSFERS</h2>
                <p>Some third-party infrastructure providers may process information outside the European Economic Area.</p>
                <p>Where personal data is transferred internationally, PI220 will assess the applicable transfer mechanism and safeguards required by data-protection law.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>08 / RETENTION</h2>
                <p>PI220 does not intend to retain personal data longer than necessary for the purpose for which it was collected.</p>
                <p>Correspondence may be retained for the time reasonably necessary to handle and document the communication, and for any additional period required by applicable legal obligations or to establish, exercise or defend legal claims.</p>
                <p>Technical logs are subject to the retention practices of the relevant hosting provider.</p>
                <p>If analytics are introduced, the applicable retention settings will be documented and reviewed.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>09 / YOUR RIGHTS</h2>
                <p>Subject to applicable legal conditions, visitors may have the right to:</p>
                <ul>
                    <li>Request access to their personal data.</li>
                    <li>Request correction of inaccurate information.</li>
                    <li>Request erasure.</li>
                    <li>Request restriction of processing.</li>
                    <li>Object to processing based on legitimate interests.</li>
                    <li>Request data portability where applicable.</li>
                    <li>Withdraw consent at any time where processing is based on consent.</li>
                    <li>Lodge a complaint with a supervisory authority.</li>
                </ul>
                <p>Requests can be sent to either contact address:</p>
                <p><a href="mailto:CONOCEAPROFDSC@PROTON.ME">CONOCEAPROFDSC@PROTON.ME</a><br>
                <a href="mailto:PI220.391.PROFDSCXYZ.2026@PROTON.ME">PI220.391.PROFDSCXYZ.2026@PROTON.ME</a></p>
                <p>Visitors in Spain may contact the Spanish Data Protection Agency (AEPD):
                <a href="https://www.aepd.es/" target="_blank" rel="noopener noreferrer">https://www.aepd.es/</a></p>
            </section>

            <section class="pi220-legal-section">
                <h2>10 / SECURITY</h2>
                <p>PI220 aims to apply appropriate technical and organisational measures to protect information against unauthorised access, alteration, disclosure or destruction.</p>
                <p>No internet transmission or storage system can be guaranteed to be completely secure.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>11 / CHILDREN'S PRIVACY</h2>
                <p>PI220 does not intentionally seek to collect personal information from children through this website without an appropriate lawful basis and the necessary safeguards.</p>
                <p>Parents or legal guardians who believe a child has submitted personal information may contact PI220 using the addresses above.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>12 / CHANGES TO THIS POLICY</h2>
                <p>This policy may be updated when website functionality, data processing activities or applicable legal requirements change.</p>
                <p>The latest version will be published on the official PI220 website with its revision date.</p>
            </section>

            <footer class="pi220-legal-footer">
                <strong>PARALLEL INDUSTRIES 220</strong>
                <p>Prof D.Sc Jesse Jessen</p>
                <p>Mission • unity • future • unstoppable</p>
            </footer>
        `;

        mountDocument(host, "pi220-privacy-policy", content);
    }

    function mountCookies(host) {
        var content = `
            <header class="pi220-legal-header">
                <div class="pi220-legal-kicker">PARALLEL INDUSTRIES 220 / LEGAL</div>
                <h1>COOKIE AND BROWSER STORAGE POLICY</h1>
                <p>Browser Technologies and Visitor Preferences</p>
                <div class="pi220-legal-meta">
                    <span>WEBSITE</span>
                    <a href="https://profdrjamesjessen-cyber.github.io/PI220/" target="_blank" rel="noopener noreferrer">
                        PI220 OFFICIAL WEBSITE
                    </a>
                    <span>LAST UPDATED: 18 NOVEMBER 2026</span>
                </div>
            </header>

            <section class="pi220-legal-section">
                <h2>01 / PURPOSE</h2>
                <p>This policy explains how the PI220 website uses cookies and similar browser technologies.</p>
                <p>PI220 aims to distinguish essential website functionality from optional analytics and to give visitors meaningful control over optional tracking.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>02 / CURRENT BROWSER STORAGE</h2>
                <p>The current website code uses browser local storage to remember the visitor's sound-volume preference.</p>
                <div class="pi220-legal-table-wrap">
                    <table class="pi220-legal-table">
                        <thead>
                            <tr>
                                <th>Storage item</th>
                                <th>Technology</th>
                                <th>Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>pi220SoundVolume</code></td>
                                <td>Browser local storage</td>
                                <td>Remembers the visitor's preferred sound volume</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>This item is not a conventional HTTP cookie. It is stored in the visitor's browser and is used for a website preference.</p>
                <p>The current implementation does not establish that this item transmits information to PI220 or to an analytics provider.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>03 / ANALYTICS COOKIES — PLANNED, NOT CURRENTLY ACTIVE</h2>
                <p>PI220 has created a Google Analytics 4 property for possible future website measurement.</p>
                <p><strong>Measurement ID:</strong> G-S1S7HJCFWV</p>
                <p>At the date of this policy, GA4 has not been installed in the website code supplied for review. Therefore, this policy does not claim that GA4 cookies are currently being placed.</p>
                <p>If PI220 activates GA4, it will first implement an appropriate consent mechanism and update this policy with the actual cookies, identifiers, purposes, providers and retention periods used by the deployed configuration.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>04 / CONSENT CHOICES</h2>
                <p>Before optional analytics technologies are activated, visitors must be offered clear choices.</p>
                <p>The intended consent interface will provide:</p>
                <ul>
                    <li><strong>Accept analytics:</strong> permits optional analytics processing.</li>
                    <li><strong>Reject optional:</strong> keeps optional analytics disabled.</li>
                    <li><strong>Manage preferences:</strong> allows the visitor to review their choices.</li>
                </ul>
                <p>Accept and Reject will be presented with equal visibility and at the same level.</p>
                <p>No optional analytics will be activated merely because a visitor continues browsing, remains inactive or closes the banner.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>05 / GOOGLE ANALYTICS AND CONSENT</h2>
                <p>If GA4 is introduced, PI220 intends to use Google Consent Mode in its Basic implementation.</p>
                <p>Under Google's description of Basic Consent Mode, Google tags remain blocked until the visitor grants the relevant consent. If the visitor refuses, the tags remain blocked and no data is transmitted to Google by those blocked tags.</p>
                <p>Google documentation:
                <a href="https://support.google.com/analytics/answer/10000067" target="_blank" rel="noopener noreferrer">Google Analytics — Consent Mode</a></p>
                <p>The exact configuration will be verified before activation.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>06 / CHANGING OR WITHDRAWING CONSENT</h2>
                <p>Visitors must be able to change or withdraw their optional analytics consent after their initial choice.</p>
                <p>PI220 intends to provide an accessible privacy or cookie-preferences control on the website so visitors can reopen their settings.</p>
                <p>Withdrawing consent will stop future optional analytics processing through the website's consent mechanism. It does not automatically erase information already lawfully processed by a provider; applicable deletion rights can be exercised separately.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>07 / BROWSER CONTROLS</h2>
                <p>Visitors can also configure their browser to block or delete cookies and clear local storage.</p>
                <p>Please note that clearing browser storage may remove saved website preferences, including the sound-volume setting.</p>
                <p>Browser controls are supplementary and do not replace the website's own consent interface for optional technologies.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>08 / THIRD-PARTY INFORMATION</h2>
                <p>If third-party technologies are activated, their providers may process information under their own terms and privacy policies.</p>
                <p>PI220 will identify the relevant providers and technologies in this policy when they are actually deployed.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>09 / POLICY UPDATES</h2>
                <p>This policy will be revised whenever PI220 introduces or changes cookies, analytics services, browser storage or consent mechanisms.</p>
                <p>The published version should always describe the website's actual deployed configuration, rather than planned or hypothetical functionality.</p>
            </section>

            <section class="pi220-legal-section">
                <h2>10 / CONTACT</h2>
                <p>For questions about this policy or the use of browser technologies, contact:</p>
                <p><strong>Prof D.Sc Jesse Jessen</strong><br>
                <strong>Parallel Industries 220 (PI220)</strong></p>
                <p><a href="mailto:CONOCEAPROFDSC@PROTON.ME">CONOCEAPROFDSC@PROTON.ME</a><br>
                <a href="mailto:PI220.391.PROFDSCXYZ.2026@PROTON.ME">PI220.391.PROFDSCXYZ.2026@PROTON.ME</a></p>
            </section>

            <footer class="pi220-legal-footer">
                <strong>PARALLEL INDUSTRIES 220</strong>
                <p>Mission • unity • future • unstoppable</p>
            </footer>
        `;

        mountDocument(host, "pi220-cookie-policy", content);
    }

    window.PI220LegalDocumentsRenderer = {
        mountPrivacy: mountPrivacy,
        mountCookies: mountCookies
    };

    console.log("[PI220 LEGAL] LEGAL DOCUMENT RENDERER READY");

})();
