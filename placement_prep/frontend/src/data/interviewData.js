// Technical interview flashcards and HR interview guidance.

export const techSubjects = [
  "Operating Systems",
  "DBMS & SQL",
  "OOP",
  "Computer Networks",
  "Data Structures & Algorithms",
  "Web & APIs",
];

// [subject, question, model answer]
const techRaw = [
  ["Operating Systems", "What is the difference between a process and a thread?", "A process is a program in execution with its own memory space. A thread is a lightweight unit of execution inside a process; threads of the same process share code, data and heap but have their own stack and registers. Threads are cheaper to create and switch, but sharing memory needs synchronisation."],
  ["Operating Systems", "What is a deadlock and how can it be prevented?", "A deadlock is when processes wait for each other forever. It needs four conditions: mutual exclusion, hold and wait, no preemption and circular wait. Preventing any one of them avoids deadlock, for example ordering resource requests to break circular wait, or requesting all resources at once to avoid hold and wait."],
  ["Operating Systems", "Explain paging and segmentation.", "Paging splits memory into fixed-size pages and frames, which removes external fragmentation but can waste space inside the last page (internal fragmentation). Segmentation splits memory into variable-size logical units like code, stack and data, matching how programmers think, but it can cause external fragmentation."],
  ["Operating Systems", "What is the difference between a mutex and a semaphore?", "A mutex is a lock owned by one thread at a time to protect a critical section. A semaphore is a counter that allows up to N threads to access a resource and can be signalled by a different thread. A binary semaphore looks like a mutex but has no ownership."],
  ["Operating Systems", "What is virtual memory?", "Virtual memory lets a process use more address space than physical RAM by keeping parts of it on disk and loading pages on demand. It gives each process an isolated address space and allows more programs to run, at the cost of page faults and possible thrashing."],
  ["Operating Systems", "What happens during a context switch?", "The OS saves the state of the running process (registers, program counter, stack pointer) in its process control block, then loads the saved state of the next process. It is pure overhead, so frequent switching reduces throughput."],

  ["DBMS & SQL", "What are ACID properties?", "Atomicity: a transaction fully happens or not at all. Consistency: it moves the database from one valid state to another. Isolation: concurrent transactions do not see each other's partial work. Durability: committed data survives crashes."],
  ["DBMS & SQL", "What is normalisation and why is it used?", "Normalisation organises tables to reduce redundancy and update anomalies. 1NF removes repeating groups, 2NF removes partial dependencies, 3NF removes transitive dependencies, and BCNF tightens 3NF. Sometimes tables are denormalised on purpose for read speed."],
  ["DBMS & SQL", "What is the difference between a primary key and a foreign key?", "A primary key uniquely identifies each row in its own table and cannot be NULL. A foreign key is a column that refers to the primary key of another table to enforce a relationship and referential integrity."],
  ["DBMS & SQL", "Explain INNER JOIN and LEFT JOIN with an example.", "INNER JOIN returns only rows with matches in both tables, for example students who have enrolled in a course. LEFT JOIN returns all rows from the left table plus matches from the right, so students with no enrolment still appear with NULL course columns."],
  ["DBMS & SQL", "What is an index and what is its trade-off?", "An index is a data structure (often a B-tree) that speeds up lookups on a column so the database avoids scanning the whole table. The trade-off is extra storage and slower inserts, updates and deletes because the index must be maintained."],
  ["DBMS & SQL", "SQL vs NoSQL: when would you choose each?", "Choose SQL when data is structured, relationships matter and you need strong consistency and transactions. Choose NoSQL when the schema changes often, data is large and loosely structured, or you need horizontal scaling, for example documents or key-value data."],

  ["OOP", "What are the four pillars of OOP?", "Encapsulation (bundle data and methods, hide internals), abstraction (expose only essential behaviour), inheritance (reuse and extend a parent class) and polymorphism (one interface, many behaviours)."],
  ["OOP", "What is the difference between overloading and overriding?", "Overloading is several methods with the same name but different parameters in the same class, resolved at compile time. Overriding is a subclass providing its own version of a parent method with the same signature, resolved at runtime."],
  ["OOP", "Abstract class vs interface?", "An abstract class can hold state and partial implementation and is meant for related classes with shared code. An interface defines a contract that unrelated classes can implement, and a class can implement many interfaces."],
  ["OOP", "What is a constructor?", "A constructor is a special method called when an object is created to initialise its fields. It has the class name (in Java and C++) or __init__ (in Python), and can be overloaded with different parameters."],
  ["OOP", "What does the static keyword mean?", "A static member belongs to the class rather than to any one object, so all instances share it and it can be used without creating an object. Static methods cannot directly use instance fields."],
  ["OOP", "Explain polymorphism with an example.", "A Shape base class has area(). Circle and Rectangle override it. A list of Shape objects can call area() on each, and the correct version runs for each object. One interface, different behaviour."],

  ["Computer Networks", "What is the difference between the OSI and TCP/IP models?", "OSI has seven layers (physical, data link, network, transport, session, presentation, application) and is a reference model. TCP/IP has four layers (link, internet, transport, application) and is what the internet actually uses."],
  ["Computer Networks", "TCP vs UDP?", "TCP is connection-oriented, reliable and ordered, using handshakes, acknowledgements and retransmission, so it suits web pages and file transfer. UDP is connectionless and faster with no guarantees, so it suits streaming, gaming and DNS."],
  ["Computer Networks", "What happens when you type a URL into a browser?", "The browser checks its cache, DNS resolves the domain to an IP, a TCP connection is opened (and TLS for HTTPS), the browser sends an HTTP request, the server responds with HTML, and the browser renders it while fetching CSS, JavaScript and images."],
  ["Computer Networks", "HTTP vs HTTPS?", "HTTPS is HTTP over TLS. It encrypts traffic, verifies the server with a certificate and protects data from tampering and eavesdropping. HTTP sends everything in plain text."],
  ["Computer Networks", "What is DNS?", "The Domain Name System translates human-friendly names like example.com into IP addresses. It is a distributed hierarchy of resolvers, root, TLD and authoritative servers, with caching to reduce lookups."],
  ["Computer Networks", "IP address vs MAC address?", "An IP address is a logical address assigned to a device on a network and can change with location. A MAC address is a hardware address burned into the network card and is used for delivery within a local network."],

  ["Data Structures & Algorithms", "Array vs linked list?", "Arrays have O(1) index access and good cache locality but fixed size and costly inserts in the middle. Linked lists grow easily and insert or delete in O(1) once you have the node, but access is O(n) and each node needs extra pointer memory."],
  ["Data Structures & Algorithms", "Stack vs queue?", "A stack is last-in first-out (undo, function calls, expression evaluation). A queue is first-in first-out (task scheduling, BFS, buffering)."],
  ["Data Structures & Algorithms", "How does a hash table handle collisions?", "Two common ways: chaining, where each bucket holds a list of entries, and open addressing, where you probe for the next free slot. A good hash function and a controlled load factor keep average lookups O(1)."],
  ["Data Structures & Algorithms", "BFS vs DFS?", "BFS explores level by level using a queue and finds shortest paths in unweighted graphs. DFS goes as deep as possible first using recursion or a stack and suits cycle detection, topological sort and exploring all paths."],
  ["Data Structures & Algorithms", "What is dynamic programming?", "Dynamic programming solves problems with overlapping subproblems and optimal substructure by storing the results of subproblems (memoisation or tabulation) so each is computed once. Examples: Fibonacci, knapsack, longest common subsequence."],
  ["Data Structures & Algorithms", "What is Big-O notation?", "Big-O describes how running time or memory grows with input size in the worst case, ignoring constants. Common classes from fast to slow: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)."],

  ["Web & APIs", "What is a REST API?", "REST is an architectural style where resources are identified by URLs and manipulated with standard HTTP methods (GET, POST, PUT, PATCH, DELETE). It is stateless, so every request carries what the server needs, and usually returns JSON."],
  ["Web & APIs", "GET vs POST?", "GET retrieves data, is idempotent and puts parameters in the URL, so it can be cached and bookmarked. POST sends data in the body to create or process something and is not idempotent."],
  ["Web & APIs", "Cookies vs localStorage vs sessionStorage?", "Cookies are sent with every request to the server and can be expired or marked HttpOnly and Secure. localStorage persists in the browser until cleared. sessionStorage lasts only for the tab session. localStorage and sessionStorage are not sent to the server automatically."],
  ["Web & APIs", "Authentication vs authorisation?", "Authentication proves who you are (login, tokens). Authorisation decides what you are allowed to do (roles, permissions). You authenticate first, then authorise each action."],
  ["Web & APIs", "What is CORS?", "Cross-Origin Resource Sharing is a browser rule that blocks a web page from calling a different origin unless that server allows it through response headers such as Access-Control-Allow-Origin."],
  ["Web & APIs", "What is the difference between synchronous and asynchronous code?", "Synchronous code runs line by line and blocks until each step finishes. Asynchronous code starts a task (like a network call) and continues, handling the result later with callbacks, promises or async/await so the app stays responsive."],
];

export const techQuestions = techRaw.map(([subject, q, a], i) => ({ id: `t${i + 1}`, subject, q, a }));

// HR questions: how to approach them, a structure to follow and what to avoid.
export const hrQuestions = [
  { id: "h1", q: "Tell me about yourself.", tip: "Give a 60 to 90 second story: present (course and strengths), past (key projects or experiences), future (why this role).", structure: "Present → Past → Future", avoid: "Reading your resume line by line or sharing personal life details." },
  { id: "h2", q: "What are your strengths?", tip: "Pick 2 strengths relevant to the role and back each with a short real example.", structure: "Strength → Example → Result", avoid: "Generic words like hardworking with no proof." },
  { id: "h3", q: "What is your biggest weakness?", tip: "Choose a real but non-critical weakness and show what you are doing to improve it.", structure: "Weakness → Action taken → Progress", avoid: "Fake weaknesses like \"I work too hard\" or something that disqualifies you." },
  { id: "h4", q: "Why do you want to join our company?", tip: "Research the company: products, values, recent news. Link them to your skills and goals.", structure: "What you admire → How you fit → What you will contribute", avoid: "Answers about salary or brand name only." },
  { id: "h5", q: "Where do you see yourself in five years?", tip: "Show ambition that is tied to learning and growing within the role.", structure: "Skills to build → Responsibility you want → Value to the company", avoid: "Saying you plan to leave or giving no plan." },
  { id: "h6", q: "Why should we hire you?", tip: "Summarise your best matching skills and one proof point. Be confident, not arrogant.", structure: "Skill match → Evidence → Attitude to learn", avoid: "Comparing yourself negatively with other candidates." },
  { id: "h7", q: "Describe a challenge you faced and how you handled it.", tip: "Use the STAR method with a real project or academic situation.", structure: "Situation → Task → Action → Result", avoid: "Blaming teammates or choosing a story with no result." },
  { id: "h8", q: "Tell me about a time you had a conflict in a team.", tip: "Show that you listened, stayed calm and focused on the goal.", structure: "Context → What you did to resolve → Outcome and lesson", avoid: "Making the other person the villain." },
  { id: "h9", q: "Tell me about a time you showed leadership.", tip: "Leadership can be small: organising an event, guiding juniors, owning a project part.", structure: "Situation → Your initiative → Result", avoid: "Only saying \"I was the team leader\" without actions." },
  { id: "h10", q: "How do you handle pressure and tight deadlines?", tip: "Describe how you prioritise, break work into steps and communicate early.", structure: "Approach → Example → Result", avoid: "Saying you never feel pressure." },
  { id: "h11", q: "Are you willing to relocate or work in shifts?", tip: "Be honest. If you are flexible, say so positively; if not, explain calmly.", structure: "Honest answer → Reason → Flexibility", avoid: "Saying yes to everything and regretting it later." },
  { id: "h12", q: "Explain your final-year project.", tip: "Cover the problem, your role, the tech stack, one difficulty and the outcome in 2 minutes.", structure: "Problem → Solution → Your role and tech → Result", avoid: "Taking credit for work you did not do, or going too technical too soon." },
  { id: "h13", q: "I see a gap or low marks in your academics. Can you explain?", tip: "Give a short, honest reason, then show what you did to recover or learn.", structure: "Reason → What you learned → Improvement since", avoid: "Excuses or blaming others." },
  { id: "h14", q: "What are your hobbies and interests?", tip: "Pick hobbies that show useful traits, like teamwork, creativity or discipline.", structure: "Hobby → What it taught you", avoid: "Hobbies you cannot talk about for 30 seconds." },
  { id: "h15", q: "What are your salary expectations?", tip: "For freshers, say you are flexible and expect a fair package as per company norms and your skills.", structure: "Flexible → Fair as per company standards → Focus on learning", avoid: "Naming a very high number or refusing to answer." },
  { id: "h16", q: "Do you have any questions for us?", tip: "Always ask 2 thoughtful questions about the team, training or expectations in the first six months.", structure: "Role clarity → Growth → Culture", avoid: "Saying \"no questions\" or asking only about leave and salary." },
];
