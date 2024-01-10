import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  
  private readonly axios: AxiosInstance = axios
  async executeSeed() {



    const {data } = await axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=1')

    data.results.map(({name,url})=>{
      console.log({name, url: url.split('/')[url.split('/').length - 2]})
      
    })

    return data.results;
  }

}
