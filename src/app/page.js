import { getSunShineData } from "./actions";

const App = async () => {
    const data = await getSunShineData();
    return (
        <div>
            <ul>
                {data.map((item) => (
                    <li key={item.date}>
                        {item.date}: {(item.sunshine / 3600).toFixed(2)} hours
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default App;
