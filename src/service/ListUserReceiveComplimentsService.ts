import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserReceiveComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );

    const commpliments = await complimentsRepositories.find({
      where: {
        user_receiver: user_id,
      },
      relations: ["userSender", "userReceiver", "tag"]
    });

    return commpliments;
  }
}

export { ListUserReceiveComplimentsService };
