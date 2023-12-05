import axios from "axios"

export function useFetch(){

  const api_url: string = 'https://reqres.in/api/'

  async function get(url: string){

    let response

    try {

      response = await axios.get(api_url + url)

    } catch (e) {

      let error

      if (typeof e === "string") {
        error = e.toUpperCase()
      } else if (e instanceof Error) {
        error = e.message
      }

      throw new Error('API Request error: ' + error)

    }

    return response.data

  }


  return {
    get
  }

}