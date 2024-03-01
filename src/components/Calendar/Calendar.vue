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

const today = shallowRef(dayjs());
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

const start = shallowRef(today.value.subtract(1, "year"));
const end = shallowRef(today.value.add(1, "year"));
const monthList = computed(() => generateMonthList(start.value.format("YYYY-MM-DD"), end.value.format("YYYY-MM-DD"), props.startDay));

const bufferSize = 5;

const { startOffset, data: renderList, firstActiveIndex, totalWidth, handleScroll, align } = useVirtualScroll(monthList, {
  bufferSize,
  startActiveIndex: Math.floor(monthList.value.length / 2),
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
    const el = viewportRef.value;
    if (el) {
      const scrollLeft = el.scrollLeft;
      start.value = start.value.subtract(1, "year");
      end.value = end.value.subtract(1, "year");
      el.scrollLeft = scrollLeft + 12 * viewportWidth.value;
    }
  },
  onReachEnd() {
    const el = viewportRef.value;
    if (el) {
      const scrollLeft = el.scrollLeft;
      start.value = start.value.add(1, "year");
      end.value = end.value.add(1, "year");
      el.scrollLeft = scrollLeft - 12 * viewportWidth.value;
    }
  },
  scrollEl: viewportRef,
  width: viewportWidth,
});

const currentMonth = computed(() => monthList.value[firstActiveIndex.value]);

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
