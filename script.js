const submit = document.getElementById("submit");
const alrt = document.getElementById("alert");
const todo_container = document.getElementsByClassName("todo-container")[0];
let taskCount;

let taskArr;
let localArr = JSON.parse(localStorage.getItem("tasks"));
// console.log(localArr);
if (localArr === null) {
  taskCount = 0;
  taskArr = [];
} else {
  taskCount = localArr[localArr.length - 1]["id"];
  taskArr = localArr;
  localArr.forEach((todo) => {
    todo_container.innerHTML += `<div class="card text-center mb-2" id="div${todo["id"]}">
      <div class="card-body">
        <p class="card-text" id="p${todo["id"]}">
        ${todo["id"]}. ${todo["task"]}
        </p>
        <button id="check${todo["id"]}" class="mr-4" onclick="getId(this.id)">
          <p>Done</p>
          <i
            class="fa-solid fa-circle-check fa-lg"
            style="color: #8ac926"
          ></i>
        </button>
        <button id="delete${todo["id"]}" class="ml-4" onclick="getId(this.id)">
          <p>Delete</p>
          <i class="fa-solid fa-trash" style="color: #bd0009"></i>
        </button>
      </div>
    </div>`;
  });
}

submit.addEventListener("click", (e) => {
  // console.log("submit button is clicked");
  let taskContent = document.getElementById("task").value;
  //   console.log(`New task is "${taskContent}"`);
  if (taskContent !== "") {
    taskCount++;
    taskArr.push({ id: taskCount, task: taskContent });
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    // console.log(taskArr);
    setTimeout(() => {
      alrt.hidden = false;
    }, 500);
    setTimeout(() => {
      alrt.hidden = true;
    }, 3000);

    // console.log("New todo list is : ");
    // taskArr.forEach(todo => {
    //   let pair = Object.entries(todo);
    //   console.log(`id = ${pair[0][1]} and value = ${pair[1][1]} and type is ${typeof pair[1][1]}`);
    // })

    todo_container.innerHTML += `<div class="card text-center mb-2" id="div${taskCount}">
      <div class="card-body">
        <p class="card-text" id="p${taskCount}">
        ${taskCount}. ${taskContent}
        </p>
        <button id="check${taskCount}" class="mr-4" onclick="getId(this.id)">
          <p>Done</p>
          <i
            class="fa-solid fa-circle-check fa-lg"
            style="color: #8ac926"
          ></i>
        </button>
        <button id="delete${taskCount}" class="ml-4" onclick="getId(this.id)">
          <p>Delete</p>
          <i class="fa-solid fa-trash" style="color: #bd0009"></i>
        </button>
      </div>
    </div>`;
    // console.log(todo_container);
    document.getElementById("task").value = "";
  }
});

let clickCount = 0;
function getId(clickedId) {
  let id = clickedId;
  let idType = id.substring(0, id.length - 1);
  let idNo = Number.parseInt(id[id.length - 1]);
  console.log(
    "A button with ID " +
      id +
      " was clicked! and the id number is " +
      idNo +
      " and the type is " +
      idType +
      " and clickCount is " +
      clickCount
  );
  if (idType === "check" && clickCount % 2 === 0) {
    clickCount++;
    document.getElementById(`p${idNo}`).style.textDecoration = "line-through";
  } else if (idType === "check" && clickCount % 2 !== 0) {
    clickCount++;
    document.getElementById(`p${idNo}`).style.textDecoration = "none";
  }

  if (idType === "delete") {
    deleteFromLocalStorage(idNo);
    location.reload();
  }
}
// A button with ID button-1 was clicked!

function deleteFromLocalStorage(taskNo) {
  let arr = JSON.parse(localStorage.getItem('tasks'));
  arr.forEach(e =>{
    console.log(`id = ${e['id']} and task = ${e['task']}`);
  })
  if(arr.length === 1){
    localStorage.removeItem('tasks');
  }
  else {
    let l = arr.length;
    let newArr = [];
    for(let i=0; i<taskNo-1; i++){
      newArr.push(arr[i]);
    }
    for(let i=taskNo; i<l; i++){
      newArr.push(arr[i]);
      newArr[newArr.length - 1]['id']--;
    }
    localStorage.setItem("tasks", JSON.stringify(newArr));
  }
}
