import { Role, User } from "../entities/User";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "0252bd42bc6668164c7d4a3d6580a99e";

export class UserService {
  static async register(name: string, email: string, pass: string, role: Role) {
    const existingUser = await User.findOneBy({ email });
    if (existingUser) {
      throw new Error("Acest email este deja folosit!");
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    return user;
  }

  static async login(email: string, pass: string) {
    const user = await User.findOneBy({ email });
    if (!user) {
      throw new Error("Userul nu există!");
    }

    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) {
      throw new Error("Parolă incorectă!");
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      token,
      user,
    };
  }
}
