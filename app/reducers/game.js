import areaNames from "../constants/areaNames.json";
import goodsTypes from "../constants/goodsTypes.json";
import searchParams from "../constants/searchParams.json";
import serverList from "../constants/serverList.json";
import typeList from "../constants/typeList.json";

const initialSetting = {
  gameName: "dnf",
  areaNames,
  chuhuos: ["游戏币"],
  scales: [
    "游戏币",
    "深渊票",
    "服务器喇叭",
    "上级元素结晶",
    "数据芯片",
    "矛盾的结晶体"
  ],
  selectedArea: "",
  selectedServer: "",
  selectedType: "",
  serverList,
  typeList,
  goodsTypes,
  typeProxy: {
    游戏币: "gold",
    深渊票: "shengyuanpiao",
    游戏账号: "account",
    搬砖号: "bzh",
    太阳账号: "tyzh",
    无色小晶体: "wsxjt",
    宝珠: "bj",
    称号: "ch",
    魔刹石: "mss",
    装备: "equipment",
    服务器喇叭: "fwqlb",
    上级元素结晶: "sjysjj",
    数据芯片: "sjxp",
    矛盾的结晶体: "mddjjt",
    强化券: "qhq",
    增幅券: "zengfuquan",
    材料: "material",
    老玩家推荐码: "lwjtjm",
    其它: "other"
  },
  typeProxyReverse: {
    gold: "游戏币",
    shengyuanpiao: "深渊票",
    account: "游戏账号",
    bzh: "搬砖号",
    tyzh: "太阳账号",
    wsxjt: "无色小晶体",
    bj: "宝珠",
    ch: "称号",
    mss: "魔刹石",
    equipment: "装备",
    fwqlb: "服务器喇叭",
    sjysjj: "上级元素结晶",
    sjxp: "数据芯片",
    mddjjt: "矛盾的结晶体",
    qhq: "强化券",
    zengfuquan: "增幅券",
    material: "材料",
    lwjtjm: "老玩家推荐码",
    other: "其它"
  },
  searchParams,
  crossList: ['跨1','跨2','跨3a','跨3b','跨4','跨5','跨6','跨7','跨8']
};

const game = (state = initialSetting, action) => {
  switch (action.type) {
    case 'SET_GAME_LOC':
      return {
        ...state,
        ...action.loc
      }
    default:
      return state;
  }
};

export default game;
