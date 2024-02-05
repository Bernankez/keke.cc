<template>
  <Mask class="max-w-200 w-full" to="body" :show="show" @click="onMask">
    <div class="m-b-3 w-full flex justify-center text-8 text-primary" @click="onMask">
      <div @click.stop>
        DayGram
      </div>
    </div>
    <div class="rounded-4 p-3 transition-200 sm:bg-background bg-opacity-45! sm:dark:bg-background dark:bg-opacity-3!">
      <div class="date-cell-warpper">
        <div v-for="day in days" :key="day" class="h-10 w-15 flex items-end justify-end text-3.5">
          {{ day }}
        </div>
      </div>
      <div class="viewport mt-10 select-none overflow-hidden">
        <div ref="wrapperRef" class="flex overflow-y-auto">
          <div v-for="(month, i) in renderList" :key="i" class="date-cell-warpper w-full shrink-0">
            <div v-for="date in month" :key="date.date" :class="[date.isCurrentMonth ? '' : 'text-disabled-dark dark:text-disabled-darker']" class="box-border h-15 w-15 rounded-2 p-1.5">
              <div class="text-end">
                {{ date.day }}
              </div>
              <div class="whitespace-pre text-end text-3">
                {{ date.isCurrentMonth ? "content" : " " }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Mask>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { getSequenceDays } from ".";

const props = withDefaults(defineProps<{
  closeOnMask?: boolean;
  startDay?: number;
}>(), {
  startDay: 1,
});

const show = defineModel({ default: false });

const days = computed(() => getSequenceDays(props.startDay));

function onMask() {
  if (props.closeOnMask) {
    show.value = !show.value;
  }
}

const wrapperRef = ref<HTMLDivElement>();
const startScrollX = ref(0);
const startTimestamp = ref(0);
const speed = ref(0);
const inertia = ref(0.5);
const duration = ref(300);
// extract to composable
// unify scroll and pointer
const { direction, posStart, posEnd, distanceX } = usePointerSwipe(wrapperRef, {
  threshold: 0,
  disableTextSelect: true,
  onSwipeStart(e) {
    startScrollX.value = wrapperRef.value?.scrollLeft || 0;
    startTimestamp.value = e.timeStamp;
  },
  onSwipe(e) {
    let scrollLeft = startScrollX.value + distanceX.value;
    if (scrollLeft < 0) {
      scrollLeft = 0;
    }
    speed.value = distanceX.value / (e.timeStamp - startTimestamp.value);
    requestAnimationFrame(() => {
      wrapperRef.value!.scrollLeft = scrollLeft;
    });
  },
  onSwipeEnd(e) {
    // 当速度够大才用惯性
    if (Math.abs(speed.value) > 0.1) {
      inertiaScroll();
    }
    const target = wrapperRef.value!.scrollLeft + speed.value * 100 * inertia.value;
    const startTime = performance.now();
    const animate = () => {
      const progress = Math.min((performance.now() - startTime) / duration.value, 1);
      const ease = 1 - (1 - progress) ** 3;
      wrapperRef.value!.scrollLeft = startScrollX.value + (target - startScrollX.value) * ease;
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  },
});

watchEffect(() => {
  console.log(direction.value, distanceX.value);
});

const today = dayjs();
const year = ref(today.year());
const month = ref(today.month() + 1);
const renderCount = ref(2);
const renderList = computed(() => {
  const months = Array.from({ length: renderCount.value }, (_, i) => {
    const date = dayjs(`${year.value}-${month.value + i}-01`);
    const { dates } = useDates(date.year(), date.month() + 1, { start: props.startDay });
    return dates.value;
  });
  return [...months];
});
</script>

<style scoped>
.viewport {
  scrollbar-width: 0;
}

::-webkit-scrollbar {
  display: none;
}

.date-cell-warpper {
  @apply grid grid-cols-7 items-center justify-items-center gap-x-1.5 gap-y-10;
}
</style>
