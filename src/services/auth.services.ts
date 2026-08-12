import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { env } from '../config/env';
import { User } from '../types';


const register = async (name: string, email: string, password: string) => {
  const existingUser = await UserModel.findByEmail(email);
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create(name, email, hashedPassword);

  const token = jwt.sign(
    { id: user.id, role: user.role },
    env.jwt.secret,
    { expiresIn: '7d' }
  );

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

const login = async (email: string, password: string) => {
  const user = await UserModel.findByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    env.jwt.secret,
    { expiresIn: '7d' }
  );

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

export const AuthService = {
  register,
  login,
};
