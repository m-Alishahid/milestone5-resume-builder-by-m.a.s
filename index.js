
var _a;

(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    // Collect form data
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var summary = document.getElementById('summary').value;
    var skills = document.getElementById('skills').value;
    var experience = document.getElementById('experience').value;
    var education = document.getElementById('education').value;
    var certifications = document.getElementById('certifications').value;
    // Validation check
    if (!name || !email || !phone || !address || !summary || !skills) {
        alert('Please fill in all required fields.');
        return;
    }
    // Get profile picture if uploaded
    var profilePicInput = document.getElementById('profile-pic');
    var profilePicUrl = '';
    if (profilePicInput.files && profilePicInput.files[0]) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            profilePicUrl = reader_1.result;
            generateResume();
        };
        reader_1.readAsDataURL(profilePicInput.files[0]);
    }
    else {
        generateResume();
    }
    // Function to generate the resume
    function generateResume() {
        var resumeOutput = document.getElementById('resume-output');
        resumeOutput.style.display = 'flex'; // Use flexbox for side-by-side layout
        resumeOutput.style.justifyContent = 'space-between'; // Space between left and right sections
        resumeOutput.innerHTML = "\n            <div class=\"left-section\">\n                ".concat(profilePicUrl ? "<img src=\"".concat(profilePicUrl, "\" alt=\"Profile Picture\" style=\"width: 100px; height: 100px; border-radius: 50%;\">") : '', "\n                <h2>").concat(name, "</h2>\n                <p>Email: ").concat(email, "</p>\n                <p>Phone: ").concat(phone, "</p>\n                <p>Address: ").concat(address, "</p>\n                <h3>Professional Summary</h3>\n                <p>").concat(summary, "</p>\n            </div>\n            <div class=\"right-section\">\n                <h3>Skills</h3>\n                <p>").concat(skills, "</p>\n                <h3>Experience</h3>\n                <p>").concat(experience, "</p>\n                <h3>Education</h3>\n                <p>").concat(education, "</p>\n                <h3>Certifications</h3>\n                <p>").concat(certifications, "</p>\n            </div>\n        ");
        // Show edit and download buttons
        document.getElementById('edit-section').style.display = 'flex';
        // Edit button functionality
        document.getElementById('edit-btn').addEventListener('click', function () {
            document.getElementById('resume-form').style.display = 'block';
            document.getElementById('edit-section').style.display = 'none';
            window.scrollTo(0, 0);
        });
        // Download button functionality
        document.getElementById('download-btn').addEventListener('click', function () {
            downloadResumeAsPDF();
        });
    }
    // Function to trigger Print dialog (Save as PDF)
    function downloadResumeAsPDF() {
        var resumeContent = document.getElementById('resume-output');
        // For better print formatting, we add styles to hide unnecessary elements
        document.getElementById('resume-form').style.display = 'none'; // Hide the form
        document.getElementById('edit-section').style.display = 'none'; // Hide edit section
        // Open the browser's print dialog
        window.print();
        // After print, reset the display
        setTimeout(function () {
            document.getElementById('resume-form').style.display = 'block';
            document.getElementById('edit-section').style.display = 'flex';
        }, 100);
    }
});
