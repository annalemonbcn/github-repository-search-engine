export const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === '/') {
    event.preventDefault();
    const input = document.getElementById('searchInput');
    if (input) {
      input.focus();
    }
  }
};