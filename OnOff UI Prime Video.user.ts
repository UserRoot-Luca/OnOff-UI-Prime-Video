// ==UserScript==
// @name         On Off UI Prime Video
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  ###
// @author       UserRoot-Luca
// @match        https://www.primevideo.com/*
// @icon         https://www.google.com/s2/favicons?domain=primevideo.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    window.onload = () => {
        const KEY = "u";
        let switchUI = true;
        window.addEventListener('keydown', (e) => {
            if (e.key == KEY) {
                if (switchUI) {
                    console.log("UI OFF");
                    switchUI = false;
                } else {
                    console.log("UI On");
                    switchUI = true;
                }
            }
        }, false);

        let GetPlayerInterval = setInterval(() => {
            let E_player: any = document.evaluate(
                "//*[@id=\"dv-web-player\"]/div/div[1]/div/div/div[2]/div/div/div/div/div[1]",
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null,
            ).singleNodeValue;
            if (E_player != null) {
                let OldTime = "";
                let CountTime = 0;
                E_player.addEventListener("DOMSubtreeModified", () => {
                    if (!switchUI) {
                        E_player.style.display = "none";
                        if (!(E_player.style.display == "none")) { console.log("UI Error"); }
                        let Time = document.evaluate(
                            "//*[@id=\"dv-web-player\"]/div/div[1]/div/div/div[2]/div/div/div/div/div[1]/div[5]/div[2]/div[2]/div/div[1]/div[1]/span",
                            document,
                            null,
                            XPathResult.FIRST_ORDERED_NODE_TYPE,
                            null,
                        ).singleNodeValue;
                        if (Time != null) {
                            Time.addEventListener("DOMSubtreeModified", (e: any) => {
                                let NewTime = e.target.textContent;
                                if (NewTime != OldTime) {
                                    if(CountTime >= 120){ console.clear(); CountTime = 0;}
                                    OldTime = NewTime;
                                    CountTime++;
                                    console.log(NewTime);
                                }
                            })
                        }
                    } else {
                        E_player.style.display = "";
                    }
                })
                clearInterval(GetPlayerInterval);
            }
        }, 300)
    }
})();