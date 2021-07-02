import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    // Verifica se o e-mail existe
    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error("E-mail/Password incorrect!");
    }

    // Verifica se a senha está correta
    if (!(await compare(password, user.password))) {
      throw new Error("E-mail/Password incorrect!");
    }

    // Gera o token
    const token = sign(
      {
        email: user.email,
      },
      process.env.SECRET_MD5,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
