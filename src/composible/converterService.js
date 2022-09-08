import { api } from 'boot/axios'

const userService = () => {
  const findByCode = (params) => {
    return api.get(params);
  }

  return { findByCode };
}

export default userService;