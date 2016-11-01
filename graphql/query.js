import { GraphQLObjectType } from 'graphql';
import EventType from './types/EventType';
import ParticipantType from './types/ParticipantType';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    participant: {
      resolve: () => 'participant',
      type: ParticipantType,
    },
    event: {
      resolve: () => 'event',
      type: EventType,
    }
  }
});

export default query;
