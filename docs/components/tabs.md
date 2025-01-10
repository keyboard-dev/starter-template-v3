# Tabs

The Tabs component provides a way to organize content into multiple sections that can be displayed one at a time.

## Basic Example

<Tabs defaultValue="preview">
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
  <TabsContent value="preview">
    <div className="p-4 border rounded">
      A simple tabs example showing how the component works.
    </div>
  </TabsContent>
  <TabsContent value="code">
    ```jsx
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        Content for tab 1
      </TabsContent>
      <TabsContent value="tab2">
        Content for tab 2
      </TabsContent>
    </Tabs>
    ```
  </TabsContent>
</Tabs>

## Props

### Tabs
- `defaultValue` - The value of the tab that should be active when the component is first rendered.

### TabsTrigger
- `value` - A unique identifier that matches the corresponding TabsContent.

### TabsContent
- `value` - A unique identifier that matches the corresponding TabsTrigger.
