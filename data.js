const data = [
    {
        "country": "Argentina",
        "continent": "Latin America",
        "victims": 69,
        "population": 45195777,
        "references": [
            "Tico Times",
            "Father Grassi: the sentence will be announced today",
            "Argentine prelate says clerical abuse crisis 'just beginning' in pope's country",
            "Argentine bishops face charges for accepting sex-abuse complaints",
            "Allegations of sexual abuse on 47 young seminarists surfaced in 1994."
        ]
    },
    {
        "country": "Bolivia",
        "continent": "Latin America",
        "victims": 85,
        "population": 11673021,
        "references": [
            "Alfonso Pedrajas admitted to sexually assaulting 85 minors in Bolivia in the 1970s and 1980s."
        ]
    },
    {
        "country": "Brazil",
        "continent": "Latin America",
        "victims": 148,
        "population": 213993437,
        "references": [
            "Brazil - Brazzil Mag - Close to 2000 Brazilian Priests Caught in Sexual Misconduct",
            "Diocese of Anápolis",
            "Archdiocese of Penedo",
            "Their investigation reveals that..."
        ]
    },
    {
        "country": "Chile",
        "continent": "Latin America",
        "victims": 123,
        "population": 19297291,
        "references": [
            "Tico Times",
            "Corte Suprema confirmó condena a 12 años para el cura 'Tato'"
        ]
    },
    {
        "country": "Colombia",
        "continent": "Latin America",
        "victims": null,
        "population": 50882891,
        "references": [
            "Tico Times"
        ]
    },
    {
        "country": "Costa Rica",
        "continent": "Latin America",
        "victims": 1,
        "population": 5137171,
        "references": [
            "Tico Times"
        ]
    },
    {
        "country": "Ecuador",
        "continent": "Latin America",
        "victims": 4,
        "population": 17643054,
        "references": [
            "Tico Times"
        ]
    },
    {
        "country": "El Salvador",
        "continent": "Latin America",
        "victims": 1,
        "population": 6486205,
        "references": [
            "Tico Times",
            "El Salvador archbishop apologizes over priest sex abuse case",
            "Vatican court finds three El Salvador priests guilty of child abuse"
        ]
    },
    {
        "country": "Guatemala",
        "continent": "Latin America",
        "victims": 1,
        "population": 17915568,
        "references": [
            "Tico Times"
        ]
    },
    {
        "country": "Mexico",
        "continent": "Latin America",
        "victims": 170,
        "population": 126190788,
        "references": [
            "Tico Times",
            "Investigan en México a 426 sacerdotes por casos de abuso sexual de menores",
            "A priest identified only as Aristeo 'B' was found guilty of raping an eight-year-old girl"
        ]
    },
    {
        "country": "Nicaragua",
        "continent": "Latin America",
        "victims": 13,
        "population": 6624554,
        "references": [
            "Tico Times"
        ]
    },
    {
        "country": "Peru",
        "continent": "Latin America",
        "victims": 19,
        "population": 32933835,
        "references": [
            "Tico Times",
            "Detienen a ingeniero de sistemas por tráfico de pornografía infantil",
            "https://www.reuters.com/article/us-peru-church-abuse-idUSKCN1RN00U"
        ]
    },
    {
        "country": "Venezuela",
        "continent": "Latin America",
        "victims": 2,
        "population": 28435943,
        "references": [
            "Tico Times"
        ]
    },
    {
        "country": "United States of America",
        "continent": "North America",
        "victims": 4228,
        "population": 331915073,
        "references": [
            "https://www.abuselawsuit.com/church-sex-abuse/#:~:text=In%202021%2C%20the%20U.S.%20Conference,members%20from%20across%20the%20country"
        ]
    },
    {
        "country": "Canada",
        "continent": "North America",
        "victims": 105,
        "population": 38005238,
        "references": [
            "Reference for Canada"
        ]
    },
    {
        "country": "Portugal",
        "continent": "Europe",
        "victims": 4800,
        "population": 10196709,
        "references": [
            "https://www.euronews.com/2023/02/14/more-than-4800-cases-of-sexual-abuse-within-the-catholic-church-uncovered-in-portugal"
        ]
    },
    {
        "country": "Spain",
        "continent": "Europe",
        "victims": 500,
        "population": 46754778,
        "references": [
            "https://english.elpais.com/society/2021-02-01/child-abuse-in-the-spanish-catholic-church-in-spain-no-one-does-anything.html"
        ]
    },
    {
        "country": "France",
        "continent": "Europe",
        "victims": 200000,
        "population": 65273511,
        "references": [
            "https://www.ciase.fr/rapport-final/",
            "https://www.nytimes.com/2021/10/05/world/europe/france-catholic-church-abuse.html"
        ]
    },
    {
        "country": "Belgium",
        "continent": "Europe",
        "victims": 470,
        "population": 11589623,
        "references": [
            "http://www.maklu-online.eu/nl/tijdschrift/panopticon/jaargang-volume-33/1-januari-februari-january-february-2012/seksueel-misbruik-binnen-de-katholieke-kerk-een-sc/pdf/"
        ]
    },
    {
        "country": "Italy",
        "continent": "Europe",
        "victims": 600,
        "population": 60461826,
        "references": [
            "https://religionnews.com/2022/11/18/italy-church-says-600-sex-abuse-cases-sent-to-vatican/"
        ]
    },
    {
        "country": "Germany",
        "continent": "Europe",
        "victims": 3677,
        "population": 83783942,
        "references": [
            "https://apnews.com/article/germany-catholic-church-abuse-cdf56e5af040e8224535b92b5af2bb00"
        ]
    },
    {
        "country": "United Kingdom",
        "continent": "Europe",
        "victims": 3000,
        "population": 67886011,
        "references": [
            "https://www.reuters.com/article/us-britain-abuse-idUSKBN27Q1PU"
        ]
    },
    {
        "country": "Ireland",
        "continent": "Europe",
        "victims": 15000,
        "population": 4937786,
        "references": [
            "https://www.aljazeera.com/news/2021/10/5/awful-truth-child-sex-abuse-in-the-catholic-church#:~:text=Ireland,up abuse have been punished"
        ]
    },
    {
        "country": "Netherlands",
        "continent": "Europe",
        "victims": 10000,
        "population": 17134872,
        "references": [
            "https://www.ncronline.org/news/accountability/report-thousands-abused-church-personnel-netherlands"
        ]
    },
    {
        "country": "Poland",
        "continent": "Europe",
        "victims": 368,
        "population": 37846611,
        "references": [
            "https://www.euronews.com/2021/06/28/polish-catholic-church-reveals-hundreds-of-new-sexual-abuse-claims"
        ]
    },
    {
        "country": "Switzerland",
        "continent": "Europe",
        "victims": 1000,
        "population": 8654622,
        "references": [
            "https://www.swissinfo.ch/eng/society/priests-committed-over-1-000-sex-crimes-in-switzerland-since-1950/48804720"
        ]
    },
    {
        "country": "Austria",
        "continent": "Europe",
        "victims": 448,
        "population": 9006398,
        "references": [
            "https://www.sciencedirect.com/science/article/abs/pii/S0145213413002081"
        ]
    },
    {
        "country": "Hungary",
        "continent": "Europe",
        "victims": 32,
        "population": 9660351,
        "references": [
            "https://emerging-europe.com/news/hungarys-real-pedophilia-problem-has-nothing-to-do-with-gay-content/#:~:text=According to the Hungarian media,number could be far higher"
        ]
    },
    {
        "country": "Slovenia",
        "continent": "Europe",
        "victims": 12,
        "population": 2078938,
        "references": [
            "https://www.total-slovenia-news.com/news/2147-slovenian-catholic-church-has-processed-only-12-sexual-abuse-reports-since-2009"
        ]
    },
    {
        "country": "Croatia",
        "continent": "Europe",
        "victims": 13,
        "population": 4105267,
        "references": [
            "https://balkaninsight.com/2023/05/24/croatias-catholic-church-goes-public-on-child-abuse-cases/"
        ]
    },
    {
        "country": "Iceland",
        "continent": "Europe",
        "victims": 8,
        "population": 341243,
        "references": [
            "https://grapevine.is/news/2012/11/05/catholic-church-investigation-releases-findings/"
        ]
    },
    {
        "country": "Luxembourg",
        "continent": "Europe",
        "victims": 60,
        "population": 625978,
        "references": [
            "https://today.rtl.lu/news/luxembourg/a/1881542.html"
        ]
    },
    {
        "country": "Indonesia",
        "continent": "Asia",
        "victims": 50,
        "population": 276361783,
        "references": [
            "https://www.thejakartapost.com/news/2019/12/09/more-than-50-victims-of-sexual-abuse-in-indonesian-catholic-churches-report.html"
        ]
    },
    {
        "country": "Japan",
        "continent": "Asia",
        "victims": 16,
        "population": 125960000,
        "references": [
            "https://www.cbcj.catholic.jp/2020/04/07/20600/"
        ]
    },
    {
        "country": "Philippines",
        "continent": "Asia",
        "victims": null,
        "population": 113263256,
        "references": []
    },
    {
        "country": "India",
        "continent": "Asia",
        "victims": null,
        "population": 1380004385,
        "references": []
    },
    {
        "country": "South Korea",
        "continent": "Asia",
        "victims": null,
        "population": 51269185,
        "references": []
    },
    {
        "country": "East Timor",
        "continent": "Asia",
        "victims": null,
        "population": 1318445,
        "references": []
    },
    {
        "country": "Sri Lanka",
        "continent": "Asia",
        "victims": null,
        "population": 21413250,
        "references": []
    },
    {
        "country": "Thailand",
        "continent": "Asia",
        "victims": null,
        "population": 69799978,
        "references": []
    },
    {
        "country": "Vietnam",
        "continent": "Asia",
        "victims": null,
        "population": 97338579,
        "references": []
    },
    {
        "country": "Malaysia",
        "continent": "Asia",
        "victims": null,
        "population": 32657400,
        "references": []
    },
    {
        "country": "Australia",
        "continent": "Oceania",
        "victims": 2489,
        "population": 25788220,
        "references": [
            "https://bravehearts.org.au/research-lobbying/stats-facts/child-sexual-abuse-religous-organisations/"
        ]
    },
    {
        "country": "New Zealand",
        "continent": "Oceania",
        "victims": 1122,
        "population": 4822233,
        "references": [
            "https://www.catholic.org.nz/news/media-releases/nzcatholic-abuse-research/"
        ]
    },
    {
        "country": "Papua New Guinea",
        "continent": "Oceania",
        "victims": null,
        "population": 8947024,
        "references": []
    },
    {
        "country": "South Africa",
        "continent": "Africa",
        "victims": 35,
        "population": 60652000,
        "references": [
            "https://cruxnow.com/church-in-africa/2019/02/africa-is-also-grappling-with-clerical-abuse-say-catholic-leaders"
        ]
    },
    {
        "country": "Nigeria",
        "continent": "Africa",
        "victims": null,
        "population": 206139587,
        "references": []
    },
    {
        "country": "Congo",
        "continent": "Africa",
        "victims": null,
        "population": 85026000,
        "references": []
    },
    {
        "country": "Kenya",
        "continent": "Africa",
        "victims": null,
        "population": 53771296,
        "references": []
    },
    {
        "country": "Nigeria",
        "continent": "Africa",
        "victims": null,
        "population": 206139587,
        "references": []
    }
]