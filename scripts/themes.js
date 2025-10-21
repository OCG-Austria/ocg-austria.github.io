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
    } catch (error) {
        console.error("Fehler beim Laden des Themas:", error);
    }
}