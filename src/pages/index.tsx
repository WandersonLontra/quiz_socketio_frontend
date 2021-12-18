import { useState } from "react";

import UserModal from "../components/userModal";

import styles from '../styles/Home.module.scss'

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [userType, setUserType] = useState('');

  
  function handleUserModalClose(){
    setOpenModal(false);
  }

  return(
    <main className={styles.container}>
      <title>QuizQuiz | Seja bem vindo</title>
      <div className={styles.askAccess}>
        <button 
          className="animate__animated animate__fadeInDown"
          onClick={() => {
            setOpenModal(true)
            setUserType('aluno')
          }}
        >
          Sou aluno
        </button>

        <button 
          className="animate__animated animate__fadeInUp"
          onClick={() => {
            setOpenModal(true)
            setUserType('professor')
          }}
        >
          Sou professor
        </button>
      </div>

      <UserModal 
        isOpen={openModal}
        userType={userType}
        onRequestClose={handleUserModalClose}
      />
    </main>
  )
}
