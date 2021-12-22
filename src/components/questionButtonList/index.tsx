import { useEffect, useState } from "react";
import { useUserContext } from "../../context/personContext";

import QuestionModal from "../questionModal";

type QuestionData = {
    id: string;
    question_about: string;
    question: string;
    options: string[];
    answers: string[];
}

interface QuestionButtonListProps {
    socketQuestion: QuestionData;
}

export default function QuestionButtonList({socketQuestion} : QuestionButtonListProps) {
    const [openModal, setOpenModal] = useState(false);
    const [questionIntoModal, setQuestionIntoModal] = useState({} as QuestionData);
    const [color, setColor] = useState('');

    const { changeColorByAnswer, studentAnswers, setColorByAnswer } = useUserContext();
    
    useEffect(() => {
        let isCorrectAnswer = false;
        const changedColorsStack = changeColorByAnswer;
        if (studentAnswers.answerGiven?.length === studentAnswers.correctAnswer?.length) {
            const checkCorrectsAmount = studentAnswers.answerGiven?.filter(({ option }) => (
                studentAnswers.correctAnswer?.includes(option)
            ));

            if (checkCorrectsAmount?.length === studentAnswers.correctAnswer?.length) {
                isCorrectAnswer = true;
            } else {
                isCorrectAnswer = false;
            };

            const sendAnswerData = {
                id: studentAnswers.id,
                question_about: studentAnswers.question_about,
                isCorrectAnswer
            }

            const isAlreadyAnswered = changedColorsStack.findIndex(({id}) => id === studentAnswers.id);
            if(isAlreadyAnswered !== -1){
                changedColorsStack[isAlreadyAnswered] = sendAnswerData;
            } else {
                changedColorsStack.push(sendAnswerData);
            }
            setColorByAnswer(changedColorsStack);
        } else {
            const sendAnswerData = {
                id: studentAnswers.id,
                question_about: studentAnswers.question_about,
                isCorrectAnswer
            }

            const isAlreadyAnswered = changedColorsStack.findIndex(({id}) => id === studentAnswers.id);
            if(isAlreadyAnswered !== -1){
                changedColorsStack[isAlreadyAnswered] = sendAnswerData;
            } else {
                changedColorsStack.push(sendAnswerData);
            }
            setColorByAnswer(changedColorsStack);
        }

        changeColorByAnswer?.map((element) => {
            if(element.id === socketQuestion.id){
                if(element.isCorrectAnswer){
                    setColor('#04D361');
                } else {
                    setColor('#FF3859');
                }
            }
        })
        console.log(changeColorByAnswer);
    }, [ socketQuestion, changeColorByAnswer, studentAnswers, setColorByAnswer]);


    function handleOpenModal(question: QuestionData) {
        setQuestionIntoModal(question);
        setOpenModal(true);
    }

    function handleUserModalClose() {
        setOpenModal(false);
    }

    return (
        <>
            <button
                onClick={() => handleOpenModal(socketQuestion)}
                className="animate__animated animate__bounceIn"
            >
                <span style={{background: color}}></span>
                {socketQuestion.question_about}
            </button>

            <QuestionModal
                isOpen={openModal}
                onRequestClose={handleUserModalClose}
                question={questionIntoModal}
            />
        </>
    )
}