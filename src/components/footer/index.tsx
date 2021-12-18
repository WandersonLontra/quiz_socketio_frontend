import { MdBook, MdSettings } from 'react-icons/Md';
import { FaUserFriends  } from 'react-icons/Fa';

export default function Footer() {
    return (
        <footer className="animate__animated animate__bounceInUp">
            <div>
                <a href="#">
                    <MdBook />
                    <span>Aula</span>
                </a>
            </div>
            <div>
                <a href="#">
                    <FaUserFriends />
                    <span>Amigos</span>
                </a>
            </div>
            <div>
                <a href="#">
                    <MdSettings />
                    <span>Configurações</span>
                </a>
            </div>
        </footer>
    )
}