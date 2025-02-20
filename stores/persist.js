export function persistPlugin({ store }) {
    const savedState = localStorage.getItem(store.$id);
    if (savedState) {
      store.$patch(JSON.parse(savedState));
    }
  
    store.$subscribe((_mutation, state) => {
      localStorage.setItem(store.$id, JSON.stringify(state));
    });
  }
  