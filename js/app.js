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
                        console.log(latApi);
                        console.log(lngApi)
                    })
                })
        })
    })