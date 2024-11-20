document.getElementById('resume-form')?.addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect form data
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const summary = (document.getElementById('summary') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const certifications = (document.getElementById('certifications') as HTMLTextAreaElement).value;

    // Validation check
    if (!name || !email || !phone || !address || !summary || !skills) {
        alert('Please fill in all required fields.');
        return;
    }

    // Get profile picture if uploaded
    const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
    let profilePicUrl = '';
    if (profilePicInput.files && profilePicInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function () {
            profilePicUrl = reader.result as string;
            generateResume();
        };
        reader.readAsDataURL(profilePicInput.files[0]);
    } else {
        generateResume();
    }

    // Function to generate the resume
    function generateResume() {
        const resumeOutput = document.getElementById('resume-output')!;
        resumeOutput.style.display = 'flex'; // Use flexbox for side-by-side layout
        resumeOutput.style.justifyContent = 'space-between'; // Space between left and right sections

        resumeOutput.innerHTML = `
            <div class="left-section">
                ${profilePicUrl ? `<img src="${profilePicUrl}" alt="Profile Picture" style="width: 100px; height: 100px; border-radius: 50%;">` : ''}
                <h2>${name}</h2>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <p>Address: ${address}</p>
                <h3>Professional Summary</h3>
                <p>${summary}</p>
            </div>
            <div class="right-section">
                <h3>Skills</h3>
                <p>${skills}</p>
                <h3>Experience</h3>
                <p>${experience}</p>
                <h3>Education</h3>
                <p>${education}</p>
                <h3>Certifications</h3>
                <p>${certifications}</p>
            </div>
        `;

        // Show edit and download buttons
        document.getElementById('edit-section')!.style.display = 'flex';

        // Edit button functionality
        document.getElementById('edit-btn')!.addEventListener('click', () => {
            document.getElementById('resume-form')!.style.display = 'block';
            document.getElementById('edit-section')!.style.display = 'none';
            window.scrollTo(0, 0);
        });

        // Download button functionality
        document.getElementById('download-btn')!.addEventListener('click', () => {
            downloadResumeAsPDF();
        });
    }

    // Function to trigger Print dialog (Save as PDF)
    function downloadResumeAsPDF() {
        const resumeContent = document.getElementById('resume-output')!;

        // For better print formatting, we add styles to hide unnecessary elements
        document.getElementById('resume-form')!.style.display = 'none'; // Hide the form
        document.getElementById('edit-section')!.style.display = 'none'; // Hide edit section

        // Open the browser's print dialog
        window.print();

        // After print, reset the display
        setTimeout(() => {
            document.getElementById('resume-form')!.style.display = 'block';
            document.getElementById('edit-section')!.style.display = 'flex';
        }, 100);
    }
});