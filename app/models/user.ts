import { getAllUsers, getUser } from '../db/users';
import { addBooking } from '../db/bookings';

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

  async getUser(): Promise<UserType> {
    if (this.name && this.email) {
      return { id: this.id, name: this.name, email: this.email };
    }
    const result = await getUser(this.id);
    return result.rows[0];
  }

  async bookRoom({ roomId, checkIn, checkOut }: { roomId: number; checkIn: string; checkOut: string }) {
    return addBooking({ userId: this.id, roomId, checkIn, checkOut });
  }

  static async getAll() {
    const result = await getAllUsers();
    return result.rows;
  }
}
