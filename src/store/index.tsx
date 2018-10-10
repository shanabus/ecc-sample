import {observable, action} from 'mobx'
import EmployeeStore from '@/store/employees'
import RouterStore from '@/store/router';

export default class Store {

    @observable
    public employees: EmployeeStore

    @observable router: RouterStore

    constructor(employees: EmployeeStore, router: RouterStore) {
        this.employees = employees
        this.router = router
    }

    
}


