import { GetStaticProps } from 'next';
import {api} from '../services/api';
import styles from './styleIndex.module.css';
import Link from 'next/link';
import {format, parseISO} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface IConsultas{
  id : number,
  paciente: string,
  medico: string,
  dia: string,
  hora: string,
}

interface IProps{
  consultas:IConsultas[]
}

function seachConsulta(e){

  const v = e.target.value.toUpperCase();
  const el = document.querySelector('.'+styles.containerConsultas);
  
  if(!el) return;

  Array.from(el.querySelectorAll('.'+ styles.cardConsulta)).forEach((item:HTMLElement) =>{

      const p = item.getAttribute('data-card').toUpperCase();
      item.style.display = '';
      if(!p || p.indexOf(v) < 0 ) item.style.display = 'none';


  })
}

export default function Home(props:IProps) {
  return (
    <div className={styles.containerIndex}>
      <h3 className="fas fa-calendar-alt fa-3x"> CONSULTAS</h3>
      <div className={styles.containerSearch}>
        <input type="search" placeholder="pesquisar: Dia, Medico" onInput={seachConsulta} />
        <Link href="/consultas/0">
          <a className="fas fa-calendar-plus fa-2x" title="Nova Consulta"></a>
        </Link>
      </div>
      <div className={styles.containerConsultas}> 
        {
          props.consultas.map((item) =>{

            return(
                <div key={item.id} data-card={item.dia+item.medico} className={styles.cardConsulta}>
                  <Link href={ '/consultas/'+item.id }>
                    <a className="fas fa-search"></a>
                  </Link>
                  <span className="fas fa-calendar-alt"> {' ' +item.dia }</span>
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

export const getStaticProps: GetStaticProps = async() => {
  const {data} = await api.get('consultas');

  return{
    props:{
      consultas: data,

    },
    revalidate: 60 * 60 * 8,
  }
}
