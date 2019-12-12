const select = document.querySelector("#countrySelect");

fetch('https://restcountries.eu/rest/v2/all?fields=iso2Code;name')
    .then(resp =>
        resp.json()
    )
    .then(resp => {
        console.log(resp);
        resp.forEach(country => {
            const option = document.createElement("option");
            option.value = country.name;
            option.innerHTML = country.name;
            select.appendChild(option);
        })
    })