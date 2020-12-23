const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const msg1 = document.querySelector("#msg1")
const msg2 = document.querySelector("#msg2")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + location;

    msg1.textContent = "Loading..."
    msg2.textContent = ""

    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            msg1.textContent = data.error
        } else {
        msg1.textContent = "Location: " + data.Location
        msg2.textContent = "Temerature: " + data.Temperature
        }
    })
})
})
