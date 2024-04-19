export function useRootFontSize() {
  const rootFontSize = ref(0);

  onMounted(() => {
    rootFontSize.value = Number.parseInt(getComputedStyle(document.documentElement).fontSize);
  });

  return rootFontSize;
}
