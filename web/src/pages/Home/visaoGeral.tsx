import { useEffect, useState } from "react";
import { Menu, MenuLateral, Painel } from "../../components";
import global from '../../styles/style.module.scss'
import { api } from "../../lib/axios";

type Host = {
    hostname: string,
    ip: string,
    neighbors: [{
        neighbor: string,
        port: string,
        remotePort: string
    }],
}

export function VisaoGeral() {

    const [ hosts, setHosts] = useState<Host[]>([])
    
    useEffect(()=> {
        api.get('/').then((response) => {setHosts(response.data)})
    }, [])

    return (
        <>
            <Menu ativo="visao geral"/>
            <div className={`mx-8 mt-14 w-vw ${global.grid}`}>
                <MenuLateral 
                    titulo='Menu'
                    lista={[
                    ]}
                />
                <Painel />
                <main>
                    <ul>
                        { hosts.map((host, index) => (
                            <ul key={index} className="text-white flex gap-4 mb-4">
                                <li>{host.hostname}</li>
                                <li>{host.ip}</li>
                                <li>
                                    {host.neighbors.map((neighbor, index) => (
                                        <ul key={index} className="flex gap-4">
                                            <li>{neighbor.neighbor}</li>
                                            <li>{neighbor.port}</li>
                                            <li>{neighbor.remotePort}</li>
                                        </ul>
                                    ))}
                                </li>
                            </ul>

                        ))}
                    </ul>
                </main>
            </div>  
        </>
    )
}