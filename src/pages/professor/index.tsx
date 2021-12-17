import { useEffect, useState } from "react";

import { io } from "socket.io-client";

import { AiOutlinePlus } from 'react-icons/Ai';

import { useUserContext } from "../../context/personContext";

import Footer from "../../components/footer";

import CreateQuestionModal from "../../components/createQuestionModal";

import styles from './Professor.module.scss';

type QuestionData = {
    question_about: string;
    question: string;
    options: string[];
    answers: string[];
}

type newQuestionData = QuestionData | null;

type answerData = {
    id: string;
    question_about: string;
    isCorrectAnswer: boolean;
}

interface StudentAnswerData {
    [key: string]: answerData[]
}

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || '',{ transports: ["websocket"] });

export default function TeacherPage() {
    const [openModal, setOpenModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState<newQuestionData>(null);
    const [studentAnswers, setStudentAnswers] = useState({} as StudentAnswerData);
    const [questionsAmount, setQuestionsAmount] = useState(0);

    const { userName } = useUserContext();

    useEffect(() => {
        socket.emit('createQuestion', newQuestion);
    },[newQuestion])

    socket.on('answersToTeacher', (answersReceived: StudentAnswerData) => setStudentAnswers(answersReceived) );

    socket.on('questionsAmount', (questionsAmount: number) => setQuestionsAmount(questionsAmount))
    ;(async () => {
        
    })();

    console.log(studentAnswers);

    function handleUserModalClose(){
        setOpenModal(false);
    }

    return(
        <main className={styles.container}>
            <header>
                <h1>{`Olá ${userName}`}</h1>
                <button
                    title="Clique para criar nova questão."
                    onClick={() => setOpenModal(true)}
                >
                    <AiOutlinePlus />
                    Novo
                </button>
            </header>

            <section className={styles.studentSpace}>
                <h1>Total de questões: {questionsAmount}</h1>

                <div>
                    <h3>Aluno: João</h3>
                    <div className={styles.wrapperInput}>
                        <span className={styles.leftInput}>0%</span>
                        <input type="range" min="0" max="100" value={40}/>
                        <span className={styles.rightInput}>100%</span>

                        <div>
                            <p>Respondeu 5 de {questionsAmount} questões</p>
                            <p>Acertou: 4</p>
                            <p>Errou: 1</p>
                        </div>
                    </div>
                </div>
            </section>

        
            <Footer />  

            <CreateQuestionModal 
                isOpen={openModal}
                onRequestClose={handleUserModalClose}
                newQuestion={setNewQuestion}
            />       

        </main>
    )
}