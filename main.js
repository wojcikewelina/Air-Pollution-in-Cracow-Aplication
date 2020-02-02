// Używając darmowego API od jakości powietrza (https://docs.openaq.org/)
// – zbuduj aplikację informującą o jakości powietrza;
const AIR_URL = "https://api.openaq.org/v1/latest?city=Kraków"

window.onload = () => {
    const selectButton = document.querySelector("button");
    const selectInput = document.querySelector("select");
    const tableWithMeasurements = document.querySelector("ul");


    selectButton.addEventListener("click", () => {

        fetch(AIR_URL)
            .then((resp) => resp.json())
            .then((resp) => {
                console.log(resp)
                var arreyOfStations = resp.results;
                var selectedStation = arreyOfStations.find((element) => {
                    if(element.location === selectInput.value){
                        console.log(selectInput.value)
                        console.log(element)
                        return element;
                    }
                })
                var measurementsOfStation = selectedStation.measurements;
                console.log(selectedStation)
                createTableOfParameters(measurementsOfStation)
            })
    })


    function createTableOfParameters(arrey) {
        console.log(arrey);
        tableWithMeasurements.innerText = ""
        arrey.forEach((element) => {
                const liCreation = document.createElement("li");
            liCreation.innerText = "Parameter: " + element.parameter + ", value: " + element.value + ""+ element.unit
            tableWithMeasurements.appendChild(liCreation)
        })

    }
}