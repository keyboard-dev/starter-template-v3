## Code Snippets

<CodeSnippets>
```javascript::index.js
const tabs = document.querySelector('.tabs');
tabs.addEventListener('click', (e) => {
  // Handle tab click
  console.log('Tab clicked:', e.target.textContent);
});zi
```

```python::otherserver.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/tabs/{tab_id}")
async def get_tab_content(tab_id: str):
    return {"content": f"Content for tab {tab_id}"}
```

```python::server.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/tabs/{tab_id}")
async def get_tab_content(tab_id: str):
    return {"content": f"Content for tab {tab_id}"}
```
</CodeSnippets>