import React, {useState, useEffect} from 'react';

import setTowns from './setTowns';
import lookup from './lookup';
// import tsp from './tsp';

const App = () => {
    const [message, setMessage] = useState('initial message');
    const [n, setN] = useState(10);
    const [iter, setIter] = useState(-1);
    const [distanceMin, setDistanceMin] = useState(10 ** 10);
    const [memo, setMemo] = useState([]);
    const [xys, setXys] = useState([...setTowns(n), [0, 0]]);
    const [interTownDistances, setInterTownDistances] = useState(lookup(xys));
    const [finished, setFinished] = useState(false);
    const [results, setResults] = useState([[iter, distanceMin]]);
    const [data, setData] = useState({});

    useEffect(() => {
        if (!finished) {
            (async () => {
                let params = JSON.stringify({n, iter: iter + 1, distanceMin, memo, xys, interTownDistances});
                let backURL = `http://127.0.0.1:5000/${params}`;
                // let backURL = "https://line-sweeping-back.herokuapp.com";
                if (!finished) setData(await(await fetch(backURL)).json());
            })()
        }
    }, [iter]);

    useEffect(() => {
        let newFinished = data.finished;
        if (!newFinished && data.iter !== undefined && data.distance_min && data.memo) {
            setIter(data.iter);
            setDistanceMin(data.distance_min);
            setMemo(data.memo);
            let result = [data.iter, data.distance_min];
            setResults(data.iter ? [...results, result] : [result]);
            console.log(...result);
        }
        setFinished(newFinished);
    }, [data]);

    return (
        <>
        <ul>
            {results.map(result => (
                <li key={result[0]}>
                    {result.join(" ")}
                </li>
            ))}
        </ul>
        <div>{finished ? "Finished!" : ""}</div>
        </>
    )
}
export default App;
