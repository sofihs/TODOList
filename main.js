// Carga las tareas desde localStorage al iniciar, si no hay tareas, crea un array vacío.
const todos = JSON.parse(localStorage.getItem('todos')) || [];

// Función para renderizar la lista de tareas
const render = () => {
    // Obtiene el elemento de la lista
    const todoList = document.getElementById('todo-list'); 
    // Mapea las tareas para crear el HTML de cada tarea
    const todosTemplate = todos.map((t, i) => 
        // Agrega la clase 'done' si la tarea está completada 
        `<li class="${t.completed ? 'done' : ''}">  
            ${t.text}  
            <button class="delete-btn">X</button>  
        </li>`
    );
    
    // Inserta el HTML generado en la lista de tareas
    // Une el array de strings en uno solo
    todoList.innerHTML = todosTemplate.join(''); 

    // Añade evento a cada tarea para marcarla como completada o no
    const elementos = document.querySelectorAll('#todo-list li');
    elementos.forEach((elemento, i) => {
        elemento.addEventListener('click', () => {
            // Cambia el estado de completado de la tarea
            todos[i].completed = !todos[i].completed; 
            actualizaTodos(todos); // Actualiza el localStorage
            render(); // Renderiza la lista nuevamente
        });
    });
    
    // Añade eventos a los botones de eliminar
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button, i) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que la tarea se marque como completada al eliminar
            todos.splice(i, 1); // Elimina la tarea del array
            actualizaTodos(todos); // Actualiza el localStorage
            render(); // Renderiza la lista nuevamente
        });
    });
}

// Función para actualizar el localStorage con la lista de tareas
const actualizaTodos = (todos) => {
    const todosStrings = JSON.stringify(todos); // Convierte el array de tareas a un string
    localStorage.setItem('todos', todosStrings); // Guarda el string en localStorage
}

// Al cargar la ventana
window.onload = () => {
    render(); // Renderiza la lista de tareas
    const form = document.getElementById('todo-form'); // Obtiene el formulario
    form.onsubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        const todo = document.getElementById('todo'); // Obtiene el input de la tarea
        const todoText = todo.value.trim(); // Elimina los espacios en blanco al principio y al final

        // Validación: Mostrar un mensaje si el campo está vacío
        if (todoText === '') {
            alert("Por favor, ingresa una tarea"); // Muestra un alerta si está vacío
            return; // Detiene la ejecución si el campo está vacío
        }

        // Si el campo no está vacío, agrega la tarea
        todo.value = ''; // Limpia el input
        // Guarda la tarea con su estado inicial
        todos.push({ text: todoText, completed: false }); 
        actualizaTodos(todos); // Actualiza el localStorage
        render(); // Renderiza la lista nuevamente
    }
}
