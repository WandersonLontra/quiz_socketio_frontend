import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import Modal from "react-modal";

import { RiCloseLine } from 'react-icons/ri';
import { FaSignInAlt } from 'react-icons/fa';

import styles from './Modal.module.scss';

Modal.setAppElement('#__next');

type newQuestionData = {
    question_about: string;
    question: string;
    options: string[];
    answers: string[];
}

interface NewQuestionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    newQuestion: Dispatch<SetStateAction<newQuestionData | null>>;
}

export default function CreateQuestionModal({isOpen, onRequestClose, newQuestion}: NewQuestionModalProps){
    const [questionAbout, setQuestionAbout] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState('');
    const [answers, setAnswer] = useState('');

    function cleanState(){
        setQuestionAbout('');
        setQuestion('');
        setOptions('');
        setAnswer('');

        newQuestion(null);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let data = {
            question_about: questionAbout,
            question: question,
            options: options.split('/',5),
            answers: answers.split('/')
        }
        await newQuestion(data);

        await cleanState();
        
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="React-Modal-Overlay"
            className="React-Modal-Content"
            
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <RiCloseLine />
            </button>

            <form onSubmit={handleSubmit} className={styles.container}>
                <h1>Crie uma nova questão</h1>

                <div>
                    <label htmlFor="question_about">Sobre a questão</label>
                    <input 
                        required
                        type="text" 
                        name="question_about" 
                        id="question_about"
                        value={questionAbout}
                        onChange={event => setQuestionAbout(event.target.value)}
                        placeholder="Ex: Números pares"
                    />
                </div>

                <div>
                    <label htmlFor="question">Descreva a questão</label>
                    <input 
                        required
                        type="text" 
                        name="question" 
                        id="question"
                        value={question}
                        onChange={event => setQuestion(event.target.value)}
                        placeholder="Ex: Quais das opções abaixo são números pares?"
                    />
                </div>

                <div>
                    <label htmlFor="options">Ofereça até 5 opções de resposta separados por /</label>
                    <input 
                        required
                        type="text" 
                        name="options" 
                        id="options"
                        value={options}
                        onChange={event => setOptions(event.target.value)}
                        placeholder="Ex: 123/456/789/012/345"
                    />
                </div>

                <div>
                    <label htmlFor="options">Escreva a(s) resposta(s) separados por /</label>
                    <input 
                        required
                        type="text" 
                        name="options" 
                        id="options"
                        value={answers}
                        onChange={event => setAnswer(event.target.value)}
                        placeholder="Ex: 012/456"
                    />
                </div>
                

                <button type="submit">
                    Criar
                    <FaSignInAlt />
                </button>
            </form>
        </Modal>
    )   
}