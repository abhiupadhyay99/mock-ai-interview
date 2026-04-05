export const fallbackQuestions = {
    "Java Fullstack": [
        // previous 5
        { question: "Which component is responsible for executing Java Bytecode?", options: ["Java Compiler", "Java Virtual Machine (JVM)", "Java Runtime Environment (JRE)", "Java Development Kit (JDK)"], answer: "Java Virtual Machine (JVM)" },
        { question: "Which annotation is used to mark a class as a Spring Bean?", options: ["@Bean", "@Entity", "@Component", "@RestController"], answer: "@Component" },
        { question: "How does React primarily boost UI rendering performance?", options: ["Two-way Data Binding", "Real DOM Manipulation", "Virtual DOM Diffing", "Ajax Polling"], answer: "Virtual DOM Diffing" },
        { question: "What is the computational time complexity for searching in a balanced Binary Search Tree?", options: ["O(1)", "O(n)", "O(n log n)", "O(log n)"], answer: "O(log n)" },
        { question: "What does Dependency Injection solve in Spring Boot?", options: ["Memory Leaks", "Tight Coupling", "Database Latency", "Callback Hell"], answer: "Tight Coupling" },
        // 10 new
        { question: "What is the default scope of a Spring Bean?", options: ["Prototype", "Request", "Session", "Singleton"], answer: "Singleton" },
        { question: "Which statement best describes the Volatile keyword in Java?", options: ["Prevents variable modification", "Forces thread caching", "Guarantees cross-thread visibility", "Synchronizes the entire object"], answer: "Guarantees cross-thread visibility" },
        { question: "What lifecycle hook replaces componentDidMount in functional React components?", options: ["useMount", "useEffect", "useState", "componentDidUpdate"], answer: "useEffect" },
        { question: "How do you pass data from a child component to a parent component in React?", options: ["Using Context API", "Passing a callback function as a prop", "Using Redux only", "You cannot"], answer: "Passing a callback function as a prop" },
        { question: "Which collection class implements a FIFO (First-In-First-Out) queue in Java?", options: ["Stack", "LinkedList", "HashSet", "ArrayList"], answer: "LinkedList" },
        { question: "What is the main goal of the Hibernate ORM framework?", options: ["To speed up JVM performance", "To map Java objects to database tables natively", "To create a REST API", "To mock HTTP endpoints"], answer: "To map Java objects to database tables natively" },
        { question: "Which statement about Java Streams is true?", options: ["They change the underlying collection", "They process data sequentially or in parallel without mutation", "They replace the Scanner class", "They cannot be chained"], answer: "They process data sequentially or in parallel without mutation" },
        { question: "What HTTP method should strictly be used to partially update an existing resource?", options: ["PUT", "POST", "PATCH", "DELETE"], answer: "PATCH" },
        { question: "In modern React, what is the purpose of useMemo?", options: ["To memoize a callback function", "To fetch data from an API", "To cache an expensive computation result", "To update global state"], answer: "To cache an expensive computation result" },
        { question: "Which Java design pattern provides a single instance of a class throughout the application?", options: ["Factory", "Observer", "Singleton", "Decorator"], answer: "Singleton" }
    ],
    "Python Fullstack": [
        // previous 5
        { question: "What restricts Python from executing multi-threaded CPU-bound operations in parallel?", options: ["Memory Leak", "GIL (Global Interpreter Lock)", "Python Scheduler", "Garbage Collector"], answer: "GIL (Global Interpreter Lock)" },
        { question: "Which of the following is an immutable data type in Python?", options: ["List", "Dictionary", "Set", "Tuple"], answer: "Tuple" },
        { question: "What framework is historically best suited for massive, Enterprise-grade web applications in Python?", options: ["Flask", "FastAPI", "Django", "Tornado"], answer: "Django" },
        { question: "In React, what pattern solves Prop Drilling?", options: ["Hooks Context API", "State Hoisting", "High Order Components", "useEffect"], answer: "Hooks Context API" },
        { question: "What does the 'yield' keyword create in Python?", options: ["Thread", "Coroutine", "Generator", "Lambda"], answer: "Generator" },
        // 10 new
        { question: "What is a major advantage of utilizing FastAPI over Flask?", options: ["It uses traditional WSGI", "It natively enforces Pydantic types and Async execution", "It is built entirely on Django", "It has a built in ORM"], answer: "It natively enforces Pydantic types and Async execution" },
        { question: "How does Python handle memory management?", options: ["Manual malloc/free", "Reference Counting and Garbage Collection", "Strict memory pooling", "Memory is never freed"], answer: "Reference Counting and Garbage Collection" },
        { question: "Which list method adds an item to the end of a list without modifying the reference?", options: ["add()", "insert()", "append()", "push()"], answer: "append()" },
        { question: "How is 'self' used inside a Python Object Class?", options: ["As a global variable", "As a private variable", "As a reference to the current instance of the class", "As a reserved static keyword"], answer: "As a reference to the current instance of the class" },
        { question: "What is the primary difference between == and 'is' in Python?", options: ["== compares identity, 'is' compares value", "== compares value, 'is' compares identity (memory location)", "They are identical syntactically", "== is for strings only"], answer: "== compares value, 'is' compares identity (memory location)" },
        { question: "What defines a Python lambda function?", options: ["A function with multiple expressions", "A named block of reusable code", "A single-expression anonymous function", "A recursive loop constraint"], answer: "A single-expression anonymous function" },
        { question: "In Django architecture, what does MVT stand for?", options: ["Model View Template", "Model View Transaction", "Mock Virtual Type", "Main Variable Target"], answer: "Model View Template" },
        { question: "Which statement defines a Python dictionary correctly?", options: ["An ordered collection of items", "An unordered set of unique key-value bindings", "An immutable list of numbers", "A specialized tuple object"], answer: "An unordered set of unique key-value bindings" },
        { question: "What hook in React executes code in response to component mounting and state changes?", options: ["useMount", "useCallback", "useEffect", "useState"], answer: "useEffect" },
        { question: "What is the purpose of 'pip' in the Python ecosystem?", options: ["A package installer for Python libraries", "A built-in HTTP server", "A unit testing framework", "A compiled IDE integration"], answer: "A package installer for Python libraries" }
    ],
    "Default": [
        // previous 5
        { question: "Which type of database scales horizontally with the most flexibility?", options: ["PostgreSQL", "Oracle DB", "MongoDB (NoSQL)", "MySQL"], answer: "MongoDB (NoSQL)" },
        { question: "What defines a Closure in JavaScript?", options: ["An Array method", "A function remembering its lexical scope", "A CSS animation", "A Node module"], answer: "A function remembering its lexical scope" },
        { question: "What standard HTTP status code signifies 'Not Found'?", options: ["200", "404", "500", "401"], answer: "404" },
        { question: "What is the primary stateless authentication mechanism used in modern web APIs?", options: ["Session Cookies", "OAuth 1.0", "JWT (JSON Web Tokens)", "Basic Auth"], answer: "JWT (JSON Web Tokens)" },
        { question: "Which architecture deploys isolated, containerized services independently?", options: ["Monolith", "Microservices", "MVC", "Serverless"], answer: "Microservices" },
        // 10 new
        { question: "Explain the concept of Event Bubbling in the DOM.", options: ["Events firing from window down to target", "Events firing from target upwards to the window", "Events cancelling each other", "Events pausing execution entirely"], answer: "Events firing from target upwards to the window" },
        { question: "What does CORS stand for in Web Development?", options: ["Cross-Origin Resource Sharing", "Central Overload Response System", "Cascade Of Render Strategies", "Critical Object Relational State"], answer: "Cross-Origin Resource Sharing" },
        { question: "What principle ensures code modules should be open for extension but closed for modification?", options: ["Single Responsibility", "Open-Closed Principle", "Liskov Substitution", "Dependency Inversion"], answer: "Open-Closed Principle" },
        { question: "In REST, what defines Idempotency?", options: ["Multiple identical requests yield the same outcome", "Requests are strictly cached", "Requests take priority over headers", "All requests encrypt inherently"], answer: "Multiple identical requests yield the same outcome" },
        { question: "Which protocol forms the backbone of secure internet data transmission?", options: ["HTTP", "TCP", "HTTPS", "FTP"], answer: "HTTPS" },
        { question: "What differentiates a Stack from a Queue?", options: ["Stack is LIFO, Queue is FIFO", "Stack is FIFO, Queue is LIFO", "They are identical syntactically", "Stack is static, Queue is dynamic"], answer: "Stack is LIFO, Queue is FIFO" },
        { question: "What algorithm sorts elements by repeatedly swapping adjacent elements that are in the wrong order?", options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"], answer: "Bubble Sort" },
        { question: "What layer sits between the Frontend UI and Backend Database in modern web apps?", options: ["The ORM Controller", "The REST API Application Server", "The Load Balancer", "The DNS Registry"], answer: "The REST API Application Server" },
        { question: "Which structural design pattern utilizes a one-to-many dependency so child objects update when a state changes?", options: ["Factory", "Observer", "Singleton", "Adapter"], answer: "Observer" },
        { question: "What does the 'npm' acronym strictly resolve to fundamentally?", options: ["Node Package Manager", "New Process Module", "Next Programming Method", "Notice Parameter Mapping"], answer: "Node Package Manager" }
    ]
};
