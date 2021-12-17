import { Dispatch, SetStateAction, useEffect, useState } from "react";

import styles from '../Modal.module.scss';

interface StudentAnswersData {
    option: string;
    isMarked: boolean;
}

interface AnswerOptionProps{
    option: string;
    response: Dispatch<SetStateAction<StudentAnswersData[]>>;
    previewsOptionMarked: StudentAnswersData[];
}

export default function AnswerOption({ option, response, previewsOptionMarked }: AnswerOptionProps) {
    const [ answersClicked, setAnswersClicked] = useState(false);

    useEffect(() => {
        const data = previewsOptionMarked;

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