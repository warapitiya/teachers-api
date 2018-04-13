module.exports = (sequelize, DataTypes) => {
  const students = sequelize.define(
    'students',
    {
      email: {
        type: DataTypes.STRING
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      active: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      timestamps: false,
      freezeTableName: true // Model tableName will be the same as the model name
    }
  );

  students.associate = models => {
    models.students.hasMany(models.registeredStudents);
  };

  return students;
};
