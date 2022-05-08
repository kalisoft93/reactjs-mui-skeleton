import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

const AppLayout = (props) => {

        return <>
            <div className="wrapper-container">
                <div className="sidebar-container">
                    <Sidebar />
                </div>
                <div className="content">
                    <Header />
                    <div className="pages studman-card">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
}

export default AppLayout;