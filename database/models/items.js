const items = (sequelize, DataTypes) => {
  const Item = sequelize.define('items', {
    title: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });

  return Item;
}

module.exports = items;
