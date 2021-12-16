import { Dispatch, SetStateAction, useEffect, useState } from "react";

import styles from '../questionModal/Modal.module.scss';


interface StudentAnswersData {
    option: string;
    isMarked: boolean;
}

interface AnswerOptionProps{
    option: string;
    response: Dispatch<SetStateAction<StudentAnswersData[]>>;
    previusOptionMarked: StudentAnswersData[];
}

export default function AnswerOption({ option, response, previusOptionMarked }: AnswerOptionProps) {
    const [ answersClicked, setAnswersClicked] = useState(false);

    useEffect(() => {
        const data = previusOptionMarked;

        data?.push({
            option,
            isMarked: answersClicked
        })

        response(data);
    },[answersClicked]);

    return (
        <button
            className={answersClicked ? (styles.activeOption) : ''}
            onClick={() => setAnswersClicked(!answersClicked)}
        >
            {option}
        </button>
    )
}