
/* =========================================================

   CITiYMOBILE BANK

   MAIN JAVASCRIPT

   Fictional educational banking demo

========================================================= */

/* =========================================================

   LOGIN

========================================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =

            document

                .getElementById("email")

                .value

                .trim()

                .toLowerCase();

        const password =

            document

                .getElementById("password")

                .value;

        const message =

            document.getElementById("loginMessage");

        /*

         * Demo credentials

         */

        if (

            email === "jonnymaria@gmail.com" &&

            password === "JonnyMaria"

        ) {

            message.textContent = "";

            window.location.href =

                "dashboard.html";

            return;

        }

        message.textContent =

            "Incorrect demo login details.";

    });

}

/* =========================================================

   PASSWORD SHOW / HIDE

========================================================= */

const passwordToggle =

    document.getElementById("passwordToggle");

if (passwordToggle) {

    passwordToggle.addEventListener(

        "click",

        function() {

            const password =

                document.getElementById("password");

            if (password.type === "password") {

                password.type = "text";

                passwordToggle.textContent = "◉";

            } else {

                password.type = "password";

                passwordToggle.textContent = "◉";

            }

        }

    );

}

/* =========================================================

   FORGOT PASSWORD

========================================================= */

function forgotPassword() {

    alert(

        "Password recovery is not available in this educational demo."

    );

}

/* =========================================================

   LOGOUT

========================================================= */

function logoutUser() {

    window.location.href =

        "index.html";

}

/* =========================================================

   DEMO FEATURES

========================================================= */

function demoFeature(featureName) {

    alert(

        featureName +

        " is currently available as a visual feature in this educational demo."

    );

}

/* =========================================================

   VIEW TRANSACTIONS

========================================================= */

function viewTransactions() {

    alert(

        "Transaction history is part of the educational demo interface."

    );

}

/* =========================================================

   CHAT TO EDIT

========================================================= */

function editAccount() {

    alert(

        "The account editing interface is a demo feature."

    );

}

/* =========================================================

   TRANSFER FORM

========================================================= */

const transferForm =

    document.getElementById("transferForm");

if (transferForm) {

    transferForm.addEventListener(

        "submit",

        function(event) {

            event.preventDefault();

            const recipient =

                document

                    .getElementById("recipient")

                    .value

                    .trim();

            const amount =

                document

                    .getElementById("amount")

                    .value;

            const sourceAccount =

                document

                    .getElementById("sourceAccount")

                    .value;

            if (!sourceAccount) {

                alert(

                    "Please select a source account."

                );

                return;

            }

            if (!recipient) {

                alert(

                    "Please enter the recipient name."

                );

                return;

            }

            if (

                !amount ||

                Number(amount) <= 0

            ) {

                alert(

                    "Please enter a valid demo transfer amount."

                );

                return;

            }

            /*

             * Pass the fictional transfer information

             * to the verification page through the URL.

             *

             * No localStorage is used.

             */

            const verificationURL =

                new URL(

                    "verification.html",

                    window.location.href

                );

            verificationURL.searchParams.set(

                "recipient",

                recipient

            );

            verificationURL.searchParams.set(

                "amount",

                Number(amount).toFixed(2)

            );

            window.location.href =

                verificationURL.toString();

        }

    );

}

/* =========================================================

   VERIFICATION PAGE

========================================================= */

const verifyButton =

    document.getElementById("verifyButton");

if (verifyButton) {

    /*

     * Read demo transfer details from URL.

     */

    const params =

        new URLSearchParams(

            window.location.search

        );

    const recipient =

        params.get("recipient");

    const amount =

        params.get("amount");

    const recipientElement =

        document.getElementById(

            "verifyRecipient"

        );

    const amountElement =

        document.getElementById(

            "verifyAmount"

        );

    if (recipient && recipientElement) {

        recipientElement.textContent =

            recipient;

    }

    if (amount && amountElement) {

        amountElement.textContent =

            "$" + amount;

    }

    /*

     * IMPORTANT:

     * No OTP is generated or displayed.

     *

     * The field remains empty until the user

     * manually enters a value.

     */

    verifyButton.addEventListener(

        "click",

        function() {

            const codeInput =

                document.getElementById(

                    "verificationCode"

                );

            const message =

                document.getElementById(

                    "verificationMessage"

                );

            const code =

                codeInput.value.trim();

            if (!code) {

                message.textContent =

                    "Please enter the verification code.";

                return;

            }

            if (!/^\d{6}$/.test(code)) {

                message.textContent =

                    "Please enter a valid 6-digit code.";

                return;

            }

            /*

             * This is only a fictional demo.

             * No real transfer is performed.

             */

            message.style.color =

                "#16804b";

            message.textContent =

                "Demo verification completed. No real transfer was made.";

        }

    );

}

/* =========================================================

   OTP INPUT

========================================================= */

const verificationCode =

    document.getElementById(

        "verificationCode"

    );

if (verificationCode) {

    verificationCode.addEventListener(

        "input",

        function() {

            /*

             * Allow digits only.

             */

            this.value =

                this.value

                    .replace(/\D/g, "")

                    .slice(0, 6);

        }

    );

}

/* =========================================================

   TRANSFER TAB SWITCHING

========================================================= */

const transferTabs =

    document.querySelectorAll(

        ".transfer-tab"

    );

if (transferTabs.length) {

    transferTabs.forEach(function(tab) {

        tab.addEventListener(

            "click",

            function() {

                transferTabs.forEach(

                    function(item) {

                        item.classList.remove(

                            "active"

                        );

                    }

                );

                this.classList.add("active");

            }

        );

    });

}

/* =========================================================

   PWA INSTALLATION

========================================================= */

let deferredInstallPrompt = null;

const installButton =

    document.getElementById(

        "installBtn"

    );

/*

 * Android / Chrome makes this event available

 * when the website is installable.

 */

window.addEventListener(

    "beforeinstallprompt",

    function(event) {

        event.preventDefault();

        deferredInstallPrompt =

            event;

        if (installButton) {

            installButton.style.display =

                "flex";

        }

    }

);

/*

 * Install button

 */

if (installButton) {

    installButton.addEventListener(

        "click",

        async function() {

            if (!deferredInstallPrompt) {

                alert(

                    "Installation is not available yet. " +

                    "Open your browser menu and choose " +

                    "'Install app' or 'Add to Home screen'."

                );

                return;

            }

            /*

             * Open Android's native

             * installation dialog.

             */

            deferredInstallPrompt.prompt();

            const result =

                await deferredInstallPrompt.userChoice;

            if (

                result &&

                result.outcome === "accepted"

            ) {

                installButton.innerHTML =

                    "<span>✓</span>" +

                    "<span>App Installed</span>";

                installButton.disabled =

                    true;

            }

            deferredInstallPrompt =

                null;

        }

    );

}

/*

 * App installed event

 */

window.addEventListener(

    "appinstalled",

    function() {

        if (installButton) {

            installButton.innerHTML =

                "<span>✓</span>" +

                "<span>App Installed</span>";

            installButton.disabled =

                true;

        }

        deferredInstallPrompt =

            null;

    }

);


/* =========================

   DEPOSIT

========================= */

const depositForm =

    document.getElementById("depositForm");

if (depositForm) {

    depositForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const account =

            document.getElementById("depositAccount").value;

        const amount =

            document.getElementById("depositAmount").value;

        const message =

            document.getElementById("depositMessage");

        if (!account || !amount) {

            message.textContent =

                "Please complete all required fields.";

            return;

        }

        message.innerHTML =

            "Demo deposit submitted successfully.<br>" +

            "No real funds were added.";

    });

}

/* =========================

   PAY BILLS

========================= */

const billForm =

    document.getElementById("billForm");

if (billForm) {

    billForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const billType =

            document.getElementById("billType").value;

        const biller =

            document.getElementById("biller").value.trim();

        const reference =

            document

                .getElementById("customerReference")

                .value.trim();

        const amount =

            document.getElementById("billAmount").value;

        const account =

            document.getElementById("paymentAccount").value;

        if (

            !billType ||

            !biller ||

            !reference ||

            !amount ||

            !account

        ) {

            document

                .getElementById("billMessage")

                .textContent =

                "Please complete all required fields.";

            return;

        }

        /* Send bill payment to demo verification page */

        const params = new URLSearchParams({

            type: "bill",

            billType: billType,

            biller: biller,

            reference: reference,

            amount: amount,

            account: account

        });

        window.location.href =

            "verification.html?" +

            params.toString();

    });

}

/* =========================

   SERVICE WORKER

========================= */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function() {

        navigator.serviceWorker

            .register("./service-worker.js")

            .then(function(registration) {

                console.log(

                    "Service worker registered:",

                    registration.scope

                );

            })

            .catch(function(error) {

                console.error(

                    "Service worker registration failed:",

                    error

                );

            });

    });

}

