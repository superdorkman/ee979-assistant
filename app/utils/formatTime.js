export default (stamp, format = 'YY-MM-DD') => {
  // Y表示年份 YY补全
  // M表示月份 MM补全
  // D表示日 DD补全
  // h表示小时
  // m表示分钟
  // s表示秒
  
  if (!stamp) return '';

  const date = new Date(stamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  if (format === 'full') {
    format = 'YY-MM-DD hh:mm:ss';
  }

  if (!/[-./]/.test(format) || format.replace(/\W/g, '').replace(/[YMDhms]/g, '')) {
    throw new Error('格式不对');
  }

  if (format.indexOf('Y') > -1) {
    const len = format.match(/Y/g).length;
    let str = len === 2 ? year : year.toString().substr(-2);
    format = format.replace(new RegExp(`Y{${len}}`), str);
  }

  format = replacing(format, 'M', month);
  format = replacing(format, 'D', day);
  format = replacing(format, 'h', hour);
  format = replacing(format, 'm', minute);
  format = replacing(format, 's', second);

  return format;
}

const padTwo = (target) => {
  return target.toString().padStart(2, '0');
}

const replacing = (format, type, value) => {
  if (format.indexOf(type) === -1) return format;
  const len = format.match(new RegExp(type, 'g')).length;
  let str = len === 2 ? padTwo(value) : value;
  format = format.replace(new RegExp(`${type}{${len}}`), str);
  return format;
}