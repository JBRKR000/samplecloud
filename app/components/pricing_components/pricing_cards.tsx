'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PricingPlan {
    name: string;
    price: number;
    description: string;
    buttonText: string;
    buttonVariant: 'primary' | 'secondary' | 'outline';
    isPopular?: boolean;
    features: {
        name: string;
        included: boolean;
    }[];
}

const plans: PricingPlan[] = [
    {
        name: 'Basic',
        price: 0,
        description: 'Everything you need to get started.',
        buttonText: 'Get Started',
        buttonVariant: 'primary',
        features: [
            { name: 'Local sample management', included: true },
            { name: 'Full metadata editing', included: true },
            { name: 'Waveform preview', included: true },
            { name: '5 GB local storage', included: true },
        ],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: { y: -8, transition: { duration: 0.3 } },
};

export default function PricingCards() {
    const router = useRouter();

    const handlePlanSelect = () =>{
        router.push('/allSamples');
    }

    return (
        <div className="relative min-h-screen bg-background flex items-center justify-center px-4 py-16 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute top-1/3 -left-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl"
                    animate={{
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                    animate={{
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            <div className="relative z-10 w-full max-w-7xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                        Simple Pricing
                    </span>
                    <h1 className="text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                        Start for free.
                    </h1>
                    <p className="text-lg text-gray-400 mb-12">
                        Everything you need to organize and manage your audio samples locally.<br />
                        No credit card required.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    className="flex justify-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            variants={cardVariants}
                            whileHover="hover"
                            className={`relative rounded-2xl border backdrop-blur-sm transition-all w-full max-w-md ${
                                plan.isPopular
                                    ? 'border-primary/50 bg-linear-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20'
                                    : 'border-border/30 bg-background/40'
                            }`}
                        >
                            {/* Popular Badge */}
                            {plan.isPopular && (
                                <motion.div
                                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                >
                                    <span className="px-4 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                        Most Popular
                                    </span>
                                </motion.div>
                            )}

                            <div className={`p-8 ${plan.isPopular ? 'pt-12' : ''}`}>
                                {/* Plan Header */}
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {plan.name}
                                </h3>
                                <p className="text-sm text-gray-400 mb-6">
                                    {plan.description}
                                </p>

                                {/* Price */}
                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-white">
                                        ${plan.price}
                                    </span>
                                    <span className="text-gray-400 ml-2">/mo</span>
                                </div>

                                {/* CTA Button */}
                                <motion.button
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all mb-8 ${
                                        plan.buttonVariant === 'primary'
                                            ? 'bg-accent text-black hover:bg-accent/90'
                                            : 'border border-gray-600 text-white hover:border-gray-400 hover:bg-gray-900/50'
                                            
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={()=>{handlePlanSelect()}}
                                >
                                    {plan.buttonText}
                                </motion.button>

                                {/* Features */}
                                <div className="space-y-4 border-t border-border/20 pt-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <motion.div
                                            key={feature.name}
                                            className="flex items-start gap-3"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.4 + index * 0.1 + featureIndex * 0.05,
                                            }}
                                        >
                                            <div className="mt-1">
                                                {feature.included ? (
                                                    <Check className="h-5 w-5 text-accent shrink-0" />
                                                ) : (
                                                    <X className="h-5 w-5 text-gray-600 shrink-0" />
                                                )}
                                            </div>
                                            <span
                                                className={`text-sm ${
                                                    feature.included
                                                        ? 'text-gray-300'
                                                        : 'text-gray-600 line-through'
                                                }`}
                                            >
                                                {feature.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
