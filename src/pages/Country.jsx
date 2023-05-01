import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import styles from './Country.module.css';

export function Country() {

    const { code } = useParams();
    const [country, setCountry] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://restcountries.com/v3.1/alpha/${code}`)
            .then((response) => response.json())
            .then((data) => {
                setCountry(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [code]);

    if (isLoading) {
        return <div>Loading........</div>
    } else if (error) {
        return { error }
    } else {
        return (
            <div className={styles.container}>
                {country?.map((country, index) => (
                    <div className={styles.country} key={index}>
                        <div>
                            <img className={styles.flag} src={country.flags.png} alt={country.name.common} />
                        </div>
                        <div>
                            <section className={styles.header}>
                                <div className={styles.name}>
                                    {country.name.common}
                                </div>
                                <div className={styles.capital}>
                                    {country.capital}
                                </div>
                            </section>

                            <section>
                                <div className={styles.info}>
                                    <div>
                                        Region
                                    </div>
                                    <div>
                                        {country.region}
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <div>
                                        Subregion
                                    </div>
                                    <div>
                                        {country.subregion}
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <div>
                                        Population
                                    </div>
                                    <div>
                                        {new Intl.NumberFormat().format(country.population)}
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <div>
                                        Languages
                                    </div>
                                    <div>
                                        {country.languages && Object.values(country.languages).map(language => language).join(', ')}
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <div>
                                        Currencies
                                    </div>
                                    <div>
                                        {country.currencies && Object.values(country.currencies).map(currency => currency.name).join(', ')}
                                    </div>
                                </div>
                                {country.maps.googleMaps &&
                                    <a className={styles.map} href={country.maps.googleMaps} target="_blank">
                                        Find on Map
                                    </a>
                                }
                            </section>

                        </div>
                    </div>

                ))
                }
            </div >


        )
    };
}
