# English-to-English Dictionary - Wireframe

## Design Direction
- Mobile-first dictionary app
- Large centered search bar
- Card-based result display
- Bottom tab bar for mobile / sidebar for desktop
- Color: white background, slate text, blue accent
- Font: Inter / system-ui

---

## Page 1: Home (Search)

### Mobile Layout

```
+------------------------------------------+
| [=]  EN Dictionary           [moon icon] |  <- Header (48px)
+------------------------------------------+
|                                          |
|                                          |
|     +------------------------------+    |
|     | [search icon] Search a word  |    |  <- Search bar (centered)
|     +------------------------------+    |
|                                          |
|     Recent searches:                     |
|     +----------------------------------+|
|     | apple               [x]         ||
|     +----------------------------------+|
|     | beautiful            [x]         ||
|     +----------------------------------+|
|     | curious              [x]         ||
|     +----------------------------------+|
|                                          |
+------------------------------------------+
| [search]  [bookmark]  [history]          |  <- Bottom nav (56px)
+------------------------------------------+
```

### Desktop Layout

```
+--------+----------------------------------------------+
| Logo   | [search icon] Search a word...     [moon]     |
+--------+----------------------------------------------+
|        |                                               |
| Nav:   |     +-----------------------------------+    |
| Search |     | [search icon] Search a word       |    |
| Marks  |     +-----------------------------------+    |
| Hist.  |                                               |
|        |     Recent searches:                          |
|        |     +---------------------------------------+|
|        |     | apple                           [x]   ||
|        |     | beautiful                       [x]   ||
|        |     | curious                         [x]   ||
|        |     +---------------------------------------+|
|        |                                               |
+--------+----------------------------------------------+
```

---

## Page 2: Word Detail (Search Result)

### Mobile Layout

```
+------------------------------------------+
| [<]  EN Dictionary           [moon icon] |
+------------------------------------------+
| +--------------------------------------+ |
| | hello                                | |
| | /həˈloʊ/   [speaker icon]           | |  <- Phonetic + audio
| | [Bookmark icon]                      | |  <- Toggle bookmark
| +--------------------------------------+ |
|                                          |
| exclamation [1]                          |  <- Part of speech
| +--------------------------------------+ |
| | 1. used as a greeting or to begin a  | |
| |    phone conversation.               | |
| |    "hello there, Katie!"  [2]        | |  <- Example in quotes
| +--------------------------------------+ |
|                                          |
| noun                                     |
| +--------------------------------------+ |
| | 1. an utterance of "hello"; a        | |
| |    greeting.                         | |
| |    "she was saying her hellos"       | |
| +--------------------------------------+ |
|                                          |
| Synonyms: hi, greetings                  |  <- Clickable
| Antonyms: goodbye                        |  <- Clickable
|                                          |
| Source: wiktionary.org                   |
+------------------------------------------+
| [search]  [bookmark]  [history]          |
+------------------------------------------+

[1] Part of speech label
[2] Example sentence in italics
```

---

## Page 3: Bookmarks

### Mobile Layout

```
+------------------------------------------+
| [=]  Bookmarks               [moon icon] |
+------------------------------------------+
| Folders:                                 |
| [All] [Vocabulary] [IELTS] [+]          |  <- Horizontal scroll
+------------------------------------------+
| +--------------------------------------+ |
| | hello                                | |  <- Tap to view
| | exclamation - used as a greeting...  | |
| |                        [bookmark on] | |
| +--------------------------------------+ |
| +--------------------------------------+ |
| | beautiful                            | |
| | adjective - pleasing the senses...   | |
| |                        [bookmark on] | |
| +--------------------------------------+ |
| +--------------------------------------+ |
| | curious                              | |
| | adjective - eager to know...         | |
| |                        [bookmark on] | |
| +--------------------------------------+ |
|                                          |
+------------------------------------------+
| [search]  [bookmark]  [history]          |
+------------------------------------------+
```

---

## Page 4: History

### Mobile Layout

```
+------------------------------------------+
| [=]  History                 [moon icon] |
+------------------------------------------+
| [Clear all]                              |
| +--------------------------------------+ |
| | curious                   2 min ago  | |  <- Tap to search
| |                                 [x]  | |
| +--------------------------------------+ |
| | beautiful                 1 hour ago | |
| |                                 [x]  | |
| +--------------------------------------+ |
| | hello                    yesterday   | |
| |                                 [x]  | |
| +--------------------------------------+ |
|                                          |
+------------------------------------------+
| [search]  [bookmark]  [history]          |
+------------------------------------------+
```

---

## Component Breakdown

### Header
- Logo + app name (left)
- Dark mode toggle (right)
- Mobile: hamburger menu (optional)

### Bottom Navigation (Mobile)
- 3 tabs: Search, Bookmarks, History
- Active tab highlighted with blue
- Each tab: icon + label

### SearchBar
- Input with search icon (left)
- Clear button (right, when text present)
- role="searchbox", aria-label="Search for an English word"
- Debounce: 300ms

### WordHeader
- Word name (h1)
- Phonetic text + audio play button
- Bookmark toggle button (aria-pressed)

### WordMeaning
- Part of speech label (badge)
- List of definitions with numbering
- Example sentences in italics

### WordRelated
- Synonyms/Antonyms as clickable chips
- Clicking navigates to that word's definition

### BookmarkCard
- Word name
- First definition preview (truncated)
- Bookmark remove button

### HistoryItem
- Word name
- Relative time ("2 min ago")
- Delete button

---

## Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| < 768px   | Bottom nav, single column, stacked cards |
| >= 768px  | Side nav (narrow), wider cards |
| >= 1024px | Side nav (200px), max-width content area (720px) |

---

## Interaction Flow

1. User opens app -> Home page with search bar centered
2. User types a word -> Debounced search triggers
3. Results appear -> Navigate to word detail page
4. User can bookmark -> Toggle button with animation
5. User can tap synonym -> New search for that word
6. User can play audio -> Speaker icon button
7. Bookmarks page -> View all saved words, organize in folders
8. History page -> View past searches, tap to re-search

---

## Accessibility Checklist

- [ ] Search bar: role="searchbox", aria-label
- [ ] Results count: aria-live="polite" announcement
- [ ] Audio button: aria-label="Play pronunciation of [word]"
- [ ] Bookmark toggle: aria-pressed="true/false"
- [ ] Navigation: keyboard accessible (Tab, Enter, Escape)
- [ ] Focus trap in modals (folder create dialog)
- [ ] Skip to main content link
- [ ] All interactive elements: min 24x24px target
- [ ] Color contrast: 4.5:1 for text, 3:1 for UI elements
- [ ] Focus indicator: 2px+ visible outline
