import { useEffect, useState } from "react";

import { io } from "socket.io-client";

import { useUserContext } from "../../context/personContext";

import Footer from "../../components/footer";
import styles from './Aluno.module.scss';
import QuestionModal from "../../components/questionModal";

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

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || '', { transports: ["websocket"] });

export default function StudentPage() {
    const [openModal, setOpenModal] = useState(false);
    const [socketQuestions, setSocketQuestions] = useState<QuestionData[]>([]);
    const [questionIntoModal, setQuestionIntoModal] = useState({} as QuestionData);
    const [studentAnswers, setStudentAnswers] = useState<StudentAnswersData[]>([]);
    
    const { userName } = useUserContext();
    
    useEffect(() => {
        console.log(studentAnswers);
        // setOpenModal(false);
    },[studentAnswers])

    ;(async () => {
        await socket.on('storageQuestions', (questions: QuestionData[]) => setSocketQuestions(questions));

        await socket.on('receivedQuestions', (question: QuestionData) => {
            const data = socketQuestions;

            const isExisted = data.findIndex( ({id}) => id === question.id);

            if (isExisted === -1) {
                data.push(question);
                setSocketQuestions(data);
            }
        });
    })();


    function handleOpenModal(question: QuestionData){
        setQuestionIntoModal(question);
        setOpenModal(true);
    }

    function handleUserModalClose() {
        setOpenModal(false);
    }

    return (
        <main className={styles.container}>
            <h1>{`Olá ${userName}`}</h1>

            <section>
                {socketQuestions?.map(socketQuestion => (
                    <button
                        onClick={() => handleOpenModal(socketQuestion)}
                        key={socketQuestion.id}
                    >
                        <span></span>
                        {socketQuestion.question_about}
                    </button>
                ))}
            </section>


            <p>
                Preste atenção no professor.
            </p>

            <Footer />

            <QuestionModal
                isOpen={openModal}
                onRequestClose={handleUserModalClose}
                question={questionIntoModal}
                studentAnswer={setStudentAnswers}
            />

        </main>
    )
}