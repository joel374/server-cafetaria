const db = require("../models");

const menuController = {
  createMenu: async (req, res) => {
    try {
      const { food_name, price, image_url } = req.body;

      const isAdmin = await db.User.findOne({
        where: {
          id: req.user.id,
        },
      });

      if (!isAdmin.is_admin) {
        return res.status(403).json({ message: "User not authorized" });
      }

      const findMenu = await db.Menu.findOne({
        where: {
          food_name: food_name,
        },
      });

      if (findMenu) {
        return res.status(404).json({ message: "Menu is already created" });
      }

      const menu = await db.Menu.create({ food_name: food_name, price: price });
      await db.Image.create({ image_url: image_url, MenuId: menu.id });

      return res.status(201).json({
        message: "Menu created",
        data: menu,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  editMenu: async (req, res) => {
    try {
      const { food_name, price, image_url } = req.body;
      const { id } = req.params;

      const isAdmin = await db.User.findOne({
        where: {
          id: req.user.id,
        },
      });

      if (!isAdmin.is_admin) {
        return res.status(403).json({ message: "User not authorized" });
      }

      await db.Menu.update({ food_name, price }, { where: { id: id } });

      await db.Image.update(
        { image_url: image_url },
        { where: { MenuId: id } }
      );

      return res.status(200).json({ message: "Menu updated" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
  deleteMenu: async (req, res) => {
    try {
      const { id } = req.params;

      const isAdmin = await db.User.findOne({
        where: {
          id: req.user.id,
        },
      });

      if (!isAdmin.is_admin) {
        return res.status(403).json({ message: "User not authorized" });
      }

      const menu = await db.Menu.findOne({ where: { id: id } });

      if (!menu) {
        return res.status(404).json({ message: "Menu not found" });
      }

      await db.Menu.destroy({ where: { id: id } });
      await db.Image.destroy({ where: { MenuId: id } });
      await db.Order.destroy({
        where: {
          MenuId: id,
        },
      });

      return res.status(200).json({ message: "Menu deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
  getMenu: async (req, res) => {
    try {
      const menu = await db.Menu.findAll({
        include: [db.Image],
      });

      return res.status(200).json({ message: "Menu found", data: menu });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = menuController;
