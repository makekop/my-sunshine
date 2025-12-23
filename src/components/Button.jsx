export default function Button({ onClick, text, active }) {
    return (
        <button
            onClick={onClick}
            className={`
                mb-0
                w-20 sm:w-28 h-16
                flex items-center justify-center
                rounded-md
                text-xl font-semibold
                transition
                ${
                    active
                        ? "bg-green-400 text-white"
                        : "bg-gray-500 hover:bg-gray-600 text-white"
                }
            `}
        >
            {text}
        </button>
    );
}
