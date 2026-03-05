interface SetupFilterTabsOptions {
  buttonSelector: string;
  panelSelector: string;
  idAttribute: string;
  defaultId: string;
  queryParam: string;
  scrollTargetSelector?: string;
  tablistLabel?: string;
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

  const ids = Array.from(availableIds);
  const tablistElement = buttons[0]?.parentElement;

  if (tablistElement) {
    tablistElement.setAttribute('role', 'tablist');
    if (options.tablistLabel) {
      tablistElement.setAttribute('aria-label', options.tablistLabel);
    }
  }

  buttons.forEach((button) => {
    const id = button.getAttribute(options.idAttribute);
    if (!id) return;

    const tabId = `tab-${options.queryParam}-${id}`;
    const panelId = `panel-${options.queryParam}-${id}`;

    button.setAttribute('id', tabId);
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', panelId);
    button.setAttribute('tabindex', '-1');
  });

  panels.forEach((panel) => {
    const id = panel.getAttribute(options.idAttribute);
    if (!id) return;

    const tabId = `tab-${options.queryParam}-${id}`;
    const panelId = `panel-${options.queryParam}-${id}`;

    panel.setAttribute('id', panelId);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
  });

  const setActive = (activeId: string) => {
    buttons.forEach((button) => {
      const isActive = button.getAttribute(options.idAttribute) === activeId;
      updateButtonState(button, isActive);
      button.setAttribute('aria-selected', String(isActive));
      button.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    panels.forEach((panel) => {
      const isActive = panel.getAttribute(options.idAttribute) === activeId;
      panel.classList.toggle('hidden', !isActive);
      (panel as HTMLElement).hidden = !isActive;
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

    button.addEventListener('keydown', (event) => {
      const currentId = button.getAttribute(options.idAttribute);
      if (!currentId) return;

      const currentIndex = ids.indexOf(currentId);
      if (currentIndex < 0) return;

      let nextIndex = currentIndex;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % ids.length;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + ids.length) % ids.length;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = ids.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      const nextId = ids[nextIndex];
      activate(nextId, false);
      const nextButton = buttons.find((candidate) => candidate.getAttribute(options.idAttribute) === nextId) as HTMLElement | undefined;
      nextButton?.focus();
    });
  });

  const initialId = new URL(window.location.href).searchParams.get(options.queryParam);
  if (initialId && availableIds.has(initialId)) {
    setActive(initialId);
    return;
  }

  setActive(options.defaultId);
}
