function showForm(formId) {
    const forms = document.querySelectorAll(".qr-form");
    
    forms.forEach((form) => {
        form.style.display = "none";
        form.reset();
    });

    document.getElementById(formId).style.display = "block";
    
    const qrCodeContainer = document.getElementById("qr-code");
    
    qrCodeContainer.innerHTML = "";

    const buttons = document.querySelectorAll(".options button");
    
    buttons.forEach((button) => {
        button.classList.remove("active");
    });

    document.querySelector(`.options button[onclick="showForm('${formId}')"]`).classList.add("active");
}

function clearQRCode() {
    const qrCodeContainer = document.getElementById("qr-code");

    if (qrCodeContainer.innerHTML === "") {
        alert("QR Code is already empty.")
        return;
    }
    
    qrCodeContainer.innerHTML = "";

    const visibleForm = document.querySelector(
        '.qr-form[style="display: block;"]'
    );

    if (visibleForm) {
        visibleForm.reset();
    }

    document.getElementById("qr-color").value = "#000000";
    document.getElementById("qr-bg-color").value = "#ffffff";
    document.getElementById("qr-color-hex").value = "#000000";
    document.getElementById("qr-bg-color-hex").value = "#ffffff";
}

function validateForm(formId) {
    let isValid = true;
    let errorMessage = "";
    
    switch (formId) {
        case "link":
            const linkUrl = document.getElementById("link-url").value;
            
            if (!linkUrl || !/^https?:\/\/[^\s]+$/.test(linkUrl)) {
                errorMessage = "Please enter a valid URL (eg,. https://example.com).";
                isValid = false;
            }
            
            break;

        case "email":
            const email = document.getElementById("email-address").value;
            
            if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                errorMessage = "Please enter a valid email address.";
                isValid = false;
            }
            
            break;

        case "text":
            const textMessage = document.getElementById("text-message").value;
            
            if (!textMessage) {
                errorMessage = "Please enter a text message.";
                isValid = false;
            }
            
            break;

        case "call":
            const callNumber = document.getElementById("call-number").value;
            
            if (!callNumber || !/^\+?\d{10,15}$/.test(callNumber)) {
                errorMessage = "Please enter a valid phone number";
                isValid = false;
            }
            
            break;

        case "sms":
            const smsNumber = document.getElementById("sms-number").value;
            
            if (!smsNumber || !/^\+?\d{10,15}$/.test(smsNumber)) {
                errorMessage = "Please enter a valid phone number for SMS.";
                isValid = false;
            }
            
            break;

        case "whatsapp":
            const whatsappNumber = document.getElementById("whatsapp-number").value;
            
            if (!whatsappNumber || !/^\+?\d{10,15}$/.test(whatsappNumber)) {
                errorMessage = "Please enter a valid Whatsapp number.";
                isValid = false;
            }
            
            break;

        case "wifi":
            const wifiSSID = document.getElementById("wifi-ssid").value;
            
            const wifiPassword = document.getElementById("wifi-password").value;

            if (!wifiSSID) {
                errorMessage = "Please enter a WiFi SSID";
                isValid = false;
            }

            if (!wifiPassword) {
                errorMessage = "Please enter a WiFi password.";
                isValid = false;
            }
            
            break;

        case "event":
            const eventTitle = document.getElementById("event-title").value;
            const eventStartDate = document.getElementById("event-start-date").value;
            const eventEndDate = document.getElementById("event-end-date").value;
            const eventLocation = document.getElementById("event-location").value;

            if (!eventTitle) {
                errorMessage = "Please enter an event Title.";
                isValid = false;
            } else if (!eventStartDate) {
                errorMessage = "Please enter a start date for the event.";
                isValid = false;
            } else if (!eventEndDate) {
                errorMessage = "Please enter a end date for the event.";
                isValid = false;
            } else if (!eventLocation) {
                errorMessage = "Please enter a location for the event.";
                isValid = false;
            } else if (new Date(eventStartDate) > new Date(eventEndDate)) {
                errorMessage = "Event start date cannot be later than end date.";
                isValid = false;
            }
            
            break;

        case "social-media":
            const socialMediaUrl = document.getElementById("social-media-url").value;

            if (!socialMediaUrl || !/^https?:\/\/[^\s]+$/.test(socialMediaUrl)) {
                errorMessage = "Please enter a valid social media URL (e.g., https://facebook.com).";
                isValid = false;
            }

            break;

        default:
            isValid = true;
    }

    if (!isValid) {
        alert(errorMessage);
    }

    return isValid;
}

function generateQRCode() {
    const qrCodeContainer = document.getElementById("qr-code");
    
    qrCodeContainer.innerHTML = "";

    const visibleForm = document.querySelector(
        '.qr-form[style="display: block;"]'
    );

    if (!visibleForm) {
        alert("Please give information to generate a QR Code");
        return;
    }

    const formId = visibleForm.id;

    if (!validateForm(formId)) {
        alert("Given details are not valid, please check and try again.");
        return;
    }

    const qrColor = "black";
    
    const qrBgColor = "white";

    let qrData = "";

    switch(formId) {
        case "link":
            qrData = document.getElementById("link-url").value;
            break;
        
        case "email":
            const emailAddress = document.getElementById("email-address").value;
            const emailSubject = document.getElementById("email-subject").value;
            const emailMessage = document.getElementById("email-message").value;
            qrData = `mailto:${emailAddress}?subject=${encodeURIComponent(
                emailSubject
            )}&body=${encodeURIComponent(emailMessage)}`;
            break;

        case "text":
            qrData = document.getElementById("text-message").value;
            break;

        case "call":
            const callNumber = document.getElementById("call-number").value;
            qrData = `tel:${callNumber}`;
            break;

        case "sms":
            const smsNumber = document.getElementById("sms-number").value;
            const smsMessage = document.getElementById("sms-message").value;
            qrData = `sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}`;
            break;

        case "whatsapp":
            const whatsappNumber = document.getElementById("whatsapp-number").value;
            qrData = `https://wa.me/${whatsappNumber}`;
            break;

        case "wifi":
            const wifiSSID = document.getElementById("wifi-ssid").value;
            const wifiPassword = document.getElementById("wifi-password").value;
            qrData = `WIFI:S:${wifiSSID};T:WPA;P:${wifiPassword};`;
            break;

        case "event":
            const eventTitle = document.getElementById("event-title").value;

            const eventStartDate = document
                .getElementById("event-start-date")
                .value.replace(/-/g, "");

            const eventEndDate = document
                .getElementById("event-end-date")
                .value.replace(/-/g, "");

            const eventLocation = document.getElementById("event-location").value;

            qrData = `BEGIN:VCALENDAR\nBEGIN:VEVENT\nSUMMARY:${eventTitle}\nDTSTART:${eventStartDate}T000000Z\nDTEND:${eventEndDate}T235959Z\nLOCATION:${eventLocation}\nEND:VEVENT\nEND:VCALENDAR`;
            break;

        case "social-media":
            const socialMediaUrl = document.getElementById("social-media-url").value;
            qrData = socialMediaUrl;
            break;

        default:
            qrData = "";
    }

    new QRCode(qrCodeContainer, {
        text: qrData,
        width: 200,
        height: 200,
        colorDark: qrColor,
        colorLight: qrBgColor,
        correctLevel: QRCode.CorrectLevel.H,
    });
}

function downloadQRCode() {
    const qrCodeContainer = document.getElementById("qr-code").querySelector("img");
  
    if (qrCodeContainer) {
      const link = document.createElement("a");
      link.href = qrCodeContainer.src;
      link.download = "qr_code.png";
      link.click();
    } else {
      alert("Please generate a QR Code first.");
    }
}