import { Layout, Menu, theme } from 'antd';
import { useContext, useEffect, useState } from 'react';
import DummyData from 'util/property.json'
import Property from './Property';
import List from './List';
import { DataContext } from 'contexts/DataContextContainer';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('All Properties', '1'),
    getItem('Listed Properties', '2'),
    // getItem('User', 'sub1', null, [
    //   getItem('Tom', '3'),
    //   getItem('Bill', '4'),
    //   getItem('Alex', '5'),
    // ]),
];
const Dashboard = () => {
    const { setAllProperties } = useContext(DataContext)
    const [collapsed, setCollapsed] = useState(false);
    const [selPage, setSelPage] = useState(1)
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    
    
    const handleMenuSelect = (item) => {
        setSelPage(item.key);
        console.log(item.key)
    };

    useEffect(() => {
        setAllProperties(DummyData.rows)
    }, [])


    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                />
                <Menu theme="dark" defaultSelectedKeys={['1']} onSelect={handleMenuSelect} mode="inline" items={items}></Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    {Number(selPage) === 1 ? <Property /> : <List />}
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Test project for react
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Dashboard;