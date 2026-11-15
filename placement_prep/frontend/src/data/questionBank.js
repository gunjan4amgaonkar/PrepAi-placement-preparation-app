// Built-in multiple-choice banks used by Mock Tests.
// Each entry is written as [question, correct answer, [three wrong answers], explanation].
// The correct option is placed at a rotating position so answers are not always "B".

function build(section, topic, rows, prefix) {
  return rows.map(([question, correct, wrong, explanation], i) => {
    const pos = i % 4;
    const options = [...wrong];
    options.splice(pos, 0, correct);
    return { id: `${prefix}${i + 1}`, section, topic, question, options, answer: pos, explanation };
  });
}

export const aptitudeBank = build("Aptitude", "Quantitative", [
  ["What is 15% of 240?", "36", ["30", "40", "32"], "15% of 240 = 0.15 × 240 = 36."],
  ["A 120 m long train passes a pole in 6 seconds. What is its speed in km/h?", "72 km/h", ["60 km/h", "80 km/h", "90 km/h"], "Speed = 120/6 = 20 m/s. Multiply by 18/5 to get 72 km/h."],
  ["Find the simple interest on ₹5000 at 8% per year for 3 years.", "₹1200", ["₹1000", "₹1400", "₹1600"], "SI = P × R × T / 100 = 5000 × 8 × 3 / 100 = 1200."],
  ["A can finish a job in 12 days and B in 24 days. Working together, how many days will they take?", "8 days", ["6 days", "9 days", "10 days"], "Combined rate = 1/12 + 1/24 = 3/24 = 1/8, so 8 days."],
  ["Two numbers are in the ratio 3 : 5 and their sum is 64. What is the larger number?", "40", ["24", "32", "45"], "Each part = 64 / 8 = 8. Larger number = 5 × 8 = 40."],
  ["What is the average of the first five prime numbers?", "5.6", ["5.2", "6", "6.2"], "2 + 3 + 5 + 7 + 11 = 28, and 28 / 5 = 5.6."],
  ["A price is increased by 20% and then decreased by 20%. What is the net change?", "4% decrease", ["No change", "4% increase", "2% decrease"], "1.2 × 0.8 = 0.96, so the price is 4% lower."],
  ["A boat moves at 10 km/h in still water and the stream flows at 2 km/h. How long does it take to go 24 km downstream?", "2 hours", ["1.5 hours", "2.4 hours", "3 hours"], "Downstream speed = 12 km/h, so time = 24 / 12 = 2 hours."],
  ["In how many ways can the letters of the word CAT be arranged?", "6", ["3", "9", "12"], "3 distinct letters give 3! = 6 arrangements."],
  ["Two dice are rolled. What is the probability that the sum is 7?", "1/6", ["1/12", "1/9", "5/36"], "There are 6 favourable outcomes out of 36, which is 1/6."],
  ["What is the LCM of 12 and 18?", "36", ["24", "54", "72"], "12 = 2² × 3 and 18 = 2 × 3². LCM = 2² × 3² = 36."],
  ["What is the compound interest on ₹1000 at 10% per year for 2 years?", "₹210", ["₹200", "₹220", "₹121"], "Amount = 1000 × 1.1² = 1210, so CI = 210."],
  ["An item is bought for ₹800 and sold for ₹1000. What is the profit percentage?", "25%", ["20%", "30%", "15%"], "Profit = 200, and 200 / 800 × 100 = 25%."],
  ["What is the square root of 2025?", "45", ["35", "55", "65"], "45 × 45 = 2025."],
  ["What is the sum of the first 20 natural numbers?", "210", ["200", "220", "190"], "n(n+1)/2 = 20 × 21 / 2 = 210."],
  ["In a class of 40 students, 60% passed. How many students failed?", "16", ["14", "18", "24"], "60% of 40 = 24 passed, so 40 − 24 = 16 failed."],
  ["A car travels at 60 km/h for 2.5 hours. How far does it go?", "150 km", ["120 km", "135 km", "160 km"], "Distance = speed × time = 60 × 2.5 = 150 km."],
  ["A student scores 450 out of 600. What is the percentage?", "75%", ["70%", "72%", "80%"], "450 / 600 × 100 = 75%."],
], "apt-q").concat(
  build("Aptitude", "Logical Reasoning", [
    ["Find the next number: 2, 6, 12, 20, 30, ?", "42", ["40", "44", "36"], "The differences are 4, 6, 8, 10, so the next difference is 12 and 30 + 12 = 42."],
    ["Which one is the odd one out: Apple, Banana, Carrot, Mango?", "Carrot", ["Apple", "Banana", "Mango"], "Carrot is a vegetable; the others are fruits."],
    ["If CODE is written as DPEF (each letter moved one step forward), how is WORK written?", "XPSL", ["XPRL", "VPQJ", "XOSL"], "W→X, O→P, R→S, K→L, giving XPSL."],
    ["Pointing to a man, a woman says, \"He is the son of my mother's only son.\" How is the man related to the woman?", "Nephew", ["Son", "Brother", "Cousin"], "Her mother's only son is her brother, so the man is her brother's son: her nephew."],
    ["A is taller than B, B is taller than C, and D is shorter than C. Who is the shortest?", "D", ["A", "B", "C"], "The order is A > B > C > D, so D is shortest."],
    ["What is the angle between the hour and minute hands at exactly 3:00?", "90°", ["60°", "75°", "120°"], "At 3:00 the hands are 3 hours apart, and each hour is 30°, so 90°."],
    ["Rahul walks 5 km north, turns right and walks 3 km, then turns right again and walks 5 km. How far is he from the start?", "3 km", ["5 km", "8 km", "13 km"], "He ends up 3 km east of the starting point."],
    ["If A = 1, B = 2, C = 3 and so on, what is the value of BAD?", "7", ["6", "8", "9"], "B + A + D = 2 + 1 + 4 = 7."],
    ["All cats are animals. All animals are living things. Which conclusion definitely follows?", "All cats are living things", ["All living things are cats", "Some animals are not living", "No cat is an animal"], "By chaining the two statements, every cat is a living thing."],
    ["Find the next number: 1, 4, 9, 16, 25, ?", "36", ["30", "35", "49"], "These are perfect squares: 1², 2², 3², 4², 5², so the next is 6² = 36."],
  ], "apt-l")
).concat(
  build("Aptitude", "Verbal Ability", [
    ["Choose the synonym of ABUNDANT.", "Plentiful", ["Scarce", "Rare", "Limited"], "Abundant means existing in large quantities, the same as plentiful."],
    ["Choose the antonym of EXPAND.", "Contract", ["Grow", "Extend", "Enlarge"], "Expand means to get bigger; its opposite is contract."],
    ["Fill in the blank: She has been working here ___ 2019.", "since", ["for", "from", "during"], "We use \"since\" with a starting point in time."],
    ["Choose the correct spelling.", "Accommodation", ["Acommodation", "Accomodation", "Acomodation"], "The correct spelling has double c and double m."],
    ["What does the idiom \"break the ice\" mean?", "Start a conversation and ease tension", ["Break something frozen", "End a friendship", "Make a risky decision"], "It means to make people feel comfortable at the start of a social situation."],
    ["Choose the grammatically correct sentence.", "Each of the students has submitted the form.", ["Each of the students have submitted the form.", "Each of the student have submitted the form.", "Each of the students are submitting the form."], "\"Each\" is singular, so it takes \"has\"."],
    ["Choose one word for: a person who speaks many languages.", "Polyglot", ["Linguist only", "Orator", "Pedant"], "A polyglot is someone who knows several languages."],
  ], "apt-v")
);

export const technicalBank = build("Technical", "Operating Systems", [
  ["Which CPU scheduling algorithm can cause starvation?", "Priority scheduling", ["Round robin", "First come first served", "Multilevel queue with equal time"], "Low-priority processes may wait forever if higher-priority ones keep arriving."],
  ["Which of these is NOT a necessary condition for deadlock?", "Preemption of resources", ["Mutual exclusion", "Hold and wait", "Circular wait"], "Deadlock needs mutual exclusion, hold and wait, no preemption, and circular wait."],
  ["External fragmentation is associated with:", "Contiguous memory allocation", ["Paging", "Cache memory", "Register allocation"], "Free memory gets split into small non-adjacent holes in contiguous allocation."],
  ["A process in the ready state is waiting for:", "The CPU", ["User input", "A disk read to finish", "A child process to exit"], "Ready processes have everything they need except CPU time."],
  ["Thrashing occurs when:", "The system spends more time paging than executing", ["The CPU is idle", "Disk space is full", "Too few processes are running"], "Too many page faults keep the system busy swapping pages."],
], "tec-os").concat(
  build("Technical", "DBMS & SQL", [
    ["Which normal form removes partial dependency?", "2NF", ["1NF", "3NF", "BCNF only"], "Second normal form removes partial dependency on part of a composite key."],
    ["Which SQL command quickly removes all rows from a table without logging each row deletion?", "TRUNCATE", ["DELETE", "DROP", "REMOVE"], "TRUNCATE empties a table efficiently; DROP removes the table itself."],
    ["Which key uniquely identifies each row and cannot be NULL?", "Primary key", ["Foreign key", "Candidate key only", "Composite key only"], "A primary key is unique and not null."],
    ["In ACID, the letter I stands for:", "Isolation", ["Integrity", "Indexing", "Inheritance"], "Isolation means concurrent transactions do not interfere with each other."],
    ["Which JOIN returns all rows from the left table and matching rows from the right table?", "LEFT JOIN", ["INNER JOIN", "RIGHT JOIN", "CROSS JOIN"], "LEFT JOIN keeps every left-table row; unmatched right columns become NULL."],
    ["Which of these is a DDL command?", "CREATE", ["INSERT", "UPDATE", "SELECT"], "DDL defines structure (CREATE, ALTER, DROP); the others are DML or query commands."],
  ], "tec-db")
).concat(
  build("Technical", "OOP", [
    ["Wrapping data and methods together and restricting direct access to the data is called:", "Encapsulation", ["Inheritance", "Polymorphism", "Compilation"], "Encapsulation bundles data with methods and hides internal state."],
    ["Method overriding is an example of:", "Runtime polymorphism", ["Compile-time polymorphism", "Encapsulation", "Data hiding"], "The method that runs is chosen at runtime based on the object's actual type."],
    ["Which concept lets a class acquire properties of another class?", "Inheritance", ["Abstraction", "Overloading", "Serialization"], "A subclass inherits fields and methods from its parent class."],
    ["In Java, a class can:", "Implement multiple interfaces", ["Extend multiple classes", "Extend only interfaces", "Do neither"], "Java allows single class inheritance but multiple interface implementation."],
  ], "tec-oop")
).concat(
  build("Technical", "Computer Networks", [
    ["Which OSI layer is responsible for routing?", "Network layer", ["Transport layer", "Data link layer", "Session layer"], "The network layer (IP) chooses paths between networks."],
    ["Which protocol is connectionless?", "UDP", ["TCP", "FTP", "SMTP"], "UDP sends datagrams without setting up a connection."],
    ["What is the default port for HTTPS?", "443", ["80", "21", "8080"], "HTTPS uses TCP port 443 by default."],
    ["What does DNS do?", "Translates domain names to IP addresses", ["Encrypts web traffic", "Assigns MAC addresses", "Routes packets"], "DNS maps human-readable names to IP addresses."],
    ["Which device mainly works at the data link layer (Layer 2)?", "Switch", ["Router", "Repeater only", "Firewall only"], "Switches forward frames using MAC addresses."],
  ], "tec-cn")
).concat(
  build("Technical", "Data Structures & Algorithms", [
    ["What is the time complexity of accessing an array element by index?", "O(1)", ["O(n)", "O(log n)", "O(n²)"], "Array indexing is direct address arithmetic."],
    ["Which tree traversal of a binary search tree gives sorted order?", "Inorder", ["Preorder", "Postorder", "Level order"], "Inorder visits left, node, right, which yields ascending order for a BST."],
    ["What is the worst-case time complexity of quicksort?", "O(n²)", ["O(n log n)", "O(n)", "O(log n)"], "A bad pivot choice leads to quadratic behaviour."],
    ["Which data structure does BFS use?", "Queue", ["Stack", "Heap", "Hash table"], "BFS processes nodes level by level using a queue."],
    ["Which data structure is typically used to evaluate postfix expressions?", "Stack", ["Queue", "Graph", "Heap"], "Operands are pushed, and operators pop them and push results."],
    ["What is the average-case search time in a hash table?", "O(1)", ["O(n)", "O(log n)", "O(n log n)"], "A good hash function spreads keys so lookups are constant time on average."],
  ], "tec-dsa")
).concat(
  build("Technical", "Web & Programming", [
    ["Which HTTP status code means \"Not Found\"?", "404", ["200", "301", "500"], "404 means the requested resource could not be found."],
    ["Which HTTP method is meant for retrieving data and is idempotent?", "GET", ["POST", "PATCH", "CONNECT"], "GET reads data and repeating it does not change the server state."],
    ["Which JavaScript keyword declares a block-scoped variable?", "let", ["var", "def", "dim"], "let (and const) are block scoped; var is function scoped."],
    ["What does JSON stand for?", "JavaScript Object Notation", ["Java Standard Object Naming", "JavaScript Online Network", "Joint Source Object Name"], "JSON is a lightweight text format for structured data."],
  ], "tec-web")
);
