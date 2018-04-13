/**
 * Created by warapitiya on 4/12/18.
 */

module.exports = (sequelize, DataTypes) => {
  const registeredStudents = sequelize.define('registered_students', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  registeredStudents.associate = (models) => {
    models.registeredStudents.belongsTo(models.teachers);
    models.registeredStudents.belongsTo(models.students);
  };
  return registeredStudents;
};
