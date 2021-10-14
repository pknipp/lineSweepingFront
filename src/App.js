import React, {useState, useEffect} from 'react';

const App = () => {
    const [message, setMessage] = useState('initial message');

    useEffect(() => {
        (async () => {
            // let backURL = "http://127.0.0.1:5000";
            let backURL = "https://line-sweeping-back.herokuapp.com";
            const response = await fetch(backURL);
            let data = await response.json();
            setMessage(data.message);
        })()
    }, []);
    return <div>The back-end says {message}.</div>
}
export default App;
