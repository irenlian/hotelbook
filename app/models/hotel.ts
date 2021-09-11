import Room from './room';
import { getHotels, getHotel, getPhotos, getHotelsCount } from '../db/hotels';
import { getHotelRooms } from '../db/rooms';
import { BookingType } from '../models/booking';
import { getHotelBookings } from '../db/bookings';

export type HotelType = {
  id: number;
  name: string;
  country: string;
  city: string;
};

type PhotoType = {
  name: string;
  main: boolean;
};

export type FiltersType = {
  from: string;
  to: string;
  minPrice: number;
  maxPrice: number;
  offset: number;
  limit: number;
  sort: 'ASC' | 'DESC';
  country?: string;
  city?: string;
};

export default class Hotel {
  id: number;
  rooms?: Room[];
  bookings?: BookingType[];
  photos?: PhotoType[];
  name?: string;
  country?: string;
  city?: string;

  constructor(id: number, name?: string, country?: string, city?: string) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.city = city;
  }

  async getHotel(): Promise<Hotel> {
    if (!this.name) {
      const result = await getHotel(this.id);
      this.name = result.rows[0].name;
      this.country = result.rows[0].country;
      this.city = result.rows[0].city;
    }
    if (!this.rooms) {
      this.rooms = (await getHotelRooms(this.id)).rows;
    }
    if (!this.photos) {
      this.photos = (await getPhotos(this.id)).rows;
    }
    return this;
  }

  async getBookings(): Promise<BookingType[] | undefined> {
    if (!this.bookings) {
      const result = await getHotelBookings(this.id);
      this.bookings = result.rows;
    }
    return this.bookings;
  }

  static async getAll(filters: FiltersType) {
    const [result, countResult] = await Promise.all([getHotels(filters), getHotelsCount(filters)]);
    return {
      hotels: result?.rows,
      count: parseInt(countResult?.rows ? countResult.rows[0]?.count : '', 10),
    };
  }
}
