import '../styles/globals.css';
import { Menu } from "../componentes/Menu/menu"

function MyApp({ Component, pageProps }) {
  return (
    <>
    <div className='divBack'></div>
    <div className='container'>
      <Menu />
      <Component {...pageProps} /> 
    </div>
    </>
  )
}

export default MyApp
