import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import EventType from './types/EventType';
import ParticipantType from './types/ParticipantType';
import { getEvent, getParticipant } from '../fakeApi';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    participant: {
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString }
      },
      resolve: (root, args) => getParticipant(args.id),
      type: ParticipantType,
    },
    event: {
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString }
      },
      resolve: (root, args) => getEvent(args.id),
      type: EventType,
    }
  }
});

export default query;
