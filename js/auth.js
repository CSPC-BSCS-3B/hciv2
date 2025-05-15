// Function to check password strength
function checkPasswordStrength(password) {
    // Initialize variables
    let strength = 0;
    
    // If password length is less than 6 chars
    if (password.length < 6) {
        return {
            value: 0,
            text: "Too short",
            color: "#ff4d4d"
        };
    }
    
    // If password length is >= 8 chars
    if (password.length >= 8) {
        strength += 1;
    }
    
    // If password contains both lower and uppercase characters
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        strength += 1;
    }
    
    // If password has numbers
    if (password.match(/([0-9])/)) {
        strength += 1;
    }
    
    // If password has special characters
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        strength += 1;
    }

    // Return strength indicator
    if (strength < 2) {
        return {
            value: 25,
            text: "Weak",
            color: "#ff4d4d"
        };
    } else if (strength === 2) {
        return {
            value: 50,
            text: "Fair",
            color: "#ffaa00"
        };
    } else if (strength === 3) {
        return {
            value: 75,
            text: "Good",
            color: "#2bd151"
        };
    } else {
        return {
            value: 100,
            text: "Strong",
            color: "#1e9c39"
        };
    }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const strengthLevel = document.getElementById('strength-level');
    const strengthText = document.getElementById('strength-text');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    
    // Add event listener for password field in registration form
    if (passwordInput && strengthLevel && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = passwordInput.value;
            
            // Get strength info
            const strengthInfo = checkPasswordStrength(password);
            
            // Update UI
            strengthLevel.style.width = strengthInfo.value + '%';
            strengthLevel.style.backgroundColor = strengthInfo.color;
            strengthText.textContent = strengthInfo.text;
            strengthText.style.color = strengthInfo.color;
        });
    }
    
    // Registration form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const termsChecked = document.getElementById('terms').checked;
            
            // Basic validation
            if (!email || !username || !password) {
                alert('Please fill out all required fields');
                return;
            }
            
            // Check if passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Check if terms are accepted
            if (!termsChecked) {
                alert('You must agree to the Terms of Service');
                return;
            }
            
            // Check password strength
            const strengthInfo = checkPasswordStrength(password);
            if (strengthInfo.value < 50) {
                alert('Please choose a stronger password');
                return;
            }
            
            // If everything is okay, submit the form (for now just redirect to index)
            alert('Account created successfully! Redirecting to homepage...');
            window.location.href = 'index.html';
        });
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember') ? document.getElementById('remember').checked : false;
            
            // Basic validation
            if (!username || !password) {
                alert('Please fill out all required fields');
                return;
            }
            
            // For demo purposes, accept any login
            alert('Login successful! Redirecting to homepage...');
            
            // Store username in localStorage if remember me is checked
            if (rememberMe) {
                localStorage.setItem('rememberedUser', username);
            } else {
                localStorage.removeItem('rememberedUser');
            }
            
            // Redirect to homepage
            window.location.href = 'index.html';
        });
    }
    
    // Auto-fill remembered username if available
    if (loginForm) {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            const usernameField = document.getElementById('username');
            if (usernameField) {
                usernameField.value = rememberedUser;
                
                // Check the "remember me" checkbox
                const rememberCheckbox = document.getElementById('remember');
                if (rememberCheckbox) {
                    rememberCheckbox.checked = true;
                }
            }
        }
    }
    
    // Handle social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Social login is not implemented in this demo');
        });
    });
});