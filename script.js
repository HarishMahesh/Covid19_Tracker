/* to get list of countries and display it in dropdown */
async function getCountryList()
{
    const dropdown = document.getElementById('country-input');
    dropdown.innerHTML = '';
    dropdown.innerHTML = '<option value="Global">Global</option>'
    let data;
    let countries;

    try{
        data = await fetch('https://api.covid19api.com/countries')
        countries = await data.json();
    }catch{
        alert('Try loading this page after sometime');
    }

    for (i in countries)
    {
        let {Country} = countries[i];
        dropdown.innerHTML += `<option value="${Country}">${Country}</option>`
    }
}

async function displayGobalData(country)
{
    const confirmed = document.getElementById('confirmed-block');
    const deaths = document.getElementById('death-block');
    const countryName = document.getElementById('country-name');
    const dateTime = document.getElementById('date-time');
    confirmed.innerHTML = '';
    deaths.innerHTML = '';

    let data;
    let covidData;

    try{
        data = await fetch('https://api.covid19api.com/summary')
        covidData = await data.json();
    }catch{
        alert('Try loading this page after sometime');
    }
    /* to display gobal stats */
    if (!country)
    {
        let globalData = covidData.Global;
        let {NewConfirmed,TotalConfirmed,NewDeaths,TotalDeaths,Date} = globalData;
        confirmed.innerHTML = ` <h5>Confirmed</h5>
        <p><b>Total Cases : </b>${TotalConfirmed}</p>
        <p><b>New Cases : </b>${NewConfirmed}</p>`;

        deaths.innerHTML = ` <h5>Deaths</h5>
        <p><b>Total Cases : </b>${TotalDeaths}</p>
        <p><b>New Cases : </b>${NewDeaths}</p>`;

        countryName.innerText = 'Global';
        let temp = Date.split('T')
        let time = temp[1].split('.');
        dateTime.innerText = `Date : ${temp[0]} Time : ${time[0]} GMT`
    }
    /* to display country specific stats */
    else
    {
        let countries =   covidData.Countries;
        let countryData;
        for (i in countries)
        {
            let currentCountry = countries[i].Country;
            if (currentCountry == country)
            {
                countryData = countries[i];
                break;
            }
            
        }

        let {NewConfirmed,TotalConfirmed,NewDeaths,TotalDeaths,Date} = countryData;
        confirmed.innerHTML = ` <h5>Confirmed</h5>
        <p><b>Total Cases : </b>${TotalConfirmed}</p>
        <p><b>New Cases : </b>${NewConfirmed}</p>`;

        deaths.innerHTML = ` <h5>Deaths</h5>
        <p><b>Total Cases : </b>${TotalDeaths}</p>
        <p><b>New Cases : </b>${NewDeaths}</p>`;

        countryName.innerText = `${country}`;
        let temp = Date.split('T')
        let time = temp[1].split('.');
        dateTime.innerText = `Date : ${temp[0]} Time : ${time[0]} GMT`
    }
}

function getCountryValue()
{
    const country = document.getElementById('country-input').value;
    console.log(country);
    if (country == 'Global')
    {
        displayGobalData()
    }
    else
    {
        displayGobalData(country);
    }
}




getCountryList();
displayGobalData();