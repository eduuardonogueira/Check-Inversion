import { Menu, MenuLateral, Painel } from "../../components";
import global from '../../styles/style.module.scss';
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import style from './visaoGeral.module.scss';
import { Clock, DownloadSimple, Export, HardDrive, Question, Swap, CheckCircle, User, WarningCircle } from '@phosphor-icons/react';
import moment from 'moment';

moment.locale('pt-br')

export function VisaoGeral() {
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

    const [ consultaHosts, setConsultaHosts ] = useState<ConsultaHost[]>([])
    const [ solicitacao, setsolicitacao ] = useState('/todos')

    function alterarLista(get: string) {
        setsolicitacao(get)
    }

    const formatarData = (data:string) => moment.utc(data).utcOffset(0).format('HH:mm:ss DD-MM-YYYY');

    useEffect(()=> {
        api.get(solicitacao).then((response) => {setConsultaHosts(response.data)})
    }, [solicitacao, consultaHosts])

    return (
        <>
            <Menu ativo="visao geral"/>
            <div className={`mx-8 mt-14 w-vw ${global.grid}`}>
                <MenuLateral 
                    titulo='Menu'
                    lista={[{
                        nome: 'Todos',
                        icone: <User size={22} />,
                        get: '/todos'
                    }, {
                        nome: 'Invertidos',
                        icone: <WarningCircle size={22} />,
                        get: '/invertidos'
                    }, {
                        nome: 'Check-Ok',
                        icone: <CheckCircle size={22} />,
                        get: '/check-ok'
                    }]}
                    alterarLista={alterarLista}
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

                                { host.HostQueries.length == 0 ? '' : 
                                    <li className={`${style.hostname} ${host.HostQueries.find((vizinho) => vizinho.status === 'Invertido') ? style.hostInvertido : '' }`} >
                                        { host.hostname}
                                    </li>
                                }
                                <li>
                                { 
                                    host.HostQueries.map((query, index) => (
                                        <ul key={index}>
                                            <div className={`${style.enlace} ${ query.status == "Invertido" ? style.invertido : '' }`}>
                                                <li>{query.neighbor}</li>
                                                <li>{query.port}</li>
                                                <li>{query.remotePort}</li>
                                                <li>{formatarData(query.createdAt)}</li>
                                                <li>{query.status}</li>
                                            </div>
                                        </ul>
                                    ))
                                }
                                </li>
                                
                            </ul>
                        ))}
                        { consultaHosts.length == 0 ?  <span className={style.aviso}>Nenhuma inversão na rede</span> : <span>{consultaHosts.length}</span>}
                    </article>
                </main>
            </div>  
        </>
    )
}