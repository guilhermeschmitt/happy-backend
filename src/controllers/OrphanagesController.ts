import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import Orphanage from '../models/Orphanage';

export default {
  async list(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find();

    return res.json(orphanages);
  },
  async find(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id);

    return res.json(orphanage);
  },
  async create(req: Request, res: Response) {
    const orphanageInfo = req.body;

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map(image => ({ path: image.filename }));

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = orphanagesRepository.create({ ...orphanageInfo, images });

    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
  }

};