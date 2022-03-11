/*
 * @Description: 用于生成图形验证码
 *  来源：https://www.jianshu.com/p/72fe7d107a59
 *  在其基础上进行改动
 */

// 生成一个随机数
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// 生成一个随机色
function randomColor(min, max) {
  const r = randomNum(min, max);
  const g = randomNum(min, max);
  const b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
}

// 绘制验证码图形
export function drawVerify(cEle, value) {
  const [ctx, width, height] = [cEle.getContext("2d"), cEle.width, cEle.height];

  // 清空画布
  ctx.clearRect(0, 0, width, height);
  // 绘制背景色
  ctx.fillStyle = randomColor(180, 240);
  ctx.fillRect(0, 0, width, height);
  // 填充字体
  ctx.font = "80px Arial";
  ctx.fillStyle = randomColor(50, 160);
  ctx.fillText(value, 80, 100);
  // ctx.textAlign = "center";
  // 绘制干扰线
  for (var i = 0; i < 2; i++) {
    ctx.strokeStyle = randomColor(40, 180);
    ctx.beginPath();
    ctx.moveTo(randomNum(0, width), randomNum(0, height));
    ctx.lineTo(randomNum(0, width), randomNum(0, height));
    ctx.stroke();
  }
  // 绘制干扰点
  for (var i = 0; i < 30; i++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// 生成随机码
export function createCode() {
  let code = "";
  //验证码的长度
  const codeLength = 4;
  const codeChars = [];
  // 验证码所需数字和字母的集合
  for (let i = 0; i < 26; i++) {
    if (i < 10) {
      codeChars.push(String.fromCharCode(i + 48));
    }
    codeChars.push(String.fromCharCode(i + 97));
    codeChars.push(String.fromCharCode(i + 65));
  }
  // 组合数字和字母
  for (let i = 0; i < codeLength; i++) {
    const charNum = Math.floor(Math.random() * 52);
    code += codeChars[charNum];
  }
  return code;
}

// 验证
function validateCode() {
  const [inputCode, warnToast] = [
    document.getElementById("inputCode").value,
    document.getElementById("warnToast"),
  ];

  if (inputCode.length <= 0) {
    warnToast.innerHTML = "请输入验证码！";
  } else if (inputCode.toUpperCase() != code.toUpperCase()) {
    warnToast.innerHTML = "验证码错误";
    createCode();
  } else {
    warnToast.innerHTML = "验证码正确！";
  }
}
