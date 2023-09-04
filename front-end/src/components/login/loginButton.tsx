interface LoginButtonProps {
    label: string;
    bgColor: string;
    textColor: string;
}

export default function LoginButton({label, bgColor, textColor}: LoginButtonProps) {
    return (
        <button className={`w-[240px] py-2 rounded-xl ${bgColor}`}>
            <span className={`font-bold text-lg ${textColor}`}>
                {label}
            </span>
        </button>
    )
}