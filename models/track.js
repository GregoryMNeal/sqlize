'use strict';
module.exports = (sequelize, DataTypes) => {
  var track = sequelize.define('track', {
    name: DataTypes.STRING,
    duration: DataTypes.STRING
  });

  track.associate = function(models) { // manually added this association
    track.belongsTo(models.album);
  };

  return track;
};
