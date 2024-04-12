export default function getTimeDeltaString(time: number) {
    if (time < 1000) {
        return "now";
    // If time is less than 1 minute
    } else if (time < 60000) {
        return `${Math.round(time / 1000)} sec ago`;
    // If time is less than 1 hour
    } else if (time < 3600000) {
        return `${Math.round(time / 60000)} min ago`;
    // If time is less than 1 day
    } else if (time < 86400000) {
        return `${Math.round(time / 3600000)} h ago`;
    // If time is less than 1 week
    } else if (time < 604800000) {
        return `${Math.round(time / 86400000)} d ago`;
    // If time is greater than 1 week
    } else {
        return `${Math.round(time / 604800000)} w ago`;
    }
}