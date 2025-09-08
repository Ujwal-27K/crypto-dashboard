export const DEFAULT_HTML_CODE = `<html>
<head>
<title>HTML Sample</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
h1 {
color: #cca3a3;
}
</style>
<script type="text/javascript">
alert("I am a sample... visit devChallengs.io for more projects");
</script>
</head>
<body>
<h1>Heading No.1</h1>
<input disabled type="button" value="Click me" />
</body>
</html>`;
export const LANGUAGES = [
  "HTML",
  "CSS",
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "TypeScript",
];
export const THEMES = ["Dark", "Light", "Monokai", "Solarized"];
export const SAMPLE_CODES = {
  HTML: DEFAULT_HTML_CODE,
  CSS: `body {
font-family: Arial, sans-serif;
margin: 0;
padding: 20px;
background-color: #f0f0f0;
}
.container {
max-width: 800px;
margin: 0 auto;
background: white;
padding: 20px;
border-radius: 8px;
box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
h1 {
color: #333;
text-align: center;
}`,
  JavaScript: `// Sample JavaScript Code
function greetUser(name) {
return \`Hello, \${name}! Welcome to NoteCode.\`;
}
// Event listener example
document.addEventListener('DOMContentLoaded', function() {
console.log('Page loaded successfully!');
const button = document.getElementById('myButton');
if (button) {
button.addEventListener('click', function() {
alert(greetUser('Developer'));
});
}
});`,
  Python: `# Sample Python Code
def fibonacci(n):
if n <= 1:
return n
return fibonacci(n-1) + fibonacci(n-2)
def main():
print("Fibonacci sequence:")
for i in range(10):
print(f"F({i}) = {fibonacci(i)}")
if __name__ == "__main__":
main()`,
  Java: `public class HelloWorld {
public static void main(String[] args) {
System.out.println("Hello, World!");
// Example of a simple loop
for (int i = 1; i <= 5; i++) {
System.out.println("Count: " + i);
}
}
public static void greetUser(String name) {
System.out.println("Hello, " + name + "!");
}
}`,
  "C++": `#include <iostream>
#include <vector>
#include <string>
using namespace std;
int main() {
cout << "Hello, World!" << endl;
// Example with vector
vector<string> languages = {"C++", "Java", "Python", "JavaScript"};
cout << "Programming languages:" << endl;
for (const auto& lang : languages) {
cout << "- " << lang << endl;
}
return 0;
}`,
  TypeScript: `interface User {
id: number;
name: string;
email: string;
}
class UserManager {
private users: User[] = [];
addUser(user: User): void {
this.users.push(user);
console.log(\`User \${user.name} added successfully!\`);
}
getUserById(id: number): User | undefined {
return this.users.find(user => user.id === id);
}
getAllUsers(): User[] {
return [...this.users];
}
}
// Usage example
const userManager = new UserManager();
userManager.addUser({
id: 1,
name: "John Doe",
email: "john@example.com"
});`,
};
