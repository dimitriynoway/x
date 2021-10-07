import { getRepository } from 'typeorm';
import { Profile } from 'passport-google-oauth20';
import User from '../entity/User';

export default async (profile: Profile) => {
  const userRepo = getRepository(User);
  const countOfUsers = await userRepo.count();
  const role = countOfUsers > 0 ? 'user' : 'admin';
  const newUser = userRepo.save({
    role,
    password: '',
    email: profile._json.email,
    username: profile._json.name,
    mutted: false,
    banned: false,
  });
  return newUser;
};
