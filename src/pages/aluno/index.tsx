import { useEffect, useState } from "react";

import { io } from "socket.io-client";

import { useUserContext } from "../../context/personContext";

import Footer from "../../components/footer";
import styles from './Aluno.module.scss';
import QuestionButtonList from "../../components/questionButtonList";

type QuestionData = {
    id: string;
    question_about: string;
    question: string;
    options: string[];
    answers: string[];
}

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || '', { transports: ["websocket"] });

export default function StudentPage() {
    const [socketQuestions, setSocketQuestions] = useState<QuestionData[]>([]);
 
    const { userName, studentAnswers } = useUserContext();

    useEffect(() => {
        if (studentAnswers.answerGiven) {
            let isCorrectAnswer = false;
            if (studentAnswers.answerGiven?.length === studentAnswers.correctAnswer?.length) {
                const checkCorrectsAmount = studentAnswers.answerGiven?.filter(({ option }) => (
                    studentAnswers.correctAnswer?.includes(option)
                ));

                if (checkCorrectsAmount.length === studentAnswers.correctAnswer?.length) {
                    isCorrectAnswer = true;
                } else {
                    isCorrectAnswer = false;
                };

                const sendAnswerData = {
                    id: studentAnswers.id,
                    question_about: studentAnswers.question_about,
                    student_name: userName,
                    isCorrectAnswer
                }

                socket.emit('studentAnswersData', sendAnswerData);
            } else {
                const sendAnswerData = {
                    id: studentAnswers.id,
                    question_about: studentAnswers.question_about,
                    student_name: userName,
                    isCorrectAnswer
                }

                socket.emit('studentAnswersData', sendAnswerData);
            }
        }
    }, [studentAnswers]);

    ;(async () => {
        await socket.on('storageQuestions', (questions: QuestionData[]) => setSocketQuestions(questions));

        await socket.on('receivedQuestions', (question: QuestionData) => {
            const data = socketQuestions;

            const isExisted = data.findIndex(({ id }) => id === question.id);

            if (isExisted === -1) {
                data.push(question);
                setSocketQuestions(data);
            }
        });
    })();

    return (
        <main className={styles.container}>
            <title>QuizQuiz | Área do aluno</title>

            <h1 className="animate__animated animate__bounceInLeft">{`Olá ${userName}`}</h1>

            <section>
                {socketQuestions?.map(socketQuestion => (
                    <QuestionButtonList
                        key={socketQuestion.id}
                        socketQuestion={socketQuestion}
                    />
                ))}
            </section>

            <p>
                Preste atenção no professor.
            </p>

            <Footer />
        </main>
    )
}
