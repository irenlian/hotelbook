import Room from '~/models/room';
import { getAllHotels, getHotel } from '~/db/hotels';

export type HotelType = {
  id: number;
  name: string;
  country: string;
  city: string;
};

export default class Hotel {
  id: number;
  rooms: Room[] | null;
  name?: string;
  country?: string;
  city?: string;

  constructor(id: number, name?: string, country?: string, city?: string) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.city = city;
    this.rooms = null;
  }

  async getHotel(): Promise<HotelType> {
    if (this.name && this.country && this.city) {
      return { id: this.id, name: this.name, country: this.country, city: this.city };
    }
    const result = await getHotel(this.id);
    return result.rows[0];
  }

  static async getAll() {
    const result = await getAllHotels();
    return result.rows;
  }
}
