import moment from "moment";

// Fetching data from data.json
let myData;
fetch("./static/data/data.json")
    .then(response => response.json())
    .then(json => myData = json);


const dateElements = document.getElementsByClassName("Date")

for (let i = 0; i < dateElements.length; i++) {
    const dateElement = dateElements[i];
    var startDate, endDate;

    for (let j = 0; j < dateElement.attributes.length; j++) {
        const att = dateElement.attributes[j];
        if (att.nodeName == "start-date") {
            startDate = (att.nodeValue == "") ? moment() : moment(att.nodeValue)
        } else if (att.nodeName == "end-date") {
            endDate = (att.nodeValue == "") ? moment() : moment(att.nodeValue)
        }
    }

    var years = endDate.diff(startDate, 'years');
    var months = endDate.diff(startDate, 'months');
    if (years >= 1) {
        months -= (years * 12)
    }
    dateElement.innerHTML = (years < 1) ? (months + ' mos') : (years + ' yr ' + months + ' mos+');
}

function load(params) {
    var mainElement = "";

    // hiddenInput = document.createElement("input");

    // hiddenInput.setAttribute("type", "hidden");
    // hiddenInput.setAttribute("id", "hidden_input_" + newID);
    // hiddenInput.setAttribute("value", "0");
    // var td = row.insertCell(i),
    //     divP = document.createElement("div"),
    //     divC = document.createElement("div"),
    //     input = document.createElement("input"),
    //     nameID;

    // td.setAttribute("class", "px-6 py-4 whitespace-nowrap");
    // divP.setAttribute("class", "flex items-center");
    // divC.setAttribute("class", "mt-1 rounded-md shadow-sm");
    // input.setAttribute(
    //     "class",
    //     "block w-full sm:text-lg text-gray-500 border-gray-300 rounded-md"
    // );
    // input.setAttribute("type", "text");
    // nameID = "barcode_" + newID.toString();
    // input.setAttribute("name", nameID);
    // input.setAttribute("id", nameID);
    // input.addEventListener("focus", () => addAnotherRow(row), false);

    // divC.appendChild(input);
    // divP.appendChild(divC);
    // td.appendChild(divP);
    // document.getElementById("recentWork") = mainElement;
}