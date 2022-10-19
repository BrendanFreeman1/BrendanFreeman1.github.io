let gridSize = 16;
const gridContainer = document.querySelector(".gridContainer");
document.body.onload = buildGrid(gridSize);



function buildGrid(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    let newDiv = document.createElement("div");
    newDiv.innerText=(i)
    gridContainer.appendChild(newDiv);
  }
}
