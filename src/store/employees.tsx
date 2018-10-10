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
        for (var i = 1; i <= 5; i++) {
            this.employees.push(await this.randomEmployee())
        }
        this.employees.sort()
    }

    @action
    getById(key: any) {
        return this.employees.find(function(e) {
            return e.id === key
        })
    }

    @action
    async randomEmployee() {
        const firstNames = ["Jim", "Carol", "Landon", "Harper", "Tina", "Mark", "Rita", "Eric", "Jennifer", "Tim", "Sam", "Lori", "Devin", "Daniel", "Mary", "Steve", "Windi", "Rick", "Marcus", "July", "Marvin", "Fred"]
        const lastNames = ["Smith", "Brown", "Grooters", "Stephenson", "Seleck", "Gilbert", "Schultz", "Neimeyer", "Sievers", "Richards", "Johnson", "Williams", "Rodgers", "Fredrickson", "Preston", "Van Holsten", "Reed", "Poloski"]

        const randomEmployee = new Employee(firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)])

        for(let i = 0; i <= Math.floor(Math.random() * 3); i++){
            randomEmployee.addDependent(firstNames[Math.floor(Math.random() * firstNames.length)])
        }
        return randomEmployee
    }
}

/** 
 * The cost of benefits is $1000/year for each employee
 * Each dependent (children and possibly spouses) incurs a cost of $500/yea
 * Anyone whose name starts with ‘A’ gets a 10% discount, employee or dependent
 * ~ Assumptions ~
 * All employees are paid $2000 per paycheck before deductions
 * There are 26 paychecks in a year
 */

export class Employee {

    id: string
    @observable public name: string
    @observable dependents: string[]
    
    private readonly biWeeklySalary: number = 2000
    private readonly baseAnnualEmployeeCob: number = 1000
    private readonly baseAnnualDependentCob: number = 500
    private readonly payChecksPerYear: number = 26

    constructor(name: string){
        this.name = name
        this.id = uuid.v4()

        this.dependents = []
    }

    addDependent(name: string): any {
        this.dependents.push(name)
    }

    getAnnualSalaryAfterCob(): number {
        return (this.biWeeklySalary * this.payChecksPerYear) - this.getAnnualCob()
    }

    public getBiWeeklyCob(): number {
        return (this.getBiWeeklyEmployeeCost() + this.getBiWeeklyDependentCost()) / this.payChecksPerYear
    }

    public getAnnualCob(): number {
        return this.getBiWeeklyEmployeeCost() + this.getBiWeeklyDependentCost()
    }

    getBiWeeklyEmployeeCost(): number {        
        return (this.name.toLocaleLowerCase().startsWith('a')) ? this.baseAnnualEmployeeCob * .9 : this.baseAnnualEmployeeCob
    }

    getBiWeeklyDependentCost(): number {
        let dependentCost = 0
        this.dependents.forEach( d => {
            dependentCost += (d.toLocaleLowerCase().startsWith('a'))? this.baseAnnualDependentCob * .9 : this.baseAnnualDependentCob
        })
        return dependentCost
    }
}