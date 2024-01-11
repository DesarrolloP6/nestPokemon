import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  
  private readonly axios: AxiosInstance = axios
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>){
    }


  async executeSeed() {



    const {data } = await axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

    data.results.map(async ({name,url})=>{
      await this.pokemonModel.create({name, no: +url.split('/')[url.split('/').length - 2]})      
    })


    return 'Seed Excecuted'
  }

}
