module.exports = (sequelize, Sequelize) => {
	const hospital = sequelize.define("hospital", {
		addr: {
  			type: Sequelize.STRING
		},
        XPosWgs84: {
  			type: Sequelize.STRING
		},
        YPosWgs84: {
            type: Sequelize.STRING
      }
	});

	return hospital
};