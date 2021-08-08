import { getAllUsers, getUser } from '../db/users';
import {addBooking, getUserBookings} from '../db/bookings';

type UserType = {
  id: number;
  name: string;
  email: string;
};

export default class User {
  id: number;
  name?: string;
  email?: string;

  constructor(id: number, name?: string, email?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  async getUser(): Promise<User> {
    if (!this.email) {
      const result = await getUser(this.id);
      this.email = result.email;
      this.name = result.name;
    }
    return this;
  }

  async getBookings(): Promise<any> {
    const result = await getUserBookings(this.id);
    return result.rows;
  }

  async bookRoom({ roomId, checkIn, checkOut }: { roomId: number; checkIn: string; checkOut: string }) {
    return addBooking({ userId: this.id, roomId, checkIn, checkOut });
  }

  static async getAll() {
    const result = await getAllUsers();
    return result.rows;
  }
}
