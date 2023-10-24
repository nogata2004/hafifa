
import { PubSubEngine } from "graphql-subscriptions";

import  { Resolver, Query, Arg, PubSub, Publisher, Subscription, Root, ResolverFilterData } from '../App';
import { Notification, NotificationPayload } from './notification';


@Resolver()
export class SampleResolver {
    @Subscription({
        topics: 'NOTIFICATIONS',
        // filter: ({ payload, args }) => args.priorities.includes(payload.priority),
    })
    normalSubscription(@Root() { id, message }
    ): 
    Notification {
        return { id, message, date: new Date() };
    }

    // newNotification(
    //     @root() NotificationPayload: NotificationPayload,
    //     @Args() args: NewNotificationArgs,
    // ):
    //     Notification {
    //     return {
    //         ...NotificationPayload,
    //         data: new Date(),
    //     };
    // }
}

//useSubscribe

