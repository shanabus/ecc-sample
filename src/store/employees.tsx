import { observable, action } from "mobx";


export default class EmployeeStore {

    @observable
    public employees: Array<Employee>

    constructor(){
        this.employees = []
    }

    @action
    async fetch() {
        for(var i = 1; i < 5; i++){

            //const url: string = await this.profilePic("test")
            //console.log("this is from %s", url)
            this.employees.push(new Employee("Name "+ i, 2000))
        }
    }
}


export class Employee {

    name: string
    salary: number

    constructor(name: string, salary: number){
        this.name = name
        this.salary = salary
    }
}