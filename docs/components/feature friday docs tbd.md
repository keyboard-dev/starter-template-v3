# Components

<Terminal 
  initialMessage="Welcome to my terminal!"
  prompt="$"
/>

<Accordion title="Click me to expand">
  This is the content that will be shown when the accordion is expanded.
  
    ```javascript

    let truth = "andrew is cool"

    ```
  
  Or even code blocks!
</Accordion>

## code snippet

<CodeSnippets>
```javascript::index.js



```

```python::flask.py
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello from the API"})
```

</CodeSnippets>