Everything basically lives in src/object/index.jsx

left side bar - code lives in left-sidebar.jsx - receives props, and loads image based on those props. Be sure
that the data-id you're loading is the same in index.jsx as well.

The most complicated portion, is that you have to define in the data-id for dragStart which item you're dragging and dropping, so 
that we know which element to load. This gets a bit confusing, because the data-id is important for left-sidebar.jsx and index.jsx
in checkElType(type).

