import styles from './styles.module.css';
import { api, toDate } from '../../services/api';
import { useRouter } from 'next/router'
import {  useEffect, useState } from 'react';

interface IMedico {
    id: number,
    nome: string,
    especialidade: string,
    cpf: string,
    rg: string,
    nasc: string,
    senha: string,
}

export default function Medicos() {

    const [medico, setMedico] = useState({} as IMedico);
    const [isBtnSave, setIsBtnSave] = useState(false);
    const router = useRouter();

    async function getMedicoID() {

        const param = String(router.query.slug);
        if (!param || param === 'undefined') return;

        const { data } = await api.get('medicoID/' + param);

        if (data.length === 0) {
            const obj = {} as IMedico;
            obj.id = 0;
            obj.nome = ' ';
            obj.especialidade = ' ';
            obj.cpf = ' ';
            obj.rg = ' ';
            obj.nasc = '';
            obj.senha = ' ';
            data.push(obj);
        }

        data[0].nasc = toDate(data[0].nasc,'dd/mm/yyyy','br');

        setMedico(data[0])
    }

    useEffect(() => {
        getMedicoID()
    }, [router.query.slug]);

    async function handleSubmit(event) {
        event.preventDefault();

        const el = event.target;
        if (!el) return;

        const obj = {} as IMedico;
        obj.id = el.querySelector('input[data-field="id"]').value.trim();
        obj.nome = el.querySelector('input[data-field="nome"]').value.trim().substr(0,98);
        obj.especialidade = el.querySelector('input[data-field="especialidade"]').value.trim().substr(0,29);
        obj.cpf = el.querySelector('input[data-field="cpf"]').value.trim().substr(0,11);
        obj.rg = el.querySelector('input[data-field="rg"]').value.trim().substr(0,11);
        obj.nasc = toDate(el.querySelector('input[data-field="nasc"]').value.trim(),'yyyy-mm-dd','us');;
        obj.senha = el.querySelector('input[data-field="senha"]').value.trim().substr(0,20);

        const { data } = await api.post('medico/', obj);

        if(medico.id === 0){
            alert('Medico adicionado!');
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
        setIsBtnSave(true);

    }

    function onBtnCancel() {

        if (!isBtnSave) return;

        changeBtnStates('del');

        setIsBtnSave(false);
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
            btnSave.classList.remove(styles.clsdisabled);
            btnCancel.classList.remove(styles.clsdisabled);

            btnDel.classList.add(styles.clsdisabled);
            btnBack.classList.add(styles.clsdisabled);
        } else {

            btnDel.classList.remove(styles.clsdisabled);
            btnBack.classList.remove(styles.clsdisabled);

            btnSave.classList.add(styles.clsdisabled);
            btnCancel.classList.add(styles.clsdisabled);
        }

    }

    function backValues() {

        const el = document.querySelector('.' + styles.containerFields);

        if (!el) return;

        el.querySelector('input[data-field="id"]')['value'] = medico.id;
        el.querySelector('input[data-field="nome"]')['value'] = medico.nome;
        el.querySelector('input[data-field="especialidade"]')['value'] = medico.especialidade;
        el.querySelector('input[data-field="cpf"]')['value'] = medico.cpf;
        el.querySelector('input[data-field="rg"]')['value'] = medico.rg;
        el.querySelector('input[data-field="senha"]')['value'] = medico.senha;
    }

    function onBtnBack() {
        router.back();
    }

    async function onBtnDel() {

        if(medico.id === 0) return;

        const { data } = await api.get('delmedicoID/' + medico.id);

        if (data[0] === 'true') {
            alert('Exclusão realizada');
        }

        router.back();

    }

    return (
        <div className={styles.containerMedicos}>
            <h3 className="fa fa-user fa-3x"> Médicos</h3>
            <form onSubmit={handleSubmit}>
                {
                    <>
                        <div className={styles.containerFields}>

                            
                            <input type="text" style={{display:'none'}}  value={medico.id > 0 ? medico.id : 0} data-field="id" onChange={handleChange} />


                            <label>Nome:</label>
                            <input type="text" defaultValue={medico.nome} data-field="nome" onChange={handleChange} />


                            <label>Especialidade:</label>
                            <input type="text" defaultValue={medico.especialidade} data-field="especialidade" onChange={handleChange} />


                            <label>CPF:</label>
                            <input type="text" defaultValue={medico.cpf} data-field="cpf" onChange={handleChange} />


                            <label>RG:</label>
                            <input type="text" defaultValue={medico.rg} data-field="rg" onChange={handleChange} />


                            <label>Nasc:</label>
                            <input type="date" defaultValue={medico.nasc} data-field="nasc" onChange={handleChange} />


                            <label>Senha:</label>
                            <input type="text" defaultValue={medico.senha} data-field="senha" onChange={handleChange} />

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
        </div>
    );

}