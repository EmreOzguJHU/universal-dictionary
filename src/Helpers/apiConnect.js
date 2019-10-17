import React, {useState, useEffect} from 'react';

const apiConnect = propsToCalls => Component => props => {
    const [results, setResults] = useState({});
    useEffect(() => {
        const result = {};
        const requests = Object.keys(propsToCalls).map(key => {
            return new Promise(resolve => {
                fetch(propsToCalls[key])
                    .then(res => res.json())
                    .then(data => resolve({ [key]: data }));
            });
        });
        Promise.all(requests).then(responses => responses.forEach(resp => Object.keys(resp).forEach(k => result[k] = resp[k])))
            .then(() => setResults(result));
    }, []);

    return (
        <Component {...props} {...results} />
    );
};

export default apiConnect;