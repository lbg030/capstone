module.exports = (sequelize, Sequelize) => {
	const hospital = sequelize.define("hospital", {
		yadmNm: {
			type: Sequelize.STRING
	  	},
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