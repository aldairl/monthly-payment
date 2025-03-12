import rolModel, { IRole } from "../models/rolModel";

export class RolService {

    async createRol( dataRol: Partial<IRole> ): Promise<IRole> {
        const newRol = new rolModel(dataRol)
        return await newRol.save()
    }
}