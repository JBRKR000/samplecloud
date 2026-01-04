'use client';
import { Chromium, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import checkPassword from "@/app/(lib)/services/checkPassword";
import { useAlert } from "@/app/(lib)/api/contextAPI";

export default function AuthForm() {

    const [isLogin, setIsLogin] = useState(true);
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const {addAlert} = useAlert();

    const checkSubmission = () => {
        if (isRegister) {
            if (agreeToTerms && checkPassword(formData.password)) {
                return true;
            } else {
                return false;
            }
        }
    }

    const RegisterFields = [
        { label: "Username", type: "text", name: "username", placeholder: "username" },
        { label: "Email", type: "email", name: "email", placeholder: "email@example.com" },
        { label: "Password", type: "password", name: "password", placeholder: "" },
        { label: "Confirm Password", type: "password", name: "confirmPassword", placeholder: "" },
    ];

    const LoginFields = [
        { label: "Email", type: "email", name: "email", placeholder: "email@example.com" },
        { label: "Password", type: "password", name: "password", placeholder: "" },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(isRegister && !checkSubmission()){
            addAlert("Please ensure all fields are correctly filled and terms are agreed.", 'error');
            return;
        }
        if(isLogin && !checkSubmission()){
            addAlert("Please ensure all fields are correctly filled.", 'error');
            return;
        }
    };

    const tabVariants = {
        active: { color: "#7EA6FF", borderBottomColor: "#7EA6FF" },
        inactive: { color: "#94a3b8" }
    };

    const formVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.1 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.1 } }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <motion.div
            className="min-h-screen bg-background flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Tabs */}
                <div className="flex border-b border-slate-700 mb-8">
                    <motion.button
                        onClick={() => {
                            setIsLogin(true);
                            setIsRegister(false);
                        }}
                        className={`flex-1 py-4 text-center font-medium transition-colors ${isLogin
                                ? "text-accent-500 border-b-2 border-accent-500"
                                : "text-slate-400"
                            }`}
                        animate={isLogin ? "active" : "inactive"}
                        variants={tabVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Sign In
                    </motion.button>
                    <motion.button
                        onClick={() => {
                            setIsRegister(true);
                            setIsLogin(false);
                        }}
                        className={`flex-1 py-4 text-center font-medium transition-colors ${isRegister
                                ? "text-accent-500 border-b-2 border-accent-500"
                                : "text-slate-400"
                            }`}
                        animate={isRegister ? "active" : "inactive"}
                        variants={tabVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Create Account
                    </motion.button>
                </div>

                {/* Forms */}
                <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {isLogin && (
                            <motion.div
                                key="login"
                                className="space-y-6"
                                variants={formVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <motion.div
                                    className="space-y-6"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {LoginFields.map((field) => (
                                        <motion.div key={field.name} variants={itemVariants}>
                                            <label className="block text-slate-400 text-sm mb-2">
                                                {field.label}
                                            </label>
                                            <div className="relative">
                                                <motion.input
                                                    type={field.type === "password" && !showPassword ? "password" : field.type === "password" ? "text" : field.type}
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.name as keyof typeof formData]}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-800 border border-slate-700 rounded text-white px-4 py-3 focus:outline-none focus:border-accent transition-colors pr-10"
                                                    whileFocus={{ scale: 1.02 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                                {field.type === "password" && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                    <motion.button
                                        type="submit"
                                        className="w-full bg-accent text-black font-bold py-3 rounded"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        variants={itemVariants}
                                    >
                                        Sign In
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}

                        {isRegister && (
                            <motion.div
                                key="register"
                                className="space-y-6"
                                variants={formVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <motion.div
                                    className="space-y-6"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {RegisterFields.map((field) => (
                                        <motion.div key={field.name} variants={itemVariants}>
                                            <label className="block text-slate-400 text-sm mb-2">
                                                {field.label}
                                            </label>
                                            <div className="relative">
                                                <motion.input
                                                    type={field.type === "password" && field.name === "password" && !showPassword ? "password" : field.type === "password" && field.name === "confirmPassword" && !showConfirmPassword ? "password" : field.type === "password" ? "text" : field.type}
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.name as keyof typeof formData]}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-800 border border-slate-700 rounded text-white px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors pr-10"
                                                    whileFocus={{ scale: 1.02 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                                {field.type === "password" && (
                                                    <button
                                                        type="button"
                                                        onClick={() => field.name === "password" ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                                                    >
                                                        {(field.name === "password" ? showPassword : showConfirmPassword) ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                    <motion.div className="flex items-center" variants={itemVariants}>
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={agreeToTerms}
                                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                                            className="w-4 h-4 accent-accent-100"
                                        />
                                        <label htmlFor="terms" className="ml-2 text-slate-400 text-sm">
                                            I agree to Terms & Conditions
                                        </label>
                                    </motion.div>
                                    <motion.button
                                        type="submit"
                                        className="w-full bg-accent text-black font-bold py-3 rounded"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        variants={itemVariants}
                                    >
                                        Create Account
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>


                <motion.div
                    className="flex items-center my-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <div className="flex-1 border-t border-slate-700"></div>
                    <span className="px-4 text-slate-500 text-sm">OR SIGN UP WITH</span>
                    <div className="flex-1 border-t border-slate-700"></div>
                </motion.div>


                <motion.button
                    className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-3 rounded transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    whileHover={{ scale: 1.02, backgroundColor: "#1e293b" }}
                    whileTap={{ scale: 0.98 }}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <Chromium color="currentColor" opacity="0.2" />
                    </svg>
                    Google Account
                </motion.button>
            </motion.div>
        </motion.div>
    );
}