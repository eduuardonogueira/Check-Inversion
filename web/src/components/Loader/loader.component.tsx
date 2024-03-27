import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const antIcon = <LoadingOutlined spin style={{ fontSize: 24 }} />

export const Loader = () => <Spin indicator={antIcon} />
