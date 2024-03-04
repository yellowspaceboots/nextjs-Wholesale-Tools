import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { Client, fql } from 'fauna'

const options = {
  query_timeout_ms: 60_000
}

const resolvers = {
  Query: {
    log: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query( fql`get_quotations_by_date_range(${args.input}, "", "", "").data{id}` )
      return response.data
    },
    getQuotationsV10: async (parent, args, contextValue, info) => {
      const before = args.input.before || null
      const after = args.input.after || null
      const response = await contextValue.db.query( fql`get_quotations(${args.input}, 50, ${before}, ${after}) {
        before,
        after,
        data {
          id,
          title,
          requestId,
          amount,
          description,
          dateDue,
          dateDueDate: .dateDueDate.toString(),
          dateEntered,
          status,
          size,
          salesRef {
            id,
            name,
            number
          },
          customerList {
            id,
            amount,
            status,
            customerRef {
              id,
              account,
              name,
              salesRef {
                id,
                name,
                number
              }
            }
          }
      }
      }` )
      const newBefore = response.data.before ? response.data.before[0] : null
      const newAfter = response.data.after ? response.data.after[0] : null
      return {
        before: newBefore,
        after: newAfter,
        data: response.data.data
      }
    },
    getAllSalesmenV10: async (parent, args, contextValue, info) => {
        const response = await contextValue.db.query( fql`Salesmen.all().toArray()` )
        return response.data
      },
    getAllCustomersV10: async (parent, args, contextValue, info) => {
        const response = await contextValue.db.query( fql`Customers.all().toArray(){
          id,
          account,
          storeNumber,
          name,
          usedByCommercial,
          salesRef
        }` )
        return response.data
      },
    getMeV10: async (parent, args, contextValue, info) => {
        const response = await contextValue.db.query( fql`Query.identity() {id, name, email, role, salesnumber, salesRef} ` )
        return response.data
      },
    getQuotationCountsV10: async (parent, args, contextValue, info) => {
        const response = await contextValue.db.query( fql`get_quotation_counts(${args.input})`, options )
        return response.data
      },
    getQuotationsByDateRangeV10: async (parent, args, contextValue, info) => {
        const response = await contextValue.db.query( fql`get_quotations_by_date_range(${args.input}, "", "", "").data {
          id,
          title,
          requestId,
          amount,
          dateDue,
          dateEntered,
          status,
          size,
          salesRef {
            id,
            name,
            number
          },
          customerList {
            id,
            amount,
            status,
            customerRef {
              id,
              account,
              name
            }
          }
      }` )
        return response.data
      },
      getQuotationsByDateRangeWithClosedV10: async (parent, args, contextValue, info) => {
        const response = await contextValue.db.query( fql`get_quotations_by_date_range_with_closed(${args.input}, "", "", "").data {
          id,
          title,
          requestId,
          amount,
          dateDue,
          dateEntered,
          status,
          size,
          salesRef {
            id,
            name,
            number
          },
          customerList {
            id,
            amount,
            status,
            customerRef {
              id,
              account,
              name
            }
          }
      }` )
        return response.data
      },
    salesmenUsedByCommercialProjectsV10: async (parent, args, contextValue, info) => {
        const response = await contextValue.db.query( fql`Salesmen.usedByCommercial(true).toArray()` )
        return response.data
      },
    customersUsedByCommercialProjectsV10: async (parent, args, contextValue, info) => {
        const response = await contextValue.db.query( fql`Customers.usedByCommercial(true).toArray(){
          id,
          account,
          name,
          storeNumber,
          usedByCommercial,
          salesRef
        }` )
        return response.data
      },
    findProjectsByIDV10: async (parent, args, contextValue, info) => {
        const response = await contextValue.db.query( 
            fql`Projects.byId(${args.id}) {
            id,
            title,
            requestId,
            amount,
            dateDue,
            dateDueDate: .dateDueDate.toString(),
            dateEntered,
            dateEdited,
            description,
            createdBy,
            editedBy,
            status,
            size,
            salesRef,
            customerList {
              id,
              amount,
              note,
              status,
              customerRef {
                id,
                account,
                name,
                salesRef {
                  id,
                  name,
                  number
                }
              }
            },
            comments {
              id,
              dateCreated,
              edited,
              message,
              replyTo,
              user {
                id,
                name
              }
            }
        }`
    )
        return response.data
      },
      findCustomersByIDV10: async (parent, args, contextValue, info) => {
        const response = await contextValue.db.query(fql`Customers.byId(${args.id}) {
              id,
              name,
              account,
              salesRef
        }`
    )
        return response.data
      }
  },
  Mutation: {
    createCommentsV10: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query(
        fql`Comments.create({project: Projects.byId(${args.data.project}), dateCreated: ${args.data.dateCreated}, message: ${args.data.message}, user: User.byId(${args.data.user}), edited: ${args.data.edited}, replyTo: ${args.data.replyTo} }){
        id,
        message,
        dateCreated,
        replyTo,
        edited,
        user
      }` )
      return response.data
    },
    deleteCustomerProjectStateV10: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query( fql`CustomerProjectState.byId(${args.id})!.delete()` )
      return null
    },
    updateCommentsV10: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query( fql`Comments.byId(${args.id})!.update(${args.data}){ id }` )
      return response.data
    },
    updateCustomerProjectStateV10: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query( fql`CustomerProjectState.byId(${args.id})!.update(${args.data}){
        id,
        status,
        amount,
        note
      }` )
      return response.data
    },
    updateSalesmenV10: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query( fql`Salesmen.byId(${args.id})!.update(${args.data}){
        id,
        number,
        usedByCommercial
      }` )
      return response.data
    },
    updateCustomersV10: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query( fql`Customers.byId(${args.id})!.update(${args.data}){
        id,
        number,
        usedByCommercial
      }` )
      return response.data
    },
    addCustomersToProjectV10: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query( fql`add_customers_to_project(${args.input}){
        id,
        title,
        requestId,
        amount,
        dateDue,
        dateDueDate: .dateDueDate.toString(),
        dateEntered,
        dateEdited,
        description,
        createdBy,
        editedBy,
        status,
        size,
        salesRef,
        customerList {
          id,
          amount,
          note,
          status,
          customerRef {
            id,
            account,
            name,
            salesRef {
              id,
              name,
              number
            }
          }
        },
        comments {
          id,
          dateCreated,
          edited,
          message,
          replyTo,
          user {
            id,
            name
          }
        }
    }` )
      return response.data
    },
    changeCustomerSalesmanV10: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query( fql`change_customer_salesman(${args.input}){
        id,
        account,
        name,
        storeNumber,
        usedByCommercial,
        salesRef
      }` )
      return response.data
    },
    loginUserV10: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query( fql`login_user(${args.input})` )
      return response.data
    },
    addNewCustomerV10: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query( fql`add_new_customer(${args.input})` )
      return response.data
    },
    updateProjectV10: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query( fql`update_project(${args.input}){
        id,
        title,
        amount,
        dateDue,
        dateDueDate: .dateDueDate.toString(),
        dateEdited,
        description,
        editedBy,
        status,
        size,
        salesRef {
            id,
            name,
            number
        }
      }` )
      return response.data
    },
    createProjectV10: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query( fql`create_project(${args.input}){
        id,
        title,
        requestId,
        amount,
        dateDue,
        dateEntered,
        status,
        size,
        salesRef {
          id,
          name,
          number
        },
        customerList {
          id,
          amount,
          status,
          customerRef {
            id,
            account,
            name
          }
        }
    }` )
      return response.data
    },
    createSalesmenV10: async (parent, args, contextValue, info) => {
      const response = await contextValue.db.query( fql`Salesmen.create(${args.data}) {
        id,
        name,
        number,
        store,
        type,
        usedByCommercial
      }` )
      return response.data
    },
  }
};

const typeDefs = gql`
input CreateProjectInput {
  title: String!
  description: String
  status: String!
  dateEntered: String!
  dateDue: String!
  amount: Float!
  size: String!
  salesman: String!
  customerList: [CustomerProjectStateInput]!
}
input UpdateProjectInput {
  projectId: String!
  title: String!
  description: String
  status: String!
  dateDue: String!
  dateEdited: String!
  amount: Float!
  size: String!
  salesman: String!
}

input AddNewCustomerInput {
  account: String!
  storeNumber: String!
  salesmanNumber: String!
  name: String!
  usedByCommercial: Boolean!
}

input CustomersInput {
  account: String
  storeNumber: String
  accountId: String
  customerType: String
  accountType: String
  salesmanNumber: String
  salesmanNumber2: String
  salesmanNumber3: String
  salesmanNumber4: String
  alphaKey: String
  keyAccountId: String
  name: String
  usedByCommercial: Boolean
}

input SalesmenInput {
  number: String
  name: String
  type: String
  store: String
  usedByCommercial: Boolean
}

type LoginResult {
  token: String!
  user: User
}

input LoginUserInput {
  email: String!
  password: String!
}

input AddCustomerToProjectInput {
  projectId: String!
  customerList: [CustomerProjectStateInput]!
}

input CustomerProjectStateInput {
  account: String
  name: String
  status: String
  amount: Float
  note: String
}

input CommentsInput {
  project: String
  dateCreated: String
  message: String
  replyTo: String
  edited: Boolean
  user: String
}

input ChangeCustomerSalesmanInput {
  id: String!
  salesmanNumber: String!
}

type QuotationCountResult {
  open: Int!
  pending: Int!
  closed: Int!
  today: Int!
  thisWeek: Int!
  thisMonth: Int!
  pastDue: Int!
}

input QuotationQueryInput {
  start: String
  end: String
  startMonth: String
  endMonth: String
  startWeek: String
  endWeek: String
  account: String
  inside: String
  outsideSales: String
  status: String
  search: String
  before: Int
  after: Int
}

input DateRangeInput {
  start: String!
  end: String!
}

type ProjectsPage {
  before: Int
  after: Int
  data: [Projects!]!
}

type Projects {
    id: ID!
    requestId: Int!
    title: String!
    createdBy: User!
    editedBy: User!
    active: Boolean!
    description: String!
    status: String!
    dateEntered: String!
    dateEdited: String!
    dateDue: String!
    dateDueDate: String
    amount: Float!
    salesman: String!
    salesRef: Salesmen!
    size: String!
    customerList: [CustomerProjectState]
    comments: [Comments]
  }

  type Comments {
    id: ID!
    project: Projects
    dateCreated: String
    message: String
    user: User
    edited: Boolean
    replyTo: String
  }
  
  type Customers {
  id: ID!
  account: String
  storeNumber: String
  accountId: String
  customerType: String
  accountType: String
  salesmanNumber: String
  salesmanNumber2: String
  salesmanNumber3: String
  salesmanNumber4: String
  alphaKey: String
  keyAccountId: String
  name: String
  salesRef: Salesmen
  usedByCommercial: Boolean
}

  type CustomerProjectState {
    id: ID!
    projectRef: Projects!
    customerRef: Customers!
    status: String!
    active: Boolean
    amount: Float
    dateDue: String
    note: String
  }

type User {
    id: ID!
    email: String!
    role: UserRole!
    name: String
    salesNumber: String
    salesRef: Salesmen
  }
  
  enum UserRole {
    MANAGER
    EMPLOYEE
    ADMIN
    INSIDESALES
    OUTSIDESALES
  }
  
type Salesmen {
    id: ID!
    number: String
    name: String
    type: String
    store: String
    usedByCommercial: Boolean
  }

  type Query {
    log(input: DateRangeInput!): String
    getAllSalesmenV10: [Salesmen!]!
    getMeV10: User
    findProjectsByIDV10(id: ID!): Projects!
    findCustomersByIDV10(id: ID!): Customers!
    getQuotationsByDateRangeV10(input: DateRangeInput!): [Projects!]!
    getQuotationsByDateRangeWithClosedV10(input: DateRangeInput!): [Projects!]!
    getQuotationCountsV10(input: QuotationQueryInput!): QuotationCountResult!
    salesmenUsedByCommercialProjectsV10: [Salesmen!]!
    customersUsedByCommercialProjectsV10: [Customers!]!
    getAllCustomersV10: [Customers!]!
    getAllProjectsV10: [Projects!]!
    getQuotationsV10(input: QuotationQueryInput!): ProjectsPage!
  }

  type Mutation {
    changeCustomerSalesmanV10(input: ChangeCustomerSalesmanInput!): Customers!
    createCommentsV10(data: CommentsInput!): Comments!
    updateCommentsV10(id: ID!, data: CommentsInput!): Comments!
    deleteCustomerProjectStateV10(id: ID!): CustomerProjectState
    addCustomersToProjectV10(input: AddCustomerToProjectInput!): Projects!
    updateCustomerProjectStateV10(id: ID!, data: CustomerProjectStateInput!): CustomerProjectState!
    loginUserV10(input: LoginUserInput): LoginResult!
    updateSalesmenV10(id: ID!, data: SalesmenInput!): Salesmen!
    updateCustomersV10(id: ID!, data: CustomersInput!): Customers!
    addNewCustomerV10(input: AddNewCustomerInput!): Customers!
    updateProjectV10(input: UpdateProjectInput!): Projects
    createSalesmenV10(data: SalesmenInput!): Salesmen!
    createProjectV10(input: CreateProjectInput): Projects
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server, {
    context: async req => {
        const db = new Client({
            secret: req.headers.authorization.replace('Bearer ', '')
          })
        return ({ req, db })
    }
})