export function tokeiDraw(minutes, hours, Hint) {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  drawBoard();
  drawScale();
  drawText();
  rotate();

  function mRotate() {
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineWidth = 3.0;
    ctx.lineTo(
      200 + 130 * Math.cos((Math.PI / 180) * (270 + 6 * minutes)),
      200 + 130 * Math.sin((Math.PI / 180) * (270 + 6 * minutes))
    );
    ctx.strokeStyle = "blue";
    ctx.stroke();
  }

  function hRotate() {
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineWidth = 6.0;
    ctx.lineTo(
      200 + 100 * Math.cos((Math.PI / 180) * (270 + 30 * (hours + minutes / 60))),
      200 + 100 * Math.sin((Math.PI / 180) * (270 + 30 * (hours + minutes / 60)))
    );
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  function rotate() {
    mRotate();
    hRotate();
  }

  function drawText() {
    ctx.font = "30px 'ＭＳ ゴシック'";
    ctx.textAlign = "center";
    const textArrX = [260, 305, 325, 310, 265, 200, 140, 95, 75, 95, 135, 200];
    const textArrY = [105, 150, 210, 275, 320, 335, 320, 270, 210, 150, 105, 85];
    const textArrX2 = [200, 280, 340, 360, 340, 280, 200, 120, 60, 40, 60, 120];
    const textArrY2 = [45, 65, 125, 205, 285, 345, 365, 345, 285, 205, 125, 65];
    for (let i = 0; i <= 11; i++) {
      ctx.fillText(String(i + 1), textArrX[i], textArrY[i]);
    }
    ctx.font = "15px 'ＭＳ ゴシック'";
    if (Hint == "hint1") {
      for (let i = 0; i <= 11; i++) {
        ctx.fillText(String(i * 5), textArrX2[i], textArrY2[i]);
      }
    } else if (Hint == "hint2") {
      for (let i = 0; i < 60; i++) {
        ctx.fillText(
          String(i),
          200 + 160 * Math.cos((Math.PI / 180) * (270 + i * 6)),
          205 + 160 * Math.sin((Math.PI / 180) * (270 + i * 6))
        );
      }
    }
    ctx.font = "10px 'ＭＳ ゴシック'";
  }

  function drawScale() {
    for (let l = 0; l < 60; l++) {
      ctx.beginPath();
      ctx.moveTo(
        200 + 150 * Math.cos((Math.PI / 180) * (270 + l * 6)),
        200 + 150 * Math.sin((Math.PI / 180) * (270 + l * 6))
      );
      ctx.lineTo(
        200 + 145 * Math.cos((Math.PI / 180) * (270 + l * 6)),
        200 + 145 * Math.sin((Math.PI / 180) * (270 + l * 6))
      );
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
    for (let m = 0; m < 12; m++) {
      ctx.beginPath();
      ctx.moveTo(
        200 + 150 * Math.cos((Math.PI / 180) * (270 + m * 30)),
        200 + 150 * Math.sin((Math.PI / 180) * (270 + m * 30))
      );
      ctx.lineTo(
        200 + 140 * Math.cos((Math.PI / 180) * (270 + m * 30)),
        200 + 140 * Math.sin((Math.PI / 180) * (270 + m * 30))
      );
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
  }

  function drawBoard() {
    ctx.clearRect(0, 0, 400, 400);
    ctx.beginPath();
    ctx.arc(200, 200, 150, 0, Math.PI * 2);
    ctx.lineWidth = 1.0;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}
