# 🛠 Developer Documentation Style Guide inspired from Dataxis Framework

## 📚 Overview of Documentation Type

The Diátaxis framework breaks documentation into four types. Each has a unique purpose and audience.

| Type             | Purpose                        | Audience Need            | Character                     |
|------------------|--------------------------------|---------------------------|-------------------------------|
| **Tutorial**     | Learning by doing              | “I want to get started”   | Practical, friendly, guided   |
| **How-To Guide** | Solving a specific problem     | “I want to do X”          | Task-oriented, step-by-step   |
| **Reference**    | Describing technical details   | “I need to look this up”  | Accurate, complete, dry       |
| **Explanation**  | Understanding concepts         | “I want to understand”    | Clarifying, discursive, deep  |

---

## ✨ Style Guide for **Tutorials**

### 🎯 Goal: Build Confidence

- Assume the reader is **new** to the tool or topic.
- Focus on achieving a **useful and realistic outcome**.
- Minimize theory and keep the reader moving forward.

---

### 📐 Structure

1. **Title**  
   Use an action-oriented title.  
   _Examples_:  
   - “Getting Started with XYZ”  
   - “Build a Blog in 15 Minutes”

2. **Introduction**  
   State what the user will build and why it matters.

3. **Prerequisites**  
   List tools, versions, experience needed before starting.

4. **Steps**  
   Present **clear**, **chronological**, and **unambiguous** steps. Use:
   - Code blocks
   - Commands
   - Screenshots (if applicable)

5. **Outcome**  
   Show the result: a screenshot, success message, or working app.

6. **Next Steps**  
   Suggest related How-To Guides, Explanations, or Reference docs.

---

### 🗣 Tone and Language

- Use **second person** ("you") and **active voice**.
- Keep tone **friendly and encouraging**.
- Prefer contractions (e.g., “you’ll”, “let’s”, “don’t”).
- Give clear instructions:
  
  ✅ “Run this command.”  
  ❌ “You might want to try running…”

---

### 💡 Code and Output

- Use proper syntax highlighting.
- Annotate unclear parts with comments.
- Ensure code is **copy-pasteable** and **tested**.

Example:

\```bash
# Install the CLI globally
npm install -g mycli
\```

\```javascript
// Initialize the app
const app = createApp();
app.start();
\```

---

### ⚠️ Common Pitfalls

- ❌ Avoid deep dives into theory or architecture.
- ❌ Don’t require users to jump between multiple docs.
- ❌ Don’t leave steps vague or open-ended.

---

## 🧭 Other Documentation Types (Quick Guide)

### 📌 How-To Guides

- Solve **one specific problem**.
- Assume the reader knows the basics.
- Be **concise** and **actionable**.

Examples:
- “How to deploy to Heroku”
- “How to configure CORS in Express”

---

### 🧾 Reference Docs

- Describe **APIs, schemas, commands** in detail.
- Must be **complete, up-to-date, and unambiguous**.
- Ideal format: lists, tables, parameters.

---

### 📖 Explanations

- Help readers understand **why and how** something works.
- Use analogies, diagrams, and background info.
- Good for onboarding and advanced users.

---

## ✅ Tutorial Writing Checklist

- [ ] Does it help the user build something useful?
- [ ] Are the steps in logical, working order?
- [ ] Is the code copy-pasteable and functional?
- [ ] Are explanations kept minimal and practical?
- [ ] Is the tone friendly and encouraging?
- [ ] Are next steps or further resources included?

---

