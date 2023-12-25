let poweredOn = false;
let currentDuration = 0;
let currentFunction = "";
let countDown;
let cookTime = "0000";
let weight = "0000";
let paused = false;
let outsideLight = false;
let insideLight = false;
let waitingForInput = false;
let clock = document.getElementById("time");

function setClock() {
  if (poweredOn) {
    return;
  }
  clock.textContent = moment().format("h:mm a");
}
setClock();
setInterval(setClock, 30000);

$(".button").on("click", async function () {
  btnFunc = $(this).data("function");
  switch (btnFunc) {
    case "defrost":
      defrost();
      break;
    case "beverage":
      beverage();
      break;
    case "potato":
      potato();
      break;
    case "reheat":
      reheat();
      break;
    case "popcorn":
      popcorn();
      break;
    case "stop":
      stop();
      break;
    case "cook":
      cook();
      break;
    case "one":
      press(1);
      break;
    case "two":
      press(2);
      break;
    case "three":
      press(3);
      break;
    case "four":
      press(4);
      break;
    case "five":
      press(5);
      break;
    case "six":
      press(6);
      break;
    case "seven":
      press(7);
      break;
    case "eight":
      press(8);
      break;
    case "nine":
      press(9);
      break;
    case "zero":
      press(0);
      break;
    case "start":
      start();
      break;
    case "light":
      toggleOutsideLight();
      break;
  }
});

function cook() {
  if (poweredOn) {
    return;
  }
  currentFunction = "cook";
  waitingForInput = true;
}

function reheat() {
  if (poweredOn) {
    return;
  }
  currentFunction = "reheat";
  waitingForInput = true;
}

function potato() {
  if (poweredOn) {
    return;
  }
  currentFunction = "potato";
  waitingForInput = true;
}

function defrost() {
  if (poweredOn) {
    return;
  }
  currentFunction = "defrost";
  waitingForInput = true;
}

function beverage() {
  if (poweredOn) {
    return;
  }
  currentFunction = "beverage";
  waitingForInput = true;
}

function popcorn() {
  if (poweredOn) {
    return;
  }
  currentFunction = "popcorn";
}

function start(duration = null) {
  if (!duration) {
    if (currentFunction === "cook" || currentFunction === "reheat") {
      duration =
        parseInt(cookTime.slice(0, 2)) * 60 + parseInt(cookTime.slice(2, 4));
    } else {
      fetch(`/api/${currentFunction}-service?weight=${weight}`).then((res) =>
        res.json().then((data) => {
          duration = parseFloat(data.time) * 60;
          start(duration);
        })
      );
    }
  }
  if (duration) {
    powerOn();
    setTimer(duration);
  }
}

function stop() {
  if (currentDuration > 0) {
    clearInterval(countDown);
    powerOff();
    setClock();
  }
}

function toggleOutsideLight() {
  outsideLight ? $(".light").hide() : $(".light").show();
  outsideLight = !outsideLight;
}

function toggleInsideLight(status = true) {
  insideLight = status;
  status ? $(".inside-light").show() : $(".inside-light").hide();
}

function powerOn() {
  poweredOn = true;
  toggleInsideLight();
}

function powerOff() {
  poweredOn = false;
  currentDuration = 0;
  toggleInsideLight(false);
}

function press(duration = null) {
  if (currentDuration > 0) {
    currentDuration += duration * 60;
    return;
  }

  if (!waitingForInput) {
    start(duration * 60);
    return;
  }

  if (currentFunction === "cook" || currentFunction === "reheat") {
    cookTime += duration.toString();
    cookTime = cookTime.slice(1, 5);
    displayCookTime();
  } else {
    weight += duration.toString();
    weight = weight.slice(1, 5);
    displayWeight();
  }
}

function displayCookTime() {
  let displayCookTime = cookTime.slice(0, 2) + ":" + cookTime.slice(2, 4);

  clock.textContent = displayCookTime;
}

function displayWeight() {
  clock.textContent = weight + " g";
}

function setTimer(duration) {
  currentDuration = duration;

  countDown = setInterval(function () {
    4;

    currentDuration--;

    minutes = Math.floor(currentDuration / 60);
    seconds = Math.floor(currentDuration % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    clock.textContent = minutes + ":" + seconds;

    if (currentDuration < 0) {
      powerOff();
      cookTime = "0000";
      clearInterval(countDown);
    }
  }, 1000);
}
