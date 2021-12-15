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
      <div className={styles.askAccess}>
        <button 
          onClick={() => {
            setOpenModal(true)
            setUserType('aluno')
          }}
        >
          Sou aluno
        </button>

        <button 
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
