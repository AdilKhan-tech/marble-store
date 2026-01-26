const { IceCreamBucket, IceCreamPortionSize } = require("../models");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class IceCreamPortionSizeController {
  static async createIceCreamPortionSize(req, res, next) {
    try {
      const {icecream_bucket_id, name_en, name_ar, slug, additional_price, calories, status} = req.body;

      const image_url = req.file?.path || null;

      const iceCreamPortionSize = await IceCreamPortionSize.create({
        icecream_bucket_id,
        name_en,
        name_ar,
        slug,
        additional_price,
        calories,
        status,
        image_url,
      });
      return res.status(201).json(iceCreamPortionSize);

    }catch (error) {
      next(error);
    }
  }

  static async getAllIceCreamPortionSize(req, res) {

    const { page, limit, offset } = getPagination(req);
    const { keywords, sortField, sortOrder } = req.query;

    try {

      const whereClause = {};

      if (keywords) {
        whereClause[Op.or] = [
          { name_en: { [Op.like]: `%${keywords}%` } },
          { name_ar: { [Op.like]: `%${keywords}%` } },
        ];
      }

      const allowedSortFields = [
        "id",
        "name_en",
        "additional_price",
        "calories",
        "status",
        "icecream_bucket_id",
      ];

      const finalSortField = allowedSortFields.includes(sortField)? sortField : "id";
      const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

      const { count, rows } = await IceCreamPortionSize.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: IceCreamBucket,
            as: "iceCreamBucket",
            attributes: ["id", "name_en", "name_ar"],
          },
        ],
        limit,
        offset,
        order: [[finalSortField, finalSortOrder]],
      });

      const pageCount = Math.ceil(count / limit);

      return res.status(200).json({
        pagination: {
          page,
          limit,
          total: count,
          pageCount,
        },
        data: rows,
      });

    } catch (error) {
      return res.status(500).json({
        message: "Failed to get IceCream Portion Sizes",
        error: error.message,
      });
    }
  }

  static async updateIceCreamPortionSize(req, res, next) {
    const { id } = req.params;
    try {
      const iceCreamPortionSize = await IceCreamPortionSize.findByPk(id);
      if (!iceCreamPortionSize) {
          return res.status(404).json({ message: "Ice Cream Portion Size not found" });
      }

      const {name_en, name_ar, icecream_bucket_id, slug, additional_price, calories,status} = req.body;

      const image_url = req.file?.path || iceCreamPortionSize.image_url;

      await iceCreamPortionSize.update({
          name_en: name_en ?? iceCreamPortionSize.name_en,
          name_ar: name_ar ?? iceCreamPortionSize.name_ar,
          icecream_bucket_id: icecream_bucket_id ?? iceCreamPortionSize.icecream_bucket_id,
          slug: slug ?? iceCreamPortionSize.slug,
          additional_price: additional_price ?? iceCreamPortionSize.additional_price,
          calories: calories ?? iceCreamPortionSize.calories,
          status: status ?? iceCreamPortionSize.status,
          image_url: image_url
      });

      return res.status(200).json(iceCreamPortionSize);

    }catch (error) {
      next(error);
    }
  }

  static async deleteIceCreamPortionSizeById(req, res){
    const{id} = req.params;
    try{
      const icecreamportionsize = await IceCreamPortionSize.findByPk(id);
      if(!icecreamportionsize) {
        return res.status(404).json({ message: " Ice Cream Portion Size not found" });
      }
      await icecreamportionsize.destroy();
      return res.status(200).json({ message: "Ice Cream Portion Size deleted sucesfully" });

    }catch(error) {
      return res.status(500).json ({ message: error.message });
    }
  }
}
module.exports = IceCreamPortionSizeController;
