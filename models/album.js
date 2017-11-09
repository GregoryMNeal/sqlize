'use strict';
module.exports = (sequelize, DataTypes) => {
  var album = sequelize.define('album', {
    name: DataTypes.STRING,
    year: DataTypes.INTEGER
  });

  album.associate = function(models) { // manually added this association
    album.belongsTo(models.artist);
  };

  return album;
};
