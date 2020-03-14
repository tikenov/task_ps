import { BULL_REDIS_URI, BULL_HOST_ID } from './config';
import Queue from 'bull';

if (!BULL_REDIS_URI) {
    throw new Error(`Env var BULL_REDIS_URI is empty. Cannot init task ${__filename}.`);
}

export const queueSettings = {
    hostId: BULL_HOST_ID,
    name: 'fetch_metrics',
    prefix: 'bull.fetch-metrics',
};

export const metricsQueue = new Queue(queueSettings.name, {
    prefix: queueSettings.prefix,
    redis: BULL_REDIS_URI,
});

metricsQueue.add('fetch_metrics_every_5m', {}, { repeat: { cron: '*/5 * * * *' } });

metricsQueue.process('fetch_metrics_every_5m', 1, async () => {
    console.log(new Date().toISOString(), 'Starting job: fetch_metrics_every_5m...');

    return {
        status: 'job completed',
        result: new Date().toISOString(),
    };
});