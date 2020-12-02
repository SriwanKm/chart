function loadDoc() {
    const xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            myFunction(this);
        }
    }

    xHttp.open("GET", "customers.xml", true);
    xHttp.send();
}

function myFunction(xml) {
    const xmlDoc = xml.responseXML;
    let header = "<tr><th>Cust ID</th><th> First Name </th><th> Last Name </th><th> Gender </th><th> City </th><th> State </th></tr>"
    const customersOut = xmlDoc.getElementsByTagName("customersOutXml")
    const columns = ["CustID", "FirstName", "LastName", "gender", "City", "State"]

    let rows = ""
    let allIdCount = {}

    Array.prototype.map.call(customersOut, (element, index) => {
            let row = "<tr><td>"

            columns.forEach(tagName => {
                    let nodeValue = element.getElementsByTagName(tagName)[0].childNodes[0].nodeValue
                    if (index === customersOut.length - 1 && tagName === "State") {
                        row += nodeValue + "</td></tr>"
                    } else if (tagName === "State") {
                        row += nodeValue + "</td>"

                    } else if (tagName === "CustID") {
                        let id = nodeValue.substr(0, 1)
                        allIdCount[id] ? allIdCount[id]++ : allIdCount[id] = 1
                        row += nodeValue + "</td><td>"
                    } else {
                        row += nodeValue + "</td><td>"
                    }
                }
            )
            rows += row
        }
    )
    //{"OH": 66, "MI": 1}
    //[["OH", 66], ["MI", 1]]
    //["OH: 66", "MI: 1"]
    // "OH: 66 MI: 1"
    const idAnnouncement = document.createElement("h2")

    let idAnnouncementText = Object.entries(allIdCount).map(([idLetter, number]) => {
        return `${number} ${idLetter}ID | `
    }).join(" ")

    idAnnouncement.innerHTML = "There are " + idAnnouncementText
    document.body.append(idAnnouncement)

    const demoTable = document.createElement("table")
    demoTable.id = "demo"
    document.body.append(demoTable)
    document.getElementById("demo").innerHTML = header + rows

    function getBars(idObject) {
        console.log(idObject);
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
        let cusId = ""

        for (let i = 0; i < letters.length; i++) {
            let y = i * 20 + 10
            let upperLetter = letters[i]
            if (idObject[upperLetter]) {

                let cusNumForEachId = idObject[upperLetter] ? idObject[upperLetter] : 0

                cusId += `<g transform= translate(50,${y})>
                       <text x="0" y="9.5" dy=".35em"> ${upperLetter}ID</text>
                       <rect width=${cusNumForEachId * 10} height="19"></rect>
                       <text x="${cusNumForEachId * 10 - 3}" y="9.5" dy=".35em">${cusNumForEachId}</text>
                   </g>`
            } else {
                // console.log(upperLetter);
                cusId += `<g transform= translate(50,${y})>
                           <text x="0" y="9.5" dy=".35em"> ${upperLetter}ID</text>
                           <rect width="1" height="19"></rect>
                           <text x="20" y="9.5" dy=".35em">0</text>
                       </g>`
            }
        }
        return cusId
    }

    const svgTag = document.createElement("div")
    svgTag.innerHTML = `<svg>${getBars(allIdCount)}</svg>`
    console.log(svgTag);
    // svgTag.innerHTML = "<svg>\n" +
    //     "    <g transform=\"translate(50,10)\">\n" +
    //     "        <text x=\"0\" y=\"9.5\" dy=\".35em\">AID</text>\n" +
    //     "        <rect width=\"50\" height=\"19\"></rect>\n" +
    //     "        <text x=\"47\" y=\"9.5\" dy=\".35em\">5</text>\n" +
    //     "    </g>\n" +
    //     "    <g transform=\"translate(50,30)\">\n" +
    //     "        <text x=\"0\" y=\"9.5\" dy=\".35em\">AID</text>\n" +
    //     "        <rect width=\"1\" height=\"19\"></rect>\n" +
    //     "        <text x=\"20\" y=\"9.5\" dy=\".35em\">10</text>\n" +
    //     "    </g>\n" +
    //     "    <g transform=\"translate(50,50)\">\n" +
    //     "        <text x=\"0\" y=\"9.5\" dy=\".35em\">AID</text>\n" +
    //     "        <rect width=\"120\" height=\"19\"></rect>\n" +
    //     "        <text x=\"117\" y=\"9.5\" dy=\".35em\">12</text>\n" +
    //     "    </g>\n" +
    //     "\n" +
    //     "    <g transform=\"translate(50,70)\">\n" +
    //     "        <text x=\"0\" y=\"9.5\" dy=\".35em\">AID</text>\n" +
    //     "        <rect width=\"120\" height=\"19\"></rect>\n" +
    //     "        <text x=\"117\" y=\"9.5\" dy=\".35em\">12</text>\n" +
    //     "    </g>\n" +
    //     "</svg>\n"
    document.body.append(svgTag)
}
