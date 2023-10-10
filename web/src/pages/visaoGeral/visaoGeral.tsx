import { Clock, DownloadSimple, Export, HardDrive, Question, Swap, CheckCircle, User, WarningCircle } from '@phosphor-icons/react';
import { Menu, MenuLateral, Painel } from '../../components';
import { useEffect, useState } from 'react';
import global from '../../styles/style.module.scss';
import style from './visaoGeral.module.scss';
import { api } from '../../lib/axios';
import moment from 'moment';

// Set the location to the moment
moment.locale('pt-br')


export function VisaoGeral() {
    type QueryHost = {
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

    const [ queryHosts, setQueryHosts ] = useState<QueryHost[]>([])
    const [ request, setRequest ] = useState('/todos')
    const formatarData = (data:string) => moment.utc(data).utcOffset(0).format('HH:mm:ss DD-MM-YYYY');


    function changeList(get: string) {
        setRequest(get)
    }

    useEffect(()=> {
        api.get(request).then((response:any) => {setQueryHosts(response.data)})
    }, [request])

    return (
        <>
            <Menu active="visao geral"/>
            <div className={`mx-8 mt-14 w-vw ${global.grid}`}>
                <MenuLateral 
                    title='Menu'
                    list={[{
                        name: 'Todos',
                        icon: <User size={22} />,
                        get: '/todos'
                    }, {
                        name: 'Invertidos',
                        icon: <WarningCircle size={22} />,
                        get: '/invertidos'
                    }, {
                        name: 'Check-Ok',
                        icon: <CheckCircle size={22} />,
                        get: '/check-ok'
                    }]}
                    changeList={changeList}
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
                        { queryHosts.map((host, index) => (
                            <ul key={index} className={style.host}>
                                { host.HostQueries.length == 0 ? '' : 
                                    <li className={`${style.hostname} ${host.HostQueries.find((vizinho) => vizinho.status !== 'Ok' ) ? style.hostInvertido : '' }`} >
                                        { host.hostname }
                                    </li>
                                }
                                <li>
                                { 
                                    host.HostQueries.map((query, index) => (
                                        <ul key={index}>
                                            <div className={`${style.enlace} ${ query.status !== 'Ok' ? style.invertido : '' }`}>
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
                        { queryHosts.length == 0 ?  <span className={style.aviso}> Nenhuma inversão na rede </span> : <span>{ queryHosts.length }</span> }
                    </article>
                </main>
            </div>  
        </>
    )
}