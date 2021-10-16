import React, {useState, useEffect} from 'react';

import setTowns from './setTowns';
import lookup from './lookup';
// import tsp from './tsp';

const App = () => {
    const [message, setMessage] = useState('initial message');
    const [n, setN] = useState(10);
    const [fac, setFac] = useState(new Array(n).fill(0).reduce((fac, blah, i) => fac * (i + 1), 1));
    const [iter, setIter] = useState(-1);
    const [distanceMin, setDistanceMin] = useState(10 ** 10);
    const [memo, setMemo] = useState([]);
    const [xys, setXys] = useState([...setTowns(n), [0, 0]]);
    const [interTownDistances, setInterTownDistances] = useState(lookup(xys));
    const [finished, setFinished] = useState(false);
    const [results, setResults] = useState([[iter, distanceMin]]);
    const [data, setData] = useState({});
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!finished) {
            (async () => {
                let params = JSON.stringify({n, fac, iter: iter + 1, distanceMin, memo, xys, interTownDistances});
                let backURL = `http://127.0.0.1:5000/${params}`;
                // let backURL = `https://line-sweeping-back.herokuapp.com/${params}`;
                if (!finished) setData(await(await fetch(backURL)).json());
            })()
        }
    }, [iter]);

    useEffect(() => {
        if (Object.keys(data).length > 1) {
            setIter(data.iter);
            setDistanceMin(data.distance_min);
            setMemo(data.memo);
            let result = [data.iter, data.distance_min];
            setResults(data.iter ? [...results, result] : [result]);
            setProgress(Math.floor(100 * (data.iter + 1) / fac ));
        };
        if (data.finished) {
            setFinished(true);
            setProgress(100);
        };
    }, [data]);

    return (
        <>
            <div>Progress: {progress}%</div>
            <ul>
                {results.map(result => (
                    <li key={result[0]}>
                        {result.join(" ")}
                    </li>
                ))}
            </ul>
        </>
    )
}
export default App;
