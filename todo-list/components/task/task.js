
import styles from './task.module.css'

export default function Task(props) {
  console.log(props)
  return (
    <div className={styles.box} data-active={props.isChecked}>
        <h2 className={styles.title}>{props.name}</h2>
        <p className={styles.description}>{props.description}</p>
    </div>
  )
}
