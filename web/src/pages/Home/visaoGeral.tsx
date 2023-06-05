import { useEffect, useState } from "react";
import { Menu, MenuLateral, Painel } from "../../components";
import global from '../../styles/style.module.scss'
import style from './visaoGeral.module.scss'
import { api } from "../../lib/axios";
import { Clock, DownloadSimple, Export, HardDrive, Question, Swap } from "@phosphor-icons/react";

type ConsultaHost = {
    hostname: string,
    neighbor: string
    port: string,
    remotePort: string,
    status: string,
    createdAt: string
}

export function VisaoGeral() {

    const [ consultaHosts, setConsultaHosts ] = useState<ConsultaHost[]>([])
    
    useEffect(()=> {
        api.get('/').then((response) => {setConsultaHosts(response.data), console.log(response.data)})
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


                    <article>
                        { consultaHosts.map((consultaHost, index) => (
                            <ul key={index} className={`${ consultaHost.status !== 'Ok' && style.hostInvertido } ${style.host}`}>
                                { consultaHost.hostname === consultaHosts[index].hostname ? (
                                    <li className={style.hostname}>{consultaHost.hostname}</li>
                                ): '' }
                                <ul key={index}>
                                    <div>
                                        <li>{consultaHost.neighbor}</li>
                                        <li>{consultaHost.port}</li>
                                        <li>{consultaHost.remotePort}</li>
                                        <li>{consultaHost.createdAt}</li>
                                        <li>{consultaHost.status}</li>
                                    </div>
                                </ul>
                            </ul>
                        ))}
                    </article>
                </main>
            </div>  
        </>
    )
}