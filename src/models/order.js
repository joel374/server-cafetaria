"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User);
      Order.belongsTo(models.Menu);
    }
  }
  Order.init(
    {
      notes: DataTypes.STRING,
      status: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      table_number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
