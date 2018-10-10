import { History } from 'history'
import EmployeesView from '@/views/employees';
import BenefitsView from '@/views/benefits';
import HelpView from '@/views/help';

export default class RouterStore {

    public readonly history: History

    constructor(history: History) {
        this.history = history
    }

    public defaultRoutes() {
        return [
            { path: '/', component: EmployeesView, exact: true },
            { path: '/benefits', component: BenefitsView, exact: true },
            { path: '/help', component: HelpView }
        ]
    }

    public push(path: string, state?: any) {
        this.history.push(path, state)
    }

}