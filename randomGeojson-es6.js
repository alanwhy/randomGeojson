/**
 * @author alanwhy
 * @date 2020/09/07
 * @license MIT
 */


/**
 * 随机生成某范围内的geojson数据
 * @param {String} type 数据类型 Point/LineString/Polygon
 * @param {Number} count 数据条数 default: 50
 * @param {Array} extent 生成最大范围，左上, 右上, 右下, 左下[[-180, 90], [180, 90], [180, -90], [-180, -90]]
 */
const randomGeojson = (type, count = 50, extent = [[-180, 90], [180, 90], [180, -90], [-180, -90]]) => {
  if (type != "Point" && type != "LineString" && type != "Polygon") {
    console.error("传入类型不正确，应该是 Point/LineString/Polygon 中的一种");
    return
  }

  let geojson = {
    "type": "FeatureCollection",
    "features": []
  }
  // Take out all the X, y coordinates
  const Xs = [extent[0][0], extent[1][0], extent[2][0], extent[3][0]]
  const Ys = [extent[0][1], extent[1][1], extent[2][1], extent[3][1]]

  // Get the maximum value of X and y
  const xMax = Math.max(...Xs)
  const xMin = Math.min(...Xs)
  const yMax = Math.max(...Ys)
  const yMin = Math.min(...Ys)

  for (let i = 0; i < count; i++) {
    // How many points need to be generated
    const pointsLength = type == "Point" ? 1 : type == "LineString" ? 2 : 3
    let points = []

    for (let j = 0; j < pointsLength; j++) {
      const rX = randomLocation(xMax, xMin)
      const rY = randomLocation(yMax, yMin)
      const randomPoint = [rX, rY]
      // Judge whether the random point is in the range plane
      if (inside(randomPoint, extent)) {
        points.push(randomPoint)
      } else {
        j--
      }
    }

    let feature = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": type,
        "coordinates": []
      }
    }

    if (type == "Point") {
      feature.geometry.coordinates = points[0]
    } else if (type == "LineString") {
      feature.geometry.coordinates = points
    } else if (type == "Polygon") {
      // Finish the face splicing
      points[points.length] = points[0]
      feature.geometry.coordinates = [points]
    }

    geojson.features.push(feature)
  }

  return geojson
}

/**
 * 随机出一个坐标值X或Y
 * @param {Number} max Expected maximum
 * @param {Number} min Expected minimum
 */
const randomLocation = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min) + (+Math.random().toFixed(3));
}

/**
 * 判断点是否在面内
 * @param {Array} point 需要判断的点
 * @param {Array} vs 面的范围
 * @return {boolean} inside
 */
const inside = (point, vs) => {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

  var x = point[0], y = point[1];

  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0], yi = vs[i][1];
    var xj = vs[j][0], yj = vs[j][1];

    var intersect = ((yi > y) != (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

export {
  randomGeojson
}