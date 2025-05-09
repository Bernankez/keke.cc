const zIndexManager = ref<number[]>([]);
const globalBaseZIndex = ref(0);

function release(zIndex: number) {
  const index = zIndexManager.value.indexOf(zIndex);
  if (index > -1) {
    zIndexManager.value.splice(index, 1);
  }
}

export function useZIndex(baseZIndex?: number) {
  if (baseZIndex) {
    globalBaseZIndex.value = baseZIndex;
  }
  const maxZIndex = computed(() => zIndexManager.value.length === 0 ? globalBaseZIndex.value : Math.max(...zIndexManager.value));
  const nextZIndex = computed(() => maxZIndex.value + 1);

  function use(zIndex?: number, releaseOnDispose = true) {
    const _zIndex = zIndex ?? nextZIndex.value;
    zIndexManager.value.push(_zIndex);

    if (releaseOnDispose && getCurrentInstance()) {
      onScopeDispose(() => {
        release(_zIndex);
      });
    }

    return _zIndex;
  }

  return {
    use,
    release,

    nextZIndex,
    maxZIndex,
  };
}
