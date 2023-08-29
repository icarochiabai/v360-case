import styles from './menu.module.css'

export default function Menu(props) {
    if(props.menuType === "task") {
        return (
            <div className={styles.taskMenu}>
                <button>+</button>
                <button>%</button>
                <button>-</button>
                <button>x</button>
            </div>
        )
    } else if (props.menuType === "list") {
        return (
            <div className={styles.listMenu}>
                <div className={styles.lists}>
                    <h1>Listas</h1>
                    <h2>Lista 1</h2>
                    <h2>Lista 2</h2>
                    <h2>Lista 3</h2>
                    <h2>Lista 4</h2>
                    <h2>Lista 5</h2>
                </div>
                <div className={styles.listButtons}>
                    <button>+</button>
                    <button>%</button>
                    <button>-</button>
                    <button>x</button>
                </div>
            </div>
        )
    }
}
