<template>
  <Mask class="max-w-200 w-full" to="body" :show="show" @click="onMask">
    <div class="m-b-3 w-full flex justify-center text-8 text-primary" @click="onMask">
      <div @click.stop>
        DayGram
      </div>
    </div>
    <div class="rounded-4 p-3 transition-200 sm:bg-background bg-opacity-45! sm:dark:bg-background dark:bg-opacity-3!">
      <div class="grid grid-cols-7 items-center justify-items-center gap-x-1.5 gap-y-10">
        <div v-for="day in days" :key="day" class="h-10 w-15 flex items-end justify-end text-3.5">
          {{ day }}
        </div>
        <div v-for="date in dates" :key="date.date" class="box-border min-h-15 w-15 rounded-2 p-1.5">
          <template v-if="date.isCurrentMonth">
            <div class="text-end">
              {{ date.day }}
            </div>
            <div class="text-end text-3">
              content
            </div>
          </template>
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

// TODO toggle month
const days = computed(() => getSequenceDays(props.startDay));

function onMask() {
  if (props.closeOnMask) {
    show.value = !show.value;
  }
}

const today = dayjs();
const year = ref(today.year());
const month = ref(today.month() + 1);
const renderList = ref([]);

const { dates } = useDates(year, month, { start: props.startDay });
</script>
