# FridgeLog

## Notes

- When items are within 3 days of expiring, that's when it should be considered to be added to shopping list.
  - 3: yellow
  - 2: orange
  - 1: red
- User can swipe to add to grocery list
- On grocery list is a check list that persists on both open app and close app
- The list of items checked is local, using a JSON persistent maybe??
- When user is online, a button become available on the shopping list screen, something like (finished shopping), all checked items would go through review of expiry date and then update accordingly on db.
- If user is off line then they cannot update shopping list or fridge item list.
- 1-1 relationship between fridge item and grocery list item, amount can be difference.

## Data persistence

- FridgeItems table: pg online -> each data pull causes a local JSON to update
- ShoppingItems table: pg online -> each data pull causes a local JSON to update
- ShoppedItems table: offline table -> only show items that are checked on user's Shopping Items
