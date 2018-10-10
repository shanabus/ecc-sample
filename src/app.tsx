import * as React from 'react'
import { Switch, Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react'
import { Fabric } from 'office-ui-fabric-react'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { createBrowserHistory } from 'history';
import Store from '@/store'
import SidebarMenu from '@/components/sidebarmenu'
import NavBar from '@/components/navbar'
import Footer from '@/components/footer'
import EmployeeStore from '@/store/employees';
import RouterStore from '@/store/router';

initializeIcons(/* optional base url */);

import '@/assets/css/content.scss'


const history = createBrowserHistory()
const store = new Store(new EmployeeStore(), new RouterStore(history))

const registrations = {
    store
}

export default class extends React.Component {
    render() {
        return (
            <Provider {...registrations}>
                <Router history={history}>
                    <Fabric>
                        <div className="App">
                            <nav className="header">
                                <NavBar />
                            </nav>        
                            <div className="body">
                                <section className="content">
                                    <Switch>
                                        { store.router.defaultRoutes().map(route => 
                                            <Route key={route.path} {...route} />)
                                        }
                                    </Switch>
                                </section>
                                <aside className="sidebar">
                                    <SidebarMenu />
                                </aside>      
                            </div>
                            <div className="footer">
                                <Footer />
                            </div>               
                        </div>
                    </Fabric>
                </Router>
            </Provider>
        )
    }
}