import { useCallback, useState } from "react";

import Modal from "react-modal";

import { RiCloseLine } from 'react-icons/ri';
import { AiOutlineArrowRight } from 'react-icons/ai';

import AnswerOption from "./answerOption";

import styles from './Modal.module.scss';
import { useUserContext } from "../../context/personContext";

Modal.setAppElement('#__next');

type QuestionData = {
    id: string;
    question_about: string;
    question: string;
    options: string[];
    answers: string[];
}

interface StudentAnswersData {
    option: string;
    isMarked: boolean;
}

interface QuestionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    question: QuestionData;
}

export default function QuestionModal({ isOpen, onRequestClose, question }: QuestionModalProps) {
    const [studentAnswersMarked, setStudentAnswersMarked] = useState<StudentAnswersData[]>([]);

    const { setStudentAnswers } = useUserContext();

    const handleClick = useCallback(() => {
        const student_answer = studentAnswersMarked.reduce((acc,{option,isMarked}) => {
            if(isMarked){
                const isExisted = acc.findIndex(element => (element.option === option && element.isMarked));
                if(isExisted === -1){
                    acc.push({
                        option,
                        isMarked 
                    });
                    return acc;
                } 
                acc.splice(isExisted,1);
            }
            
            const isExisted = acc.findIndex(element => (element.option === option));
    
            acc.splice(isExisted,1);
    
            return acc;
        },[] as StudentAnswersData[]);
        
        setStudentAnswers({
            id: question.id,
            question_about: question.question_about,
            answerGiven: student_answer,
            correctAnswer: question.answers
        });

        onRequestClose();
    },[studentAnswersMarked, question])

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="React-Modal-Overlay"
            className={`${styles.wrapperContent} animate__animated animate__bounceInUp`}
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <RiCloseLine />
            </button>

            <header className={styles.questionAbout}>
                <button>
                    <span></span>
                    {question.question_about}
                </button>
            </header>

            <section className={styles.container}>
                <div className={styles.wrapperForm}>
                    <h1>{question.question}</h1>
                    {question.options?.map(option => (
                        <div key={option}>
                            <AnswerOption 
                                option={option}
                                response={setStudentAnswersMarked}
                                previewsOptionMarked={studentAnswersMarked}
                            />
                        </div>
                    ))}

                </div>

                <button onClick={handleClick} className={styles.submitButton}>
                    ENVIAR
                    <span><AiOutlineArrowRight /></span>
                </button>
            </section>
        </Modal>
    )
}
