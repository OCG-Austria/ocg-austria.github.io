async function loadTheme(themeName) {
    try {
        const response = await fetch(`../style/themes/${themeName}.json`);
        if (!response.ok) throw new Error("Theme konnte nicht geladen werden");
        const theme = await response.json();

        //Background Styling
        const html = document.documentElement;
        htmlClassList = document.documentElement.classList;
        if (theme.bg.type === "custom-color") {
            htmlClassList.add(`bg-[${theme.bg.value}]`);
        } else if (theme.bg.type === "color") {
            htmlClassList.add(`bg-${theme.bg.value}`);
        } else if (theme.bg.type === "image") {
            html.style.backgroundImage = `url(${theme.bg.value})`
            html.style.backgroundRepeat = "no-repeat"; // optional
            html.style.backgroundSize = "cover";      // optional, falls nicht in Tailwind-Klassen
            html.style.backgroundPosition = "center"; // optional
        }


        htmlClassList.add(`text-[${theme.bg.text}]`);
        for (const element of theme.bg.classes.split(" ")) {
            if(element.trim() === "") continue;
            htmlClassList.add(element);
        }

        //Header Styling
        const header = document.querySelector('header');
        headerClassList = header.classList;
        if (theme.header.type === "custom-color") {
            headerClassList.add(`bg-[${theme.header.value}]`);
        } else if (theme.header.type === "color") {
            headerClassList.add(`bg-${theme.cards.value}`);
        }
        for (const element of theme.header.classes.split(" ")) {
            if (element.trim() === "") continue;
            headerClassList.add(element);
        }

        //Card Styling
        const cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            cardClassList = card.classList;
            if (theme.cards.type === "custom-color") {
                cardClassList.add(`bg-[${theme.cards.value}]`);
            } else if (theme.cards.type === "color") {
                cardClassList.add(`bg-${theme.cards.value}`);
            }
            for (const element of theme.cards.classes.split(" ")) {
                if (element.trim() === "") continue;
                cardClassList.add(element);
            }
        });

        //Card Exception Button Styling
        const exceptionButtons = document.querySelectorAll('a[id*="exception"]');
        exceptionButtons.forEach((exception) => {
            exceptionClassList = exception.classList;
            if (theme.cards.exception.type === "custom-color") {
                exceptionClassList.add(`bg-[${theme.cards.exception.value}]`);
            } else if (theme.cards.exception.type === "color") {
                exceptionClassList.add(`bg-${theme.cards.exception.value}`);
            }
            for (const element of theme.cards.exception.classes.split(" ")) {
                if (element.trim() === "") continue;
                exceptionClassList.add(element);
            }
        });

        //Billy Card Styling
        const billyCard = document.getElementById('billy-card');
        billyCardClassList = billyCard.classList;
        for (const element of theme.cards.billy.classes.split(" ")) {
            if (element.trim() === "") continue;
            billyCardClassList.add(element);
        }

        //Tally Card Styling
        const tallyCard = document.getElementById('tally-card');
        tallyCardClassList = tallyCard.classList;
        for (const element of theme.cards.tally.classes.split(" ")) {
            if (element.trim() === "") continue;
            tallyCardClassList.add(element);
        }
        
        //Adding stylesheets
        theme.extra.css.forEach((sheet) => {
            const link = document.createElement('link');
            link.rel='stylesheet'
            link.href=sheet
            document.head.append(link)
        });

        //Adding scripts
        theme.extra.js.forEach((scriptPath) => {
            const script = document.createElement('script');
            script.src = scriptPath;
            script.defer = true;
            document.head.appendChild(script);
        })

    } catch (error) {
        console.error("Fehler beim Laden des Themas:", error);
    }
}

async function unloadTheme(themeName) {
    try {
        const response = await fetch(`../style/themes/${themeName}.json`);
        if (!response.ok) throw new Error("Theme konnte nicht geladen werden");
        const theme = await response.json();

        const html = document.documentElement;
        const header = document.querySelector('header');
        const cards = document.querySelectorAll('.card');
        const exceptionButtons = document.querySelectorAll('a[id*="exception"]');
        const billyCard = document.getElementById('billy-card');
        const tallyCard = document.getElementById('tally-card');

        // === Background Styling entfernen ===
        html.style.backgroundImage = "";
        html.style.backgroundRepeat = "";
        html.style.backgroundSize = "";
        html.style.backgroundPosition = "";

        const htmlClassList = html.classList;
        if (theme.bg.type === "custom-color") {
            htmlClassList.remove(`bg-[${theme.bg.value}]`);
        } else if (theme.bg.type === "color") {
            htmlClassList.remove(`bg-${theme.bg.value}`);
        }
        htmlClassList.remove(`text-[${theme.bg.text}]`);
        for (const element of theme.bg.classes.split(" ")) {
            if (element.trim() === "") continue;
            htmlClassList.remove(element);
        }

        // === Header Styling entfernen ===
        const headerClassList = header.classList;
        if (theme.header.type === "custom-color") {
            headerClassList.remove(`bg-[${theme.header.value}]`);
        } else if (theme.header.type === "color") {
            headerClassList.remove(`bg-${theme.cards.value}`);
        }
        for (const element of theme.header.classes.split(" ")) {
            if (element.trim() === "") continue;
            headerClassList.remove(element);
        }

        // === Card Styling entfernen ===
        cards.forEach((card) => {
            const cardClassList = card.classList;
            if (theme.cards.type === "custom-color") {
                cardClassList.remove(`bg-[${theme.cards.value}]`);
            } else if (theme.cards.type === "color") {
                cardClassList.remove(`bg-${theme.cards.value}`);
            }
            for (const element of theme.cards.classes.split(" ")) {
                if (element.trim() === "") continue;
                cardClassList.remove(element);
            }
        });

        // === Card Exception Buttons entfernen ===
        exceptionButtons.forEach((exception) => {
            const exceptionClassList = exception.classList;
            if (theme.cards.exception.type === "custom-color") {
                exceptionClassList.remove(`bg-[${theme.cards.exception.value}]`);
            } else if (theme.cards.exception.type === "color") {
                exceptionClassList.remove(`bg-${theme.cards.exception.value}`);
            }
            for (const element of theme.cards.exception.classes.split(" ")) {
                if (element.trim() === "") continue;
                exceptionClassList.remove(element);
            }
        });

        // === Billy Card Styling entfernen ===
        if (billyCard) {
            const billyCardClassList = billyCard.classList;
            for (const element of theme.cards.billy.classes.split(" ")) {
                if (element.trim() === "") continue;
                billyCardClassList.remove(element);
            }
        }

        // === Tally Card Styling entfernen ===
        if (tallyCard) {
            const tallyCardClassList = tallyCard.classList;
            for (const element of theme.cards.tally.classes.split(" ")) {
                if (element.trim() === "") continue;
                tallyCardClassList.remove(element);
            }
        }

        // === Stylesheets entfernen ===
        theme.extra.css.forEach((sheet) => {
            document.querySelectorAll(`link[rel="stylesheet"][href="${sheet}"]`).forEach(link => link.remove());
        });

        // === Skripte entfernen ===
        theme.extra.js.forEach((scriptPath) => {
            document.querySelectorAll(`script[src="${scriptPath}"]`).forEach(script => script.remove());
        });

    } catch (error) {
        console.error("Fehler beim Entladen des Themas:", error);
    }
}