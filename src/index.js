import DateRangePicker from './components/DateRangePicker.vue';

const install = (app) => {
  app.component('DateRangePicker', DateRangePicker);
};

export { DateRangePicker };
export default { install };
