/* eslint-disable @next/next/no-img-element */
import React from "react";
import CustomAccordion from "../../../../theme/accordion/accordion.component";
import styles from "./RightSide.module.scss";
import { nutrition } from "../../fackData/recipeDetails";
import LinearComponent from "../../../../theme/linearProgress/LinearProgress.component";
import RecursiveAccordian from "../../../customRecursiveAccordian/recursiveAccordian.component";

const health = [
  { name: "Vitamin A", percent: 100 },
  { name: "Vitexin", percent: 90 },
  { name: "Vitamin D", percent: 87 },
  { name: "Iron", percent: 69 },
  { name: "Betaxanthins", percent: 50 },
  { name: "Calcium", percent: 35 },
  { name: "Quercetiin", percent: 20 },
];

// let nestedAccordian = {
//   Energy: {
//     Protein: {
//       value: "energy 1",
//       Unit: "kcal",
//       children: {},
//     },
//     Fats: {
//       value: "Fats",
//       Unit: "fat",
//       children: {},
//     },
//     Carbohydrates: {
//       value: "Carbohydrates",
//       Unit: "kcal",
//       children: {
//         "Dietary Fiber": {
//           value: "Carbohydrates",
//           Unit: "kcal",
//           children: {},
//         },
//         Sugars: {
//           value: "Carbohydrates",
//           Unit: "kcal",
//           children: {
//             Sucrose: {
//               value: "Sucrose",
//               Unit: "kcal",
//               children: {},
//             },
//             Glucose: {
//               value: "Glucose",
//               Unit: "kcal",
//               children: {},
//             },
//             Fructose: {
//               value: "Fructose",
//               Unit: "kcal",
//               children: {},
//             },
//             Lactose: {
//               value: "Lactose",
//               Unit: "kcal",
//               children: {},
//             },
//             Maltose: {
//               value: "Maltose",
//               Unit: "kcal",
//               children: {},
//             },
//             Galactose: {
//               value: "Galactose",
//               Unit: "kcal",
//               children: {},
//             },
//           },
//         },
//         Starch: {
//           value: "Starch",
//           Unit: "kcal",
//           children: {},
//         },
//       },
//     },
//   },
//   Vitamins: {
//     "Vitamin C": {
//       value: "Vitamin C",
//       Unit: "kcal",
//       children: {},
//     },
//     Thiamin: {
//       value: "Thiamin",
//       Unit: "kcal",
//       children: {},
//     },
//     Riboflavin: {
//       value: "Riboflavin",
//       Unit: "kcal",
//       children: {},
//     },
//     Niacin: {
//       value: "Niacin",
//       Unit: "kcal",
//       children: {},
//     },
//     "Pantothenic acid": {
//       value: "",
//       Unit: "kcal",
//       children: {},
//     },
//     "Vitamin B-6": {
//       value: "Vitamin B-6",
//       Unit: "kcal",
//       children: {},
//     },
//     Biotin: {
//       value: "Biotin",
//       Unit: "kcal",
//       children: {},
//     },
//     Folate: {
//       value: "Folate",
//       Unit: "kcal",
//       children: {},
//     },
//     Choline: {
//       value: "Choline",
//       Unit: "kcal",
//       children: {},
//     },
//     Betaine: {
//       value: "Betaine",
//       Unit: "kcal",
//       children: {},
//     },
//     "Vitamin B-12": {
//       value: "Vitamin B-12",
//       Unit: "kcal",
//       children: {},
//     },
//     "Vitamin A": {
//       value: "Vitamin A",
//       Unit: "kcal",
//       children: {},
//     },
//     "Vitamin K": {
//       value:
//         "Vitamin K (phylloquinone), Vitamin K (Dihydrophylloquinone), Vitamin K (Menaquinone-4)",
//       Unit: "kcal",
//       children: {},
//     },
//   },
//   Minerals: {
//     Calcium: { value: "Calcium, Ca", Unit: "kcal", children: {} },
//   },
// };

let nestedAccordian=JSON.parse("{\"calories\":{\"value\":\"159.28\",\"blendNutrientRefference\":{\"_id\":\"620b4606b82695d67f28e193\",\"blendId\":\"1000\",\"nutrientName\":\"Calorie\",\"category\":{\"_id\":\"6203a9061c100bd226c13c65\",\"blendId\":\"10\",\"categoryName\":\"Calories\",\"images\":[],\"keywords\":[],\"rank\":1,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":1,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618823ced314894f29250\",\"sourceNutrientName\":\"Energy\",\"units\":\"kJ\",\"_id\":\"61c6e5bc3a320071dc975b8f\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618823ced314894f29250\",\"units\":\"kilojoule \",\"status\":\"Review\",\"min_measure\":\"250\",\"unitName\":\"kJ\",\"altName\":\"Calories\"}},\"energy\":{\"childs\":{\"fats\":{\"value\":\"0.14300000000000002\",\"blendNutrientRefference\":{\"_id\":\"620b4607b82695d67f28e199\",\"blendId\":\"1002\",\"nutrientName\":\"Fats\",\"category\":{\"_id\":\"6203a9381c100bd226c13c67\",\"blendId\":\"20\",\"categoryName\":\"Energy\",\"images\":[],\"keywords\":[],\"rank\":2,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":2,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618913ced314894f2929e\",\"sourceNutrientName\":\"Total lipid (fat)\",\"units\":\"G\",\"_id\":\"61c6e5c03a320071dc975bb6\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618913ced314894f2929e\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"}},\"carbohydrates\":{\"dietryFibre\":{\"value\":\"2.431\",\"blendNutrientRefference\":{\"_id\":\"620b4609b82695d67f28e19f\",\"blendId\":\"1004\",\"nutrientName\":\"Dietary Fiber\",\"category\":{\"_id\":\"6203a9381c100bd226c13c67\",\"blendId\":\"20\",\"categoryName\":\"Energy\",\"images\":[],\"keywords\":[],\"rank\":2,\"__v\":0,\"isPublished\":true},\"parent\":{\"_id\":\"620b4608b82695d67f28e19c\",\"blendId\":\"1003\",\"nutrientName\":\"Carbohydrates\",\"category\":\"6203a9381c100bd226c13c67\",\"parent\":null,\"parentIsCategory\":true,\"rank\":3,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618833ced314894f29256\",\"sourceNutrientName\":\"Carbohydrate, by difference\",\"units\":\"G\",\"_id\":\"61c6e5bc3a320071dc975b92\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618833ced314894f29256\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"},\"parentIsCategory\":false,\"rank\":1,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c6189a3ced314894f292ce\",\"sourceNutrientName\":\"Fiber, total dietary\",\"units\":\"G\",\"_id\":\"61c6e5c23a320071dc975bce\"}],\"__v\":0,\"uniqueNutrientId\":\"61c6189a3ced314894f292ce\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"},\"childs\":{}},\"sugars\":{\"value\":\"5.247\",\"blendNutrientRefference\":{\"_id\":\"620b460bb82695d67f28e1aa\",\"blendId\":\"1005\",\"nutrientName\":\"Sugars\",\"category\":{\"_id\":\"6203a9381c100bd226c13c67\",\"blendId\":\"20\",\"categoryName\":\"Energy\",\"images\":[],\"keywords\":[],\"rank\":2,\"__v\":0,\"isPublished\":true},\"parent\":{\"_id\":\"620b4608b82695d67f28e19c\",\"blendId\":\"1003\",\"nutrientName\":\"Carbohydrates\",\"category\":\"6203a9381c100bd226c13c67\",\"parent\":null,\"parentIsCategory\":true,\"rank\":3,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618833ced314894f29256\",\"sourceNutrientName\":\"Carbohydrate, by difference\",\"units\":\"G\",\"_id\":\"61c6e5bc3a320071dc975b92\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618833ced314894f29256\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"},\"parentIsCategory\":false,\"rank\":2,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618a33ced314894f292f8\",\"sourceNutrientName\":\"Sugars, total including NLEA\",\"units\":\"G\",\"_id\":\"61c6e5c43a320071dc975be3\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618a33ced314894f292f8\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"},\"childs\":{\"sucrose\":{\"value\":\"0.022\",\"blendNutrientRefference\":{\"_id\":\"620b460cb82695d67f28e1ae\",\"blendId\":\"1006\",\"nutrientName\":\"Sucrose\",\"category\":{\"_id\":\"6203a9381c100bd226c13c67\",\"blendId\":\"20\",\"categoryName\":\"Energy\",\"images\":[],\"keywords\":[],\"rank\":2,\"__v\":0,\"isPublished\":true},\"parent\":{\"_id\":\"620b460bb82695d67f28e1aa\",\"blendId\":\"1005\",\"nutrientName\":\"Sugars\",\"category\":\"6203a9381c100bd226c13c67\",\"parent\":\"620b4608b82695d67f28e19c\",\"parentIsCategory\":false,\"rank\":2,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618a33ced314894f292f8\",\"sourceNutrientName\":\"Sugars, total including NLEA\",\"units\":\"G\",\"_id\":\"61c6e5c43a320071dc975be3\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618a33ced314894f292f8\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"},\"parentIsCategory\":false,\"rank\":1,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c6188c3ced314894f29286\",\"sourceNutrientName\":\"Sucrose\",\"units\":\"G\",\"_id\":\"61c6e5bf3a320071dc975baa\"}],\"__v\":0,\"uniqueNutrientId\":\"61c6188c3ced314894f29286\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"}},\"glucose\":{\"value\":\"1.98\",\"blendNutrientRefference\":{\"_id\":\"620b460db82695d67f28e1b2\",\"blendId\":\"1007\",\"nutrientName\":\"Glucose\",\"category\":{\"_id\":\"6203a9381c100bd226c13c67\",\"blendId\":\"20\",\"categoryName\":\"Energy\",\"images\":[],\"keywords\":[],\"rank\":2,\"__v\":0,\"isPublished\":true},\"parent\":{\"_id\":\"620b460bb82695d67f28e1aa\",\"blendId\":\"1005\",\"nutrientName\":\"Sugars\",\"category\":\"6203a9381c100bd226c13c67\",\"parent\":\"620b4608b82695d67f28e19c\",\"parentIsCategory\":false,\"rank\":2,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618a33ced314894f292f8\",\"sourceNutrientName\":\"Sugars, total including NLEA\",\"units\":\"G\",\"_id\":\"61c6e5c43a320071dc975be3\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618a33ced314894f292f8\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"},\"parentIsCategory\":false,\"rank\":2,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c6188e3ced314894f2928c\",\"sourceNutrientName\":\"Glucose\",\"units\":\"G\",\"_id\":\"61c6e5bf3a320071dc975bad\"}],\"__v\":0,\"uniqueNutrientId\":\"61c6188e3ced314894f2928c\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"}},\"fructose\":{\"value\":\"1.672\",\"blendNutrientRefference\":{\"_id\":\"620b460eb82695d67f28e1b6\",\"blendId\":\"1008\",\"nutrientName\":\"Fructose\",\"category\":{\"_id\":\"6203a9381c100bd226c13c67\",\"blendId\":\"20\",\"categoryName\":\"Energy\",\"images\":[],\"keywords\":[],\"rank\":2,\"__v\":0,\"isPublished\":true},\"parent\":{\"_id\":\"620b460bb82695d67f28e1aa\",\"blendId\":\"1005\",\"nutrientName\":\"Sugars\",\"category\":\"6203a9381c100bd226c13c67\",\"parent\":\"620b4608b82695d67f28e19c\",\"parentIsCategory\":false,\"rank\":2,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618a33ced314894f292f8\",\"sourceNutrientName\":\"Sugars, total including NLEA\",\"units\":\"G\",\"_id\":\"61c6e5c43a320071dc975be3\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618a33ced314894f292f8\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"},\"parentIsCategory\":false,\"rank\":3,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618953ced314894f292b0\",\"sourceNutrientName\":\"Fructose\",\"units\":\"G\",\"_id\":\"61c6e5c13a320071dc975bbf\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618953ced314894f292b0\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"}},\"lactose\":{\"value\":\"0\",\"blendNutrientRefference\":{\"_id\":\"620b460fb82695d67f28e1ba\",\"blendId\":\"1009\",\"nutrientName\":\"Lactose\",\"category\":{\"_id\":\"6203a9381c100bd226c13c67\",\"blendId\":\"20\",\"categoryName\":\"Energy\",\"images\":[],\"keywords\":[],\"rank\":2,\"__v\":0,\"isPublished\":true},\"parent\":{\"_id\":\"620b460bb82695d67f28e1aa\",\"blendId\":\"1005\",\"nutrientName\":\"Sugars\",\"category\":\"6203a9381c100bd226c13c67\",\"parent\":\"620b4608b82695d67f28e19c\",\"parentIsCategory\":false,\"rank\":2,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618a33ced314894f292f8\",\"sourceNutrientName\":\"Sugars, total including NLEA\",\"units\":\"G\",\"_id\":\"61c6e5c43a320071dc975be3\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618a33ced314894f292f8\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"},\"parentIsCategory\":false,\"rank\":4,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618a43ced314894f292fe\",\"sourceNutrientName\":\"Lactose\",\"units\":\"G\",\"_id\":\"61c6e5c43a320071dc975be6\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618a43ced314894f292fe\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"}},\"maltose\":{\"value\":\"0.088\",\"blendNutrientRefference\":{\"_id\":\"620b4610b82695d67f28e1be\",\"blendId\":\"1010\",\"nutrientName\":\"Maltose\",\"category\":{\"_id\":\"6203a9381c100bd226c13c67\",\"blendId\":\"20\",\"categoryName\":\"Energy\",\"images\":[],\"keywords\":[],\"rank\":2,\"__v\":0,\"isPublished\":true},\"parent\":{\"_id\":\"620b460bb82695d67f28e1aa\",\"blendId\":\"1005\",\"nutrientName\":\"Sugars\",\"category\":\"6203a9381c100bd226c13c67\",\"parent\":\"620b4608b82695d67f28e19c\",\"parentIsCategory\":false,\"rank\":2,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618a33ced314894f292f8\",\"sourceNutrientName\":\"Sugars, total including NLEA\",\"units\":\"G\",\"_id\":\"61c6e5c43a320071dc975be3\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618a33ced314894f292f8\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"},\"parentIsCategory\":false,\"rank\":5,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c6188f3ced314894f29292\",\"sourceNutrientName\":\"Maltose\",\"units\":\"G\",\"_id\":\"61c6e5bf3a320071dc975bb0\"}],\"__v\":0,\"uniqueNutrientId\":\"61c6188f3ced314894f29292\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"}},\"galactose\":{\"value\":\"0\",\"blendNutrientRefference\":{\"_id\":\"620b4611b82695d67f28e1c2\",\"blendId\":\"1011\",\"nutrientName\":\"Galactose\",\"category\":{\"_id\":\"6203a9381c100bd226c13c67\",\"blendId\":\"20\",\"categoryName\":\"Energy\",\"images\":[],\"keywords\":[],\"rank\":2,\"__v\":0,\"isPublished\":true},\"parent\":{\"_id\":\"620b460bb82695d67f28e1aa\",\"blendId\":\"1005\",\"nutrientName\":\"Sugars\",\"category\":\"6203a9381c100bd226c13c67\",\"parent\":\"620b4608b82695d67f28e19c\",\"parentIsCategory\":false,\"rank\":2,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618a33ced314894f292f8\",\"sourceNutrientName\":\"Sugars, total including NLEA\",\"units\":\"G\",\"_id\":\"61c6e5c43a320071dc975be3\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618a33ced314894f292f8\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"},\"parentIsCategory\":false,\"rank\":6,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618a63ced314894f29304\",\"sourceNutrientName\":\"Galactose\",\"units\":\"G\",\"_id\":\"61c6e5c43a320071dc975be9\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618a63ced314894f29304\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"G\",\"units\":\"\"}}}}}}},\"vitamins\":{\"childs\":{\"vitaminC\":{\"value\":\"551.804\",\"blendNutrientRefference\":{\"_id\":\"620b4613b82695d67f28e1c9\",\"blendId\":\"1013\",\"nutrientName\":\"Vitamin C\",\"category\":{\"_id\":\"6203a96e1c100bd226c13c69\",\"blendId\":\"30\",\"categoryName\":\"Vitamins\",\"images\":[],\"keywords\":[],\"rank\":3,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":1,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618993ced314894f292c8\",\"sourceNutrientName\":\"Vitamin C, total ascorbic acid\",\"units\":\"MG\",\"_id\":\"61c6e5c23a320071dc975bcb\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618993ced314894f292c8\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"thiamin\":{\"value\":\"0.0066\",\"blendNutrientRefference\":{\"_id\":\"620b4613b82695d67f28e1cc\",\"blendId\":\"1014\",\"nutrientName\":\"Thiamin\",\"category\":{\"_id\":\"6203a96e1c100bd226c13c69\",\"blendId\":\"30\",\"categoryName\":\"Vitamins\",\"images\":[],\"keywords\":[],\"rank\":3,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":2,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618e73ced314894f2942d\",\"sourceNutrientName\":\"Thiamin\",\"units\":\"MG\",\"_id\":\"61c6e5ce3a320071dc975c52\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618e73ced314894f2942d\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"riboflavin\":{\"value\":\"0.019799999999999998\",\"blendNutrientRefference\":{\"_id\":\"620b4614b82695d67f28e1cf\",\"blendId\":\"1015\",\"nutrientName\":\"Riboflavin\",\"category\":{\"_id\":\"6203a96e1c100bd226c13c69\",\"blendId\":\"30\",\"categoryName\":\"Vitamins\",\"images\":[],\"keywords\":[],\"rank\":3,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":3,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618e83ced314894f29433\",\"sourceNutrientName\":\"Riboflavin\",\"units\":\"MG\",\"_id\":\"61c6e5ce3a320071dc975c55\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618e83ced314894f29433\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"niacin\":{\"value\":\"0.132\",\"blendNutrientRefference\":{\"_id\":\"620b4615b82695d67f28e1d2\",\"blendId\":\"1016\",\"nutrientName\":\"Niacin\",\"category\":{\"_id\":\"6203a96e1c100bd226c13c69\",\"blendId\":\"30\",\"categoryName\":\"Vitamins\",\"images\":[],\"keywords\":[],\"rank\":3,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":4,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618ee3ced314894f29453\",\"sourceNutrientName\":\"Niacin\",\"units\":\"MG\",\"_id\":\"61c6e5cf3a320071dc975c5b\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618ee3ced314894f29453\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"pantothenicAcid\":{\"value\":\"0.06764999999999999\",\"blendNutrientRefference\":{\"_id\":\"620b4615b82695d67f28e1d5\",\"blendId\":\"1017\",\"nutrientName\":\"Pantothenic acid\",\"category\":{\"_id\":\"6203a96e1c100bd226c13c69\",\"blendId\":\"30\",\"categoryName\":\"Vitamins\",\"images\":[],\"keywords\":[],\"rank\":3,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":5,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618ef3ced314894f29459\",\"sourceNutrientName\":\"Pantothenic acid\",\"units\":\"MG\",\"_id\":\"61c6e5cf3a320071dc975c5e\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618ef3ced314894f29459\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"vitaminB6\":{\"value\":\"0.0013200000000000002\",\"blendNutrientRefference\":{\"_id\":\"620b4616b82695d67f28e1d8\",\"blendId\":\"1018\",\"nutrientName\":\"Vitamin B-6\",\"category\":{\"_id\":\"6203a96e1c100bd226c13c69\",\"blendId\":\"30\",\"categoryName\":\"Vitamins\",\"images\":[],\"keywords\":[],\"rank\":3,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":6,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618f03ced314894f2945f\",\"sourceNutrientName\":\"Vitamin B-6\",\"units\":\"MG\",\"_id\":\"61c6e5d03a320071dc975c61\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618f03ced314894f2945f\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"folate\":{\"value\":\"4.62\",\"blendNutrientRefference\":{\"_id\":\"620b4617b82695d67f28e1de\",\"blendId\":\"1020\",\"nutrientName\":\"Folate\",\"category\":{\"_id\":\"6203a96e1c100bd226c13c69\",\"blendId\":\"30\",\"categoryName\":\"Vitamins\",\"images\":[],\"keywords\":[],\"rank\":3,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":8,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618d83ced314894f293e7\",\"sourceNutrientName\":\"Folate, total\",\"units\":\"UG\",\"_id\":\"61c6e5cd3a320071dc975c49\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618d83ced314894f293e7\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"UG\",\"units\":\"\"}},\"vitaminB12\":{\"value\":\"0\",\"blendNutrientRefference\":{\"_id\":\"620b4619b82695d67f28e1e7\",\"blendId\":\"1023\",\"nutrientName\":\"Vitamin B-12\",\"category\":{\"_id\":\"6203a96e1c100bd226c13c69\",\"blendId\":\"30\",\"categoryName\":\"Vitamins\",\"images\":[],\"keywords\":[],\"rank\":3,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":11,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618e43ced314894f29423\",\"sourceNutrientName\":\"Vitamin B-12\",\"units\":\"UG\",\"_id\":\"61c6e5ce3a320071dc975c4f\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618e43ced314894f29423\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"UG\",\"units\":\"\"}},\"vitaminA\":{\"value\":\"222.42000000000002\",\"blendNutrientRefference\":{\"_id\":\"620b461ab82695d67f28e1ea\",\"blendId\":\"1024\",\"nutrientName\":\"Vitamin A\",\"category\":{\"_id\":\"6203a96e1c100bd226c13c69\",\"blendId\":\"30\",\"categoryName\":\"Vitamins\",\"images\":[],\"keywords\":[],\"rank\":3,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":12,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618873ced314894f29268\",\"sourceNutrientName\":\"Vitamin A, RAE\",\"units\":\"UG\",\"_id\":\"61c6e5bd3a320071dc975b9b\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618873ced314894f29268\",\"units\":\"\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"UG\"}},\"vitaminE\":{\"value\":\"0.0594\",\"blendNutrientRefference\":{\"_id\":\"620b461ab82695d67f28e1ed\",\"blendId\":\"1025\",\"nutrientName\":\"Vitamin E\",\"category\":{\"_id\":\"6203a96e1c100bd226c13c69\",\"blendId\":\"30\",\"categoryName\":\"Vitamins\",\"images\":[],\"keywords\":[],\"rank\":3,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":13,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618cf3ced314894f293bb\",\"sourceNutrientName\":\"Vitamin E (alpha-tocopherol)\",\"units\":\"MG\",\"_id\":\"61c6e5cc3a320071dc975c37\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618cf3ced314894f293bb\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"vitaminK\":{\"value\":\"0.46199999999999997\",\"blendNutrientRefference\":{\"_id\":\"620b461cb82695d67f28e1f3\",\"blendId\":\"1027\",\"nutrientName\":\"Vitamin K\",\"category\":{\"_id\":\"6203a96e1c100bd226c13c69\",\"blendId\":\"30\",\"categoryName\":\"Vitamins\",\"images\":[],\"keywords\":[],\"rank\":3,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":15,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c638e73ced314894f32369\",\"sourceNutrientName\":\"Vitamin K (Menaquinone-4)\",\"units\":\"UG\",\"_id\":\"61c6e5ed3a320071dc975d9c\"}],\"__v\":0,\"uniqueNutrientId\":\"61c638e73ced314894f32369\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"UG\",\"units\":\"\"}}}},\"minerals\":{\"childs\":{\"calcium\":{\"value\":\"6.82\",\"blendNutrientRefference\":{\"_id\":\"620b461cb82695d67f28e1f6\",\"blendId\":\"1028\",\"nutrientName\":\"Calcium\",\"category\":{\"_id\":\"6203a98a1c100bd226c13c6b\",\"blendId\":\"40\",\"categoryName\":\"Minerals\",\"images\":[],\"keywords\":[],\"rank\":4,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":1,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618893ced314894f29274\",\"sourceNutrientName\":\"Calcium, Ca\",\"units\":\"MG\",\"_id\":\"61c6e5be3a320071dc975ba1\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618893ced314894f29274\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"iron\":{\"value\":\"0.8734000000000001\",\"blendNutrientRefference\":{\"_id\":\"620b461db82695d67f28e1f9\",\"blendId\":\"1029\",\"nutrientName\":\"Iron\",\"category\":{\"_id\":\"6203a98a1c100bd226c13c6b\",\"blendId\":\"40\",\"categoryName\":\"Minerals\",\"images\":[],\"keywords\":[],\"rank\":4,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":2,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c6189c3ced314894f292d4\",\"sourceNutrientName\":\"Iron, Fe\",\"units\":\"MG\",\"_id\":\"61c6e5c23a320071dc975bd1\"}],\"__v\":0,\"uniqueNutrientId\":\"61c6189c3ced314894f292d4\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"magnesium\":{\"value\":\"14.52\",\"blendNutrientRefference\":{\"_id\":\"620b461eb82695d67f28e1fc\",\"blendId\":\"1030\",\"nutrientName\":\"Magnesium\",\"category\":{\"_id\":\"6203a98a1c100bd226c13c6b\",\"blendId\":\"40\",\"categoryName\":\"Minerals\",\"images\":[],\"keywords\":[],\"rank\":4,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":3,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c6189d3ced314894f292da\",\"sourceNutrientName\":\"Magnesium, Mg\",\"units\":\"MG\",\"_id\":\"61c6e5c33a320071dc975bd4\"}],\"__v\":0,\"uniqueNutrientId\":\"61c6189d3ced314894f292da\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"potassium\":{\"value\":\"165.76999999999998\",\"blendNutrientRefference\":{\"_id\":\"620b461fb82695d67f28e202\",\"blendId\":\"1032\",\"nutrientName\":\"Potassium\",\"category\":{\"_id\":\"6203a98a1c100bd226c13c6b\",\"blendId\":\"40\",\"categoryName\":\"Minerals\",\"images\":[],\"keywords\":[],\"rank\":4,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":5,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c6188a3ced314894f2927a\",\"sourceNutrientName\":\"Potassium, K\",\"units\":\"MG\",\"_id\":\"61c6e5be3a320071dc975ba4\"}],\"__v\":0,\"uniqueNutrientId\":\"61c6188a3ced314894f2927a\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"sodium\":{\"value\":\"9.790000000000001\",\"blendNutrientRefference\":{\"_id\":\"620b4620b82695d67f28e205\",\"blendId\":\"1033\",\"nutrientName\":\"Sodium\",\"category\":{\"_id\":\"6203a98a1c100bd226c13c6b\",\"blendId\":\"40\",\"categoryName\":\"Minerals\",\"images\":[],\"keywords\":[],\"rank\":4,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":6,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618a03ced314894f292e6\",\"sourceNutrientName\":\"Sodium, Na\",\"units\":\"MG\",\"_id\":\"61c6e5c33a320071dc975bda\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618a03ced314894f292e6\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"zinc\":{\"value\":\"0.1694\",\"blendNutrientRefference\":{\"_id\":\"620b4620b82695d67f28e208\",\"blendId\":\"1034\",\"nutrientName\":\"Zinc\",\"category\":{\"_id\":\"6203a98a1c100bd226c13c6b\",\"blendId\":\"40\",\"categoryName\":\"Minerals\",\"images\":[],\"keywords\":[],\"rank\":4,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":7,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c6188b3ced314894f29280\",\"sourceNutrientName\":\"Zinc, Zn\",\"units\":\"MG\",\"_id\":\"61c6e5be3a320071dc975ba7\"}],\"__v\":0,\"uniqueNutrientId\":\"61c6188b3ced314894f29280\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"copper\":{\"value\":\"0.053459999999999994\",\"blendNutrientRefference\":{\"_id\":\"620b4621b82695d67f28e20b\",\"blendId\":\"1035\",\"nutrientName\":\"Copper\",\"category\":{\"_id\":\"6203a98a1c100bd226c13c6b\",\"blendId\":\"40\",\"categoryName\":\"Minerals\",\"images\":[],\"keywords\":[],\"rank\":4,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":8,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618a13ced314894f292ec\",\"sourceNutrientName\":\"Copper, Cu\",\"units\":\"MG\",\"_id\":\"61c6e5c33a320071dc975bdd\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618a13ced314894f292ec\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"manganese\":{\"value\":\"0.08008\",\"blendNutrientRefference\":{\"_id\":\"620b4622b82695d67f28e20e\",\"blendId\":\"1036\",\"nutrientName\":\"Manganese\",\"category\":{\"_id\":\"6203a98a1c100bd226c13c6b\",\"blendId\":\"40\",\"categoryName\":\"Minerals\",\"images\":[],\"keywords\":[],\"rank\":4,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":9,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618a23ced314894f292f2\",\"sourceNutrientName\":\"Manganese, Mn\",\"units\":\"MG\",\"_id\":\"61c6e5c43a320071dc975be0\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618a23ced314894f292f2\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"MG\",\"units\":\"\"}},\"salenium\":{\"value\":\"0.033\",\"blendNutrientRefference\":{\"_id\":\"620b4623b82695d67f28e214\",\"blendId\":\"1038\",\"nutrientName\":\"Salenium\",\"category\":{\"_id\":\"6203a98a1c100bd226c13c6b\",\"blendId\":\"40\",\"categoryName\":\"Minerals\",\"images\":[],\"keywords\":[],\"rank\":4,\"__v\":0,\"isPublished\":true},\"parent\":null,\"parentIsCategory\":true,\"rank\":11,\"related_sources\":[{\"source\":\"USDA\",\"sourceId\":\"61c618f43ced314894f29471\",\"sourceNutrientName\":\"Selenium, Se\",\"units\":\"UG\",\"_id\":\"61c6e5d03a320071dc975c6a\"}],\"__v\":0,\"uniqueNutrientId\":\"61c618f43ced314894f29471\",\"status\":\"Active\",\"min_measure\":\"\",\"unitName\":\"UG\",\"units\":\"\"}}}}}")
interface PassingProps {
  name: string;
  percent: number;
}

const RightSide = () => {
  return (
    <div>
      <div className={styles.header}>
        <img src="/icons/chart-bar-light-green.svg" alt="bar icon" />
        <h3>Rx Facts</h3>
      </div>
      <div className={styles.content}>
        <h3>Nutrition</h3>
        <div className={styles.nutritionHeader}>
          <p>Amount Per Serving Calories</p>
          <div className={styles.recursiveAccordianHeading}>
            <div className={styles.recursiveAccordianHeading__heading}>
              <div className={styles.recursiveAccordianHeading__heading__1}>
                Calories
              </div>
              <div className={styles.recursiveAccordianHeading__heading__2}>
                93
              </div>
            </div>
            <div className={styles.recursiveAccordianHeading__subheading}>
              <div className={styles.recursiveAccordianHeading__subheading__3}>
                Value
              </div>
              <div className={styles.recursiveAccordianHeading__subheading__4}>
                Daily%
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ingredientsDetails}>
          <RecursiveAccordian dataObject={nestedAccordian} />

        </div>
      </div>

      <div className={styles.linerProgessContainer}>
        <h3>Health</h3>
        <p>Disease, Conditions and Systems</p>
        {health.map(({ name, percent }: PassingProps, index) => {
          return <LinearComponent name={name} percent={percent} key={index} />;
        })}
      </div>
    </div>
  );
};

export default RightSide;
