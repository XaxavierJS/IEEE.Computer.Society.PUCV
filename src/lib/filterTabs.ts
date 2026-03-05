interface SetupFilterTabsOptions {
  buttonSelector: string;
  panelSelector: string;
  idAttribute: string;
  defaultId: string;
  queryParam: string;
  scrollTargetSelector?: string;
}

function updateButtonState(button: Element, isActive: boolean) {
  button.classList.toggle('border-ieee-orange', isActive);
  button.classList.toggle('bg-ieee-orange/5', isActive);
  button.classList.toggle('shadow-sm', isActive);
  button.classList.toggle('border-neutral-200', !isActive);
  button.classList.toggle('hover:border-ieee-orange/40', !isActive);
}

export function setupFilterTabs(options: SetupFilterTabsOptions) {
  const buttons = Array.from(document.querySelectorAll(options.buttonSelector));
  const panels = Array.from(document.querySelectorAll(options.panelSelector));

  if (buttons.length === 0 || panels.length === 0) return;

  const availableIds = new Set(
    buttons
      .map((button) => button.getAttribute(options.idAttribute))
      .filter((value): value is string => Boolean(value))
  );

  const setActive = (activeId: string) => {
    buttons.forEach((button) => {
      const isActive = button.getAttribute(options.idAttribute) === activeId;
      updateButtonState(button, isActive);
    });

    panels.forEach((panel) => {
      const isActive = panel.getAttribute(options.idAttribute) === activeId;
      panel.classList.toggle('hidden', !isActive);
      (panel as HTMLElement).style.display = '';
    });
  };

  const activate = (id: string, shouldScroll: boolean) => {
    if (!availableIds.has(id)) return;

    setActive(id);

    const url = new URL(window.location.href);
    url.searchParams.set(options.queryParam, id);
    window.history.replaceState({}, '', url.toString());

    if (shouldScroll && options.scrollTargetSelector) {
      const target = document.querySelector(options.scrollTargetSelector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.getAttribute(options.idAttribute);
      if (!id) return;
      activate(id, true);
    });
  });

  const initialId = new URL(window.location.href).searchParams.get(options.queryParam);
  if (initialId && availableIds.has(initialId)) {
    setActive(initialId);
    return;
  }

  setActive(options.defaultId);
}
