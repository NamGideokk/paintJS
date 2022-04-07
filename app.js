"use strict";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".colors");
const range = document.querySelector("#range");
const mode = document.querySelector(".mode");
const save = document.querySelector(".save");
const reset = document.querySelector(".reset");

canvas.width = 800;
canvas.height = 800;

// 시작시 기본 색상
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 800, 800);
ctx.strokeStyle = "#1f1f1f";
ctx.fillStyle = "";

// 기본 선 굵기
ctx.lineWidth = 2.5;

// 시작시 그리기 상태
let painting = false;
let filling = false;

function startPainting(e) {
  painting = true;
}
function stopPainting(e) {
  painting = false;
}

// 캔버스 내에서 마우스를 움직이면 x,y 좌표를 따온다.
canvas.addEventListener("mousemove", (e) => {
  let x = e.offsetX;
  let y = e.offsetY;

  console.log(x, y);

  if (!painting) {
    // 캔버스 안에 마우스가 들어오면 path를 시작하고 해당 x,y 좌표로 이동한다.
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
});

// 마우스 버튼을 누르기 시작하면 '페인팅' 시작
canvas.addEventListener("mousedown", startPainting);

// 마우스 버튼을 떼면 '페인팅' 종료
canvas.addEventListener("mouseup", stopPainting);

// 캔버스 밖으로 마우스가 나가면 '페인팅' 종료
canvas.addEventListener("mouseleave", stopPainting);

// FILL 상태에서 클릭시 캔버스 전체에 색 채우기
canvas.addEventListener("click", () => {
  if (filling) {
    ctx.fillRect(0, 0, 800, 800);
  }
});

// 캔버스 내에서 우클릭 이벤트 막기
canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

colors.forEach((color) =>
  color.addEventListener("click", (e) => {
    ctx.strokeStyle = e.target.style.backgroundColor;
    ctx.fillStyle = e.target.style.backgroundColor;
  })
);

if (range) {
  range.addEventListener("input", (e) => {
    ctx.lineWidth = e.target.value;
  });
}

if (mode) {
  mode.addEventListener("click", (e) => {
    if (filling == true) {
      filling = false;
      mode.innerText = "FILL";
    } else {
      filling = true;
      mode.innerText = "PAINT";
    }
  });
}

if (save) {
  save.addEventListener("click", () => {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "myPainting";
    link.click();
  });
}

if (reset) {
  reset.addEventListener("click", () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 800);
  });
}
