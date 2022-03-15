module.exports = (sequelize, Sequelize) => {
	const covid = sequelize.define("covid", {
        stdDay: {
            type: Sequelize.STRING
        },
		gubun: {
			type: Sequelize.STRING
	  	},
		defCnt: {
  			type: Sequelize.STRING
		},
        deathCnt: {
  			type: Sequelize.STRING
		}
	});

	return covid
};