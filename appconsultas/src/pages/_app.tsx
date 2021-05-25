import '../styles/globals.css';
import styles from './styleIndex.module.css';
import stylesPaciente from './pacientes/styles.module.css';
import stylesMedico from './medicos/styles.module.css';
import stylesListagem from './listagem/styles.module.css';
import stylesConsultas from './consultas/styles.module.css';
import { Menu } from "../componentes/Menu/menu";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <span className={
      styles.containerIndex +' '+
      stylesPaciente.containerPacientes+' '+
      stylesMedico.containerMedicos+' '+
      stylesListagem.containerListagem+' '+
      stylesConsultas.containerConsulta } style={{display:'none'}}></span>
    <div className='divBack'></div>
    <div className='container'>
      <Menu />
      <Component {...pageProps} /> 
    </div>
    </>
  )
}

export default MyApp
