import user from "./user"
import auth from "./auth"

const resolver = {
  Query: {
    ...user.Query
  },
  Mutation: {
    ...auth.Mutation,
    ...user.Mutation
  }
}
export default resolver
