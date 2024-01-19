import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defautlLimit:number

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,
    private readonly configService:ConfigService
  ){
    this.defautlLimit = configService.get<number>('defaultLimit')
   }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase()
    
    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto )   
      return pokemon;
      
    } catch (error) {
      this.handleException(error)
    }
  }

  findAll(param:PaginationDto) {
    // const limit =  param.limit ? param.limit : 10
    // const offset =  param.offset ? param.offset : 0
    const {limit = this.defautlLimit, offset = 0} = param
    
    return this.pokemonModel.find()
                            .limit(limit)
                            .skip(offset)
                            .sort({no:1})
                            .select('-__v')
  }

  async findOne(term: string) {
    
    term = term.trim()
    let pokemon:Pokemon

    //si es un numero
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({no:term})
    }
    //si es un mongoId
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term)
    }
    //si no encontro nada, lo intenta buscar por nombre
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({name:term.toLocaleLowerCase()})
    }

    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no (${term}) not found`);
    

    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon:Pokemon = await this.findOne(term)

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase().trim()
    }
     try {
      await pokemon.updateOne(updatePokemonDto, { new: true })
      const pokemonUpdated:Pokemon = await this.findOne(term)

      return pokemonUpdated
      
    } catch (error) {
      this.handleException(error)
    }    
  }

  async remove(id: string) {
    // Primera Opcion => Buscamos el pokemon y luego lo eliminamos
    // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
    // const pokemon = await this.findOne(id)
    // await pokemon.deleteOne()
    // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
    // Segunda opcion => Buscamos y eliminamos el pokemon (No verifica si existe)
    // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
    // const result = await this.pokemonModel.findByIdAndDelete(id)
    // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
    // Tercera opcion => Eliminamos el pokemon
    const {deletedCount} = await this.pokemonModel.deleteOne({_id:id})

    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with Id (${id}) not found`)
    }
    return 
  }

  private handleException(error:any){
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);        
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create pokemon - Check server logs`);   
    
  } 
}
