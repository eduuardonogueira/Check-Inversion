import React, { useState } from 'react';
import logo from '/src/img/logo-poppa-new.png'
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Desktop, CheckCircle, User, WarningCircle, Broadcast, PlusSquare, List, XSquare, HardDrive, Power} from '@phosphor-icons/react';
import { UserShape }  from '../components'



const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Monitoring', '1', <Desktop size={18} />, [
    getItem('All', '2', <User size={18} /> ),
    getItem('Inverted', '3', <WarningCircle size={18} />),
    getItem('Ok', '4', <CheckCircle size={18} />)
  ]),

  getItem('Queries', '5', <Broadcast size={18}/>, [
    getItem('Check inversion', '6', <Power  size={18} />),
    getItem('Check uptime', '7', <WarningCircle size={18}/>)
  ]),

  getItem('Host', '8', <HardDrive size={18} />, [
    getItem('All', '9', <List size={18} />),
    getItem('Add host', '10', <PlusSquare size={18}/>),
    getItem('Remove host', '11', <XSquare size={18} /> )
  ]),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <img src={logo} alt="logo-pop" width={150} style={{margin: 'auto', padding: 12}}/>
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['1']} 
          mode="inline" 
          items={items} 
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer , display:'flex' , justifyContent: 'end', paddingInline: 16 , boxSizing: 'border-box'}} >
          {/* <UserShape /> */}
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Check-inversion ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default App;