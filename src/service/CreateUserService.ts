import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Se não houver e-mail
    if (!email) {
      throw new Error("E-mail incorrect!");
    }

    // Busca usuário pelo e-mail
    const userAlreadyExists = await usersRepositories.findOne({
      email,
    });

    // Verifica se já possui um usuário com o e-mail cadstrado
    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    // Criptografa a senha
    const passwordHash = await hash(password, 8);

    // Cria o novo usuário
    const user = usersRepositories.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    // Salva o novo usuário
    await usersRepositories.save(user);

    return user;
  }
}

export { CreateUserService };
