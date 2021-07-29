// Fullscreen option
document.querySelector(".fullscreen").addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

const currentImg = document.querySelector(".main-img");

const inputs = document.querySelectorAll(".filters input");
inputs.forEach((input) => input.addEventListener("input", handleInputUpdate));

function handleInputUpdate() {
  // nextElementSibling for input - output
  const outputs = this.nextElementSibling;
  outputs.value = this.value;
  const suffix = this.dataset.sizing || "";
  currentImg.style.setProperty(`--${this.name}`, this.value + suffix);
}

const btnReset = document.querySelector(".btn-reset");
btnReset.addEventListener("click", handleReset);

function handleReset() {
  inputs.forEach((input) => {
    input.name === "saturate" ? (input.value = 100) : (input.value = 0);
    const output = input.nextElementSibling;
    input.name === "saturate" ? (output.value = 100) : (output.value = 0);
    const suffix = input.dataset.sizing || "";
    currentImg.style.setProperty(`--${input.name}`, input.value + suffix);
  });
}

// ---- Next picture & download images from the external link according the time of day
const btnNextPicture = document.querySelector(".btn-next");
const baseUrl = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/`;
const imgsArr = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];
let imgCounter = 0;

// Next button event
btnNextPicture.addEventListener("click", () => {
  loadPicture();
});

function loadPicture() {
  // what is time now?
  let nowHours = new Date().getHours();
  let nowTimeOfDay;
  if (nowHours >= 6 && nowHours <= 11) {
    nowTimeOfDay = "morning";
  } else if (nowHours >= 12 && nowHours <= 17) {
    nowTimeOfDay = "day";
  } else if (nowHours >= 18 && nowHours <= 23) {
    nowTimeOfDay = "evening";
  } else {
    nowTimeOfDay = "night";
  }
  const img = new Image();
  img.src = `${baseUrl}${nowTimeOfDay}/${imgsArr[imgCounter]}`;
  // preparation onload
  img.onload = () => {
    currentImg.src = `${baseUrl}${nowTimeOfDay}/${imgsArr[imgCounter]}`;
    // zeroing counter after 20 images
    if (imgCounter === imgsArr.length - 1) {
      imgCounter = 0;
    } else {
      imgCounter++;
    }
  };
}

// ---- Load picture from User's computer
const btnLoadPicture = document.getElementById("btnInput");

btnLoadPicture.addEventListener("input", () => {
  loadPictureFromUser();
});

function loadPictureFromUser() {
  const fileInput = document.querySelector('input[type="file"]');
  //   temporary variable - the first image, that user chooses on the computer
  const file = fileInput.files[0];
  const reader = new FileReader();
  // FileReader helps to read files from the user's computer asynchronously
  reader.onload = () => {
    currentImg.src = reader.result;
    fileInput.value = null; // necessary to download the same picture
  };
  reader.readAsDataURL(file);
}

// ---- Download picture with Canvas API

const canvas = document.querySelector("canvas");
const btnSavePicture = document.querySelector(".btn-save");

function downloadPicture() {
  function savePicture() {
    btnSavePicture.addEventListener("click", () => {
      const request = new Promise((resolve, reject) => {
        const img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.src = currentImg.src;
        img.onload = function () {
          createCanvas(img);
          resolve();
        };
      });

      function createCanvas(img) {
        const ctx = canvas.getContext("2d");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.filter = convertFilters();
        ctx.drawImage(img, 0, 0);
      }

      request.then(function createLink() {
        let link = document.createElement("a");
        link.download = "picture-photo-filter.png";
        link.href = canvas.toDataURL();
        link.click();
        link.delete;
      });
    });
  }
  savePicture();
}

function convertFilters() {
  let filters = "";
  let imgFilters = currentImg.style.cssText;
  for (let i = 0; i < imgFilters.length; i++) {
    // changing, for example: "--blur:7px; --sepia:40%; --invert:74%;" на => "blur(7px) sepia(40%) invert(74%)"
    let curChar = imgFilters[i];
    if (curChar === ":") {
      filters += "(";
    } else if (curChar === ";") {
      filters += ")";
    } else if (
      imgFilters[i] !== "-" ||
      (imgFilters[i] === "-" && imgFilters[i - 1] === "e")
    ) {
      filters += imgFilters[i];
    }
  }
  return filters;
}

downloadPicture();
