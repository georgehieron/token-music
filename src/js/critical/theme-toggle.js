document.addEventListener(
    "DOMContentLoaded",
    function () {
        const STORAGE_KEY = "user-color-theme";
        const COLOR_MODE_KEY = "--color-theme";

        // Colour Theme Toggle
        const themeToggleButton = document.getElementById("js-theme-toggle");
        const modeToggleText = document.getElementById("js-theme-toggle-text");

        /**
         * Pass in a custom prop key and this function will return its
         * computed value.
         * A reduced version of this: https://andy-bell.design/wrote/get-css-custom-property-value-with-javascript/
         */
        const getCSSCustomProp = (propKey) => {
            let response = getComputedStyle(
                document.documentElement
            ).getPropertyValue(propKey);

            // Tidy up the string if there’s something to work with
            if (response.length) {
                response = response.replace(/\'|"/g, "").trim();
            }

            // Return the string response by default
            return response;
        };

        /**
         * Takes either a passed settings ('light'|'dark') or grabs that from localStorage.
         * If it can’t find the setting in either, it tries to load the CSS color mode,
         * controlled by the media query
         */
        const applySetting = (passedSetting) => {
            let currentSetting =
                passedSetting || localStorage.getItem(STORAGE_KEY);

            if (currentSetting) {
                document.documentElement.setAttribute(
                    "data-user-color-theme",
                    currentSetting
                );
                setButtonLabelAndStatus(currentSetting);
            } else {
                setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
            }
        };

        /**
         * Get’s the current setting > reverses it > stores it
         */
        const toggleSetting = () => {
            let currentSetting = localStorage.getItem(STORAGE_KEY);

            switch (currentSetting) {
                case null:
                    currentSetting =
                        getCSSCustomProp(COLOR_MODE_KEY) === "dark"
                            ? "light"
                            : "dark";
                    break;
                case "light":
                    currentSetting = "dark";
                    break;
                case "dark":
                    currentSetting = "light";
                    break;
            }

            localStorage.setItem(STORAGE_KEY, currentSetting);

            return currentSetting;
        };

        /**
         * A shared method for setting the theme toggle's button text label and visually hidden status element
         */
        const setButtonLabelAndStatus = (currentSetting) => {
            modeToggleText.innerText = `Switch to ${
                currentSetting === "light" ? "dark" : "light"
            } theme`;
        };

        /**
         * Clicking the button runs the apply setting method which grabs its parameter
         * from the toggle setting method.
         */
        themeToggleButton.addEventListener("click", (evt) => {
            evt.preventDefault();

            themeToggleButton.setAttribute("disabled", true);

            // Apply the styles
            applySetting(toggleSetting());

            setTimeout(function() {
                themeToggleButton.removeAttribute("disabled");
            }, 500);
        });

        // On load, apply the user's preferred setting
        applySetting();
    },
    false
);
