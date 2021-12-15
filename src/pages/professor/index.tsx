import { useEffect, useState } from "react";

import { io } from "socket.io-client";

import { AiOutlinePlus } from 'react-icons/Ai';

import { useUserContext } from "../../context/personContext";

import Footer from "../../components/footer";

import NewQuestionModal from "../../components/newQuestionModal";

import styles from './Professor.module.scss';

type QuestionData = {
    question_about: string;
    question: string;
    options: string[];
    answers: string[];
}

type newQuestionData = QuestionData | null;

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || '',{ transports: ["websocket"] });

export default function TeacherPage() {
    const [openModal, setOpenModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState<newQuestionData>(null);

    // const { socket } = useUserContext();

    useEffect(() => {
        socket.emit('createQuestion', newQuestion);
    },[newQuestion])

    const { userName } = useUserContext();


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

            <NewQuestionModal 
                isOpen={openModal}
                onRequestClose={handleUserModalClose}
                newQuestion={setNewQuestion}
            />       

        </main>
    )
}