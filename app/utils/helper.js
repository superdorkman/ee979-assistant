export const getDays =  (year, month) => {
  let days;
  const bigMonth = month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12;
  //当月份为二月时，根据闰年还是非闰年判断天数
  if (month == 2) {
      days = year % 4 == 0 ? 29 : 28;
  } else if (bigMonth) {
      days = 31;
  } else {
      days = 30;
  }

  const arr = [];
  for (let i = 1; i <= days; i++) {
    arr.push(i);
  }

  return arr;
}

export const getDate = (type) => {
  let dateStart, dateEnd;
  if (type === 'week') {
    let wd = new Date().getDay();
    if (wd === 0) {
      dateStart = new Date(new Date().getTime() - 3600 * 24 * 1000 * 6).toLocaleDateString();
      dateEnd = new Date().toLocaleDateString();
    } else {
      dateStart = new Date(new Date().getTime() - 3600 * 24 * 1000 * (wd - 1)).toLocaleDateString();
      dateEnd = new Date(new Date().getTime() + 3600 * 24 * 1000 * (7 - wd)).toLocaleDateString();
    }
  } else if (type === 'month') {
    let date = new Date();
    let md = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    dateStart = new Date(year, month - 1).toLocaleDateString();
    dateEnd = new Date(new Date(year, month).getTime() - 1).toLocaleDateString();
  } else if (type === 'l7') {
    // means latest 7 days
    dateStart = new Date(new Date().getTime() - 3600 * 24 * 1000 * 6).toLocaleDateString();
    dateEnd = new Date().toLocaleDateString();
  } else if (type === 'l30') {
    // means latest 30 days
    dateStart = new Date(new Date().getTime() - 3600 * 24 * 1000 * 29).toLocaleDateString();
    dateEnd = new Date().toLocaleDateString();
  }
  
  return `${dateStart}~${dateEnd}`;
}


export const getTimeStamp = val => {
  return new Date(val).getTime();
}

// 函数去抖
export const debounce = function(fn, delay) {
  let timer;

  return function() {
    var ctx = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(ctx, args);
    }, delay);
  }
}


export const padLeft = (val, len = 2, str = '0') => {
  val = String(val);
  if (len <= val.length) return val;
  if (String.prototype.padStart) return val.padStart(len, str);

  const margin = len - val.length;
  let s = '';
  while(s.length < margin) {
    s += str;
  }

  return `${s.slice(0, margin)}${val}`;
}

export const toFixed = (val, real = 2) => {
  if (!val) return val;
  val = Number(val);
  if (Number.isNaN(val)) {
    throw new Error('不是合法数字');
  }

  return val.toFixed(real);
}

export const decimalAdjust = (number, precision) => {
  var factor = Math.pow(10, precision);
  var tempNumber = number * factor;
  var roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
};

export const trimDecimal = val => {
  if (!val) return;
  return trimZero(parseFloat(val));
}

export const trimZero = val => {
  if (/\.\d{3,}/.test(val)) {
    return val.toFixed(2);
  }
  return val;
}