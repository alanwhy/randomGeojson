const util = require("./randomGeojson.min")

// const data = util.randomGeojson("Point", 10)
// const data = util.randomGeojson("LineString", 10)
const data = util.randomGeojson("Polygon", 10)

data.features.map(item => {
  console.log(item.geometry)
})

data.features.map(item => {
  console.log(item.geometry.coordinates)
})