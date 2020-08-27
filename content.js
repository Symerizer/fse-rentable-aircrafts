const assignmentsTableRows = document.querySelectorAll('.assignmentTable > tbody tr')

// Check for key
chrome.storage.sync.get("userkey", function (data) {
    if(data.userkey) {
        const userkey = data.userkey
        assignmentsTableRows.forEach(e => {
            e.cells[8].innerHTML = `<a class='fetchAircraftsBtn' data-icao=${e.cells[2].innerText}>Show me the planes</a>`
        })

        // Event management
        const fetchAircrafts = async (e) => {
            const icao = e.dataset.icao
            const url = `https://server.fseconomy.net/data?userkey=${userkey}&format=json&query=icao&search=aircraft&icao=${icao}`
            const parentTd = e.parentNode

            try {
                // Show loading
                parentTd.innerHTML = `<p>Loading...</p>`

                // Fetch data
                const response = await fetch(url)
                const data = await response.text()
                const xmlToDOM = await new window.DOMParser().parseFromString(data, "text/xml")

                if(xmlToDOM.getElementsByTagName("Error")[0]){
                    throw "Rate limited, try in 60 seconds."
                } else {
                    displayAircrafts(xmlToDOM, parentTd)
                }

            } catch (err) {
                // Show status
                parentTd.innerHTML = `<p style='color: red;'>Error while fetching the data: ${err}</p>`
            }
        }

        // Create table
        function get_table(data) {
            let result = ['<table border=1><thead><tr><td>Registration</td><td>Model</td><td>Rental Dry</td><td>Rental Wet</td><td>Equipment</td><td>Bonus</td><td>Home</td></tr></thead>'];
            for(let row of data) {
                result.push('<tr>');
                for(let cell of row){
                    result.push(`<td>${cell}</td>`);
                }
                result.push('</tr>');
            }
            result.push('</table>');
            return result.join('\n');
        }

        // Building table to display
        const displayAircrafts = (domData, cell) => {
            const parsedNodes = domData.getElementsByTagName("AircraftItems")[0].getElementsByTagName("Aircraft")
            const nodeArray = [...parsedNodes]
            const htmlTable = []

            nodeArray.map(e => {
                const rented = e.getElementsByTagName("RentedBy")[0].textContent
                const needsRepair = e.getElementsByTagName("NeedsRepair")[0].textContent
                const rentalDry = e.getElementsByTagName("RentalDry")[0].textContent
                const rentalWet = e.getElementsByTagName("RentalWet")[0].textContent
                const timeLast100Hrs = e.getElementsByTagName("TimeLast100hr")[0].textContent

                if(rented === "Not rented." && needsRepair === "0" && rentalDry !== "0.00" && rentalWet !== "0.00" && parseInt(timeLast100Hrs.split(":")[0]) < 100) {
                    htmlTable.push([
                        e.getElementsByTagName("Registration")[0].textContent,
                        e.getElementsByTagName("MakeModel")[0].textContent,
                        rentalDry,
                        rentalWet,
                        e.getElementsByTagName("Equipment")[0].textContent,
                        e.getElementsByTagName("Bonus")[0].textContent,
                        e.getElementsByTagName("Home")[0].textContent
                    ])
                }
            })

            if (htmlTable.length === 0) {
                cell.innerHTML = `<p>No rentable aircrafts at this airport.</p>`
            } else {
                cell.innerHTML = get_table(htmlTable)
            }
        }

        // Adding eventListeners to dynamic items
        const domButtons = document.getElementsByClassName('fetchAircraftsBtn')
        for (let item of domButtons) {
            item.addEventListener("click", function () {
                fetchAircrafts(this)
            }, true);
        }
    } else {
        assignmentsTableRows[0].cells[8].innerHTML = `<p style="color: red;">Please enter your userkey in the extension's option page.</p>`
    }
})


















