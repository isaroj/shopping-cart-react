import Axios from "axios"

const url = 'https://api.pexels.com/v1/curated?page=1&per_page=15'

export const fetchProducts = (authKey) => {
    if (!authKey) throw 'authkey not found!'
    return Axios.get(url, {
      headers: {
        Authorization: authKey
      }
    })
}
