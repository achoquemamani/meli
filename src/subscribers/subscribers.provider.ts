import { Subscriber } from './models/subscriber.entity';

export const subscribersProviders = [
  {
    provide: 'SUBSCRIBERS_REPOSITORY',
    useValue: Subscriber,
  },
];
