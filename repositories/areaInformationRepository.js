import { areainformation } from '../models/index.js';

class AreainformationRepository {
  async addAreainformation({ areainformation_name, areainformation_img }) {
    try {
      const newAreainformation = new areainformation({
        areainformation_name,
        areainformation_img,
      });

      await newAreainformation.save();

      return newAreainformation;
    } catch (error) {
      throw error;
    }
  }

  async getAreainformationById(areainformationId) {
    try {
      const areainformation = await areainformation.findById(areainformationId);

      if (!areainformation) {
        throw new Error('Areainformation not found');
      }

      return areainformation;
    } catch (error) {
      throw error;
    }
  }

  async getAreainformationList() {
    try {
      const areainformationList = await areainformation.find();
      return areainformationList;
    } catch (error) {
      throw error;
    }
  }
}

export default new AreainformationRepository();
