import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(getErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    const getErrorMessage = (code) => {
        switch (code) {
            case "auth/email-already-in-use":
                return "An account with this email already exists.";
            case "auth/invalid-email":
                return "Invalid email address.";
            case "auth/weak-password":
                return "Password is too weak. Use at least 6 characters.";
            case "auth.operation-not-allowed":
                return "Operation not allowed. Please try again.";
            default:
                return "Failed to create account. Please try again.";
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex items-center justify-center w-full px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                    
                    {/* Logo */}
                    <div className="flex justify-center">
                        <a href="/" className="mb-2" title="Go to Home">
                            <svg className="size-12" width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m8 4.55 6.75 3.884 6.75-3.885M8 27.83v-7.755L1.25 16.19m27 0-6.75 3.885v7.754M1.655 8.658l13.095 7.546 13.095-7.546M14.75 31.25V16.189m13.5 5.976V10.212a2.98 2.98 0 0 0-1.5-2.585L16.25 1.65a3.01 3.01 0 0 0-3 0L2.75 7.627a3 3 0 0 0-1.5 2.585v2.98 2.98 11.953a0 0 0 1.5 2.585l10.5 5.977a3.01 3.01 0 0 0 3 0l10.5-5.977a3 3 0 0 0 1.5-2.585"
                                    stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
        
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="mt-3 text-base text-gray-500/90">
                            Join us and start your journey towards early lung cancer detection with XAI.
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
        
                    {/* Form */}
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                                required
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                placeholder="Create a password"
                                className="w-full px-4 py-3 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                                required
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                            <input
                                placeholder="Confirm your password"
                                className="w-full px-4 py-3 rounded-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-violet-600 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                                required
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 cursor-pointer rounded-lg bg-violet-600 text-white font-medium transition-all duration-200 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>
        
                    {/* Footer */}
                    <div className="text-center pt-4 border-t border-gray-100">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to='/login' className="text-violet-600 font-medium hover:text-violet-700 hover:underline transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

