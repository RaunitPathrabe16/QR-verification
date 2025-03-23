function verifyCertificate() {
    let internID = document.getElementById("internID").value;

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let certificate = data.find(cert => cert.internID === internID);
            if (certificate) {
                document.getElementById("output").innerHTML = `
                    <h3>✅ Certificate Verified</h3>
                    <p><b>Name:</b> ${certificate.name}</p>
                    <p><b>Start Date:</b> ${certificate.startDate}</p>
                    <p><b>End Date:</b> ${certificate.endDate}</p>
                    <p><b>Issue Date:</b> ${certificate.issueDate}</p>
                    <p><b>Duration:</b> ${certificate.duration}</p>
                    <p><b>Status:</b> ${certificate.status}</p>
                    <p><a href="${certificate.certificateLink}" target="_blank">📜 View Certificate</a></p>
                `;
            } else {
                document.getElementById("output").innerHTML = "<p style='color:red;'>❌ Certificate Not Found</p>";
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

function generateQRCode() {
    let internID = document.getElementById("internID").value;
    if (internID === "") {
        alert("Please enter an Intern ID first!");
        return;
    }
    let qrText = `http://localhost:5500/index.html?internID=${internID}`; // Change URL if hosted online
    document.getElementById("qrcode").innerHTML = "";  
    new QRCode(document.getElementById("qrcode"), {
        text: qrText,
        width: 128,
        height: 128
    });
}

