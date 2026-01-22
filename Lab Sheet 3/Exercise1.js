document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('regForm');
    const inputs = form.querySelectorAll('input');
    const roleSelect = document.getElementById('role');
    const passHint = document.getElementById('passHint');

    // Dynamic Areas
    const skillsGroup = document.getElementById('skillsGroup');
    const adminKeyGroup = document.getElementById('adminKeyGroup');

    // Rules Configuration
    const config = {
        student: {
            minAge: 10,
            passRegex: /^.{6,}$/, // Simple: 6 chars
            passDesc: "Min 6 characters",
            emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        teacher: {
            minAge: 21,
            passRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // 8 chars, letter+num
            passDesc: "Min 8 chars, letters & numbers",
            emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        admin: {
            minAge: 18,
            passRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/, // Strong
            passDesc: "Min 10 chars, Upper, Lower, Number & Symbol",
            emailRegex: /^[^\s@]+@admin\.com$/
        }
    };

    let currentRole = 'student';

    // 1. Handle Role Change
    roleSelect.addEventListener('change', (e) => {
        currentRole = e.target.value;
        const rules = config[currentRole];

        // Update Hint Text
        passHint.textContent = rules.passDesc;

        // Toggle Fields
        if (currentRole === 'admin') {
            skillsGroup.classList.add('hidden');       // Hide Skills
            adminKeyGroup.classList.remove('hidden');  // Show Admin Key
        } else {
            skillsGroup.classList.remove('hidden');    // Show Skills
            adminKeyGroup.classList.add('hidden');     // Hide Admin Key
        }

        // Re-validate fields to clear old errors
        inputs.forEach(input => {
            if (input.value !== "") validateField(input);
            else resetField(input);
        });
    });

    // 2. Add Event Listeners for Typing
    inputs.forEach(input => {
        input.addEventListener('input', () => validateField(input));
    });

    // 3. Validation Logic
    function validateField(input) {
        const rules = config[currentRole];
        let isValid = true;
        
        // If the field is hidden, we don't validate it
        if (input.offsetParent === null) {
            resetField(input);
            return true;
        }

        switch (input.id) {
            case 'username':
                isValid = input.value.trim().length > 0;
                break;
            case 'email':
                isValid = rules.emailRegex.test(input.value);
                break;
            case 'age':
                isValid = input.value >= rules.minAge;
                break;
            case 'skills':
                // Required for Student/Teacher
                isValid = input.value.trim().length > 0;
                break;
            case 'adminKey':
                // Only checked if visible (handled by offsetParent check above)
                isValid = input.value === "SECRET";
                break;
            case 'password':
                isValid = rules.passRegex.test(input.value);
                break;
            case 'confirmPassword':
                const pass = document.getElementById('password').value;
                isValid = input.value === pass && input.value !== "";
                break;
        }

        // Update UI
        if (!isValid) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            input.nextElementSibling.classList.add('visible'); // Show Error Span
            return false;
        } else {
            input.classList.remove('invalid');
            input.classList.add('valid');
            input.nextElementSibling.classList.remove('visible'); // Hide Error Span
            return true;
        }
    }

    function resetField(input) {
        input.classList.remove('invalid', 'valid');
        if (input.nextElementSibling) {
            input.nextElementSibling.classList.remove('visible');
        }
    }

    // 4. Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let allValid = true;

        inputs.forEach(input => {
            // Check only visible fields
            if (input.offsetParent !== null) {
                if (!validateField(input)) allValid = false;
            }
        });

        if (allValid) {
            alert("Registered successfully as " + currentRole);
            form.reset();
            inputs.forEach(resetField);
        }
    });
});