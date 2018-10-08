import {observable, action} from 'mobx'
import EmployeeStore from '@/store/employees'

export default class Store {

    @observable
    public employees: EmployeeStore

    constructor(employees: EmployeeStore) {
        this.employees = employees
    }

    
}


