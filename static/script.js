// change these depending on what the API is looking for
const prefixKey = "prefix";
const courseNumKey = "course-number";
const courseNameKey = "course-name";
const creditsKey = "credits";
const sampleRateKey = "sample-rate";

function makeApiCall() {
    const prefixURI = encodeURIComponent(document.getElementById(prefixKey).value);
    const courseNumURI = encodeURIComponent(document.getElementById(courseNumKey).value);
    const courseNameURI = encodeURIComponent(document.getElementById(courseNameKey).value);
    const creditsURI = encodeURIComponent(document.getElementById(creditsKey).value);
    const sampleRateURI = encodeURIComponent(document.getElementById(sampleRateKey).value);

    const url = "http://localhost:3000/api?prefix=" + prefixURI +
        "&course-number=" + courseNumURI +
        "&course-name=" + courseNameURI +
        "&credits=" + creditsURI +
        "&sample-rate=" + sampleRateURI;

    fetch(url).then(response => response.json()).then(data => showResults(data));
    console.log("Here")
}

function showResults(resultsObject) {
    const resultDiv = document.getElementById('result-div');

    // remove child (if exists)
    while (resultDiv.firstChild != null) {
        resultDiv.removeChild(resultDiv.firstChild);
    }

    const paraObject = document.createElement('pre');
    paraObject.innerHTML = JSON.stringify(resultsObject, null, '    ');
    resultDiv.appendChild(paraObject);
}