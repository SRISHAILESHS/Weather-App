document.body.style.background = "lightgray";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.flexDirection = "column";
document.body.style.fontFamily = "Arial";
let app = document.createElement("div");
document.body.appendChild(app);
let searchBox = document.createElement("div");
searchBox.style.background = "linear-gradient(to right, deepskyblue, mediumorchid)";
searchBox.style.padding = "10px";
searchBox.style.borderRadius = "15px";
searchBox.style.display = "flex";
searchBox.style.alignItems = "center";
searchBox.style.marginBottom = "20px";
searchBox.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
app.appendChild(searchBox);
let input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter Location";
input.style.padding = "10px";
input.style.width = "250px";
input.style.borderRadius = "5px";
input.style.border = "none";
input.style.outline = "none";
searchBox.appendChild(input);
let button = document.createElement("button");
button.innerText = "🔍";
button.style.background = "white";
button.style.padding = "10px";
button.style.marginLeft = "5px";
button.style.borderRadius = "5px";
button.style.cursor = "pointer";
button.style.border = "none";
searchBox.appendChild(button);
let card = document.createElement("div");
card.style.background = "linear-gradient(to bottom, deepskyblue, mediumorchid)";
card.style.borderRadius = "20px";
card.style.padding = "20px";
card.style.textAlign = "center";
card.style.color = "white";
card.style.width = "280px";
card.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
app.appendChild(card);
let title = document.createElement("h2");
title.innerText = "Weather Info";
card.appendChild(title);
let info = document.createElement("div");
info.style.marginBottom = "10px";
card.appendChild(info);
let icon = document.createElement("img");
icon.style.width = "80px";
icon.style.height = "80px";
icon.style.display = "none";
icon.style.margin = "0 auto";
card.appendChild(icon);
let temp = document.createElement("div");
temp.style.fontSize = "25px";
temp.style.fontWeight = "bold";
card.appendChild(temp);
let desc = document.createElement("div");
desc.style.marginTop = "10px";
desc.style.fontSize = "18px";
desc.style.fontWeight = "bold";
card.appendChild(desc);
let more = document.createElement("div");
more.style.marginTop = "10px";
more.style.fontSize = "14px";
card.appendChild(more);

let apiKey = "ENTER YOUR API KEY HERE ";

function getWeather() {
    let city = input.value.trim();
    if (city === "") {
        info.innerText = "Please enter a city name";
        temp.innerText = "";
        desc.innerText = "";
        more.innerText = "";
        title.innerText = "Weather Info";
        icon.style.display = "none";
        return;
    }
    let url = `ENTER YOUR API URL HERE`;
    fetch(url)
        .then(response =>
            response.json().then(data => ({ ok: response.ok, status: response.status, data }))
        )
        .then(({ ok, data }) => {
            if (!ok || data.cod === "404" || data.cod === 404) {
                info.innerText = "City not found";
                temp.innerText = "";
                desc.innerText = "";
                more.innerText = "";
                title.innerText = "Weather Info";
                icon.style.display = "none";
                return;
            }
            title.innerText = `${data.name}, ${data.sys.country}`;
            info.innerText = new Date().toLocaleString();
            temp.innerText = `${Math.round(data.main.temp)} °C`;
            desc.innerText = data.weather[0].description.toUpperCase();
            let iconCode = data.weather[0].icon;
            icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            icon.style.display = "block";
            const windKmh = (data.wind.speed * 3.6).toFixed(1);
            more.innerHTML = `
                Humidity: ${data.main.humidity}<br>
                Feels Like: ${Math.round(data.main.feels_like)} °C<br>
                Wind Speed: ${windKmh} km/h
            `;
        })
        .catch(err => {
            console.error("Error:", err);
            info.innerText = "Error fetching data. Try again later.";
            temp.innerText = "";
            desc.innerText = "";
            more.innerText = "";
            icon.style.display = "none";
        });
}

button.addEventListener("click", getWeather);
input.addEventListener("keydown", e => {
    if (e.key === "Enter") getWeather();
});