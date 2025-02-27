import { POST } from "@/app/api/videos/route"
import { IVideo } from "@/models/Video"

type FetchOptions = {
    method? : "POST" | "DELETE" | "PUT" | "GET",
    body? : any,
    headers? : Record<string , string>
}

export type VideoFormData = Omit<IVideo,"_id">


class ApiClient {
    private async fetch<T>(
        endpoint : string,
        options : FetchOptions = {}
    ) : Promise<T>{
          const {method = "GET", body , headers = {}} = options

          const defaultHeaders = {
            "Content-Type" : "application/json",
            ...headers
          }

          const response = await fetch(`/api${endpoint}`,{
            method,
            headers : defaultHeaders,
            body : body ? JSON.stringify(body) : undefined
          })

          if(!response.ok){
            throw new Error(await response.text())
          }

          return response.json()
    }

    async getVideos(){
        return this.fetch<IVideo>("/videos") 
    }

    async getAVideo(id : string){
         return await this.fetch<IVideo>(`/videos/${id}`)
    }

    async createVideo(videoData : VideoFormData){
        return this.fetch("/videos",{
            method : "POST",
            body : videoData,
        })
    }
}

export const apiClient = new ApiClient()