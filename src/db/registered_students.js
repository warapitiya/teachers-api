/**
 * Created by warapitiya on 4/12/18.
 */

module.exports = (sequelize, DataTypes) => {
  const registeredStudents = sequelize.define('registered_students', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  return registeredStudents;
};
