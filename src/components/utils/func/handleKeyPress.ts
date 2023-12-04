/**
 * Handles the / key press to focus the search input
 * @param event 
 */
export const handleSlashKeyPress = (event: KeyboardEvent) => {
  if (event.key === '/') {
    event.preventDefault();
    const input = document.getElementById('searchInput');
    if (input) {
      input.focus();
    }
  }
};