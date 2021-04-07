import React from "react";

export const branches = [
    {
        name: "Bratislava - Obchodná 57",
        link: "bratislava-obchodna",
        label: "IMOOPTIK BRATISLAVA - Obchodná 57",
        address: "Obchodná 57",
        psc: "81106",
        city: "Bratislava",
        hours: [ "Pon - Pia: 9:00 - 19:00", "So: 10:00 - 13:00" ],
        phone: "+421 904 533 732",
        email: "obchodna@imooptik.sk",
        employees: [ "Daniela Kolarčíková", "Martina Hudecová", "Peter Imrich", "Lenka Dominová", "Ingrid Matuškovičová" ],
        gallery: [
            require("../assets/bratislava-obchodna/image-1.jpg"),
            require("../assets/bratislava-obchodna/image-2.jpg"),
            require("../assets/bratislava-obchodna/image-3.jpg"),
            require("../assets/bratislava-obchodna/image-4.jpg"),
            require("../assets/bratislava-obchodna/image-5.jpg"),
            require("../assets/bratislava-obchodna/image-6.jpg"),
            require("../assets/bratislava-obchodna/image-7.jpg"),
            require("../assets/bratislava-obchodna/image-8.jpg"),
            require("../assets/bratislava-obchodna/image-9.jpg"),
        ],
        calendar: 2,
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.001901968301!2d17.110490951550315!3d48.148768558258176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8945b3f52397%3A0x98ecf6f50aa329b2!2sImooptik!5e0!3m2!1ssk!2ssk!4v1617619173625!5m2!1ssk!2ssk"
    },
    {
        name: "Bratislava - Miletičova 38",
        link: "bratislava-mileticova",
        label: "IMOOPTIK BRATISLAVA - Miletičova 38",
        address: "Miletičova 38",
        psc: "82108",
        city: "Bratislava",
        hours: [ "Pon - Štv: 10:00 - 18:00", "Pia: 10:00 - 17:00", "Obed: 13:00 - 13:30" ],
        phone: "+421 948 784 197",
        email: "mileticova@imooptik.sk",
        employees: [ "Daniela Kolarčíková", "Martina Hudecová", "Ingrid Matuškovičová" ],
        gallery: [
            require("../assets/bratislava-obchodna/image-1.jpg"),
            require("../assets/bratislava-obchodna/image-2.jpg"),
            require("../assets/bratislava-obchodna/image-3.jpg"),
            require("../assets/bratislava-obchodna/image-4.jpg"),
            require("../assets/bratislava-obchodna/image-5.jpg"),
            require("../assets/bratislava-obchodna/image-6.jpg"),
            require("../assets/bratislava-obchodna/image-7.jpg"),
            require("../assets/bratislava-obchodna/image-8.jpg"),
            require("../assets/bratislava-obchodna/image-9.jpg"),
        ],
        calendar: 3,
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2661.6974886596026!2d17.132031851550458!3d48.154637057848944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8951fded2231%3A0xfacd2b3178518887!2sIMOOPTIK%20-%20O%C4%8Dn%C3%A1%20optika%20Mileti%C4%8Dova!5e0!3m2!1ssk!2ssk!4v1617619328873!5m2!1ssk!2ssk"
    },
    {
        name: "Bratislava - Poliklinika Vajnory",
        link: "bratislava-rolnicka",
        label: "IMOOPTIK BRATISLAVA - Roľnícka 1",
        address: "Roľnícka 1",
        psc: "83107",
        city: "Bratislava",
        hours: [ "Uto - Pia: 9:00 - 19:00", "So: Vyšetrenia na objednávku" ],
        phone: "+421 917 093 148",
        email: "vajnory@imooptik.sk",
        employees: [ "Martina Hudecová", "Peter Imrich", "Lenka Dominová", "Ingrid Matuškovičová" ],
        gallery: [
            require("../assets/bratislava-obchodna/image-1.jpg"),
            require("../assets/bratislava-obchodna/image-2.jpg"),
            require("../assets/bratislava-obchodna/image-3.jpg"),
            require("../assets/bratislava-obchodna/image-4.jpg"),
            require("../assets/bratislava-obchodna/image-5.jpg"),
            require("../assets/bratislava-obchodna/image-6.jpg"),
            require("../assets/bratislava-obchodna/image-7.jpg"),
            require("../assets/bratislava-obchodna/image-8.jpg"),
            require("../assets/bratislava-obchodna/image-9.jpg"),
        ],
        calendar: 4,
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.2477473362705!2d17.199340551551572!3d48.20184375455924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8fba1ba0efe9%3A0x596b772bd314e4e8!2sIMOOPTIK%20-%20O%C4%8Dn%C3%A1%20optika%20Poliklinika%20Vajnory!5e0!3m2!1ssk!2ssk!4v1617619368230!5m2!1ssk!2ssk"
    },
    {
        name: "Bratislava - Vajnorská",
        link: "bratislava-vajnorska",
        label: "IMOOPTIK BRATISLAVA - Vajnorská",
        address: "Vajnorská",
        psc: "83107",
        city: "Bratislava",
        hours: [ "Uto - Pia: 9:00 - 19:00", "So: Vyšetrenia na objednávku" ],
        phone: "+421 917 093 148",
        email: "vajnorska@imooptik.sk",
        employees: [ "Martina Hudecová", "Peter Imrich", "Lenka Dominová", "Ingrid Matuškovičová" ],
        gallery: [
            require("../assets/bratislava-obchodna/image-1.jpg"),
            require("../assets/bratislava-obchodna/image-2.jpg"),
            require("../assets/bratislava-obchodna/image-3.jpg"),
            require("../assets/bratislava-obchodna/image-4.jpg"),
            require("../assets/bratislava-obchodna/image-5.jpg"),
            require("../assets/bratislava-obchodna/image-6.jpg"),
            require("../assets/bratislava-obchodna/image-7.jpg"),
            require("../assets/bratislava-obchodna/image-8.jpg"),
            require("../assets/bratislava-obchodna/image-9.jpg"),
        ],
        calendar: 5,
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.653722918552!2d17.142490451550927!3d48.17475475644741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8ec2e311eb9d%3A0xcf4f93695902fc22!2sVajnorsk%C3%A1%2C%20Bratislava!5e0!3m2!1ssk!2ssk!4v1617619436569!5m2!1ssk!2ssk"
    },
    {
        name: "Senica - OC Branč",
        link: "senica-namestie-oslobodenia",
        label: "IMOOPTIK SENICA - Nám. Oslobodenia 17",
        address: "Nám. Oslobodenia 17",
        psc: "90501",
        city: "Senica",
        hours: [ "Pon - Pia: 9:00 - 17:00", "Obed: 11:30 - 12:00" ],
        phone: "+421 948 176 626",
        email: "senica@imooptik.sk",
        employees: [ "Daniela Kolarčíková", "Ingrid Matuškovičová" ],
        gallery: [
            require("../assets/bratislava-obchodna/image-1.jpg"),
            require("../assets/bratislava-obchodna/image-2.jpg"),
            require("../assets/bratislava-obchodna/image-3.jpg"),
            require("../assets/bratislava-obchodna/image-4.jpg"),
            require("../assets/bratislava-obchodna/image-5.jpg"),
            require("../assets/bratislava-obchodna/image-6.jpg"),
            require("../assets/bratislava-obchodna/image-7.jpg"),
            require("../assets/bratislava-obchodna/image-8.jpg"),
            require("../assets/bratislava-obchodna/image-9.jpg"),
        ],
        calendar: 6,
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2634.2533040819526!2d17.364752551562884!3d48.68152152099559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476cb520f3a12c49%3A0xcd18d07335e92de3!2sIMOOPTIK%20-%20O%C4%8Dn%C3%A1%20Optika!5e0!3m2!1ssk!2ssk!4v1617619471644!5m2!1ssk!2ssk"
    }
]

export const deliveryCompanies = [
    {
        name: "DPD"
    },
    {
        name: "DHL"
    },
    {
        name: "UPS"
    }
]

export const services = [
    {
        title: "Vyšetrenie zraku",
        link: "vysetrenie-zraku",
        heading: "Prečo absolvovať vyšetrenie zraku?",
        description: "Naše zrakové centrum disponuje kompletným moderným prístrojovým zariadením na aplikáciu kontaktných šošoviek a vyšetrenie zrakovej ostrosti. Náš tím optometristov je pripravený Vám pomôcť. Prikladáme zaujímavé video prečo by ste mali absolvovať vyšetrenie zrakovej ostrosti v rámci Vašej prevencie.",
        teamDescription: "Náš tím optometristov disponuje potrebným vzdelaním v oblasti optometrie a kontaktológie. Zabezpečujeme odborné vyšetrenie zraku, aplikáciu kontaktných šošoviek a poradenstvo. Na naše vyšetrenia poskytujeme plnú záruku. V prípade akýchkoľvek otázok nás neváhajte kontaktovať.",
        team: [
            {
                name: "Bc. Pavel Honek",
                role: "Optometrista, kontaktológ"
            },
            {
                name: "Helena Šišuláková",
                role: "Optometrista, kontaktológ"
            },
            {
                name: "Daniela Kolarčíková",
                role: "Optometrista"
            },
            {
                name: "Ingrid Matuškovičová",
                role: "Optometrista, kontaktológ"
            }
        ],
        pricingDescription: "Informácie o cenách a rozsah poskytovaných služieb v našom zrakovom centre. Upozorňujeme že u nás pri kúpe kompletných dioptrických okuliarov je vyšetrenie zraku zdarma. V cene aplikácie kontaktných šošoviek je zahrnutý roztok na šošovky, kontaktné šošovky, konzultácia, tréning a kontrola zákazníka. Kontaktné šošovky nám dodávajú firmy Cooper Vision a Johnson & Johnson.",
        pricing: [ 15, 25 ]
    },
    {
        title: "Aplikácia kontaktných šošoviek",
        link: "aplikacia-kontaktnych-sosoviek",
        heading: "Aplikácia šošoviek u nás",
        description: "Naše zrakové centrum disponuje kompletným moderným prístrojovým zariadením na aplikáciu kontaktných šošoviek a vyšetrenie zrakovej ostrosti. Náš tím optometristov je pripravený Vám pomôcť. Prikladáme zaujímavé video prečo by ste mali absolvovať vyšetrenie zrakovej ostrosti v rámci Vašej prevencie.",
        teamDescription: "Náš tím optometristov disponuje potrebným vzdelaním v oblasti optometrie a kontaktológie. Zabezpečujeme odborné vyšetrenie zraku, aplikáciu kontaktných šošoviek a poradenstvo. Na naše vyšetrenia poskytujeme plnú záruku. V prípade akýchkoľvek otázok nás neváhajte kontaktovať.",
        team: [
            {
                name: "Bc. Pavel Honek",
                role: "Optometrista, kontaktológ"
            },
            {
                name: "Helena Šišuláková",
                role: "Optometrista, kontaktológ"
            },
            {
                name: "Daniela Kolarčíková",
                role: "Optometrista"
            },
            {
                name: "Ingrid Matuškovičová",
                role: "Optometrista, kontaktológ"
            }
        ],
        pricingDescription: "Informácie o cenách a rozsah poskytovaných služieb v našom zrakovom centre. Upozorňujeme že u nás pri kúpe kompletných dioptrických okuliarov je vyšetrenie zraku zdarma. V cene aplikácie kontaktných šošoviek je zahrnutý roztok na šošovky, kontaktné šošovky, konzultácia, tréning a kontrola zákazníka. Kontaktné šošovky nám dodávajú firmy Cooper Vision a Johnson & Johnson.",
        pricing: [ 30, 40 ]
    },
    {
        title: "Servis okuliarov",
        link: "servis-okuliarov",
        heading: "Ako robíme servis okuliarov?",
        description: "Naše zrakové centrum disponuje kompletným moderným prístrojovým zariadením na aplikáciu kontaktných šošoviek a vyšetrenie zrakovej ostrosti. Náš tím optometristov je pripravený Vám pomôcť. Prikladáme zaujímavé video prečo by ste mali absolvovať vyšetrenie zrakovej ostrosti v rámci Vašej prevencie.",
        teamDescription: "Náš tím optometristov disponuje potrebným vzdelaním v oblasti optometrie a kontaktológie. Zabezpečujeme odborné vyšetrenie zraku, aplikáciu kontaktných šošoviek a poradenstvo. Na naše vyšetrenia poskytujeme plnú záruku. V prípade akýchkoľvek otázok nás neváhajte kontaktovať.",
        team: [
            {
                name: "Bc. Pavel Honek",
                role: "Optometrista, kontaktológ"
            },
            {
                name: "Helena Šišuláková",
                role: "Optometrista, kontaktológ"
            },
            {
                name: "Daniela Kolarčíková",
                role: "Optometrista"
            },
            {
                name: "Ingrid Matuškovičová",
                role: "Optometrista, kontaktológ"
            }
        ],
        pricingDescription: "Informácie o cenách a rozsah poskytovaných služieb v našom zrakovom centre. Upozorňujeme že u nás pri kúpe kompletných dioptrických okuliarov je vyšetrenie zraku zdarma. V cene aplikácie kontaktných šošoviek je zahrnutý roztok na šošovky, kontaktné šošovky, konzultácia, tréning a kontrola zákazníka. Kontaktné šošovky nám dodávajú firmy Cooper Vision a Johnson & Johnson.",
        pricing: [ 20, 60 ]
    }
]

export const categories = [
    {
        category: -1,
        title: "Všetky",
        icon: null
    },
    {
        category: 1,
        title: "Dioptrické okuliare",
        icon: require("../assets/icons/dioptricke-okuliare-black.svg")
    },
    {
        category: 2,
        title: "Slnečné okuliare",
        icon: require("../assets/icons/slnecne-okuliare-black.svg")
    },
    {
        category: 4,
        title: "Športové okuliare",
        icon: require("../assets/icons/sportove-okuliare-black.svg")
    },
    {
        category: 3,
        title: "Kontaktné šošovky",
        icon: require("../assets/icons/sosovky-black.svg")
    },
    {
        category: 5,
        title: "Doplnky",
        icon: require("../assets/icons/doplnky-black.svg")
    }
]

export const collections = [
    {
        sex: "",
        title: "Všetky"
    },
    {
        sex: "U",
        title: "Unisex"
    },
    {
        sex: "W",
        title: "Dámske"
    },
    {
        sex: "M",
        title: "Pánske"
    }
]

export const pricing = [
    {
        price: 0,
        title: "Všetky"
    },
    {
        price: 1,
        title: "Najlacnejšie"
    },
    {
        price: -1,
        title: "Najdrahšie"
    }
]

export const frameStyles = [
    {
        frameStyle: "",
        title: "Všetky",
        icon: null,
        iconBlack: null
    },
    {
        frameStyle: "Pilot",
        title: "Pilot",
        icon: require("../assets/icons/frame-pilot.svg"),
        iconBlack: require("../assets/icons/frame-pilot-black.svg")
    },
    {
        frameStyle: "Squared",
        title: "Squared",
        icon: require("../assets/icons/frame-squared.svg"),
        iconBlack: require("../assets/icons/frame-squared-black.svg")
    },
    {
        frameStyle: "Browline",
        title: "Browline",
        icon: require("../assets/icons/frame-browline.svg"),
        iconBlack: require("../assets/icons/frame-browline-black.svg")
    },
    {
        frameStyle: "Cat eye",
        title: "Cat eye",
        icon: require("../assets/icons/frame-cateye.svg"),
        iconBlack: require("../assets/icons/frame-cateye-black.svg")
    },
    {
        frameStyle: "Tiny",
        title: "Tiny",
        icon: require("../assets/icons/frame-tiny.svg"),
        iconBlack: require("../assets/icons/frame-tiny-black.svg")
    },
    {
        frameStyle: "Oversize",
        title: "Oversize",
        icon: require("../assets/icons/frame-oversize.svg"),
        iconBlack: require("../assets/icons/frame-oversize-black.svg")
    },
    {
        frameStyle: "Okrúhle",
        title: "Okrúhle",
        icon: require("../assets/icons/frame-okruhle.svg"),
        iconBlack: require("../assets/icons/frame-okruhle-black.svg")
    },
    {
        frameStyle: "Oválne",
        title: "Oválne",
        icon: require("../assets/icons/frame-ovalne.svg"),
        iconBlack: require("../assets/icons/frame-ovalne-black.svg")
    },
    {
        frameStyle: "Obdĺžnikové",
        title: "Obdĺžnikové",
        icon: require("../assets/icons/frame-obdlznikove.svg"),
        iconBlack: require("../assets/icons/frame-obdlznikove-black.svg")
    },
    {
        frameStyle: "Flat top",
        title: "Flat top",
        icon: require("../assets/icons/frame-pilot.svg"),
        iconBlack: require("../assets/icons/frame-flattop-black.svg")
    },
    {
        frameStyle: "Špeciálne",
        title: "Špeciálne",
        icon: require("../assets/icons/frame-pilot.svg"),
        iconBlack: require("../assets/icons/frame-pilot-black.svg")
    },
]

export const brands = [
    {
        name: "Všetky",
        image: null
    },
    {
        name: "Neznačkové",
        image: null
    },
    {
        name: "Adidas",
        image: require("../assets/logos/adidas.png")
    },
    {
        name: "Armani Exchange",
        image: require("../assets/logos/armani-exchange.jpeg")
    },
    {
        name: "Arnette",
        image: require("../assets/logos/arnette.png")
    },
    {
        name: "Blackfin",
        image: require("../assets/logos/blackfin.png")
    },
    {
        name: "Blumarine",
        image: require("../assets/logos/blumarine.png")
    },
    {
        name: "Burberry",
        image: require("../assets/logos/burberry.png")
    },
    {
        name: "Bvlgari",
        image: require("../assets/logos/bvlgari.png")
    },
    {
        name: "Calvin Klein",
        image: require("../assets/logos/calvin-klein.png")
    },
    {
        name: "Carolina Herrera",
        image: require("../assets/logos/carolina-herrera.jpeg")
    },
    {
        name: "Carrera",
        image: require("../assets/logos/carrera.png")
    },
    {
        name: "David Beckham",
        image: require("../assets/logos/david-beckham.jpeg")
    },
    {
        name: "Dior",
        image: require("../assets/logos/dior.png")
    },
    {
        name: "Dolce & Gabbana",
        image: require("../assets/logos/dolce-gabbana.png")
    },
    {
        name: "Elle",
        image: require("../assets/logos/elle.png")
    },
    {
        name: "Emporio Armani",
        image: require("../assets/logos/emporio-armani.png")
    },
    {
        name: "Esprit",
        image: require("../assets/logos/esprit.png")
    },
    {
        name: "Etnia Barcelona",
        image: require("../assets/logos/etnia-barcelona.png")
    },
    {
        name: "Fendi",
        image: require("../assets/logos/fendi.png")
    },
    {
        name: "Fossil",
        image: require("../assets/logos/fossil.png")
    },
    {
        name: "Furla",
        image: require("../assets/logos/furla.png")
    },
    {
        name: "Giorgio Armani",
        image: require("../assets/logos/giorgio-armani.png")
    },
    {
        name: "Givenchy",
        image: require("../assets/logos/givenchy.png")
    },
    {
        name: "Gucci",
        image: require("../assets/logos/gucci.png")
    },
    {
        name: "Guess",
        image: require("../assets/logos/guess.svg")
    },
    {
        name: "H.I.S",
        image: require("../assets/logos/his.png")
    },
    {
        name: "Hawkers",
        image: require("../assets/logos/hawkers.png")
    },
    {
        name: "Hugo Boss",
        image: require("../assets/logos/hugo-boss.png")
    },
    {
        name: "Jaguar",
        image: require("../assets/logos/jaguar.png")
    },
    {
        name: "Jimmy Choo",
        image: require("../assets/logos/jimmy-choo.png")
    },
    {
        name: "Lacoste",
        image: require("../assets/logos/lacoste.svg")
    },
    {
        name: "Liu Jo",
        image: require("../assets/logos/liu-jo.png")
    },
    {
        name: "Marc Jacobs",
        image: require("../assets/logos/marc-jacobs.png")
    },
    {
        name: "Max Mara",
        image: require("../assets/logos/max-mara.png")
    },
    {
        name: "Max&Co",
        image: require("../assets/logos/max-co.png")
    },
    {
        name: "Meller",
        image: require("../assets/logos/meller.png")
    },
    {
        name: "Mexx",
        image: require("../assets/logos/mexx.png")
    },
    {
        name: "Michael Kors",
        image: require("../assets/logos/michael-kors.png")
    },
    {
        name: "Moschino",
        image: require("../assets/logos/moschino.png")
    },
    {
        name: "Oakley",
        image: require("../assets/logos/oakley.svg")
    },
    {
        name: "Persol",
        image: require("../assets/logos/persol.png")
    },
    {
        name: "Polaroid",
        image: require("../assets/logos/polaroid.png")
    },
    {
        name: "Police",
        image: require("../assets/logos/police.png")
    },
    {
        name: "Polo Ralph Lauren",
        image: require("../assets/logos/polo-ralph-lauren.png")
    },
    {
        name: "Prada",
        image: require("../assets/logos/prada.png")
    },
    {
        name: "Prada Linea Rossa",
        image: require("../assets/logos/prada-linea-rossa.jpeg")
    },
    {
        name: "Ralph",
        image: require("../assets/logos/ralph-lauren.png")
    },
    {
        name: "Ralph Lauren",
        image: require("../assets/logos/ralph-lauren.png")
    },
    {
        name: "Ray-Ban",
        image: require("../assets/logos/rayban.png")
    },
    {
        name: "Salvatore Ferragamo",
        image: require("../assets/logos/salvatore-ferragamo.png")
    },
    {
        name: "Smith",
        image: require("../assets/logos/smith.png")
    },
    {
        name: "Strellson",
        image: require("../assets/logos/strellson.jpeg")
    },
    {
        name: "Tiffany&Co.",
        image: require("../assets/logos/tiffany.png")
    },
    {
        name: "Tom Ford",
        image: require("../assets/logos/tom-ford.png")
    },
    {
        name: "Tommy Hilfiger",
        image: require("../assets/logos/tommy-hilfiger.png")
    },
    {
        name: "Versace",
        image: require("../assets/logos/versace.png")
    },
    {
        name: "Vogue",
        image: require("../assets/logos/vogue.png")
    }
]