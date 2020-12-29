import axios from "axios"

const httpClient = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
})

const getNewsArticles = () => {
  // const url = "https://my.api.mockaroo.com/fed-exercise-data.json"
  const url = "/articles.json"
  const params = { key: "cf334d90" }
  return httpClient.get(url, { params })
}

export { getNewsArticles }
