import express from 'express'
import { roomingHouseController } from '../controllers/index.js'
import { body, validationResult, param  } from 'express-validator';

const router = express.Router()

router.post(
    '/add',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('peopeleNumber').isNumeric().withMessage('peopeleNumber must be a number'),
        body('image_url').isArray({ min: 1 }).withMessage('At least one image URL is required'),
        body('square_feet').isNumeric().withMessage('Square feet must be a number'),
        body('rules').isArray({ min: 1 }).withMessage('At least one rule is required'),
        body('status').isIn(['RENTED', 'MAINTENANCE', 'EMPTYROOM']).withMessage('Invalid status'),
        body('owner').isMongoId().withMessage('Invalid owner ID'),
        body('typehouse').isMongoId().withMessage('Invalid typehouse ID'),
        body('amenities.*').isMongoId().withMessage('Invalid amenity ID'),
        body('roominghousecomplex').optional().isMongoId().withMessage('Invalid roominghousecomplex ID'),

    ],
    roomingHouseController.addPhongTro
);

router.put(
    '/updatePhongTro/:id',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('image_url').isArray({ min: 1 }).withMessage('At least one image URL is required'),
        body('square_feet').isNumeric().withMessage('Square feet must be a number'),
        body('rules').isArray({ min: 1 }).withMessage('At least one rule is required'),
        body('peopeleNumber').isNumeric().withMessage('peopeleNumber must be a number'),
        body('status').isIn(['RENTED', 'MAINTENANCE', 'EMPTYROOM']).withMessage('Invalid status'),
        body('owner').isMongoId().withMessage('Invalid owner ID'),
        body('typehouse').isMongoId().withMessage('Invalid typehouse ID'),
        body('amenities.*').isMongoId().withMessage('Invalid amenity ID'),
        body('roominghousecomplex').optional().isMongoId().withMessage('Invalid roominghousecomplex ID'),
      // Add more validation rules as needed
    ],
    roomingHouseController.updatePhongTro
  );

router.get('/list', roomingHouseController.getListPhongTro);
router.get('/getPhongTro/:id', roomingHouseController.getPhongTro);
router.delete('/deletePhongTro/:id', roomingHouseController.deletePhongTro);
router.get('/getListByOwnerId/:ownerId', roomingHouseController.getListByOwnerId);
router.get('/roomingHouseComplex/:roomingHouseComplexId/roomingHouses', roomingHouseController.getListByRoomingHouseComplexId);
router.get('/getListByCity/:city', roomingHouseController.getListByCity);
router.get('/getListByCityAndDistrict/:city/:district', roomingHouseController.getListByCityAndDistrict);
router.put('/:roomingHouseId/update-status-and-available-dates', roomingHouseController.updateStatusAndAvailableDates);


export default router