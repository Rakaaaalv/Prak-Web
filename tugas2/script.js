document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskValue = taskInput.value.trim();

  if (taskValue !== "") {
    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = taskValue;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", function () {
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.classList.add("edit-btn");

      li.replaceChild(input, span);
      li.replaceChild(saveBtn, editBtn);
      saveBtn.addEventListener("click", function () {
        if (input.value.trim() !== "") {
          span.textContent = input.value.trim();
          li.replaceChild(span, input);
          li.replaceChild(editBtn, saveBtn);
        } else {
          alert("Task cannot be empty.");
        }
      });
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      taskList.removeChild(li);
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
  } else {
    alert("Please enter a task.");
  }
}
