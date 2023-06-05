import { useEffect, useState } from "react";
import { Menu, MenuLateral, Painel } from "../../components";
import global from '../../styles/style.module.scss'
import style from './visaoGeral.module.scss'
import { api } from "../../lib/axios";
import { Clock, DownloadSimple, Export, HardDrive, Question, Swap } from "@phosphor-icons/react";

type ConsultaHost = {
    hostname: string,
    ip: string,
    HostQueries: {
        neighbor: string,
        port: string,
        remotePort: string,
        status: string,
        createdAt: string
    }[],
    createdAt: string
}

export function VisaoGeral() {

    const [ consultaHosts, setConsultaHosts ] = useState<ConsultaHost[]>([])
    
    useEffect(()=> {
        api.get('/').then((response) => {setConsultaHosts(response.data)})
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
                    <h2>
                        <ul className={style.hostColumn}>
                            <li>
                                <p>Host</p>
                                <HardDrive size={22}/>
                            </li>
                            <li>
                                <p>Neighbors</p>
                                <Swap size={22}/>
                            </li>
                            <li>
                                <p>Port</p>
                                <Export size={22}/>
                            </li>
                            <li>
                                <p>Remote Port</p>
                                <DownloadSimple size={22}/>
                            </li>
                            <li>
                                <p>Last Check</p>
                                <Clock size={22}/>
                            </li>
                            <li>
                                <p>Status</p>
                                <Question size={22}/>
                            </li>
                        </ul>
                    </h2>


                    <article className={`overflow-auto h-[calc(100vh-297px)]`}>
                        { consultaHosts.map((host, index) => (
                            <ul key={index} className={style.host}>
                                <li className={`${style.hostname} ${host.HostQueries.find((vizinho) => vizinho.status === 'Invertido') ? style.hostInvertido : '' }`} >
                                    {host.hostname}
                                </li>
                                <li>
                                { 
                                    host.HostQueries.map((query, index) => (
                                        <ul key={index}>
                                            <div className={`${style.enlace} ${ query.status == "Invertido" ? style.invertido : '' }`}>
                                                <li>{query.neighbor}</li>
                                                <li>{query.port}</li>
                                                <li>{query.remotePort}</li>
                                                <li>{query.createdAt}</li>
                                                <li>{query.status}</li>
                                            </div>
                                        </ul>
                                    ))
                                }
                                </li>
                                
                            </ul>
                        ))}
                    </article>
                </main>
            </div>  
        </>
    )
}