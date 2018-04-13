module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'teachers',
    {
      email: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
};
