interface UserInput {
    name: string;
    email: string;
    password: string;
    phonenumber: string;
    usertype: string;
}

export const validateFields = ({ name, email, password, phonenumber, usertype }: UserInput): Record<string, string> | null => {
    const errors: Record<string, string> = {};

    if (!name) {
        errors.name = 'Name is required';
    } else if (name.length < 2) {
        errors.name = 'Name must be at least 3 characters long';
    }

    if (!email) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid email format';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }

    // Phone Number Validation
    if (!phonenumber) {
        errors.phonenumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phonenumber)) {
        errors.phonenumber = 'Invalid phone number format';
    }

    // User Type Validation
    const validUserTypes = ['ndrf', 'citizen'];
    if (!usertype) {
        errors.usertype = 'User type is required';
    } else if (!validUserTypes.includes(usertype.toLowerCase())) {
        errors.usertype = 'Invalid user type';
    }

    return Object.keys(errors).length > 0 ? errors : null;
}
