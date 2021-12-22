import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface StudentAnswersData {
    option: string;
    isMarked: boolean;
}

interface AnswersComparison {
    id: string;
    question_about: string;
    answerGiven: StudentAnswersData[];
    correctAnswer: string[];
}

interface ChangeColorByAnswerData {
    id: string;
    question_about: string;
    isCorrectAnswer: boolean;
}

interface UserContextData {
    userName: string;
    setUserName: Dispatch<SetStateAction<string>>;
    changeColorByAnswer: ChangeColorByAnswerData[];
    setColorByAnswer: Dispatch<SetStateAction<ChangeColorByAnswerData[]>>;
    studentAnswers: AnswersComparison;
    setStudentAnswers: Dispatch<SetStateAction<AnswersComparison>>;
}

type UserProviderProps = {
    children: ReactNode;
}

const UserContext  = createContext({} as UserContextData);

export function UserProvider({children}: UserProviderProps){
    const [userName, setUserName] = useState('');
    const [studentAnswers, setStudentAnswers] = useState({} as AnswersComparison);
    const [changeColorByAnswer, setColorByAnswer] = useState<ChangeColorByAnswerData[]>([]);
       
    return (
        <UserContext.Provider value={{userName, setUserName, setColorByAnswer, changeColorByAnswer,setStudentAnswers, studentAnswers}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    const context = useContext(UserContext);

    return context;
}

