import { Menu, Button } from "../components"

export function Servicos() {
    return (
        <>
            <Menu />
            <div>
                <a 
                href="https://www.shareaholic.com/api/share/
                ?v=1
                &apitype=1
                &apikey=8943b7fd64cd8b1770ff5affa9a9437b
                &title=Veja%20Meu%20Link%20Encurtado
                &link=http://localhost:5173/servicos
                &source=Shareaholic
                &templates[whatsapp][Veja%20meu%20novo%20link!!]=${cta} -- ${Incrível!} - ${https://youtube.com}"
                target="_blank"
                >
                    <Button
                        text="Compartilhar"
                    />
                </a>
            </div>
        </>
    )
}