<template>
  <div class="daterange-picker flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg shadow-md">
    <div class="flex flex-col">
      <label for="start-date" class="mb-2 text-sm font-semibold text-gray-700">Start Date:</label>
      <input
          type="date"
          v-model="startDate"
          :max="endDate"
          @change="onDateChange"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
      />
    </div>

    <div class="flex flex-col">
      <label for="end-date" class="mb-2 text-sm font-semibold text-gray-700">End Date:</label>
      <input
          type="date"
          v-model="endDate"
          :min="startDate"
          @change="onDateChange"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import dayjs from 'dayjs';

export default {
  name: 'DateRangePicker',
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        startDate: null,
        endDate: null,
      }),
    },
  },
  setup(props, { emit }) {
    const startDate = ref(props.modelValue.startDate || dayjs().format('YYYY-MM-DD'));
    const endDate = ref(props.modelValue.endDate || dayjs().add(1, 'day').format('YYYY-MM-DD'));

    watch(() => props.modelValue, (newValue) => {
      startDate.value = newValue.startDate || dayjs().format('YYYY-MM-DD');
      endDate.value = newValue.endDate || dayjs().add(1, 'day').format('YYYY-MM-DD');
    });

    const onDateChange = () => {
      emit('update:modelValue', { startDate: startDate.value, endDate: endDate.value });
    };

    return {
      startDate,
      endDate,
      onDateChange,
    };
  },
};
</script>

<style scoped>
.daterange-picker {
  display: flex;
  gap: 10px;
}
</style>
