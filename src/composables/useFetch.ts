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

    let response

    try {
      response = await axios.get(api_url + url)
    } catch (e) {
      throw new Error(parseError(e))
    }

    return response.data

  }

  async function post(url: string, data: Object|null = null){
    let response
    
    try {
      response = await axios.post(api_url + url, data)
    } catch (e) {
      throw new Error(parseError(e))
    }

    return response.data

  }

  async function patch(url: string, data: Object = {}){

    let response
    
    try {

      response = await axios.patch(api_url + url, data)

    } catch (e) {

      throw new Error(parseError(e))

    }

    return response?.data

  }

  async function _delete(url: string){

    let response

    try {
      response = await axios.delete(api_url + url)
    } catch (e) {
      throw new Error(parseError(e))
    }

    return response

  }

  return { get, post, patch, _delete }

}