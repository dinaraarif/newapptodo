function init() {
  let infoText = document.getElementById('infoText')
  infoText.innerHTML = 'Ladataan tehtävälista palvelimelta, odota...'
  async function loadTodos() {
    let response = await fetch('http://localhost:3000/todos')
    let todos = await response.json()
      console.log(todos)
      function showTodos(todos) {
        let todosList = document.getElementById('todosList')
        let infoText = document.getElementById('infoText')
        // no todos
        if (todos.length === 0) {
          infoText.innerHTML = 'Ei tehtäviä'
        } else {    
          todos.forEach(todo => {
              let li = createTodoListItem(todo)        
              todosList.appendChild(li)
          })
          infoText.innerHTML = ''
        }
      }
      
  }
}

 