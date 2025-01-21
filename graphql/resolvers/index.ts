import user from "./user"
import auth from "./auth"
import todo from "./todo"

const resolver = {
  Query: {
    ...user.Query,
    ...todo.Query
  },
  Mutation: {
    ...auth.Mutation,
    ...user.Mutation,
    ...todo.Mutation
  }
}
export default resolver
