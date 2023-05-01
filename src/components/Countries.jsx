import { useState, useEffect } from 'react';
import { Country } from './Country';

import styles from './Countries.module.css';
import { Search } from './Search';

export function Countries() {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setIsLoading(true);
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                setCountries(sortedCountries);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(search)

    );

    function getSearchValue(e) {
        e.preventDefault();
        setSearch(e.target.value.toLowerCase());
    }

    if (isLoading) {
        return <div>Loading........</div>
    } else if (error) {
        return { error }
    } else {
        return (
            <div>

                <Search
                    total={filteredCountries.length}
                    search={getSearchValue}
                />

                <div className={styles.container}>
                    {
                        filteredCountries.map((country) => (
                            <Country
                                key={country.cca3}
                                code={country.cca3}
                                name={country.name.common}
                                flag={country.flags.png}
                            />
                        ))
                    }
                </div>

            </div>
        );
    }
}