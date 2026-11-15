// Study resources, FAQs and commonly asked practice problems.

export const resourceCategories = ["Coding Practice", "Core CS", "Aptitude", "Web & Tools", "Interview & Career"];

// [category, title, url, description, cost]
const resRaw = [
  ["Coding Practice", "LeetCode", "https://leetcode.com", "Large problem set sorted by topic and difficulty, plus contests.", "Free + paid"],
  ["Coding Practice", "NeetCode", "https://neetcode.io", "Curated problem lists with video explanations for common patterns.", "Free + paid"],
  ["Coding Practice", "HackerRank", "https://www.hackerrank.com", "Practice tracks and skill tests that many companies use for screening.", "Free"],
  ["Coding Practice", "CodeChef", "https://www.codechef.com", "Practice problems and regular contests, popular with Indian students.", "Free"],
  ["Coding Practice", "Codeforces", "https://codeforces.com", "Competitive programming contests and a huge archive of problems.", "Free"],
  ["Coding Practice", "Exercism", "https://exercism.org", "Language-specific exercises with mentoring to build fluency.", "Free"],
  ["Coding Practice", "VisuAlgo", "https://visualgo.net", "Animated visualisations of data structures and algorithms.", "Free"],
  ["Coding Practice", "Big-O Cheat Sheet", "https://www.bigocheatsheet.com", "Quick reference for time and space complexity.", "Free"],

  ["Core CS", "CS50 (Harvard)", "https://cs50.harvard.edu/x/", "Excellent introduction to computer science and programming.", "Free"],
  ["Core CS", "GeeksforGeeks", "https://www.geeksforgeeks.org", "Articles on DSA, OS, DBMS, networks and interview experiences.", "Free"],
  ["Core CS", "SQLBolt", "https://sqlbolt.com", "Short interactive lessons to learn SQL step by step.", "Free"],
  ["Core CS", "The Missing Semester (MIT)", "https://missing.csail.mit.edu", "Command line, Git, debugging and other tools students are rarely taught.", "Free"],
  ["Core CS", "Pro Git book", "https://git-scm.com/book", "The official free book for learning Git properly.", "Free"],
  ["Core CS", "TutorialsPoint", "https://www.tutorialspoint.com", "Beginner-friendly tutorials across many CS subjects.", "Free"],

  ["Aptitude", "IndiaBIX", "https://www.indiabix.com", "Aptitude, reasoning and verbal questions with explanations.", "Free"],
  ["Aptitude", "PrepInsta", "https://prepinsta.com", "Company-wise aptitude and coding preparation material.", "Free + paid"],
  ["Aptitude", "Khan Academy", "https://www.khanacademy.org", "Strengthen maths fundamentals: percentages, ratios, probability.", "Free"],

  ["Web & Tools", "freeCodeCamp", "https://www.freecodecamp.org", "Free full-length courses and projects for web development and more.", "Free"],
  ["Web & Tools", "MDN Web Docs", "https://developer.mozilla.org", "The reference for HTML, CSS and JavaScript.", "Free"],
  ["Web & Tools", "W3Schools", "https://www.w3schools.com", "Quick tutorials and try-it-yourself examples.", "Free"],
  ["Web & Tools", "Python Tutorial (official)", "https://docs.python.org/3/tutorial/", "The official guided tour of Python.", "Free"],
  ["Web & Tools", "The Java Tutorials (Oracle)", "https://docs.oracle.com/javase/tutorial/", "Official learning paths for Java.", "Free"],
  ["Web & Tools", "Programiz", "https://www.programiz.com", "Clear tutorials for Python, C, C++ and Java with examples.", "Free"],

  ["Interview & Career", "roadmap.sh", "https://roadmap.sh", "Visual learning roadmaps for developer roles.", "Free"],
  ["Interview & Career", "Tech Interview Handbook", "https://www.techinterviewhandbook.org", "Preparation guides for coding rounds, behavioural questions and resumes.", "Free"],
  ["Interview & Career", "Overleaf resume templates", "https://www.overleaf.com/latex/templates", "Clean LaTeX resume templates you can edit online.", "Free"],
];

export const resources = resRaw.map(([category, title, url, description, cost], i) => ({
  id: `r${i + 1}`, category, title, url, description, cost,
}));

export const faqs = [
  { q: "How should I start my placement preparation?", a: "Start with a plan: pick your target role, then split your time between aptitude, coding (DSA), core subjects, projects and communication. Use the AI Career Roadmap module to generate a week-by-week plan, and take a short mock test to find your weak areas." },
  { q: "How many hours should I study every day?", a: "Consistency matters more than long marathons. Two focused hours a day for several months beats a last-week rush. Increase to 3 to 4 hours as drives get closer." },
  { q: "Which programming language should I use for coding rounds?", a: "Use the language you are most comfortable with, usually C++, Java or Python. Make sure you know its standard library well, such as lists, maps, sorting and string handling." },
  { q: "How much DSA is enough for placements?", a: "Be solid on arrays, strings, hashing, linked lists, stacks, queues, trees, basic graphs, sorting and searching, recursion and basic dynamic programming. Solve problems by pattern rather than memorising answers." },
  { q: "What should a fresher resume contain?", a: "Keep it to one page: contact details, education, skills, two or three strong projects with your role and the technology used, internships, achievements and links to GitHub or a portfolio. Be ready to explain everything you list." },
  { q: "How do I prepare for aptitude tests?", a: "Revise the basics (percentages, ratios, time and work, speed and distance, probability), then practise timed sets. Review every wrong answer and learn shortcuts only after you understand the method." },
  { q: "How do I get better at group discussions?", a: "Practise regularly with friends, learn a simple structure, read about current topics and record yourself to review your clarity and speed. The Group Discussion module has topics, a timer and frameworks." },
  { q: "What if I have backlogs or a low CGPA?", a: "Some companies have cutoffs, but many look at skills too. Build strong projects and coding profiles, clear backlogs early, and be honest and positive when asked. Also apply to companies and off-campus roles that do not use a strict cutoff." },
  { q: "How can I improve communication skills?", a: "Speak daily in English, even to yourself, record short extempore talks, read articles aloud and practise explaining technical ideas simply. Ask friends for honest feedback." },
  { q: "Are mock tests useful?", a: "Yes. They train time management and reveal weak topics. Take a mock test, review all mistakes the same day, then retest that topic a few days later." },
  { q: "Where is my progress saved?", a: "In this prototype, your progress and any questions you add are saved in your own browser (local storage), not on a server. Clearing browser data or using another device will start fresh; use Export in the Admin Panel to keep a backup." },
  { q: "What do I do if the AI features show an error?", a: "Check that the backend is running and that your Gemini API key is set in backend/.env. The roadmap generator also has a built-in template option that works without AI." },
];

// Commonly asked coding questions, with the idea behind a good solution.
export const commonProblems = [
  { id: "c1", title: "Reverse a string", level: "Easy", topic: "Strings", idea: "Use two pointers swapping from both ends, or slicing in Python. Time O(n)." },
  { id: "c2", title: "Check if a string is a palindrome", level: "Easy", topic: "Strings", idea: "Compare characters from both ends moving inward, ignoring case and non-alphanumerics if required. Time O(n)." },
  { id: "c3", title: "Print the Fibonacci series up to n terms", level: "Easy", topic: "Math", idea: "Iterate keeping the last two values. Recursion is simple but O(2ⁿ) without memoisation." },
  { id: "c4", title: "FizzBuzz", level: "Easy", topic: "Math", idea: "Check divisibility by 15 first, then 3, then 5. Order of conditions is the trap." },
  { id: "c5", title: "Find the largest and second largest element in an array", level: "Easy", topic: "Arrays", idea: "Single pass tracking the two largest values. Time O(n), space O(1)." },
  { id: "c6", title: "Check whether a number is prime", level: "Easy", topic: "Math", idea: "Test divisors only up to √n. Time O(√n)." },
  { id: "c7", title: "Factorial of a number", level: "Easy", topic: "Math", idea: "Loop from 1 to n multiplying, or recursion with base case 0! = 1. Watch for overflow in fixed-size integers." },
  { id: "c8", title: "Two Sum", level: "Medium", topic: "Hashing", idea: "Store each number's index in a hash map and look up target − current. Time O(n)." },
  { id: "c9", title: "Remove duplicates from a sorted array", level: "Easy", topic: "Arrays", idea: "Two pointers: one reads, one writes the next unique value. Time O(n), space O(1)." },
  { id: "c10", title: "Check whether two strings are anagrams", level: "Easy", topic: "Hashing", idea: "Compare character frequency counts, or sort both strings. Frequency count is O(n)." },
  { id: "c11", title: "Find the missing number in 1..n", level: "Easy", topic: "Math", idea: "Expected sum n(n+1)/2 minus the actual sum, or use XOR. Time O(n)." },
  { id: "c12", title: "Detect a cycle in a linked list", level: "Medium", topic: "Linked List", idea: "Floyd's tortoise and hare: a slow and a fast pointer meet if there is a cycle. Space O(1)." },
];
