export type Query = {
  hostname: string
  ip: string
  neighbor: string
  port: string
  remotePort: string
  erro?: string
}[]

export type HostsDB = {
  id: string
  hostname: string
  ip: string
  createdAt: string
  updateAt: string
  neighbors: {
    id: string
    neighbor: string
    port: string
    remotePort: string
    createdAt: string
    updateAt: string
  }[]
}
