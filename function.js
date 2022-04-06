import moment from "moment";

function loadRecentWorkOverview() {
    // Fetching data from data.json
    fetch("./static/data/data.json")
        .then((response) => response.json())
        .then((json) => {
            json.work.forEach((element) => {
                console.log(element["company-name"]);

                // creating work profile overview - START
                var mainDiv = document.createElement("div");
                mainDiv.setAttribute("class", "xl:w-1/3 md:w-1/2 p-4");

                // Creating Inner Main Div - START
                var innerMainDiv = document.createElement("div");
                innerMainDiv.setAttribute(
                    "class",
                    "bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg border border-gray-300 p-6 rounded-lg"
                );

                // Creating Icons - START
                var innerIconDiv = document.createElement("div");

                for (let i = 0; i < element["icon-class"].length; i++) {
                    var innerIconSubDiv = document.createElement("div");
                    innerIconSubDiv.setAttribute(
                        "class",
                        "w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-yellow-600 italic"
                    );

                    var iconClass = "text-2xl " + element["icon-class"][i],
                        iconTitle = element["icon-title"][i];

                    var innerIcon = document.createElement("i");
                    innerIcon.setAttribute("class", iconClass);
                    innerIcon.setAttribute("title", iconTitle);

                    innerIconSubDiv.appendChild(innerIcon);
                    innerIconDiv.appendChild(innerIconSubDiv);
                }

                innerMainDiv.appendChild(innerIconDiv);
                // Creating Icons - END

                // Creating H2 Element - START
                var H2Text = element["company-name"];
                var innerH2 = document.createElement("h2");
                innerH2.setAttribute(
                    "class",
                    "text-xl font-medium title-font my-4 lg:my-7"
                );
                innerH2.append(H2Text);

                innerMainDiv.appendChild(innerH2);
                // Creating H2 Element - END

                // Creating P Element - START
                var PText = element["description"];
                var innerP = document.createElement("p");
                innerP.setAttribute("class", "leading-relaxed text-base");
                innerP.append(PText);

                innerMainDiv.appendChild(innerP);
                // Creating P Element - END

                // Inner Date Elements - START
                var innerDateMainDiv = document.createElement("div");
                innerDateMainDiv.setAttribute(
                    "class",
                    "text-center mt-2 leading-none flex justify-between w-full"
                );
                // Inner Date Span for Time Difference Calculation Element - START
                var innerDateSpanTimeDiff = document.createElement("span");
                innerDateSpanTimeDiff.setAttribute(
                    "class",
                    "mr-3 inline-flex items-center leading-none text-sm py-1"
                );
                // Inner Date SVG Element - START
                var innerSVG = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "svg"
                );
                innerSVG.setAttributeNS(
                    null,
                    "class",
                    "fill-current w-4 h-4 mr-2 text-yellow-600"
                );
                innerSVG.setAttributeNS(null, "viewBox", "0 0 512 512");
                innerSVG.setAttributeNS(null, "width", 512);
                innerSVG.setAttributeNS(null, "height", 512);

                var innerPath = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );
                innerPath.setAttributeNS(
                    null,
                    "d",
                    "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
                );
                innerSVG.appendChild(innerPath);
                // Inner Date SVG Element - END

                // Inner Date Span Time Difference Element - START
                var startDate = element["start-date"],
                    endDate = element["end-date"];
                var innerDateTimeDiv = document.createElement("div");
                innerDateTimeDiv.setAttribute("class", "Date");
                innerDateTimeDiv.setAttribute("start-date", startDate);
                innerDateTimeDiv.setAttribute("end-date", endDate);
                // Inner Date Span Time Difference Element - END

                innerDateSpanTimeDiff.appendChild(innerSVG);
                innerDateSpanTimeDiff.appendChild(innerDateTimeDiv);
                // Inner Date Span for Time Difference Calculation Element - END

                // Inner Date Span Time Frame Element - START\
                var startDateStr =
                    startDate == "Current"
                        ? "Current"
                        : startDate == ""
                        ? ""
                        : moment(startDate).format("MMMM") +
                          " " +
                          moment(startDate).format("YYYY");
                var endDateStr =
                    endDate == "Current"
                        ? "Current"
                        : startDate == ""
                        ? ""
                        : moment(endDate).format("MMMM") +
                          " " +
                          moment(endDate).format("YYYY");
                var innerDateSpanRangeText = startDateStr + " - " + endDateStr;
                var innerDateSpanRange = document.createElement("span");
                innerDateSpanRange.setAttribute(
                    "class",
                    "inline-flex items-center leading-none text-sm"
                );
                innerDateSpanRange.append(innerDateSpanRangeText);

                innerDateMainDiv.appendChild(innerDateSpanTimeDiff);
                innerDateMainDiv.appendChild(innerDateSpanRange);
                // Inner Date Span Time Frame Element - END

                innerMainDiv.appendChild(innerDateMainDiv);
                // Inner Date Elements - END

                // Inner Read More Button Element - START
                var innerReadMoreDiv = document.createElement("div");
                innerReadMoreDiv.setAttribute(
                    "class",
                    "work-readmore-btn border rounded-2xl py-2 px-4 mt-10 cursor-pointer hover:bg-white hover:text-gray-500 inline-block"
                );
                innerReadMoreDiv.append("Read More");
                innerReadMoreDiv.addEventListener("click", () => {
                    document
                        .querySelector("#specific")
                        .classList.toggle("hidden");
                    document.querySelector("#work").classList.toggle("hidden");
                });

                innerMainDiv.appendChild(innerReadMoreDiv);
                // Inner Read More Button Element - END

                mainDiv.appendChild(innerMainDiv);
                // Creating Inner Main Div - END
                // creating work profile overview - END

                document.getElementById("recentWork").appendChild(mainDiv);
            });

            const dateElements = document.getElementsByClassName("Date");

            for (let i = 0; i < dateElements.length; i++) {
                const dateElement = dateElements[i];
                var startDate, endDate;

                for (let j = 0; j < dateElement.attributes.length; j++) {
                    const att = dateElement.attributes[j];
                    if (att.nodeValue == "") {
                        startDate = endDate = moment();
                        break;
                    }

                    if (att.nodeName == "start-date") {
                        startDate =
                            att.nodeValue == "Current"
                                ? moment()
                                : moment(att.nodeValue);
                    } else if (att.nodeName == "end-date") {
                        endDate =
                            att.nodeValue == "Current"
                                ? moment()
                                : moment(att.nodeValue);
                    }
                }

                var years = endDate.diff(startDate, "years");
                var months = endDate.diff(startDate, "months");
                if (years >= 1) {
                    months -= years * 12;
                }
                dateElement.innerHTML =
                    years < 1
                        ? months + " mos"
                        : years + " yr " + months + " mos+";
            }
        });
}
function loadSpecificWorkDetails() {
    // Fetching data from data.json
    fetch("./static/data/data.json")
        .then((response) => response.json())
        .then((json) => {
            json.work.forEach((element) => {
                console.log(element["company-name"]);

                // creating work profile overview - START
                var mainSection = document.createElement("section");
                mainSection.setAttribute("class", "text-gray-200");

                // Creating Inner Main Div - START
                var innerMainDiv = document.createElement("div");
                innerMainDiv.setAttribute(
                    "class",
                    "max-w-7xl mx-auto px-5 py-24"
                );

                // Creating Icons - START
                var innerTitleDiv = document.createElement("div");
                innerTitleDiv.setAttribute(
                    "class",
                    "flex flex-wrap w-full mb-20 flex-col items-center text-center"
                );
                var H1Text = element["company-name"];
                var innerH1 = document.createElement("h1");
                innerH1.setAttribute(
                    "class",
                    "title-font mb-2 text-4xl font-extrabold leading-10 tracking-tight text-left sm:text-5xl sm:leading-none md:text-6xl"
                );
                innerH1.append(H1Text);

                innerTitleDiv.appendChild(innerH1);
                innerMainDiv.appendChild(innerTitleDiv);

                var innerDetailsDiv = document.createElement("div");
                innerDetailsDiv.setAttribute(
                    "class",
                    "flex flex-wrap -m-10 lg:-m-0"
                );

                var innerDetailsIconDiv = document.createElement("div");
                innerDetailsIconDiv.setAttribute(
                    "class",
                    "xl:w-1/2 md:w-1/2 p-10 bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg"
                );

                var innerTempDivHolder = document.createElement("div");

                var innerIconPerRowDiv = document.createElement("div");
                innerIconPerRowDiv.setAttribute("class", "flex mb-5");

                for (let i = 0; i < element["icon-class"].length; i++) {
                    if (i % 3 == 0) {
                        innerTempDivHolder.appendChild(innerIconPerRowDiv);
                        innerIconPerRowDiv = document.createElement("div");
                        innerIconPerRowDiv.setAttribute("class", "flex mb-5");
                    }
                    var innerIconSubDiv = document.createElement("div");
                    innerIconSubDiv.setAttribute("class", "flex-grow");

                    var innerIconSubSubDiv = document.createElement("div");
                    innerIconSubSubDiv.setAttribute(
                        "class",
                        "w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-100 text-yellow-600 italic"
                    );

                    var iconClass = "text-5xl " + element["icon-class"][i],
                        iconTitle = element["icon-title"][i];

                    var innerIcon = document.createElement("i");
                    innerIcon.setAttribute("class", iconClass);
                    innerIcon.setAttribute("title", iconTitle);

                    innerIconSubSubDiv.appendChild(innerIcon);
                    innerIconSubDiv.appendChild(innerIconSubSubDiv);

                    innerIconPerRowDiv.appendChild(innerIconSubDiv);
                }
                innerTempDivHolder.appendChild(innerIconPerRowDiv);

                innerDetailsIconDiv.appendChild(innerTempDivHolder);
                innerMainDiv.appendChild(innerDetailsIconDiv);
                // Creating Icons - END

                // Creating Inner DIV Element - START
                var innerDetailsMainSubDiv = document.createElement("div");
                innerDetailsMainSubDiv.setAttribute(
                    "class",
                    "xl:w-1/2 md:w-1/2 p-10 bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg flex justify-center items-center"
                );
                var innerDetailsSubDiv = document.createElement("div");
                innerDetailsSubDiv.setAttribute(
                    "class",
                    "grid gap-10"
                );

                // Creating P Element - START
                    var PText = element["details"];
                    var innerP = document.createElement("p");
                    innerP.setAttribute("class", "leading-relaxed text-base");
                    innerP.append(PText);

                    innerDetailsSubDiv.appendChild(innerP);
                // Creating P Element - END
                
                // Creating Buttons - START
                    var innerDetailsButtonDiv = document.createElement("div");
                    innerDetailsButtonDiv.setAttribute(
                        "class",
                        "flex items-center justify-evenly"
                    );
                    var innerDetailsButtonA = document.createElement("div");
                    innerDetailsButtonA.setAttribute("class","border rounded-2xl py-2 px-4 mt-10 cursor-pointer hover:bg-white hover:text-gray-500 inline-block");
                    innerDetailsButtonA.setAttribute('target', '_blank');
                    innerDetailsButtonA.setAttribute('href', element["git-link"]);
                    innerDetailsButtonA.setAttribute("title", "Link to Git Repo");
                    innerDetailsButtonA.append("GitHub Repository")
                    if (element["git-link"] != "")
                        innerDetailsButtonDiv.appendChild(innerDetailsButtonA);

                    if (element["secondary-link"] != "") {
                        innerDateButtonA.setAttribute("href", element["secondary-link"])
                        innerDateButtonA.setAttribute("title", element["secondary-link-name"])
                        innerDateButtonA.innerHTML = element["secondary-link-name"]
                    }
                // Creating Buttons - END
                
                // Inner Date Elements - START
                    var innerDateMainDiv = document.createElement("div");
                    innerDateMainDiv.setAttribute(
                        "class",
                        "text-center mt-2 leading-none flex justify-between w-full"
                    );
                    // Inner Date Span for Time Difference Calculation Element - START
                    var innerDateSpanTimeDiff = document.createElement("span");

                    innerDateSpanTimeDiff.setAttribute(
                        "class",
                        "mr-3 inline-flex items-center leading-none text-sm py-1"
                    );
                    // Inner Date SVG Element - START
                    var innerSVG = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "svg"
                    );
                    innerSVG.setAttributeNS(
                        null,
                        "class",
                        "fill-current w-4 h-4 mr-2 text-yellow-600"
                    );
                    innerSVG.setAttributeNS(null, "viewBox", "0 0 512 512");
                    innerSVG.setAttributeNS(null, "width", 512);
                    innerSVG.setAttributeNS(null, "height", 512);

                    var innerPath = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );
                    innerPath.setAttributeNS(
                        null,
                        "d",
                        "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
                    );
                    innerSVG.appendChild(innerPath);
                    // Inner Date SVG Element - END

                    // Inner Date Span Time Difference Element - START
                    var startDate = element["start-date"],
                        endDate = element["end-date"];
                    var innerDateTimeDiv = document.createElement("div");
                    innerDateTimeDiv.setAttribute("class", "Date");
                    innerDateTimeDiv.setAttribute("start-date", startDate);
                    innerDateTimeDiv.setAttribute("end-date", endDate);
                    // Inner Date Span Time Difference Element - END

                    innerDateSpanTimeDiff.appendChild(innerSVG);
                    innerDateSpanTimeDiff.appendChild(innerDateTimeDiv);
                    // Inner Date Span for Time Difference Calculation Element - END

                    // Inner Date Span Time Frame Element - START\
                    var startDateStr =
                        startDate == "Current"
                            ? "Current"
                            : startDate == ""
                            ? ""
                            : moment(startDate).format("MMMM") +
                            " " +
                            moment(startDate).format("YYYY");
                    var endDateStr =
                        endDate == "Current"
                            ? "Current"
                            : startDate == ""
                            ? ""
                            : moment(endDate).format("MMMM") +
                            " " +
                            moment(endDate).format("YYYY");
                    var innerDateSpanRangeText = startDateStr + " - " + endDateStr;
                    var innerDateSpanRange = document.createElement("span");
                    innerDateSpanRange.setAttribute(
                        "class",
                        "inline-flex items-center leading-none text-sm"
                    );
                    innerDateSpanRange.append(innerDateSpanRangeText);

                    innerDateMainDiv.appendChild(innerDateSpanTimeDiff);
                    innerDateMainDiv.appendChild(innerDateSpanRange);
                    // Inner Date Span Time Frame Element - END

                    innerMainDiv.appendChild(innerDateMainDiv);
                // Inner Date Elements - END
                
                // Creating Inner DIV Element - END

                mainSection.appendChild(innerMainDiv);
                // Creating Inner Main Div - END
                // creating work profile overview - END

                document.getElementById("specific").appendChild(mainSection);
            });

            const dateElements = document.getElementsByClassName("Date");

            for (let i = 0; i < dateElements.length; i++) {
                const dateElement = dateElements[i];
                var startDate, endDate;

                for (let j = 0; j < dateElement.attributes.length; j++) {
                    const att = dateElement.attributes[j];
                    if (att.nodeValue == "") {
                        startDate = endDate = moment();
                        break;
                    }

                    if (att.nodeName == "start-date") {
                        startDate =
                            att.nodeValue == "Current"
                                ? moment()
                                : moment(att.nodeValue);
                    } else if (att.nodeName == "end-date") {
                        endDate =
                            att.nodeValue == "Current"
                                ? moment()
                                : moment(att.nodeValue);
                    }
                }

                var years = endDate.diff(startDate, "years");
                var months = endDate.diff(startDate, "months");
                if (years >= 1) {
                    months -= years * 12;
                }
                dateElement.innerHTML =
                    years < 1
                        ? months + " mos"
                        : years + " yr " + months + " mos+";
            }
        });
}
loadRecentWorkOverview();
