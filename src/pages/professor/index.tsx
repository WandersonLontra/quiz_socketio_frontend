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

interface StudentCardData {
    name: string;
    answers_amount: number;
    corrects: number;
    wrongs: number;
    percents: number;
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

    const students: StudentCardData[] = [];
    for( let student in studentAnswers){
        let corrects = 0;
        let wrongs = 0;
        const data = studentAnswers[student].reduce((acc, curr: answerData, index) => {

            if(curr.isCorrectAnswer){
                corrects++;
            } else if (!curr.isCorrectAnswer){
                wrongs++;
            }
            acc.percents = (100 * corrects) / questionsAmount;
            acc.name = student;
            acc.answers_amount = index + 1;
            acc.corrects = corrects;
            acc.wrongs = wrongs;

            return acc
        },{} as StudentCardData);

        students.push(data);
    };

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
                {students.map((student) => (
                    <div key={student.name}>
                        <h3>Aluno: {student.name}</h3>
                        <div className={styles.wrapperInput}>
                            <span className={styles.leftInput}>0%</span>
                            <input type="range" min="0" max="100" value={student.percents} readOnly />
                            <span className={styles.rightInput}>100%</span>

                            <div>
                                <p>Respondeu {student.answers_amount} de {questionsAmount} questões</p>
                                <p>Acertou: {student.corrects}</p>
                                <p>Errou: {student.wrongs}</p>
                            </div>
                        </div>
                    </div>

                ))}
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