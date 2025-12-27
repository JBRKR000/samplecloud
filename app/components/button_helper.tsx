'use client'
interface ButtonProps{
    text: string;
    onClick: () => void;
    variant: "primary_notRounded" |"primary_rounded"| "secondary" | "edges_only";
    size: "sm" | "md" | "lg";
    disabled?: boolean;
}

export default function Button({
    text,
    onClick,
    variant = "primary_notRounded",
    size = "md",
    disabled = false
}: ButtonProps) {

    const variants = {
        primary_notRounded: "bg-primary text-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg active:scale-95",


        primary_rounded: "bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 hover:scale-100 active:scale-95 border border-red-500/50",


        secondary: "bg-transparent text-foreground border border-white/50 transition-all duration-300 hover:border-white hover:shadow-lg hover:shadow-white/20 hover:bg-white/5 active:scale-95",


        edges_only: "bg-transparent text-foreground relative transition-all duration-300 hover:shadow-lg  hover:bg-white/5 active:scale-95 before:absolute before:top-0 before:left-0 before:w-4 before:h-4 before:border-t before:border-l before:border-white/50 after:absolute after:bottom-0 after:right-0 after:w-4 after:h-4 after:border-b after:border-r after:border-white/50 before:transition-all before:duration-300 after:transition-all after:duration-300 hover:before:border-white hover:after:border-white",
    }

    const sizes = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    }

    return(
        <button className={`font-semibold rounded ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}
