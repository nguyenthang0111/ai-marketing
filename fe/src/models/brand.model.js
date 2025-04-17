export default class Brand {
  constructor({ name, description, location, contactInfo }) {
    this.name = name || ''
    this.description = description || ''
    this.location = location || ''
    this.contactInfo = contactInfo || ''
  }
}
