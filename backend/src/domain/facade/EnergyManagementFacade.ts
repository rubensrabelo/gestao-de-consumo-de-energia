import { EnergyService } from "../../services/EnergyService";

export class EnergyManagementFacade {
  private service = new EnergyService();

  async registerReading(meterId: string, value: number) {
    await this.service.registerReading(meterId, value);
  }
}
