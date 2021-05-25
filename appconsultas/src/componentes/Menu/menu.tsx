import styles from './styles.module.css';
import Link from 'next/link';

export function Menu() {
    return (
        <div className={styles.containerMenu}>

            <Link href='/'>
                <a className="fas fa-calendar-alt fa-3x" title="Consultas"></a>
            </Link>

            <Link href='/listagem/medicos'>
                <a className="fas fa-user-nurse fa-3x" title="Médicos"></a>
            </Link>

            <Link href='/listagem/pacientes'>
                <a className="fa fa-user fa-3x" title="Pacientes"></a>
            </Link>

        </div>
    )


}