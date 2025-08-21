import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
export function calculateDeliveryDate(deliveryOption) {
    let today = dayjs();
    let daysToBeAdded = deliveryOption.deliveryDays;

    while (daysToBeAdded > 0) {
        today = today.add(1, 'day');   // move forward by 1 day first
        if (isWeekend(today)) {
            continue;  // don’t count weekends
        }
        daysToBeAdded--; // count only weekdays
    }

    return today.format('dddd, MMMM D');
}
function isWeekend(date){
    const day = date.format('dddd');
    return day === 'Saturday' || day === 'Sunday';
}