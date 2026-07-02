import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-xl border border-transparent bg-[#008069] px-5 py-3 text-xs font-bold text-white transition duration-150 ease-in-out hover:bg-[#006e5a] focus:bg-[#006e5a] focus:outline-none focus:ring-2 focus:ring-[#008069] focus:ring-offset-2 active:bg-[#005c4b] dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500 dark:focus:bg-emerald-500 dark:focus:ring-offset-gray-800 dark:active:bg-emerald-700 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
