const inputBOX  = document.getElementById("input box")
const Listcontainer = document.getElementById("LIST comnainer")
let flag = false

function addTask(){
    if(inputBOX.value === '') {
        alert(" כדאי לך לכתוב משהו כדי שמשהו יקרה")
    }
    else {
        const li = document.createElement("li");
        const checkImg = document.createElement("img");
        const liInput = document.createElement("h3");
        const deleteImg = document.createElement("img");
        checkImg.src = "./assets/square.png"
        checkImg.alt = "square"
        checkImg.classList.add("checkImg")
        liInput.innerHTML = inputBOX.value;
        liInput.classList.add("liInput")
        deleteImg.src = "./assets/delete.png"
        deleteImg.alt = "delete"
        deleteImg.classList.add("deleteImg")
        li.classList.add("li")
        li.setAttribute("draggable", true);
        li.appendChild(checkImg)
        li.appendChild(liInput)
        li.appendChild(deleteImg)     
        Listcontainer.appendChild(li);

        checkImg.addEventListener("click", () => {
            if (!flag) {
                checkImg.src = "./assets/check-box-with-check-sign.png"
                liInput.style.textDecorationLine = "line-through"
                flag = true
            } else {
                checkImg.src = "./assets/square.png"
                liInput.style.textDecorationLine = "none"
                flag = false
            } 
        })

        deleteImg.addEventListener("click", () => {
          Listcontainer.removeChild(li);
        })

        li.addEventListener('dragstart', () => {
          li.classList.add('dragging')
        })
            
        li.addEventListener('dragend', () => {
          li.classList.remove('dragging')
        })

    }
    inputBOX.value = "";
} 


Listcontainer.addEventListener('dragover', e => {
  e.preventDefault()
  const afterElement = getDragAfterElement(Listcontainer, e.clientY)
  const draggable = document.querySelector('.dragging')
  if (afterElement == null) {
    Listcontainer.appendChild(draggable);
  } else {
    Listcontainer.insertBefore(draggable, afterElement);
  }            
})
 
function getDragAfterElement(conteiner, y) {
  const draggableElements = [...conteiner.querySelectorAll('.li:not(.dragging)')]
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}