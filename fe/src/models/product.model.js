export default class Product {
  constructor({
    name,
    description,
    benefit,
    promotion,
    customerPersona,
    customerProblem,
    solution
  }) {
    this.name = name || ''
    this.description = description || ''
    this.benefit = benefit || ''
    this.promotion = promotion || ''
    this.customerPersona = customerPersona || ''
    this.customerProblem = customerProblem || ''
    this.solution = solution || ''
  }
}
