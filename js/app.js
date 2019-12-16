const select = document.querySelector("#countrySelect");
const countryData = document.querySelector("#countryData");
const flagImg = document.querySelector("#countryFlag");
let countryMap = document.querySelector("#mapid");
countryMap = L.map('mapid');

fetch('https://restcountries.eu/rest/v2/all?fields=iso2Code;name')
    .then(resp =>
        resp.json()
    )
    // Show all countries in select field
    .then(resp => {
        resp.forEach(country => {
            const option = document.createElement("option");
            option.value = country.name;
            option.innerHTML = country.name;
            select.appendChild(option);
        })
        // Download selected country data
        select.addEventListener('change', () => {
            const selectedItem = select.options[select.selectedIndex].value;
            fetch(`https://restcountries.eu/rest/v2/name/${selectedItem}`)
                .then(resp =>
                    resp.json()
                )
                .then(resp => {
                    resp.forEach(item => {
                        // Correct the China element from API
                        if (selectedItem === "China") {
                            resp.length = 1;
                            console.log(resp)
                        }
                        // Get country data
                        countryData.innerHTML = `
                    <h3 class="country-name">
                        ${item.name}
                    </h3>
                    <div>
                        Capital: <strong>${item.capital}</strong>
                    </div>
                    <div>
                        Region: <strong>${item.region}</strong>
                    </div>
                    <div>
                        Subregion: <strong>${item.subregion}</strong>
                    </div>
                    <div>
                        Population: <strong>${item.population}</strong>
                    </div>
                    <div>
                        Timezone: <strong>${item.timezones}</strong>
                    </div>`;
                        // Get country flag
                        flagImg.src = item.flag;
                        // Get country map
                        const latApi = item.latlng[0];
                        const lngApi = item.latlng[1];
                        // Set coordinates to map from Leaflet.js
                        countryMap.setView([latApi, lngApi], 5);
                        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                            maxZoom: 18,
                            id: 'mapbox/streets-v11',
                            accessToken: 'pk.eyJ1IjoiZGFtamFjayIsImEiOiJjazQzcXphMmQwN2s1M2ZvNjZ1YnBpN2NrIn0.QmvaGn94IKlvYRQn7ZSXFQ'
                        }).addTo(countryMap);
                    })
                })
        })
    })

[{
    "name": "China",
    "topLevelDomain": [".cn"],
    "alpha2Code": "CN",
    "alpha3Code": "CHN",
    "callingCodes": ["86"],
    "capital": "Beijing",
    "altSpellings": ["CN", "Zhōngguó", "Zhongguo", "Zhonghua", "People's Republic of China", "中华人民共和国", "Zhōnghuá Rénmín Gònghéguó"],
    "region": "Asia",
    "subregion": "Eastern Asia",
    "population": 1377422166,
    "latlng": [35.0, 105.0],
    "demonym": "Chinese",
    "area": 9640011.0,
    "gini": 47.0,
    "timezones": ["UTC+08:00"],
    "borders": ["AFG", "BTN", "MMR", "HKG", "IND", "KAZ", "PRK", "KGZ", "LAO", "MAC", "MNG", "PAK", "RUS", "TJK", "VNM"],
    "nativeName": "中国",
    "numericCode": "156",
    "currencies": [{
        "code": "CNY",
        "name": "Chinese yuan",
        "symbol": "¥"
    }],
    "languages": [{
        "iso639_1": "zh",
        "iso639_2": "zho",
        "name": "Chinese",
        "nativeName": "中文 (Zhōngwén)"
    }],
    "translations": {
        "de": "China",
        "es": "China",
        "fr": "Chine",
        "ja": "中国",
        "it": "Cina",
        "br": "China",
        "pt": "China",
        "nl": "China",
        "hr": "Kina",
        "fa": "چین"
    },
    "flag": "https://restcountries.eu/data/chn.svg",
    "regionalBlocs": [],
    "cioc": "CHN"
}, {
    "name": "Macao",
    "topLevelDomain": [".mo"],
    "alpha2Code": "MO",
    "alpha3Code": "MAC",
    "callingCodes": ["853"],
    "capital": "",
    "altSpellings": ["MO", "澳门", "Macao Special Administrative Region of the People's Republic of China", "中華人民共和國澳門特別行政區", "Região Administrativa Especial de Macau da República Popular da China"],
    "region": "Asia",
    "subregion": "Eastern Asia",
    "population": 649100,
    "latlng": [22.16666666, 113.55],
    "demonym": "Chinese",
    "area": 30.0,
    "gini": null,
    "timezones": ["UTC+08:00"],
    "borders": ["CHN"],
    "nativeName": "澳門",
    "numericCode": "446",
    "currencies": [{
        "code": "MOP",
        "name": "Macanese pataca",
        "symbol": "P"
    }],
    "languages": [{
        "iso639_1": "zh",
        "iso639_2": "zho",
        "name": "Chinese",
        "nativeName": "中文 (Zhōngwén)"
    }, {
        "iso639_1": "pt",
        "iso639_2": "por",
        "name": "Portuguese",
        "nativeName": "Português"
    }],
    "translations": {
        "de": "Macao",
        "es": "Macao",
        "fr": "Macao",
        "ja": "マカオ",
        "it": "Macao",
        "br": "Macau",
        "pt": "Macau",
        "nl": "Macao",
        "hr": "Makao",
        "fa": "مکائو"
    },
    "flag": "https://restcountries.eu/data/mac.svg",
    "regionalBlocs": [],
    "cioc": ""
}, {
    "name": "Taiwan",
    "topLevelDomain": [".tw"],
    "alpha2Code": "TW",
    "alpha3Code": "TWN",
    "callingCodes": ["886"],
    "capital": "Taipei",
    "altSpellings": ["TW", "Táiwān", "Republic of China", "中華民國", "Zhōnghuá Mínguó"],
    "region": "Asia",
    "subregion": "Eastern Asia",
    "population": 23503349,
    "latlng": [23.5, 121.0],
    "demonym": "Taiwanese",
    "area": 36193.0,
    "gini": null,
    "timezones": ["UTC+08:00"],
    "borders": [],
    "nativeName": "臺灣",
    "numericCode": "158",
    "currencies": [{
        "code": "TWD",
        "name": "New Taiwan dollar",
        "symbol": "$"
    }],
    "languages": [{
        "iso639_1": "zh",
        "iso639_2": "zho",
        "name": "Chinese",
        "nativeName": "中文 (Zhōngwén)"
    }],
    "translations": {
        "de": "Taiwan",
        "es": "Taiwán",
        "fr": "Taïwan",
        "ja": "台湾（中華民国）",
        "it": "Taiwan",
        "br": "Taiwan",
        "pt": "Taiwan",
        "nl": "Taiwan",
        "hr": "Tajvan",
        "fa": "تایوان"
    },
    "flag": "https://restcountries.eu/data/twn.svg",
    "regionalBlocs": [],
    "cioc": "TPE"
}]