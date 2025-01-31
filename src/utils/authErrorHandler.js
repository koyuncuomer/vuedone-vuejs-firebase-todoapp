const handleAuthError = (errorCode) => {
    switch (errorCode) {
        case "auth/email-already-in-use":
            return "This email address is already registered. Please use a different email or try logging in.";

        case "auth/invalid-email":
            return "The email address is invalid. Please enter a valid email address.";

        case "auth/operation-not-allowed":
            return "Email/password authentication is not enabled. Please contact support.";

        case "auth/weak-password":
            return "The password is too weak. Please use a stronger password with at least 6 characters.";

        case "auth/user-disabled":
            return "This account has been disabled. Please contact support for help.";

        case "auth/user-not-found":
            return "No account found with this email address. Please check your email or register.";

        case "auth/wrong-password":
            return "Incorrect password. Please try again.";

        case "auth/missing-password":
            return "Incorrect password. Please try again.";

        case "auth/too-many-requests":
            return "Too many failed login attempts. Please try again later.";

        case "auth/invalid-credential":
            return "The provided credential is invalid. Please try again.";

        case "auth/invalid-verification-code":
            return "The verification code is invalid. Please try again.";

        case "auth/invalid-verification-id":
            return "The verification ID is invalid. Please try again.";

        case "auth/requires-recent-login":
            return "This operation requires a recent login. Please log in again.";

        case "auth/network-request-failed":
            return "A network error occurred. Please check your internet connection and try again.";

        case "auth/timeout":
            return "The operation has timed out. Please try again.";

        case "auth/invalid-display-name":
            return "Invalid display name. Please enter a valid name.";

        case "auth/invalid-photo-url":
            return "Invalid profile photo URL. Please provide a correct URL.";

        default:
            return "An unexpected error occurred. Please try again later.";
    }
};

export default handleAuthError;
