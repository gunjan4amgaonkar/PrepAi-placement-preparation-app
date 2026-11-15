export const languages = [
  "Python", "Java", "C", "C++", "JavaScript",
  "C#", "Go", "PHP", "Ruby", "Swift",
  "Kotlin", "TypeScript", "Rust", "SQL"
];

export const mcqs = [
  {
    question: "Which data structure follows FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: 1,
    topic: "Data Structures"
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    answer: 2,
    topic: "Algorithms"
  },
  {
    question: "Which keyword is commonly used to define a function in Python?",
    options: ["func", "function", "def", "method"],
    answer: 2,
    topic: "Programming Basics"
  },
  {
    question: "Which structure stores key-value pairs?",
    options: ["Queue", "Dictionary / Map", "Stack", "Array only"],
    answer: 1,
    topic: "Data Structures"
  }
];

export const problems = [
  {
    id: 1,
    title: "Sum of Two Numbers",
    difficulty: "Easy",
    description:
      "Read two integers and print their sum.",
    example: "Input: 4 6\nOutput: 10",
    starter: {
      Python: "a, b = map(int, input().split())\n# Print their sum",
      Java: "import java.util.*;\nclass Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    // Write your solution\n  }\n}",
      C: "#include <stdio.h>\nint main() {\n    // Write your solution\n    return 0;\n}",
      "C++": "#include <iostream>\nusing namespace std;\nint main() {\n    // Write your solution\n    return 0;\n}",
      JavaScript: "const fs = require('fs');\nconst [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\n// Print their sum"
    }
  },
  {
    id: 2,
    title: "Even or Odd",
    difficulty: "Easy",
    description:
      "Read an integer and print Even if it is divisible by 2, otherwise print Odd.",
    example: "Input: 7\nOutput: Odd",
    starter: {
      Python: "n = int(input())\n# Check whether n is even or odd",
      Java: "import java.util.*;\nclass Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    // Write your solution\n  }\n}",
      C: "#include <stdio.h>\nint main() {\n    // Write your solution\n    return 0;\n}",
      "C++": "#include <iostream>\nusing namespace std;\nint main() {\n    // Write your solution\n    return 0;\n}",
      JavaScript: "const fs = require('fs');\nconst n = Number(fs.readFileSync(0, 'utf8').trim());\n// Check whether n is even or odd"
    }
  },
  {
    id: 3,
    title: "Reverse a String",
    difficulty: "Medium",
    description:
      "Read a string and print its characters in reverse order.",
    example: "Input: hello\nOutput: olleh",
    starter: {
      Python: "s = input()\n# Reverse and print the string",
      Java: "import java.util.*;\nclass Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    // Write your solution\n  }\n}",
      C: "#include <stdio.h>\nint main() {\n    // Write your solution\n    return 0;\n}",
      "C++": "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    // Write your solution\n    return 0;\n}",
      JavaScript: "const fs = require('fs');\nconst s = fs.readFileSync(0, 'utf8').trim();\n// Reverse and print the string"
    }
  }
];

export const problemCount = problems.length;

export const initialCode = (problem, language) =>
  problem.starter[language] ||
  `// ${language}\n// ${problem.title}\n// Write your solution here`;
