/**
 * Behind the Scenes Videos
 * A glimpse into how SwitchUp tackles real challenges
 *
 * To add a new video:
 * 1. Upload to Vimeo and get the video ID from the URL (e.g., vimeo.com/1139231458 → "1139231458")
 * 2. Add a new entry to the BEHIND_THE_SCENES_VIDEOS array below
 */

import type { BehindTheScenesVideo } from '../types';

export const BEHIND_THE_SCENES_VIDEOS: BehindTheScenesVideo[] = [
    {
        id: 'arik-windmill-intro',
        vimeoId: '1139421319',
        title: 'How We Use Windmill to Solve Real Problems',
        description: 'A walkthrough of how we approach complex automation challenges at SwitchUp. See how we use Windmill to orchestrate workflows that handle thousands of provider interactions daily.',
        author: {
            name: 'Arik',
            role: 'Founder',
            avatarInitials: 'AM',
        },
        topics: [
            'Windmill Architecture',
            'Real-world Challenges',
            'Automation Patterns',
        ],
        duration: '4:41',
        featured: true,
    },
    // Add more videos here as the team grows
    // Example structure for future videos:
    // {
    //     id: 'team-member-topic',
    //     vimeoId: 'XXXXXXXXX',
    //     title: 'Video Title',
    //     description: 'Description of what the video covers...',
    //     author: {
    //         name: 'Name',
    //         role: 'Role',
    //         avatarInitials: 'XX',
    //     },
    //     topics: ['Topic 1', 'Topic 2'],
    //     duration: 'X:XX',
    //     featured: false,
    // },
];
