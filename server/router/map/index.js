const router = require("express").Router();
const mapFunctions = require("./mapFunction.js");

router.get("/location", async (req, res) => {
	console.log("location 진입");
	const response = await mapFunctions.getLocation();
	console.log("resposne : ", response);
	if (response) {
		console.log(response, "response check");
		res.status(200).send(response);
	} else {
		res.status(400).send("get location error");
	}
});

module.exports = router;
