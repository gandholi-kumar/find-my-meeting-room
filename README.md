# Find the Meeting room 

This is a simple Chrome extension to identify all the meeting rooms in the 4th floor

## Project Structure

```
my-chrome-extension
├ page.html        # Defines the structure floor map
├ page.js          # Contains the JavaScript functionality to display the page content
├ styles.css       # CSS styles for the popup
├ background.js    # Listens to the click action on icon and open a new tab
├ manifest.json    # Configuration file for the Chrome extension
└ README.md        # Documentation for the project
```

## Installation

1. Clone the repository or download the source code.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the `find-my-meeting-room` directory.

## Usage
- Click on the extension icon in the Chrome toolbar to open the layout in new window.
- Type in the room id in the text box as hinted and it can be seen on layout.

## License
This project is licensed under the MIT License.