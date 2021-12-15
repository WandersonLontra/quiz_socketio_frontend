import { useState } from "react";

import { io } from "socket.io-client";

import { useUserContext } from "../../context/personContext";

import Footer from "../../components/footer";
import styles from './Aluno.module.scss';

type QuestionData = {
    id: number;
    question_about: string;
    question: string;
    options: string[];
    answers: string[];
}

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || '',{ transports: ["websocket"] });

export default function StudentPage() {
    const [socketQuestions, setSocketQuestions] = useState<QuestionData[]>([]);
    const { userName } =  useUserContext();

    ;(async () => {
        await socket.on('storageQuestions', (questions: QuestionData[]) => setSocketQuestions(questions));
    
        await socket.on('receivedQuestions',(question: QuestionData) => {
            const data = socketQuestions;
            data.push(question);
            setSocketQuestions(data);
        });
        
        console.log(socketQuestions);
    })();

    
    // socket.emit('sendMessage',{userName})

    return (
        <main className={styles.container}>
            <h1>{`Olá ${userName}`}</h1>

            <section>
                {socketQuestions?.map(socketQuestion => (
                    <button key={socketQuestion.id}>
                        <span></span>
                        {socketQuestion.question_about}
                    </button>
                ))}
            </section>

            
            <p>
                Preste atenção no professor.
            </p>
            
            <Footer />            

        </main>
    )
}