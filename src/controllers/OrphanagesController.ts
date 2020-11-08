import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanagesView';

export default {
  async list(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return res.json(orphanageView.renderList(orphanages));
  },
  async find(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return res.json(orphanageView.render(orphanage));
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