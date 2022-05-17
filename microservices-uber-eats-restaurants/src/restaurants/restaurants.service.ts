import { Restaurant } from './entities/restaurant.entity';
import { Injectable } from '@nestjs/common';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';

const restaurants: Restaurant[] = [
  {
    id: 1,
    exampleField: 2,
    // user: { id: '1' },
  },
  {
    id: 2,
    exampleField: 123123131,
    // user: { id: '2' },
  },
  {
    id: 3,
    exampleField: 24214124124,
    // user: { id: '3' },
  },
];

@Injectable()
export class RestaurantsService {
  create(createRestaurantInput: CreateRestaurantInput) {
    return createRestaurantInput;
  }

  findAll() {
    return restaurants;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantInput: UpdateRestaurantInput) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
