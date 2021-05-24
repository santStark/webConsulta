import styles from './styles.module.css';
import { api } from '../../services/api';
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { isGeneratorFunction } from 'util/types';

interface IPaciente {
    id: number,
    nome: string,
    email: string,
    cpf: string,
    rg: string,
    nasc: string,
    senha: string,
}

export default function Pacientes() {

    const [paciente, setPaciente] = useState({} as IPaciente);
    const [isBtnSave, setIsBtnSave] = useState(false);
    const router = useRouter();

    async function getpacienteID() {

        const param = String(router.query.slug);
        if (!param || param === 'undefined') return;

        const { data } = await api.get('pacienteID/' + param);

        if (data.length === 0) {
            const obj = {} as IPaciente;
            obj.id = 0;
            obj.nome = ' ';
            obj.email = ' ';
            obj.cpf = ' ';
            obj.rg = ' ';
            obj.nasc = ' ';
            obj.senha = ' ';
            data.push(obj);
        }

        setPaciente(data[0])
    }

    useEffect(() => {
        getpacienteID()
    }, [router.query.slug]);

    async function handleSubmit(event) {
        event.preventDefault();

        const el = event.target;
        if (!el) return;

        const obj = {} as IPaciente;
        obj.id = el.querySelector('input[data-field="id"]').value.trim();
        obj.nome = el.querySelector('input[data-field="nome"]').value.trim();
        obj.email = el.querySelector('input[data-field="email"]').value.trim();
        obj.cpf = el.querySelector('input[data-field="cpf"]').value.trim();
        obj.rg = el.querySelector('input[data-field="rg"]').value.trim();
        obj.nasc = el.querySelector('input[data-field="nasc"]').value.trim();
        obj.senha = el.querySelector('input[data-field="senha"]').value.trim();

        const { data } = await api.post('paciente/', obj);

        if(paciente.id === 0){
            alert('Paciente adicionado!');
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

        el.querySelector('input[data-field="id"]')['value'] = paciente.id;
        el.querySelector('input[data-field="nome"]')['value'] = paciente.nome;
        el.querySelector('input[data-field="email"]')['value'] = paciente.email;
        el.querySelector('input[data-field="cpf"]')['value'] = paciente.cpf;
        el.querySelector('input[data-field="rg"]')['value'] = paciente.rg;
        el.querySelector('input[data-field="senha"]')['value'] = paciente.senha;
    }

    function onBtnBack() {
        router.back();
    }

    async function onBtnDel() {

        if(paciente.id === 0) return;

        const { data } = await api.get('delPacienteID/' + paciente.id);

        if (data[0] === 'true') {
            alert('Exclusão realizada');
        }

        router.back();

    }

    return (
        <div className={styles.containerPacientes}>
            <h3 className="fa fa-user fa-3x"> PACIENTE</h3>
            <form onSubmit={handleSubmit}>
                {
                    <>
                        <div className={styles.containerFields}>

                            
                            <input type="text" style={{display:'none'}}  value={paciente.id > 0 ? paciente.id : 0} data-field="id" onChange={handleChange} />


                            <label>Nome:</label>
                            <input type="text" defaultValue={paciente.nome} data-field="nome" onChange={handleChange} />


                            <label>E-mail:</label>
                            <input type="text" defaultValue={paciente.email} data-field="email" onChange={handleChange} />


                            <label>CPF:</label>
                            <input type="text" defaultValue={paciente.cpf} data-field="cpf" onChange={handleChange} />


                            <label>RG:</label>
                            <input type="text" defaultValue={paciente.rg} data-field="rg" onChange={handleChange} />


                            <label>Nasc:</label>
                            <input type="text" defaultValue={paciente.nasc} data-field="nasc" onChange={handleChange} />


                            <label>Senha:</label>
                            <input type="text" defaultValue={paciente.senha} data-field="senha" onChange={handleChange} />

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