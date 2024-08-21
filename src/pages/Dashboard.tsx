import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import PartnerDetail from './PartnerDetail';
import '../styles/pages/Dashboard.scss'

const Dashboard = () => {

    const user = useSelector((state: RootState) => state.user.userData);
    
    const renderContent = () => {
        // if (user?.role === 'partner') {
            if (user) {
            return <PartnerDetail />;
        }
        return <div>No tiene permisos para acceder a este contenido.</div>;
    };

    return (
        <div className='dashboardContainer'>
            <h1 className='dashboardTitle'>Dashboard</h1>
            {renderContent()}
        </div>
    );
};

export default Dashboard;