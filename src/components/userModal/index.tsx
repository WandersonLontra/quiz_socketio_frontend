import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

import Modal from "react-modal";

import { useUserContext } from "../../context/personContext";

import { RiCloseLine } from 'react-icons/ri';
import { FaSignInAlt } from 'react-icons/fa';

import styles from "./Modal.module.scss";

Modal.setAppElement('#__next');

interface userModalProps {
    isOpen: boolean;
    userType: string;
    onRequestClose: () => void;
}

export default function UserModal({isOpen, userType, onRequestClose}:userModalProps){
    const [name, setName] = useState('');
    const { setUserName } = useUserContext();

    const router = useRouter();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setUserName(name);
        
        router.push(userType)
    }
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="React-Modal-Overlay"
            className="React-Modal-Content"
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <RiCloseLine />
            </button>

            <form onSubmit={handleSubmit} className={styles.container}>
                <h1>{`Olá ${userType}, qual o seu nome?`}</h1>

                <input 
                    type="text" 
                    name="name"
                    value={name}
                    onChange={event => setName(event.target.value)} 
                    required
                />

                <button type="submit">
                    Acessar
                    <FaSignInAlt />
                </button>
            </form>
        </Modal>
    )
}