<template>
  <Mask class="max-w-200 w-full" to="body" :show="show" @click="onMask">
    <div class="m-b-3 w-full flex justify-center text-8 text-primary" @click="onMask">
      <div @click.stop>
        DayGram
      </div>
    </div>
    <div class="rounded-4 p-3 transition-200 sm:bg-background bg-opacity-45! sm:dark:bg-background dark:bg-opacity-3!">
      <div class="date-cell-warpper">
        <div v-for="day in days" :key="day" class="h-10 w-full flex items-end justify-center text-3.5">
          <div class="w-15 text-end">
            {{ day }}
          </div>
        </div>
      </div>
      <div class="mt-10 overflow-hidden">
        <div ref="viewportRef" class="overflow-x-auto overflow-y-hidden" @wheel="onWheel" @scroll="onScroll">
          <!-- 145 = 6 * 20 + 5 * 5 -->
          <div class="relative h-145" :style="{ width: `${totalWidth}px` }">
            <div class="absolute flex select-none" :style="{ transform: `translateX(${startOffset}px)` }">
              <div v-for="month in renderList" :key="`${month.year}${month.month}`" :style="{ width: `${viewportWidth}px` }" class="date-cell-warpper relative shrink-0">
                <div class="absolute left-10% top-0 inline-block align-start text-40 text-primary font-bold leading-[1] opacity-20 md:text-50">
                  {{ month.year.toString().slice(2) }}
                </div>
                <div class="absolute bottom-0 right-0 inline-block align-bottom text-70 text-primary font-bold leading-[1] opacity-20 md:text-90">
                  {{ month.month.toString().padStart(2, "0") }}
                </div>
                <div v-for="date in month.dates" :key="date.date" :class="[(date.isCurrentMonth && month.month === currentMonth.month) ? '' : 'text-disabled-dark dark:text-disabled-darker']" class="box-border h-20 w-full rounded-2 transition">
                  <div class="flex justify-center p-1.5">
                    <div class="w-15 text-end">
                      {{ date.day }}
                    </div>
                  </div>
                  <!-- <div class="h-3 w-full bg-black"></div>
                <div class="h-3 w-full bg-gray"></div>
                <div class="h-3 w-full bg-black"></div> -->
                </div>
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
import type { DateCell } from ".";
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

const viewportRef = ref<HTMLDivElement>();
const { width: viewportWidth } = useElementSize(viewportRef);

const renderCount = ref(100);
const today = shallowRef(dayjs());
const monthList = ref<{ year: number;month: number;dates: DateCell[] }[]>([]);
function generateMonthList(start: string, end: string, startDay: number) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const count = endDate.diff(startDate, "month");
  const months = Array.from({ length: count }, (_, i) => {
    const date = startDate.add(i, "month");
    const { dates } = useDates(date.year(), date.month() + 1, { start: startDay });
    return {
      year: date.year(),
      month: date.month() + 1,
      dates: dates.value,
    };
  });
  return [...months];
}
watch([today, renderCount], ([today, renderCount]) => {
  monthList.value = Array.from({ length: renderCount }, (_, i) => {
    const date = dayjs(`${today.year()}-${today.month() + 1}-01`).add(i, "month");
    const { dates } = useDates(date.year(), date.month() + 1, { start: props.startDay });
    return {
      year: date.year(),
      month: date.month() + 1,
      dates: dates.value,
    };
  });
}, { immediate: true });
// const monthList = computed(() => {
//   const today = dayjs();
//   const months = Array.from({ length: renderCount.value }, (_, i) => {
//     const date = dayjs(`${today.year()}-${today.month() + 1}-01`).add(i, "month");
//     const { dates } = useDates(date.year(), date.month() + 1, { start: props.startDay });
//     return {
//       year: date.year(),
//       month: date.month() + 1,
//       dates: dates.value,
//     };
//   });
//   return [...months];
// });

const bufferSize = 5;

const { startOffset, data: renderList, firstActiveIndex, totalWidth, handleScroll, align } = useVirtualScroll(monthList, {
  bufferSize,
  onScrollStart() {
    console.log("scroll start");
  },
  onScroll() {
    console.log("scroll");
  },
  onScrollEnd() {
    console.log("scroll end");
    // align(firstActiveIndex.value);
  },
  onReachStart() {
    console.log("reach start");
    // TODO
    // today.value = today.value.subtract(1, "year");
    // align(firstActiveIndex.value, false);
  },
  onReachEnd() {
    console.log("reach end");
    // today.value = today.value.add(1, "year");
  },
  scrollEl: viewportRef,
  width: viewportWidth,
});

function alignDate(date: string, smooth?: boolean) {
  const index = monthList.value.findIndex((month) => {
    return month.dates.some(dateCell => dateCell.date === date);
  });
  console.log(index);
  if (index !== -1) {
    align(index, smooth);
  }
}

const currentMonth = computed(() => monthList.value[firstActiveIndex.value]);

// TODO auto sticky
function onWheel(e: WheelEvent) {
  if (e.deltaY !== 0) {
    e.preventDefault();
    const el = e.currentTarget as HTMLDivElement;
    const scrollLeft = el.scrollLeft + e.deltaY;
    // Setting scrollLeft will trigger scroll event
    // So don't need to handle scroll here manually
    el.scrollLeft = scrollLeft;
  }
}
function onScroll(e: UIEvent) {
  handleScroll(e);
}
</script>

<style scoped>
/* .viewport {
  scrollbar-width: 0;
}

::-webkit-scrollbar {
  display: none;
} */

.date-cell-warpper {
  @apply grid grid-cols-7 gap-y-5;
}
</style>
