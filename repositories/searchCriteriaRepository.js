import SearchCriteria from '../models/SearchCriteria.js';

class SearchCriteriaRepository {
  async create(searchCriteriaData) {
    try {
      const newSearchCriteria = new SearchCriteria(searchCriteriaData);
      const savedSearchCriteria = await newSearchCriteria.save();
      return savedSearchCriteria;
    } catch (error) {
      throw error;
    }
  }

  async update(id, searchCriteriaData) {
    try {
      const updatedSearchCriteria = await SearchCriteria.findByIdAndUpdate(
        id,
        searchCriteriaData,
        { new: true, runValidators: true }
      );
      return updatedSearchCriteria;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deletedSearchCriteria = await SearchCriteria.findByIdAndDelete(id);
      return deletedSearchCriteria;
    } catch (error) {
      throw error;
    }
  }

  async getByTenantId(tenantId) {
    try {
      const searchCriteria = await SearchCriteria.findOne({ tenant: tenantId })
        .populate({
          path: 'typehouse',
          model: 'TypeHouse',
        })
        .populate({
          path: 'amenities',
          model: 'Amenities',
        });
      return searchCriteria;
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin SearchCriteria theo TenantId
  async updateByTenantId(tenantId, searchCriteriaData) {
    try {



      let userFavorites = await SearchCriteria.findOne({ tenant: tenantId });
          console.log(userFavorites)

      
          if (!userFavorites) {
            // If FavoritesRoom doesn't exist, create a new one
            const newSearchCriteria = new SearchCriteria(searchCriteriaData);
          const savedSearchCriteria = await newSearchCriteria.save();
          return savedSearchCriteria;
          }else{
            const updatedSearchCriteria = await SearchCriteria.findOneAndUpdate(
              { tenant: tenantId },
              searchCriteriaData,
              { new: true, runValidators: true }
            )
              .populate({
                path: 'typehouse',
                model: 'TypeHouse',
              })
              .populate({
                path: 'amenities',
                model: 'Amenities',
              });
            return updatedSearchCriteria;
          }


      
    } catch (error) {
      throw error;
    }
  }

}

export default new SearchCriteriaRepository();
