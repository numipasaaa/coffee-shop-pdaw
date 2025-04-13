function signupValidation(values) {
    let error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/; // At least 8 characters, 1 digit, 1 lowercase, 1 uppercase

    if (values.name === "") {
        error.name = "Name is required";
    } else {
        error.name = "";
    }

    if (values.username === "") {
        error.username = "Username is required";
    } else {
        error.username = "";
    }

    if (values.email === "") {
        error.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
        error.email = "Invalid email format";
    } else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
        error.password = "Password must be at least 8 characters long, contain at least one digit, one lowercase letter, and one uppercase letter";
    } else {
        error.password = "";
    }

    if (values.confirmpass !== values.password) {
        error.confirmpass = "Passwords do not match";
    } else {
        error.confirmpass = "";
    }

    return error;
}

export default signupValidation;