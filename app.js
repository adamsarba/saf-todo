window.addEventListener('load', function(){

  // Get DOM elements
  const form     = document.querySelector('form')
  const input    = document.querySelector('[name="todo"]')
  const todoList = document.getElementById('todos')
  const todoData = []
  const doneData = []

  const btns = document.querySelector('.btns')
  const clearAll = document.getElementById('clearAll')

  setTimeout(() => {
    input.focus()
  }, 1000)


  // Side Effects / Lifecycle
  const existingTodos = JSON.parse(localStorage.getItem('todos')) || []
  const existingDones = JSON.parse(localStorage.getItem('dones')) || []

  let itemId = 0;

  existingTodos.forEach(item => {
    itemId += 1
    addExisting(item)
    // console.log('✔︎ ' + itemId + ' ' + item)
  });
  addDone() || existingDones

  // Funtions

  function addDone() {
    existingDones.forEach(id => {
      const li = document.getElementById(id)
      li.classList.add('done')
    });
  }

  function addExisting(todoText) {
    btns.classList.add('visible')

    const li = document.createElement('li')
    li.classList.add('item')
    li.setAttribute('id', itemId);
    li.innerHTML = todoText
    todoList.appendChild(li)

    // li.addEventListener('click', doneTodo)
    const doneBtn = document.createElement('button')
    doneBtn.classList.add('doneBtn')
    li.appendChild(doneBtn)
    doneBtn.addEventListener('click', doneTodo)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('deleteBtn')
    li.appendChild(deleteBtn)

    deleteBtn.addEventListener('click', deleteTodo)

    todoData.push(todoText)
    localStorage.setItem('todos', JSON.stringify(todoData))
  }

  function addTodo(todoText) {
    itemId += 1

    btns.classList.add('visible')

    const li = document.createElement('li')
    li.classList.add('item')
    li.classList.add('new')
    li.setAttribute('id', itemId);
    li.innerHTML = todoText
    todoList.appendChild(li)

    // li.addEventListener('click', doneTodo)
    const doneBtn = document.createElement('button')
    doneBtn.classList.add('doneBtn')
    li.appendChild(doneBtn)
    doneBtn.addEventListener('click', doneTodo)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('deleteBtn')
    li.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', deleteTodo)

    // console.log('#' + itemId + ' ✔︎ ' + todoText)

    todoData.push(todoText)
    localStorage.setItem('todos', JSON.stringify(todoData))
    input.value = ''
    input.focus()
  }

  // function clearLast() {
  //   const lastTodo = todoList.lastChild
  //
  //   lastTodo.classList.add('remove')
  //   setTimeout(() => {
  //     lastTodo.remove()
  //   }, 300)
  //
  //   todoData.pop()
  //   localStorage.setItem('todos', JSON.stringify(todoData))
  // }

  function removeAll() {
    // while (todoList.firstChild) {
    //   todoList.removeChild(todoList.firstChild);
    // }
    todoList.innerHTML = ''

    localStorage.clear();
    window.location.reload(true); // bug fix
  }

  function deleteTodo() {
    this.parentElement.classList.add('remove')
    setTimeout(() => {
      this.parentElement.remove()
    }, 300)

    itemId = this.parentElement.id
    idx = itemId - 1
    todoData.splice(idx, 1)
    // console.log('\nTodo #' + itemId + ' deleted')

    localStorage.setItem('todos', JSON.stringify(todoData))
  }

  function doneTodo() {
    itemId = this.parentElement.id
    idx = itemId - 1

    if (!this.parentElement.classList.contains('done')) {
      this.parentElement.classList.add('done')
      doneData.push(itemId)
      localStorage.setItem('dones', JSON.stringify(doneData))
    } else {
      this.parentElement.classList.remove('done')
      doneData.splice(idx, 1)
      localStorage.setItem('dones', JSON.stringify(doneData))
    }
  }

  // Events
  form.onsubmit = (event) => {
    event.preventDefault()
    addTodo(input.value)
  }

  // removeLast.addEventListener('click', clearLast)
  clearAll.addEventListener('click', removeAll)

  // To do:
  // - icons and favicon fix
  // - done and delete fix
  // - dark mode
  // - import from file

  // document.getElementById('import').onclick = function() {
  // 	var files = document.getElementById('selectFiles').files;
  //   console.log(files);
  //   if (files.length <= 0) {
  //     return false;
  //   }
  //
  //   var fr = new FileReader();
  //
  //   fr.onload = function(e) {
  //   console.log(e);
  //     var result = JSON.parse(e.target.result);
  //
  //     document.getElementById('todos').innerHTML = result
  //   }
  //
  //   fr.readAsText(files.item(0));
  // };

});
