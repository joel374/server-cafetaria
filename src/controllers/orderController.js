const db = require("../models");

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { MenuId, notes, quantity, table_number } = req.body;

      const findUser = await db.User.findOne({
        where: {
          id: req.user.id,
        },
      });

      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const findMenu = await db.Menu.findOne({
        where: {
          id: MenuId,
        },
      });

      if (!findMenu) {
        return res.status(500).json({
          message: "Menu not found",
        });
      }

      const order = await db.Order.create({
        MenuId,
        UserId: req.user.id,
        notes,
        quantity,
        total_price: quantity * findMenu.price,
      });

      return res.status(200).json({
        message: "Order created successfully",
        data: order,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
  getOrder: async (req, res) => {
    try {
      const order = await db.Order.findAll({
        where: {
          UserId: req.user.id,
        },
        include: [{ model: db.Menu, include: [{ model: db.Image }] }],
      });

      return res
        .status(200)
        .json({ message: "Fetch Order Succes", data: order });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
  getAllOrder: async (req, res) => {
    try {
      const isAdmin = await db.User.findOne({
        where: {
          id: req.user.id,
        },
      });

      if (!isAdmin.is_admin) {
        return res.status(403).json({ message: "User not authorized" });
      }

      const order = await db.Order.findAll({
        include: [
          { model: db.Menu, include: [{ model: db.Image }] },
          { model: db.User },
        ],
      });

      return res.status(200).json({ message: "Fetch Order", data: order });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
  acceptOrder: async (req, res) => {
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

      const order = await db.Order.findOne({
        where: {
          id: id,
        },
      });

      if (!order) {
        return res.status(400).json({
          message: "Order not found",
        });
      }

      await db.Order.update(
        {
          status: "Order Accepted",
        },
        {
          where: {
            id: id,
          },
        }
      );

      return res.status(200).json({ message: "Order Accepted", data: order });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  rejectOrder: async (req, res) => {
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

      const order = await db.Order.findOne({
        where: {
          id: id,
        },
      });

      if (!order) {
        return res.status(400).json({
          message: "Order not found",
        });
      }

      await db.Order.update(
        {
          status: "Order Rejected",
        },
        {
          where: {
            id: id,
          },
        }
      );

      return res.status(200).json({ message: "Order Rejected", data: order });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = orderController;
