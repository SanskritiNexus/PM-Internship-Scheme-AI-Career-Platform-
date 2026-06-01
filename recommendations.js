/**
 * Recommendations System for PM Internship Scheme
 * This file contains functions for generating internship and course recommendations
 */

// Function to generate internship recommendations
function generateInternshipRecommendations(skills, jobTitle) {
    const internshipContainer = document.getElementById('internship-recommendations');
    if (!internshipContainer) return;
    
    internshipContainer.innerHTML = ''; // Clear previous recommendations
    
    // Sample internship data (in a real app, this would come from an API)
    const internships = [
        {
            title: "Software Development Intern",
            company: "Microsoft",
            duration: "3 months",
            skills: ["JavaScript", "React", "Node.js"],
            match: "95%"
        },
        {
            title: "Data Science Intern",
            company: "Google",
            duration: "6 months",
            skills: ["Python", "Machine Learning", "Data Analysis"],
            match: "90%"
        },
        {
            title: "UX/UI Design Intern",
            company: "Adobe",
            duration: "4 months",
            skills: ["UI Design", "Figma", "User Research"],
            match: "85%"
        },
        {
            title: "Product Management Intern",
            company: "Amazon",
            duration: "3 months",
            skills: ["Product Strategy", "Market Research", "Agile"],
            match: "80%"
        }
    ];
    
    // Filter and display relevant internships based on skills and job title
    const relevantInternships = internships.filter(internship => {
        // Simple matching algorithm - in a real app, this would be more sophisticated
        return internship.skills.some(skill => 
            skills.some(userSkill => 
                skill.toLowerCase().includes(userSkill.toLowerCase()) || 
                userSkill.toLowerCase().includes(skill.toLowerCase())
            )
        );
    });
    
    // Display internships (show all if no matches or limited form data)
    const internshipsToShow = relevantInternships.length > 0 ? relevantInternships : internships;
    
    // Display up to 3 internships
    internshipsToShow.slice(0, 3).forEach(internship => {
        const internshipElement = document.createElement('div');
        internshipElement.className = 'recommendation-item';
        internshipElement.innerHTML = `
            <h5>${internship.title}</h5>
            <p><strong>Company:</strong> ${internship.company}</p>
            <p><strong>Duration:</strong> ${internship.duration}</p>
            <p><strong>Required Skills:</strong> ${internship.skills.join(', ')}</p>
            <div class="badge">Match: ${internship.match}</div>
        `;
        internshipContainer.appendChild(internshipElement);
    });
}

// Function to generate course recommendations
function generateCourseRecommendations(skills, education) {
    const courseContainer = document.getElementById('course-recommendations');
    if (!courseContainer) return;
    
    courseContainer.innerHTML = ''; // Clear previous recommendations
    
    // Sample course data (in a real app, this would come from an API)
    const courses = [
        {
            title: "Advanced Web Development",
            platform: "Udemy",
            duration: "10 weeks",
            skills: ["JavaScript", "React", "Node.js", "Full Stack"],
            level: "Intermediate"
        },
        {
            title: "Data Science Bootcamp",
            platform: "Coursera",
            duration: "12 weeks",
            skills: ["Python", "Machine Learning", "Data Analysis", "Statistics"],
            level: "Beginner to Intermediate"
        },
        {
            title: "UX/UI Design Masterclass",
            platform: "Skillshare",
            duration: "8 weeks",
            skills: ["UI Design", "Figma", "User Research", "Prototyping"],
            level: "All Levels"
        },
        {
            title: "Product Management Essentials",
            platform: "edX",
            duration: "6 weeks",
            skills: ["Product Strategy", "Market Research", "Agile", "Leadership"],
            level: "Intermediate"
        }
    ];
    
    // Filter and display relevant courses based on skills
    const relevantCourses = courses.filter(course => {
        // Simple matching algorithm - in a real app, this would be more sophisticated
        return course.skills.some(skill => 
            skills.some(userSkill => 
                skill.toLowerCase().includes(userSkill.toLowerCase()) || 
                userSkill.toLowerCase().includes(skill.toLowerCase())
            )
        );
    });
    
    // Display courses (show all if no matches or limited form data)
    const coursesToShow = relevantCourses.length > 0 ? relevantCourses : courses;
    
    // Display up to 3 courses
    coursesToShow.slice(0, 3).forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'recommendation-item';
        courseElement.innerHTML = `
            <h5>${course.title}</h5>
            <p><strong>Platform:</strong> ${course.platform}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Skills Covered:</strong> ${course.skills.join(', ')}</p>
            <div class="badge">${course.level}</div>
        `;
        courseContainer.appendChild(courseElement);
    });
}

// Function to initialize recommendations on any page
function initRecommendations() {
    // Check if we're on a page with recommendations section
    const recommendationsSection = document.getElementById('recommendations-section');
    if (!recommendationsSection) return;
    
    // Get generate resume button if it exists
    const generateResumeBtn = document.getElementById('generate-resume');
    if (generateResumeBtn) {
        generateResumeBtn.addEventListener('click', function() {
            // Show recommendations section when resume is generated
            recommendationsSection.style.display = 'block';
            
            // Get form data to generate personalized recommendations
            const skills = document.getElementById('skills')?.value.split(',').map(skill => skill.trim()) || [];
            const education = document.getElementById('education')?.value || '';
            const jobTitle = document.getElementById('job-title')?.value || '';
            
            // Generate recommendations based on form data
            generateInternshipRecommendations(skills, jobTitle);
            generateCourseRecommendations(skills, education);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initRecommendations);