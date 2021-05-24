import styles from './styles.module.css';
import { api } from '../../services/api';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ITConsultas {
    id: number,
    paciente: number,
    medico: number,
    dia: string,
    hora: string
}

interface IConsultas {
    id: number,
    idpaciente: number,
    idmedico: number,
    paciente: string,
    medico: string,
    dia: string,
    hora: string
}
export default function Concultas() {

    const [consulta, setConsulta] = useState({} as IConsultas);
    const [paciente, setPaciente] = useState([]);
    const [medico, setMedico] = useState([]);
    const [isBtnSave, setIsBtnSave] = useState(false);
    const router = useRouter();

    async function getPacientes() {

        const { data } = await api.get('pacientes');
        if (data.length === 0) return;

        setPaciente(data);

    }

    async function getMedicos() {

        const { data } = await api.get('medicos');
        if (data.length === 0) return;

        setMedico(data);

    }

    async function getConsulta() {

        const param = String(router.query.slug);
        if (!param || param === 'undefined') return;

        const { data } = await api.get('consultaID/' + param);


        if (data.length === 0) {
            const obj = {} as IConsultas;
            obj.id = 0;
            obj.idpaciente = 0,
                obj.idmedico = 0,
                obj.paciente = '';
            obj.medico = '';
            obj.dia = '';
            obj.hora = '';
            data.push(obj);
        }

        setConsulta(data[0])
    }

    useEffect(() => {

        getConsulta();
        getPacientes();
        getMedicos();

    }, [router.query.slug]);

    async function handleSubmit(event) {
        event.preventDefault();

        const el = event.target;
        if (!el) return;

        const obj = {} as ITConsultas;
        obj.id = el.querySelector('input[data-field="id"]').value.trim();
        obj.paciente = el.querySelector('input[data-field="paciente"]').getAttribute('data-id').trim();
        obj.medico = el.querySelector('input[data-field="medico"]').getAttribute('data-id').trim();
        obj.dia = el.querySelector('input[data-field="dia"]').value.trim();
        obj.hora = el.querySelector('input[data-field="hora"]').value.trim();


        const { data } = await api.post('consulta/', obj);

        if (consulta.id === 0) {
            alert('Consulta adicionado!');
            router.back();
            return;
        }

        if (data[0] === 'true') {
            alert('Alteração realizada');
        }


        changeBtnStates('del');
    }

    function handleChange(event) {

        if (isBtnSave) return;

        changeBtnStates('add');


    }

    function onBtnCancel() {

        if (!isBtnSave) return;

        changeBtnStates('del');


        backValues();

    }

    function changeBtnStates(group: string) {

        const el = document.querySelector('.' + styles.containerBtns);

        if (!el) return;

        const btnSave = el.querySelector('.fa-save');
        const btnDel = el.querySelector('.fa-trash-alt');
        const btnCancel = el.querySelector('.fa-ban');
        const btnBack = el.querySelector('.fa-arrow-circle-left');

        if (group === 'add') {

            setIsBtnSave(true);
            btnSave.classList.remove(styles.clsdisabled);
            btnCancel.classList.remove(styles.clsdisabled);

            btnDel.classList.add(styles.clsdisabled);
            btnBack.classList.add(styles.clsdisabled);

        } else {

            setIsBtnSave(false);
            btnDel.classList.remove(styles.clsdisabled);
            btnBack.classList.remove(styles.clsdisabled);

            btnSave.classList.add(styles.clsdisabled);
            btnCancel.classList.add(styles.clsdisabled);
        }

    }

    function backValues() {

        const el = document.querySelector('.' + styles.containerFields);

        if (!el) return;

        el.querySelector('input[data-field="id"]')['value'] = consulta.id;
        el.querySelector('input[data-field="paciente"]')['value'] = consulta.paciente;
        el.querySelector('input[data-field="medico"]')['value'] = consulta.medico;
        el.querySelector('input[data-field="dia"]')['value'] = consulta.dia;
        el.querySelector('input[data-field="hora"]')['value'] = consulta.hora;
    }

    function onBtnBack() {
        router.back();
    }

    async function onBtnDel() {

        if (consulta.id === 0) return;

        const { data } = await api.get('delconsultaID/' + consulta.id);

        if (data[0] === 'true') {
            alert('Exclusão realizada');
        }

        router.back();

    }

    function openSearchPaciente() {
        const el = (document.querySelector('.' + styles.containerPesquisaPaciente) as HTMLElement);
        if (!el) return;

        el.style.display = '';
    }

    function seachPaciente(e) {

        const v = e.target.value.toUpperCase();
        const el = document.querySelector('.' + styles.containerPesquisaPaciente + ' ul');

        if (!el) return;

        Array.from(el.querySelectorAll('li')).forEach((item) => {

            const p = item.getAttribute('data-paciente').toUpperCase();
            item.style.display = '';
            if (!p || p.indexOf(v) < 0) item.style.display = 'none';


        })
    }

    function clickPaciente(e) {

        const i = e.target.getAttribute('data-index');
        const el = (document.querySelector('.' + styles.containerPesquisaPaciente) as HTMLElement);
        const fi = document.querySelector('.' + styles.containerFields);

        if (!i || !el || !fi) return;

        const input = fi.querySelector('input[data-field="paciente"]');

        if (!input) return;

        input['value'] = paciente[i].nome;
        input.setAttribute('data-id', paciente[i].id);

        el.style.display = 'none';
        changeBtnStates('add');


    }

    function closeSearchPaciente(){
        const el = (document.querySelector('.' + styles.containerPesquisaPaciente) as HTMLElement);
        if (!el) return;
        el.style.display = 'none';
    }

    function openSearchMedico() {
        const el = (document.querySelector('.' + styles.containerPesquisaMedico) as HTMLElement);
        if (!el) return;

        el.style.display = '';
    }

    function seachMedico(e) {

        const v = e.target.value.toUpperCase();
        const el = document.querySelector('.' + styles.containerPesquisaMedico + ' ul');

        if (!el) return;

        Array.from(el.querySelectorAll('li')).forEach((item) => {

            const p = item.getAttribute('data-medico').toUpperCase();
            item.style.display = '';
            if (!p || p.indexOf(v) < 0) item.style.display = 'none';


        })
    }

    function clickMedico(e) {

        const i = e.target.getAttribute('data-index');
        const el = (document.querySelector('.' + styles.containerPesquisaMedico) as HTMLElement);
        const fi = document.querySelector('.' + styles.containerFields);

        if (!i || !el || !fi) return;

        const input = fi.querySelector('input[data-field="medico"]');

        if (!input) return;

        input['value'] = medico[i].nome;
        input.setAttribute('data-id', medico[i].id);

        el.style.display = 'none';
        changeBtnStates('add');


    }

    function closeSearchMedico(){
        const el = (document.querySelector('.' + styles.containerPesquisaMedico) as HTMLElement);
        if (!el) return;
        el.style.display = 'none';
    }

    return (
        <div className={styles.containerConsulta}>
            <h3 className="fa fa-user fa-3x"> Consulta</h3>
            <form onSubmit={handleSubmit}>
                {
                    <>
                        <div className={styles.containerFields}>

                            
                            <input type="text"  style={{display:'none'}} value={consulta.id > 0 ? consulta.id : 0} data-field="id" onChange={handleChange} />


                            <label>Paciente:</label>
                            <div>
                                <input type="text" defaultValue={consulta.paciente} disabled data-field="paciente" data-id={consulta.idpaciente} onChange={handleChange} />
                                <button type="button" className='fas fa-search' onClick={openSearchPaciente}></button>
                            </div>


                            <label>Medico:</label>
                            <div>
                                <input type="text" defaultValue={consulta.medico} data-field="medico" disabled data-id={consulta.idmedico} onChange={handleChange} />
                                <button type="button" className='fas fa-search' onClick={openSearchMedico}></button>
                            </div>


                            <label>Dia:</label>
                            <input type="text" defaultValue={consulta.dia} data-field="dia" onChange={handleChange} />


                            <label>Hora:</label>
                            <input type="text" defaultValue={consulta.hora} data-field="hora" onChange={handleChange} />

                        </div>
                        <div className={styles.containerBtns}>
                            <button type="submit" title="Salvar" className={"fas fa-save fa-2x " + styles.clsdisabled} />
                            <button type="button" title="Deletar" className="fas fa-trash-alt fa-2x" onClick={onBtnDel}></button>
                            <button type="button" title="Cancelar" className={"fas fa-ban fa-2x " + styles.clsdisabled} onClick={onBtnCancel} ></button>
                            <button type="button" title="Voltar" className="fas fa-arrow-circle-left fa-2x " onClick={onBtnBack}></button>
                        </div>
                    </>
                }
            </form>
            <div className={styles.containerPesquisaPaciente} style={{ display: 'none' }}>
                <div className={styles.containerPesquisaListagemUser}>
                    <div className={styles.containerSearchBtn}>
                        <input type="seacrh" placeholder="pesquisar: Nome,RG" onInput={seachPaciente} />
                        <button className="fas fa-times-circle" onClick={closeSearchPaciente}></button>
                    </div>
                    <div >
                        <ul id="ulListagemPacientes">
                            {
                                paciente.map((item, index) => {
                                    return (
                                        <li key={item.id} data-index={index} data-paciente={item.nome + item.rg} onClick={clickPaciente}>
                                            <span>Nome: {item.nome}</span>
                                            <span>RG: {item.rg}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                    </div>
                </div>
            </div>
            <div className={styles.containerPesquisaMedico} style={{ display: 'none' }}>
                <div className={styles.containerPesquisaListagemUser}>
                    <div className={styles.containerSearchBtn}>
                        <input type="seacrh" placeholder="pesquisar: Nome, Especialidade" onInput={seachMedico} />
                        <button className="fas fa-times-circle" onClick={closeSearchMedico}></button>
                    </div>
                    <div >
                        <ul id="ulListagemMedico">
                            {
                                medico.map((item, index) => {
                                    return (
                                        <li key={item.id} data-index={index} data-medico={item.nome + item.especialidade} onClick={clickMedico}>
                                            <span>Nome: {item.nome}</span>
                                            <span>Especialidade: {item.especialidade}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}