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
    const [ studentAnswers, setStudentAnswers ] = useState({} as StudentAnswerData);

    const { userName } = useUserContext();

    useEffect(() => {
        socket.emit('createQuestion', newQuestion);
    },[newQuestion])

    socket.on('sendAnswersToTeacher', (answersReceived: StudentAnswerData) => setStudentAnswers(answersReceived) );
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

            <section>
                
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