import styles from './styles.module.css';
import { api } from '../../services/api';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Listagem() {

    const [pessoas, setPessoas] = useState([]);
    const router = useRouter();

    async function getPessoas() {

        const param = String(router.query.slug);
        if (!param || param === 'undefined') return;

        const { data } = await api.get(param);

        setPessoas(data)
    }

    useEffect(() => {
        getPessoas()
    }, [router.query.slug]);


    function seachPaciente(e){

        const v = e.target.value.toUpperCase();
        const el = document.querySelector('.'+styles.containerListagemUser+' ul');
        
        if(!el) return;

        Array.from(el.querySelectorAll('li')).forEach((item) =>{

            const p = item.getAttribute('data-paciente').toUpperCase();
            item.style.display = '';
            if(!p || p.indexOf(v) < 0 ) item.style.display = 'none';


        })
    }

    function seachMedico(e){

        const v = e.target.value.toUpperCase();
        const el = document.querySelector('.'+styles.containerListagemUser+' ul');
        
        if(!el) return;

        Array.from(el.querySelectorAll('li')).forEach((item) =>{

            const p = item.getAttribute('data-medico').toUpperCase();
            item.style.display = '';
            if(!p || p.indexOf(v) < 0 ) item.style.display = 'none';


        })
    }

    return (
        <div className={styles.containerListagem}>
            {
                router.query.slug === 'pacientes' ?

                    (
                        <>
                            <h3 className="fa fa-user fa-3x"> PACIENTES</h3>
                            <div className={styles.containerSearch}>
                                <input type="search" placeholder="pesquisar: Nome, RG" onInput={seachPaciente}/>
                                <Link href={ '/pacientes/0' }>
                                    <a className="fas fa-user-plus fa-2x" title="Novo Paciente"></a>
                                </Link>
                            </div>
                            <div className={styles.containerListagemUser}>
                                <ul>
                                {
                                    pessoas.map((item) => {
                                        return (
                                            <li key={item.id} data-paciente={item.nome+item.rg}>
                                                <img src="/pacient.png" alt="" />
                                                <span>Nome: {item.nome}</span>
                                                <span>RG: {item.rg}</span>
                                                <span style={{display:"flex", justifyContent: "center",  height: "100%", alignItems: "center"}}>
                                                    <Link href={ '/pacientes/'+item.id }>
                                                        <a className="fas fa-search"></a>
                                                    </Link>
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                                </ul>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <h3 className="fas fa-user-nurse fa-3x"> MÉDICOS</h3>
                            <div className={styles.containerSearch}>
                                <input type="search" placeholder="pesquisar: Nome, Especialidade" onInput={seachMedico }/>
                                <Link href={ '/medicos/0' }>
                                    <a className="fas fa-user-plus fa-2x" title="Novo Medico"></a>
                                </Link>
                            </div>
                            <div className={styles.containerListagemUser}>
                            <ul>
                                {
                                    pessoas.map((item) => {
                                        return (
                                            <li key={item.id} data-medico={item.nome+item.especialidade}>
                                                <img src="/doctor.png" alt="" />
                                                <span>Nome: {item.nome}</span>
                                                <span>Esp..: {item.especialidade}</span>
                                                <span style={{display:"flex", justifyContent: "center",  height: "100%", alignItems: "center"}}>
                                                    <Link href={ '/medicos/'+item.id }>
                                                        <a className="fas fa-search"></a>
                                                    </Link>
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                                </ul>
                            </div>
                        </>
                    )

            }
        </div>
    )
}