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


    function getBars(idObject) {
        console.log(idObject);
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
        let cusId = ""

        for (let i = 0; i < letters.length; i++) {
            let y = i * 20 + 10
            let upperLetter = letters[i]

                let cusNumForEachId = idObject[upperLetter] ? idObject[upperLetter] : 0
                let xValForText = idObject[upperLetter] ? idObject[upperLetter] * 30 - 3 : 20
                let rectWidth = idObject[upperLetter] ? idObject[upperLetter] * 30 : 1

                cusId += `<g transform= translate(50,${y})>
                       <text x="0" y="9.5" dy=".35em"> ${upperLetter}ID</text>
                       <rect width=${rectWidth} height="19"></rect>
                       <text x="${xValForText}" y="9.5" dy=".35em">${cusNumForEachId}</text>
                   </g>`

        }
        return cusId
    }

    const svgTag = document.createElement("div")
    svgTag.innerHTML = `<svg>${getBars(allIdCount)}</svg>`
    document.body.append(svgTag)



    const demoTable = document.createElement("table")
    demoTable.id = "demo"
    document.body.append(demoTable)
    document.getElementById("demo").innerHTML = header + rows
}
