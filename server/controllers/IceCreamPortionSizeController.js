const { IceCreamPortionSize } = require("../models");
const getPagination = require("../utils/pagination");
const { UPLOADS_URL } = require("../config/config");
const { Op } = require("sequelize");

class IceCreamPortionSizeController {
  static async createIceCreamPortionSize(req, res, next) {
    try {
      const { name_en, name_ar, parent_id, slug, additional_price, calories, status } = req.body;

      const image_url = req.file ? req.file.filename : null;
      const iceCreamPortionSize = await IceCreamPortionSize.create({
        name_en,
        name_ar,
        parent_id: parent_id || null,
        slug,
        additional_price,
        calories,
        status,
        image_url,
      });

      await iceCreamPortionSize.reload({
        include: [
          {
            model: IceCreamPortionSize,
            as: "parent",
            attributes: ["id", "name_en"],
          },
        ],
      });

      const responseData = {
        ...iceCreamPortionSize.toJSON(),
        image_url: iceCreamPortionSize.image_url
          ? `${UPLOADS_URL}/${iceCreamPortionSize.image_url}`
          : null,
      };
      return res.status(201).json(responseData);

    }catch (error) {
      next(error);
    }
  }

  static async getAllIceCreamPortionSize(req, res) {

    const { page, limit, offset } = getPagination(req);
    const { keywords, sortField, sortOrder, parent_slug } = req.query;

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
        "parent_id",
      ];

      const finalSortField = allowedSortFields.includes(sortField)? sortField : "id";
      const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

      const include = [];
      if (parent_slug) {
        include.push({
          model: IceCreamPortionSize,
          as: "parent",
          where: { slug: parent_slug },
          attributes: [],
        });
      }else {
        include.push({
          model: IceCreamPortionSize,
          as: "parent",
          attributes: ["id", "name_en"],
        });
      }

      const { count, rows } = await IceCreamPortionSize.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [[finalSortField, finalSortOrder]],
        include,
      });

      const data = rows.map(item => {
        const iceCreamPortion = item.toJSON();
        return {
          ...iceCreamPortion,
          image_url: iceCreamPortion.image_url ? `${UPLOADS_URL}/${iceCreamPortion.image_url}` : null,
        };
      });
      const pageCount = Math.ceil(count / limit);

      return res.status(200).json({
        pagination: {
          page,
          limit,
          total: count,
          pageCount,
        },
        data,
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

      const {name_en, name_ar, parent_id, slug, additional_price, calories,status} = req.body;
      let image_url = iceCreamPortionSize.image_url;
        if (req.file) {
          image_url = req.file.filename;
        }
      await iceCreamPortionSize.update({
          name_en: name_en ?? iceCreamPortionSize.name_en,
          name_ar: name_ar ?? iceCreamPortionSize.name_ar,
          parent_id: parent_id ?? iceCreamPortionSize.parent_id,
          slug: slug ?? iceCreamPortionSize.slug,
          additional_price: additional_price ?? iceCreamPortionSize.additional_price,
          calories: calories ?? iceCreamPortionSize.calories,
          status: status ?? iceCreamPortionSize.status,
          image_url: image_url
      });

      const responseData = {
        ...iceCreamPortionSize.toJSON(),
        image_url: iceCreamPortionSize.image_url
          ? `${UPLOADS_URL}/${iceCreamPortionSize.image_url}`
          : null,
      };
      return res.status(200).json(responseData);

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

  static async getIceCreamPortionSizeTree(req, res) {
    try {
      const iceCreamPortionSize = await IceCreamPortionSize.findAll({
        where: { parent_id: null },
        attributes: ["id", "name_en", "slug", "parent_id"],
        include: [
          {
            model: IceCreamPortionSize,
            as: "children",
            attributes: ["id", "name_en", "slug", "parent_id"],
            include: [
              {
                model: IceCreamPortionSize,
                as: "children",
                attributes: ["id", "name_en", "slug", "parent_id"],
              },
            ],
          },
        ],
        order: [["id", "ASC"]],
      });
  
      return res.status(200).json({ data: iceCreamPortionSize });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch parent portion size tree",
        error: error.message,
      });
    }
  }
}
module.exports = IceCreamPortionSizeController;
