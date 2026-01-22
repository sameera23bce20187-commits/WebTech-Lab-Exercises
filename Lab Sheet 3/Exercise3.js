// 1. Data Structure: Define the questions
const questions = [
    {
        id: "age",
        label: "What is your age?",
        type: "number",
        required: true
    },
    {
        id: "dob",
        label: "Date of Birth",
        type: "date",
        required: true,
        isHidden: true // Hidden initially
    },
    {
        id: "sex",
        label: "Sex",
        type: "select",
        options: ["Male", "Female", "Other"],
        required: true,
        isHidden: true // Hidden initially
    },
    {
        id: "ask_rating",
        label: "Would you like to give a rating?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
        isHidden: true // Hidden initially
    },
    {
        id: "rating",
        label: "Rate us (1-5)",
        type: "number",
        required: true,
        isHidden: true // Hidden initially
    }
];

const container = document.getElementById('questionsContainer');
const form = document.getElementById('dynamicForm');

// 2. Generate HTML inputs based on the data
function renderForm() {
    questions.forEach(q => {
        // Create a wrapper div for each question
        const wrapper = document.createElement('div');
        wrapper.className = 'form-group';
        wrapper.id = 'group-' + q.id; // e.g., group-age, group-dob
        
        // Hide if the data says it is hidden
        if (q.isHidden) {
            wrapper.classList.add('hidden');
        }

        // Create Label
        const label = document.createElement('label');
        label.textContent = q.label;
        wrapper.appendChild(label);

        // Create Input based on Type
        if (q.type === 'select') {
            const select = document.createElement('select');
            select.id = q.id;
            q.options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                select.appendChild(option);
            });
            wrapper.appendChild(select);
        }
        else if (q.type === 'radio') {
            q.options.forEach(opt => {
                const radioLabel = document.createElement('span');
                radioLabel.className = 'radio-option';
                
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = q.id;
                radio.value = opt;
                
                radioLabel.appendChild(radio);
                radioLabel.appendChild(document.createTextNode(" " + opt));
                wrapper.appendChild(radioLabel);
            });
        }
        else {
            // Text, Number, Date
            const input = document.createElement('input');
            input.type = q.type;
            input.id = q.id;
            wrapper.appendChild(input);
        }

        // Add error message placeholder
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-text';
        errorDiv.id = 'error-' + q.id;
        wrapper.appendChild(errorDiv);

        container.appendChild(wrapper);
    });
}

// 3. Logic to Expand Form (The "Brain")
function handleLogic() {
    const ageInput = document.getElementById('age');
    const ageVal = parseInt(ageInput.value);
    
    // Logic: Age Check
    const dobGroup = document.getElementById('group-dob');
    const sexGroup = document.getElementById('group-sex');
    const askRatingGroup = document.getElementById('group-ask_rating');
    const ratingGroup = document.getElementById('group-rating');
    const ageError = document.getElementById('error-age');

    // Reset visibility logic first
    if (ageInput.value && ageVal < 18) {
        ageError.textContent = "You must be 18+ to proceed.";
        dobGroup.classList.add('hidden');
        sexGroup.classList.add('hidden');
        askRatingGroup.classList.add('hidden');
        ratingGroup.classList.add('hidden');
        return; // Stop here
    } else {
        ageError.textContent = ""; // Clear error
    }

    if (ageVal >= 18) {
        // Expand Step 1: Show DOB, Sex, and Ask Rating
        dobGroup.classList.remove('hidden');
        sexGroup.classList.remove('hidden');
        askRatingGroup.classList.remove('hidden');

        // Logic: Rating Check
        // Find which radio button is checked
        const yesRadio = document.querySelector('input[name="ask_rating"][value="Yes"]');
        
        if (yesRadio && yesRadio.checked) {
            ratingGroup.classList.remove('hidden');
        } else {
            ratingGroup.classList.add('hidden');
        }
    } else {
        // If age is empty or invalid, hide everything dependent
        dobGroup.classList.add('hidden');
        sexGroup.classList.add('hidden');
        askRatingGroup.classList.add('hidden');
        ratingGroup.classList.add('hidden');
    }
}

// 4. Listen for user input
form.addEventListener('input', handleLogic); // Detects typing
form.addEventListener('change', handleLogic); // Detects radio/select changes

// 5. Submit Validation
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple check: Are visible fields empty?
    const allGroups = document.querySelectorAll('.form-group');
    let isValid = true;

    allGroups.forEach(group => {
        // Only validate if the group is visible
        if (!group.classList.contains('hidden')) {
            const input = group.querySelector('input, select');
            // If it's radio buttons, check if one is checked
            if(input.type === 'radio') {
               const name = input.name;
               const checked = document.querySelector(`input[name="${name}"]:checked`);
               if(!checked) isValid = false;
            } 
            // If it's standard input
            else if (!input.value) {
                isValid = false;
            }
        }
    });

    if(isValid) {
        alert("Success! Form Submitted.");
    } else {
        alert("Please fill out all visible fields.");
    }
});

// Run on load
renderForm();