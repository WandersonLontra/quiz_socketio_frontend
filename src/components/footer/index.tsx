import { MdBook, MdSettings, MdPeople } from 'react-icons/Md';

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
                    <MdPeople />
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