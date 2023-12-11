import axios from "axios"

export function useFetch(){

  const api_url: string = 'https://reqres.in/api/'

  function parseError(e:any){
    
    let error

    if (typeof e === "string") {
      error = e.toUpperCase()
    } else if (e instanceof Error) {
      error = e.message
    }

    return 'API Request error: ' + error

  }

  async function get(url: string){

    try {
      return await axios.get(api_url + url)
    } catch (e) {
      throw new Error(parseError(e))
    }

  }

  async function post(url: string, data: Object|null = null){
    
    try {
      return await axios.post(api_url + url, data)
    } catch (e) {
      throw new Error(parseError(e))
    }

  }

  async function patch(url: string, data: Object = {}){

    try {
      return await axios.patch(api_url + url, data)
    } catch (e) {
      throw new Error(parseError(e))
    }

  }

  async function _delete(url: string){

    try {
      return await axios.delete(api_url + url)
    } catch (e) {
      throw new Error(parseError(e))
    }

  }

  return { get, post, patch, _delete }

}