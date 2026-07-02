import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-slate-300 text-[#008069] shadow-sm focus:ring-[#008069] dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-emerald-600 dark:focus:ring-offset-gray-800 ' +
                className
            }
        />
    );
}
