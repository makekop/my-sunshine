export default function Button({ text, onClick }) {
    return (
        <button
            className=" w-20 box-content text-black font-extrabold bg-gray-300 rounded-xl shadow-2xl/70 p-4 hover:bg-gray-500"
            onClick={onClick}
        >
            {text}
        </button>
    );
}
