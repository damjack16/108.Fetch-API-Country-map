const select = document.querySelector("#countrySelect");
const countryData = document.querySelector("#countryData")

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
            // 
            const selectedItem = select.options[select.selectedIndex].value;
            fetch(`https://restcountries.eu/rest/v2/name/${selectedItem}`)
                .then(resp =>
                    resp.json()
                )
                .then(resp => {
                    resp.forEach(item => {
                        countryData.innerHTML = `
                    <h3 class="country-name">
                        ${item.name}
                    </h3>
                    <div>
                        Stolica: <strong>${item.capital}</strong>
                    </div>
                    <div>
                        Region: <strong>${item.region}</strong>
                    </div>
                    <div>
                        Podregion: <strong>${item.subregion}</strong>
                    </div>
                    <div>
                        Liczba ludności: <strong>${item.population}</strong>
                    </div>
                    <div>
                        Strefa czasowa: <strong>${item.timezones}</strong>
                    </div>`;
                    })
                })
        })
    })