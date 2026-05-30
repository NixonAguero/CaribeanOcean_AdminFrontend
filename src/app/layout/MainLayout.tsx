import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/components/Navbar'

export default function Layout({children} : {children?: React.ReactNode}){
    return (
        <>
            <Navbar />
            <main style={{
                marginTop: '72px',
                minHeight: 'calc(100vh - 72px)',
                background: '#F5F0E8',
                padding: '40px',
                maxWidth: '1200px',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
                {children ?? <Outlet />}
            </main>
        </>
    );
}
