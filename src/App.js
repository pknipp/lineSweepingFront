import React, {useState, useEffect} from 'react';

// import setTowns from './setTowns';
// import lookup from './lookup';
import setLines from './setLines';

const App = () => {
    // Python chokes on Infinity, so ...
    const INFINITY = 10 ** 10;
    const origin = [0, 36];
    const {lines, distances} = setLines(origin);
    const n = lines.length;
    const base2Max = 2 ** n;
    const fac = new Array(n).fill(0).reduce((fac, ignoreMe, i) => fac * (i + 1), 1);

    const [iter, setIter] = useState(0);
    const [distanceMin, setDistanceMin] = useState(INFINITY);
    const [memo, setMemo] = useState([]);
    const [finished, setFinished] = useState(false);
    const [results, setResults] = useState([[iter, distanceMin]]);
    const [data, setData] = useState({});
    const [progress, setProgress] = useState(0);
    const [base2, setBase2] = useState(0);

    useEffect(() => {
        if (!finished) {
            (async () => {
                let [newIter, newBase2] = [iter, base2];
                if (distanceMin < INFINITY && base2 && !(base2 % base2Max)) {
                    newBase2 = 0;
                    newIter++;
                }
                let params = JSON.stringify({n, fac, base2Max, iter: newIter, base2: newBase2, distanceMin, memo, lines, origin, distances});
                let backURL = `http://127.0.0.1:5000/${params}`;
                // let backURL = `https://line-sweeping-back.herokuapp.com/${params}`;
                setData(await(await fetch(backURL)).json());
            })()
        }
    }, [iter]);

    useEffect(() => {
        if (Object.keys(data).length > 1) {
            setIter(data.iter);
            setProgress(Math.round(100 * (data.iter + 1) / fac ));
            if (data.distance_min) {
                setDistanceMin(data.distance_min);
                setMemo(data.memo);
                let result = [data.iter, data.distance_min];
                // console.log(result)
                setResults(data.iter ? [...results, result] : [result]);
            }
        };
        if (data.finished) {
            setFinished(true);
            setProgress(100);
        };
    }, [data]);

    return (
        <>
            <div>Progress: {finished ? 'FINISHED!' : `${progress}%`}</div>
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
