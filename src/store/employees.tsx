import { observable, action } from "mobx";
import * as uuid from 'uuid'

export default class EmployeeStore {
    
    @observable
    public readonly employees: Array<Employee>
    @observable 
    public readonly selectedEmployees: number[]

    constructor(){
        this.employees = []
        this.selectedEmployees = []
    }

    @action 
    async createEmployee(employee: Employee){
        this.employees.push(employee)
    }

    @action
    setSelection(indices: number[]) {
        this.selectedEmployees.splice(0)
        this.selectedEmployees.push(...indices)

        console.log(this.selectedEmployees)
    }

    @action
    clearSelection() {
        this.selectedEmployees.splice(0)
    }

    @action
    deleteSelectedEmployees() {
        let emplToDelete: Employee[] = []
        this.selectedEmployees.forEach( (e) => {
            emplToDelete.push(this.employees[e])
        })
        emplToDelete.forEach( (e) => {
            this.employees.remove(e)
        })
        this.selectedEmployees.splice(0)

        console.log(this.employees.length + " employees")
    }

    @action
    async fetch() {
        this.employees.splice(0)
        for (var i = 1; i <= 10; i++) {
            this.employees.push(await this.randomEmployee())
        }
    }

    @action
    getById(key: any) {
        return this.employees.find(function(e) {
            return e.id === key
        })
    }

    @action
    async randomEmployee() {
        const firstNames = ["Jim", "Carol", "Mark", "Rita", "Jennifer", "Tim", "Sam", "Lori", "Devin", "Daniel", "Mary", "Steve", "Windi", "Rick", "Marcus", "July", "Marvin", "Fred"]
        const lastNames = ["Smith", "Brown", "Selick", "Gilbert", "Schultz", "Neimeyer", "Sievers", "Richards", "Johnson", "Williams", "Rodgers", "Fredrickson", "Preston", "Van Holsten", "Reed", "Poloski"]

        return new Employee(firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)], 2000)
    }
}


export class Employee {

    id: string
    @observable public name: string
    salary: number

    @observable dependents: string[]

    constructor(name: string, salary: number){
        this.name = name
        this.salary = salary
        this.id = uuid.v4()

        this.dependents = []
    }

    public cost() {
        return this.dependents.length * 500 + 1000
    }

    addDependent(name: string): any {
        this.dependents.push(name)
    }
}