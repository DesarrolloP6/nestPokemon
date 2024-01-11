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

    await this.pokemonModel.deleteMany({}) //DELETE POKEMON

    const {data } = await axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
 //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    //Insertar pokemon por listado obtenido (INSERT INTO SELECT)
    //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    const pokemonToInsert:{name:string, no:number}[] = []
    data.results.forEach(({name,url})=>{
      const segments = url.split('/')
      const no = +segments[segments.length - 2]

      pokemonToInsert.push({name, no})
    })
    await this.pokemonModel.insertMany(pokemonToInsert)
    //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    //Insertar pokemon por listado obtenido 
    //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    // const insertPromiseArray= []
    // data.results.forEach(({name,url})=>{
    //   insertPromiseArray.push(
    //     this.pokemonModel.create({name, no: +url.split('/')[url.split('/').length - 2]})
    //   )      
    // })
    // await Promise.all(insertPromiseArray)
    //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    //Insertar pokemon uno por uno del listado obtenido 
    //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    // data.results.map(async ({name,url})=>{
    //   await this.pokemonModel.create({name, no: +url.split('/')[url.split('/').length - 2]})

    // })
    //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

    return 'Seed Excecuted'
  }

}
