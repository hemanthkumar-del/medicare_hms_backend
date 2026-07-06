import { MedicineRepository } from '../repositories/medicine.repository';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { IMedicine } from '../types';

export class MedicineService {
  private readonly medicineRepository = new MedicineRepository();

  async createMedicine(data: any): Promise<IMedicine> {
    const existing = await this.medicineRepository.findByName(data.name);
    if (existing) {
      throw new BadRequestError('Medicine item already registered in stock.');
    }
    return this.medicineRepository.create(data);
  }

  async getAllMedicines(): Promise<IMedicine[]> {
    return this.medicineRepository.find();
  }

  async getMedicineById(id: string): Promise<IMedicine> {
    const medicine = await this.medicineRepository.findById(id);
    if (!medicine) {
      throw new NotFoundError('Medicine item not found.');
    }
    return medicine;
  }

  async updateMedicine(id: string, data: any): Promise<IMedicine> {
    const medicine = await this.medicineRepository.update(id, data);
    if (!medicine) {
      throw new NotFoundError('Medicine item not found.');
    }
    return medicine;
  }

  async deleteMedicine(id: string): Promise<void> {
    const medicine = await this.medicineRepository.delete(id);
    if (!medicine) {
      throw new NotFoundError('Medicine item not found.');
    }
  }
}
export default MedicineService;
