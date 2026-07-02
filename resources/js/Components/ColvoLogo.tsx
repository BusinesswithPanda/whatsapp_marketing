import { ImgHTMLAttributes } from 'react';

interface ColvoLogoProps extends ImgHTMLAttributes<HTMLImageElement> {
    // Kept props for backwards compatibility across templates
    showText?: boolean;
    textClassName?: string;
    iconOnly?: boolean;
    iconClassName?: string;
}

export default function ColvoLogo({ 
    className = "h-10 w-auto object-contain",
    showText = true,
    textClassName = "",
    iconOnly = false,
    iconClassName = "",
    ...props 
}: ColvoLogoProps) {
    return (
        <img 
            src="/images/pp.png" 
            className={className} 
            alt="Colvo Logo" 
            onError={(e) => {
                e.currentTarget.alt = "Colvo";
            }}
            {...props}
        />
    );
}
