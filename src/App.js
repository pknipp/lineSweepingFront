import React, {useState, useEffect} from 'react';

import setTowns from './setTowns';
import lookup from './lookup';
// import tsp from './tsp';

const App = () => {
    const [message, setMessage] = useState('initial message');
    const [n, setN] = useState(3);
    const [iter, setIter] = useState(-1);
    const [distanceMin, setDistanceMin] = useState(10 ** 10);
    const [memo, setMemo] = useState([]);
    const [xys, setXys] = useState([...setTowns(n), [0, 0]]);
    const [interTownDistances, setInterTownDistances] = useState(lookup(xys));
    const [finished, setFinished] = useState(false);
    const [results, setResults] = useState([[iter, distanceMin]]);
    const [data, setData] = useState({});
    const [count, setCount] = useState(0);

    // useEffect(() => {
    //     let newXys = [...setTowns(n), [0, 0]];
    //     setXys(newXys);
    //     let newInterTownDistances = lookup(newXys);
    //     console.log(newInterTownDistances);
    //     setInterTownDistances(newInterTownDistances);
    // }, []);

    // useEffect(() => {
    //     (async () => {
    //         // let backURL = "http://127.0.0.1:5000";
    //         let backURL = "https://line-sweeping-back.herokuapp.com";
    //         const response = await fetch(backURL);
    //         let data = await response.json();
    //         setMessage(data.message);
    //     })()
    // }, []);

    useEffect(() => {
        if (!finished) {
            setCount(count + 1);
            (async () => {
                let params = JSON.stringify({n, iter: iter + 1, distanceMin, memo, xys, interTownDistances});
                // console.log("params = ", params)
                let backURL = `http://127.0.0.1:5000/${params}`;
                // let backURL = "https://line-sweeping-back.herokuapp.com";
                if (!finished) {
                    const response = await fetch(backURL);
                    setData(await response.json());
                };
                // if (!data.finished) {
                //     setIter(data.iter);
                //     setDistanceMin(data.distance_min);
                //     setMemo(data.memo);
                //     let newResults = JSON.parse(JSON.stringify(results));
                //     newResults.push([data.iter, data.distance_min]);
                //     setResults(newResults);
                //     // setResults([...results, [data.iter, data.distance_min]]);
                //     console.log(data.iter, data.distance_min);
                // }
                // setFinished(data.finished);
                // setMessage(data.message);
            })()
        }
    }, [iter]);

    useEffect(() => {
        let newFinished = data.finished;
        if (!newFinished) {
            setIter(data.iter);
            setDistanceMin(data.distance_min);
            setMemo(data.memo);
            let newResults = JSON.parse(JSON.stringify(results));
            newResults.push([data.iter, data.distance_min]);
            setResults(newResults);
            // setResults([...results, [data.iter, data.distance_min]]);
            console.log(data.iter, data.distance_min);
        }
        setFinished(newFinished);
        // setMessage(data.message);
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
        <div>{finished ? `Finished with ${count} instances.` : ""}</div>
        </>
    )
}
export default App;
