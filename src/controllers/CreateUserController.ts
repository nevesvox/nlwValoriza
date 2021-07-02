import { Request, Response } from "express";
import { CreateUserService } from "../service/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    // Recupera os dados do Body
    const { name, email, admin, password } = request.body;
    // Instancia o Service
    const createUserService = new CreateUserService();
    // Chama a função de criação de User
    const user = await createUserService.execute({
      name,
      email,
      admin,
      password,
    });

    // Retorna o usuário criado
    return response.json(user);
  }
}

export { CreateUserController };
