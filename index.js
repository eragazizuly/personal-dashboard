const exRates = document.getElementById("crypto")

fetch("https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=8m7FuLsGGeB7TXqQxhjxkLrppnrlnc3STJSEGEwiN3s")
    .then(response => response.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
        document.getElementById("author").textContent = `Photo by: ${data.user.name}`
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1604230992228-9c63cea0ca2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)`
        document.getElementById("author").textContent = `Photo by: Darya Jum`
    })

// let options = {
//     method: 'GET',
//     headers: { 'x-api-key': 'B5MR2ADY6Vn96vYCnGhS6A==ba3mx9FTHEauuglu' }
//   }
  
// let url = 'https://api.api-ninjas.com/v1/quotes?category=happiness'
  
  
// fetch(url,options)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         exRates.innerHTML = `
//             <p>${data[0].quote}</p>
//         `
//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     }); 

fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=2ad9576c303b4513b8dea96116f11b37")
    .then(response => {
        if(!response.ok) {
            throw Error("Something went wrong!")
        }
        return response.json()
    })
    .then(data => {
        let rub = parseFloat(data.rates.KZT) / parseFloat(data.rates.RUB)
        let eur = parseFloat(data.rates.KZT) / parseFloat(data.rates.EUR)
        exRates.innerHTML = `
            <p>1 USD = ${parseFloat(data.rates.KZT).toFixed(2)} ₸</p>
            <p>1 RUB = ${rub.toFixed(2)} ₸</p>
            <p>1 EUR = ${eur.toFixed(2)} ₸</p>
        `
    })
    .catch(err => console.log(err))

function currentTime() {
    let time = new Date()
    document.getElementById("time").textContent = time.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(currentTime, 1000)
navigator.geolocation.getCurrentPosition(pos => {
    const crd = pos.coords
    console.log(pos)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=778b837e420fe6d36b61aed5dfc585ee&units=metric`)
        .then(response => {
            if(!response.ok) {
                throw Error("Weather data not available.")
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            document.getElementById("weather").innerHTML = `
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
                <p class="temp">${Math.round(data.main.temp)}°</p>
                <p class="city">${data.name}</p>
            `
        })
        .catch(err => console.log(err))
})