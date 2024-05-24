import dayjs from 'dayjs';

type bc = {
    hostname: string,
    NeighborQueries: {
        hostname: string,
        port: string,
        remotePort: string,
        status: string,
        createdAt: Date, 
        id: string,
        hostId: string
    }[],
}

const hour = dayjs().subtract(3, 'hour').toDate()

export const checkQuery = ( value : bc[] ) => {
    value.map( host => (host.NeighborQueries.length == 0) ? host.NeighborQueries = ([{
        hostname: 'consultando',
        port: 'consultando',
        remotePort: 'consultando',
        status: 'consultando',
        createdAt: hour, 
        id: '',
        hostId: ''
    }]): '' ) 

    return value
}