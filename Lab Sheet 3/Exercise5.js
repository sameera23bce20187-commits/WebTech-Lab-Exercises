// Application state object
const applicationData = {
    identity: {
        fullName: '',
        email: '',
        phone: ''
    },
    professional: {
        githubUrl: '',
        experience: '',
        skills: []
    },
    security: {
        password: '',
        confirmPassword: ''
    }
};

// Current stage tracker
let currentStage = 1;
const totalStages = 4;

// Stage titles
const stageTitles = {
    1: 'Identity',
    2: 'Professional Profile',
    3: 'Account Security',
    4: 'Review & Submit'
};

// DOM elements
const wizardContent = document.getElementById('wizardContent');
const progressBar = document.getElementById('progressBar');
const stageText = document.getElementById('stageText');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Initialize the wizard
function init() {
    renderStage(currentStage);
    updateProgress();
}

// Render the current stage
function renderStage(stage) {
    wizardContent.innerHTML = '';
    
    switch(stage) {
        case 1:
            renderStage1();
            break;
        case 2:
            renderStage2();
            break;
        case 3:
            renderStage3();
            break;
        case 4:
            renderStage4();
            break;
    }
    
    updateNavigation();
}

// Stage 1: Identity
function renderStage1() {
    wizardContent.innerHTML = `
        <div class="form-group">
            <label for="fullName">Full Name *</label>
            <input type="text" id="fullName" value="${applicationData.identity.fullName}" placeholder="Enter your full name">
            <div class="error-message" id="fullNameError"></div>
        </div>
        
        <div class="form-group">
            <label for="email">Email Address *</label>
            <input type="email" id="email" value="${applicationData.identity.email}" placeholder="example@email.com">
            <div class="error-message" id="emailError"></div>
        </div>
        
        <div class="form-group">
            <label for="phone">Phone Number *</label>
            <input type="tel" id="phone" value="${applicationData.identity.phone}" placeholder="1234567890 (10 digits)">
            <div class="error-message" id="phoneError"></div>
        </div>
    `;
    
    // Add event listeners
    document.getElementById('fullName').addEventListener('input', (e) => {
        applicationData.identity.fullName = e.target.value;
        clearError('fullName');
    });
    
    document.getElementById('email').addEventListener('input', (e) => {
        applicationData.identity.email = e.target.value;
        clearError('email');
    });
    
    document.getElementById('phone').addEventListener('input', (e) => {
        applicationData.identity.phone = e.target.value;
        clearError('phone');
    });
}

// Stage 2: Professional Profile
function renderStage2() {
    const skillsOptions = ['HTML', 'CSS', 'JS', 'React', 'Node'];
    const checkedSkills = applicationData.professional.skills;
    
    wizardContent.innerHTML = `
        <div class="form-group">
            <label for="githubUrl">GitHub Profile URL *</label>
            <input type="url" id="githubUrl" value="${applicationData.professional.githubUrl}" placeholder="https://github.com/username">
            <div class="error-message" id="githubUrlError"></div>
        </div>
        
        <div class="form-group">
            <label for="experience">Years of Experience *</label>
            <input type="number" id="experience" value="${applicationData.professional.experience}" placeholder="Enter years of experience" min="0">
            <div class="error-message" id="experienceError"></div>
        </div>
        
        <div class="form-group">
            <label>Technical Skills * (Select at least 2)</label>
            <div class="checkbox-group" id="skillsCheckboxes">
                ${skillsOptions.map(skill => `
                    <div class="checkbox-item">
                        <input type="checkbox" id="skill${skill}" value="${skill}" ${checkedSkills.includes(skill) ? 'checked' : ''}>
                        <label for="skill${skill}">${skill}</label>
                    </div>
                `).join('')}
            </div>
            <div class="error-message" id="skillsError"></div>
        </div>
    `;
    
    // Add event listeners
    document.getElementById('githubUrl').addEventListener('input', (e) => {
        applicationData.professional.githubUrl = e.target.value;
        clearError('githubUrl');
    });
    
    document.getElementById('experience').addEventListener('input', (e) => {
        applicationData.professional.experience = e.target.value;
        clearError('experience');
    });
    
    // Skills checkboxes
    skillsOptions.forEach(skill => {
        document.getElementById(`skill${skill}`).addEventListener('change', (e) => {
            if (e.target.checked) {
                if (!applicationData.professional.skills.includes(skill)) {
                    applicationData.professional.skills.push(skill);
                }
            } else {
                applicationData.professional.skills = applicationData.professional.skills.filter(s => s !== skill);
            }
            clearError('skills');
        });
    });
}

// Stage 3: Account Security
function renderStage3() {
    wizardContent.innerHTML = `
        <div class="form-group">
            <label for="password">Password *</label>
            <input type="password" id="password" value="${applicationData.security.password}" placeholder="Enter password (min 8 characters)">
            <div class="error-message" id="passwordError"></div>
        </div>
        
        <div class="form-group">
            <label for="confirmPassword">Confirm Password *</label>
            <input type="password" id="confirmPassword" value="${applicationData.security.confirmPassword}" placeholder="Re-enter password">
            <div class="error-message" id="confirmPasswordError"></div>
        </div>
    `;
    
    // Add event listeners
    document.getElementById('password').addEventListener('input', (e) => {
        applicationData.security.password = e.target.value;
        clearError('password');
    });
    
    document.getElementById('confirmPassword').addEventListener('input', (e) => {
        applicationData.security.confirmPassword = e.target.value;
        clearError('confirmPassword');
    });
}

// Stage 4: Review & Submit
function renderStage4() {
    wizardContent.innerHTML = `
        <div class="review-section">
            <h3>Identity Information</h3>
            <div class="review-item">
                <div class="review-label">Full Name:</div>
                <div class="review-value">${applicationData.identity.fullName}</div>
            </div>
            <div class="review-item">
                <div class="review-label">Email:</div>
                <div class="review-value">${applicationData.identity.email}</div>
            </div>
            <div class="review-item">
                <div class="review-label">Phone:</div>
                <div class="review-value">${applicationData.identity.phone}</div>
            </div>
        </div>
        
        <div class="review-section">
            <h3>Professional Profile</h3>
            <div class="review-item">
                <div class="review-label">GitHub Profile:</div>
                <div class="review-value">${applicationData.professional.githubUrl}</div>
            </div>
            <div class="review-item">
                <div class="review-label">Years of Experience:</div>
                <div class="review-value">${applicationData.professional.experience} years</div>
            </div>
            <div class="review-item">
                <div class="review-label">Technical Skills:</div>
                <div class="review-value">
                    <div class="skills-list">
                        ${applicationData.professional.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="review-section">
            <h3>Account Security</h3>
            <div class="review-item">
                <div class="review-label">Password:</div>
                <div class="review-value">••••••••</div>
            </div>
        </div>
    `;
}

// Validation functions
function validateStage1() {
    let isValid = true;
    
    // Full Name validation
    if (!applicationData.identity.fullName.trim()) {
        showError('fullName', 'Full name is required');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!applicationData.identity.email.trim()) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(applicationData.identity.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation (exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!applicationData.identity.phone.trim()) {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!phoneRegex.test(applicationData.identity.phone)) {
        showError('phone', 'Phone number must be exactly 10 digits');
        isValid = false;
    }
    
    return isValid;
}

function validateStage2() {
    let isValid = true;
    
    // GitHub URL validation
    if (!applicationData.professional.githubUrl.trim()) {
        showError('githubUrl', 'GitHub URL is required');
        isValid = false;
    } else if (!applicationData.professional.githubUrl.startsWith('https://github.com/')) {
        showError('githubUrl', 'URL must start with https://github.com/');
        isValid = false;
    }
    
    // Experience validation
    if (!applicationData.professional.experience) {
        showError('experience', 'Years of experience is required');
        isValid = false;
    }
    
    // Skills validation (at least 2)
    if (applicationData.professional.skills.length < 2) {
        showError('skills', 'Please select at least 2 technical skills');
        isValid = false;
    }
    
    return isValid;
}

function validateStage3() {
    let isValid = true;
    
    // Password validation (>8 characters)
    if (!applicationData.security.password) {
        showError('password', 'Password is required');
        isValid = false;
    } else if (applicationData.security.password.length <= 8) {
        showError('password', 'Password must be more than 8 characters');
        isValid = false;
    }
    
    // Confirm password validation
    if (!applicationData.security.confirmPassword) {
        showError('confirmPassword', 'Please confirm your password');
        isValid = false;
    } else if (applicationData.security.password !== applicationData.security.confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        isValid = false;
    }
    
    return isValid;
}

// Error handling functions
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}Error`);
    
    if (field) {
        field.classList.add('error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}Error`);
    
    if (field) {
        field.classList.remove('error');
    }
    
    if (errorElement) {
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }
}

// Navigation functions
function updateNavigation() {
    // Update Previous button
    if (currentStage === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    
    // Update Next button text
    if (currentStage === totalStages) {
        nextBtn.textContent = 'Confirm Submission';
    } else {
        nextBtn.textContent = 'Next';
    }
}

function updateProgress() {
    const progress = (currentStage / totalStages) * 100;
    progressBar.style.width = `${progress}%`;
    stageText.textContent = `Stage ${currentStage} of ${totalStages}: ${stageTitles[currentStage]}`;
}

// Event listeners for navigation buttons
nextBtn.addEventListener('click', () => {
    let canProceed = false;
    
    // Validate current stage
    switch(currentStage) {
        case 1:
            canProceed = validateStage1();
            break;
        case 2:
            canProceed = validateStage2();
            break;
        case 3:
            canProceed = validateStage3();
            break;
        case 4:
            // Final submission
            console.log('Application Submitted:', JSON.stringify(applicationData, null, 2));
            alert('Application submitted successfully! Check console for the data.');
            return;
    }
    
    if (canProceed && currentStage < totalStages) {
        currentStage++;
        renderStage(currentStage);
        updateProgress();
    } else if (!canProceed) {
        alert('Please fix the errors before proceeding.');
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStage > 1) {
        currentStage--;
        renderStage(currentStage);
        updateProgress();
    }
});

// Initialize the application
init();