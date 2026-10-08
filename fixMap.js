const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'ananya.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224356.85923192592!2d77.23701088488971!3d28.522404036526275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1786345160037!5m2!1sen!2sin";

// Fix mapSrc in AppointmentSection
if (data.AnanyaMakeup.sections.AppointmentSection.variants.AnanyaAppointment1) {
    data.AnanyaMakeup.sections.AppointmentSection.variants.AnanyaAppointment1.mapSrc = mapUrl;
}

// Fix mapSrc in ContactSection
if (data.AnanyaMakeup.sections.ContactSection.variants.AnanyaContact1) {
    data.AnanyaMakeup.sections.ContactSection.variants.AnanyaContact1.mapSrc = mapUrl;
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log("Map URLs restored successfully in ananya.json");
