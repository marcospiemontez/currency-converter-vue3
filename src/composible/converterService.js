import { api } from 'boot/axios'

export default {
  findByCode(params) {
    return api.get(params)
  }
}
