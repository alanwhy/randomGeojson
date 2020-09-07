# 生成随机 geojson 的工具类

### 如何使用？

在 `webpack` 等环境下使用 `randomGeojson.min.js` 文件

```
import util from "./randomGeojson.min.js"

// 生成随机的50条点数据
const pointData = util.randomGeojson("Point")
// 生成随机的50条线数据
const lineData = util.randomGeojson("LineString")
// 生成随机的50条面数据
const polygonData = util.randomGeojson("Polygon")

// 完整参数演示
const polygonData2 = util.randomGeojson("Polygon",10,[[-180, 90], [180, 90], [180, -90], [-180, -90]])
```

### randomGeojson 参数说明

| 参数   | 说明               | 类型   | 可选值                   | 默认值                                           |
| ------ | ------------------ | ------ | ------------------------ | ------------------------------------------------ |
| type   | 生成的数据类型     | String | Point/LineString/Polygon | -                                                |
| count  | 生成的数据条数     | Number | -                        | 50                                               |
| extent | 生成的数据限定范围 | Array  | -                        | [[-180, 90], [180, 90], [180, -90], [-180, -90]] |

### 文件说明

- 源码文件: `randomGeojson-es6.js`
- es5 转换文件： `randomGeojson.js`
- 压缩后文件： `randomGeojson.min.js`
