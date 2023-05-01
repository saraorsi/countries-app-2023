import styles from './Search.module.css';

export function Search({ total, search }) {
    return (
        <div className={styles.container}>
            <div>{total} countries found</div>
            <form className="search-form">
                <input
                    placeholder="search"
                    type="text"
                    onChange={search}
                />
            </form>
        </div>
    )
}