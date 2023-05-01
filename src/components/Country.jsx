import { Link } from "react-router-dom";
import styles from './Country.module.css';

export function Country({ code, name, flag }) {

    return (

        <Link to={`country/${code}`}>
            <article className={styles.card}>
                <div
                    className={styles.flag}
                    style={{
                        backgroundImage: `url(${flag})`
                    }}>

                </div>
                <div className={styles.name}>{name}</div>
            </article>


        </Link>
    )
}