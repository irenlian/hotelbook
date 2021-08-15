import bcrypt from 'bcrypt';
import { getAllUsers, getUser, getUserByEmail, insertUser } from '../db/users';
import { addBooking, getUserBookings } from '../db/bookings';
import jwt from 'jsonwebtoken';
import { JWT } from '~/config';

type UserType = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
};

export default class User {
  private readonly id?: number;
  private name?: string;
  private email?: string;
  private readonly password?: string;

  constructor({ id, name, email, password }: UserType, token?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async addUser(user: UserType) {
    if (user.email && user.name && user.password) {
      const check = await getUserByEmail(user.email);
      if (check) return 'username already exists';

      const result = await insertUser(user.name, user.email, user.password);
      return result;
    }
    return null;
  }

  async verifyUser(): Promise<boolean> {
    if (!this.email || !this.password) return false;
    const user: any = await getUserByEmail(this.email);
    if (user) {
      return await bcrypt.compare(this.password, user.password);
    }
    return false;
  }

  async getUser(): Promise<User> {
    if (!this.email && this.id) {
      const result: any = await getUser(this.id);
      this.email = result.email;
      this.name = result.name;
    }
    return this;
  }

  async getBookings(): Promise<any> {
    if (this.id) {
      const result = await getUserBookings(this.id);
      return result.rows;
    }
  }

  async bookRoom({ roomId, checkIn, checkOut }: { roomId: number; checkIn: string; checkOut: string }) {
    if (this.id) {
      return addBooking({ userId: this.id, roomId, checkIn, checkOut });
    }
  }

  static async getAll() {
    const result = await getAllUsers();
    return result.rows;
  }

  static async getUserByToken(token: string): Promise<User | null> {
    if (token) {
      const { email }: any = jwt.verify(token, JWT);
      if (email) {
        const user: any = await getUserByEmail(email);
        if (user) {
          return new User({ id: user.id, email: user.email, name: user.name });
        }
      }
    }
    return null;
  }
}
