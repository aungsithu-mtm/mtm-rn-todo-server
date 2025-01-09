import { gql } from "apollo-server-express";
import userTypeDefs from './user'
import authTypeDefs from './auth'
import taskTypeDefs from './todo'

const baseTypeDefs = gql`
  scalar JSON
  type Query 
  type Mutation
`;

export default [baseTypeDefs, ...authTypeDefs, ...userTypeDefs, ...taskTypeDefs];

