import moment from "moment";

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