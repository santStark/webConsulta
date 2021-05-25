import { api } from '../services/api';
import styles from './styleIndex.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface IConsultas {
  id: number,
  paciente: string,
  medico: string,
  dia: string,
  hora: string,
}

interface IProps {
  consultas: IConsultas[]
}

export default function Home(props: IProps) {

  const [consultas, setConsultas] = useState([]);

  async function getConsultas() {

    const { data } = await api.get('consultas');
    if (data.length === 0) return;

    setConsultas(data);

  }

  useEffect(() => {

    getConsultas();

  }, []);

  function seachConsulta(e) {

    const v = e.target.value.toUpperCase();
    const el = document.querySelector('.' + styles.containerConsultas);

    if (!el) return;

    Array.from(el.querySelectorAll('.' + styles.cardConsulta)).forEach((item: HTMLElement) => {

      const p = item.getAttribute('data-card').toUpperCase();
      item.style.display = '';
      if (!p || p.indexOf(v) < 0) item.style.display = 'none';


    })
  }

  return (
    <div className={styles.containerIndex}>
      <h3 className="fas fa-calendar-alt fa-3x"> CONSULTAS</h3>
      <div className={styles.containerSearch}>
        <input type="search" placeholder="pesquisar: Dia, Médico" onInput={seachConsulta} />
        <Link href="/consultas/0">
          <a className="fas fa-calendar-plus fa-2x" title="Nova Consulta"></a>
        </Link>
      </div>
      <div className={styles.containerConsultas}>
        {
          consultas.map((item) => {

            return (
              <div key={item.id} data-card={item.dia + item.medico} className={styles.cardConsulta}>
                <Link href={'/consultas/' + item.id}>
                  <a className="fas fa-search"></a>
                </Link>
                <span className="fas fa-calendar-alt"> {' ' + item.dia}</span>
                <span className="fas fa-clock"> {' ' + item.hora}</span>
                <span className="fas fa-user-nurse"> {' ' + item.medico}</span>
                <span className="fa fa-user"> {' ' + item.paciente}</span>


              </div>
            );

          })
        }
      </div>

    </div>
  )
}


