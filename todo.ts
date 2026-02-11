import readline from "readline"

// Store Todo in an array.
type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = []

// Create Readline interface (Readline is a Node Module)
const rl = readline.createInterface({
    input: process.stdin, // Listens to what we type
    output: process.stdout, // Shows messages on the screen
});


// Create a new Todo
const addTodo = () => {
    rl.question("Enter Todo: ", (text:string) => {
        if(text.trim() === "") {
            console.log("You cannot enter an empty todo.\n")
        } else {
            const newTodo: Todo = {
                id: Date.now(),
                text: text.trim(),
            };
            todos.push(newTodo);
            console.log("Yay! Todo is added successfully.")
        };
        showMenu();
    });
};

// Read all Todos
const readTodos = (): void => {
    console.log(`You have ${todos.length} todo(s):\n`); // ASSIGNMENT: Counts the number of todos
    if(todos.length === 0) {
        console.log("Your Todo-List is currently empty.")
    } else {
        todos.forEach((todo: Todo) => {
            console.log(`${todo.id} - ${todo.text}`);
        })
    }    
    process.stdout.write(">")
    rl.question("", (command: string) => {
        handleCommand(command);
    })
}

// Delete a todo
const deleteTodo = () => {
    rl.question("Which entry do you like to delete? \nIf you want to delete all, type all\n> ", (input: string) => {
        if (input.trim().toLowerCase() === "all") { // ASSIGNMENT: Clear all todos
        todos = [];
        console.log("All your todos is now removed");
            } else {
            const id: number = parseInt(input);
            const updatedTodos: Todo[] = todos.filter((todo: Todo) => todo.id !== id);
            
            if (updatedTodos.length === todos.length) {
                console.log("Task not found");
            } else {
                todos = updatedTodos;
                console.log("Todo removed successfully!")
            }
        }
        process.stdout.write(">");
        rl.question("", (command: string) => {
        handleCommand(command);
        });
    });
};


const clearTodos = () => {
    todos = [];
    console.log("Your Todo-List is now cleared");

    process.stdout.write(">");
    rl.question("", (command: string) => {
    handleCommand(command);
    });
};

// Handle command logic
const handleCommand = (command: string): void => {
    switch(command.trim().toLowerCase()) {
        case "add":
            addTodo();
            break;
        case "read":
            readTodos();
            break;
        case "delete":
            deleteTodo();
            break;
        case "exit":
            console.log("See you next time!")
            rl.close();
            break;
        default: 
            console.log("Unknown command... \n")
            showMenu();
    }
};

// Show menu with handle commands
const showMenu = (): void => {
    console.clear(); // Makes sure the terminal is cleared before the app runs
    console.log("\n === Todo List App ===");
    console.log("Commands: add, read, delete, exit \n");
    process.stdout.write("> ");
    rl.question("", (command: string) => {
        handleCommand(command);
    });    
};

// Show the menu on startup
showMenu();
