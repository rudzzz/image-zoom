const container = document.querySelector(".container");
const image = document.querySelector(".image");
const lens = document.querySelector(".lens");
const result = document.querySelector(".result");

const containerRectangle = container.getBoundingClientRect();
const imageRectangle = image.getBoundingClientRect();
const lensRectangle = lens.getBoundingClientRect();
const resultRectangle = result.getBoundingClientRect();

container.addEventListener("mousemove", zoomImage);

result.style.backgroundImage = `url(${image.src})`;

function zoomImage(event){
    const {x, y} = getMousePosition(event);

    lens.style.left = x + "px"
    lens.style.top = y + "px"

    let fx = resultRectangle.width / lensRectangle.width;
    let fy = resultRectangle.height / lensRectangle.height;
    
    result.style.backgroundSize = `${imageRectangle.width * fx}px ${imageRectangle.height * fy}px`;

    result.style.backgroundPosition = `-${x * fx}px -${y * fy}px`;
}

function getMousePosition(event){
    let x = event.clientX - containerRectangle.left - lensRectangle.width / 2;
    let y = event.clientY - containerRectangle.top - lensRectangle.height / 2;
    let minX = 0;
    let minY = 0;

    let maxX = containerRectangle.width - lensRectangle.width;
    let maxY = containerRectangle.height - lensRectangle.height;

    if(x <= minX){
        x = minX;
    }
    else if(x >= maxX){
        x = maxX;
    }
    
    if(y <= minY){
        y = minY;
    }
    else if(y >= maxY){
        y = maxY;
    }

    return {x, y};
}